/**
 * Background Automation Engine & Job Scheduler
 * As-Sunnah Foundation Event Management Platform
 * Timezone: Asia/Dhaka (UTC+6)
 */

import { db } from "@/lib/db";
import { getHijriDate } from "@/lib/hijri";
import { toBengaliDigits } from "@/lib/format";
import { isTraineeInactive, INACTIVITY_RED_FLAG_DAYS } from "@/lib/scoring";
import { getAllSubmissions } from "@/lib/submissions";
import { messages } from "@/lib/messages";
import { getTraineeRecordById } from "@/lib/trainee";

export type JobKey =
  | "KHUTBAH_PUSH"
  | "AMAL_REMINDER"
  | "AYYAM_AL_BEED"
  | "MONTHLY_REPORT_REMINDER"
  | "REDFLAG_SCAN";

export type JobStatus = "IDLE" | "RUNNING" | "SUCCESS" | "FAILED";
export type JobCategory = "DISPATCH" | "REMINDER" | "AUDIT";

export const AUTOMATION_JOB_KEYS: JobKey[] = [
  "KHUTBAH_PUSH",
  "AMAL_REMINDER",
  "AYYAM_AL_BEED",
  "MONTHLY_REPORT_REMINDER",
  "REDFLAG_SCAN",
];

export interface JobDefinition {
  key: JobKey;
  titleBn: string;
  descriptionBn: string;
  cronExpression: string;
  scheduleBn: string;
  category: JobCategory;
  lastRunAt: string | null;
  lastStatus: JobStatus;
  lastSummary: string | null;
  nextRunAt?: string;
  nextRunBn?: string;
}

export interface DispatchedMessage {
  recipientId?: string;
  recipientName: string;
  recipientMobile: string;
  channel: "SMS" | "PUSH" | "IN_APP";
  message: string;
  status: "SENT" | "FAILED";
  sentAt: string;
}

export interface ExecutionLog {
  id: string;
  jobKey: JobKey;
  jobTitleBn: string;
  triggeredAt: string;
  completedAt: string;
  status: "SUCCESS" | "FAILED";
  recipientCount: number;
  payloadSummary: string;
  dispatches?: DispatchedMessage[];
  details?: Record<string, unknown>;
}

export interface AutomationSettings {
  hijriOffset: number; // -1, 0, or +1
}

export interface RedFlaggedTrainee {
  id: string;
  name: string;
  mobile: string;
  category: string;
  district?: string | null;
  mosqueName?: string | null;
  lastActiveAt?: string | null;
  daysInactive: number;
  redFlag: boolean;
  callNeeded: boolean;
  reasonBn: string;
}

export interface JobExecutionResult {
  success: boolean;
  jobKey: JobKey;
  jobTitleBn: string;
  triggeredAt: string;
  completedAt: string;
  recipientCount: number;
  summaryBn: string;
  logId: string;
  dispatches?: DispatchedMessage[];
  details?: Record<string, unknown>;
}

// -------------------------------------------------------------
// Timezone Helpers (Asia/Dhaka UTC+6)
// -------------------------------------------------------------
export function getDhakaParts(date: Date) {
  const utc = date.getTime();
  const dhakaTime = new Date(utc + 6 * 3600 * 1000);
  return {
    year: dhakaTime.getUTCFullYear(),
    month: dhakaTime.getUTCMonth(), // 0-indexed
    date: dhakaTime.getUTCDate(),
    day: dhakaTime.getUTCDay(), // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
    hours: dhakaTime.getUTCHours(),
    minutes: dhakaTime.getUTCMinutes(),
  };
}

export function makeDhakaDate(
  year: number,
  month: number,
  date: number,
  hours: number,
  minutes: number = 0,
  seconds: number = 0
): Date {
  return new Date(Date.UTC(year, month, date, hours - 6, minutes, seconds));
}

const BENGALI_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

export function formatScheduleDateTimeBn(date: Date): string {
  const { year, month, date: dayNum, hours, minutes } = getDhakaParts(date);
  const bnDay = toBengaliDigits(dayNum);
  const bnYear = toBengaliDigits(year);
  const bnMonth = BENGALI_MONTHS[month];

  let periodBn = "সকাল";
  let displayHours = hours;

  if (hours === 0) {
    periodBn = "রাত";
    displayHours = 12;
  } else if (hours < 6) {
    periodBn = "রাত";
  } else if (hours < 12) {
    periodBn = "সকাল";
  } else if (hours === 12) {
    periodBn = "দুপুর";
  } else if (hours < 15) {
    periodBn = "দুপুর";
    displayHours = hours - 12;
  } else if (hours < 18) {
    periodBn = "বিকাল";
    displayHours = hours - 12;
  } else if (hours < 20) {
    periodBn = "সন্ধ্যা";
    displayHours = hours - 12;
  } else {
    periodBn = "রাত";
    displayHours = hours - 12;
  }

  const bnHours = toBengaliDigits(displayHours);
  const bnMinutes = toBengaliDigits(String(minutes).padStart(2, "0"));

  return `${bnDay} ${bnMonth} ${bnYear}, ${periodBn} ${bnHours}:${bnMinutes} টা`;
}

// -------------------------------------------------------------
// Next Scheduled Run Calculation
// -------------------------------------------------------------
export function calculateNextRun(
  jobKey: JobKey,
  fromDate: Date = new Date(),
  hijriOffset: number = 0
): { date: Date; dateBn: string; iso: string } {
  const parts = getDhakaParts(fromDate);
  let targetDate: Date;

  switch (jobKey) {
    case "KHUTBAH_PUSH": {
      // Tuesday 10:00 AM Asia/Dhaka
      // day: 2
      let daysUntilTuesday = (2 - parts.day + 7) % 7;
      if (daysUntilTuesday === 0 && parts.hours >= 10) {
        daysUntilTuesday = 7;
      }
      targetDate = makeDhakaDate(
        parts.year,
        parts.month,
        parts.date + daysUntilTuesday,
        10,
        0,
        0
      );
      break;
    }

    case "AMAL_REMINDER": {
      // Sunday (0) and Wednesday (3) at 16:30
      let chosenDaysAhead = -1;
      // Check today first
      if (
        (parts.day === 0 || parts.day === 3) &&
        (parts.hours < 16 || (parts.hours === 16 && parts.minutes < 30))
      ) {
        chosenDaysAhead = 0;
      } else {
        for (let i = 1; i <= 7; i++) {
          const nextDay = (parts.day + i) % 7;
          if (nextDay === 0 || nextDay === 3) {
            chosenDaysAhead = i;
            break;
          }
        }
      }
      targetDate = makeDhakaDate(
        parts.year,
        parts.month,
        parts.date + chosenDaysAhead,
        16,
        30,
        0
      );
      break;
    }

    case "AYYAM_AL_BEED": {
      // Hijri Day 12 after Maghrib (18:30)
      targetDate = fromDate;
      for (let offset = 0; offset <= 45; offset++) {
        const candidate = makeDhakaDate(
          parts.year,
          parts.month,
          parts.date + offset,
          18,
          30,
          0
        );
        if (candidate.getTime() <= fromDate.getTime()) {
          continue;
        }
        const hijri = getHijriDate(candidate, hijriOffset);
        if (hijri.day === 12) {
          targetDate = candidate;
          break;
        }
      }
      if (targetDate.getTime() <= fromDate.getTime()) {
        targetDate = makeDhakaDate(
          parts.year,
          parts.month,
          parts.date + 29,
          18,
          30,
          0
        );
      }
      break;
    }

    case "MONTHLY_REPORT_REMINDER": {
      // Gregorian 25th at 10:00 AM
      if (parts.date < 25 || (parts.date === 25 && parts.hours < 10)) {
        targetDate = makeDhakaDate(parts.year, parts.month, 25, 10, 0, 0);
      } else {
        targetDate = makeDhakaDate(parts.year, parts.month + 1, 25, 10, 0, 0);
      }
      break;
    }

    case "REDFLAG_SCAN": {
      // Nightly 02:00 AM
      if (parts.hours < 2) {
        targetDate = makeDhakaDate(parts.year, parts.month, parts.date, 2, 0, 0);
      } else {
        targetDate = makeDhakaDate(parts.year, parts.month, parts.date + 1, 2, 0, 0);
      }
      break;
    }
  }

  return {
    date: targetDate,
    dateBn: formatScheduleDateTimeBn(targetDate),
    iso: targetDate.toISOString(),
  };
}

// -------------------------------------------------------------
// In-Memory State Store
// -------------------------------------------------------------
interface AutomationState {
  settings: AutomationSettings;
  jobMeta: Map<
    JobKey,
    {
      lastRunAt: string | null;
      lastStatus: JobStatus;
      lastSummary: string | null;
    }
  >;
  logs: ExecutionLog[];
  completedCallIds: Set<string>;
}

const DEFAULT_SETTINGS: AutomationSettings = {
  hijriOffset: 0,
};

function createInitialState(): AutomationState {
  const jobMeta = new Map<
    JobKey,
    { lastRunAt: string | null; lastStatus: JobStatus; lastSummary: string | null }
  >();

  AUTOMATION_JOB_KEYS.forEach(key => {
    jobMeta.set(key, {
      lastRunAt: null,
      lastStatus: "IDLE",
      lastSummary: null,
    });
  });

  // Seed with realistic previous runs
  const initialLogs: ExecutionLog[] = [
    {
      id: "LOG-2026-0001",
      jobKey: "KHUTBAH_PUSH",
      jobTitleBn: messages.adminAutomation.jobs.KHUTBAH_PUSH.title,
      triggeredAt: "2026-11-17T04:00:00.000Z", // Tuesday 10:00 AM Dhaka
      completedAt: "2026-11-17T04:00:03.000Z",
      status: "SUCCESS",
      recipientCount: 2,
      payloadSummary: "সাপ্তাহিক খুতবা ও সমকালীন নির্দেশিকা সফলভাবে পাঠানো হয়েছে।",
      dispatches: [
        {
          recipientId: "person-mock-1",
          recipientName: "মুফতি আব্দুর রহমান",
          recipientMobile: "01711223344",
          channel: "SMS",
          message:
            "আস-সালামু আলাইকুম। আসন্ন জুমার খুতবা গাইডলাইন: https://assunnah.org/khutbah/latest",
          status: "SENT",
          sentAt: "2026-11-17T04:00:02.000Z",
        },
      ],
    },
    {
      id: "LOG-2026-0002",
      jobKey: "REDFLAG_SCAN",
      jobTitleBn: messages.adminAutomation.jobs.REDFLAG_SCAN.title,
      triggeredAt: "2026-11-19T20:00:00.000Z", // 02:00 AM Dhaka
      completedAt: "2026-11-19T20:00:02.000Z",
      status: "SUCCESS",
      recipientCount: 1,
      payloadSummary: "১ জন প্রশিক্ষণার্থী বিগত ৬০ দিনে নিষ্ক্রিয় চিহ্নিত এবং রেড-ফ্ল্যাগ করা হয়েছে।",
    },
  ];

  jobMeta.set("KHUTBAH_PUSH", {
    lastRunAt: "2026-11-17T04:00:03.000Z",
    lastStatus: "SUCCESS",
    lastSummary: "সাপ্তাহিক খুতবা ও সমকালীন নির্দেশিকা সফলভাবে পাঠানো হয়েছে।",
  });

  jobMeta.set("REDFLAG_SCAN", {
    lastRunAt: "2026-11-19T20:00:02.000Z",
    lastStatus: "SUCCESS",
    lastSummary: "১ জন প্রশিক্ষণার্থী বিগত ৬০ দিনে নিষ্ক্রিয় চিহ্নিত এবং রেড-ফ্ল্যাগ করা হয়েছে।",
  });

  return {
    settings: { ...DEFAULT_SETTINGS },
    jobMeta,
    logs: initialLogs,
    completedCallIds: new Set<string>(),
  };
}

let state: AutomationState = createInitialState();

export function resetAutomationStore(): void {
  state = createInitialState();
}

function commitExecutionLog(
  log: ExecutionLog,
  jobKey: JobKey,
  summaryBn: string,
  completedAt: string
): void {
  state.logs.unshift(log);
  if (state.logs.length > 100) {
    state.logs = state.logs.slice(0, 100);
  }
  state.jobMeta.set(jobKey, {
    lastRunAt: completedAt,
    lastStatus: "SUCCESS",
    lastSummary: summaryBn,
  });
}

// -------------------------------------------------------------
// Settings Management
// -------------------------------------------------------------
export async function getAutomationSettings(): Promise<AutomationSettings> {
  try {
    const s = await db.setting.findUnique({
      where: { key: "automation_settings" },
    });
    if (s && typeof s.value === "object" && s.value !== null) {
      const v = s.value as { hijriOffset?: number };
      if (typeof v.hijriOffset === "number") {
        state.settings.hijriOffset = v.hijriOffset;
      }
    }
  } catch {
    // DB offline fallback
  }
  return { ...state.settings };
}

export async function updateAutomationSettings(input: {
  hijriOffset?: number;
}): Promise<AutomationSettings> {
  if (input.hijriOffset !== undefined) {
    if (![-1, 0, 1].includes(input.hijriOffset)) {
      throw new Error("হিজরি অফসেট অবশ্যই -১, ০ অথবা ১ হতে হবে।");
    }
    state.settings.hijriOffset = input.hijriOffset;

    try {
      await db.setting.upsert({
        where: { key: "automation_settings" },
        create: {
          key: "automation_settings",
          value: { hijriOffset: input.hijriOffset },
        },
        update: {
          value: { hijriOffset: input.hijriOffset },
        },
      });
    } catch {
      // DB offline fallback
    }
  }

  return { ...state.settings };
}

// -------------------------------------------------------------
// Job Definitions & Status
// -------------------------------------------------------------
export async function getJobSchedule(
  jobKey: JobKey,
  now: Date = new Date()
): Promise<JobDefinition> {
  const meta = state.jobMeta.get(jobKey) || {
    lastRunAt: null,
    lastStatus: "IDLE",
    lastSummary: null,
  };
  const settings = await getAutomationSettings();
  const next = calculateNextRun(jobKey, now, settings.hijriOffset);
  const jobMsg = messages.adminAutomation.jobs[jobKey];

  const cronMap: Record<JobKey, { cron: string; category: JobCategory }> = {
    KHUTBAH_PUSH: { cron: "0 10 * * 2", category: "DISPATCH" },
    AMAL_REMINDER: { cron: "30 16 * * 0,3", category: "REMINDER" },
    AYYAM_AL_BEED: { cron: "30 18 * * *", category: "REMINDER" },
    MONTHLY_REPORT_REMINDER: { cron: "0 10 25 * *", category: "REMINDER" },
    REDFLAG_SCAN: { cron: "0 2 * * *", category: "AUDIT" },
  };

  return {
    key: jobKey,
    titleBn: jobMsg.title,
    descriptionBn: jobMsg.description,
    cronExpression: cronMap[jobKey].cron,
    scheduleBn: jobMsg.schedule,
    category: cronMap[jobKey].category,
    lastRunAt: meta.lastRunAt,
    lastStatus: meta.lastStatus,
    lastSummary: meta.lastSummary,
    nextRunAt: next.iso,
    nextRunBn: next.dateBn,
  };
}

export async function getAllJobs(now: Date = new Date()): Promise<JobDefinition[]> {
  const jobs: JobDefinition[] = [];
  for (const key of AUTOMATION_JOB_KEYS) {
    jobs.push(await getJobSchedule(key, now));
  }
  return jobs;
}

// -------------------------------------------------------------
// Core Job Handlers
// -------------------------------------------------------------

/**
 * Job 1: KHUTBAH_PUSH
 * Dispatches weekly Friday Khutbah PDF & guidelines to imams.
 */
export async function executeKhutbahPush(options?: {
  now?: Date;
}): Promise<JobExecutionResult> {
  const startTime = options?.now || new Date();
  const jobKey: JobKey = "KHUTBAH_PUSH";
  const jobTitleBn = messages.adminAutomation.jobs.KHUTBAH_PUSH.title;

  const mockRecipients = [
    {
      id: "person-mock-1",
      name: "মুফতি আব্দুর রহমান",
      mobile: "01711223344",
      category: "IMAM",
    },
    {
      id: "person-mock-2",
      name: "মাওলানা মাহমুদুল হাসান",
      mobile: "01822334455",
      category: "IMAM",
    },
  ];

  const messageText =
    "আস-সালামু আলাইকুম। আস-সুন্নাহ ফাউন্ডেশনের পক্ষ থেকে আসন্ন জুমার খুতবা সহায়িকা ও সমকালীন বিষয়বস্তু গাইডলাইন পাঠানো হয়েছে। ডাউনলোড লিঙ্ক: https://assunnah.org/khutbah/latest";

  const dispatches: DispatchedMessage[] = mockRecipients.map(r => ({
    recipientId: r.id,
    recipientName: r.name,
    recipientMobile: r.mobile,
    channel: "SMS",
    message: messageText,
    status: "SENT",
    sentAt: startTime.toISOString(),
  }));

  try {
    await db.messageLog.createMany({
      data: dispatches.map(d => ({
        personId: d.recipientId,
        channel: d.channel,
        body: d.message,
        status: d.status,
      })),
    });
  } catch {
    // DB offline fallback
  }

  const completedAt = new Date().toISOString();
  const logId = `LOG-${Date.now()}`;
  const summaryBn = `মোট ${toBengaliDigits(dispatches.length)} জন ইমামের কাছে সাপ্তাহিক জুমার খুতবা PDF ও সমকালীন নির্দেশিকা সফলভাবে প্রেরণ করা হয়েছে।`;

  const log: ExecutionLog = {
    id: logId,
    jobKey,
    jobTitleBn,
    triggeredAt: startTime.toISOString(),
    completedAt,
    status: "SUCCESS",
    recipientCount: dispatches.length,
    payloadSummary: summaryBn,
    dispatches,
  };

  commitExecutionLog(log, jobKey, summaryBn, completedAt);

  return {
    success: true,
    jobKey,
    jobTitleBn,
    triggeredAt: startTime.toISOString(),
    completedAt,
    recipientCount: dispatches.length,
    summaryBn,
    logId,
    dispatches,
  };
}

/**
 * Job 2: AMAL_REMINDER
 * Dispatches Sunnah amal and talim reminder to active trainees.
 */
export async function executeAmalReminder(options?: {
  now?: Date;
}): Promise<JobExecutionResult> {
  const startTime = options?.now || new Date();
  const jobKey: JobKey = "AMAL_REMINDER";
  const jobTitleBn = messages.adminAutomation.jobs.AMAL_REMINDER.title;

  const mockRecipients = [
    {
      id: "person-mock-1",
      name: "মুফতি আব্দুর রহমান",
      mobile: "01711223344",
    },
    {
      id: "person-mock-2",
      name: "মাওলানা মাহমুদুল হাসান",
      mobile: "01822334455",
    },
    {
      id: "person-mock-3",
      name: "মাওলানা আব্দুল কুদ্দুস",
      mobile: "01933445566",
    },
  ];

  const messageText =
    "আস-সালামু আলাইকুম। আজ সাপ্তাহিক সুন্নাহ আমল ও তা'লিমের দিন। নিজের আমল মুহাসাবা করুন এবং পরিবার-মহল্লায় তা'লিম চালু রাখুন। — আস-সুন্নাহ ফাউন্ডেশন";

  const dispatches: DispatchedMessage[] = mockRecipients.map(r => ({
    recipientId: r.id,
    recipientName: r.name,
    recipientMobile: r.mobile,
    channel: "SMS",
    message: messageText,
    status: "SENT",
    sentAt: startTime.toISOString(),
  }));

  try {
    await db.messageLog.createMany({
      data: dispatches.map(d => ({
        personId: d.recipientId,
        channel: d.channel,
        body: d.message,
        status: d.status,
      })),
    });
  } catch {
    // DB offline fallback
  }

  const completedAt = new Date().toISOString();
  const logId = `LOG-${Date.now()}`;
  const summaryBn = `মোট ${toBengaliDigits(dispatches.length)} জন প্রশিক্ষণার্থীর নিকট সাপ্তাহিক সুন্নাহ আমল ও তা'লিম রিমাইন্ডার সফলভাবে প্রেরণ করা হয়েছে।`;

  const log: ExecutionLog = {
    id: logId,
    jobKey,
    jobTitleBn,
    triggeredAt: startTime.toISOString(),
    completedAt,
    status: "SUCCESS",
    recipientCount: dispatches.length,
    payloadSummary: summaryBn,
    dispatches,
  };

  commitExecutionLog(log, jobKey, summaryBn, completedAt);

  return {
    success: true,
    jobKey,
    jobTitleBn,
    triggeredAt: startTime.toISOString(),
    completedAt,
    recipientCount: dispatches.length,
    summaryBn,
    logId,
    dispatches,
  };
}

/**
 * Job 3: AYYAM_AL_BEED
 * Dispatches Ayyam al-Beed fasting reminder based on Hijri day 12 (with hijriOffset).
 */
export async function executeAyyamAlBeed(options?: {
  now?: Date;
  hijriOffset?: number;
}): Promise<JobExecutionResult> {
  const startTime = options?.now || new Date();
  const currentSettings = await getAutomationSettings();
  const offset =
    options?.hijriOffset !== undefined
      ? options.hijriOffset
      : currentSettings.hijriOffset;

  const jobKey: JobKey = "AYYAM_AL_BEED";
  const jobTitleBn = messages.adminAutomation.jobs.AYYAM_AL_BEED.title;
  const hijri = getHijriDate(startTime, offset);

  const mockRecipients = [
    {
      id: "person-mock-1",
      name: "মুফতি আব্দুর রহমান",
      mobile: "01711223344",
    },
    {
      id: "person-mock-2",
      name: "মাওলানা মাহমুদুল হাসান",
      mobile: "01822334455",
    },
    {
      id: "person-mock-3",
      name: "মাওলানা আব্দুল কুদ্দুস",
      mobile: "01933445566",
    },
  ];

  const messageText = `আস-সালামু আলাইকুম। আগামী ১৩ ${hijri.monthName} থেকে আইয়ামে বিজের তিন দিন (১৩, ১৪ ও ১৫ হিজরি) সুন্নত রোজা রাখার প্রস্তুতি গ্রহণ করুন। রাসূলুল্লাহ (ﷺ) প্রতি মাসে ৩টি রোজা রাখতেন। — আস-সুন্নাহ ফাউন্ডেশন`;

  const dispatches: DispatchedMessage[] = mockRecipients.map(r => ({
    recipientId: r.id,
    recipientName: r.name,
    recipientMobile: r.mobile,
    channel: "SMS",
    message: messageText,
    status: "SENT",
    sentAt: startTime.toISOString(),
  }));

  try {
    await db.messageLog.createMany({
      data: dispatches.map(d => ({
        personId: d.recipientId,
        channel: d.channel,
        body: d.message,
        status: d.status,
      })),
    });
  } catch {
    // DB offline fallback
  }

  const completedAt = new Date().toISOString();
  const logId = `LOG-${Date.now()}`;
  const summaryBn = `হিজরি ১৩, ১৪ ও ১৫ ${hijri.monthName} তারিখের আইয়ামে বিজ রোজা রিমাইন্ডার মোট ${toBengaliDigits(dispatches.length)} জনের নিকট সফলভাবে প্রেরণ করা হয়েছে (হিজরি অফসেট: ${toBengaliDigits(offset)})।`;

  const log: ExecutionLog = {
    id: logId,
    jobKey,
    jobTitleBn,
    triggeredAt: startTime.toISOString(),
    completedAt,
    status: "SUCCESS",
    recipientCount: dispatches.length,
    payloadSummary: summaryBn,
    dispatches,
    details: {
      hijriDay: hijri.day,
      hijriMonth: hijri.monthName,
      hijriYear: hijri.year,
      hijriOffset: offset,
    },
  };

  commitExecutionLog(log, jobKey, summaryBn, completedAt);

  return {
    success: true,
    jobKey,
    jobTitleBn,
    triggeredAt: startTime.toISOString(),
    completedAt,
    recipientCount: dispatches.length,
    summaryBn,
    logId,
    dispatches,
    details: log.details,
  };
}

/**
 * Job 4: MONTHLY_REPORT_REMINDER
 * Dispatches monthly field activity and photo submission reminder.
 */
export async function executeMonthlyReportReminder(options?: {
  now?: Date;
}): Promise<JobExecutionResult> {
  const startTime = options?.now || new Date();
  const jobKey: JobKey = "MONTHLY_REPORT_REMINDER";
  const jobTitleBn = messages.adminAutomation.jobs.MONTHLY_REPORT_REMINDER.title;

  const mockRecipients = [
    {
      id: "person-mock-1",
      name: "মুফতি আব্দুর রহমান",
      mobile: "01711223344",
    },
    {
      id: "person-mock-2",
      name: "মাওলানা মাহমুদুল হাসান",
      mobile: "01822334455",
    },
    {
      id: "person-mock-3",
      name: "মাওলানা আব্দুল কুদ্দুস",
      mobile: "01933445566",
    },
  ];

  const messageText =
    "আস-সালামু আলাইকুম। চলতি মাসের মাঠপর্যায়ের খুতবা, পরিচ্ছন্নতা বা সমাজসেবার রিপোর্ট ও ছবি আগামী ৫ দিনের মধ্যে পোর্টাল থেকে জমা দিন। — আস-সুন্নাহ ফাউন্ডেশন";

  const dispatches: DispatchedMessage[] = mockRecipients.map(r => ({
    recipientId: r.id,
    recipientName: r.name,
    recipientMobile: r.mobile,
    channel: "SMS",
    message: messageText,
    status: "SENT",
    sentAt: startTime.toISOString(),
  }));

  try {
    await db.messageLog.createMany({
      data: dispatches.map(d => ({
        personId: d.recipientId,
        channel: d.channel,
        body: d.message,
        status: d.status,
      })),
    });
  } catch {
    // DB offline fallback
  }

  const completedAt = new Date().toISOString();
  const logId = `LOG-${Date.now()}`;
  const summaryBn = `মোট ${toBengaliDigits(dispatches.length)} জন প্রশিক্ষণার্থীর নিকট চলতি মাসের মাঠপর্যায়ের কার্যক্রম ও স্থিরচিত্র সাবমিশন রিমাইন্ডার প্রেরণ করা হয়েছে।`;

  const log: ExecutionLog = {
    id: logId,
    jobKey,
    jobTitleBn,
    triggeredAt: startTime.toISOString(),
    completedAt,
    status: "SUCCESS",
    recipientCount: dispatches.length,
    payloadSummary: summaryBn,
    dispatches,
  };

  commitExecutionLog(log, jobKey, summaryBn, completedAt);

  return {
    success: true,
    jobKey,
    jobTitleBn,
    triggeredAt: startTime.toISOString(),
    completedAt,
    recipientCount: dispatches.length,
    summaryBn,
    logId,
    dispatches,
  };
}

/**
 * Job 5: REDFLAG_SCAN
 * Nightly scan for trainees with zero recorded activities in the past 60 days.
 * Marks redFlag = true and records call-needed flag in admin records.
 */
export async function executeRedFlagScan(options?: {
  now?: Date;
}): Promise<
  JobExecutionResult & {
    flaggedCount: number;
    flaggedTrainees: RedFlaggedTrainee[];
  }
> {
  const startTime = options?.now || new Date();
  const jobKey: JobKey = "REDFLAG_SCAN";
  const jobTitleBn = messages.adminAutomation.jobs.REDFLAG_SCAN.title;

  const flaggedTrainees = await getRedFlaggedTrainees(startTime);

  // Mark redFlag = true in database and in-memory store
  for (const trainee of flaggedTrainees) {
    try {
      const inMem = await getTraineeRecordById(trainee.id);
      if (inMem) {
        inMem.redFlag = true;
      }
      await db.person.update({
        where: { id: trainee.id },
        data: { redFlag: true },
      });
      await db.callLog.create({
        data: {
          personId: trainee.id,
          byAdminId: "SYSTEM_AUTOMATION",
          result: "CALL_NEEDED",
          note: "বিগত ৬০ দিনে কোনো কার্যক্রমের রেকর্ড নেই — ফলো-আপ কল আবশ্যক",
        },
      });
    } catch {
      // DB offline fallback
    }
  }

  const completedAt = new Date().toISOString();
  const logId = `LOG-${Date.now()}`;
  const summaryBn = `স্ক্যান সম্পন্ন: মোট ${toBengaliDigits(flaggedTrainees.length)} জন প্রশিক্ষণার্থী বিগত ৬০ দিন ধরে নিষ্ক্রিয় হিসেবে চিহ্নিত এবং রেড-ফ্ল্যাগ করা হয়েছে।`;

  const log: ExecutionLog = {
    id: logId,
    jobKey,
    jobTitleBn,
    triggeredAt: startTime.toISOString(),
    completedAt,
    status: "SUCCESS",
    recipientCount: flaggedTrainees.length,
    payloadSummary: summaryBn,
    details: {
      flaggedCount: flaggedTrainees.length,
      flaggedIds: flaggedTrainees.map(t => t.id),
    },
  };

  commitExecutionLog(log, jobKey, summaryBn, completedAt);

  return {
    success: true,
    jobKey,
    jobTitleBn,
    triggeredAt: startTime.toISOString(),
    completedAt,
    recipientCount: flaggedTrainees.length,
    summaryBn,
    logId,
    flaggedCount: flaggedTrainees.length,
    flaggedTrainees,
    details: log.details,
  };
}

// -------------------------------------------------------------
// Manual Trigger Dispatcher
// -------------------------------------------------------------
export async function triggerJob(jobKey: string): Promise<JobExecutionResult> {
  const trimmedKey = (jobKey || "").trim();
  if (!AUTOMATION_JOB_KEYS.includes(trimmedKey as JobKey)) {
    throw new Error(`অবৈধ জব কী: ${jobKey}। অনুমোদিত জব: ${AUTOMATION_JOB_KEYS.join(", ")}`);
  }

  const key = trimmedKey as JobKey;
  state.jobMeta.set(key, {
    lastRunAt: new Date().toISOString(),
    lastStatus: "RUNNING",
    lastSummary: "জব কার্যকর করা হচ্ছে...",
  });

  try {
    let result: JobExecutionResult;
    switch (key) {
      case "KHUTBAH_PUSH":
        result = await executeKhutbahPush();
        break;
      case "AMAL_REMINDER":
        result = await executeAmalReminder();
        break;
      case "AYYAM_AL_BEED":
        result = await executeAyyamAlBeed();
        break;
      case "MONTHLY_REPORT_REMINDER":
        result = await executeMonthlyReportReminder();
        break;
      case "REDFLAG_SCAN":
        result = await executeRedFlagScan();
        break;
    }
    return result;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "অজ্ঞাত ত্রুটি";
    const completedAt = new Date().toISOString();
    state.jobMeta.set(key, {
      lastRunAt: completedAt,
      lastStatus: "FAILED",
      lastSummary: `ব্যর্থ: ${errorMsg}`,
    });
    throw err;
  }
}

// -------------------------------------------------------------
// Admin Inactivity Monitoring Helper
// -------------------------------------------------------------

/**
 * Retrieves all trainees who have zero activities in the last 60 days
 * ADMIN ONLY — STRICT SECURITY INVARIANT
 */
export async function getRedFlaggedTrainees(
  now: Date = new Date()
): Promise<RedFlaggedTrainee[]> {
  const submissions = await getAllSubmissions();

  // Known mock trainees
  const allTrainees: {
    id: string;
    name: string;
    mobile: string;
    category: string;
    district?: string | null;
    mosqueName?: string | null;
    lastActiveAt?: string | null;
  }[] = [
    {
      id: "person-mock-1",
      name: "মুফতি আব্দুর রহমান",
      mobile: "01711223344",
      category: "IMAM",
      district: "কুড়িগ্রাম",
      mosqueName: "বায়তুল মামুর জামে মসজিদ",
      lastActiveAt: null,
    },
    {
      id: "person-mock-2",
      name: "মাওলানা মাহমুদুল হাসান",
      mobile: "01822334455",
      category: "IMAM",
      district: "সুনামগঞ্জ",
      mosqueName: "হাওর কেন্দ্রীয় জামে মসজিদ",
      lastActiveAt: null,
    },
    {
      id: "person-mock-3",
      name: "মাওলানা আব্দুল কুদ্দুস",
      mobile: "01933445566",
      category: "MADRASA_TEACHER",
      district: "ঢাকা",
      mosqueName: "দারুল উলুম মাদরাসা",
      lastActiveAt: null,
    },
    {
      id: "person-mock-4",
      name: "মাওলানা নূরুল ইসলাম",
      mobile: "01755667788",
      category: "IMAM",
      district: "বরিশাল",
      mosqueName: "চরকাউয়া পুরাতন জামে মসজিদ",
      lastActiveAt: null,
    },
  ];

  const traineeMap = new Map<string, (typeof allTrainees)[0]>();
  allTrainees.forEach(t => traineeMap.set(t.id, t));

  try {
    const dbPersons = await db.person.findMany({
      select: {
        id: true,
        name: true,
        mobile: true,
        category: true,
        district: true,
        mosqueName: true,
        lastActiveAt: true,
      },
    });
    for (const p of dbPersons) {
      traineeMap.set(p.id, {
        id: p.id,
        name: p.name,
        mobile: p.mobile,
        category: p.category,
        district: p.district,
        mosqueName: p.mosqueName,
        lastActiveAt: p.lastActiveAt ? p.lastActiveAt.toISOString() : null,
      });
    }
  } catch {
    // DB offline fallback
  }

  const traineesToScan = Array.from(traineeMap.values());
  const results: RedFlaggedTrainee[] = [];

  for (const trainee of traineesToScan) {
    // Check submissions for this trainee
    const traineeSubs = submissions.filter(s => s.personId === trainee.id);

    let latestActivityTime: number | null = null;
    if (traineeSubs.length > 0) {
      // Find latest submission date
      latestActivityTime = Math.max(
        ...traineeSubs.map(s => new Date(s.date || s.createdAt).getTime())
      );
    } else if (trainee.lastActiveAt) {
      latestActivityTime = new Date(trainee.lastActiveAt).getTime();
    }

    const inactive = isTraineeInactive(
      latestActivityTime ? new Date(latestActivityTime) : null,
      now
    );

    if (inactive) {
      let daysInactive = INACTIVITY_RED_FLAG_DAYS;
      if (latestActivityTime) {
        daysInactive = Math.floor(
          (now.getTime() - latestActivityTime) / (1000 * 60 * 60 * 24)
        );
      } else {
        daysInactive = 65; // Default for trainee with no activity record
      }

      let isCallDone = state.completedCallIds.has(trainee.id);
      if (!isCallDone) {
        try {
          const completedLog = await db.callLog.findFirst({
            where: { personId: trainee.id, result: "CALL_COMPLETED" },
          });
          if (completedLog) {
            isCallDone = true;
            state.completedCallIds.add(trainee.id);
          }
        } catch {
          // DB offline fallback
        }
      }

      results.push({
        id: trainee.id,
        name: trainee.name,
        mobile: trainee.mobile,
        category:
          trainee.category === "IMAM" ? "ইমাম ও খতিব" : "মাদরাসা শিক্ষক",
        district: trainee.district,
        mosqueName: trainee.mosqueName,
        lastActiveAt: latestActivityTime
          ? new Date(latestActivityTime).toISOString()
          : null,
        daysInactive,
        redFlag: true,
        callNeeded: !isCallDone,
        reasonBn: "বিগত ৬০ দিনে কোনো কার্যক্রমের রেকর্ড নেই (ফলো-আপ কল আবশ্যক)",
      });
    }
  }

  return results;
}

export async function markAdminCallCompleted(
  personId: string,
  note?: string
): Promise<{ success: boolean; traineeId: string }> {
  state.completedCallIds.add(personId);

  try {
    await db.callLog.create({
      data: {
        personId,
        byAdminId: "ADMIN_OFFICER",
        result: "CALL_COMPLETED",
        note: note || "প্রশাসনিক ফলো-আপ সম্পন্ন হয়েছে।",
      },
    });
  } catch {
    // DB offline fallback
  }

  return { success: true, traineeId: personId };
}

// -------------------------------------------------------------
// Execution Logs
// -------------------------------------------------------------
export async function getRecentExecutionLogs(limit: number = 10): Promise<ExecutionLog[]> {
  return state.logs.slice(0, limit);
}
