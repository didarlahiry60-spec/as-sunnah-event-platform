import { NextRequest, NextResponse } from "next/server";
import { recordReliefResponse } from "@/lib/relief";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/relief/respond
 * Records or simulates trainee response ("1" / "2" / "READY" / "UNAVAILABLE") to a relief broadcast.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const broadcastId = body.broadcastId;
    const phoneOrId = body.traineePhone || body.phone || body.traineeId;
    const response = body.response;

    if (!broadcastId || !phoneOrId || typeof phoneOrId !== "string" || phoneOrId.trim().length === 0 || response === undefined) {
      return NextResponse.json(
        { error: "ব্রডকাস্ট আইডি, ফোন নম্বর এবং উত্তরের মান আবশ্যক।" },
        { status: 400 }
      );
    }

    const result = await recordReliefResponse(broadcastId, phoneOrId.trim(), String(response));

    return NextResponse.json({
      success: true,
      broadcastId: result.broadcastId,
      traineePhone: result.traineePhone,
      responseStatus: result.responseStatus,
      statusBn: result.statusBn,
      summary: result.summary,
    });
  } catch (error) {
    console.error("Record relief response error:", error);
    const isNotFound = error instanceof Error && error.message.includes("পাওয়া যায়নি");
    const message = isNotFound
      ? "ত্রাণ কার্যক্রম খুঁজে পাওয়া যায়নি।"
      : "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।";
    const status = isNotFound ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
