import { NextRequest, NextResponse } from "next/server";
import { updateAutomationSettings, getAutomationSettings } from "@/lib/automation";
import { getHijriDate } from "@/lib/hijri";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/automation/settings
 * Body: { hijriOffset?: number }
 * Updates dynamic automation settings like Hijri offset (-1, 0, +1)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));

    let updatedSettings;
    if (body && body.hijriOffset !== undefined) {
      const offset = Number(body.hijriOffset);

      if (![-1, 0, 1].includes(offset)) {
        return NextResponse.json(
          { error: "হিজরি অফসেট অবশ্যই -১, ০ অথবা ১ হতে হবে।" },
          { status: 400 }
        );
      }

      updatedSettings = await updateAutomationSettings({
        hijriOffset: offset,
      });
    } else {
      updatedSettings = await getAutomationSettings();
    }

    const now = new Date();
    const hijriInfo = {
      ...getHijriDate(now, updatedSettings.hijriOffset),
      offset: updatedSettings.hijriOffset,
    };

    return NextResponse.json({
      success: true,
      settings: updatedSettings,
      hijriInfo,
    });
  } catch (error) {
    console.error("Admin automation settings error:", error);
    return NextResponse.json(
      { error: "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
