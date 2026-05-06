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
  try { return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")); }
  catch { return null; }
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
  const yesterday = new Date(now.getTime() - 24 * 3600 * 1000);
  const yesterdayStr = fmtDate(yesterday);
  const allTimeStart = "20250401";

  // Query 1: all-time cumulative installs up to yesterday
  const usersData = await ampQuery("events/segmentation", {
    e: { event_type: "Application Installed" },
    start: allTimeStart,
    end: yesterdayStr,
    m: "totals",
    i: 30, // monthly buckets to reduce response size
  });
  const totalUsers = (usersData.data?.series?.[0] || []).reduce((s, v) => s + (v || 0), 0);

  await delay(2000);

  // Query 2: all-time cumulative messages up to yesterday
  const msgsData = await ampQuery("events/segmentation", {
    e: { event_type: "Chat MessageSent" },
    start: allTimeStart,
    end: yesterdayStr,
    m: "totals",
    i: 30,
  });
  const totalMessages = (msgsData.data?.series?.[0] || []).reduce((s, v) => s + (v || 0), 0);

  await delay(2000);

  // Query 3: all-time cumulative friends up to yesterday
  const frdsData = await ampQuery("events/segmentation", {
    e: { event_type: "Friends MatchMade" },
    start: allTimeStart,
    end: yesterdayStr,
    m: "totals",
    i: 30,
  });
  const totalFriends = (frdsData.data?.series?.[0] || []).reduce((s, v) => s + (v || 0), 0);

  await delay(2000);

  // Query 4: yesterday's daily counts (for rate)
  const rateData = await ampQuery("events/segmentation", {
    e: { event_type: "Application Installed" },
    start: yesterdayStr,
    end: yesterdayStr,
    m: "totals",
    i: 1,
  });
  const usersYesterday = (rateData.data?.series?.[0] || [])[0] || 0;

  await delay(2000);

  const msgRateData = await ampQuery("events/segmentation", {
    e: { event_type: "Chat MessageSent" },
    start: yesterdayStr,
    end: yesterdayStr,
    m: "totals",
    i: 1,
  });
  const msgsYesterday = (msgRateData.data?.series?.[0] || [])[0] || 0;

  await delay(2000);

  const frdRateData = await ampQuery("events/segmentation", {
    e: { event_type: "Friends MatchMade" },
    start: yesterdayStr,
    end: yesterdayStr,
    m: "totals",
    i: 1,
  });
  const frdsYesterday = (frdRateData.data?.series?.[0] || [])[0] || 0;

  // asOf = end of yesterday (midnight UTC today)
  const midnightToday = new Date(now);
  midnightToday.setUTCHours(0, 0, 0, 0);

  const result = {
    asOf: midnightToday.getTime(),
    pulledAt: Date.now(),
    metrics: {
      users:    { base: totalUsers,    ratePerHour: Math.round(usersYesterday / 24) },
      messages: { base: totalMessages, ratePerHour: Math.round(msgsYesterday / 24) },
      friends:  { base: totalFriends,  ratePerHour: Math.round(frdsYesterday / 24) },
    },
  };

  saveData(result);
  console.log(`[${new Date().toISOString()}] Done.`, JSON.stringify(result.metrics));
  return result;
}

// ── HTTP server ─────────────────────────────────────────────────────

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", CORS_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  if (req.method === "GET" && req.url === "/api/globe-rates") {
    const data = loadData();
    if (!data) {
      res.writeHead(503, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No data yet" }));
      return;
    }
    // Return asOf and metrics (frontend calculates pro-rata from asOf to now)
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ asOf: data.asOf, metrics: data.metrics }));
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    const data = loadData();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", hasData: !!data, pulledAt: data?.pulledAt }));
    return;
  }

  res.writeHead(404); res.end("Not found");
});

// ── Start ───────────────────────────────────────────────────────────

pullData().catch((err) => console.error("Initial pull failed:", err.message));
cron.schedule("5,35 * * * *", () => pullData().catch((err) => console.error("Cron pull failed:", err.message)));
server.listen(PORT, () => console.log(`Globe API on port ${PORT}`));
