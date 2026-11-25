/**
 * Live Photo Wall & Executive Reporting Engine
 * As-Sunnah Foundation Event Management Platform
 * Timezone: Asia/Dhaka (UTC+6)
 *
 * Provides nationwide photo wall aggregation and 1-click executive reporting metrics.
 */

import { formatBengaliDate, toBengaliDigits } from "@/lib/format";
import { db } from "@/lib/db";
import {
  getAllSubmissions,
  ACTIVITY_CATEGORIES,
  ActivityType,
} from "@/lib/submissions";
import { getAllTraineeRecords, TraineeRecord } from "@/lib/trainee";
import { getAllReliefBroadcasts } from "@/lib/relief";

export interface LivePhotoWallItem {
  id: string;
  submissionId: string;
  photoUrl: string;
  title: string;
  traineeName: string;
  traineeMobile: string;
  mosqueName: string;
  district: string;
  activityType: ActivityType;
  activityLabelBn: string;
  points: number;
  date: string;
  formattedDateBn: string;
  notes: string;
  adminFeedback?: string;
}

export interface ActivityTypeBreakdown {
  code: ActivityType;
  labelBn: string;
  count: number;
  points: number;
  percentage: number;
}

export interface DistrictBreakdown {
  district: string;
  activityCount: number;
  traineeCount: number;
  pointsAwarded: number;
}

export interface ExecutiveReportSummary {
  totalTrainees: number;
  totalDistricts: number;
  totalActivitiesApproved: number;
  totalActivitiesPending: number;
  totalActivitiesRejected: number;
  totalPointsAwarded: number;
  totalPhotosCount: number;
  activityBreakdown: ActivityTypeBreakdown[];
  districtBreakdown: DistrictBreakdown[];
  recentHighImpactActivities: LivePhotoWallItem[];
  reliefSummary: {
    totalBroadcasts: number;
    totalVolunteersMobilized: number;
    totalReadyVolunteers: number;
    readyRatePercent: number;
  };
  generatedAt: string; // ISO
  generatedAtBn: string;
}

/**
 * Aggregates recent approved field activity photos across all districts
 * with Imam details, mosque name, and activity tag.
 */
export async function getLivePhotoWall(limit: number = 24): Promise<LivePhotoWallItem[]> {
  const safeLimit = typeof limit === "number" && limit > 0 ? limit : 24;
  const submissions = await getAllSubmissions();
  const approved = submissions.filter(
    s => s.status === "APPROVED" && Array.isArray(s.photos) && s.photos.length > 0
  );

  const items: LivePhotoWallItem[] = [];

  for (const sub of approved) {
    const meta = ACTIVITY_CATEGORIES[sub.activityType];
    const labelBn = meta ? meta.labelBn : "মাঠপর্যায়ের কার্যক্রম";
    let formattedDateBn = "সাম্প্রতিক";
    try {
      formattedDateBn = formatBengaliDate(new Date(sub.date || sub.createdAt));
    } catch {
      // fallback
    }

    // Filter out empty or whitespace-only photo URLs so Next.js <Image> never crashes
    const validPhotos = Array.isArray(sub.photos)
      ? sub.photos.filter(p => typeof p === "string" && p.trim().length > 0)
      : [];

    validPhotos.forEach((photoUrl, idx) => {
      items.push({
        id: `${sub.id}-img-${idx}`,
        submissionId: sub.id,
        photoUrl: photoUrl.trim(),
        title: sub.title,
        traineeName: sub.traineeName,
        traineeMobile: sub.traineeMobile,
        mosqueName: sub.venueName,
        district: sub.district || "বাংলাদেশ",
        activityType: sub.activityType,
        activityLabelBn: labelBn,
        points: sub.points,
        date: sub.date || sub.createdAt,
        formattedDateBn,
        notes: sub.notes,
        adminFeedback: sub.adminFeedback,
      });
    });
  }

  // Sort newest first
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return items.slice(0, safeLimit);
}

/**
 * Aggregates nationwide reporting data for 1-click executive reporting
 * including trainee totals, district coverage, approved activities,
 * points awarded, and breakdown by activity type.
 */
export async function getExecutiveReportSummary(): Promise<ExecutiveReportSummary> {
  let trainees = getAllTraineeRecords();
  try {
    const dbPersons = await db.person.findMany();
    if (dbPersons.length > 0) {
      const map = new Map<string, TraineeRecord>();
      trainees.forEach(t => map.set(t.id, t));
      for (const p of dbPersons) {
        if (!map.has(p.id)) {
          map.set(p.id, {
            id: p.id,
            name: p.name,
            mobile: p.mobile,
            category: p.category,
            division: p.division || undefined,
            district: p.district || undefined,
            upazila: p.upazila || undefined,
            unionName: p.unionName || undefined,
            mosqueName: p.mosqueName || undefined,
            totalPoints: p.totalPoints,
            internalStars: p.internalStars ?? 3,
            redFlag: p.redFlag,
            attendedClassIds: new Set(),
          });
        }
      }
      trainees = Array.from(map.values());
    }
  } catch {
    // DB offline fallback
  }

  const submissions = await getAllSubmissions();
  const reliefBroadcasts = await getAllReliefBroadcasts();

  const approved = submissions.filter(s => s.status === "APPROVED");
  const pending = submissions.filter(s => s.status === "PENDING");
  const rejected = submissions.filter(s => s.status === "REJECTED");

  const totalPointsAwarded = approved.reduce((sum, s) => sum + s.points, 0);

  // Count unique districts across trainees and submissions
  const districtSet = new Set<string>();
  trainees.forEach(t => {
    if (t.district && t.district.trim()) districtSet.add(t.district.trim());
  });
  submissions.forEach(s => {
    if (s.district && s.district.trim()) districtSet.add(s.district.trim());
  });

  // Count total photos
  let totalPhotosCount = 0;
  submissions.forEach(s => {
    if (Array.isArray(s.photos)) totalPhotosCount += s.photos.length;
  });

  // Activity breakdown
  const activityCodes: ActivityType[] = [
    "KHUTBAH",
    "CLEANUP",
    "TREE_PLANTING",
    "ONLINE_CLASS",
    "HALAQA",
    "SOCIAL_WORK",
  ];

  const totalApprovedCount = approved.length;
  const activityBreakdown: ActivityTypeBreakdown[] = activityCodes.map(code => {
    const meta = ACTIVITY_CATEGORIES[code];
    const match = approved.filter(s => s.activityType === code);
    const count = match.length;
    const points = match.reduce((sum, s) => sum + s.points, 0);
    const percentage = totalApprovedCount > 0 ? Math.round((count / totalApprovedCount) * 100) : 0;

    return {
      code,
      labelBn: meta ? meta.labelBn : code,
      count,
      points,
      percentage,
    };
  });

  // District breakdown (normalized by trim)
  const districtMap = new Map<
    string,
    { activityCount: number; traineeCount: number; pointsAwarded: number }
  >();

  districtSet.forEach(d => {
    districtMap.set(d, { activityCount: 0, traineeCount: 0, pointsAwarded: 0 });
  });

  trainees.forEach(t => {
    const d = t.district?.trim();
    if (d && districtMap.has(d)) {
      districtMap.get(d)!.traineeCount += 1;
    }
  });

  approved.forEach(s => {
    const d = s.district?.trim();
    if (d && districtMap.has(d)) {
      const entry = districtMap.get(d)!;
      entry.activityCount += 1;
      entry.pointsAwarded += s.points;
    }
  });

  const districtBreakdown: DistrictBreakdown[] = Array.from(districtMap.entries())
    .map(([district, data]) => ({
      district,
      activityCount: data.activityCount,
      traineeCount: data.traineeCount,
      pointsAwarded: data.pointsAwarded,
    }))
    .sort((a, b) => b.activityCount - a.activityCount || b.pointsAwarded - a.pointsAwarded);

  // Recent high impact activities (with photos)
  const recentHighImpactActivities = await getLivePhotoWall(6);

  // Relief statistics
  let totalVolunteersMobilized = 0;
  let totalReadyVolunteers = 0;
  reliefBroadcasts.forEach(b => {
    totalVolunteersMobilized += b.totalSent;
    totalReadyVolunteers += b.readyCount;
  });
  const reliefReadyRate =
    totalVolunteersMobilized > 0
      ? Math.round((totalReadyVolunteers / totalVolunteersMobilized) * 100)
      : 0;

  const now = new Date();
  const generatedAt = now.toISOString();
  let generatedAtBn = "";
  try {
    generatedAtBn = `${formatBengaliDate(now)}, ${toBengaliDigits(now.getHours().toString().padStart(2, "0"))}:${toBengaliDigits(now.getMinutes().toString().padStart(2, "0"))}`;
  } catch {
    generatedAtBn = now.toLocaleDateString("bn-BD");
  }

  return {
    totalTrainees: trainees.length,
    totalDistricts: districtSet.size,
    totalActivitiesApproved: approved.length,
    totalActivitiesPending: pending.length,
    totalActivitiesRejected: rejected.length,
    totalPointsAwarded,
    totalPhotosCount,
    activityBreakdown,
    districtBreakdown,
    recentHighImpactActivities,
    reliefSummary: {
      totalBroadcasts: reliefBroadcasts.length,
      totalVolunteersMobilized,
      totalReadyVolunteers,
      readyRatePercent: reliefReadyRate,
    },
    generatedAt,
    generatedAtBn,
  };
}
