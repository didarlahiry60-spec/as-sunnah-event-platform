import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getSession } from "@/lib/auth";
import { getTraineeFullProfile } from "@/lib/trainee";
import { SubmissionForm } from "@/components/portal/SubmissionForm";
import { messages } from "@/lib/messages";
import { ClipboardCheck, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: `নতুন কার্যক্রম জমা | ${messages.brand.name}`,
  description: "মাঠপর্যায়ে পরিচালিত খুতবা, পরিচ্ছন্নতা, হালাকা বা সমাজসেবামূলক কার্যক্রমের তথ্য জমা দিন।",
};

export default async function NewSubmissionPage() {
  const session = await getSession();
  if (!session) {
    redirect("/portal/login");
  }

  const profile = await getTraineeFullProfile(session.personId);

  return (
    <div className="min-h-screen bg-ivory pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-30 border-b border-sand bg-white/90 backdrop-blur-md px-4 py-3 sm:px-8">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/portal"
            className="inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-brand-900 hover:text-brand-950 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>পোর্টালে ফিরুন</span>
          </Link>

          <span className="font-ui text-xs text-muted">
            {profile?.name || session.name}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 sm:px-6 pt-8">
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-lime-100 px-3 py-1 font-ui text-xs font-bold text-brand-900 border border-lime-500/40 mb-2">
            <ClipboardCheck className="size-3.5 text-brand-700" />
            <span>{messages.submissions.badge}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-brand-950">
            {messages.submissions.title}
          </h1>
          <p className="mt-1 text-sm text-muted font-sans">
            {messages.submissions.subtitle}
          </p>
        </div>

        <div className="rounded-3xl border border-sand bg-white p-5 sm:p-8 shadow-soft">
          <SubmissionForm
            defaultDistrict={profile?.district || "ঢাকা"}
            defaultVenue={profile?.mosqueName || ""}
          />
        </div>
      </main>
    </div>
  );
}
