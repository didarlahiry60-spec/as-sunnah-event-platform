import { NextRequest, NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otp";
import { getOrCreateTraineeByMobile, sanitizeTraineeProfile } from "@/lib/trainee";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const limiter = rateLimit(req, { keyPrefix: "otp-verify", limit: 5, windowMs: 60 * 1000 });
    if (!limiter.allowed) {
      return rateLimitResponse(limiter.retryAfterSeconds, "অতিরিক্ত ওটিপি যাচাই চেষ্টা করা হয়েছে। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।");
    }

    const body = await req.json().catch(() => ({}));
    const { mobile, otp } = body;

    if (!mobile || !otp) {
      return NextResponse.json(
        { success: false, error: "মোবাইল নম্বর ও ওটিপি কোড প্রদান আবশ্যক" },
        { status: 400 }
      );
    }

    const verification = verifyOtp(mobile, otp);
    if (!verification.success || !verification.mobile) {
      return NextResponse.json(
        { success: false, error: verification.error || "ভুল ওটিপি কোড" },
        { status: 401 }
      );
    }

    // Retrieve or initialize trainee profile
    const trainee = await getOrCreateTraineeByMobile(verification.mobile);

    // Create session token
    const token = await createSessionToken({
      personId: trainee.id,
      mobile: trainee.mobile,
      name: trainee.name,
      category: trainee.category,
    });

    const res = NextResponse.json({
      success: true,
      trainee: sanitizeTraineeProfile(trainee as unknown as Record<string, unknown>),
    });

    // Set HTTPOnly cookie
    res.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return res;
  } catch {
    return NextResponse.json(
      { success: false, error: "লগইন যাচাইকরণে ত্রুটি হয়েছে" },
      { status: 500 }
    );
  }
}
