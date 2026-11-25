import type { Metadata } from "next";
import { getEventsData } from "@/lib/events-data";
import { EventCalendarHub } from "@/components/events/EventCalendarHub";
import { messages } from "@/lib/messages";
import { getServerMessages } from "@/lib/i18n-server";
import { toBengaliDigits } from "@/lib/format";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: `${messages.eventsPage.title} | ${messages.brand.name}`,
  description: messages.eventsPage.subtitle,
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const { locale, t } = await getServerMessages();
  const isEn = locale === "en";
  const events = await getEventsData();
  const upcomingCount = events.filter(e => e.status === "UPCOMING").length;
  const totalSeats = events.reduce((acc, curr) => acc + (curr.seats ?? 0), 0);

  return (
    <div className="min-h-screen bg-ivory">
      {/* ========================================================
          1. INSTITUTIONAL HERO HEADER
      ======================================================== */}
      <section className="relative overflow-hidden bg-brand-950 pt-28 pb-16 text-ivory md:pt-32 md:pb-20">
        {/* Islamic 8-fold Geometric Lattice Background */}
        <svg className="absolute inset-0 -z-10 size-full opacity-[0.05]" aria-hidden="true">
          <defs>
            <pattern id="events-lattice" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect x="15" y="15" width="30" height="30" fill="none" stroke="#8DC63F" strokeWidth="1" />
              <rect
                x="15"
                y="15"
                width="30"
                height="30"
                fill="none"
                stroke="#8DC63F"
                strokeWidth="1"
                transform="rotate(45 30 30)"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#events-lattice)" />
        </svg>

        {/* Subtle radial emerald & gold ambient glow */}
        <div
          style={{
            backgroundImage:
              "radial-gradient(50% 40% at 75% 20%, rgba(141,198,63,.14), transparent 70%), radial-gradient(40% 40% at 20% 80%, rgba(240,146,43,.08), transparent 60%)",
          }}
          className="absolute inset-0 pointer-events-none"
        />

        <div className="relative mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label={isEn ? "Breadcrumb" : "ব্রেডক্রাম্ব"} className="mb-5 flex items-center gap-2 font-ui text-sm text-ivory/70">
            <Link href="/" className="hover:text-lime-300 transition-colors">
              {t.nav.home}
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="text-lime-300 font-medium">{t.eventsPage.title}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-1.5 font-ui text-sm font-semibold text-lime-300">
                <span className="size-2.5 rounded-full bg-lime-400" aria-hidden="true" />
                <span>{t.eventsPage.badge}</span>
              </div>

              <h1 className="mt-4 font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-ivory">
                {t.eventsPage.title}
              </h1>

              <p className="mt-4 max-w-3xl text-lg sm:text-xl xl:text-2xl text-ivory/80 leading-relaxed font-sans">
                {t.eventsPage.subtitle}
              </p>
            </div>

            {/* Quick KPI stats in Hero Header */}
            <div className="flex flex-wrap gap-4 font-ui text-sm">
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">{isEn ? "Upcoming Events" : "আসন্ন আয়োজন"}</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-lime-400">
                  {isEn ? `${upcomingCount} Programs` : `${toBengaliDigits(upcomingCount)}টি কর্মসূচি`}
                </span>
              </div>
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">{isEn ? "Total Seats" : "সর্বমোট আসন"}</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-accent-500">
                  {isEn ? `${totalSeats}+ Seats` : `${toBengaliDigits(totalSeats)}+ আসন`}
                </span>
              </div>
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">{isEn ? "Scholarship" : "স্কলারশিপ"}</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-lime-300">
                  {isEn ? "100% Free" : "১০০% সম্পূর্ণ ফ্রি"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. MAIN CONTENT HUB
      ======================================================== */}
      <main className="mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8 py-10 md:py-16">
        <EventCalendarHub initialEvents={events} />
      </main>
    </div>
  );
}
