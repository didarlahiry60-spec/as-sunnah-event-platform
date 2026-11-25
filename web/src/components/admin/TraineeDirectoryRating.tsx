"use client";

import { useState } from "react";
import {
  Star,
  AlertTriangle,
  PhoneCall,
  Search,
  X,
  CheckCircle2,
  Clock,
  UserCheck,
} from "lucide-react";
import { AdminTraineeItem } from "@/lib/trainee-admin";
import { toBengaliDigits, toEnglishDigits } from "@/lib/format";

interface TraineeDirectoryRatingProps {
  initialTrainees: AdminTraineeItem[];
}

export function TraineeDirectoryRating({ initialTrainees }: TraineeDirectoryRatingProps) {
  const [trainees, setTrainees] = useState<AdminTraineeItem[]>(initialTrainees);
  const [search, setSearch] = useState("");
  const [districtFilter, setDistrictFilter] = useState("ALL");
  const [starFilter, setStarFilter] = useState<number | "ALL">("ALL");
  const [redFlagFilter, setRedFlagFilter] = useState<"ALL" | "RED_FLAG" | "ACTIVE">("ALL");

  // Call Log Modal State
  const [activeModalTrainee, setActiveModalTrainee] = useState<AdminTraineeItem | null>(null);
  const [callerName, setCallerName] = useState("মুহাম্মদ আব্দুল্লাহ (প্রশাসনিক কর্মকর্তা)");
  const [callNotes, setCallNotes] = useState("");
  const [callOutcome, setCallOutcome] = useState("CALL_COMPLETED");
  const [clearRedFlag, setClearRedFlag] = useState(false);
  const [isSubmittingLog, setIsSubmittingLog] = useState(false);
  const [ratingLoadingId, setRatingLoadingId] = useState<string | null>(null);

  // Extract unique districts
  const districts = Array.from(
    new Set(initialTrainees.map(t => t.district).filter(Boolean))
  ) as string[];

  // Update rating handler
  const handleRatingChange = async (personId: string, newRating: number) => {
    const prevRating = trainees.find(t => t.id === personId)?.internalStars ?? 3;
    setRatingLoadingId(personId);
    // Optimistic update
    setTrainees(prev =>
      prev.map(t => (t.id === personId ? { ...t, internalStars: newRating } : t))
    );

    try {
      const res = await fetch(`/api/admin/trainees/${personId}/rating`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: newRating }),
      });
      if (!res.ok) {
        throw new Error("রেটিং আপডেট করা যায়নি");
      }
    } catch (err) {
      console.error(err);
      // Revert ONLY this trainee on failure, preserving any other updates
      setTrainees(prev =>
        prev.map(t => (t.id === personId ? { ...t, internalStars: prevRating } : t))
      );
    } finally {
      setRatingLoadingId(null);
    }
  };

  // Submit Call Log handler
  const handleSaveCallLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalTrainee || !callNotes.trim()) return;

    setIsSubmittingLog(true);
    try {
      const res = await fetch(`/api/admin/trainees/${activeModalTrainee.id}/call-log`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          callerName,
          notes: callNotes,
          outcome: callOutcome,
          clearRedFlag,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "কল লগ সংরক্ষণ করা যায়নি");
      }

      // Update state
      setTrainees(prev =>
        prev.map(t => {
          if (t.id === activeModalTrainee.id) {
            return {
              ...t,
              redFlag: clearRedFlag ? false : t.redFlag,
              callLogs: [data.log, ...t.callLogs],
            };
          }
          return t;
        })
      );

      // Reset & close modal
      setCallNotes("");
      setClearRedFlag(false);
      setActiveModalTrainee(null);
    } catch (err) {
      console.error(err);
      alert("কল লগ সংরক্ষণ করতে সমস্যা হয়েছে।");
    } finally {
      setIsSubmittingLog(false);
    }
  };

  // Filter trainees
  const filteredTrainees = trainees.filter(t => {
    if (districtFilter !== "ALL" && t.district !== districtFilter) return false;
    if (starFilter !== "ALL" && t.internalStars !== starFilter) return false;
    if (redFlagFilter === "RED_FLAG" && !t.redFlag) return false;
    if (redFlagFilter === "ACTIVE" && t.redFlag) return false;

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      const enQ = toEnglishDigits(q);
      const matches =
        t.name.toLowerCase().includes(q) ||
        t.mobile.includes(q) ||
        t.mobile.includes(enQ) ||
        (t.district && t.district.toLowerCase().includes(q)) ||
        (t.mosqueName && t.mosqueName.toLowerCase().includes(q));
      if (!matches) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 text-ink">
      {/* Controls & Search - Light Theme */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-sand/80 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted" />
            <input
              type="text"
              placeholder="নাম, মোবাইল নম্বর, মসজিদ বা জেলা দিয়ে খুঁজুন..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-ivory/60 border border-sand text-ink placeholder:text-muted text-sm font-ui focus:outline-none focus:border-brand-600 focus:bg-white transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* District filter */}
            <select
              value={districtFilter}
              onChange={e => setDistrictFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl bg-ivory/60 border border-sand text-ink text-xs sm:text-sm font-ui focus:outline-none focus:border-brand-600 focus:bg-white transition-colors"
            >
              <option value="ALL">সকল জেলা</option>
              {districts.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {/* Secret Star filter */}
            <select
              value={starFilter}
              onChange={e =>
                setStarFilter(e.target.value === "ALL" ? "ALL" : parseInt(e.target.value, 10))
              }
              className="px-3.5 py-2.5 rounded-xl bg-ivory/60 border border-sand text-ink text-xs sm:text-sm font-ui focus:outline-none focus:border-brand-600 focus:bg-white transition-colors"
            >
              <option value="ALL">সকল রেটিং (১-৫)</option>
              <option value="5">৫ স্টার ★★★★★</option>
              <option value="4">৪ স্টার ★★★★</option>
              <option value="3">৩ স্টার ★★★</option>
              <option value="2">২ স্টার ★★</option>
              <option value="1">১ স্টার ★</option>
            </select>

            {/* RedFlag filter */}
            <select
              value={redFlagFilter}
              onChange={e => setRedFlagFilter(e.target.value as "ALL" | "RED_FLAG" | "ACTIVE")}
              className="px-3.5 py-2.5 rounded-xl bg-ivory/60 border border-sand text-ink text-xs sm:text-sm font-ui focus:outline-none focus:border-brand-600 focus:bg-white transition-colors"
            >
              <option value="ALL">সকল অবস্থা</option>
              <option value="RED_FLAG">রেড-ফ্ল্যাগ নিষ্ক্রিয়</option>
              <option value="ACTIVE">সক্রিয় প্রশিক্ষণার্থী</option>
            </select>
          </div>
        </div>

        {/* Counter */}
        <div className="flex items-center justify-between text-xs font-ui text-muted pt-2 border-t border-sand/60">
          <span className="font-semibold text-ink">মোট প্রদর্শিত: {toBengaliDigits(filteredTrainees.length)} জন</span>
          <span className="text-[11px] text-brand-800 font-medium">
            * স্টার রেটিং এবং কল লগ সম্পূর্ণ গোপনীয় ও কেবল অ্যাডমিনরাই দেখতে পাবেন
          </span>
        </div>
      </div>

      {/* Trainees List Table / Card View - Light Theme */}
      <div className="grid grid-cols-1 gap-4">
        {filteredTrainees.map(trainee => (
          <div
            key={trainee.id}
            className={`p-5 rounded-2xl border transition-all duration-200 shadow-2xs ${
              trainee.redFlag
                ? "bg-rose-50/70 border-rose-300 hover:border-rose-400"
                : "bg-white border-sand/80 hover:border-lime-500/60 hover:shadow-soft"
            }`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Left: Info */}
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-ui text-base font-bold text-ink">
                    {trainee.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-sand/40 text-brand-900 text-xs font-ui font-semibold">
                    {trainee.categoryLabelBn}
                  </span>

                  {trainee.redFlag ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300">
                      <AlertTriangle className="size-3 text-rose-600" />
                      রেড-ফ্ল্যাগ (নিষ্ক্রিয়)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                      <UserCheck className="size-3 text-emerald-600" />
                      সক্রিয়
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted font-ui">
                  <span className="font-ui text-sm sm:text-base text-brand-900 font-bold tabular-nums tracking-wide">মোবাইল: {toBengaliDigits(trainee.mobile)}</span>
                  <span>জেলা: {trainee.district || "বাংলাদেশ"}</span>
                  {trainee.mosqueName && <span>প্রতিষ্ঠান: {trainee.mosqueName}</span>}
                  <span className="text-amber-700 font-bold">
                    মোট পয়েন্ট: {toBengaliDigits(trainee.totalPoints)}
                  </span>
                </div>
              </div>

              {/* Right: Secret Rating & Call Action */}
              <div className="flex flex-wrap items-center gap-4 self-end md:self-center">
                {/* 1-5 Star interactive Rating */}
                <div className="flex flex-col items-center md:items-end">
                  <span className="text-[10px] text-muted font-ui mb-1 uppercase tracking-wider font-semibold">
                    গোপন মূল্যায়ন
                  </span>
                  <div className="flex items-center gap-1 bg-sand/30 px-2.5 py-1.5 rounded-xl border border-sand/60">
                    {[1, 2, 3, 4, 5].map(star => {
                      const isFilled = star <= trainee.internalStars;
                      return (
                        <button
                          key={star}
                          type="button"
                          disabled={ratingLoadingId === trainee.id}
                          onClick={() => handleRatingChange(trainee.id, star)}
                          className={`p-1 transition-transform hover:scale-125 cursor-pointer ${
                            ratingLoadingId === trainee.id ? "opacity-50" : ""
                          }`}
                          title={`${toBengaliDigits(star)} স্টার নির্ধারণ করুন`}
                        >
                          <Star
                            className={`size-4 sm:size-5 ${
                              isFilled
                                ? "fill-amber-500 text-amber-500"
                                : "text-sand hover:text-amber-400"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Call Log Modal Button */}
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalTrainee(trainee);
                    setClearRedFlag(trainee.redFlag);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-lime-400 via-lime-500 to-emerald-500 text-brand-950 font-ui text-xs font-bold hover:from-lime-300 hover:to-emerald-400 transition-all shadow-xs cursor-pointer"
                >
                  <PhoneCall className="size-3.5" />
                  <span>কল হিস্ট্রি ({toBengaliDigits(trainee.callLogs.length)})</span>
                </button>
              </div>
            </div>

            {/* Recent Call Log snippet if available */}
            {trainee.callLogs.length > 0 && (
              <div className="mt-3 pt-2.5 border-t border-sand/60 flex items-start gap-2 text-xs font-ui text-muted">
                <Clock className="size-3.5 text-brand-600 shrink-0 mt-0.5" />
                <p className="line-clamp-1">
                  <span className="font-semibold text-ink">সর্বশেষ কল:</span>{" "}
                  {trainee.callLogs[0].notes} (দ্বারা: {trainee.callLogs[0].callerName})
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Call Log & RedFlag Modal - Light Theme */}
      {activeModalTrainee && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn"
          onClick={() => setActiveModalTrainee(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-3xl border border-sand p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto text-ink"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-sand/60 pb-3">
              <div>
                <h3 className="font-ui text-base sm:text-lg font-bold text-ink">
                  প্রশাসনিক কল লগ ও ফলো-আপ
                </h3>
                <p className="text-xs text-muted font-ui mt-0.5">
                  {activeModalTrainee.name} ({toBengaliDigits(activeModalTrainee.mobile)})
                </p>
              </div>
              <button
                onClick={() => setActiveModalTrainee(null)}
                className="p-1.5 rounded-full text-muted hover:text-ink hover:bg-sand/40 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Add New Call Log Form */}
            <form onSubmit={handleSaveCallLog} className="space-y-4">
              <div>
                <label className="block text-xs font-ui text-ink/90 mb-1 font-bold">
                  কলকারী কর্মকর্তা:
                </label>
                <input
                  type="text"
                  value={callerName}
                  onChange={e => setCallerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-ivory/60 border border-sand text-ink text-xs font-ui focus:outline-none focus:border-brand-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-ui text-ink/90 mb-1 font-bold">
                  কলের ফলাফল:
                </label>
                <select
                  value={callOutcome}
                  onChange={e => setCallOutcome(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-ivory/60 border border-sand text-ink text-xs font-ui focus:outline-none focus:border-brand-600 focus:bg-white"
                >
                  <option value="CALL_COMPLETED">কল সফল (কথা হয়েছে ও সন্তোষজনক)</option>
                  <option value="REACHED">যোগাযোগ স্থাপিত (দিকনির্দেশনা প্রদান করা হয়েছে)</option>
                  <option value="UNREACHABLE">ফোন বন্ধ / রিং হয়ে কেটে গেছে</option>
                  <option value="FOLLOW_UP_REQUIRED">পুনরায় জরুরি ফলো-আপ আবশ্যক</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-ui text-ink/90 mb-1 font-bold">
                  কলের বিস্তারিত নোট বা মন্তব্য:
                </label>
                <textarea
                  rows={3}
                  value={callNotes}
                  onChange={e => setCallNotes(e.target.value)}
                  placeholder="প্রশিক্ষণার্থীর বর্তমান অবস্থা, মাঠপর্যায়ের কার্যক্রম ও ভবিষ্যৎ প্রতিশ্রুতি লিখুন..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-ivory/60 border border-sand text-ink placeholder:text-muted text-xs font-ui focus:outline-none focus:border-brand-600 focus:bg-white"
                  required
                />
              </div>

              {/* Red-Flag clear toggle */}
              {activeModalTrainee.redFlag && (
                <label className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={clearRedFlag}
                    onChange={e => setClearRedFlag(e.target.checked)}
                    className="size-4 accent-brand-600 rounded"
                  />
                  <span className="text-xs font-ui text-rose-900 font-semibold">
                    রেড-ফ্ল্যাগ প্রত্যাহার করুন (প্রশিক্ষণার্থীকে পুনরায় সক্রিয় হিসেবে চিহ্নিত করুন)
                  </span>
                </label>
              )}

              <button
                type="submit"
                disabled={isSubmittingLog || !callNotes.trim()}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-lime-400 via-lime-500 to-emerald-500 text-brand-950 font-ui text-sm font-bold hover:brightness-105 transition-all shadow-md shadow-lime-500/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="size-4 stroke-[2.5]" />
                {isSubmittingLog ? "সংরক্ষণ হচ্ছে..." : "কল লগ সংরক্ষণ করুন"}
              </button>
            </form>

            {/* Historical Call Logs */}
            <div className="pt-4 border-t border-sand/60 space-y-3">
              <h4 className="text-xs font-bold text-muted font-ui uppercase tracking-wider">
                পূর্ববর্তী কল হিস্ট্রি ({toBengaliDigits(activeModalTrainee.callLogs.length)}টি)
              </h4>

              {activeModalTrainee.callLogs.length === 0 ? (
                <p className="text-xs text-muted font-ui italic">
                  পূর্বে কোনো কল লগ রেকর্ড করা হয়নি।
                </p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {activeModalTrainee.callLogs.map(log => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-sand/30 border border-sand/60 text-xs font-ui space-y-1"
                    >
                      <div className="flex items-center justify-between text-[11px] text-muted">
                        <span className="font-semibold text-ink">{log.callerName}</span>
                        <span>{new Date(log.createdAt).toLocaleDateString("bn-BD")}</span>
                      </div>
                      <p className="text-ink leading-relaxed">{log.notes}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
