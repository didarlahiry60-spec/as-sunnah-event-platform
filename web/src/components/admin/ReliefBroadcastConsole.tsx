"use client";

import { useState } from "react";
import {
  Radio,
  Send,
  PhoneCall,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw,
} from "lucide-react";
import { ReliefBroadcastSummary, DisasterType, DISASTER_TYPE_MAP } from "@/lib/relief";
import { toBengaliDigits } from "@/lib/format";
import { BD_DIVISIONS } from "@/lib/geo-data";

interface ReliefBroadcastConsoleProps {
  initialBroadcasts: ReliefBroadcastSummary[];
}

export function ReliefBroadcastConsole({ initialBroadcasts }: ReliefBroadcastConsoleProps) {
  const [broadcasts, setBroadcasts] = useState<ReliefBroadcastSummary[]>(initialBroadcasts);
  const [activeBroadcastId, setActiveBroadcastId] = useState<string>(
    initialBroadcasts[0]?.broadcastId || ""
  );

  // New broadcast form states
  const [targetDistrict, setTargetDistrict] = useState("ফেনী");
  const [disasterType, setDisasterType] = useState<DisasterType>("FLOOD");
  const [customMessage, setCustomMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [simulationLoadingPhone, setSimulationLoadingPhone] = useState<string | null>(null);

  // Extract all unique districts in Bangladesh
  const allDistricts = Array.from(
    new Set(BD_DIVISIONS.flatMap(div => div.districts.map(d => d.nameBn)))
  ).sort();

  const activeBroadcast =
    broadcasts.find(b => b.broadcastId === activeBroadcastId) || broadcasts[0];

  // Refresh active broadcast summary
  const refreshBroadcastSummary = async (broadcastId: string) => {
    try {
      const res = await fetch(`/api/admin/relief?broadcastId=${broadcastId}`);
      const data = await res.json();
      if (data.success && data.summary) {
        setBroadcasts(prev =>
          prev.map(b => (b.broadcastId === broadcastId ? data.summary : b))
        );
      }
    } catch (err) {
      console.error("Refresh broadcast error:", err);
    }
  };

  // Submit new relief broadcast
  const handleCreateBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetDistrict) return;

    setIsSending(true);
    try {
      const disasterConfig = DISASTER_TYPE_MAP[disasterType];
      const title = `${targetDistrict} ${disasterConfig.nameBn} জরুরি ত্রাণ সেল`;

      const res = await fetch("/api/admin/relief/broadcast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          district: targetDistrict,
          disasterType,
          message: customMessage || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "ব্রডকাস্ট সম্পন্ন করা যায়নি");
      }

      setBroadcasts(prev => [data.summary, ...prev]);
      setActiveBroadcastId(data.summary.broadcastId);
      setCustomMessage("");
    } catch (err) {
      console.error(err);
      alert("জরুরি ত্রাণ সেল চালু করতে সমস্যা হয়েছে।");
    } finally {
      setIsSending(false);
    }
  };

  // Simulate SMS response
  const handleSimulateResponse = async (
    broadcastId: string,
    phone: string,
    responseValue: string
  ) => {
    setSimulationLoadingPhone(phone);
    try {
      const res = await fetch("/api/admin/relief/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          broadcastId,
          traineePhone: phone,
          response: responseValue,
        }),
      });
      const data = await res.json();
      if (data.success && data.summary) {
        setBroadcasts(prev =>
          prev.map(b => (b.broadcastId === broadcastId ? data.summary : b))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSimulationLoadingPhone(null);
    }
  };

  return (
    <div className="space-y-8 text-ink">
      {/* Initiation Box - Light Clean Style */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-sand/80 shadow-soft">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-sand/60">
          <div className="p-2.5 rounded-2xl bg-red-50 text-red-600 border border-red-200">
            <Radio className="size-6 animate-pulse" />
          </div>
          <div>
            <h2 className="font-ui text-lg sm:text-xl font-bold text-ink">
              জরুরি ত্রাণ সেল চালু করুন (১-ক্লিক জেলাভিত্তিক এসএমএস ব্রডকাস্ট)
            </h2>
            <p className="text-xs sm:text-sm text-muted font-ui mt-0.5">
              আকস্মিক বন্যা বা দুর্যোগে নির্দিষ্ট জেলার সমস্ত ইমাম ও ভলান্টিয়ারদের জরুরি প্রস্তুতি এসএমএস তলব পাঠান
            </p>
          </div>
        </div>

        <form onSubmit={handleCreateBroadcast} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* District Picker */}
          <div>
            <label className="block text-xs font-ui text-ink/90 mb-1.5 font-bold">
              টার্গেট জেলা নির্বাচন করুন:
            </label>
            <select
              value={targetDistrict}
              onChange={e => setTargetDistrict(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-ivory/60 border border-sand text-ink text-sm font-ui focus:outline-none focus:border-brand-600 focus:bg-white transition-colors"
            >
              {allDistricts.map(d => (
                <option key={d} value={d}>
                  {d} জেলা
                </option>
              ))}
            </select>
          </div>

          {/* Disaster Type */}
          <div>
            <label className="block text-xs font-ui text-ink/90 mb-1.5 font-bold">
              দুর্যোগের ধরন:
            </label>
            <select
              value={disasterType}
              onChange={e => setDisasterType(e.target.value as DisasterType)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-ivory/60 border border-sand text-ink text-sm font-ui focus:outline-none focus:border-brand-600 focus:bg-white transition-colors"
            >
              <option value="FLOOD">আকস্মিক বন্যা (Flash Flood)</option>
              <option value="CYCLONE">ঘূর্ণিঝড় ও জলোচ্ছ্বাস</option>
              <option value="COLD_WAVE">তীব্র শৈত্যপ্রবাহ</option>
              <option value="OTHER">জরুরি দুর্যোগ</option>
            </select>
          </div>

          {/* Broadcast Action Button */}
          <div className="flex items-end">
            <button
              type="submit"
              disabled={isSending}
              className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-ui text-sm font-bold transition-all shadow-md shadow-red-600/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-11"
            >
              <Send className="size-4" />
              <span>{isSending ? "এসএমএস পাঠানো হচ্ছে..." : "জরুরি এসএমএস তলব পাঠান"}</span>
            </button>
          </div>

          {/* Message Preview */}
          <div className="md:col-span-3 pt-2">
            <p className="text-xs text-muted font-ui mb-1">
              স্বয়ংক্রিয় এসএমএস ফরম্যাট (প্রয়োজনে কাস্টমাইজ করতে পারেন):
            </p>
            <textarea
              rows={2}
              value={
                customMessage ||
                `[আস-সুন্নাহ জরুরি ত্রাণ সেল: আপনার এলাকায় ${DISASTER_TYPE_MAP[disasterType].urgencyBn} ত্রাণ কার্যক্রমে অংশ নিতে আপনি কি প্রস্তুত? ১ চাপুন: হ্যাঁ, প্রস্তুত / ২ চাপুন: না]`
              }
              onChange={e => setCustomMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-ivory/60 border border-sand text-xs font-ui text-ink focus:outline-none focus:border-brand-600 focus:bg-white transition-colors"
            />
          </div>
        </form>
      </div>

      {/* Active Broadcasts Selector */}
      {broadcasts.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          <span className="text-xs font-ui text-muted shrink-0 font-bold mr-1">
            ক্যাম্পেইন নির্বাচন:
          </span>
          {broadcasts.map(b => (
            <button
              key={b.broadcastId}
              type="button"
              onClick={() => setActiveBroadcastId(b.broadcastId)}
              className={`px-4 py-2 rounded-xl font-ui text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeBroadcast?.broadcastId === b.broadcastId
                  ? "bg-brand-950 text-lime-400 shadow-sm font-bold"
                  : "bg-white text-ink/80 hover:bg-sand/40 border border-sand/80 shadow-2xs"
              }`}
            >
              {b.district} ({toBengaliDigits(b.readyCount)} প্রস্তুত / {toBengaliDigits(b.totalSent)})
            </button>
          ))}
        </div>
      )}

      {/* Live Response Tracker Dashboard */}
      {activeBroadcast ? (
        <div className="space-y-6">
          {/* Tracker Stat Cards - Light Theme */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Total Mobilized */}
            <div className="p-5 rounded-2xl bg-white border border-sand/80 text-center shadow-2xs">
              <span className="text-xs text-muted font-ui font-medium">মোট তলবকৃত</span>
              <p className="text-2xl sm:text-3xl font-extrabold text-ink font-ui mt-1">
                {toBengaliDigits(activeBroadcast.totalSent)} জন
              </p>
            </div>

            {/* Ready Count */}
            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-center shadow-2xs">
              <span className="text-xs text-emerald-800 font-ui font-bold flex items-center justify-center gap-1">
                <CheckCircle2 className="size-3.5 text-emerald-600" /> হ্যাঁ, প্রস্তুত
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-ui mt-1">
                {toBengaliDigits(activeBroadcast.readyCount)} জন
              </p>
            </div>

            {/* Unavailable Count */}
            <div className="p-5 rounded-2xl bg-rose-50/80 border border-rose-200 text-center shadow-2xs">
              <span className="text-xs text-rose-800 font-ui font-bold flex items-center justify-center gap-1">
                <XCircle className="size-3.5 text-rose-600" /> না, অপারগ
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-rose-700 font-ui mt-1">
                {toBengaliDigits(activeBroadcast.unavailableCount)} জন
              </p>
            </div>

            {/* Pending Count */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-center shadow-2xs">
              <span className="text-xs text-amber-800 font-ui font-bold flex items-center justify-center gap-1">
                <Clock className="size-3.5 text-amber-600" /> উত্তরের অপেক্ষায়
              </span>
              <p className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-ui mt-1">
                {toBengaliDigits(activeBroadcast.pendingCount)} জন
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="p-5 rounded-2xl bg-white border border-sand/80 space-y-2 shadow-2xs">
            <div className="flex items-center justify-between text-xs font-ui text-ink/90 font-medium">
              <span>সাড়াদানের গতিপ্রকৃতি ও ফিল্ড রেডিনেস:</span>
              <span className="font-extrabold text-brand-800">
                {toBengaliDigits(activeBroadcast.readyRatePercent)}% প্রস্তুত
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-sand/60 overflow-hidden flex">
              <div
                style={{
                  width: `${
                    activeBroadcast.totalSent > 0
                      ? (activeBroadcast.readyCount / activeBroadcast.totalSent) * 100
                      : 0
                  }%`,
                }}
                className="bg-gradient-to-r from-lime-500 to-emerald-500 h-full transition-all duration-500"
              />
              <div
                style={{
                  width: `${
                    activeBroadcast.totalSent > 0
                      ? (activeBroadcast.unavailableCount / activeBroadcast.totalSent) * 100
                      : 0
                  }%`,
                }}
                className="bg-rose-400 h-full transition-all duration-500"
              />
            </div>
          </div>

          {/* Responses Table with Direct Actions - Light Theme */}
          <div className="rounded-3xl bg-white border border-sand/80 overflow-hidden shadow-soft">
            <div className="p-5 border-b border-sand/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-ui text-base sm:text-lg font-bold text-ink">
                  {activeBroadcast.title} — প্রশিক্ষণার্থী ও ভলান্টিয়ার তালিকা
                </h3>
                <p className="text-xs text-muted font-ui mt-0.5">
                  জেলা: {activeBroadcast.district} • সম্প্রচার:{" "}
                  {new Date(activeBroadcast.createdAt).toLocaleDateString("bn-BD")}
                </p>
              </div>

              <button
                type="button"
                onClick={() => refreshBroadcastSummary(activeBroadcast.broadcastId)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-sand/40 border border-sand/80 text-ink/80 hover:text-ink hover:bg-sand/70 text-xs font-ui font-semibold transition-colors cursor-pointer"
              >
                <RefreshCw className="size-3.5" />
                <span>রিফ্রেশ ট্যালি</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-ui text-sm text-ink/90">
                <thead className="bg-sand/30 text-ink/80 text-sm font-bold border-b border-sand/60">
                  <tr>
                    <th className="p-4">নাম ও প্রতিষ্ঠান</th>
                    <th className="p-4">মোবাইল নম্বর</th>
                    <th className="p-4">বর্তমান সাড়াদান</th>
                    <th className="p-4 text-right">সরাসরি যোগাযোগ ও সাড়াদান</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand/60">
                  {activeBroadcast.responses.map(resp => (
                    <tr
                      key={resp.personId}
                      className={`hover:bg-sand/20 transition-colors ${
                        resp.status === "READY"
                          ? "bg-emerald-50/40"
                          : resp.status === "UNAVAILABLE"
                          ? "bg-rose-50/40"
                          : ""
                      }`}
                    >
                      {/* Name */}
                      <td className="p-4">
                        <p className="font-bold text-ink text-base">{resp.traineeName}</p>
                        <p className="text-sm text-muted">
                          {resp.mosqueName || `${resp.district} জেলা`} • {resp.category}
                        </p>
                      </td>

                      {/* Phone */}
                      <td className="p-4 font-ui text-base font-bold tabular-nums tracking-wide text-brand-900">
                        {toBengaliDigits(resp.traineeMobile)}
                      </td>

                      {/* Status */}
                      <td className="p-3.5">
                        {resp.status === "READY" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                            <CheckCircle2 className="size-3.5 text-emerald-700" />
                            {resp.statusBn}
                          </span>
                        ) : resp.status === "UNAVAILABLE" ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-bold border border-rose-300">
                            <XCircle className="size-3.5 text-rose-700" />
                            {resp.statusBn}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sand/40 text-muted font-semibold border border-sand">
                            <Clock className="size-3.5" />
                            {resp.statusBn}
                          </span>
                        )}
                      </td>

                      {/* Action buttons */}
                      <td className="p-3.5 text-right">
                        <div className="inline-flex items-center gap-2">
                          {/* Direct Call Button */}
                          <a
                            href={`tel:${resp.traineeMobile}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sand/40 border border-sand text-ink hover:text-brand-900 hover:bg-sand/70 text-xs font-semibold transition-colors"
                          >
                            <PhoneCall className="size-3.5 text-brand-700" />
                            <span>কল দিন</span>
                          </a>

                          {/* Quick response test buttons */}
                          {resp.status === "PENDING" && (
                            <div className="inline-flex items-center gap-1">
                              <button
                                type="button"
                                disabled={simulationLoadingPhone === resp.traineeMobile}
                                onClick={() =>
                                  handleSimulateResponse(
                                    activeBroadcast.broadcastId,
                                    resp.traineeMobile,
                                    "১: হ্যাঁ, প্রস্তুত"
                                  )
                                }
                                className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-xs font-bold border border-emerald-200 cursor-pointer"
                                title="অনলাইন সাড়াদান (১)"
                              >
                                হ্যাঁ (১)
                              </button>
                              <button
                                type="button"
                                disabled={simulationLoadingPhone === resp.traineeMobile}
                                onClick={() =>
                                  handleSimulateResponse(
                                    activeBroadcast.broadcastId,
                                    resp.traineeMobile,
                                    "২: না"
                                  )
                                }
                                className="px-2.5 py-1 rounded-lg bg-rose-100 text-rose-800 hover:bg-rose-200 text-xs font-bold border border-rose-200 cursor-pointer"
                                title="অনলাইন সাড়াদান (২)"
                              >
                                না (২)
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-sand shadow-2xs">
          <p className="text-muted font-ui">কোনো ত্রাণ ব্রডকাস্ট পাওয়া যায়নি।</p>
        </div>
      )}
    </div>
  );
}
