import { NextResponse } from "next/server";
import { config } from "@/lib/config";

export async function POST() {
  const response = NextResponse.json({ data: { ok: true }, error: null });
  response.cookies.set(config.admin.cookieName, "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}
