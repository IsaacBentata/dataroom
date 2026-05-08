import { createHash } from "crypto";
import { cookies } from "next/headers";
import { signJwt } from "@/lib/jwt";

// SHA-256 hashed passwords mapped to investor names
const PASSWORD_HASHES: Record<string, string> = {
  "4076c4659b4be1b942bdf5c05de5cc94afeb740ddd083a94f24c4c350eaad60d": "Internal",
  "09bb1f76f51c492bab769fb8ac786e631a0a6df495ec2226558960d91a5342cb": "Mercia",
  "2844689e118b4e4a5cdf124cc9fe0107630daa19463ecf91f0d2e5678d1206bf": "Footwork",
  "e29731012f842acb291bcfc9a556268145aea2a2b17ca502463d74acb121d750": "JamJar",
  "08e24b7437db062cfcf09dc450d9e3ec5e1d42acca78378ba3f8a1858b9ec90e": "FMC",
  "547ec866b74fc8d07002d6005cd0c83d836c47624d3d0bc4b3eeb0ebae732bc3": "Thrive",
  "8fbc9ed38900a8cfdb88ed2c518bc44311bd59dfc83bdbc07ac9a61c95b1556a": "SoftBank",
  "1023efe3d4f2e056bbf77909e6b57695bacbe39850094acd9ecdcc46e817125c": "a16z",
  "257c97330f448883b45b1053e0c4d956d12df58cbb2597314356a2ba3e70ac42": "Sequoia",
  "26e40af730f137560383a5b63a06c5003440d5aec9de8f6598e5fb6b440bc277": "KP",
  "33e7c200795309be590fc9b6e2e920636b849189e37963c486f8797cb57eb522": "Bessemer",
  "1a7a3a4ce56137d3e5ad7392e5763af3f390832cfbdac02714ef89f6049aa08d": "Breyer",
  "88661da3adf9f4af68314abcafcbb4408cf804a95e9f076574b7f47f41cb3133": "Lightspeed",
  "6a6f37e50f2952bc807d1e6c7a27591bf6467f82cd96758e623cdd069c6913da": "Tencent",
  "32b661b351e7a66d43e327fac6b396797ce0e6a5fbf56e65eef95ba2a96348b7": "Sony",
  "d3e436108bee741c58511ba165b32c1f7203573762eeac297e753c6e5262045e": "UMG",
  "dc008d0efa5a10ab7b1a67e4a4fc05c6a623ea554fc683b35d427b9198a15d7e": "Warner",
  "0178f42107bc23827ddaa0c5728f05a8a29da8fce5ed975b9d84a65a3f5300e0": "Goodwater",
  "869caa73533368243c9f278e481060c56e5cb318dff8b3faebccb92a6f181ab8": "Piton",
  "15dadc8648ae21c5b18b7eee9778e572937427eb2944a5c0cb1333b16c5e97ea": "Balderton",
  "3277c5f83454df4a323b92bf15ed767ff83ff8c229bd3b977384576cfbc1c824": "Accel",
  "785542cef5129becc6ac827753e37e4bf9ddb1f68c9938ef996d33807a7fd95b": "Google Ventures",
  "f46ba23038e05f8adadeab13f11215f843dee64f8885723548a2e2a90dc38a1a": "Edenblock",
  "2fcfc12b7967033cc613c5a397081421cc8976006fa7b5c9ec541316c927f5af": "SciFi",
  "28dce60aa823a713d077c33784e00500d1902daf306b4ee2140ff46d591fbb11": "LeftLane",
  "ddb02f53592c4f07a2875dae5545d22d29b898a04b0186d1ad6b32f76a6ab392": "MarketOne",
  "d3bdfc83072c77d6294724bafa7993de779f6b89db0a7ebf87c91887ba308c59": "Iconiq",
  "aed14ef92b4a28422b32b9c5488f63b8d6e99fa35b0c1c1598bccf71aa8cec4a": "Joe Cohen",
  "a81b270545fc403bbb1849002654fe4b279111dd5afc8338dc68dd2391dcf189": "MARI",
  "aea33831119b12a0038ee5ecb4d456618891bfae910cf430002826b0ac97c23d": "Yamaha",
  "08bde60e4ef26b46818801c31cdcc32cf18ba97ce0bd2d4ab5b6ebc344d97cfb": "Highland",
  "1d7ecddb3e1f0881349538e8e113796dc2ee5f5140236972f16bb54e4b5025bb": "Insight",
  "e6acb099c9fa46896258ca8bcbddb6d57aed1139e3ee9d0f3c54e1cd990e22ba": "Hodari",
  "c5f5a4c8157584ec42ddc5dfef59ceaef61f841c60e379bbf7ce3c9db577716b": "Headline",
  "d910b6ca1f58711bcd041fcc662581fe3d8d96226dc241b372bd950ee92e3a5f": "Glaser",
  "b173c3bf93876b27263dad2afba1df1b7de0d121023bd2185333d5a03a4ba39c": "Collab",
};

// Rate limiting: track failed attempts per IP
const failedAttempts = new Map<string, { count: number; lockedUntil: number }>();
const MAX_ATTEMPTS = 3;
const LOCKOUT_MS = 60 * 1000; // 1 minute

function getClientIP(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

export async function POST(request: Request) {
  const ip = getClientIP(request);
  const record = failedAttempts.get(ip);

  // Check if locked out
  if (record && record.count >= MAX_ATTEMPTS && Date.now() < record.lockedUntil) {
    const remaining = Math.ceil((record.lockedUntil - Date.now()) / 1000);
    return Response.json(
      { success: false, locked: true, retryAfter: remaining },
      { status: 429 }
    );
  }

  const body = await request.json();
  const { password } = body as { password?: string };

  if (!password) {
    return Response.json({ success: false }, { status: 400 });
  }

  const hash = createHash("sha256").update(password).digest("hex");
  const investor = PASSWORD_HASHES[hash];

  if (!investor) {
    const current = failedAttempts.get(ip) || { count: 0, lockedUntil: 0 };
    current.count += 1;
    if (current.count >= MAX_ATTEMPTS) {
      current.lockedUntil = Date.now() + LOCKOUT_MS;
    }
    failedAttempts.set(ip, current);
    return Response.json({ success: false }, { status: 401 });
  }

  // Success - clear failed attempts
  failedAttempts.delete(ip);

  const token = signJwt({ investor, iat: Date.now() });

  const cookieStore = await cookies();
  cookieStore.set("dr-session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return Response.json({ success: true, investor });
}
