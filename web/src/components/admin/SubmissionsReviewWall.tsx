"use client";

import { useState, useEffect, useCallback } from "react";
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
  XCircle,
  Eye,
  Search,
  Filter,
  Check,
  X,
  Phone,
  User,
  Image as ImageIcon,
  AlertCircle,
  RefreshCw,
  FileText,
} from "lucide-react";
import { SubmissionRecord, ActivityType, ACTIVITY_CATEGORIES, SubmissionStatus } from "@/lib/submissions";
import { messages } from "@/lib/messages";
import { formatBengaliNumber, formatBengaliDate } from "@/lib/format";

const CATEGORY_ICONS: Record<ActivityType, React.ElementType> = {
  KHUTBAH: Megaphone,
  CLEANUP: ClipboardCheck,
  TREE_PLANTING: TreePine,
  ONLINE_CLASS: Radio,
  HALAQA: BookOpen,
  SOCIAL_WORK: HeartHandshake,
};

export function SubmissionsReviewWall() {
  const msg = messages.adminSubmissions;
  const cats = messages.submissions.activityCategories;

  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    totalPointsAwarded: 0,
  });
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const [rejectModalItem, setRejectModalItem] = useState<SubmissionRecord | null>(null);
  const [rejectFeedback, setRejectFeedback] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch submissions from API
  const fetchSubmissions = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (statusFilter !== "ALL") params.set("status", statusFilter);
      if (typeFilter !== "ALL") params.set("type", typeFilter);
      if (searchQuery.trim()) params.set("search", searchQuery.trim());

      const res = await fetch(`/api/admin/submissions?${params.toString()}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissions(data.submissions || []);
        if (data.stats) {
          setStats(data.stats);
        }
      }
    } catch (err) {
      console.error("Failed to fetch submissions:", err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, typeFilter, searchQuery]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const params = new URLSearchParams();
        if (statusFilter !== "ALL") params.set("status", statusFilter);
        if (typeFilter !== "ALL") params.set("type", typeFilter);
        if (searchQuery.trim()) params.set("search", searchQuery.trim());

        const res = await fetch(`/api/admin/submissions?${params.toString()}`);
        const data = await res.json();
        if (!cancelled && res.ok && data.success) {
          setSubmissions(data.submissions || []);
          if (data.stats) {
            setStats(data.stats);
          }
        }
      } catch (err) {
        console.error("Failed to fetch submissions:", err);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [statusFilter, typeFilter, searchQuery]);

  // 1-Click Approve
  const handleApprove = async (sub: SubmissionRecord) => {
    setProcessingId(sub.id);
    try {
      const res = await fetch(`/api/admin/submissions/${sub.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "APPROVED",
          adminFeedback: "মাশাআল্লাহ, যথাযথভাবে কার্যক্রম সম্পন্ন হয়েছে। পয়েন্ট অনুমোদিত।",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissions(prev =>
          prev.map(item =>
            item.id === sub.id
              ? {
                  ...item,
                  status: "APPROVED" as SubmissionStatus,
                  adminFeedback: "মাশাআল্লাহ, যথাযথভাবে কার্যক্রম সম্পন্ন হয়েছে। পয়েন্ট অনুমোদিত।",
                }
              : item
          )
        );

        // Update stats
        setStats(prev => ({
          ...prev,
          pending: Math.max(0, prev.pending - (sub.status === "PENDING" ? 1 : 0)),
          approved: prev.approved + (sub.status !== "APPROVED" ? 1 : 0),
          rejected: Math.max(0, prev.rejected - (sub.status === "REJECTED" ? 1 : 0)),
          totalPointsAwarded:
            prev.totalPointsAwarded + (sub.status !== "APPROVED" ? sub.points : 0),
        }));

        setToastMessage(msg.approvedSuccessToast);
        setTimeout(() => setToastMessage(null), 4000);
      }
    } catch (err) {
      console.error("Approve failed:", err);
    } finally {
      setProcessingId(null);
    }
  };

  // Confirm Reject
  const handleConfirmReject = async () => {
    if (!rejectModalItem) return;
    const sub = rejectModalItem;
    setProcessingId(sub.id);

    try {
      const res = await fetch(`/api/admin/submissions/${sub.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "REJECTED",
          adminFeedback: rejectFeedback.trim() || "কার্যক্রমের পর্যাপ্ত প্রামাণ্য ছবি পাওয়া যায়নি।",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissions(prev =>
          prev.map(item =>
            item.id === sub.id
              ? {
                  ...item,
                  status: "REJECTED" as SubmissionStatus,
                  adminFeedback:
                    rejectFeedback.trim() || "কার্যক্রমের পর্যাপ্ত প্রামাণ্য ছবি পাওয়া যায়নি।",
                }
              : item
          )
        );

        // Update stats
        setStats(prev => ({
          ...prev,
          pending: Math.max(0, prev.pending - (sub.status === "PENDING" ? 1 : 0)),
          approved: Math.max(0, prev.approved - (sub.status === "APPROVED" ? 1 : 0)),
          rejected: prev.rejected + (sub.status !== "REJECTED" ? 1 : 0),
          totalPointsAwarded:
            prev.totalPointsAwarded - (sub.status === "APPROVED" ? sub.points : 0),
        }));

        setToastMessage(msg.rejectedSuccessToast);
        setTimeout(() => setToastMessage(null), 4000);
      }
    } catch (err) {
      console.error("Reject failed:", err);
    } finally {
      setProcessingId(null);
      setRejectModalItem(null);
      setRejectFeedback("");
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-2xl bg-brand-950 px-5 py-3 text-sm font-ui text-lime-400 border border-lime-500/40 shadow-xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="size-5 text-lime-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {/* Total */}
        <div className="rounded-2xl border border-sand bg-white p-4 sm:p-5 shadow-xs">
          <span className="block font-ui text-xs text-muted mb-1">{msg.statTotal}</span>
          <span className="font-display text-2xl sm:text-3xl font-bold text-brand-950">
            {formatBengaliNumber(stats.total)}
          </span>
          <span className="block text-[11px] text-muted mt-0.5">দেশব্যাপী জমা</span>
        </div>

        {/* Pending */}
        <div className="rounded-2xl border border-amber-300 bg-amber-50/60 p-4 sm:p-5 shadow-xs">
          <span className="block font-ui text-xs font-semibold text-amber-900 mb-1">
            {msg.statPending}
          </span>
          <span className="font-display text-2xl sm:text-3xl font-bold text-amber-700">
            {formatBengaliNumber(stats.pending)}
          </span>
          <span className="block text-[11px] text-amber-800/80 mt-0.5">পর্যালোচনা প্রয়োজন</span>
        </div>

        {/* Approved */}
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50/60 p-4 sm:p-5 shadow-xs">
          <span className="block font-ui text-xs font-semibold text-emerald-900 mb-1">
            {msg.statApproved}
          </span>
          <span className="font-display text-2xl sm:text-3xl font-bold text-emerald-700">
            {formatBengaliNumber(stats.approved)}
          </span>
          <span className="block text-[11px] text-emerald-800/80 mt-0.5">পয়েন্ট প্রদানকৃত</span>
        </div>

        {/* Total Points */}
        <div className="rounded-2xl border border-lime-500/40 bg-brand-950 text-ivory p-4 sm:p-5 shadow-xs">
          <span className="block font-ui text-xs text-ivory/70 mb-1">{msg.statTotalPoints}</span>
          <span className="font-display text-2xl sm:text-3xl font-bold text-lime-400">
            +{formatBengaliNumber(stats.totalPointsAwarded)}
          </span>
          <span className="block text-[11px] text-ivory/60 mt-0.5">প্রশিক্ষণার্থীদের অর্জিত</span>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="rounded-2xl border border-sand bg-white p-4 shadow-soft space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Input */}
          <div className="relative sm:col-span-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={msg.searchPlaceholder}
              className="w-full min-h-11 rounded-xl border border-sand bg-ivory/40 pl-10 pr-4 py-2 font-sans text-xs sm:text-sm text-brand-950 placeholder:text-muted/60 focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full min-h-11 rounded-xl border border-sand bg-ivory/40 px-3 py-2 font-ui text-xs sm:text-sm text-brand-950 focus:border-accent-500 focus:outline-none"
            >
              <option value="ALL">{msg.filterStatusAll}</option>
              <option value="PENDING">পর্যালোচনায় বাকি (Pending)</option>
              <option value="APPROVED">অনুমোদিত (Approved)</option>
              <option value="REJECTED">প্রত্যাখ্যাত (Rejected)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="w-full min-h-11 rounded-xl border border-sand bg-ivory/40 px-3 py-2 font-ui text-xs sm:text-sm text-brand-950 focus:border-accent-500 focus:outline-none"
            >
              <option value="ALL">{msg.filterTypeAll}</option>
              {(Object.keys(ACTIVITY_CATEGORIES) as ActivityType[]).map(k => (
                <option key={k} value={k}>
                  {cats[k]?.title || ACTIVITY_CATEGORIES[k].labelBn} (+
                  {formatBengaliNumber(ACTIVITY_CATEGORIES[k].defaultPoints)} পয়েন্ট)
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={fetchSubmissions}
              title="রিফ্রেশ করুন"
              className="size-11 shrink-0 flex items-center justify-center rounded-xl border border-sand bg-ivory hover:bg-sand/40 transition-colors cursor-pointer"
            >
              <RefreshCw className={`size-4 text-muted ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Submissions Review Wall Grid */}
      {submissions.length === 0 ? (
        <div className="rounded-3xl border border-sand bg-white p-12 text-center shadow-soft">
          <Filter className="mx-auto size-12 text-muted/60 mb-3" />
          <h3 className="font-display text-lg font-bold text-brand-950">
            {msg.noSubmissionsFound}
          </h3>
          <p className="mt-1 text-sm text-muted font-sans">
            নির্বাচিত ফিল্টারের সাথে মিলে এমন কোনো কার্যক্রম পাওয়া যায়নি।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {submissions.map(sub => {
            const Icon = CATEGORY_ICONS[sub.activityType] || ClipboardCheck;
            const isApproved = sub.status === "APPROVED";
            const isPending = sub.status === "PENDING";
            const isRejected = sub.status === "REJECTED";
            const isProcessing = processingId === sub.id;

            return (
              <div
                key={sub.id}
                className={`rounded-3xl border bg-white p-5 sm:p-6 shadow-soft flex flex-col justify-between transition-all ${
                  isPending
                    ? "border-amber-300 ring-2 ring-amber-100"
                    : isApproved
                    ? "border-emerald-200"
                    : "border-sand/70 opacity-80"
                }`}
              >
                <div>
                  {/* Top Bar: Trainee & Status */}
                  <div className="flex items-start justify-between gap-3 border-b border-sand/60 pb-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-900 border border-lime-500/30 text-lime-400">
                        <User className="size-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-ui text-sm font-bold text-brand-950">
                            {sub.traineeName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted font-ui">
                          <span className="inline-flex items-center gap-1">
                            <Phone className="size-3 text-brand-700" />
                            <span className="font-ui text-sm font-bold tabular-nums tracking-wide text-brand-900">{formatBengaliNumber(sub.traineeMobile)}</span>
                          </span>
                          <span className="size-1 rounded-full bg-sand" />
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="size-3 text-accent-500" />
                            <span>{sub.district}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div>
                      {isApproved && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 font-ui text-[11px] font-bold text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="size-3 text-emerald-600" />
                          <span>অনুমোদিত</span>
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 font-ui text-[11px] font-bold text-amber-900 border border-amber-300">
                          <Clock className="size-3 text-amber-700" />
                          <span>পর্যালোচনায়</span>
                        </span>
                      )}
                      {isRejected && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 font-ui text-[11px] font-bold text-red-900 border border-red-300">
                          <XCircle className="size-3 text-red-600" />
                          <span>প্রত্যাখ্যাত</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Activity Details */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sand text-brand-900">
                      <Icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-ui text-xs font-bold text-brand-700">
                          {cats[sub.activityType]?.title || sub.activityType}
                        </span>
                        <span className="rounded-full bg-lime-100 px-2 py-0.5 font-display text-[11px] font-bold text-brand-950 border border-lime-500/40">
                          +{formatBengaliNumber(sub.points)} পয়েন্ট
                        </span>
                      </div>

                      <h4 className="font-display text-base font-bold text-brand-950 line-clamp-2">
                        {sub.title}
                      </h4>

                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted font-ui">
                        <span className="inline-flex items-center gap-1">
                          <Building2 className="size-3 text-brand-600" />
                          <span>{sub.venueName}</span>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="size-3 text-muted" />
                          <span>{formatBengaliDate(sub.date)}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Notes / Description */}
                  {sub.notes && (
                    <p className="text-xs text-ink/80 font-sans bg-ivory/60 rounded-xl p-3 border border-sand/60 mb-3">
                      {sub.notes}
                    </p>
                  )}

                  {/* Attached Proofs (Dignified document badge instead of open thumbnails) */}
                  {sub.photos && sub.photos.length > 0 && (
                    <div className="mb-4">
                      <button
                        type="button"
                        onClick={() => setActivePhoto(sub.photos[0])}
                        className="inline-flex items-center gap-2 rounded-xl bg-sand/40 hover:bg-sand/70 border border-sand px-3 py-2 text-xs font-ui font-semibold text-brand-950 transition cursor-pointer"
                      >
                        <FileText className="size-4 text-brand-700" />
                        <span>সংযুক্ত প্রমাণপত্র ({formatBengaliNumber(sub.photos.length)}টি ফাইল)</span>
                        <Eye className="size-3.5 text-muted ml-0.5" />
                      </button>
                    </div>
                  )}

                  {/* Existing Admin Feedback note */}
                  {sub.adminFeedback && (
                    <div className="rounded-xl bg-sand/30 border border-sand p-2 text-xs font-ui text-muted mb-3">
                      <span className="font-semibold text-brand-950">মন্তব্য:</span>{" "}
                      <span>{sub.adminFeedback}</span>
                    </div>
                  )}
                </div>

                {/* 1-Click Action Buttons */}
                <div className="pt-3 border-t border-sand/60 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleApprove(sub)}
                    disabled={isProcessing || isApproved}
                    className={`flex-1 min-h-11 inline-flex items-center justify-center gap-1.5 rounded-xl font-ui text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      isApproved
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                        : "bg-brand-900 text-lime-400 hover:bg-brand-950 border border-lime-500/40 shadow-xs"
                    }`}
                  >
                    <Check className="size-4" />
                    <span>
                      {isApproved
                        ? "অনুমোদিত (+পয়েন্ট যুক্ত)"
                        : `অনুমোদন (+${formatBengaliNumber(sub.points)} পয়েন্ট)`}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRejectModalItem(sub)}
                    disabled={isProcessing || isRejected}
                    className={`min-h-11 px-3.5 inline-flex items-center justify-center gap-1 rounded-xl font-ui text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isRejected
                        ? "bg-red-50 text-red-600 border border-red-200 cursor-default"
                        : "border border-danger/30 text-danger hover:bg-danger/10"
                    }`}
                  >
                    <X className="size-4" />
                    <span>{isRejected ? "প্রত্যাখ্যাত" : "বাতিল"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Photo Lightbox Modal */}
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
              <span className="font-ui text-sm font-semibold">{msg.modalPhotosTitle}</span>
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

      {/* Reject Reason Modal */}
      {rejectModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/70 backdrop-blur-sm p-4 animate-in fade-in"
        >
          <div className="relative max-w-md w-full rounded-3xl bg-white p-6 shadow-2xl border border-sand">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-danger">
                <AlertCircle className="size-5" />
                <h4 className="font-display text-lg font-bold">কার্যক্রম বাতিলকরণ</h4>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRejectModalItem(null);
                  setRejectFeedback("");
                }}
                className="flex size-8 items-center justify-center rounded-full hover:bg-sand/40 text-muted cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="text-xs text-muted font-sans mb-3">
              {rejectModalItem.traineeName} এর &ldquo;{rejectModalItem.title}&rdquo; কার্যক্রমটি বাতিল করতে
              চাচ্ছেন।
            </p>

            <label className="block font-ui text-xs font-semibold text-brand-950 mb-1.5">
              {msg.feedbackPrompt}
            </label>
            <textarea
              rows={3}
              value={rejectFeedback}
              onChange={e => setRejectFeedback(e.target.value)}
              placeholder="যেমন: ছবি অস্পষ্ট অথবা মসজিদ প্রাঙ্গণ চিহ্নিত করা যাচ্ছে না..."
              className="w-full rounded-xl border border-sand bg-ivory/50 p-3 font-sans text-xs sm:text-sm text-brand-950 focus:border-danger focus:outline-none"
            />

            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setRejectModalItem(null);
                  setRejectFeedback("");
                }}
                className="min-h-11 px-4 rounded-xl border border-sand text-xs font-ui font-semibold text-muted hover:bg-sand/30 cursor-pointer"
              >
                বাতিল
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="min-h-11 px-5 rounded-xl bg-danger text-white text-xs font-ui font-bold hover:bg-danger/90 cursor-pointer shadow-sm"
              >
                প্রত্যাখ্যান নিশ্চিত করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
