import { cookies } from "next/headers";
import { verifyJwt } from "@/lib/jwt";
import { capTableData, capTableTotals, safeHolders } from "@/lib/sensitive-data";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("dr-session");

  if (!session?.value) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = verifyJwt(session.value);
  if (!payload || !payload.investor) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ capTableData, capTableTotals, safeHolders });
}
