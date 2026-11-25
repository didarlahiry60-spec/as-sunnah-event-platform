"use client";

import { useState } from "react";
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
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Eye,
  Plus,
  Image as ImageIcon,
  X,
} from "lucide-react";
import { SubmissionRecord, ActivityType, ACTIVITY_CATEGORIES } from "@/lib/submissions";
import { messages } from "@/lib/messages";
import { formatBengaliNumber, formatBengaliDate } from "@/lib/format";

interface SubmissionsListProps {
  submissions: SubmissionRecord[];
  onOpenNewSubmission?: () => void;
}

const CATEGORY_ICONS: Record<ActivityType, React.ElementType> = {
  KHUTBAH: Megaphone,
  CLEANUP: ClipboardCheck,
  TREE_PLANTING: TreePine,
  ONLINE_CLASS: Radio,
  HALAQA: BookOpen,
  SOCIAL_WORK: HeartHandshake,
};

export function SubmissionsList({
  submissions,
  onOpenNewSubmission,
}: SubmissionsListProps) {
  const msg = messages.submissions.history;
  const cats = messages.submissions.activityCategories;

  // Photo viewer lightbox modal state
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  if (submissions.length === 0) {
    return (
      <div className="rounded-3xl border border-sand bg-white p-8 sm:p-12 text-center shadow-soft">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-sand/40 text-brand-900 border border-sand/80 shadow-xs mb-4">
          <ClipboardCheck className="size-8 text-brand-700" />
        </div>
        <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-950">
          {msg.noSubmissionsTitle}
        </h3>
        <p className="mt-2 text-sm text-muted font-sans max-w-md mx-auto">
          {msg.noSubmissionsDesc}
        </p>

        {onOpenNewSubmission && (
          <div className="mt-6">
            <button
              type="button"
              onClick={onOpenNewSubmission}
              className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-2.5 font-ui text-sm font-bold text-brand-950 shadow-md hover:from-accent-400 hover:to-accent-500 transition-all cursor-pointer"
            >
              <Plus className="size-4" />
              <span>নতুন কার্যক্রম জমা দিন</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* List of Submission Cards */}
      <div className="grid grid-cols-1 gap-4">
        {submissions.map(sub => {
          const Icon = CATEGORY_ICONS[sub.activityType] || ClipboardCheck;
          const catInfo = ACTIVITY_CATEGORIES[sub.activityType];

          const isApproved = sub.status === "APPROVED";
          const isPending = sub.status === "PENDING";
          const isRejected = sub.status === "REJECTED";

          return (
            <div
              key={sub.id}
              className="rounded-3xl border border-sand bg-white p-5 sm:p-6 shadow-soft hover:border-lime-500/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                {/* Header: Icon, Category & Title */}
                <div className="flex items-start gap-3.5">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-900 border border-lime-500/30 text-lime-400 shadow-xs">
                    <Icon className="size-6" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-ui text-xs font-bold text-brand-700">
                        {cats[sub.activityType]?.title || catInfo?.labelBn || sub.activityType}
                      </span>
                      <span className="size-1 rounded-full bg-sand" />
                      <span className="font-mono text-[11px] text-muted">
                        {sub.id}
                      </span>
                    </div>

                    <h4 className="font-display text-base sm:text-lg font-bold text-brand-950">
                      {sub.title}
                    </h4>

                    {/* Venue & Date */}
                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted font-ui">
                      <span className="inline-flex items-center gap-1">
                        <Building2 className="size-3.5 text-brand-600" />
                        <span>{sub.venueName}</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5 text-accent-500" />
                        <span>{sub.district}</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3.5 text-muted" />
                        <span>{formatBengaliDate(sub.date)}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status & Points Pills */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0">
                  {/* Status Badge */}
                  {isApproved && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-ui text-xs font-bold text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="size-3 text-emerald-600" />
                      <span>অনুমোদিত</span>
                    </span>
                  )}
                  {isPending && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 font-ui text-xs font-bold text-amber-800 border border-amber-200">
                      <Clock className="size-3 text-amber-600" />
                      <span>{msg.pendingReviewBadge}</span>
                    </span>
                  )}
                  {isRejected && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 font-ui text-xs font-bold text-red-800 border border-red-200">
                      <XCircle className="size-3 text-red-600" />
                      <span>প্রত্যাখ্যাত</span>
                    </span>
                  )}

                  {/* Points Pill */}
                  <span
                    className={`rounded-full px-3 py-0.5 font-display text-xs font-bold ${
                      isApproved
                        ? "bg-lime-500 text-brand-950"
                        : "bg-sand text-brand-950/70"
                    }`}
                  >
                    +{formatBengaliNumber(sub.points)} পয়েন্ট
                  </span>
                </div>
              </div>

              {/* Trainee Notes */}
              {sub.notes && (
                <p className="mt-3.5 text-xs sm:text-sm text-ink/80 font-sans bg-ivory/60 rounded-xl p-3 border border-sand/60">
                  {sub.notes}
                </p>
              )}

              {/* Admin Feedback (if rejected or reviewed) */}
              {sub.adminFeedback && (
                <div className="mt-3 rounded-xl bg-amber-500/10 border border-amber-500/30 p-2.5 text-xs font-ui text-amber-950 flex items-start gap-2">
                  <AlertCircle className="size-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <span className="font-bold">{msg.feedbackLabel}</span>{" "}
                    <span>{sub.adminFeedback}</span>
                  </div>
                </div>
              )}

              {/* Attached Photos Gallery */}
              {sub.photos && sub.photos.length > 0 && (
                <div className="mt-4 pt-3 border-t border-sand/60">
                  <div className="flex items-center gap-1.5 font-ui text-xs text-muted mb-2">
                    <ImageIcon className="size-3.5 text-brand-600" />
                    <span>
                      {formatBengaliNumber(sub.photos.length)} {msg.photoCount}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sub.photos.map((photoUrl, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setActivePhoto(photoUrl)}
                        className="group relative size-16 sm:size-20 rounded-xl overflow-hidden border border-sand shadow-xs hover:ring-2 hover:ring-lime-500 transition-all cursor-pointer"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={photoUrl}
                          alt={`${sub.title} ছবি ${pIdx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                          <Eye className="size-4" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* High-Res Photo Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/80 backdrop-blur-sm p-4 animate-in fade-in"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-2xl bg-brand-950 border border-sand/20 overflow-hidden shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-sand/20 text-ivory">
              <span className="font-ui text-sm font-semibold">কার্যক্রমের স্থিরচিত্র</span>
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="flex size-9 items-center justify-center rounded-full bg-sand/20 text-ivory hover:bg-sand/40 transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="p-2 sm:p-4 max-h-[80vh] flex items-center justify-center bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePhoto}
                alt="পূর্ণাঙ্গ স্থিরচিত্র"
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
