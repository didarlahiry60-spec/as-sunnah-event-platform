import { NextRequest, NextResponse } from "next/server";
import { checkInApplicant, getApplicationByQrToken } from "@/lib/applications";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const limiter = rateLimit(request, { keyPrefix: "checkin-post", limit: 30, windowMs: 60 * 1000 });
    if (!limiter.allowed) {
      return rateLimitResponse(limiter.retryAfterSeconds, "চেক-ইন অনুরোধের সীমা অতিক্রম করেছে। কিছুক্ষণ পর আবার চেষ্টা করুন।");
    }

    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "কিউআর টোকেন প্রদান করুন" },
        { status: 400 }
      );
    }

    const result = await checkInApplicant(token);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Checkin error:", error);
    return NextResponse.json(
      { success: false, error: "চেক-ইন যাচাই করতে সমস্যা হয়েছে" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const limiter = rateLimit(request, { keyPrefix: "checkin-get", limit: 30, windowMs: 60 * 1000 });
    if (!limiter.allowed) {
      return rateLimitResponse(limiter.retryAfterSeconds, "চেক-ইন যাচাই অনুরোধের সীমা অতিক্রম করেছে। কিছুক্ষণ পর আবার চেষ্টা করুন।");
    }

    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "কিউআর টোকেন আবশ্যক" },
        { status: 400 }
      );
    }

    const app = await getApplicationByQrToken(token);
    if (!app) {
      return NextResponse.json(
        { found: false, error: "কোনো বৈধ আবেদন পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      found: true,
      application: app,
    });
  } catch (error) {
    console.error("Checkin lookup error:", error);
    return NextResponse.json(
      { error: "তথ্য লোড করা সম্ভব হয়নি" },
      { status: 500 }
    );
  }
}
