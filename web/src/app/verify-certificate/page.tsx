import { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Search } from "lucide-react";
import { verifyCertificate } from "@/lib/certificates";
import { CertificateCard } from "@/components/portal/CertificateCard";
import { messages } from "@/lib/messages";
import { AsSunnahLogo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "সনদ যাচাইকরণ কনসোল | আস-সুন্নাহ ফাউন্ডেশন",
  description: "আস-সুন্নাহ ফাউন্ডেশন কর্তৃক ইস্যুকৃত ডিজিটাল সনদের সত্যতা যাচাই করুন।",
};

export default async function VerifyCertificatePage(props: {
  searchParams: Promise<{ certNo?: string }>;
}) {
  const searchParams = await props.searchParams;
  const certNo = searchParams.certNo ? searchParams.certNo.trim() : "";
  const msg = messages.certificates;

  const verificationResult = certNo ? await verifyCertificate(certNo) : null;

  return (
    <div className="min-h-screen bg-ivory pb-20">
      {/* Hero Banner */}
      <section className="bg-brand-950 text-ivory pt-28 pb-12 px-5 text-center print:hidden">
        <div className="mx-auto max-w-2xl">
          <div className="mx-auto mb-3 flex items-center justify-center">
            <AsSunnahLogo variant="light" />
          </div>

          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-4xl text-ivory">
            {msg.verifyPageTitle}
          </h1>
          <p className="mt-2 text-xs text-ivory/80 sm:text-sm max-w-lg mx-auto leading-relaxed">
            {msg.verifyPageSubtitle}
          </p>

          {/* Search Box */}
          <form method="GET" action="/verify-certificate" className="mt-6 mx-auto max-w-md">
            <div className="relative flex items-center">
              <input
                type="text"
                name="certNo"
                defaultValue={certNo}
                placeholder={msg.inputPlaceholder}
                className="w-full min-h-12 rounded-full border-2 border-lime-500/60 bg-white/10 px-5 pr-28 text-sm text-ivory placeholder:text-ivory/50 backdrop-blur-sm focus:border-lime-400 focus:bg-white/20 focus:outline-none font-mono"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 flex items-center gap-1 rounded-full accent-foil-bg px-5 font-ui text-xs sm:text-sm font-bold text-brand-950 shadow-md hover:brightness-110 cursor-pointer"
              >
                <Search className="size-3.5" />
                <span>যাচাই</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Main Verification Result */}
      <main className="mx-auto max-w-4xl px-4 sm:px-6 pt-8">
        {certNo ? (
          verificationResult?.valid && verificationResult.certificate ? (
            <div>
              {/* Green Verified Status Badge */}
              <div className="mb-6 rounded-2xl border-2 border-success/40 bg-success/10 p-5 text-center shadow-xs print:hidden">
                <div className="inline-flex items-center gap-2 font-display text-lg font-bold text-success sm:text-xl">
                  <ShieldCheck className="size-6 text-success" />
                  <span>{msg.verifiedTitle}</span>
                </div>
                <p className="mt-1 text-xs text-ink/80 font-sans max-w-md mx-auto">
                  {msg.verifiedDesc}
                </p>
                <div className="mt-2 text-xs font-mono font-bold text-brand-950">
                  সনদ নম্বর: {verificationResult.certificate.certificateNo}
                </div>
              </div>

              {/* Render Full Certificate */}
              <CertificateCard certificate={verificationResult.certificate} />
            </div>
          ) : (
            <div className="rounded-3xl border border-danger/30 bg-white p-8 text-center shadow-soft max-w-md mx-auto">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-danger/10 text-danger">
                <ShieldCheck className="size-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-danger">
                {msg.invalidTitle}
              </h3>
              <p className="mt-2 text-xs text-muted font-sans leading-relaxed">
                {verificationResult?.error || msg.invalidDesc}
              </p>
              <div className="mt-5">
                <Link
                  href="/verify-certificate"
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-sand bg-ivory px-5 font-ui text-xs font-semibold text-brand-900 hover:bg-sand/60"
                >
                  পুনরায় সন্ধান করুন
                </Link>
              </div>
            </div>
          )
        ) : (
          <div className="rounded-3xl border border-sand bg-white p-8 text-center shadow-soft max-w-md mx-auto">
            <ShieldCheck className="mx-auto size-12 text-brand-600/60" />
            <h3 className="mt-3 font-display text-lg font-bold text-ink">
              সনদের সত্যতা অনলাইনে যাচাই
            </h3>
            <p className="mt-1 text-xs text-muted font-sans leading-relaxed">
              আস-সুন্নাহ ফাউন্ডেশন থেকে প্রাপ্ত সনদের ওপর উল্লেখিত সনদ নম্বরটি উপরের বক্সে লিখে যাচাই বাটনে ক্লিক করুন।
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
