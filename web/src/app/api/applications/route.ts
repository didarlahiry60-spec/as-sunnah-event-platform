import { NextRequest, NextResponse } from "next/server";
import { createApplication } from "@/lib/applications";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { ZodError } from "zod";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const limiter = rateLimit(request, { keyPrefix: "applications", limit: 10, windowMs: 60 * 1000 });
    if (!limiter.allowed) {
      return rateLimitResponse(limiter.retryAfterSeconds, "আবেদন অনুরোধের সীমা অতিক্রম করেছে। কিছুক্ষণ অপেক্ষা করে আবার চেষ্টা করুন।");
    }

    const body = await request.json();
    const result = await createApplication(body);

    return NextResponse.json(
      {
        success: true,
        applicationNumber: result.application.number,
        qrToken: result.application.qrToken,
        application: result.application,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: "তথ্য যাচাইকরণে ত্রুটি রয়েছে",
          issues: error.issues.map(i => ({ path: i.path.join("."), message: i.message })),
        },
        { status: 422 }
      );
    }

    console.error("Application submission error:", error);
    return NextResponse.json(
      { success: false, error: "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
