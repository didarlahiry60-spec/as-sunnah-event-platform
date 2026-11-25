import { NextRequest, NextResponse } from "next/server";
import { createReliefBroadcast, getReliefBroadcastSummary, DisasterType } from "@/lib/relief";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/relief/broadcast
 * Initiates an urgent emergency relief SMS broadcast to a target district.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, district, disasterType, message } = body;

    if (!district || typeof district !== "string" || district.trim().length === 0) {
      return NextResponse.json(
        { error: "টার্গেট জেলা নির্বাচন করুন।" },
        { status: 400 }
      );
    }

    const validDisasters: DisasterType[] = ["FLOOD", "CYCLONE", "COLD_WAVE", "OTHER"];
    const disaster = (disasterType as DisasterType) || "FLOOD";
    if (!validDisasters.includes(disaster)) {
      return NextResponse.json(
        { error: "দুর্যোগের ধরন সঠিক নয়।" },
        { status: 400 }
      );
    }

    const broadcast = await createReliefBroadcast({
      title: title || `${district} জরুরি ত্রাণ সেল`,
      district: district.trim(),
      disasterType: disaster,
      message,
    });

    const summary = await getReliefBroadcastSummary(broadcast.id);

    return NextResponse.json(
      {
        success: true,
        broadcast,
        summary,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Initiate relief broadcast error:", error);
    return NextResponse.json(
      { error: "ত্রাণ ব্রডকাস্ট পাঠানো সম্ভব হয়নি।" },
      { status: 500 }
    );
  }
}
