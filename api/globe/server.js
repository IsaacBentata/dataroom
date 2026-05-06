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

function loadData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch {
    return { snapshots: [] };
  }
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function cleanOldSnapshots(data) {
  const cutoff = Date.now() - 48 * 3600 * 1000;
  data.snapshots = data.snapshots.filter((s) => s.timestamp >= cutoff);
  return data;
}

// ── Amplitude queries ───────────────────────────────────────────────
// Uses the v2 events/segmentation endpoint with Basic auth (api_key:secret_key)

async function ampQuery(endpoint, params) {
  const auth = Buffer.from(`${AMP_API_KEY}:${AMP_SECRET_KEY}`).toString("base64");
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    qs.set(k, typeof v === "object" ? JSON.stringify(v) : String(v));
  }
  const url = `https://amplitude.com/api/2/${endpoint}?${qs}`;
  const res = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` },
  });
  if (!res.ok) throw new Error(`Amplitude ${res.status}: ${await res.text()}`);
  return res.json();
}

async function getHourlyEventCount(eventType, start, end) {
  const data = await ampQuery("events/segmentation", {
    e: { event_type: eventType },
    start: start, // YYYYMMDD
    end: end,     // YYYYMMDD
    m: "totals",
    i: 1, // daily (hourly requires i=3600 but only available on certain plans)
  });
  // Returns { data: { series: [[val, val, ...]], xValues: ["date", ...] } }
  if (data.data && data.data.series && data.data.series.length > 0) {
    return {
      series: data.data.series[0],
      xValues: data.data.xValues || [],
    };
  }
  return { series: [], xValues: [] };
}

// ── Pull and store ──────────────────────────────────────────────────

function fmtDate(d) {
  return d.toISOString().split("T")[0].replace(/-/g, "");
}

async function pullAndStore() {
  console.log(`[${new Date().toISOString()}] Pulling Amplitude data...`);

  try {
    const now = new Date();
    const twoDaysAgo = new Date(now.getTime() - 48 * 3600 * 1000);
    const start = fmtDate(twoDaysAgo);
    const end = fmtDate(now);

    const delay = (ms) => new Promise((r) => setTimeout(r, ms));

    // Fetch all-time cumulative totals + recent daily rates sequentially to avoid rate limits
    const allTimeStart = "20250401";

    const allUsers = await getHourlyEventCount("Application Installed", allTimeStart, end);
    await delay(2000);
    const allMessages = await getHourlyEventCount("Chat MessageSent", allTimeStart, end);
    await delay(2000);
    const allFriends = await getHourlyEventCount("Friends MatchMade", allTimeStart, end);

    const totalUsers = allUsers.series.reduce((s, v) => s + (v || 0), 0);
    const totalMessages = allMessages.series.reduce((s, v) => s + (v || 0), 0);
    const totalFriends = allFriends.series.reduce((s, v) => s + (v || 0), 0);

    // Daily rate from yesterday (second-to-last value in each series)
    const usrDaily = allUsers.series.length >= 2 ? allUsers.series[allUsers.series.length - 2] : (allUsers.series[0] || 0);
    const msgDaily = allMessages.series.length >= 2 ? allMessages.series[allMessages.series.length - 2] : (allMessages.series[0] || 0);
    const frdDaily = allFriends.series.length >= 2 ? allFriends.series[allFriends.series.length - 2] : (allFriends.series[0] || 0);

    const hourStart = new Date();
    hourStart.setMinutes(0, 0, 0);

    const snapshot = {
      timestamp: hourStart.getTime(),
      pulledAt: Date.now(),
      bases: {
        users: totalUsers,
        messages: totalMessages,
        friends: totalFriends,
      },
      hourlyRates: {
        users: Math.round(usrDaily / 24),
        messages: Math.round(msgDaily / 24),
        friends: Math.round(frdDaily / 24),
      },
    };

    const data = loadData();
    const existing = data.snapshots.findIndex((s) => s.timestamp === snapshot.timestamp);
    if (existing >= 0) {
      data.snapshots[existing] = snapshot;
    } else {
      data.snapshots.push(snapshot);
    }

    cleanOldSnapshots(data);
    saveData(data);
    console.log(`[${new Date().toISOString()}] Stored snapshot.`, JSON.stringify(snapshot.bases), JSON.stringify(snapshot.hourlyRates));
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Pull failed:`, err.message);
  }
}

// ── API endpoint ────────────────────────────────────────────────────

function getGlobeRates() {
  const data = loadData();
  if (data.snapshots.length === 0) return null;

  const now = Date.now();
  const target24hAgo = now - 24 * 3600 * 1000;
  const sorted = [...data.snapshots].sort((a, b) => a.timestamp - b.timestamp);

  let snapshot = null;
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].timestamp <= target24hAgo) {
      snapshot = sorted[i];
      break;
    }
  }
  if (!snapshot) snapshot = sorted[0];

  const result = { asOf: snapshot.timestamp, metrics: {} };
  for (const metric of ["users", "messages", "friends"]) {
    result.metrics[metric] = {
      base: snapshot.bases?.[metric] || 0,
      ratePerHour: snapshot.hourlyRates?.[metric] || 0,
    };
  }
  return result;
}

// ── HTTP server ─────────────────────────────────────────────────────

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", CORS_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  if (req.method === "GET" && req.url === "/api/globe-rates") {
    const rates = getGlobeRates();
    if (!rates) {
      res.writeHead(503, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No data yet" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(rates));
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    const data = loadData();
    const latest = data.snapshots[data.snapshots.length - 1];
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", snapshots: data.snapshots.length, latest: latest?.bases }));
    return;
  }

  res.writeHead(404); res.end("Not found");
});

// ── Start ───────────────────────────────────────────────────────────

pullAndStore();
cron.schedule("5 * * * *", pullAndStore);
server.listen(PORT, () => console.log(`Globe API on port ${PORT}`));
