import { NextRequest, NextResponse } from "next/server";
import { getOrCreateTraineeByMobile } from "@/lib/trainee";
import { createMagicLink } from "@/lib/magic-link";
import { getAdminSession, verifyAdminSessionToken, ADMIN_SESSION_COOKIE_NAME } from "@/lib/auth";

/**
 * POST /api/auth/magic-link/create
 * STRICT SECURITY INVARIANT:
 * Restricted strictly to authenticated admin sessions.
 * Public callers must NEVER be permitted to generate or retrieve raw magic link tokens.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Strict Admin Authentication Guard
    const authHeader = req.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : undefined;
    const cookieToken = req.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;

    const token = bearerToken || cookieToken;
    const adminSession = token
      ? await verifyAdminSessionToken(token)
      : await getAdminSession();

    if (!adminSession) {
      return NextResponse.json(
        {
          success: false,
          error: "অননুমোদিত অ্যাক্সেস। শুধুমাত্র অ্যাডমিন ম্যাজিক লিংক তৈরি করতে পারবেন।",
        },
        { status: 401 }
      );
    }

    // 2. Validate request body
    const body = await req.json().catch(() => ({}));
    const { mobile, expiresInMinutes, purpose, payload } = body;

    if (!mobile) {
      return NextResponse.json(
        { success: false, error: "মোবাইল নম্বর প্রদান আবশ্যক" },
        { status: 400 }
      );
    }

    const trainee = await getOrCreateTraineeByMobile(mobile);
    const magicLink = await createMagicLink({
      personId: trainee.id,
      purpose: purpose || "PORTAL_LOGIN",
      expiresInMinutes: expiresInMinutes || 60,
      payload,
    });

    return NextResponse.json({
      success: true,
      magicLink,
    });
  } catch (error) {
    console.error("Magic link creation error:", error);
    return NextResponse.json(
      { success: false, error: "ম্যাজিক লিংক তৈরিতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}
