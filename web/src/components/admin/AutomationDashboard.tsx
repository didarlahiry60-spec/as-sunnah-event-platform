"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Clock,
  Calendar,
  Bell,
  ShieldAlert,
  CheckCircle2,
  RotateCcw,
  FileText,
  Loader2,
  Check,
  AlertTriangle,
  Phone,
  Info,
} from "lucide-react";
import { messages } from "@/lib/messages";
import {
  JobDefinition,
  JobKey,
  ExecutionLog,
  RedFlaggedTrainee,
  AutomationSettings,
} from "@/lib/automation";
import { formatBengaliDate, toBengaliDigits } from "@/lib/format";

interface HijriInfo {
  day: number;
  dayBn: string;
  monthName: string;
  year: number;
  yearBn: string;
  formatted: string;
  offset: number;
}

interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  text: string;
}

export function AutomationDashboard() {
  const msg = messages.adminAutomation;

  const [jobs, setJobs] = useState<JobDefinition[]>([]);
  const [recentLogs, setRecentLogs] = useState<ExecutionLog[]>([]);
  const [settings, setSettings] = useState<AutomationSettings>({ hijriOffset: 0 });
  const [hijriInfo, setHijriInfo] = useState<HijriInfo | null>(null);
  const [redFlaggedTrainees, setRedFlaggedTrainees] = useState<RedFlaggedTrainee[]>([]);

  const [loading, setLoading] = useState(true);
  const [triggeringKey, setTriggeringKey] = useState<string | null>(null);
  const [savingOffset, setSavingOffset] = useState(false);
  const [markingCallId, setMarkingCallId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error" | "info", text: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const refreshDashboard = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/automation");
      if (!res.ok) throw new Error("Failed to load automation data");
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs || []);
        setRecentLogs(data.recentLogs || []);
        setSettings(data.settings || { hijriOffset: 0 });
        setHijriInfo(data.hijriInfo || null);
        setRedFlaggedTrainees(data.redFlaggedTrainees || []);
      }
    } catch (err) {
      console.error(err);
      addToast("error", "ফলো-আপ ডেটা লোড করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/admin/automation");
        if (!res.ok) throw new Error("Failed to load automation data");
        const data = await res.json();
        if (!cancelled && data.success) {
          setJobs(data.jobs || []);
          setRecentLogs(data.recentLogs || []);
          setSettings(data.settings || { hijriOffset: 0 });
          setHijriInfo(data.hijriInfo || null);
          setRedFlaggedTrainees(data.redFlaggedTrainees || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          addToast("error", "ফলো-আপ ডেটা লোড করতে সমস্যা হয়েছে।");
        }
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
  }, []);

  // 1-Click Run Now handler
  const handleRunNow = async (jobKey: JobKey) => {
    try {
      setTriggeringKey(jobKey);
      const res = await fetch("/api/admin/automation/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobKey }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "জব রান ব্যর্থ হয়েছে।");
      }

      addToast("success", `${msg.jobs[jobKey]?.title}: ${data.result?.summaryBn || msg.runSuccessToast}`);
      // Refresh state
      await refreshDashboard();
    } catch (err) {
      console.error(err);
      const text = err instanceof Error ? err.message : msg.runFailedToast;
      addToast("error", text);
    } finally {
      setTriggeringKey(null);
    }
  };

  // Offset change handler
  const handleOffsetChange = async (newOffset: number) => {
    try {
      setSavingOffset(true);
      const res = await fetch("/api/admin/automation/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hijriOffset: newOffset }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "অফসেট হালনাগাদ করা যায়নি।");
      }

      setSettings(data.settings);
      setHijriInfo(data.hijriInfo);
      addToast("success", msg.settingsSavedToast);
      // Refresh jobs next run with new offset
      await refreshDashboard();
    } catch (err) {
      console.error(err);
      const text = err instanceof Error ? err.message : "অফসেট সংরক্ষণে ব্যর্থ।";
      addToast("error", text);
    } finally {
      setSavingOffset(false);
    }
  };

  // Mark call completed
  const handleMarkCallDone = async (traineeId: string) => {
    try {
      setMarkingCallId(traineeId);
      const res = await fetch("/api/admin/automation/call", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personId: traineeId }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "কল সম্পন্ন হিসেবে চিহ্নিত করা যায়নি।");
      }

      addToast("success", "ফলো-আপ কল সম্পন্ন হয়েছে বলে রেকর্ড হালনাগাদ করা হলো।");
      setRedFlaggedTrainees(prev =>
        prev.map(t => (t.id === traineeId ? { ...t, callNeeded: false } : t))
      );
    } catch (err) {
      console.error(err);
      addToast("error", "কল স্ট্যাটাস সংরক্ষণ করা যায়নি।");
    } finally {
      setMarkingCallId(null);
    }
  };

  const getJobIcon = (key: JobKey) => {
    switch (key) {
      case "KHUTBAH_PUSH":
        return <FileText className="size-5 text-brand-700" />;
      case "AMAL_REMINDER":
        return <Bell className="size-5 text-accent-600" />;
      case "AYYAM_AL_BEED":
        return <Calendar className="size-5 text-emerald-700" />;
      case "MONTHLY_REPORT_REMINDER":
        return <RotateCcw className="size-5 text-amber-600" />;
      case "REDFLAG_SCAN":
        return <ShieldAlert className="size-5 text-rose-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="size-3.5" />
            {msg.statusLabels.SUCCESS}
          </span>
        );
      case "RUNNING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 animate-pulse">
            <Loader2 className="size-3.5 animate-spin" />
            {msg.statusLabels.RUNNING}
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-800 border border-rose-200">
            <AlertTriangle className="size-3.5" />
            {msg.statusLabels.FAILED}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sand/40 text-ink/75 border border-sand">
            <Clock className="size-3.5" />
            {msg.statusLabels.IDLE}
          </span>
        );
    }
  };

  if (loading && jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-ink">
        <Loader2 className="size-8 animate-spin text-brand-600 mb-4" />
        <p className="font-ui text-sm text-muted">ফলো-আপ সময়সূচি লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-ink">
      {/* Toast Notification Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-start gap-3 transition-all transform animate-in fade-in slide-in-from-bottom-2 duration-200 ${
              toast.type === "success"
                ? "bg-white border-emerald-400 text-emerald-950 shadow-emerald-500/10"
                : toast.type === "error"
                ? "bg-white border-rose-400 text-rose-950 shadow-rose-500/10"
                : "bg-white border-sand text-ink shadow-sand/20"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : toast.type === "error" ? (
              <AlertTriangle className="size-5 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <Info className="size-5 text-brand-600 shrink-0 mt-0.5" />
            )}
            <p className="font-sans text-xs sm:text-sm font-medium leading-relaxed">
              {toast.text}
            </p>
          </div>
        ))}
      </div>

      {/* Hijri Calendar & Moon-sighting Offset Card - Light Clean Style */}
      <section className="bg-white border border-sand/80 rounded-3xl p-6 sm:p-8 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-lime-100 px-3 py-1 text-xs font-ui font-bold text-brand-900 border border-lime-300">
              <Calendar className="size-3.5 text-brand-700" />
              <span>{msg.settingsSectionTitle}</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-ink">
              {msg.currentHijriDate}{" "}
              <span className="text-brand-700 underline decoration-lime-500 decoration-wavy underline-offset-4">
                {hijriInfo?.formatted || "গণনাধীন..."}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-muted font-sans">
              {msg.settingsSectionSubtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-sand/30 p-2 rounded-2xl border border-sand/60">
            {[
              { val: -1, label: msg.offsetOptions.minusOne },
              { val: 0, label: msg.offsetOptions.zero },
              { val: 1, label: msg.offsetOptions.plusOne },
            ].map(opt => {
              const active = settings.hijriOffset === opt.val;
              return (
                <button
                  key={opt.val}
                  type="button"
                  disabled={savingOffset}
                  onClick={() => handleOffsetChange(opt.val)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-ui font-bold transition-all cursor-pointer text-center ${
                    active
                      ? "bg-brand-950 text-lime-400 shadow-sm"
                      : "text-ink/80 hover:text-ink hover:bg-sand/60"
                  }`}
                >
                  {savingOffset && active ? (
                    <Loader2 className="size-3.5 animate-spin inline mr-1" />
                  ) : null}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Red Flag Inactivity Alert Box - Light Theme */}
      <section className="bg-rose-50/70 border border-rose-200 rounded-3xl p-6 sm:p-8 shadow-soft">
        <div className="flex items-start gap-4 mb-4">
          <div className="p-3 bg-rose-100 rounded-2xl border border-rose-300 text-rose-700 shrink-0">
            <ShieldAlert className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-lg sm:text-xl font-extrabold text-rose-950">
                {msg.redFlagSectionTitle}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-ui font-extrabold bg-rose-200 text-rose-900 border border-rose-300">
                {toBengaliDigits(redFlaggedTrainees.length)} জন
              </span>
            </div>
            <p className="text-xs sm:text-sm text-rose-800/80 font-sans mt-1">
              {msg.redFlagSectionSubtitle}
            </p>
          </div>
        </div>

        {redFlaggedTrainees.length === 0 ? (
          <div className="p-5 bg-white rounded-2xl border border-sand/60 text-center text-muted text-sm shadow-2xs">
            <CheckCircle2 className="size-5 text-emerald-600 mx-auto mb-1.5" />
            <p className="font-medium text-ink/80">{msg.noRedFlags}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-5">
            {redFlaggedTrainees.map(trainee => (
              <div
                key={trainee.id}
                className="bg-white border border-rose-200/90 rounded-2xl p-5 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-ui px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold border border-rose-200">
                      {toBengaliDigits(trainee.daysInactive)} {msg.daysInactive}
                    </span>
                    <span className="text-xs font-ui text-muted font-medium">
                      {trainee.category}
                    </span>
                  </div>
                  <h3 className="font-ui text-base font-bold text-ink">
                    {trainee.name}
                  </h3>
                  <p className="text-xs text-muted font-sans mt-0.5">
                    {trainee.mosqueName} • {trainee.district || "বাংলাদেশ"}
                  </p>
                  <p className="text-sm text-brand-900 font-ui font-bold tabular-nums tracking-wide mt-1.5">
                    {toBengaliDigits(trainee.mobile)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-sand/60 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${trainee.mobile}`}
                    className="inline-flex items-center gap-1.5 text-xs font-ui font-bold text-brand-700 hover:text-brand-900 transition-colors py-1.5 px-3 rounded-lg hover:bg-sand/40"
                  >
                    <Phone className="size-3.5 text-brand-600" />
                    <span>কল দিন</span>
                  </a>

                  {trainee.callNeeded ? (
                    <button
                      type="button"
                      disabled={markingCallId === trainee.id}
                      onClick={() => handleMarkCallDone(trainee.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-ui font-bold px-3 py-1.5 rounded-xl bg-sand/60 hover:bg-sand text-ink transition-colors cursor-pointer"
                    >
                      {markingCallId === trainee.id ? (
                        <Loader2 className="size-3 animate-spin" />
                      ) : (
                        <Check className="size-3.5 text-emerald-700" />
                      )}
                      <span>{msg.markCallDone}</span>
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-ui text-emerald-700 font-bold">
                      <CheckCircle2 className="size-3.5" />
                      <span>{msg.callCompleted}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 5 Core Scheduled Jobs Cards Grid - Light Theme */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-ink">
              {msg.jobsSectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-muted font-sans">
              {msg.jobsSectionSubtitle}
            </p>
          </div>
          <span className="font-ui text-xs text-brand-900 bg-lime-100 font-bold px-3.5 py-1.5 rounded-full border border-lime-300 w-fit">
            ৫টি স্বয়ংক্রিয় ব্যাকগ্রাউন্ড জব সক্রিয়
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => {
            const isTriggering = triggeringKey === job.key;

            return (
              <div
                key={job.key}
                className="bg-white border border-sand/80 rounded-3xl p-6 shadow-soft flex flex-col justify-between hover:border-lime-500/50 hover:shadow-md transition-all"
              >
                <div>
                  {/* Top Bar: Icon & Status Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="p-3 bg-sand/40 rounded-2xl border border-sand/60">
                      {getJobIcon(job.key)}
                    </div>
                    {getStatusBadge(job.lastStatus)}
                  </div>

                  {/* Title & Bengali Description */}
                  <h3 className="font-display text-lg font-bold text-ink leading-snug">
                    {job.titleBn}
                  </h3>
                  <p className="text-xs text-muted font-sans mt-2 line-clamp-2 leading-relaxed">
                    {job.descriptionBn}
                  </p>

                  {/* Schedule Details */}
                  <div className="mt-5 pt-3 border-t border-sand/60 space-y-2 text-xs font-ui">
                    <div className="flex items-center justify-between text-muted">
                      <span>{msg.scheduleLabel}</span>
                      <span className="font-bold text-brand-800">
                        {job.scheduleBn}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-muted">
                      <span>{msg.nextRunLabel}</span>
                      <span className="font-semibold text-ink">
                        {job.nextRunBn || "গণনাধীন"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-muted">
                      <span>{msg.lastRunLabel}</span>
                      <span className="text-ink/80 font-mono">
                        {job.lastRunAt
                          ? formatBengaliDate(job.lastRunAt, {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              timeZone: "Asia/Dhaka",
                            })
                          : msg.neverRun}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 1-Click Run Now Button */}
                <div className="mt-6 pt-4 border-t border-sand/60">
                  <button
                    type="button"
                    disabled={isTriggering}
                    onClick={() => handleRunNow(job.key)}
                    className="w-full min-h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-400 via-lime-500 to-emerald-500 hover:from-lime-300 hover:to-emerald-400 text-brand-950 font-ui text-xs sm:text-sm font-extrabold shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isTriggering ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        <span>{msg.runningButton}</span>
                      </>
                    ) : (
                      <>
                        <RotateCcw className="size-4 stroke-[2.5]" />
                        <span>{msg.runNowButton}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Execution History Logs - Light Theme */}
      <section className="bg-white border border-sand/80 rounded-3xl p-6 sm:p-8 shadow-soft">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-ink">
              {msg.logsSectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-muted font-sans">
              {msg.logsSectionSubtitle}
            </p>
          </div>
          <span className="text-xs font-ui text-muted font-medium">
            সর্বশেষ {toBengaliDigits(recentLogs.length)} টি রেকর্ড
          </span>
        </div>

        {recentLogs.length === 0 ? (
          <div className="py-8 text-center text-muted text-sm">
            {msg.emptyLogs}
          </div>
        ) : (
          <div className="divide-y divide-sand/60">
            {recentLogs.map(log => (
              <div
                key={log.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-ui font-bold text-ink">
                      {log.jobTitleBn}
                    </span>
                    {getStatusBadge(log.status)}
                    <span className="px-2 py-0.5 rounded bg-sand/40 text-ink/70 font-mono text-[11px]">
                      {log.id}
                    </span>
                  </div>
                  <p className="text-muted font-sans">{log.payloadSummary}</p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center text-muted font-ui text-[11px] shrink-0">
                  <span className="text-brand-800 font-bold">
                    গ্রাহক: {toBengaliDigits(log.recipientCount)} জন
                  </span>
                  <span>
                    {formatBengaliDate(log.completedAt, {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      timeZone: "Asia/Dhaka",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
