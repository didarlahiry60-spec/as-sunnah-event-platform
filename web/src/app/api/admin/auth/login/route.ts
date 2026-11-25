import { NextRequest, NextResponse } from "next/server";
import { authenticateAdmin } from "@/lib/admin-auth";
import { createAdminSessionToken, ADMIN_SESSION_COOKIE_NAME } from "@/lib/auth";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const limiter = rateLimit(req, { keyPrefix: "admin-login", limit: 10, windowMs: 60 * 1000 });
    if (!limiter.allowed) {
      return rateLimitResponse(
        limiter.retryAfterSeconds,
        "অতিরিক্ত অ্যাডমিন লগইন চেষ্টা করা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।"
      );
    }

    const body = await req.json().catch(() => ({}));
    const { email, password } = body;

    const result = await authenticateAdmin(email, password);
    if (!result.success || !result.admin) {
      return NextResponse.json(
        { success: false, error: result.error || "ভুল ইমেইল বা পাসওয়ার্ড" },
        { status: 401 }
      );
    }

    const token = await createAdminSessionToken(result.admin);

    const response = NextResponse.json({
      success: true,
      admin: result.admin,
      token,
    });

    response.cookies.set(ADMIN_SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "সার্ভারে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
