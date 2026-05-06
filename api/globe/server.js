import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import cron from "node-cron";

const PORT = process.env.PORT || 8080;
const AMP_API_KEY = process.env.AMPLITUDE_API_KEY;
const AMP_SECRET_KEY = process.env.AMPLITUDE_SECRET_KEY;
const DATA_FILE = path.join(process.cwd(), "data.json");
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

// ── Data store ──────────────────────────────────────────────────────
// Stores an array of hourly snapshots, each with cumulative base + hourly rate.
// Frontend picks the one closest to 24h ago. If that's missing, uses most recent.

function loadData() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")); }
  catch { return { snapshots: [] }; }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// ── Amplitude ───────────────────────────────────────────────────────

async function ampQuery(endpoint, params) {
  const auth = Buffer.from(`${AMP_API_KEY}:${AMP_SECRET_KEY}`).toString("base64");
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    qs.set(k, typeof v === "object" ? JSON.stringify(v) : String(v));
  }
  const url = `https://amplitude.com/api/2/${endpoint}?${qs}`;
  const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  if (!res.ok) throw new Error(`Amplitude ${res.status}: ${await res.text()}`);
  return res.json();
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

function fmtDate(d) {
  return d.toISOString().split("T")[0].replace(/-/g, "");
}

async function pullData() {
  console.log(`[${new Date().toISOString()}] Pulling Amplitude data...`);

  const now = new Date();
  const allTimeStart = "20250401";

  // We pull daily data for the last 3 days so we have a buffer of hourly rates.
  // Each day gives us a daily total which we divide by 24 for hourly rate.
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 3600 * 1000);
  const yesterday = new Date(now.getTime() - 24 * 3600 * 1000);
  const endDate = fmtDate(yesterday); // up to end of yesterday

  // Query cumulative totals up to end of yesterday
  const usersData = await ampQuery("events/segmentation", {
    e: { event_type: "Application Installed" },
    start: allTimeStart,
    end: endDate,
    m: "totals",
    i: 30,
  });
  const totalUsers = (usersData.data?.series?.[0] || []).reduce((s, v) => s + (v || 0), 0);
  await delay(2000);

  const msgsData = await ampQuery("events/segmentation", {
    e: { event_type: "Chat MessageSent" },
    start: allTimeStart,
    end: endDate,
    m: "totals",
    i: 30,
  });
  const totalMessages = (msgsData.data?.series?.[0] || []).reduce((s, v) => s + (v || 0), 0);
  await delay(2000);

  const frdsData = await ampQuery("events/segmentation", {
    e: { event_type: "Friends MatchMade" },
    start: allTimeStart,
    end: endDate,
    m: "totals",
    i: 30,
  });
  const totalFriends = (frdsData.data?.series?.[0] || []).reduce((s, v) => s + (v || 0), 0);
  await delay(2000);

  // Query daily counts for last 3 days (gives us rates for multiple days as buffer)
  const rateStart = fmtDate(threeDaysAgo);
  const rateEnd = fmtDate(yesterday);

  const usrRates = await ampQuery("events/segmentation", {
    e: { event_type: "Application Installed" },
    start: rateStart, end: rateEnd, m: "totals", i: 1,
  });
  await delay(2000);

  const msgRates = await ampQuery("events/segmentation", {
    e: { event_type: "Chat MessageSent" },
    start: rateStart, end: rateEnd, m: "totals", i: 1,
  });
  await delay(2000);

  const frdRates = await ampQuery("events/segmentation", {
    e: { event_type: "Friends MatchMade" },
    start: rateStart, end: rateEnd, m: "totals", i: 1,
  });

  const usrDailySeries = usrRates.data?.series?.[0] || [];
  const msgDailySeries = msgRates.data?.series?.[0] || [];
  const frdDailySeries = frdRates.data?.series?.[0] || [];
  const rateDates = usrRates.data?.xValues || [];

  // Build snapshots for each day we have rate data for.
  // Each snapshot: asOf = end of that day (midnight next day), base = cumulative up to that day,
  // ratePerHour = that day's total / 24.
  const data = loadData();
  let cumulativeUsers = totalUsers;
  let cumulativeMessages = totalMessages;
  let cumulativeFriends = totalFriends;

  // We need to subtract back from the total to get the cumulative at the end of each day.
  // rateDates go from oldest to newest. totalUsers is cumulative through end of yesterday.
  // So: cumulative at end of day[i] = totalUsers - sum(day[i+1] .. day[last])
  const numDays = rateDates.length;
  const snapshots = [];

  for (let i = numDays - 1; i >= 0; i--) {
    const dayDate = new Date(rateDates[i]);
    const nextMidnight = new Date(dayDate);
    nextMidnight.setUTCDate(nextMidnight.getUTCDate() + 1);
    nextMidnight.setUTCHours(0, 0, 0, 0);

    const usrDay = usrDailySeries[i] || 0;
    const msgDay = msgDailySeries[i] || 0;
    const frdDay = frdDailySeries[i] || 0;

    snapshots.push({
      asOf: nextMidnight.getTime(),
      bases: {
        users: cumulativeUsers,
        messages: cumulativeMessages,
        friends: cumulativeFriends,
      },
      hourlyRates: {
        users: Math.round(usrDay / 24),
        messages: Math.round(msgDay / 24),
        friends: Math.round(frdDay / 24),
      },
    });

    // Subtract this day's values to get the previous day's cumulative
    cumulativeUsers -= usrDay;
    cumulativeMessages -= msgDay;
    cumulativeFriends -= frdDay;
  }

  // Sort by asOf ascending
  snapshots.sort((a, b) => a.asOf - b.asOf);

  data.snapshots = snapshots;
  data.pulledAt = Date.now();
  saveData(data);

  console.log(`[${new Date().toISOString()}] Stored ${snapshots.length} snapshots.`);
  for (const s of snapshots) {
    console.log(`  ${new Date(s.asOf).toISOString()} users=${s.bases.users} msgs=${s.bases.messages} friends=${s.bases.friends} rate_u=${s.hourlyRates.users}/h`);
  }
}

// ── API endpoint ────────────────────────────────────────────────────

function getGlobeRates() {
  const data = loadData();
  if (!data || !data.snapshots || data.snapshots.length === 0) return null;

  const now = Date.now();
  const target = now - 24 * 3600 * 1000;
  const sorted = [...data.snapshots].sort((a, b) => a.asOf - b.asOf);

  // Find snapshot closest to 24h ago (not newer than target)
  let snapshot = null;
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].asOf <= target) {
      snapshot = sorted[i];
      break;
    }
  }

  // If nothing 24h+ ago, use most recent
  if (!snapshot) {
    snapshot = sorted[sorted.length - 1];
  }

  return { asOf: snapshot.asOf, metrics: snapshot.bases, rates: snapshot.hourlyRates };
}

// ── HTTP server ─────────────────────────────────────────────────────

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", CORS_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  if (req.method === "GET" && req.url === "/api/globe-rates") {
    const result = getGlobeRates();
    if (!result) {
      res.writeHead(503, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No data yet" }));
      return;
    }
    // Reshape for frontend compatibility
    const response = {
      asOf: result.asOf,
      metrics: {
        users:    { base: result.metrics.users,    ratePerHour: result.rates.users },
        messages: { base: result.metrics.messages, ratePerHour: result.rates.messages },
        friends:  { base: result.metrics.friends,  ratePerHour: result.rates.friends },
      },
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(response));
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    const data = loadData();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      status: "ok",
      snapshots: data?.snapshots?.length || 0,
      pulledAt: data?.pulledAt,
    }));
    return;
  }

  res.writeHead(404); res.end("Not found");
});

// ── Start ───────────────────────────────────────────────────────────

pullData().catch((err) => console.error("Initial pull failed:", err.message));
cron.schedule("5,35 * * * *", () => pullData().catch((err) => console.error("Cron pull failed:", err.message)));
server.listen(PORT, () => console.log(`Globe API on port ${PORT}`));
