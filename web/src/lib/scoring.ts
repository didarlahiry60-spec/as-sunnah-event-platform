/**
 * Activity Scoring & Inactivity Red-Flag logic for As-Sunnah Foundation Platform
 */

export const DEFAULT_ACTIVITY_SCORES = {
  KHUTBAH: 5,
  CLEANUP: 20,
  TREE: 20,
  CLASS: 20,
  HALAQA: 15,
} as const;

export type ActivityCode = keyof typeof DEFAULT_ACTIVITY_SCORES;

export const INACTIVITY_RED_FLAG_DAYS = 60;

/**
 * Calculates total score earned from a list of submissions
 */
export function calculateTotalScore(submissions: Array<{ pointsAwarded: number }>): number {
  return submissions.reduce((total, sub) => total + (sub.pointsAwarded || 0), 0);
}

/**
 * Determines whether a trainee should be red-flagged for inactivity (>= 60 days without submission)
 */
export function isTraineeInactive(
  lastActivityAt: Date | string | number | null | undefined,
  now: Date = new Date()
): boolean {
  if (!lastActivityAt) return true;
  const lastTime = typeof lastActivityAt === "object" ? lastActivityAt.getTime() : new Date(lastActivityAt).getTime();
  const diffDays = (now.getTime() - lastTime) / (1000 * 60 * 60 * 24);
  return diffDays >= INACTIVITY_RED_FLAG_DAYS;
}
