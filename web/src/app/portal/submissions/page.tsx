import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { getSubmissionsByPerson } from "@/lib/submissions";
import { SubmissionsList } from "@/components/portal/SubmissionsList";
import { messages } from "@/lib/messages";
import { formatBengaliNumber } from "@/lib/format";
import { ClipboardCheck, ArrowLeft, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: `আমার কার্যক্রম ও অর্জিত পয়েন্ট | ${messages.brand.name}`,
  description: "মাঠপর্যায়ে আপনার পরিচালিত সকল কার্যক্রমের স্ট্যাটাস ও অর্জিত পয়েন্টের বিস্তারিত তালিকা।",
};

export default async function PortalSubmissionsHistoryPage() {
  const session = await getSession();
  if (!session) {
    redirect("/portal/login");
  }

  const submissions = await getSubmissionsByPerson(session.personId);
  const approvedPoints = submissions
    .filter(s => s.status === "APPROVED")
    .reduce((sum, s) => sum + s.points, 0);

  const pendingCount = submissions.filter(s => s.status === "PENDING").length;

  return (
    <div className="min-h-screen bg-ivory pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-sand bg-white/90 backdrop-blur-md px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/portal"
            className="inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-brand-900 hover:text-brand-950 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>পোর্টালে ফিরুন</span>
          </Link>

          <Link
            href="/portal/submissions/new"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-1.5 font-ui text-xs font-bold text-brand-950 shadow-xs hover:from-accent-400 hover:to-accent-500 transition-all cursor-pointer"
          >
            <Plus className="size-3.5" />
            <span>নতুন কার্যক্রম</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-8 space-y-6">
        {/* Banner with Stats */}
        <div className="rounded-3xl border border-sand bg-brand-950 text-ivory p-6 sm:p-8 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-lime-500/20 px-3 py-1 font-ui text-xs font-bold text-lime-400 border border-lime-500/30 mb-2">
                <ClipboardCheck className="size-3.5 text-lime-400" />
                <span>{messages.submissions.history.badge}</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-ivory">
                {messages.submissions.history.title}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-ivory/80 font-sans max-w-xl">
                {messages.submissions.history.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Approved Points */}
              <div className="rounded-2xl border border-lime-500/30 bg-brand-900 p-3.5 text-right">
                <span className="block font-ui text-[11px] text-ivory/70">অর্জিত পয়েন্ট</span>
                <span className="font-display text-2xl font-bold text-lime-400">
                  +{formatBengaliNumber(approvedPoints)}
                </span>
              </div>

              {/* Pending count */}
              {pendingCount > 0 && (
                <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-3.5 text-right">
                  <span className="block font-ui text-[11px] text-amber-200">পর্যালোচনায়</span>
                  <span className="font-display text-2xl font-bold text-amber-300">
                    {formatBengaliNumber(pendingCount)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <SubmissionsList submissions={submissions} />
      </main>
    </div>
  );
}
