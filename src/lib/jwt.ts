import { createHmac } from "crypto";

const SECRET = process.env.AUTH_SECRET || "dev-secret-equals-data-room-2026";

function base64url(input: string | Buffer): string {
  const buf = typeof input === "string" ? Buffer.from(input, "utf-8") : input;
  return buf.toString("base64url");
}

function base64urlDecode(input: string): string {
  return Buffer.from(input, "base64url").toString("utf-8");
}

export function signJwt(payload: Record<string, unknown>): string {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64url(JSON.stringify(payload));
  const signature = createHmac("sha256", SECRET)
    .update(`${header}.${body}`)
    .digest("base64url");
  return `${header}.${body}.${signature}`;
}

export function verifyJwt(token: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, body, signature] = parts;
  const expected = createHmac("sha256", SECRET)
    .update(`${header}.${body}`)
    .digest("base64url");
  if (signature !== expected) return null;
  try {
    return JSON.parse(base64urlDecode(body));
  } catch {
    return null;
  }
}
