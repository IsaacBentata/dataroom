import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import cron from "node-cron";

const PORT = process.env.PORT || 8080;
const AMP_API_KEY = process.env.AMPLITUDE_API_KEY;
const AMP_SECRET_KEY = process.env.AMPLITUDE_SECRET_KEY;
const DATA_FILE = path.join(process.cwd(), "data.json");
const PAIRS_FILE = path.join(process.cwd(), "pairs.json");
const ARTISTS_DIR = path.join(process.cwd(), "data-artists");
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

// ── Pairs data: load once on boot, rewrite artist URLs to point at our proxy. ──
let PAIRS_CACHE = null;
function rewriteArtistPath(img) {
  if (!img) return img;
  const m = img.match(/(?:^|\/)data-artists\/([^\/]+)$/);
  return m ? `/api/globe-artist/${m[1]}` : img;
}
function loadPairs() {
  try {
    const raw = JSON.parse(fs.readFileSync(PAIRS_FILE, "utf-8"));
    if (!raw || !Array.isArray(raw.pairs)) return;
    // Rewrite local data-artists paths to the proxy endpoint so cross-origin
    // clients can fetch them with CORS headers.
    const pairs = raw.pairs.map((p) => {
      const out = { ...p };
      // New schema: arts: [{ name, img }] (multiple per pair). Fall back to
      // legacy single-artist schema if present.
      if (Array.isArray(p.arts)) {
        out.arts = p.arts.map((a) => ({ ...a, img: rewriteArtistPath(a.img) }));
      } else if (p.artist) {
        out.artist = { ...p.artist, img: rewriteArtistPath(p.artist.img) };
      }
      return out;
    });
    PAIRS_CACHE = { pairs, generatedAt: Date.now() };
  } catch (err) {
    console.error("Failed to load pairs.json:", err.message);
  }
}
loadPairs();

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
function fmtDate(d) { return d.toISOString().split("T")[0].replace(/-/g, ""); }

async function getTotal(eventType, end) {
  const data = await ampQuery("events/segmentation", {
    e: { event_type: eventType },
    start: "20250401",
    end,
    m: "totals",
    i: 30,
  });
  return (data.data?.series?.[0] || []).reduce((s, v) => s + (v || 0), 0);
}

async function getDailyRate(eventType, date) {
  const data = await ampQuery("events/segmentation", {
    e: { event_type: eventType },
    start: date,
    end: date,
    m: "totals",
    i: 1,
  });
  return (data.data?.series?.[0] || [])[0] || 0;
}

async function pullData() {
  console.log(`[${new Date().toISOString()}] Pulling...`);

  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 3600 * 1000);
  const yesterdayStr = fmtDate(yesterday);

  // All-time totals up to yesterday
  const totalUsers = await getTotal("Application Installed", yesterdayStr);
  await delay(2000);
  const totalMessages = await getTotal("Chat MessageSent", yesterdayStr);
  await delay(2000);
  const totalFriends = await getTotal("Friends MatchMade", yesterdayStr);
  await delay(2000);

  // Yesterday's daily count = rate basis
  const usersRate = await getDailyRate("Application Installed", yesterdayStr);
  await delay(2000);
  const msgsRate = await getDailyRate("Chat MessageSent", yesterdayStr);
  await delay(2000);
  const frdsRate = await getDailyRate("Friends MatchMade", yesterdayStr);

  // asOf = midnight today UTC (end of yesterday)
  const midnight = new Date(now);
  midnight.setUTCHours(0, 0, 0, 0);

  const result = {
    asOf: midnight.getTime(),
    pulledAt: Date.now(),
    users:    { base: totalUsers,    ratePerHour: Math.round(usersRate / 24) },
    messages: { base: totalMessages, ratePerHour: Math.round(msgsRate / 24) },
    friends:  { base: totalFriends,  ratePerHour: Math.round(frdsRate / 24) },
  };

  fs.writeFileSync(DATA_FILE, JSON.stringify(result, null, 2));
  console.log(`[${new Date().toISOString()}] Done. users=${totalUsers} msgs=${totalMessages} friends=${totalFriends}`);
}

// ── HTTP server ─────────────────────────────────────────────────────

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", CORS_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  if (req.method === "GET" && req.url === "/api/globe-rates") {
    let data;
    try { data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")); } catch {}
    if (!data) {
      res.writeHead(503, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No data yet" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      asOf: data.asOf,
      metrics: {
        users:    { base: data.users.base,    ratePerHour: data.users.ratePerHour },
        messages: { base: data.messages.base, ratePerHour: data.messages.ratePerHour },
        friends:  { base: data.friends.base,  ratePerHour: data.friends.ratePerHour },
      },
    }));
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    let data;
    try { data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8")); } catch {}
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      status: "ok",
      hasData: !!data,
      pulledAt: data?.pulledAt,
      pairsLoaded: !!PAIRS_CACHE,
      pairCount: PAIRS_CACHE?.pairs?.length || 0,
    }));
    return;
  }

  // GET /api/globe-pairs — friendship pairs (Tier-weighted) for globe arcs
  if (req.method === "GET" && req.url.startsWith("/api/globe-pairs")) {
    if (!PAIRS_CACHE) {
      res.writeHead(503, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No pairs data" }));
      return;
    }
    // Optional ?limit=N query param (default: all). Return a server-side
    // shuffled slice so different clients don't all see the same first pairs.
    const u = new URL(req.url, "http://x");
    const limit = Math.max(1, Math.min(500, parseInt(u.searchParams.get("limit") || "0", 10) || PAIRS_CACHE.pairs.length));
    const all = PAIRS_CACHE.pairs;
    const out = [];
    const used = new Set();
    while (out.length < limit && used.size < all.length) {
      const i = Math.floor(Math.random() * all.length);
      if (used.has(i)) continue;
      used.add(i);
      out.push(all[i]);
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60",
    });
    res.end(JSON.stringify({ pairs: out, generatedAt: PAIRS_CACHE.generatedAt }));
    return;
  }

  // GET /api/globe-artist/<filename> — artist image with CORS, served from disk
  if (req.method === "GET" && req.url.startsWith("/api/globe-artist/")) {
    const fname = req.url.slice("/api/globe-artist/".length).split("?")[0];
    // basic path-traversal guard: filename only, no slashes / backrefs
    if (!/^[A-Za-z0-9._-]+$/.test(fname)) {
      res.writeHead(400); res.end("bad name"); return;
    }
    const fp = path.join(ARTISTS_DIR, fname);
    if (!fp.startsWith(ARTISTS_DIR + path.sep) || !fs.existsSync(fp)) {
      res.writeHead(404); res.end("not found"); return;
    }
    const ext = path.extname(fname).toLowerCase();
    const ctype = ext === ".png" ? "image/png"
      : ext === ".webp" ? "image/webp"
      : ext === ".gif" ? "image/gif"
      : "image/jpeg";
    res.writeHead(200, {
      "Content-Type": ctype,
      "Cache-Control": "public, max-age=86400, immutable",
      // CORS already set above; override is fine, but just to be explicit.
    });
    fs.createReadStream(fp).pipe(res);
    return;
  }

  res.writeHead(404); res.end("Not found");
});

pullData().catch((err) => console.error("Initial pull failed:", err.message));
cron.schedule("5,35 * * * *", () => pullData().catch((err) => console.error("Cron pull failed:", err.message)));
server.listen(PORT, () => console.log(`Globe API on port ${PORT}`));
