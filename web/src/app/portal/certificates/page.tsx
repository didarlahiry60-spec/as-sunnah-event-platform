import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Award, ShieldCheck } from "lucide-react";
import { getSession } from "@/lib/auth";
import { getCertificatesByPersonId } from "@/lib/certificates";
import { CertificateCard } from "@/components/portal/CertificateCard";
import { messages } from "@/lib/messages";

export const metadata: Metadata = {
  title: "ডিজিটাল সনদপত্র | আস-সুন্নাহ ফাউন্ডেশন পোর্টাল",
  description: "আস-সুন্নাহ ফাউন্ডেশন কর্তৃক ইস্যুকৃত অফিসিয়াল প্রশিক্ষণ সনদপত্র ও ভেরিফিকেশন।",
};

export default async function PortalCertificatesPage() {
  const session = await getSession();

  if (!session) {
    redirect("/portal/login");
  }

  const certificates = await getCertificatesByPersonId(session.personId);

  return (
    <div className="min-h-screen bg-ivory pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-sand bg-white/90 backdrop-blur-md px-4 py-3 sm:px-8 print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/portal"
            className="inline-flex items-center gap-2 font-ui text-xs font-semibold text-brand-900 hover:text-brand-950"
          >
            <ArrowLeft className="size-4" />
            <span>ড্যাশবোর্ডে ফিরে যান</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-lime-500/40 bg-lime-100/80 px-3 py-1 font-ui text-xs font-bold text-brand-950">
            <ShieldCheck className="size-3.5 text-brand-600" />
            <span>যাচাইকৃত সনদপত্র</span>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-brand-950 text-ivory py-10 px-5 text-center print:hidden">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-2 inline-flex items-center justify-center size-12 rounded-2xl bg-brand-900 text-lime-400 border border-lime-500/30">
            <Award className="size-6" />
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl text-ivory">
            {messages.certificates.pageTitle}
          </h1>
          <p className="mt-2 text-xs text-ivory/80 sm:text-sm">
            {messages.certificates.pageSubtitle}
          </p>
        </div>
      </section>

      {/* Main Certificate Content */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-6">
        {certificates.length > 0 ? (
          <div className="space-y-8">
            {certificates.map(cert => (
              <CertificateCard key={cert.certificateNo} certificate={cert} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-sand bg-white p-8 text-center shadow-soft">
            <Award className="mx-auto size-12 text-muted/60" />
            <h3 className="mt-3 font-display text-lg font-bold text-ink">
              {messages.portal.noCertificatesTitle}
            </h3>
            <p className="mt-1 text-xs text-muted font-sans max-w-sm mx-auto">
              {messages.portal.noCertificatesDesc}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
