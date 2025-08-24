import { NextRequest, NextResponse } from "next/server";
import { contributionsSchema } from "@/lib/validation";
import { getCache, setCache } from "@/lib/cache";
import { transformCalendar } from "@/lib/github";

export async function POST(req: NextRequest) {
  const json = await req.json();
  const parsed = contributionsSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const { username, from, to } = parsed.data;
  const key = `contrib:${username}:${from ?? ""}:${to ?? ""}`;
  const cached = getCache(key);
  if (cached) {
    return NextResponse.json(cached);
  }
  const data = transformCalendar({ username, from, to });
  setCache(key, data);
  return NextResponse.json(data);
}
