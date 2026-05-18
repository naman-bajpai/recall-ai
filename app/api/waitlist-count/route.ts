import { NextResponse } from "next/server";

export const runtime = "edge";

export function GET() {
  const count = Number(process.env.WAITLIST_COUNT ?? 0);
  return NextResponse.json({ count });
}
