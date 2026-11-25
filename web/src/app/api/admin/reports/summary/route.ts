import { NextResponse } from "next/server";
import { getExecutiveReportSummary } from "@/lib/reporting";

export const dynamic = "force-dynamic";

/**
 * GET /api/admin/reports/summary
 * Aggregates nationwide reporting data for 1-click executive reporting & print.
 */
export async function GET() {
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
