import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { config as appConfig } from "@/lib/config";
import { verifySessionToken } from "@/lib/auth/session";

const WRITE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(appConfig.admin.cookieName)?.value;
  const authenticated = await verifySessionToken(token);

  if (pathname.startsWith("/api/")) {
    const isAuthRoute = pathname.startsWith("/api/auth/");
    if (WRITE_METHODS.has(request.method) && !isAuthRoute && !authenticated) {
      return NextResponse.json(
        { data: null, error: { message: "No autorizado" } },
        { status: 401 },
      );
    }
    return NextResponse.next();
  }

  const isLogin = pathname === "/admin/login";
  if (!authenticated && !isLogin) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  if (authenticated && isLogin) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
