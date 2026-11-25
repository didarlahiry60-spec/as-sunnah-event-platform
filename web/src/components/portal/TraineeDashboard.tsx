"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Award,
  BookOpen,
  Video,
  LogOut,
  CheckCircle2,
  Download,
  FileText,
  Radio,
  Star,
  MapPin,
  Building2,
  ClipboardCheck,
  Plus,
  X,
} from "lucide-react";
import { TraineeProfile, OnlineClassItem } from "@/lib/trainee";
import { SubmissionRecord } from "@/lib/submissions";
import { CertificateCard } from "@/components/portal/CertificateCard";
import { SubmissionForm } from "@/components/portal/SubmissionForm";
import { SubmissionsList } from "@/components/portal/SubmissionsList";
import { messages } from "@/lib/messages";
import { formatBengaliNumber } from "@/lib/format";

interface TraineeDashboardProps {
  initialProfile: TraineeProfile;
  initialSubmissions?: SubmissionRecord[];
  initialTab?: string;
}

export function TraineeDashboard({
  initialProfile,
  initialSubmissions = [],
  initialTab,
}: TraineeDashboardProps) {
  const router = useRouter();
  const msg = messages.portal;

  const getInitialTab = (): "OVERVIEW" | "SUBMISSIONS" | "MATERIALS" | "CLASSES" | "CERTIFICATES" => {
    const t = (initialTab || "").toLowerCase();
    if (t === "classes" || t === "class") return "CLASSES";
    if (t === "materials" || t === "khutbah") return "MATERIALS";
    if (t === "submissions" || t === "reports" || t === "report" || t === "relief") return "SUBMISSIONS";
    if (t === "certificates") return "CERTIFICATES";
    return "OVERVIEW";
  };

  const [profile, setProfile] = useState<TraineeProfile>(initialProfile);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>(initialSubmissions);
  const [activeTab, setActiveTab] = useState<
    "OVERVIEW" | "SUBMISSIONS" | "MATERIALS" | "CLASSES" | "CERTIFICATES"
  >(getInitialTab);
  const [showNewSubmissionModal, setShowNewSubmissionModal] = useState(false);
  const [materialFilter, setMaterialFilter] = useState<string>(
    initialTab?.toLowerCase() === "khutbah" ? "KHUTBAH" : "ALL"
  );
  const [attendingClassId, setAttendingClassId] = useState<string | null>(null);
  const [attendanceNotice, setAttendanceNotice] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  // Refresh submissions from server
  const refreshSubmissions = async () => {
    try {
      const res = await fetch("/api/portal/submissions");
      const data = await res.json();
      if (res.ok && data.success) {
        setSubmissions(data.submissions || []);
      }
    } catch {
      // offline / quiet fallback
    }
  };

  // Logout handler
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/portal/login");
      router.refresh();
    } catch {
      router.push("/portal/login");
    }
  };

  // Class Attendance & Points Award handler
  const handleAttendClass = async (cls: OnlineClassItem) => {
    setAttendingClassId(cls.id);
    setAttendanceNotice(null);

    try {
      const res = await fetch("/api/portal/classes/attend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classId: cls.id }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Update local points & attendance status immediately
        setProfile(prev => ({
          ...prev,
          totalPoints: data.newTotalPoints,
          onlineClasses: prev.onlineClasses.map(c =>
            c.id === cls.id ? { ...c, hasAttended: true } : c
          ),
        }));

        setAttendanceNotice(
          data.alreadyAttended
            ? "আপনার উপস্থিতি ইতিপূর্বেই রেকর্ড করা হয়েছে।"
            : "আলহামদুলিল্লাহ! আপনার উপস্থিতি রেকর্ড হয়েছে এবং ২০ পয়েন্ট যুক্ত হয়েছে।"
        );

        // Open meeting in new window
        window.open(cls.meetingUrl, "_blank");
      }
    } catch {
      // Still open link if network glitch
      window.open(cls.meetingUrl, "_blank");
    } finally {
      setAttendingClassId(null);
    }
  };

  // Filter materials
  const filteredMaterials = profile.materials.filter(m => {
    if (materialFilter === "ALL") return true;
    if (materialFilter === "SYLLABUS") return m.kind === "SYLLABUS";
    if (materialFilter === "SLIDES") return m.kind === "SLIDES";
    if (materialFilter === "BOOK_PDF") return m.kind === "BOOK_PDF";
    if (materialFilter === "VIDEO_LECTURE") return m.kind === "VIDEO_LECTURE";
    return true;
  });

  return (
    <div className="min-h-screen bg-ivory pb-20">
      {/* Top Bar with Brand & Trainee Info */}
      <header className="sticky top-0 z-30 border-b border-sand bg-white/90 backdrop-blur-md px-4 py-3 sm:px-8 print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/" className="font-display text-lg font-bold text-brand-950 sm:text-xl">
              আস-সুন্নাহ <span className="text-lime-600">পোর্টাল</span>
            </Link>
            <span className="hidden sm:inline-block h-4 w-px bg-sand" />
            <span className="hidden sm:inline-block font-ui text-xs text-muted">
              {msg.badge}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Total Points Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-lime-500/40 bg-lime-100/80 px-3 py-1 font-ui text-xs font-bold text-brand-950 shadow-xs">
              <Star className="size-3.5 fill-accent-500 text-accent-500" />
              <span>{formatBengaliNumber(profile.totalPoints)} {msg.pointsBadge}</span>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1.5 font-ui text-xs font-bold text-red-700 transition-all cursor-pointer shadow-2xs"
            >
              <LogOut className="size-3.5" />
              <span>{msg.logoutButton}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Trainee Unified Single Profile Banner - Luxury Islamic Executive Card */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-ivory pt-8 pb-12 px-5 print:hidden border-b border-lime-500/20 shadow-xl">
        {/* Subtle Ambient Radial Lighting */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_20%,rgba(141,198,63,0.15),transparent_60%),radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(240,146,43,0.12),transparent_60%)]" />

        {/* 8-fold Geometric Lattice Watermark */}
        <svg className="pointer-events-none absolute inset-0 size-full opacity-6" aria-hidden="true">
          <defs>
            <pattern id="trainee-lattice" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect x="15" y="15" width="30" height="30" fill="none" stroke="#8DC63F" strokeWidth="1" />
              <rect x="15" y="15" width="30" height="30" fill="none" stroke="#8DC63F" strokeWidth="1" transform="rotate(45 30 30)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#trainee-lattice)" />
        </svg>

        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="relative flex size-16 sm:size-18 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-850 to-brand-950 border-2 border-lime-400/50 text-lime-400 shadow-xl ring-4 ring-lime-500/10">
                <User className="size-8 sm:size-9" />
                <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full bg-lime-500 text-brand-950 shadow-md">
                  <CheckCircle2 className="size-4 stroke-[3]" />
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl text-ivory drop-shadow-sm">
                    {profile.name}
                  </h1>
                  <span className="rounded-full bg-gradient-to-r from-lime-500/25 to-emerald-500/20 px-3 py-1 font-ui text-xs font-bold text-lime-300 border border-lime-400/40 shadow-xs">
                    {profile.category === "IMAM" ? "ইমাম ও খতিব" : "মাদরাসা শিক্ষক"}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-ivory/85 font-ui">
                  <span className="inline-flex items-center gap-1.5 bg-brand-900/70 border border-white/10 px-2.5 py-0.5 rounded-lg">
                    <Building2 className="size-3.5 text-lime-400 shrink-0" />
                    <span>{profile.mosqueName || "আস-সুন্নাহ প্রশিক্ষণার্থী"}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-brand-900/70 border border-white/10 px-2.5 py-0.5 rounded-lg">
                    <MapPin className="size-3.5 text-accent-400 shrink-0" />
                    <span>{profile.district || "বাংলাদেশ"}</span>
                  </span>
                  <span className="text-lime-300 font-mono font-semibold tracking-wide bg-brand-900/70 border border-white/10 px-2.5 py-0.5 rounded-lg">
                    {formatBengaliNumber(profile.mobile)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Points & Community Card */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
              <div className="flex-1 sm:flex-none rounded-2xl border-2 border-accent-400/40 bg-gradient-to-br from-brand-900/90 via-brand-950 to-brand-900 p-4 sm:px-6 shadow-xl shadow-brand-950/80 backdrop-blur-xs text-left sm:text-right ring-1 ring-accent-400/20">
                <span className="flex items-center sm:justify-end gap-1.5 font-ui text-xs font-semibold text-accent-300">
                  <Star className="size-3.5 fill-accent-400 text-accent-400" />
                  <span>{msg.pointsLabel}</span>
                </span>
                <span className="block font-display text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-lime-300 to-emerald-300 mt-0.5">
                  {formatBengaliNumber(profile.totalPoints)}
                </span>
                <span className="block text-[11px] text-ivory/70 mt-0.5">
                  ক্লাস উপস্থিতি ও কার্যক্রমে অর্জিত
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-First Navigation Tabs (One-Thumb Simple 48px targets) */}
      <div className="sticky top-[57px] z-20 border-b border-sand bg-white/95 backdrop-blur-md shadow-xs print:hidden">
        <div className="mx-auto max-w-5xl px-3 sm:px-5">
          <nav className="flex space-x-1.5 sm:space-x-3 overflow-x-auto no-scrollbar py-2.5" aria-label="Portal Tabs">
            {[
              { id: "OVERVIEW", label: msg.tabOverview, icon: BookOpen },
              { id: "SUBMISSIONS", label: msg.tabSubmissions || "মাঠপর্যায়ের কার্যক্রম", icon: ClipboardCheck },
              { id: "MATERIALS", label: msg.tabMaterials, icon: FileText },
              { id: "CLASSES", label: msg.tabOnlineClasses, icon: Radio },
              { id: "CERTIFICATES", label: msg.tabCertificates, icon: Award },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex min-h-12 items-center gap-2 rounded-2xl px-4 py-2 font-ui text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-ivory border border-lime-500/40 shadow-sm shadow-brand-950/20"
                      : "text-muted hover:bg-sand/60 hover:text-brand-950"
                  }`}
                >
                  <Icon className={`size-4 ${isActive ? "text-lime-400" : "text-muted"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Tab Content */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-6">
        {/* Attendance Notification Banner */}
        {attendanceNotice && (
          <div className="mb-6 flex items-center justify-between rounded-2xl border border-success/30 bg-success/10 p-4 text-xs sm:text-sm text-success font-ui shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="size-5 shrink-0" />
              <span>{attendanceNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setAttendanceNotice(null)}
              className="text-xs font-bold underline cursor-pointer"
            >
              ঠিক আছে
            </button>
          </div>
        )}

        {/* TAB 1: OVERVIEW & ENROLLED COURSES */}
        {activeTab === "OVERVIEW" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                {msg.enrolledCoursesTitle}
              </h2>
              <p className="font-sans text-xs text-muted sm:text-sm mt-0.5">
                আপনার সক্রিয় ও সমাপ্তকৃত কোর্সগুলোর তালিকা ও বর্তমান অবস্থা।
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {profile.enrolledCourses.map(course => (
                <div
                  key={course.id}
                  className="flex flex-col justify-between rounded-3xl border border-sand/80 bg-white p-6 sm:p-7 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-lime-500/40"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-brand-900/10 px-3 py-1 font-ui text-[11px] font-bold text-brand-900 border border-brand-900/10">
                        {course.type}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 font-ui text-[11px] font-bold ${
                          course.status === "COMPLETED"
                            ? "bg-emerald-50 text-emerald-800 border border-emerald-200/80"
                            : "bg-amber-50 text-amber-800 border border-amber-200/80"
                        }`}
                      >
                        {course.status === "COMPLETED" ? msg.courseCompleted : msg.courseOngoing}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-base font-bold text-brand-950 sm:text-lg leading-snug">
                      {course.title}
                    </h3>

                    <div className="mt-3 space-y-1.5 text-xs text-muted font-ui">
                      <p className="flex items-center gap-1.5">
                        <span className="font-semibold text-ink/80">{msg.courseDuration}</span> {course.startsAt} — {course.endsAt}
                      </p>
                      <p className="flex items-center gap-1.5">
                        <span className="font-semibold text-ink/80">{msg.courseVenue}</span> {course.venue}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-5">
                      <div className="flex justify-between text-xs font-ui mb-1.5">
                        <span className="text-muted font-medium">{msg.courseProgress}</span>
                        <span className="font-bold text-brand-950">{formatBengaliNumber(course.progressPercent)}%</span>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-sand/80 overflow-hidden p-0.5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-lime-500 via-lime-400 to-emerald-500 transition-all duration-500 shadow-2xs"
                          style={{ width: `${course.progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Course Action Buttons */}
                  <div className="mt-6 flex flex-wrap items-center gap-2.5 pt-4 border-t border-sand">
                    {course.certificateNo ? (
                      <button
                        type="button"
                        onClick={() => setActiveTab("CERTIFICATES")}
                        className="flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-5 font-ui text-xs font-extrabold text-brand-950 shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <Award className="size-4" />
                        <span>ডিজিটাল সনদ দেখুন</span>
                      </button>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => setActiveTab("MATERIALS")}
                      className="flex min-h-11 items-center gap-2 rounded-full border border-sand/90 bg-ivory/80 px-5 font-ui text-xs font-bold text-brand-900 hover:bg-sand/60 hover:border-brand-600/40 active:scale-95 transition-all cursor-pointer"
                    >
                      <BookOpen className="size-4 text-brand-600" />
                      <span>পাঠ্যসামগ্রী</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Field Submissions Quick Summary Banner */}
            <div className="mt-8 rounded-3xl border border-sand/80 bg-white p-6 sm:p-7 shadow-soft transition-all hover:shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-900 to-brand-950 border border-lime-500/40 text-lime-400 shadow-md">
                    <ClipboardCheck className="size-7" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-brand-950">
                      মাঠপর্যায়ের কার্যক্রম ও আমল ট্র্যাকার
                    </h3>
                    <p className="text-xs sm:text-sm text-muted font-sans mt-0.5">
                      খুতবা, পরিচ্ছন্নতা, হালাকা ও সমাজসেবার ছবি জমা দিন এবং পয়েন্ট অর্জন করুন।
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-ui">
                      <span className="rounded-full bg-sand/60 px-3 py-1 text-brand-950 font-bold">
                        মোট কার্যক্রম: {formatBengaliNumber(submissions.length)}টি
                      </span>
                      <span className="rounded-full bg-emerald-50 text-emerald-800 px-3 py-1 font-bold border border-emerald-200">
                        অনুমোদিত: {formatBengaliNumber(submissions.filter(s => s.status === "APPROVED").length)}টি
                      </span>
                      {submissions.filter(s => s.status === "PENDING").length > 0 && (
                        <span className="rounded-full bg-amber-50 text-amber-800 px-3 py-1 font-bold border border-amber-200">
                          পর্যালোচনায়: {formatBengaliNumber(submissions.filter(s => s.status === "PENDING").length)}টি
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setShowNewSubmissionModal(true)}
                    className="min-h-11 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-2.5 font-ui text-xs sm:text-sm font-bold text-brand-950 shadow-md hover:from-accent-400 hover:to-accent-500 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                  >
                    <Plus className="size-4 stroke-[2.5]" />
                    <span>নতুন কার্যক্রম জমা</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("SUBMISSIONS")}
                    className="min-h-11 inline-flex items-center gap-1.5 rounded-full border border-sand bg-ivory px-5 py-2.5 font-ui text-xs sm:text-sm font-bold text-brand-950 hover:bg-sand/50 transition-colors cursor-pointer"
                  >
                    <span>সকল দেখুন</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: FIELD SUBMISSIONS */}
        {activeTab === "SUBMISSIONS" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {msg.submissionsTitle || "মাঠপর্যায়ের কার্যক্রম ও রিপোর্ট"}
                </h2>
                <p className="font-sans text-xs text-muted sm:text-sm mt-0.5">
                  {msg.submissionsSubtitle || "খুতবা, পরিচ্ছন্নতা, হালাকা ও সমাজসেবার ছবি জমা দিয়ে পয়েন্ট অর্জন করুন।"}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewSubmissionModal(true)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-2.5 font-ui text-sm font-bold text-brand-950 shadow-md hover:from-accent-400 hover:to-accent-500 transition-all cursor-pointer"
                >
                  <Plus className="size-4" />
                  <span>নতুন কার্যক্রম জমা দিন</span>
                </button>
              </div>
            </div>

            <SubmissionsList
              submissions={submissions}
              onOpenNewSubmission={() => setShowNewSubmissionModal(true)}
            />
          </div>
        )}

        {/* TAB 2: COURSE MATERIALS HUB */}
        {activeTab === "MATERIALS" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                  {msg.materialsTitle}
                </h2>
                <p className="font-sans text-xs text-muted sm:text-sm mt-0.5">
                  সিলেবাস, উপস্থাপনা স্লাইড, ফিকহি রেফারেন্স বই ও ভিডিও লেকচার।
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "ALL", label: msg.materialsFilterAll },
                  { id: "SYLLABUS", label: msg.materialsFilterSyllabus },
                  { id: "SLIDES", label: msg.materialsFilterSlides },
                  { id: "BOOK_PDF", label: msg.materialsFilterBooks },
                  { id: "VIDEO_LECTURE", label: msg.materialsFilterVideos },
                ].map(filter => (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setMaterialFilter(filter.id)}
                    className={`min-h-9 rounded-full px-3 py-1 font-ui text-xs font-semibold transition-all cursor-pointer ${
                      materialFilter === filter.id
                        ? "bg-brand-900 text-ivory"
                        : "bg-white border border-sand text-muted hover:text-ink"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Materials Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {filteredMaterials.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-3xl border border-sand bg-white p-5 sm:p-6 shadow-soft"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-lime-100 px-2.5 py-0.5 font-ui text-[11px] font-semibold text-brand-900 border border-lime-300">
                        {item.kind === "SYLLABUS"
                          ? "সিলেবাস"
                          : item.kind === "SLIDES"
                          ? "উপস্থাপনা স্লাইড"
                          : item.kind === "BOOK_PDF"
                          ? "রেফারেন্স বই"
                          : "ভিডিও লেকচার"}
                      </span>
                      {item.fileSize && (
                        <span className="text-[11px] font-mono text-muted">
                          {item.fileSize}
                        </span>
                      )}
                      {item.duration && (
                        <span className="text-[11px] font-ui text-muted">
                          {item.duration}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-3 font-display text-base font-bold text-brand-950 sm:text-lg">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 font-sans text-xs text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between pt-4 border-t border-sand">
                    <span className="font-ui text-[11px] text-muted">
                      প্রকাশ: {item.publishedAt}
                    </span>

                    {item.kind === "VIDEO_LECTURE" ? (
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex min-h-10 items-center gap-1.5 rounded-full border border-sand bg-brand-950 text-ivory px-4 font-ui text-xs font-bold shadow-xs hover:bg-brand-900 cursor-pointer"
                      >
                        <Video className="size-3.5 text-lime-400" />
                        <span>{msg.watchButton}</span>
                      </a>
                    ) : (
                      <a
                        href={item.fileUrl}
                        download
                        className="flex min-h-10 items-center gap-1.5 rounded-full accent-foil-bg px-4 font-ui text-xs font-bold text-brand-950 shadow-xs hover:brightness-110 cursor-pointer"
                      >
                        <Download className="size-3.5" />
                        <span>{msg.downloadButton}</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ONLINE CLASSES & ATTENDANCE */}
        {activeTab === "CLASSES" && (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-lime-500/40 bg-lime-100/80 px-3 py-1 font-ui text-xs font-bold text-brand-950">
                <Radio className="size-3.5 text-danger animate-pulse" />
                <span>{msg.onlineClassBadge}</span>
              </div>
              <h2 className="mt-2 font-display text-xl font-bold text-ink sm:text-2xl">
                {msg.onlineClassTitle}
              </h2>
              <p className="font-sans text-xs text-muted sm:text-sm mt-0.5">
                জুম বা গুগল মিটে সরাসরি ক্লাসে যুক্ত হয়ে প্রশ্ন করুন ও ক্লাসে উপস্থিতির জন্য ২০ পয়েন্ট অর্জন করুন।
              </p>
            </div>

            <div className="grid gap-4">
              {profile.onlineClasses.map(cls => (
                <div
                  key={cls.id}
                  className="rounded-3xl border border-sand bg-white p-6 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-5"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-brand-900/10 px-2.5 py-0.5 font-ui text-[11px] font-semibold text-brand-900">
                        {cls.platform === "ZOOM" ? "Zoom Live Class" : "Google Meet Live"}
                      </span>
                      {cls.hasAttended && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-0.5 font-ui text-[11px] font-bold text-success">
                          <CheckCircle2 className="size-3" />
                          <span>উপস্থিতি সম্পন্ন (+২০ পয়েন্ট)</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-lg font-bold text-brand-950">
                      {cls.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted font-ui">
                      <p>
                        <span className="font-medium text-ink">{msg.instructorLabel}</span> {cls.instructor}
                      </p>
                      <p>
                        <span className="font-medium text-ink">{msg.classSchedule}</span> {cls.startsAt}
                      </p>
                    </div>
                  </div>

                  {/* Attendance & Join Button */}
                  <div className="shrink-0">
                    <button
                      type="button"
                      onClick={() => handleAttendClass(cls)}
                      disabled={attendingClassId === cls.id}
                      className="flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full accent-foil-bg px-6 font-ui text-sm font-bold text-brand-950 shadow-md hover:brightness-110 cursor-pointer disabled:opacity-50"
                    >
                      <Radio className="size-4" />
                      <span>
                        {attendingClassId === cls.id
                          ? "হাজিরা রেকর্ড হচ্ছে..."
                          : cls.hasAttended
                          ? "পুনরায় ক্লাসে প্রবেশ করুন"
                          : msg.joinClassButton}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DIGITAL CERTIFICATES HUB */}
        {activeTab === "CERTIFICATES" && (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                {messages.certificates.pageTitle}
              </h2>
              <p className="font-sans text-xs text-muted sm:text-sm mt-0.5">
                {messages.certificates.pageSubtitle}
              </p>
            </div>

            {profile.certificates.length > 0 ? (
              <div className="space-y-8">
                {profile.certificates.map(cert => (
                  <CertificateCard key={cert.certificateNo} certificate={cert} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-sand bg-white p-8 text-center shadow-soft">
                <Award className="mx-auto size-12 text-muted/60" />
                <h3 className="mt-3 font-display text-lg font-bold text-ink">
                  {msg.noCertificatesTitle}
                </h3>
                <p className="mt-1 text-xs text-muted font-sans max-w-sm mx-auto">
                  {msg.noCertificatesDesc}
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* New Activity Submission Modal */}
      {showNewSubmissionModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in"
        >
          <div className="relative max-w-2xl w-full my-8 rounded-3xl bg-white p-5 sm:p-8 shadow-2xl border border-sand">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-sand">
              <div className="flex items-center gap-2 text-brand-950">
                <ClipboardCheck className="size-5 text-brand-700" />
                <h3 className="font-display text-lg sm:text-xl font-bold">
                  নতুন কার্যক্রম জমা দিন
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNewSubmissionModal(false)}
                className="flex size-9 items-center justify-center rounded-full bg-sand/40 hover:bg-sand text-muted transition-colors cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <SubmissionForm
              defaultDistrict={profile.district || "ঢাকা"}
              defaultVenue={profile.mosqueName || ""}
              onSuccess={() => {
                refreshSubmissions();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
