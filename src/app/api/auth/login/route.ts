import { z } from "zod";
import { NextResponse } from "next/server";
import { fail, handle, readJson } from "@/lib/api";
import { config } from "@/lib/config";
import { createSessionToken, verifyPassword } from "@/lib/auth/session";

const loginSchema = z.object({ password: z.string().min(1) });

export async function POST(request: Request) {
  return handle(async () => {
    const { password } = loginSchema.parse(await readJson(request));
    if (!(await verifyPassword(password))) {
      return fail("Contraseña incorrecta", 401);
    }
    const response = NextResponse.json({ data: { ok: true }, error: null });
    response.cookies.set(config.admin.cookieName, await createSessionToken(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: config.admin.sessionHours * 3600,
    });
    return response;
  });
}
