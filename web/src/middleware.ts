import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE_NAME, verifyAdminSessionToken, sanitizeRedirectUrl } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";

  // Extract admin session token from Authorization header (case-insensitive) or cookie.
  // Bearer token takes precedence over cookie for API clients.
  const authHeader = request.headers.get("authorization");
  const bearerToken = authHeader?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
  const cookieToken = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const token = bearerToken || cookieToken;

  const session = token ? await verifyAdminSessionToken(token) : null;

  // 1. Admin login page handling (/admin/login or /admin/login/)
  if (normalizedPath === "/admin/login") {
    if (session) {
      // If already logged in as admin, redirect to target or default admin dashboard
      const rawFrom = request.nextUrl.searchParams.get("from");
      const safeFrom = sanitizeRedirectUrl(rawFrom, "/admin/applications");
      const redirectUrl = new URL(safeFrom, request.url);
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
  }

  // 2. Admin Auth APIs (login/logout/me) are handled by their respective controllers
  if (normalizedPath === "/api/admin/auth" || normalizedPath.startsWith("/api/admin/auth/")) {
    return NextResponse.next();
  }

  // 3. Guard public magic link creation hazard (/api/auth/magic-link/create)
  if (normalizedPath === "/api/auth/magic-link/create") {
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "অননুমোদিত অ্যাক্সেস। শুধুমাত্র অ্যাডমিন ম্যাজিক লিংক তৈরি করতে পারবেন।",
        },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // 4. Guard all /api/admin and /api/admin/:path* routes
  if (normalizedPath === "/api/admin" || normalizedPath.startsWith("/api/admin/")) {
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: "অননুমোদিত অ্যাক্সেস। অ্যাডমিন লগইন আবশ্যক।",
        },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  // 5. Root /admin page redirect to applications dashboard
  if (normalizedPath === "/admin") {
    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", "/admin/applications");
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.redirect(new URL("/admin/applications", request.url));
  }

  // 6. Guard all /admin/:path* page routes
  if (normalizedPath.startsWith("/admin/")) {
    if (!session) {
      const fromUrl = request.nextUrl.pathname + request.nextUrl.search;
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", fromUrl);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/api/admin",
    "/api/admin/:path*",
    "/api/auth/magic-link/create",
  ],
};
