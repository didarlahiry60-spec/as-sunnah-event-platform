import { NextRequest, NextResponse } from "next/server";
import { requestOtp } from "@/lib/otp";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const limiter = rateLimit(req, { keyPrefix: "otp-send", limit: 5, windowMs: 60 * 1000 });
    if (!limiter.allowed) {
      const waitSec = limiter.retryAfterSeconds || 60;
      return rateLimitResponse(
        waitSec,
        `অতিরিক্ত ওটিপি অনুরোধ পাঠানো হয়েছে। অনুগ্রহ করে ${waitSec} সেকেন্ড অপেক্ষা করুন।`
      );
    }

    const body = await req.json().catch(() => ({}));
    const mobile = body.mobile;

    if (!mobile) {
      return NextResponse.json(
        { success: false, error: "মোবাইল নম্বর প্রদান করা আবশ্যক" },
        { status: 400 }
      );
    }

    const result = requestOtp(mobile);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    // STRICT SECURITY INVARIANT:
    // simulatedOtp must NEVER be exposed in the client-facing API response
    return NextResponse.json({
      success: true,
      mobile: result.mobile,
      expiresInSeconds: result.expiresInSeconds,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "সার্ভারে ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
