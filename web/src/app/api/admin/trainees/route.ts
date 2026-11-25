import { NextRequest, NextResponse } from "next/server";
import { getAdminTraineesList } from "@/lib/trainee-admin";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/trainees
 * Admin directory retrieving trainees with secret star ratings, red flags, and call logs.
 * STRICT SECURITY INVARIANT: Accessible ONLY from authenticated admin sessions.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get("district") || undefined;
    const search = searchParams.get("search") || undefined;
    const starRatingStr = searchParams.get("starRating");
    const hasRedFlagStr = searchParams.get("hasRedFlag");

    const parsedStar = starRatingStr ? parseInt(starRatingStr, 10) : undefined;
    const starRating =
      parsedStar && !isNaN(parsedStar) && parsedStar >= 1 && parsedStar <= 5
        ? parsedStar
        : undefined;
    let hasRedFlag: boolean | undefined = undefined;
    if (hasRedFlagStr === "true") hasRedFlag = true;
    if (hasRedFlagStr === "false") hasRedFlag = false;

    const trainees = await getAdminTraineesList({
      district,
      search,
      starRating,
      hasRedFlag,
    });

    return NextResponse.json({
      success: true,
      trainees,
      total: trainees.length,
    });
  } catch (error) {
    console.error("Admin trainees directory error:", error);
    return NextResponse.json(
      { error: "প্রশিক্ষণার্থী তালিকা লোড করা সম্ভব হয়নি।" },
      { status: 500 }
    );
  }
}
