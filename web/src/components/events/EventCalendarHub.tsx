"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  MapPin,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  RotateCcw,
  Clock,
  PhoneCall,
  LayoutGrid,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import { EventItem } from "@/lib/sample-data";
import {
  formatBengaliDate,
  toBengaliDigits,
  getDhakaDateKey,
  getDateKeysBetween,
} from "@/lib/format";
import { useLanguage } from "@/lib/i18n";

const WEEKDAYS_BN = [
  { short: "রবি", full: "রবিবার" },
  { short: "সোম", full: "সোমবার" },
  { short: "মঙ্গল", full: "মঙ্গলবার" },
  { short: "বুধ", full: "বুধবার" },
  { short: "বৃহঃ", full: "বৃহস্পতিবার" },
  { short: "শুক্র", full: "শুক্রবার", isJummah: true },
  { short: "শনি", full: "শনিবার" },
];

interface EventCalendarHubProps {
  initialEvents: EventItem[];
}

export function EventCalendarHub({ initialEvents }: EventCalendarHubProps) {
  const { t } = useLanguage();
  // Active Tab: upcoming | completed | all
  const [activeTab, setActiveTab] = useState<"UPCOMING" | "COMPLETED" | "ALL">("UPCOMING");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"SPLIT" | "CALENDAR">("SPLIT");

  // Determine initial calendar month from the first upcoming event (in Asia/Dhaka time)
  const initialDate = useMemo(() => {
    const upcoming = initialEvents.find(e => e.status === "UPCOMING");
    if (upcoming) {
      const key = getDhakaDateKey(upcoming.startsAt);
      const [y, m] = key.split("-").map(Number);
      return new Date(y, m - 1, 1, 12, 0, 0);
    }
    const nowKey = getDhakaDateKey(new Date());
    const [y, m] = nowKey.split("-").map(Number);
    return new Date(y, m - 1, 1, 12, 0, 0);
  }, [initialEvents]);

  const [currentMonth, setCurrentMonth] = useState<Date>(initialDate);
  const [selectedDateKey, setSelectedDateKey] = useState<string | null>(null);

  // Extract unique event types for filtering
  const eventTypes = useMemo(() => {
    const set = new Set<string>();
    initialEvents.forEach(e => {
      if (e.type) set.add(e.type);
    });
    return Array.from(set);
  }, [initialEvents]);

  // Tab counts
  const tabCounts = useMemo(() => {
    return {
      UPCOMING: initialEvents.filter(e => e.status === "UPCOMING").length,
      COMPLETED: initialEvents.filter(e => e.status === "COMPLETED").length,
      ALL: initialEvents.length,
    };
  }, [initialEvents]);

  // Calendar calculations (Dhaka month view)
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1, 12, 0, 0).getDay();
  const daysInMonth = new Date(year, month + 1, 0, 12, 0, 0).getDate();

  // Map events to date keys (YYYY-MM-DD) in Asia/Dhaka timezone, filtered to match current view
  const eventsByDate = useMemo(() => {
    const map = new Map<string, EventItem[]>();

    const eventsToMap = initialEvents.filter(ev => {
      if (activeTab === "UPCOMING" && ev.status !== "UPCOMING") return false;
      if (activeTab === "COMPLETED" && ev.status !== "COMPLETED") return false;
      if (selectedType !== "ALL" && ev.type !== selectedType) return false;
      return true;
    });

    eventsToMap.forEach(ev => {
      const keys = getDateKeysBetween(ev.startsAt, ev.endsAt);
      keys.forEach(k => {
        const list = map.get(k) || [];
        list.push(ev);
        map.set(k, list);
      });
    });

    return map;
  }, [initialEvents, activeTab, selectedType]);

  // All events mapped by date across all statuses
  const allEventsByDate = useMemo(() => {
    const map = new Map<string, EventItem[]>();
    initialEvents.forEach(ev => {
      const keys = getDateKeysBetween(ev.startsAt, ev.endsAt);
      keys.forEach(k => {
        const list = map.get(k) || [];
        list.push(ev);
        map.set(k, list);
      });
    });
    return map;
  }, [initialEvents]);

  // Navigation handlers
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1, 12, 0, 0));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1, 12, 0, 0));
  };

  const handleCurrentMonth = () => {
    const nowKey = getDhakaDateKey(new Date());
    const [y, m] = nowKey.split("-").map(Number);
    setCurrentMonth(new Date(y, m - 1, 1, 12, 0, 0));
  };

  const handleSelectDay = (dayNum: number) => {
    const targetKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
    if (selectedDateKey === targetKey) {
      setSelectedDateKey(null); // toggle off
    } else {
      setSelectedDateKey(targetKey);
    }
  };

  // Filter events based on tab, type, search, and selected date key
  const filteredEvents = useMemo(() => {
    return initialEvents.filter(ev => {
      // Tab filter
      if (activeTab === "UPCOMING" && ev.status !== "UPCOMING") return false;
      if (activeTab === "COMPLETED" && ev.status !== "COMPLETED") return false;

      // Type filter
      if (selectedType !== "ALL" && ev.type !== selectedType) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = ev.title.toLowerCase().includes(q);
        const matchesDesc = ev.description.toLowerCase().includes(q);
        const matchesVenue = ev.venue.toLowerCase().includes(q);
        const matchesType = ev.type.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesVenue && !matchesType) return false;
      }

      // Date filter from calendar click
      if (selectedDateKey) {
        const eventKeys = getDateKeysBetween(ev.startsAt, ev.endsAt);
        if (!eventKeys.includes(selectedDateKey)) return false;
      }

      return true;
    });
  }, [initialEvents, activeTab, selectedType, searchQuery, selectedDateKey]);

  // Formatted date string for selected date
  const formattedSelectedDate = useMemo(() => {
    if (!selectedDateKey) return "";
    const [y, m, d] = selectedDateKey.split("-").map(Number);
    return formatBengaliDate(new Date(y, m - 1, d, 12, 0, 0));
  }, [selectedDateKey]);

  // Month title formatted in Bengali
  const monthTitleBn = formatBengaliDate(currentMonth, {
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });

  return (
    <div className="space-y-8">
      {/* ========================================================
          1. INTEGRATED CONTROL BAR (Tabs, Search & View Switcher)
      ======================================================== */}
      <div className="rounded-3xl border border-sand/90 bg-white p-6 shadow-md md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Status Tabs */}
          <div className="inline-flex rounded-2xl bg-sand/60 p-1.5 font-ui text-sm sm:text-base">
            <button
              onClick={() => {
                setActiveTab("UPCOMING");
                setSelectedDateKey(null);
              }}
              className={`flex min-h-12 items-center gap-2 rounded-xl px-5 py-2.5 font-bold transition-all cursor-pointer ${
                activeTab === "UPCOMING"
                  ? "bg-brand-900 text-ivory shadow-sm"
                  : "text-ink/80 hover:text-ink"
              }`}
            >
              <span>{t.eventsPage.tabUpcoming}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  activeTab === "UPCOMING" ? "bg-lime-400 text-brand-950" : "bg-sand text-muted"
                }`}
              >
                {toBengaliDigits(tabCounts.UPCOMING)}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("COMPLETED");
                setSelectedDateKey(null);
              }}
              className={`flex min-h-12 items-center gap-2 rounded-xl px-5 py-2.5 font-bold transition-all cursor-pointer ${
                activeTab === "COMPLETED"
                  ? "bg-brand-900 text-ivory shadow-sm"
                  : "text-ink/80 hover:text-ink"
              }`}
            >
              <span>{t.eventsPage.tabPast}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  activeTab === "COMPLETED" ? "bg-lime-400 text-brand-950" : "bg-sand text-muted"
                }`}
              >
                {toBengaliDigits(tabCounts.COMPLETED)}
              </span>
            </button>
            <button
              onClick={() => {
                setActiveTab("ALL");
                setSelectedDateKey(null);
              }}
              className={`flex min-h-12 items-center gap-2 rounded-xl px-5 py-2.5 font-bold transition-all cursor-pointer ${
                activeTab === "ALL"
                  ? "bg-brand-900 text-ivory shadow-sm"
                  : "text-ink/80 hover:text-ink"
              }`}
            >
              <span>{t.eventsPage.tabAll}</span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  activeTab === "ALL" ? "bg-lime-400 text-brand-950" : "bg-sand text-muted"
                }`}
              >
                {toBengaliDigits(tabCounts.ALL)}
              </span>
            </button>
          </div>

          {/* Right Controls: Search & View Toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-80 lg:w-96">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t.eventsPage.searchPlaceholder}
                className="w-full min-h-12 rounded-2xl border border-sand bg-ivory/60 pl-12 pr-10 py-3 text-base font-sans text-ink placeholder:text-muted focus:border-brand-600 focus:bg-white focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="অনুসন্ধান মুছুন"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted hover:text-ink"
                >
                  ✕
                </button>
              )}
            </div>

            {/* View Switcher Button */}
            <div className="hidden sm:inline-flex rounded-2xl bg-sand/60 p-1.5 font-ui text-sm">
              <button
                onClick={() => setViewMode("SPLIT")}
                className={`flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 font-bold transition-all cursor-pointer ${
                  viewMode === "SPLIT"
                    ? "bg-white text-brand-950 shadow-sm"
                    : "text-ink/75 hover:text-ink"
                }`}
                title="তালিকা ও ক্যালেন্ডার স্প্লিট ভিউ"
              >
                <LayoutGrid className="size-4" />
                <span>তালিকা ও ক্যালেন্ডার</span>
              </button>
              <button
                onClick={() => setViewMode("CALENDAR")}
                className={`flex min-h-11 items-center gap-2 rounded-xl px-4 py-2 font-bold transition-all cursor-pointer ${
                  viewMode === "CALENDAR"
                    ? "bg-white text-brand-950 shadow-sm"
                    : "text-ink/75 hover:text-ink"
                }`}
                title="পূর্ণাঙ্গ ক্যালেন্ডার ভিউ"
              >
                <CalendarDays className="size-4" />
                <span>মাসিক ক্যালেন্ডার</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills Row */}
        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-sand/70 pt-5">
          <span className="font-ui text-sm font-bold text-muted">
            {t.eventsPage.typeFilterLabel}
          </span>
          <button
            onClick={() => setSelectedType("ALL")}
            className={`min-h-9 rounded-full px-4 py-1.5 text-sm font-ui font-bold transition-all cursor-pointer ${
              selectedType === "ALL"
                ? "bg-brand-900 text-ivory shadow-xs"
                : "bg-sand/60 text-ink/80 hover:bg-sand"
            }`}
          >
            {t.eventsPage.filterAllTypes}
          </button>
          {eventTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`min-h-9 rounded-full px-4 py-1.5 text-sm font-ui font-bold transition-all cursor-pointer ${
                selectedType === type
                  ? "bg-brand-900 text-ivory shadow-xs"
                  : "bg-sand/60 text-ink/80 hover:bg-sand"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================
          2. ACTIVE DATE FILTER NOTIFICATION BANNER
      ======================================================== */}
      {selectedDateKey && (
        <div className="flex items-center justify-between rounded-xl border border-lime-500/40 bg-lime-50 p-4 text-brand-950 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center gap-2.5">
            <span className="flex size-7 items-center justify-center rounded-lg bg-lime-200/80 text-brand-900">
              <CalendarIcon className="size-4" />
            </span>
            <span className="text-sm font-ui">
              <strong>{t.eventsPage.selectedDatePrefix}</strong>{" "}
              <span className="font-bold text-brand-900">{formattedSelectedDate}</span>
              {" — "}
              <span className="text-muted">
                {filteredEvents.length > 0
                  ? `${toBengaliDigits(filteredEvents.length)}টি আয়োজন রয়েছে`
                  : "এই তারিখে কোনো আয়োজন নেই"}
              </span>
            </span>
          </div>
          <button
            onClick={() => setSelectedDateKey(null)}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-lg bg-brand-900 px-3.5 py-1 text-xs font-ui font-semibold text-ivory hover:bg-brand-800 transition-colors cursor-pointer"
          >
            <RotateCcw className="size-3" />
            <span>{t.eventsPage.clearDateFilter}</span>
          </button>
        </div>
      )}

      {/* ========================================================
          3. FULL CALENDAR VIEW (When Selected in Switcher)
      ======================================================== */}
      {viewMode === "CALENDAR" ? (
        <div className="rounded-2xl border border-sand bg-white p-6 shadow-soft">
          {/* Calendar Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand pb-4">
            <div>
              <span className="font-ui text-xs font-semibold uppercase tracking-wider text-brand-600">
                {t.eventsPage.calendarTitle}
              </span>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {monthTitleBn}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCurrentMonth}
                className="rounded-lg border border-sand bg-ivory px-3 py-1.5 font-ui text-xs font-semibold text-brand-900 hover:bg-sand transition-colors cursor-pointer"
              >
                চলতি মাস
              </button>
              <div className="flex items-center rounded-lg border border-sand bg-ivory p-0.5">
                <button
                  onClick={handlePrevMonth}
                  aria-label="পূর্ববর্তী মাস"
                  className="grid size-8 place-items-center rounded-md text-ink/80 hover:bg-sand transition-colors cursor-pointer"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  aria-label="পরবর্তী মাস"
                  className="grid size-8 place-items-center rounded-md text-ink/80 hover:bg-sand transition-colors cursor-pointer"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Full Grid Day Headers */}
          <div className="mt-4 grid grid-cols-7 border-b border-sand text-center font-ui text-xs font-semibold text-muted">
            {WEEKDAYS_BN.map(w => (
              <div
                key={w.short}
                className={`py-2.5 ${w.isJummah ? "text-brand-600 font-bold bg-lime-50/50" : ""}`}
              >
                <span className="hidden sm:inline">{w.full}</span>
                <span className="sm:hidden">{w.short}</span>
              </div>
            ))}
          </div>

          {/* Full Grid Cells */}
          <div className="grid grid-cols-7 auto-rows-fr border-l border-t border-sand">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div
                key={`empty-full-${i}`}
                className="min-h-24 sm:min-h-28 border-b border-r border-sand bg-sand/20"
              />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const dayNum = i + 1;
              const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
                dayNum
              ).padStart(2, "0")}`;
              const dayEvents = eventsByDate.get(dateKey) || [];
              const isSelected = selectedDateKey === dateKey;

              return (
                <div
                  key={`day-full-${dayNum}`}
                  onClick={() => handleSelectDay(dayNum)}
                  className={`group relative min-h-24 sm:min-h-28 border-b border-r border-sand p-2 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-lime-50/90 ring-2 ring-inset ring-lime-500"
                      : dayEvents.length > 0
                      ? "bg-white hover:bg-lime-50/40"
                      : "bg-white hover:bg-ivory/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex size-7 items-center justify-center rounded-full font-ui text-xs font-bold ${
                        isSelected
                          ? "bg-brand-900 text-ivory"
                          : dayEvents.length > 0
                          ? "bg-lime-100 text-brand-900"
                          : "text-ink/80"
                      }`}
                    >
                      {toBengaliDigits(dayNum)}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="rounded-full bg-accent-100 px-1.5 py-0.2 text-[10px] font-ui font-bold text-accent-700">
                        {toBengaliDigits(dayEvents.length)}টি
                      </span>
                    )}
                  </div>

                  {/* Micro list of events inside cell */}
                  <div className="mt-1 space-y-1 overflow-hidden">
                    {dayEvents.slice(0, 2).map(ev => (
                      <Link
                        key={ev.id}
                        href={`/events/${ev.slug}`}
                        className="block truncate rounded-md bg-brand-900/5 px-1.5 py-0.5 text-[11px] font-ui font-medium text-brand-900 hover:bg-brand-900/15"
                        onClick={e => e.stopPropagation()}
                      >
                        • {ev.title}
                      </Link>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[10px] font-ui text-muted">
                        +আরও {toBengaliDigits(dayEvents.length - 2)}টি
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ========================================================
            4. DUAL / SPLIT VIEW (Sidebar Calendar + Event List)
        ======================================================== */
        <div className="grid gap-10 xl:gap-14 lg:grid-cols-12 items-start">
          {/* ====================================================
              LEFT COLUMN: Sticky Executive Calendar & Help Card
          ==================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-8 lg:sticky lg:top-28 self-start">
            {/* Executive Planner Calendar Card */}
            <div className="overflow-hidden rounded-3xl border border-sand bg-white shadow-soft">
              {/* Card Header (Deep Forest Green Banner) */}
              <div className="bg-linear-to-r from-brand-950 via-brand-900 to-brand-950 p-6 text-ivory">
                <div className="flex items-center justify-between pb-4 border-b border-brand-800/80">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-xl bg-lime-500/20 text-lime-400">
                      <CalendarIcon className="size-5" />
                    </span>
                    <h3 className="font-display text-lg font-bold text-ivory">
                      {t.eventsPage.calendarTitle}
                    </h3>
                  </div>
                  <button
                    onClick={handleCurrentMonth}
                    className="rounded-lg border border-lime-500/30 bg-lime-500/10 px-3 py-1 font-ui text-xs font-semibold text-lime-300 hover:bg-lime-500/20 transition-colors cursor-pointer"
                  >
                    চলতি মাস
                  </button>
                </div>

                {/* Month Title & Nav */}
                <div className="mt-4 flex items-center justify-between">
                  <h4 className="font-display text-xl font-bold text-lime-300">
                    {monthTitleBn}
                  </h4>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrevMonth}
                      aria-label="পূর্ববর্তী মাস"
                      className="grid size-9 place-items-center rounded-lg text-ivory/80 hover:bg-brand-800 hover:text-ivory transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="size-5" />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      aria-label="পরবর্তী মাস"
                      className="grid size-9 place-items-center rounded-lg text-ivory/80 hover:bg-brand-800 hover:text-ivory transition-colors cursor-pointer"
                    >
                      <ChevronRight className="size-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Grid Body */}
              <div className="p-4 sm:p-5">
                {/* Weekdays */}
                <div className="grid grid-cols-7 gap-1 text-center font-ui text-xs font-semibold text-muted mb-2">
                  {WEEKDAYS_BN.map(w => (
                    <div
                      key={w.short}
                      className={`py-1 ${w.isJummah ? "text-brand-700 font-bold" : ""}`}
                    >
                      {w.short}
                    </div>
                  ))}
                </div>

                {/* Day Cells with 44px touch targets */}
                <div className="grid grid-cols-7 gap-1 text-center font-ui text-sm">
                  {/* Empty padding cells for start of month */}
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="min-h-11" />
                  ))}

                  {/* Month Days */}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const dayNum = i + 1;
                    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
                      dayNum
                    ).padStart(2, "0")}`;
                    const hasEvents = eventsByDate.has(dateKey);
                    const dayEvents = eventsByDate.get(dateKey) || [];
                    const isSelected = selectedDateKey === dateKey;

                    return (
                      <button
                        key={dayNum}
                        onClick={() => handleSelectDay(dayNum)}
                        className={`relative flex min-h-11 w-full flex-col items-center justify-center rounded-xl transition-all cursor-pointer ${
                          isSelected
                            ? "bg-brand-900 font-bold text-ivory shadow-md ring-2 ring-accent-500"
                            : hasEvents
                            ? "bg-lime-50 font-bold text-brand-950 border border-lime-400/60 hover:bg-lime-100"
                            : "text-ink/80 hover:bg-sand/60"
                        }`}
                        title={
                          hasEvents
                            ? `${toBengaliDigits(dayEvents.length)}টি আয়োজন আছে`
                            : `${toBengaliDigits(dayNum)} তারিখ`
                        }
                      >
                        <span>{toBengaliDigits(dayNum)}</span>
                        {hasEvents && !isSelected && (
                          <span className="absolute bottom-1.5 size-1.5 rounded-full bg-accent-500" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Calendar Legend */}
                <div className="mt-4 border-t border-sand/80 pt-3 text-[11px] text-muted flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-accent-500" />
                    <span>ইভেন্টের তারিখ</span>
                  </span>
                  <span>{t.eventsPage.calendarHint}</span>
                </div>
              </div>
            </div>

            {/* Complementary Support & Venue Card (Ensures no awkward empty void!) */}
            <div className="rounded-3xl border border-sand bg-white p-6 sm:p-7 shadow-soft space-y-5">
              <div className="flex items-center gap-3 border-b border-sand pb-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-800">
                  <MapPin className="size-5" />
                </span>
                <div>
                  <h4 className="font-ui text-base sm:text-lg font-bold text-ink">
                    প্রধান ভেন্যু ও অডিটোরিয়াম
                  </h4>
                  <p className="text-xs sm:text-sm text-muted">আস-সুন্নাহ ফাউন্ডেশন কমপ্লেক্স</p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-ink/80 font-sans leading-relaxed">
                <p className="flex items-start gap-2.5">
                  <span className="text-brand-700 font-bold shrink-0 text-base">•</span>
                  <span>প্লট-৭/এ, ব্লক-সি, আফতাবনগর মেইন রোড, বাড্ডা, ঢাকা-১২১২</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-brand-700 font-bold shrink-0 text-base">•</span>
                  <span>সকল প্রশিক্ষণ সম্পূর্ণ ফ্রি ও আস-সুন্নাহ স্কলারশিপের আওতাভুক্ত</span>
                </p>
              </div>

              <div className="border-t border-sand pt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted font-ui">
                  <PhoneCall className="size-4 text-brand-600" />
                  <span>হেল্পলাইন: <strong className="text-brand-900">০৯৬১০-০০১০৮৯</strong></span>
                </div>
                <Link
                  href="/contact"
                  className="font-ui text-sm font-bold text-brand-700 hover:underline"
                >
                  যোগাযোগ →
                </Link>
              </div>
            </div>
          </div>

          {/* ====================================================
              RIGHT COLUMN: Event Showcase Cards
          ==================================================== */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-5">
            {/* Header: Count & Quick Reset */}
            <div className="flex items-center justify-between">
              <div className="font-ui text-sm font-semibold text-muted">
                {t.eventsPage.totalEventsCount}{" "}
                <span className="font-bold text-brand-900">
                  {toBengaliDigits(filteredEvents.length)}টি আয়োজন
                </span>
              </div>
              {(selectedDateKey || searchQuery || selectedType !== "ALL") && (
                <button
                  onClick={() => {
                    setSelectedDateKey(null);
                    setSearchQuery("");
                    setSelectedType("ALL");
                  }}
                  className="inline-flex items-center gap-1 text-xs font-ui font-semibold text-brand-700 hover:underline cursor-pointer"
                >
                  <RotateCcw className="size-3" />
                  <span>{t.eventsPage.clearDateFilter}</span>
                </button>
              )}
            </div>

            {/* Empty State */}
            {filteredEvents.length === 0 ? (
              <div className="rounded-2xl border border-sand bg-white p-12 text-center shadow-soft">
                <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-sand/60 text-brand-800">
                  <CalendarIcon className="size-8" />
                </div>
                <h4 className="font-display text-2xl font-bold text-ink">
                  {t.eventsPage.noEventsTitle}
                </h4>
                <p className="mx-auto mt-2 max-w-md text-sm text-muted">
                  {selectedDateKey && allEventsByDate.has(selectedDateKey)
                    ? "নির্বাচিত তারিখে অন্য ক্যাটাগরি বা আর্কাইভে ইভেন্ট রয়েছে। অনুগ্রহ করে 'সকল আয়োজন' ট্যাবে ক্লিক করুন।"
                    : t.eventsPage.noEventsDesc}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {selectedDateKey && allEventsByDate.has(selectedDateKey) && (
                    <button
                      onClick={() => setActiveTab("ALL")}
                      className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-brand-900 px-5 py-2 text-xs font-ui font-semibold text-ivory hover:bg-brand-800 cursor-pointer"
                    >
                      সকল আয়োজন দেখুন
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedDateKey(null);
                      setSearchQuery("");
                      setSelectedType("ALL");
                      setActiveTab("ALL");
                    }}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-sand bg-sand/60 px-5 py-2 text-xs font-ui font-semibold text-ink hover:bg-sand cursor-pointer"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>{t.eventsPage.clearDateFilter}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* ================================================
                  EVENT CARDS: International-Grade Layout
              ================================================ */
              <div className="space-y-5">
                {filteredEvents.map(event => {
                  const isUpcoming = event.status === "UPCOMING";
                  const isCompleted = event.status === "COMPLETED";

                  // Extract date details for the prominent date badge
                  const eventStartDate = new Date(event.startsAt);
                  const startMonthBn = formatBengaliDate(eventStartDate, {
                    month: "short",
                    timeZone: "Asia/Dhaka",
                  });
                  const startDayBn = toBengaliDigits(
                    new Intl.DateTimeFormat("en-US", {
                      day: "numeric",
                      timeZone: "Asia/Dhaka",
                    }).format(eventStartDate)
                  );

                  return (
                    <article
                      key={event.id}
                      className="group relative flex flex-col sm:flex-row gap-8 xl:gap-10 rounded-3xl border border-sand/90 bg-white p-8 lg:p-10 xl:p-12 shadow-soft transition-all duration-200 hover:-translate-y-1.5 hover:border-brand-600/40 hover:shadow-2xl"
                    >
                      {/* Left Date Column Badge */}
                      <div className="sm:w-40 lg:w-44 xl:w-52 shrink-0 flex sm:flex-col items-center justify-between sm:justify-center rounded-3xl bg-linear-to-b from-brand-900 to-brand-950 px-5 py-5 sm:py-8 text-center text-ivory shadow-md">
                        <span className="font-ui text-sm xl:text-base font-bold uppercase tracking-wider text-lime-400">
                          {startMonthBn}
                        </span>
                        <span className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-none text-ivory my-1 sm:my-2">
                          {startDayBn}
                        </span>
                        <span className="font-ui text-xs xl:text-sm text-ivory/80 font-medium">
                          {isUpcoming ? "আসন্ন" : isCompleted ? "সমাপ্ত" : "চলমান"}
                        </span>
                      </div>

                      {/* Main Event Content */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          {/* Badges Row */}
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              {/* Category Tag */}
                              <span className="rounded-full bg-brand-50 border border-brand-200/80 px-4 py-1.5 font-ui text-xs sm:text-sm font-bold text-brand-900">
                                {event.type}
                              </span>

                              {/* Status Pill with Pulsing Dot */}
                              <span
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-ui text-xs sm:text-sm font-bold ${
                                  isUpcoming
                                    ? "bg-lime-50 text-brand-900 border border-lime-300"
                                    : isCompleted
                                    ? "bg-sand text-muted"
                                    : "bg-accent-50 text-accent-700 border border-accent-300"
                                }`}
                              >
                                {isUpcoming && (
                                  <span className="relative flex size-2.5">
                                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime-400 opacity-75" />
                                    <span className="relative inline-flex size-2.5 rounded-full bg-lime-500" />
                                  </span>
                                )}
                                <span>
                                  {isUpcoming
                                    ? t.eventsPage.statusUpcomingBadge
                                    : isCompleted
                                    ? t.eventsPage.statusCompletedBadge
                                    : t.eventsPage.statusOngoingBadge}
                                </span>
                              </span>
                            </div>

                            {/* Seats Chip */}
                            <div className="flex items-center gap-2 font-ui text-sm sm:text-base text-muted">
                              <Users className="size-4 sm:size-5 text-accent-600" />
                              <span>
                                {t.eventsPage.seatsCountLabel}{" "}
                                <strong className="text-ink">
                                  {toBengaliDigits(event.seats)}
                                </strong>
                              </span>
                            </div>
                          </div>

                          {/* Event Title */}
                          <h3 className="mt-5 font-display text-2xl sm:text-3xl xl:text-4xl font-bold text-ink leading-snug transition-colors group-hover:text-brand-800">
                            <Link href={`/events/${event.slug}`} className="focus:outline-none">
                              {event.title}
                            </Link>
                          </h3>

                          {/* Description */}
                          <p className="mt-3 text-base sm:text-lg xl:text-xl text-ink/80 leading-relaxed font-sans">
                            {event.description}
                          </p>

                          {/* Metadata Row */}
                          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 border-t border-sand/70 pt-5 text-sm sm:text-base text-muted font-ui">
                            <div className="flex items-center gap-2.5">
                              <Clock className="size-5 text-brand-600 shrink-0" />
                              <span>
                                {formatBengaliDate(event.startsAt)} — {formatBengaliDate(event.endsAt)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2.5 truncate">
                              <MapPin className="size-5 text-accent-600 shrink-0" />
                              <span className="truncate">{event.venue}</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer / Action Button */}
                        <div className="mt-8 flex items-center justify-between border-t border-sand pt-6">
                          <span className="font-ui text-sm sm:text-base font-bold text-brand-700 flex items-center gap-2">
                            <ShieldCheck className="size-5 text-brand-600" />
                            <span>{isUpcoming ? "অনলাইনে আবেদন উন্মুক্ত" : "আর্কাইভ বিবরণী"}</span>
                          </span>

                          <Link
                            href={`/events/${event.slug}`}
                            className={`inline-flex min-h-12 items-center gap-2.5 rounded-xl px-7 py-3 font-ui text-base sm:text-lg font-bold transition-all cursor-pointer shadow-sm ${
                              isUpcoming
                                ? "bg-brand-900 text-ivory hover:bg-brand-800 shadow-md group-hover:bg-brand-800"
                                : "border border-sand bg-sand/60 text-ink/80 hover:bg-sand"
                            }`}
                          >
                            <span>{t.eventsPage.detailsAndApply}</span>
                            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
