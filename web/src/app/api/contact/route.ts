import { NextRequest, NextResponse } from "next/server";
import { createContactMessage } from "@/lib/contact";
import { normalizeBdPhone } from "@/lib/format";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const limiter = rateLimit(req, { keyPrefix: "contact-post", limit: 10, windowMs: 60 * 1000 });
    if (!limiter.allowed) {
      return rateLimitResponse(
        limiter.retryAfterSeconds,
        "অতিরিক্ত বার্তা পাঠানোর অনুরোধ করা হয়েছে। অনুগ্রহ করে কিছুক্ষণ অপেক্ষা করুন।"
      );
    }
    const body = await req.json();
    const { name, phone, email, subject, message } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "আপনার নাম লিখুন" },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { success: false, error: "মোবাইল নম্বর লিখুন" },
        { status: 400 }
      );
    }

    const cleanPhone = normalizeBdPhone(phone);
    if (!cleanPhone || !/^01[3-9]\d{8}$/.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: "সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন" },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return NextResponse.json(
        { success: false, error: "বার্তার বিষয়টি উল্লেখ করুন" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "অনুগ্রহ করে বিস্তারিত বার্তা লিখুন" },
        { status: 400 }
      );
    }

    const saved = await createContactMessage({
      name,
      phone,
      email,
      subject,
      message
    });

    return NextResponse.json({
      success: true,
      message: "আপনার বার্তা সফলভাবে গ্রহণ করা হয়েছে। আস-সুন্নাহ ফাউন্ডেশন প্রতিনিধি দ্রুত যোগাযোগ করবেন।",
      id: saved.id
    });
  } catch (err: unknown) {
    console.error("Error processing contact inquiry:", err);
    return NextResponse.json(
      { success: false, error: "সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
