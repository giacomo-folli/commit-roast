import { NextRequest, NextResponse } from "next/server";
import { usernameSchema } from "@/lib/validation";
import { getCache, setCache } from "@/lib/cache";
import { getRecentEvents } from "@/lib/github";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username") ?? "";
  const parsed = usernameSchema.safeParse(username);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 });
  }
  const key = `recent:${username}`;
  const cached = getCache(key);
  if (cached) {
    return NextResponse.json(cached);
  }
  const data = await getRecentEvents(username);
  setCache(key, data);
  return NextResponse.json(data);
}
