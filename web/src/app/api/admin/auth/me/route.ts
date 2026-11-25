import { NextRequest, NextResponse } from "next/server";
import { getAdminSession, verifyAdminSessionToken, ADMIN_SESSION_COOKIE_NAME } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Check cookie or authorization header
    const authHeader = req.headers.get("authorization");
    const bearerToken = authHeader?.replace(/^Bearer\s+/i, "");
    const cookieToken = req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;

    const token = bearerToken || cookieToken;
    const session = token ? await verifyAdminSessionToken(token) : await getAdminSession(req);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "অননুমোদিত অ্যাক্সেস" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      admin: session,
    });
  } catch (error) {
    console.error("Admin me route error:", error);
    return NextResponse.json(
      { success: false, error: "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
