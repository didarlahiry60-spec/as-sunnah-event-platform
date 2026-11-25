import { db } from "@/lib/db";
import { SAMPLE_EVENTS, EventItem } from "@/lib/sample-data";

/**
 * Fetches all events from the database with graceful fallback to sample events
 */
export async function getEventsData(): Promise<EventItem[]> {
  try {
    const dbEvents = await db.event.findMany({
      orderBy: { startsAt: "asc" },
    });

    if (dbEvents && dbEvents.length > 0) {
      return dbEvents.map(e => {
        // Find matching sample event to merge rich metadata if absent in DB
        const sample = SAMPLE_EVENTS.find(s => s.slug === e.slug);
        return {
          id: e.id,
          slug: e.slug,
          title: e.title,
          type: e.type,
          description: e.description,
          venue: e.venue || "আস-সুন্নাহ ফাউন্ডেশন অডিটোরিয়াম, ঢাকা",
          startsAt: e.startsAt.toISOString(),
          endsAt: e.endsAt.toISOString(),
          applyOpensAt: e.applyOpensAt.toISOString(),
          applyClosesAt: e.applyClosesAt.toISOString(),
          seats: e.seats ?? 100,
          status: (e.status as "UPCOMING" | "COMPLETED" | "ONGOING") || "UPCOMING",
          bannerUrl: e.bannerUrl || sample?.bannerUrl,
          eligibility: Array.isArray(e.eligibility) ? (e.eligibility as string[]) : (sample?.eligibility ?? [
            "সংশ্লিষ্ট ক্ষেত্রে কাজের অভিজ্ঞতা।",
            "স্মার্টফোন ব্যবহারে প্রাথমিক দক্ষতা ও প্ল্যাটফর্মে অংশগ্রহণের মানসিকতা।"
          ]),
          courseOutline: sample?.courseOutline ?? [
            {
              title: "মৌলিক বিষয়বস্তু ও কর্মপরিকল্পনা",
              duration: "প্রথম অধিবেশন",
              description: "তাত্ত্বিক ও প্রায়োগিক নির্দেশিকা।"
            }
          ],
          trainers: sample?.trainers ?? [
            {
              name: "শায়খ আহমাদুল্লাহ",
              title: "চেয়ারম্যান",
              organization: "আস-সুন্নাহ ফাউন্ডেশন"
            }
          ],
          features: sample?.features ?? [
            "ফাউন্ডেশন সনদপত্র",
            "খাবার ও প্রশিক্ষণ সামগ্রী"
          ],
          formSchema: Array.isArray(e.formSchema) ? (e.formSchema as unknown as EventItem["formSchema"]) : sample?.formSchema
        };
      });
    }
  } catch {
    // Database connection offline or empty, fallback gracefully to authentic sample data
  }

  return SAMPLE_EVENTS;
}

/**
 * Fetches a single event by slug with fallback
 */
export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  try {
    const e = await db.event.findUnique({
      where: { slug },
    });

    if (e) {
      const sample = SAMPLE_EVENTS.find(s => s.slug === e.slug);
      return {
        id: e.id,
        slug: e.slug,
        title: e.title,
        type: e.type,
        description: e.description,
        venue: e.venue || "আস-সুন্নাহ ফাউন্ডেশন অডিটোরিয়াম, ঢাকা",
        startsAt: e.startsAt.toISOString(),
        endsAt: e.endsAt.toISOString(),
        applyOpensAt: e.applyOpensAt.toISOString(),
        applyClosesAt: e.applyClosesAt.toISOString(),
        seats: e.seats ?? 100,
        status: (e.status as "UPCOMING" | "COMPLETED" | "ONGOING") || "UPCOMING",
        bannerUrl: e.bannerUrl || sample?.bannerUrl,
        eligibility: Array.isArray(e.eligibility) ? (e.eligibility as string[]) : (sample?.eligibility ?? [
          "সংশ্লিষ্ট ক্ষেত্রে কাজের অভিজ্ঞতা।",
          "স্মার্টফোন ব্যবহারে প্রাথমিক দক্ষতা ও প্ল্যাটফর্মে অংশগ্রহণের মানসিকতা।"
        ]),
        courseOutline: sample?.courseOutline ?? [
          {
            title: "মৌলিক বিষয়বস্তু ও কর্মপরিকল্পনা",
            duration: "প্রথম অধিবেশন",
            description: "তাত্ত্বিক ও প্রায়োগিক নির্দেশিকা।"
          }
        ],
        trainers: sample?.trainers ?? [
          {
            name: "শায়খ আহমাদুল্লাহ",
            title: "চেয়ারম্যান",
            organization: "আস-সুন্নাহ ফাউন্ডেশন"
          }
        ],
        features: sample?.features ?? [
          "ফাউন্ডেশন সনদপত্র",
          "খাবার ও প্রশিক্ষণ সামগ্রী"
        ],
        formSchema: Array.isArray(e.formSchema) ? (e.formSchema as unknown as EventItem["formSchema"]) : sample?.formSchema
      };
    }
  } catch {
    // Database connection offline or record not found, fallback gracefully
  }

  const sample = SAMPLE_EVENTS.find(s => s.slug === slug);
  return sample ?? null;
}
