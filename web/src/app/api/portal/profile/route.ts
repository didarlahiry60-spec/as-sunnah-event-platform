import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { getTraineeFullProfile } from "@/lib/trainee";

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
        { success: false, error: "সেশনের মেয়াদ শেষ হয়েছে। পুনরায় লগইন করুন।" },
        { status: 401 }
      );
    }

    const profile = await getTraineeFullProfile(session.personId);
    if (!profile) {
      return NextResponse.json(
        { success: false, error: "প্রশিক্ষণার্থী প্রোফাইল পাওয়া যায়নি" },
        { status: 404 }
      );
    }

    // Security guarantee: explicitly ensure admin fields are not present
    const safeProfile = { ...(profile as unknown as Record<string, unknown>) };
    delete safeProfile.internalStars;
    delete safeProfile.redFlag;
    delete safeProfile.callLogs;
    delete safeProfile.attendedClassIds;

    return NextResponse.json({
      success: true,
      profile: safeProfile,
    });
  } catch (error) {
    console.error("Portal profile error:", error);
    return NextResponse.json(
      { success: false, error: "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
