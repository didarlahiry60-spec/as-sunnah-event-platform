import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { getCertificatesByPersonId } from "@/lib/certificates";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, error: "অননুমোদিত: অনুগ্রহ করে পোর্টালে লগইন করুন" },
        { status: 401 }
      );
    }

    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "সেশনের মেয়াদ শেষ হয়েছে।" },
        { status: 401 }
      );
    }

    const certificates = await getCertificatesByPersonId(session.personId);
    return NextResponse.json({
      success: true,
      certificates,
    });
  } catch (error) {
    console.error("Portal certificates error:", error);
    return NextResponse.json(
      { success: false, error: "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
