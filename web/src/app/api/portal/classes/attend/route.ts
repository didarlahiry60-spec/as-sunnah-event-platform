import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { recordOnlineClassAttendance } from "@/lib/trainee";

export async function POST(req: NextRequest) {
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

    const body = await req.json().catch(() => ({}));
    const { classId } = body;

    if (!classId) {
      return NextResponse.json(
        { success: false, error: "ক্লাস আইডি প্রদান করা আবশ্যক" },
        { status: 400 }
      );
    }

    const result = await recordOnlineClassAttendance(session.personId, classId);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Portal class attendance error:", error);
    return NextResponse.json(
      { success: false, error: "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
