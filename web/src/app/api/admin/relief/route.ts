import { NextRequest, NextResponse } from "next/server";
import { getAllReliefBroadcasts, getReliefBroadcastSummary } from "@/lib/relief";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/relief
 * Lists all emergency relief broadcasts with live tallies, or returns a single summary.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const broadcastId = searchParams.get("broadcastId");

    if (broadcastId) {
      const summary = await getReliefBroadcastSummary(broadcastId);
      return NextResponse.json({
        success: true,
        summary,
      });
    }

    const broadcasts = await getAllReliefBroadcasts();

    return NextResponse.json({
      success: true,
      broadcasts,
      total: broadcasts.length,
    });
  } catch (error) {
    console.error("Admin relief broadcasts error:", error);
    const isNotFound = error instanceof Error && error.message.includes("পাওয়া যায়নি");
    const message = isNotFound
      ? "ত্রাণ সেলের তথ্য খুঁজে পাওয়া যায়নি।"
      : "অনুরোধটি সম্পন্ন করা সম্ভব হয়নি। অনুগ্রহ করে কিছুক্ষণ পর আবার চেষ্টা করুন।";
    const status = isNotFound ? 404 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
