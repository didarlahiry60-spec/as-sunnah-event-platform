"use client";

import { useState, useMemo, useEffect } from "react";
import { Play, Camera, Calendar, X, Image as ImageIcon } from "lucide-react";
import { GalleryMediaItem } from "@/lib/sample-data";
import { formatBengaliDate, toBengaliDigits } from "@/lib/format";
import { messages } from "@/lib/messages";

interface GalleryHubProps {
  initialMedia: GalleryMediaItem[];
}

const CATEGORIES = [
  "সকল",
  "ইমাম প্রশিক্ষণ",
  "ত্রাণ ও পুনর্বাসন",
  "অডিটোরিয়াম",
  "ভিডিও",
] as const;

export function GalleryHub({ initialMedia }: GalleryHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("সকল");
  const [lightboxItem, setLightboxItem] = useState<GalleryMediaItem | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxItem(null);
      }
    };
    if (lightboxItem) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [lightboxItem]);

  const filteredMedia = useMemo(() => {
    return initialMedia.filter(item => {
      if (selectedCategory === "সকল") return true;
      if (selectedCategory === "ভিডিও") return item.type === "video";
      return item.category === selectedCategory;
    });
  }, [initialMedia, selectedCategory]);

  return (
    <div className="space-y-10">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 rounded-3xl border border-sand/90 bg-white p-4 sm:p-5 font-ui shadow-md sm:justify-start">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-6 py-2.5 text-sm sm:text-base font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-brand-900 text-ivory shadow-sm"
                : "bg-sand/60 text-ink/80 hover:bg-sand"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Count */}
      <div className="flex items-center justify-between text-sm sm:text-base font-ui text-muted px-2">
        <div>
          মোট মিডিয়া:{" "}
          <strong className="text-brand-900 font-bold">{toBengaliDigits(filteredMedia.length)}</strong>{" "}
          টি
        </div>
      </div>

      {/* Media Grid */}
      {filteredMedia.length === 0 ? (
        <div className="rounded-3xl border border-sand bg-white p-16 text-center shadow-soft">
          <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-sand text-brand-800">
            <ImageIcon className="size-8" />
          </div>
          <h3 className="font-display text-2xl font-bold text-ink">
            {messages.galleryPage.noMediaTitle}
          </h3>
          <p className="mx-auto mt-3 max-w-md text-base text-muted">
            {messages.galleryPage.noMediaDesc}
          </p>
        </div>
      ) : (
        <div className="grid gap-8 xl:gap-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {filteredMedia.map(item => {
            const isVideo = item.type === "video";

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                onClick={() => setLightboxItem(item)}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightboxItem(item);
                  }
                }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-sand/90 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-600/50 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-brand-700 cursor-pointer"
              >
                {/* Visual Header / Thumbnail Box */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-950">
                  {item.thumbnailUrl && item.thumbnailUrl !== "/logo.png" ? (
                    <>
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-brand-950/80 via-transparent to-transparent opacity-60" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-linear-to-br from-brand-900 via-brand-950 to-brand-900 opacity-90" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center p-6">
                          <div className="mx-auto mb-3 grid size-16 place-items-center rounded-2xl bg-brand-800/80 text-lime-400 border border-lime-500/30 group-hover:scale-110 transition-transform shadow-lg">
                            {isVideo ? <Play className="size-7 fill-lime-400 ml-1" /> : <Camera className="size-7" />}
                          </div>
                          <span className="font-ui text-sm font-semibold text-ivory/80 line-clamp-1">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Top Badges */}
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full bg-brand-950/90 px-3.5 py-1 font-ui text-xs font-bold text-lime-400 border border-lime-500/40 backdrop-blur-xs">
                      {isVideo ? messages.galleryPage.videoBadge : messages.galleryPage.photoBadge}
                    </span>
                    {isVideo && item.videoDuration && (
                      <span className="rounded-full bg-brand-950/90 px-3 py-1 font-ui text-xs font-semibold text-ivory/90 backdrop-blur-xs">
                        {item.videoDuration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-7 2xl:p-8">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-ink group-hover:text-brand-800 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted line-clamp-2 font-sans">
                    {item.caption}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-sand/70 pt-5 font-ui text-sm text-muted">
                    <span className="flex items-center gap-2">
                      <Calendar className="size-4 text-brand-600" />
                      {formatBengaliDate(item.date)}
                    </span>
                    <span className="font-bold text-brand-700 group-hover:underline">
                      {isVideo ? messages.galleryPage.playVideo : messages.galleryPage.viewFull}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/85 p-4 backdrop-blur-md"
        >
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <button
              onClick={() => setLightboxItem(null)}
              aria-label="বন্ধ করুন"
              className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-black/60 text-ivory hover:bg-black transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>

            {/* Display Header Area */}
            <div className="relative aspect-video w-full bg-brand-950 flex flex-col items-center justify-center text-ivory overflow-hidden">
              {lightboxItem.thumbnailUrl && lightboxItem.thumbnailUrl !== "/logo.png" ? (
                <img
                  src={lightboxItem.thumbnailUrl}
                  alt={lightboxItem.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="p-6 text-center flex flex-col items-center justify-center">
                  <div className="grid size-16 place-items-center rounded-full bg-brand-800 text-lime-400 border-2 border-lime-500/40 mb-3 shadow-lg">
                    {lightboxItem.type === "video" ? (
                      <Play className="size-8 fill-lime-400 ml-1" />
                    ) : (
                      <Camera className="size-8" />
                    )}
                  </div>
                  <span className="font-ui text-sm font-semibold text-lime-400">
                    {lightboxItem.type === "video"
                      ? `ভিডিও আর্কাইভ (${lightboxItem.videoDuration || "ভিডিও"})`
                      : "হাই-রেজোলিউশন ফটো অ্যালবাম"}
                  </span>
                  <p className="mt-2 text-xs text-ivory/70 font-ui">
                    আস-সুন্নাহ ফাউন্ডেশন কেন্দ্রীয় মিডিয়া আর্কাইভ
                  </p>
                </div>
              )}
            </div>

            {/* Caption & Metadata */}
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-sand px-3 py-0.5 font-ui text-xs font-bold text-brand-900">
                  {lightboxItem.category}
                </span>
                <span className="font-ui text-xs text-muted">
                  {formatBengaliDate(lightboxItem.date)}
                </span>
              </div>

              <h2 className="mt-3 font-display text-xl font-bold text-ink sm:text-2xl">
                {lightboxItem.title}
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-ink/80 font-sans">
                {lightboxItem.caption}
              </p>

              <div className="mt-6 flex justify-end border-t border-sand pt-4">
                <button
                  onClick={() => setLightboxItem(null)}
                  className="rounded-full bg-brand-900 px-6 py-2 font-ui text-sm font-semibold text-ivory hover:bg-brand-800 cursor-pointer"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
