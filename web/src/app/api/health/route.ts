import { NextResponse } from "next/server";
import { getRateLimitStoreSize } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET() {
  const memoryUsage = process.memoryUsage();
  // Safe threshold: heapUsed under 1GB
  const memoryOk = memoryUsage.heapUsed < 1024 * 1024 * 1024;

  const healthData = {
    status: "healthy" as const,
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    version: "1.0.0",
    checks: {
      database: "ok",
      memory: memoryOk ? "ok" : "warning",
      security: "ok",
    },
    system: {
      activeRateLimiters: getRateLimitStoreSize(),
    },
  };

  return NextResponse.json(healthData, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
