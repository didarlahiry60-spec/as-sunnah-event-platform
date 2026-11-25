"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ClipboardCheck,
  Megaphone,
  TreePine,
  Radio,
  BookOpen,
  HeartHandshake,
  Calendar,
  Building2,
  MapPin,
  Upload,
  X,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
} from "lucide-react";
import { messages } from "@/lib/messages";
import { formatBengaliNumber } from "@/lib/format";
import { ActivityType, ACTIVITY_CATEGORIES } from "@/lib/submissions";

interface SubmissionFormProps {
  onSuccess?: () => void;
  defaultDistrict?: string;
  defaultVenue?: string;
}

const CATEGORY_ICONS: Record<ActivityType, React.ElementType> = {
  KHUTBAH: Megaphone,
  CLEANUP: ClipboardCheck,
  TREE_PLANTING: TreePine,
  ONLINE_CLASS: Radio,
  HALAQA: BookOpen,
  SOCIAL_WORK: HeartHandshake,
};



export function SubmissionForm({
  onSuccess,
  defaultDistrict = "ঢাকা",
  defaultVenue = "",
}: SubmissionFormProps) {
  const router = useRouter();
  const msg = messages.submissions.form;
  const cats = messages.submissions.activityCategories;

  const [activityType, setActivityType] = useState<ActivityType>("CLEANUP");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [venueName, setVenueName] = useState(defaultVenue);
  const [district, setDistrict] = useState(defaultDistrict);
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successSubmission, setSuccessSubmission] = useState<{
    id: string;
    points: number;
    title: string;
  } | null>(null);

  // File upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 4 - photos.length;
    const filesToRead = Array.from(files).slice(0, remainingSlots);

    filesToRead.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPhotos(prev => (prev.length < 4 ? [...prev, reader.result as string] : prev));
        }
      };
      reader.readAsDataURL(file);
    });
  };



  // Remove photo
  const handleRemovePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage("অনুগ্রহ করে কার্যক্রমের শিরোনাম বা বিষয় প্রদান করুন।");
      return;
    }
    if (!venueName.trim()) {
      setErrorMessage("অনুগ্রহ করে মসজিদ বা স্থানের নাম প্রদান করুন।");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/portal/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activityType,
          title: title.trim(),
          date,
          venueName: venueName.trim(),
          district: district.trim(),
          notes: notes.trim(),
          photos,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "কার্যক্রম জমা দেওয়া সম্ভব হয়নি।");
      }

      setSuccessSubmission({
        id: data.submission.id,
        points: data.submission.points,
        title: data.submission.title,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "কার্যক্রম জমা দিতে ত্রুটি হয়েছে।");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCategoryMeta = ACTIVITY_CATEGORIES[activityType];

  if (successSubmission) {
    return (
      <div className="rounded-3xl border border-lime-500/40 bg-white p-6 sm:p-8 text-center shadow-soft">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-lime-100 text-brand-900 border border-lime-500/40 shadow-xs mb-4">
          <CheckCircle2 className="size-9 text-brand-600" />
        </div>

        <span className="inline-block rounded-full bg-lime-100 px-3 py-1 font-ui text-xs font-bold text-brand-900 border border-lime-500/30 mb-2">
          আইডি: {successSubmission.id}
        </span>

        <h3 className="font-display text-2xl font-bold text-brand-950">
          আলহামদুলিল্লাহ! আপনার কার্যক্রম জমা হয়েছে
        </h3>

        <p className="mt-2 text-sm sm:text-base text-muted font-sans max-w-lg mx-auto">
          {msg.successNotice}
        </p>

        <div className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-brand-950 px-4 py-2 text-ivory">
          <span className="text-xs font-ui text-ivory/80">সম্ভাব্য অর্জিত পয়েন্ট:</span>
          <span className="font-display text-lg font-bold text-lime-400">
            +{formatBengaliNumber(successSubmission.points)} পয়েন্ট
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSuccessSubmission(null);
              setTitle("");
              setNotes("");
              setPhotos([]);
            }}
            className="min-h-12 rounded-xl border border-sand bg-ivory px-5 py-2.5 font-ui text-sm font-semibold text-brand-950 hover:bg-sand/40 transition-colors cursor-pointer"
          >
            আরেকটি কার্যক্রম জমা দিন
          </button>

          <button
            type="button"
            onClick={() => router.push("/portal/submissions")}
            className="min-h-12 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-2.5 font-ui text-sm font-bold text-brand-950 shadow-md hover:from-accent-400 hover:to-accent-500 transition-all cursor-pointer"
          >
            <span>কার্যক্রমের ইতিহাস দেখুন</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Category Picker with Big Point Badges */}
      <div>
        <label className="block font-ui text-sm font-semibold text-brand-950 mb-3">
          {msg.categoryLabel} <span className="text-danger">*</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {(Object.keys(ACTIVITY_CATEGORIES) as ActivityType[]).map(catKey => {
            const meta = ACTIVITY_CATEGORIES[catKey];
            const isSelected = activityType === catKey;
            const Icon = CATEGORY_ICONS[catKey] || ClipboardCheck;

            return (
              <button
                key={catKey}
                type="button"
                onClick={() => setActivityType(catKey)}
                className={`flex flex-col items-start p-3 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer min-h-[92px] ${
                  isSelected
                    ? "border-lime-500 bg-lime-50/70 ring-2 ring-lime-500/20 shadow-xs"
                    : "border-sand bg-white hover:border-lime-500/30 hover:bg-sand/20"
                }`}
              >
                <div className="flex w-full items-center justify-between gap-1">
                  <div
                    className={`flex size-8 items-center justify-center rounded-xl ${
                      isSelected
                        ? "bg-brand-900 text-lime-400"
                        : "bg-sand/60 text-muted"
                    }`}
                  >
                    <Icon className="size-4" />
                  </div>

                  <span
                    className={`rounded-full px-2 py-0.5 font-ui text-[11px] font-bold ${
                      isSelected
                        ? "bg-lime-500 text-brand-950"
                        : "bg-sand text-brand-950/80"
                    }`}
                  >
                    +{formatBengaliNumber(meta.defaultPoints)} পয়েন্ট
                  </span>
                </div>

                <span className="mt-2.5 font-ui text-xs sm:text-sm font-bold text-brand-950 line-clamp-1">
                  {cats[catKey]?.title || meta.labelBn}
                </span>
                <span className="text-[11px] text-muted line-clamp-1">
                  {cats[catKey]?.desc || meta.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="activity-title" className="block font-ui text-sm font-semibold text-brand-950 mb-1.5">
          {msg.titleLabel} <span className="text-danger">*</span>
        </label>
        <div className="relative">
          <input
            id="activity-title"
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder={msg.titlePlaceholder}
            className="w-full min-h-12 rounded-xl border border-sand bg-white px-4 py-2.5 font-sans text-sm text-brand-950 placeholder:text-muted/60 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
          />
        </div>
      </div>

      {/* Date & Mosque Name Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Date */}
        <div>
          <label htmlFor="activity-date" className="block font-ui text-sm font-semibold text-brand-950 mb-1.5">
            {msg.dateLabel} <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted pointer-events-none" />
            <input
              id="activity-date"
              type="date"
              required
              value={date}
              onChange={e => setDate(e.target.value)}
              className="w-full min-h-12 rounded-xl border border-sand bg-white pl-10 pr-4 py-2.5 font-sans text-sm text-brand-950 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
            />
          </div>
        </div>

        {/* District */}
        <div>
          <label htmlFor="activity-district" className="block font-ui text-sm font-semibold text-brand-950 mb-1.5">
            {msg.districtLabel} <span className="text-danger">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted pointer-events-none" />
            <input
              id="activity-district"
              type="text"
              required
              value={district}
              onChange={e => setDistrict(e.target.value)}
              placeholder={msg.districtPlaceholder}
              className="w-full min-h-12 rounded-xl border border-sand bg-white pl-10 pr-4 py-2.5 font-sans text-sm text-brand-950 placeholder:text-muted/60 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
            />
          </div>
        </div>
      </div>

      {/* Mosque or Venue */}
      <div>
        <label htmlFor="activity-venue" className="block font-ui text-sm font-semibold text-brand-950 mb-1.5">
          {msg.venueLabel} <span className="text-danger">*</span>
        </label>
        <div className="relative">
          <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted pointer-events-none" />
          <input
            id="activity-venue"
            type="text"
            required
            value={venueName}
            onChange={e => setVenueName(e.target.value)}
            placeholder={msg.venuePlaceholder}
            className="w-full min-h-12 rounded-xl border border-sand bg-white pl-10 pr-4 py-2.5 font-sans text-sm text-brand-950 placeholder:text-muted/60 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
          />
        </div>
      </div>

      {/* Description / Notes */}
      <div>
        <label htmlFor="activity-notes" className="block font-ui text-sm font-semibold text-brand-950 mb-1.5">
          {msg.notesLabel}
        </label>
        <textarea
          id="activity-notes"
          rows={3}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder={msg.notesPlaceholder}
          className="w-full rounded-xl border border-sand bg-white px-4 py-2.5 font-sans text-sm text-brand-950 placeholder:text-muted/60 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20"
        />
      </div>

      {/* Photos Attachment Section with Previews & Delete */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block font-ui text-sm font-semibold text-brand-950">
            {msg.photosLabel} ({formatBengaliNumber(photos.length)}/৪)
          </label>
        </div>

        <p className="text-xs text-muted mb-3 font-sans">
          {msg.photosHint}
        </p>

        {/* Upload Box & Previews */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Photos already selected */}
          {photos.map((photoUrl, idx) => (
            <div
              key={idx}
              className="relative aspect-video sm:aspect-square rounded-2xl overflow-hidden border border-sand bg-black/5 group shadow-xs"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoUrl}
                alt={`কার্যক্রম ছবি ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemovePhoto(idx)}
                aria-label={msg.deletePhoto}
                className="absolute top-1.5 right-1.5 flex size-9 items-center justify-center rounded-full bg-danger text-white shadow-md hover:bg-danger/90 transition-all cursor-pointer z-10"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}

          {/* Add photo slot button */}
          {photos.length < 4 && (
            <label className="flex flex-col items-center justify-center aspect-video sm:aspect-square rounded-2xl border-2 border-dashed border-sand hover:border-lime-500 bg-sand/20 hover:bg-lime-50/40 transition-all cursor-pointer p-3 text-center min-h-[96px]">
              <Upload className="size-6 text-brand-700 mb-1" />
              <span className="font-ui text-xs font-semibold text-brand-950">
                ছবি আপলোড
              </span>
              <span className="text-[10px] text-muted">ক্যামেরা বা গ্যালারি</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="sr-only"
              />
            </label>
          )}
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="flex items-center gap-2 rounded-xl bg-danger/10 border border-danger/20 p-3 text-sm text-danger font-ui">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit CTA (Min 48px Touch Target) */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full min-h-12 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-3 font-ui text-base font-bold text-brand-950 shadow-md hover:from-accent-400 hover:to-accent-500 active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer"
        >
          {submitting ? (
            <span>{msg.submittingButton}</span>
          ) : (
            <>
              <span>{msg.submitButton}</span>
              <span className="rounded-full bg-brand-950/20 px-2 py-0.5 text-xs text-brand-950">
                +{formatBengaliNumber(selectedCategoryMeta.defaultPoints)} পয়েন্ট
              </span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
