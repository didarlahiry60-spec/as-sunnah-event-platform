import { NextRequest, NextResponse } from "next/server";
import { getAllSubmissions } from "@/lib/submissions";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/submissions
 * Lists all nationwide submissions with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || undefined;
    const district = searchParams.get("district") || undefined;
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;

    const submissions = await getAllSubmissions({
      type,
      district,
      status,
      search,
    });

    // Summary statistics
    const all = await getAllSubmissions();
    const stats = {
      total: all.length,
      pending: all.filter(s => s.status === "PENDING").length,
      approved: all.filter(s => s.status === "APPROVED").length,
      rejected: all.filter(s => s.status === "REJECTED").length,
      totalPointsAwarded: all
        .filter(s => s.status === "APPROVED")
        .reduce((sum, s) => sum + s.points, 0),
    };

    return NextResponse.json({
      success: true,
      submissions,
      total: submissions.length,
      stats,
    });
  } catch (error) {
    console.error("Admin list submissions error:", error);
    return NextResponse.json(
      { error: "কার্যক্রমের তালিকা লোড করা সম্ভব হয়নি।" },
      { status: 500 }
    );
  }
}
