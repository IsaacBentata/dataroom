import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import cron from "node-cron";

const PORT = process.env.PORT || 8080;
const AMP_API_KEY = process.env.AMPLITUDE_API_KEY;
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

async function queryAmplitude(definition) {
  const res = await fetch("https://amplitude.com/api/2/chart/query", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AMP_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(definition),
  });
  if (!res.ok) throw new Error(`Amplitude ${res.status}: ${await res.text()}`);
  return res.json();
}

async function fetchHourlyTotals() {
  // Query last 48h of hourly data for each metric
  const now = new Date();
  const start = new Date(now.getTime() - 48 * 3600 * 1000);
  const fmt = (d) => d.toISOString().split("T")[0];

  const events = [
    { name: "users", event_type: "_active", metric: "uniques" },
    { name: "messages", event_type: "Chat MessageSent", metric: "totals" },
    { name: "friends", event_type: "Friends MatchMade", metric: "totals" },
  ];

  const results = {};

  for (const ev of events) {
    try {
      const body = {
        type: "eventsSegmentation",
        app: "598644",
        params: {
          start: fmt(start),
          end: fmt(now),
          events: [{ event_type: ev.event_type, filters: [], group_by: [] }],
          metric: ev.metric,
          countGroup: "User",
          groupBy: [],
          interval: -3600000, // hourly
          segments: [{ conditions: [] }],
          timezone: "UTC",
        },
      };
      const data = await queryAmplitude(body);

      // Parse the response - Amplitude returns series data
      if (data.data && data.data.series) {
        const series = data.data.series[0]; // first series
        const xValues = data.data.xValues || [];
        const hourlyData = [];

        for (let i = 0; i < xValues.length; i++) {
          const ts = new Date(xValues[i]).getTime();
          const value = series[i] || 0;
          hourlyData.push({ timestamp: ts, value });
        }
        results[ev.name] = hourlyData;
      }
    } catch (err) {
      console.error(`Failed to fetch ${ev.name}:`, err.message);
    }
  }

  return results;
}

// For cumulative metrics (messages, friends), we need running totals.
// The Amplitude hourly query returns per-hour counts for totals metric.
// We need to convert these to cumulative by adding a known base.

async function fetchCumulativeTotals() {
  // Get the all-time totals first
  const now = new Date();
  const fmt = (d) => d.toISOString().split("T")[0];

  const baseQueries = [
    { name: "messages", event_type: "Chat MessageSent" },
    { name: "friends", event_type: "Friends MatchMade" },
  ];

  const bases = {};

  for (const q of baseQueries) {
    try {
      const body = {
        type: "eventsSegmentation",
        app: "598644",
        params: {
          start: "2024-01-01",
          end: fmt(now),
          events: [{ event_type: q.event_type, filters: [], group_by: [] }],
          metric: "totals",
          countGroup: "User",
          groupBy: [],
          interval: 30, // monthly to get overall total
          segments: [{ conditions: [] }],
          timezone: "UTC",
        },
      };
      const data = await queryAmplitude(body);
      if (data.data && data.data.series) {
        bases[q.name] = data.data.series[0].reduce((sum, v) => sum + (v || 0), 0);
      }
    } catch (err) {
      console.error(`Failed to fetch base for ${q.name}:`, err.message);
    }
  }

  // For users, get MAU (latest month)
  try {
    const body = {
      type: "eventsSegmentation",
      app: "598644",
      params: {
        start: fmt(new Date(now.getTime() - 31 * 86400000)),
        end: fmt(now),
        events: [{ event_type: "_active", filters: [], group_by: [] }],
        metric: "uniques",
        countGroup: "User",
        groupBy: [],
        interval: 1, // daily
        segments: [{ conditions: [] }],
        timezone: "UTC",
      },
    };
    const data = await queryAmplitude(body);
    if (data.data && data.data.series) {
      // Use the latest daily value as approximate current users
      const series = data.data.series[0];
      bases.users = series[series.length - 1] || 0;
    }
  } catch (err) {
    console.error("Failed to fetch user base:", err.message);
  }

  return bases;
}

async function pullAndStore() {
  console.log(`[${new Date().toISOString()}] Pulling Amplitude data...`);

  try {
    const hourly = await fetchHourlyTotals();
    const bases = await fetchCumulativeTotals();

    const data = loadData();

    // Store snapshot for current hour
    const hourStart = new Date();
    hourStart.setMinutes(0, 0, 0);

    // Calculate hourly deltas from the hourly data
    const snapshot = {
      timestamp: hourStart.getTime(),
      pulledAt: Date.now(),
      bases, // cumulative totals as of now
      hourlyRates: {},
    };

    // Get the most recent hourly values as rates
    for (const [metric, hourlyData] of Object.entries(hourly)) {
      if (hourlyData.length > 0) {
        const latest = hourlyData[hourlyData.length - 1];
        snapshot.hourlyRates[metric] = latest.value;
      }
    }

    // Check if we already have a snapshot for this hour
    const existing = data.snapshots.findIndex(
      (s) => s.timestamp === snapshot.timestamp
    );
    if (existing >= 0) {
      data.snapshots[existing] = snapshot;
    } else {
      data.snapshots.push(snapshot);
    }

    cleanOldSnapshots(data);
    saveData(data);
    console.log(`[${new Date().toISOString()}] Stored snapshot. ${data.snapshots.length} snapshots in store.`);
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Pull failed:`, err.message);
  }
}

// ── API endpoint ────────────────────────────────────────────────────

function getGlobeRates() {
  const data = loadData();
  if (data.snapshots.length === 0) {
    return null;
  }

  const now = Date.now();
  const target24hAgo = now - 24 * 3600 * 1000;

  // Sort snapshots by timestamp
  const sorted = [...data.snapshots].sort((a, b) => a.timestamp - b.timestamp);

  // Find the snapshot closest to 24h ago (but not newer than 24h ago)
  let snapshot = null;
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (sorted[i].timestamp <= target24hAgo) {
      snapshot = sorted[i];
      break;
    }
  }

  // If nothing 24h+ ago, use the oldest available
  if (!snapshot) {
    snapshot = sorted[0];
  }

  // Build response
  const result = {
    asOf: snapshot.timestamp,
    metrics: {},
  };

  for (const metric of ["users", "messages", "friends"]) {
    const base = snapshot.bases?.[metric] || 0;
    const rate = snapshot.hourlyRates?.[metric] || 0;
    result.metrics[metric] = { base, ratePerHour: rate };
  }

  return result;
}

// ── HTTP server ─────────────────────────────────────────────────────

const server = http.createServer((req, res) => {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", CORS_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/api/globe-rates") {
    const rates = getGlobeRates();
    if (!rates) {
      res.writeHead(503, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No data available yet. Waiting for first pull." }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(rates));
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", snapshots: loadData().snapshots.length }));
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

// ── Start ───────────────────────────────────────────────────────────

// Pull on startup
pullAndStore();

// Pull every hour at :05 past
cron.schedule("5 * * * *", pullAndStore);

server.listen(PORT, () => {
  console.log(`Globe API running on port ${PORT}`);
});
