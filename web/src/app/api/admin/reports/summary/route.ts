import { requireAdminApi } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { getExecutiveReportSummary } from "@/lib/reporting";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/reports/summary
 * Aggregates nationwide reporting data for 1-click executive reporting & print.
 */
export async function GET(request?: NextRequest) {
  const authError = await requireAdminApi(request);
  if (authError) return authError;

  try {
    const summary = await getExecutiveReportSummary();

    return NextResponse.json({
      success: true,
      report: summary,
    });
  } catch (error) {
    console.error("Executive report summary error:", error);
    return NextResponse.json(
      { error: "রিপোর্ট ডাটা লোড করা সম্ভব হয়নি।" },
      { status: 500 }
    );
  }
}
