import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getWhatsAppChannelUrl, setWhatsAppChannelUrl } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    success: true,
    url: getWhatsAppChannelUrl(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "অননুমোদিত অ্যাক্সেস। অ্যাডমিন লগইন আবশ্যক।" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const result = setWhatsAppChannelUrl(body.url || "");

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "অবৈধ চ্যানেল লিংক" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      message: "হোয়াটসঅ্যাপ চ্যানেল লিংক সফলভাবে সংরক্ষিত হয়েছে",
    });
  } catch (err) {
    console.error("WhatsApp settings update error:", err);
    return NextResponse.json(
      { success: false, error: "সার্ভার ত্রুটি। অনুগ্রহ করে পুনরায় চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
