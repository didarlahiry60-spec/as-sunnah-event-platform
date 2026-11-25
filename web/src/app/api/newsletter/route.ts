import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/newsletter";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const limiter = rateLimit(req, { keyPrefix: "newsletter-post", limit: 10, windowMs: 60 * 1000 });
    if (!limiter.allowed) {
      return rateLimitResponse(
        limiter.retryAfterSeconds,
        "অতিরিক্ত সাবস্ক্রিপশন অনুরোধ পাঠানো হয়েছে। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।"
      );
    }
    const body = await req.json();
    const { emailOrPhone } = body;

    if (!emailOrPhone || typeof emailOrPhone !== "string") {
      return NextResponse.json(
        { success: false, error: "অনুগ্রহ করে ইমেইল বা মোবাইল নম্বর দিন।" },
        { status: 400 }
      );
    }

    const res = await subscribeToNewsletter(emailOrPhone);
    if (!res.success) {
      return NextResponse.json({ success: false, error: res.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: res.message,
      subscriber: res.subscriber
    });
  } catch (err: unknown) {
    console.error("Newsletter subscription error:", err);
    return NextResponse.json(
      { success: false, error: "সাবস্ক্রিপশন সম্পন্ন করা যায়নি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
