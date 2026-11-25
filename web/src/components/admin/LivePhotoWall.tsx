"use client";

import { useState } from "react";
import Image from "next/image";
import { Image as ImageIcon, MapPin, Calendar, Award, X, Filter } from "lucide-react";
import { LivePhotoWallItem } from "@/lib/reporting";
import { toBengaliDigits } from "@/lib/format";

interface LivePhotoWallProps {
  initialPhotos: LivePhotoWallItem[];
}

export function LivePhotoWall({ initialPhotos }: LivePhotoWallProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<LivePhotoWallItem | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("ALL");
  const [selectedActivity, setSelectedActivity] = useState<string>("ALL");

  // Extract unique districts and activities
  const districts = Array.from(new Set(initialPhotos.map(p => p.district))).sort();
  const activities = Array.from(
    new Map(initialPhotos.map(p => [p.activityType, p.activityLabelBn])).entries()
  );

  const filteredPhotos = initialPhotos.filter(item => {
    if (selectedDistrict !== "ALL" && item.district !== selectedDistrict) return false;
    if (selectedActivity !== "ALL" && item.activityType !== selectedActivity) return false;
    return true;
  });

  return (
    <div className="space-y-6 text-ink">
      {/* Filters Bar - Light Theme */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-sand/80 shadow-soft">
        <div className="flex items-center gap-2 text-ink font-ui text-sm">
          <Filter className="size-4 text-brand-700" />
          <span className="font-bold">ফিল্টার করুন:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* District Filter */}
          <select
            value={selectedDistrict}
            onChange={e => setSelectedDistrict(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-ivory/60 border border-sand text-ink text-xs sm:text-sm font-ui focus:outline-none focus:border-brand-600 focus:bg-white transition-colors"
          >
            <option value="ALL">সকল জেলা ({toBengaliDigits(initialPhotos.length)}টি ছবি)</option>
            {districts.map(d => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          {/* Activity Type Filter */}
          <select
            value={selectedActivity}
            onChange={e => setSelectedActivity(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-ivory/60 border border-sand text-ink text-xs sm:text-sm font-ui focus:outline-none focus:border-brand-600 focus:bg-white transition-colors"
          >
            <option value="ALL">সকল কার্যক্রমের ধরন</option>
            {activities.map(([code, label]) => (
              <option key={code} value={code}>
                {label}
              </option>
            ))}
          </select>

          {(selectedDistrict !== "ALL" || selectedActivity !== "ALL") && (
            <button
              onClick={() => {
                setSelectedDistrict("ALL");
                setSelectedActivity("ALL");
              }}
              className="text-xs text-accent-600 hover:text-accent-700 font-ui px-2 py-1 underline font-bold cursor-pointer"
            >
              রিসেট
            </button>
          )}
        </div>
      </div>

      {/* Grid - Light Theme */}
      {filteredPhotos.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-sand/80 shadow-2xs">
          <ImageIcon className="size-12 text-muted mx-auto mb-3" />
          <p className="text-muted font-ui text-sm">
            নির্বাচিত ফিল্টারে কোনো স্থিরচিত্র পাওয়া যায়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-sand/80 hover:border-lime-500/60 transition-all duration-300 shadow-soft hover:shadow-xl cursor-pointer flex flex-col"
            >
              {/* Photo Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-sand/30">
                <Image
                  src={item.photoUrl}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Activity Badge */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-brand-950/80 backdrop-blur-md text-[11px] font-bold text-lime-400 border border-lime-400/40">
                  {item.activityLabelBn}
                </span>

                {/* Points Badge */}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-orange-600/95 backdrop-blur-md text-[11px] font-bold text-white shadow-sm flex items-center gap-1">
                  <Award className="size-3" />+{toBengaliDigits(item.points)} পয়েন্ট
                </span>

                {/* District overlay */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white/95 text-xs">
                  <span className="inline-flex items-center gap-1 font-ui font-medium truncate">
                    <MapPin className="size-3 text-lime-400 shrink-0" />
                    {item.district}
                  </span>
                  <span className="text-[11px] text-white/80">
                    {item.formattedDateBn}
                  </span>
                </div>
              </div>

              {/* Caption & Imam details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-ui text-sm font-bold text-ink line-clamp-2 mb-1 group-hover:text-brand-800 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted truncate">
                    {item.mosqueName}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-sand/60 flex items-center justify-between text-[11px] text-muted">
                  <span className="truncate font-medium">{item.traineeName}</span>
                  <span className="text-brand-700 font-bold group-hover:underline">বড় করে দেখুন</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-brand-950 rounded-3xl border border-sand/40 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
              aria-label="বন্ধ করুন"
            >
              <X className="size-5" />
            </button>

            {/* Image Section */}
            <div className="relative md:w-3/5 bg-black flex items-center justify-center min-h-[300px] md:min-h-[450px]">
              <Image
                src={selectedPhoto.photoUrl}
                alt={selectedPhoto.title}
                fill
                unoptimized
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
            </div>

            {/* Details Section */}
            <div className="md:w-2/5 p-6 flex flex-col justify-between bg-brand-900/90 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-xl bg-lime-500/20 text-lime-400 text-xs font-semibold border border-lime-400/30">
                    {selectedPhoto.activityLabelBn}
                  </span>
                  <span className="text-xs font-bold text-orange-400 flex items-center gap-1">
                    <Award className="size-3.5" />
                    +{toBengaliDigits(selectedPhoto.points)} পয়েন্ট অর্জিত
                  </span>
                </div>

                <h3 className="font-ui text-lg font-bold text-ivory">
                  {selectedPhoto.title}
                </h3>

                <div className="space-y-2 text-xs font-ui text-sand/90">
                  <div className="flex items-start gap-2">
                    <MapPin className="size-4 text-lime-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-ivory">{selectedPhoto.mosqueName}</p>
                      <p>{selectedPhoto.district} জেলা</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="size-4 text-lime-400 shrink-0" />
                    <span>{selectedPhoto.formattedDateBn}</span>
                  </div>
                </div>

                {selectedPhoto.notes && (
                  <div className="p-3 rounded-xl bg-brand-950/60 border border-sand/20 text-xs text-ivory/80 leading-relaxed font-ui">
                    <p className="font-semibold text-lime-400 mb-1">কার্যক্রমের বিবরণ:</p>
                    {selectedPhoto.notes}
                  </div>
                )}

                {selectedPhoto.adminFeedback && (
                  <div className="p-3 rounded-xl bg-lime-950/40 border border-lime-500/30 text-xs text-lime-300 leading-relaxed font-ui">
                    <p className="font-semibold text-lime-400 mb-1">অ্যাডমিন রিভিউ মন্তব্য:</p>
                    {selectedPhoto.adminFeedback}
                  </div>
                )}
              </div>

              {/* Trainee Signature */}
              <div className="pt-4 mt-6 border-t border-sand/20">
                <p className="text-[11px] text-sand/60">বাস্তবায়নকারী প্রশিক্ষণার্থী:</p>
                <p className="font-ui font-semibold text-ivory text-sm">{selectedPhoto.traineeName}</p>
                <p className="text-xs text-sand/70">{toBengaliDigits(selectedPhoto.traineeMobile)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
