"use client";

import { useState, useEffect } from "react";
import {
  Search,
  CheckCircle2,
  Send,
  Eye,
  Loader2,
  ShieldCheck,
  CheckSquare,
  Square,
  MessageSquare,
} from "lucide-react";
import { messages } from "@/lib/messages";
import { ApplicationRecord, SmsDispatchLog } from "@/lib/applications";
import { ApplicationStatus } from "@prisma/client";
import { toBengaliDigits } from "@/lib/format";

export function ApplicationManagement() {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [smsLogs, setSmsLogs] = useState<SmsDispatchLog[]>([]);
  const [platformStats, setPlatformStats] = useState<{
    total: number;
    shortlisted: number;
    selected: number;
    waitlist: number;
    rejected: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [scoreFilter, setScoreFilter] = useState<string>("ALL");

  // Selection for bulk actions
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkProcessing, setBulkProcessing] = useState(false);

  // Modal for detail view
  const [detailApp, setDetailApp] = useState<ApplicationRecord | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<"APPLICATIONS" | "SMS_LOGS">("APPLICATIONS");

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        const params = new URLSearchParams();
        if (statusFilter !== "ALL") params.set("status", statusFilter);
        if (searchQuery.trim()) params.set("query", searchQuery.trim());
        if (scoreFilter === "HIGH") {
          params.set("minScore", "70");
        } else if (scoreFilter === "MID") {
          params.set("minScore", "50");
          params.set("maxScore", "69");
        } else if (scoreFilter === "LOW") {
          params.set("maxScore", "49");
        }

        const res = await fetch(`/api/admin/applications?${params.toString()}`);
        const data = await res.json();

        if (ignore) return;

        if (data.applications) {
          let list: ApplicationRecord[] = data.applications;
          if (scoreFilter === "LOW") {
            list = list.filter(a => (a.autoScreenResult?.score ?? 0) < 50);
          } else if (scoreFilter === "MID") {
            list = list.filter(
              a => (a.autoScreenResult?.score ?? 0) >= 50 && (a.autoScreenResult?.score ?? 0) < 70
            );
          }
          setApplications(list);
        }
        if (data.stats) {
          setPlatformStats(data.stats);
        }
        if (data.smsLogs) {
          setSmsLogs(data.smsLogs);
        }
      } catch (err) {
        console.error("Failed to load applications:", err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, [statusFilter, scoreFilter, searchQuery, refreshKey]);

  // Handle Search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRefreshKey(k => k + 1);
  };

  // Toggle selection
  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === applications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(applications.map(a => a.id));
    }
  };

  // Bulk status update
  const handleBulkAction = async (status: ApplicationStatus) => {
    if (selectedIds.length === 0) return;
    setBulkProcessing(true);

    try {
      const res = await fetch("/api/admin/applications/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: selectedIds, status }),
      });

      if (res.ok) {
        setSelectedIds([]);
        setRefreshKey(k => k + 1);
      }
    } catch (err) {
      console.error("Bulk action failed:", err);
    } finally {
      setBulkProcessing(false);
    }
  };

  // Single status update
  const handleSingleStatusUpdate = async (id: string, status: ApplicationStatus) => {
    try {
      const res = await fetch(`/api/admin/applications/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        if (detailApp && detailApp.id === id) {
          setDetailApp(prev => (prev ? { ...prev, status } : null));
        }
        setRefreshKey(k => k + 1);
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // Summary counts (use platformStats from API or derive from applications)
  const totalCount = platformStats?.total ?? applications.length;
  const shortlistedCount = platformStats?.shortlisted ?? applications.filter(a => a.status === ApplicationStatus.SHORTLISTED).length;
  const selectedCount = platformStats?.selected ?? applications.filter(a => a.status === ApplicationStatus.SELECTED).length;
  const waitlistCount = platformStats?.waitlist ?? applications.filter(a => a.status === ApplicationStatus.WAITLIST).length;
  const rejectedCount = platformStats?.rejected ?? applications.filter(a => a.status === ApplicationStatus.REJECTED).length;

  return (
    <div className="space-y-8">
      {/* Top Stats Counters */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="rounded-2xl border border-sand bg-white p-5 shadow-soft">
          <span className="block font-ui text-xs text-muted">{messages.admin.statsTotal}</span>
          <span className="font-display text-2xl sm:text-3xl font-bold text-ink">
            {toBengaliDigits(totalCount)}
          </span>
        </div>

        <div className="rounded-2xl border border-lime-500/30 bg-lime-50/70 p-5 shadow-soft">
          <span className="block font-ui text-xs text-brand-900 font-semibold">{messages.admin.statsShortlisted}</span>
          <span className="font-display text-2xl sm:text-3xl font-bold text-brand-950">
            {toBengaliDigits(shortlistedCount)}
          </span>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/70 p-5 shadow-soft">
          <span className="block font-ui text-xs text-emerald-900 font-semibold">{messages.admin.statsSelected}</span>
          <span className="font-display text-2xl sm:text-3xl font-bold text-emerald-950">
            {toBengaliDigits(selectedCount)}
          </span>
        </div>

        <div className="rounded-2xl border border-amber-500/30 bg-amber-50/70 p-5 shadow-soft">
          <span className="block font-ui text-xs text-amber-900 font-semibold">{messages.admin.statsWaitlist}</span>
          <span className="font-display text-2xl sm:text-3xl font-bold text-amber-950">
            {toBengaliDigits(waitlistCount)}
          </span>
        </div>

        <div className="rounded-2xl border border-red-500/20 bg-red-50/70 p-5 shadow-soft col-span-2 sm:col-span-1">
          <span className="block font-ui text-xs text-red-900 font-semibold">{messages.admin.statsRejected}</span>
          <span className="font-display text-2xl sm:text-3xl font-bold text-red-950">
            {toBengaliDigits(rejectedCount)}
          </span>
        </div>
      </div>

      {/* Tabs: Applications vs SMS Logs */}
      <div className="flex border-b border-sand gap-4">
        <button
          onClick={() => setActiveTab("APPLICATIONS")}
          className={`pb-3 font-ui text-sm font-bold transition border-b-2 cursor-pointer ${
            activeTab === "APPLICATIONS"
              ? "border-brand-900 text-brand-950"
              : "border-transparent text-muted hover:text-ink"
          }`}
        >
          আবেদন তালিকা ({toBengaliDigits(applications.length)})
        </button>

        <button
          onClick={() => setActiveTab("SMS_LOGS")}
          className={`pb-3 font-ui text-sm font-bold transition border-b-2 cursor-pointer flex items-center gap-1.5 ${
            activeTab === "SMS_LOGS"
              ? "border-brand-900 text-brand-950"
              : "border-transparent text-muted hover:text-ink"
          }`}
        >
          <MessageSquare className="size-4" />
          <span>এসএমএস প্রেরণ লগ ({toBengaliDigits(smsLogs.length)})</span>
        </button>
      </div>

      {activeTab === "APPLICATIONS" ? (
        <>
          {/* Controls: Search, Filters */}
          <div className="rounded-2xl border border-sand bg-white p-5 shadow-soft flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={messages.admin.filterSearchPlaceholder}
                className="w-full rounded-xl border border-sand bg-ivory/50 pl-10 pr-4 py-2.5 font-sans text-sm text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent-500"
                style={{ minHeight: "44px" }}
              />
            </form>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Status */}
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="rounded-xl border border-sand bg-ivory/50 px-3 py-2 font-ui text-xs font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-accent-500"
                style={{ minHeight: "44px" }}
              >
                <option value="ALL">{messages.admin.filterStatusAll}</option>
                <option value={ApplicationStatus.SHORTLISTED}>শর্টলিস্টেড</option>
                <option value={ApplicationStatus.SELECTED}>নির্বাচিত</option>
                <option value={ApplicationStatus.PENDING}>পর্যালোচনাধীন</option>
                <option value={ApplicationStatus.WAITLIST}>অপেক্ষমাণ</option>
                <option value={ApplicationStatus.REJECTED}>বাতিল</option>
              </select>

              {/* Score Filter */}
              <select
                value={scoreFilter}
                onChange={e => setScoreFilter(e.target.value)}
                className="rounded-xl border border-sand bg-ivory/50 px-3 py-2 font-ui text-xs font-semibold text-ink focus:outline-none focus:ring-2 focus:ring-accent-500"
                style={{ minHeight: "44px" }}
              >
                <option value="ALL">{messages.admin.filterScoreAll}</option>
                <option value="HIGH">{messages.admin.filterScoreHigh}</option>
                <option value="MID">{messages.admin.filterScoreMid}</option>
                <option value="LOW">{messages.admin.filterScoreLow}</option>
              </select>
            </div>
          </div>

          {/* Bulk Action Bar (when selected) */}
          {selectedIds.length > 0 && (
            <div className="sticky top-20 z-20 rounded-2xl border border-accent-500/50 bg-accent-100 p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 animate-in fade-in">
              <div className="flex items-center gap-2 font-ui text-sm font-bold text-brand-950">
                <CheckSquare className="size-5 text-accent-700" />
                <span>
                  {messages.admin.bulkSelectLabel} {toBengaliDigits(selectedIds.length)} টি
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={bulkProcessing}
                  onClick={() => handleBulkAction(ApplicationStatus.SELECTED)}
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-emerald-700 px-4 font-ui text-xs font-bold text-white hover:bg-emerald-800 transition disabled:opacity-50 cursor-pointer"
                >
                  <Send className="size-3.5" />
                  <span>{messages.admin.bulkActionSelect}</span>
                </button>

                <button
                  type="button"
                  disabled={bulkProcessing}
                  onClick={() => handleBulkAction(ApplicationStatus.SHORTLISTED)}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg bg-brand-800 px-4 font-ui text-xs font-bold text-ivory hover:bg-brand-900 transition disabled:opacity-50 cursor-pointer"
                >
                  {messages.admin.bulkActionShortlist}
                </button>

                <button
                  type="button"
                  disabled={bulkProcessing}
                  onClick={() => handleBulkAction(ApplicationStatus.REJECTED)}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg bg-red-700 px-3 font-ui text-xs font-bold text-white hover:bg-red-800 transition disabled:opacity-50 cursor-pointer"
                >
                  {messages.admin.bulkActionReject}
                </button>
              </div>
            </div>
          )}

          {/* Applications Data Table */}
          <div className="overflow-hidden rounded-2xl border border-sand bg-white shadow-soft">
            {loading ? (
              <div className="flex justify-center p-12">
                <Loader2 className="size-8 animate-spin text-brand-800" />
              </div>
            ) : applications.length === 0 ? (
              <div className="p-12 text-center text-muted font-sans">
                কোনো আবেদন পাওয়া যায়নি।
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-sans text-sm">
                  <thead className="bg-ivory/80 border-b border-sand text-xs font-ui text-muted uppercase">
                    <tr>
                      <th className="p-4 w-10">
                        <button
                          type="button"
                          onClick={selectAll}
                          className="cursor-pointer text-muted hover:text-ink"
                        >
                          {selectedIds.length === applications.length && applications.length > 0 ? (
                            <CheckSquare className="size-5 text-brand-700" />
                          ) : (
                            <Square className="size-5 text-muted" />
                          )}
                        </button>
                      </th>
                      <th className="p-4 font-semibold">{messages.admin.tableColApplicant}</th>
                      <th className="p-4 font-semibold">{messages.admin.tableColCategoryDistrict}</th>
                      <th className="p-4 font-semibold">{messages.admin.tableColScore}</th>
                      <th className="p-4 font-semibold">{messages.admin.tableColStatus}</th>
                      <th className="p-4 font-semibold text-right">{messages.admin.tableColActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-sand/70">
                    {applications.map(app => {
                      const isSelected = selectedIds.includes(app.id);
                      const score = app.autoScreenResult?.score ?? 0;
                      const isHighScore = score >= 70;
                      const isMidScore = score >= 50 && score < 70;

                      return (
                        <tr
                          key={app.id}
                          className={`hover:bg-ivory/40 transition-colors ${
                            isSelected ? "bg-accent-50/60" : ""
                          }`}
                        >
                          {/* Checkbox */}
                          <td className="p-4">
                            <button
                              type="button"
                              onClick={() => toggleSelect(app.id)}
                              className="cursor-pointer"
                            >
                              {isSelected ? (
                                <CheckSquare className="size-5 text-brand-700" />
                              ) : (
                                <Square className="size-5 text-muted" />
                              )}
                            </button>
                          </td>

                          {/* Applicant info */}
                          <td className="p-4">
                            <div className="font-bold text-brand-950 font-ui text-base">
                              {app.applicant.name}
                            </div>
                            <div className="font-mono text-xs text-muted flex items-center gap-1.5 mt-0.5">
                              <span>{app.applicant.mobile}</span>
                              <span>•</span>
                              <span className="text-accent-700 font-bold">{app.number}</span>
                            </div>
                            <div className="text-xs text-ink/70 mt-0.5">
                              {app.applicant.mosqueName}
                            </div>
                          </td>

                          {/* Category & District */}
                          <td className="p-4">
                            <span className="inline-block rounded-md bg-sand/60 px-2 py-0.5 text-xs font-ui font-medium text-brand-950">
                              {messages.applyPage.categories[app.applicant.category] || app.applicant.category}
                            </span>
                            <div className="text-xs text-muted mt-1">
                              {app.applicant.district}, {app.applicant.division}
                            </div>
                          </td>

                          {/* Auto Screening Score */}
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center justify-center font-mono font-bold text-sm rounded-lg px-2.5 py-1 ${
                                  isHighScore
                                    ? "bg-lime-100 text-brand-950 border border-lime-400"
                                    : isMidScore
                                    ? "bg-amber-100 text-amber-950 border border-amber-300"
                                    : "bg-red-50 text-red-800 border border-red-200"
                                }`}
                              >
                                {toBengaliDigits(score)} / ১০০
                              </span>
                            </div>
                            <span className="block text-xs text-muted font-ui mt-1">
                              {app.autoScreenResult?.recommendation === "SHORTLISTED"
                                ? "মনোনীত"
                                : app.autoScreenResult?.recommendation === "WAITLIST"
                                ? "অপেক্ষমাণ"
                                : "পর্যালোচনাধীন"}
                            </span>
                          </td>

                          {/* Status */}
                          <td className="p-4">
                            <span
                              className={`inline-block rounded-full px-3 py-1 font-ui text-xs font-bold ${
                                app.status === ApplicationStatus.SELECTED
                                  ? "bg-emerald-100 text-emerald-950 border border-emerald-400"
                                  : app.status === ApplicationStatus.SHORTLISTED
                                  ? "bg-lime-100 text-brand-950 border border-lime-400"
                                  : app.status === ApplicationStatus.REJECTED
                                  ? "bg-red-100 text-red-950 border border-red-300"
                                  : "bg-amber-100 text-amber-950 border border-amber-300"
                              }`}
                            >
                              {app.status === ApplicationStatus.SELECTED
                                ? "নির্বাচিত"
                                : app.status === ApplicationStatus.SHORTLISTED
                                ? "শর্টলিস্টেড"
                                : app.status === ApplicationStatus.REJECTED
                                ? "বাতিল"
                                : "পর্যালোচনাধীন"}
                            </span>
                          </td>

                          {/* Action Button */}
                          <td className="p-4 text-right">
                            <button
                              type="button"
                              onClick={() => setDetailApp(app)}
                              className="inline-flex min-h-9 items-center justify-center gap-1 rounded-lg border border-sand bg-ivory px-3 font-ui text-xs font-semibold text-brand-950 hover:bg-sand transition cursor-pointer"
                            >
                              <Eye className="size-3.5" />
                              <span>{messages.admin.viewDetails}</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      ) : (
        /* SMS DISPATCH LOGS TAB */
        <div className="rounded-2xl border border-sand bg-white p-6 shadow-soft">
          <h3 className="font-display text-lg font-bold text-ink mb-4 flex items-center gap-2">
            <MessageSquare className="size-5 text-accent-700" />
            <span>{messages.admin.smsLogTitle}</span>
          </h3>

          <div className="space-y-4">
            {smsLogs.length === 0 ? (
              <p className="text-sm text-muted font-sans">কোনো এসএমএস এখনও প্রেরণ করা হয়নি।</p>
            ) : (
              smsLogs.map(log => (
                <div
                  key={log.id}
                  className="rounded-xl border border-sand bg-ivory/50 p-4 font-sans text-sm text-ink space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-muted border-b border-sand pb-2 gap-1">
                    <span className="font-ui font-semibold text-brand-950">
                      প্রাপক: {log.recipientName} ({log.recipientMobile})
                    </span>
                    <span className="font-mono">
                      {new Date(log.sentAt).toLocaleTimeString("bn-BD", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-ink/90 leading-relaxed">
                    {log.body}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-ui font-semibold">
                    <CheckCircle2 className="size-3.5 text-emerald-600" />
                    <span>SSL Wireless Gateway: DELIVERED (200 OK)</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* APPLICANT DETAIL MODAL */}
      {detailApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-sand bg-white p-6 shadow-2xl sm:p-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-sand pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-accent-700">
                  {detailApp.number}
                </span>
                <h3 className="font-display text-xl font-bold text-ink">
                  {detailApp.applicant.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailApp(null)}
                className="grid size-10 place-items-center rounded-full hover:bg-sand/60 text-muted transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-6 space-y-6">
              {/* Auto Screening Engine Breakdown */}
              <div className="rounded-2xl border border-lime-400 bg-lime-50/70 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-5 text-accent-700" />
                    <h4 className="font-ui text-sm font-bold text-brand-950">
                      অটো-স্ক্রিনিং স্কোরিং বিশ্লেষণ
                    </h4>
                  </div>
                  <span className="font-mono text-lg font-black text-brand-950">
                    {toBengaliDigits(detailApp.autoScreenResult?.score ?? 0)} / ১০০
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-sans text-ink/80 pt-2 border-t border-lime-300">
                  <div className="bg-white/70 p-2 rounded-lg">
                    <span className="block text-muted">ক্যাটাগরি</span>
                    <strong className="font-mono text-brand-950">
                      {detailApp.autoScreenResult?.breakdown?.categoryScore ?? 0}
                    </strong>
                  </div>
                  <div className="bg-white/70 p-2 rounded-lg">
                    <span className="block text-muted">যোগ্যতা</span>
                    <strong className="font-mono text-brand-950">
                      {detailApp.autoScreenResult?.breakdown?.qualificationScore ?? 0}
                    </strong>
                  </div>
                  <div className="bg-white/70 p-2 rounded-lg">
                    <span className="block text-muted">অভিজ্ঞতা</span>
                    <strong className="font-mono text-brand-950">
                      {detailApp.autoScreenResult?.breakdown?.experienceScore ?? 0}
                    </strong>
                  </div>
                  <div className="bg-white/70 p-2 rounded-lg">
                    <span className="block text-muted">জেলা কোটা</span>
                    <strong className="font-mono text-brand-950">
                      {detailApp.autoScreenResult?.breakdown?.districtScore ?? 0}
                    </strong>
                  </div>
                </div>

                {/* Reasons */}
                {detailApp.autoScreenResult?.reasons && (
                  <ul className="list-disc list-inside text-xs font-sans text-brand-950 space-y-1 pt-2">
                    {detailApp.autoScreenResult.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Applicant Questionnaire Details */}
              <div className="rounded-xl border border-sand bg-ivory/50 p-5 space-y-3 font-sans text-sm">
                <h4 className="font-ui text-xs font-bold uppercase tracking-wider text-muted border-b border-sand pb-2">
                  ফর্মের তথ্য ও উত্তরসমূহ
                </h4>

                <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="block text-xs text-muted">মোবাইল নম্বর:</span>
                    <span className="font-mono font-bold text-ink">{detailApp.applicant.mobile}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-muted">পদবি / ক্যাটাগরি:</span>
                    <span>
                      {messages.applyPage.categories[detailApp.applicant.category] || detailApp.applicant.category}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-muted">মসজিদ / মাদরাসা:</span>
                    <span>{detailApp.applicant.mosqueName}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-muted">ঠিকানা:</span>
                    <span>
                      {detailApp.applicant.upazila ? `${detailApp.applicant.upazila}, ` : ""}
                      {detailApp.applicant.district}, {detailApp.applicant.division}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-sand/60 text-xs sm:text-sm space-y-2">
                  <div>
                    <span className="block text-xs text-muted">শিক্ষাগত যোগ্যতা:</span>
                    <span className="font-medium text-ink">
                      {String(detailApp.answers?.qualification || "দাওরায়ে হাদিস")}
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs text-muted">কাজের অভিজ্ঞতা:</span>
                    <span className="font-medium text-ink">
                      {String(detailApp.answers?.experienceYears || "৩ বছর")}
                    </span>
                  </div>
                  {Boolean(detailApp.answers?.motivation) && (
                    <div>
                      <span className="block text-xs text-muted">অংশগ্রহণের উদ্দেশ্য:</span>
                      <p className="mt-1 text-xs text-ink/90 italic bg-white p-3 rounded-lg border border-sand">
                        &quot;{String(detailApp.answers.motivation)}&quot;
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between border-t border-sand pt-4 gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSingleStatusUpdate(detailApp.id, ApplicationStatus.SELECTED)}
                  className="rounded-lg bg-emerald-700 px-4 py-2 font-ui text-xs font-bold text-white hover:bg-emerald-800 transition cursor-pointer"
                >
                  নির্বাচিত করুন (Send SMS)
                </button>

                <button
                  type="button"
                  onClick={() => handleSingleStatusUpdate(detailApp.id, ApplicationStatus.SHORTLISTED)}
                  className="rounded-lg bg-brand-800 px-3 py-2 font-ui text-xs font-bold text-ivory hover:bg-brand-900 transition cursor-pointer"
                >
                  শর্টলিস্ট করুন
                </button>

                <button
                  type="button"
                  onClick={() => handleSingleStatusUpdate(detailApp.id, ApplicationStatus.REJECTED)}
                  className="rounded-lg bg-red-700 px-3 py-2 font-ui text-xs font-bold text-white hover:bg-red-800 transition cursor-pointer"
                >
                  বাতিল করুন
                </button>
              </div>

              <button
                type="button"
                onClick={() => setDetailApp(null)}
                className="rounded-lg border border-sand px-4 py-2 font-ui text-xs font-semibold text-ink hover:bg-sand/60 transition cursor-pointer"
              >
                {messages.admin.closeModal}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
