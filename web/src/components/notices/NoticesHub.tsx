"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Bell, AlertTriangle, Calendar, ChevronRight, X } from "lucide-react";
import { NoticeItem } from "@/lib/sample-data";
import { formatBengaliDate, toBengaliDigits } from "@/lib/format";
import { messages } from "@/lib/messages";

interface NoticesHubProps {
  initialNotices: NoticeItem[];
}

const CATEGORIES = ["সকল", "বিজ্ঞপ্তি", "ফলাফল", "সময়সূচি", "নির্দেশনা"] as const;

export function NoticesHub({ initialNotices }: NoticesHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("সকল");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeNotice, setActiveNotice] = useState<NoticeItem | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveNotice(null);
      }
    };
    if (activeNotice) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [activeNotice]);

  const filteredNotices = useMemo(() => {
    return initialNotices.filter(notice => {
      if (selectedCategory !== "সকল" && notice.category !== selectedCategory) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = notice.title.toLowerCase().includes(q);
        const matchesSummary = notice.summary.toLowerCase().includes(q);
        const matchesContent = notice.content.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSummary && !matchesContent) return false;
      }

      return true;
    });
  }, [initialNotices, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search & Category Tabs */}
      <div className="rounded-3xl border border-sand/90 bg-white p-6 shadow-md md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2.5 font-ui">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-5 py-2 text-sm sm:text-base font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand-900 text-ivory shadow-sm"
                    : "bg-sand/60 text-ink/80 hover:bg-sand"
                }`}
              >
                {cat === "সকল" ? messages.noticesPage.filterAll : cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={messages.noticesPage.searchPlaceholder}
              className="w-full min-h-12 rounded-2xl border border-sand bg-ivory/60 pl-12 pr-10 py-3 text-base font-sans text-ink placeholder:text-muted focus:border-brand-600 focus:bg-white focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted hover:text-ink"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notices Count Header */}
      <div className="flex items-center justify-between text-sm sm:text-base font-ui text-muted px-2">
        <div>
          মোট প্রকাশিত নোটিশ:{" "}
          <strong className="text-brand-900 font-bold">
            {toBengaliDigits(filteredNotices.length)}
          </strong>{" "}
          টি
        </div>
        {(selectedCategory !== "সকল" || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory("সকল");
              setSearchQuery("");
            }}
            className="text-brand-700 hover:underline font-bold cursor-pointer"
          >
            ফিল্টার রিসেট করুন
          </button>
        )}
      </div>

      {/* Notices List */}
      {filteredNotices.length === 0 ? (
        <div className="rounded-3xl border border-sand bg-white p-16 text-center shadow-soft">
          <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-sand text-brand-800">
            <Bell className="size-8" />
          </div>
          <h3 className="font-display text-2xl font-bold text-ink">
            {messages.noticesPage.noNoticesTitle}
          </h3>
          <p className="mx-auto mt-3 max-w-md text-base text-muted">
            {messages.noticesPage.noNoticesDesc}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 xl:gap-10 lg:grid-cols-2">
          {filteredNotices.map(notice => {
            const isUrgent = notice.isUrgent;

            return (
              <article
                key={notice.id}
                role="button"
                tabIndex={0}
                onClick={() => setActiveNotice(notice)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveNotice(notice);
                  }
                }}
                className={`group flex flex-col justify-between cursor-pointer rounded-3xl border bg-white p-8 xl:p-10 shadow-soft transition-all duration-200 hover:-translate-y-1.5 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-brand-700 ${
                  isUrgent
                    ? "border-accent-500/60 bg-accent-100/10"
                    : "border-sand/90 hover:border-brand-600/40"
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    {isUrgent && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-3.5 py-1 font-ui text-xs sm:text-sm font-bold text-brand-950">
                        <AlertTriangle className="size-3.5" />
                        {messages.noticesPage.urgentBadge}
                      </span>
                    )}
                    <span className="rounded-full bg-sand px-3.5 py-1 font-ui text-xs sm:text-sm font-bold text-brand-900">
                      {notice.category}
                    </span>
                    <span className="flex items-center gap-1.5 font-ui text-xs sm:text-sm text-muted">
                      <Calendar className="size-3.5 text-brand-600" />
                      {messages.noticesPage.publishedAtLabel}{" "}
                      {formatBengaliDate(notice.publishedAt)}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-2xl xl:text-3xl font-bold text-ink group-hover:text-brand-800 transition-colors leading-snug">
                    {notice.title}
                  </h3>

                  <p className="mt-3 text-base xl:text-lg text-ink/80 leading-relaxed font-sans line-clamp-3">
                    {notice.summary}
                  </p>
                </div>

                <div className="mt-8 border-t border-sand/70 pt-5 flex items-center justify-between">
                  <span className="text-xs font-ui text-muted">
                    ক্লিক করে সম্পূর্ণ সার্কুলার পড়ুন
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm sm:text-base font-bold text-brand-700 group-hover:text-brand-900 group-hover:translate-x-1 transition-all">
                    <span>পূর্ণ বিবরণ</span>
                    <ChevronRight className="size-4" />
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Modal Dialog for Full Notice */}
      {activeNotice && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/70 p-4 backdrop-blur-sm"
        >
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              onClick={() => setActiveNotice(null)}
              aria-label={messages.noticesPage.closeModal}
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-sand/70 text-ink hover:bg-sand transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="flex items-center gap-2">
              {activeNotice.isUrgent && (
                <span className="rounded-full bg-accent-500 px-2.5 py-0.5 font-ui text-xs font-bold text-brand-950">
                  {messages.noticesPage.urgentBadge}
                </span>
              )}
              <span className="rounded-full bg-sand px-3 py-0.5 font-ui text-xs font-bold text-brand-900">
                {activeNotice.category}
              </span>
              <span className="font-ui text-xs text-muted">
                {formatBengaliDate(activeNotice.publishedAt)}
              </span>
            </div>

            <h2 className="mt-4 font-display text-2xl font-bold text-ink">
              {activeNotice.title}
            </h2>

            <div className="mt-4 border-t border-sand pt-4 text-sm leading-relaxed text-ink/90 font-sans space-y-3">
              <p>{activeNotice.content}</p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-sand pt-4">
              <span className="font-ui text-xs text-muted">
                আস-সুন্নাহ ফাউন্ডেশন নোটিশ প্রশাসন
              </span>
              <button
                onClick={() => setActiveNotice(null)}
                className="rounded-full bg-brand-900 px-5 py-2 font-ui text-xs font-semibold text-ivory hover:bg-brand-800 cursor-pointer"
              >
                {messages.noticesPage.closeModal}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
