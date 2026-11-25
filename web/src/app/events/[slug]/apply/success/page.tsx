import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CheckCircle2,
  MapPin,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  Lock,
  Radio,
  Send,
} from "lucide-react";
import { getApplicationByNumber } from "@/lib/applications";
import { generateQrCodeSvg, buildPassVerificationUrl } from "@/lib/qr";
import { messages } from "@/lib/messages";
import { AsSunnahLogo } from "@/components/ui/Logo";
import { SuccessPassActions } from "@/components/events/SuccessPassActions";
import { getSession, getAdminSession } from "@/lib/auth";
import { toBengaliDigits, normalizeBdPhone } from "@/lib/format";
import { getWhatsAppChannelUrl } from "@/lib/settings";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ appNumber?: string; token?: string }>;
}

/**
 * Masks applicant mobile number (e.g. ০১৭****৩৩৪৪)
 */
export function maskApplicantMobile(mobile: string): string {
  if (!mobile) return "";
  const normalized = normalizeBdPhone(mobile) || mobile;
  const bn = toBengaliDigits(normalized);
  if (bn.length < 8) return bn;
  return bn.slice(0, 3) + "****" + bn.slice(-4);
}

/**
 * Masks applicant name (e.g. মু***ান)
 */
export function maskApplicantName(name: string): string {
  if (!name) return "";
  const trimmed = name.trim();
  if (trimmed.length <= 2) return trimmed[0] + "*";
  if (trimmed.length <= 4) return trimmed[0] + "**" + trimmed.slice(-1);
  return trimmed.slice(0, 2) + "***" + trimmed.slice(-2);
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { appNumber } = await searchParams;
  return {
    title: `আবেদন নিশ্চিতকরণ ${appNumber ? `(${appNumber})` : ""} | ${messages.brand.name}`,
    description: "আস-সুন্নাহ ফাউন্ডেশন ডিজিটাল ভেন্যু পাস ও আবেদন নিশ্চিতকরণ।",
  };
}

export default async function ApplicationSuccessPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { appNumber, token } = await searchParams;

  if (!appNumber) {
    notFound();
  }

  const app = await getApplicationByNumber(appNumber);

  if (!app) {
    return (
      <div className="min-h-screen bg-ivory pt-28 pb-16 px-5">
        <div className="mx-auto max-w-xl text-center rounded-2xl border border-sand bg-white p-8 shadow-soft">
          <div className="mx-auto size-14 rounded-full bg-accent-100 text-accent-700 grid place-items-center mb-4">
            <Clock className="size-7" />
          </div>
          <h1 className="font-display text-2xl font-bold text-ink">আবেদন খুঁজে পাওয়া যায়নি</h1>
          <p className="mt-2 text-sm text-muted font-sans">
            আবেদন নম্বর <span className="font-mono font-bold text-ink">{appNumber}</span> অনুযায়ী কোনো তথ্য মেলেনি।
          </p>
          <div className="mt-6">
            <Link
              href={`/events/${slug}`}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-800 px-6 font-ui font-semibold text-ivory hover:bg-brand-900"
            >
              ইভেন্ট পাতায় ফিরুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // PRIVACY INVARIANT: Check whether the visitor holds a matching authenticated session or valid temporary access token
  const hasValidAccessToken = Boolean(token && token === app.qrToken);
  const traineeSession = await getSession();
  const isTraineeOwner = Boolean(
    traineeSession &&
    ((traineeSession.mobile && normalizeBdPhone(traineeSession.mobile) === normalizeBdPhone(app.applicant.mobile)) ||
     (traineeSession.personId && traineeSession.personId === app.applicant.id))
  );
  const adminSession = await getAdminSession();
  const isAdmin = Boolean(adminSession);

  const isAuthorized = hasValidAccessToken || isTraineeOwner || isAdmin;

  // Masked or unmasked personal details
  const displayName = isAuthorized ? app.applicant.name : maskApplicantName(app.applicant.name);
  const displayMobile = isAuthorized ? app.applicant.mobile : maskApplicantMobile(app.applicant.mobile);

  // Generate QR Code SVG only for authorized viewers
  let qrSvg: string | null = null;
  if (isAuthorized) {
    const verificationUrl = buildPassVerificationUrl(app.qrToken);
    qrSvg = await generateQrCodeSvg(verificationUrl, {
      width: 220,
      margin: 1,
      color: {
        dark: "#04180F", // brand-950
        light: "#FFFFFF",
      },
    });
  }

  const categoryLabel =
    messages.applyPage.categories[app.applicant.category] || app.applicant.category;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Top Banner */}
      <section className="bg-brand-950 pt-28 pb-12 text-ivory text-center px-5">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-lime-500/20 px-4 py-1 border border-lime-400/40 text-lime-300 font-ui text-xs font-bold">
            <CheckCircle2 className="size-4" />
            <span>{messages.successPage.badge}</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl font-bold text-ivory">
            {messages.successPage.headline}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-ivory/80 max-w-2xl mx-auto font-sans leading-relaxed">
            {messages.successPage.subHeadline}
          </p>
        </div>
      </section>

      {/* Main Content & Digital Pass */}
      <main className="mx-auto max-w-3xl px-5 py-10">
        {/* SMS Dispatch Notice */}
        <div className="rounded-xl border border-lime-500/30 bg-lime-100/60 p-4 text-brand-950 flex items-start gap-3 mb-8">
          <CheckCircle2 className="size-5 text-brand-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm font-sans leading-relaxed">
            <strong className="font-semibold block font-ui">এসএমএস নোটিফিকেশন প্রেরিত:</strong>
            আপনার মোবাইল নম্বর <span className="font-mono font-bold">{displayMobile}</span>-এ আবেদন নম্বর ও প্রবেশপত্রের সরাসরি লিংক পাঠিয়ে দেওয়া হয়েছে।
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LUXURY VENUE ADMISSION PASS (নূর ও জ্যামিতি টিকিট) */}
        {/* ========================================================================= */}
        <div
          id="admit-pass-card"
          className="relative overflow-hidden rounded-3xl border border-sand bg-white shadow-xl transition-all"
        >
          {/* Decorative Pattern & Top Header */}
          <div className="relative bg-brand-950 p-6 sm:p-8 text-ivory">
            <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 size-48 rounded-full bg-lime-500/10 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-ivory/15 pb-5">
              <AsSunnahLogo variant="light" showSubtitle={true} />
              <div className="text-left sm:text-right">
                <span className="inline-block rounded-full bg-accent-500/20 px-3 py-1 text-xs font-bold text-accent-300 border border-accent-400/30 font-ui">
                  ডিজিটাল প্রবেশপত্র
                </span>
                <p className="mt-1 font-mono text-xs text-ivory/70">
                  TOKEN: {isAuthorized ? `${app.qrToken.slice(0, 16)}...` : "••••••••••••••••"}
                </p>
              </div>
            </div>

            <div className="mt-5">
              <span className="font-ui text-xs font-semibold uppercase tracking-wider text-lime-400">
                কোর্স ও ইভেন্ট
              </span>
              <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-ivory">
                {app.eventTitle}
              </h2>
            </div>
          </div>

          {/* Ticket Body: Pass Information & High-Contrast QR Code */}
          <div className="p-6 sm:p-8 grid gap-8 md:grid-cols-12 items-center">
            {/* Left Column: Applicant & Event Details */}
            <div className="md:col-span-7 space-y-4">
              <div className="rounded-xl border border-sand/70 bg-ivory/50 p-4">
                <span className="block font-ui text-xs text-muted">
                  {messages.successPage.appNumberLabel}
                </span>
                <span className="font-mono text-xl sm:text-2xl font-extrabold text-brand-950 tracking-wider">
                  {app.number}
                </span>
              </div>

              <div className="space-y-2.5 text-sm text-ink/90 font-sans">
                <div className="flex items-center gap-2.5">
                  <User className="size-4 text-brand-700 shrink-0" />
                  <span>
                    <strong className="font-ui">নাম:</strong> {displayName}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="size-4 text-brand-700 shrink-0" />
                  <span>
                    <strong className="font-ui">মোবাইল:</strong> {displayMobile}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Building2 className="size-4 text-brand-700 shrink-0" />
                  <span>
                    <strong className="font-ui">পদবি:</strong> {categoryLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin className="size-4 text-brand-700 shrink-0" />
                  <span>
                    <strong className="font-ui">এলাকা:</strong> {app.applicant.district}, {app.applicant.division}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Building2 className="size-4 text-brand-700 shrink-0" />
                  <span>
                    <strong className="font-ui">প্রতিষ্ঠান:</strong> {app.applicant.mosqueName}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="pt-2">
                <span className="font-ui text-xs text-muted block mb-1">
                  {messages.successPage.statusLabel}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-100 px-3 py-1 font-ui text-xs font-bold text-brand-900 border border-lime-400/40">
                  <CheckCircle2 className="size-3.5 text-brand-600" />
                  {app.status === "SHORTLISTED"
                    ? messages.screening.recommendations.SHORTLISTED
                    : app.status === "SELECTED"
                    ? "চূড়ান্ত নির্বাচিত (Selected)"
                    : app.status === "WAITLIST"
                    ? messages.screening.recommendations.WAITLIST
                    : messages.screening.recommendations.PENDING}
                </span>
              </div>
            </div>

            {/* Right Column: Scannable SVG QR Code OR Privacy Lockdown Notice */}
            <div className="md:col-span-5 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-sand pt-6 md:pt-0 md:pl-6 text-center">
              {isAuthorized && qrSvg ? (
                <>
                  <div
                    className="size-44 sm:size-48 p-2 rounded-2xl bg-white border-2 border-brand-950/20 shadow-md flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                    dangerouslySetInnerHTML={{ __html: qrSvg }}
                  />
                  <span className="mt-3 font-mono text-xs font-bold text-muted tracking-widest">
                    VERIFIED VENUE PASS
                  </span>
                  <p className="mt-1 text-xs text-muted max-w-xs font-sans leading-relaxed">
                    {messages.successPage.scanInstruction}
                  </p>
                </>
              ) : (
                <div className="size-44 sm:size-48 rounded-2xl bg-sand/30 border-2 border-dashed border-sand flex flex-col items-center justify-center p-4 text-center">
                  <div className="size-10 rounded-full bg-brand-950/10 grid place-items-center mb-2">
                    <Lock className="size-5 text-brand-950" />
                  </div>
                  <span className="font-ui text-xs font-bold text-brand-950">
                    কিউআর কোড সুরক্ষিত
                  </span>
                  <p className="mt-1 text-[11px] text-muted font-sans leading-tight">
                    নিরাপত্তার স্বার্থে পূর্ণ প্রবেশপত্র দেখতে এসএমএস লিংকে ক্লিক করুন বা লগইন করুন।
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Pass Footer / Tear-off Notch Style */}
          <div className="bg-sand/30 border-t border-dashed border-sand/80 px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-2 font-sans">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-brand-700" />
              <span>{messages.successPage.gateNotice}</span>
            </div>
            {isAuthorized ? (
              <Link
                href={`/checkin?token=${encodeURIComponent(app.qrToken)}`}
                className="text-brand-800 font-ui font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>গেটে টিকিট স্ক্যান প্রিভিউ</span>
                <ArrowRight className="size-3" />
              </Link>
            ) : (
              <Link
                href="/portal/login"
                className="text-brand-800 font-ui font-semibold hover:underline inline-flex items-center gap-1"
              >
                <span>লগইন করে সম্পূর্ণ পাস দেখুন</span>
                <ArrowRight className="size-3" />
              </Link>
            )}
          </div>
        </div>

        {/* Action Buttons: Print, Copy ID, Back Home */}
        <div className="mt-8">
          <SuccessPassActions
            appNumber={app.number}
            qrToken={isAuthorized ? app.qrToken : undefined}
            isAuthorized={isAuthorized}
          />
        </div>

        {/* Official WhatsApp Channel Join Prompt for Applicants (shown only when configured) */}
        {getWhatsAppChannelUrl() && (
          <div className="mt-8 rounded-3xl border-2 border-lime-500/50 bg-brand-950 p-6 sm:p-8 text-ivory text-center shadow-xl">
            <div className="mx-auto mb-3 grid size-14 place-items-center rounded-2xl bg-lime-400/20 text-lime-400 border border-lime-500/40">
              <Radio className="size-7" />
            </div>
            <span className="inline-block rounded-full bg-lime-500/10 px-4 py-1 text-xs font-bold text-lime-400 font-ui border border-lime-500/30 mb-2">
              জরুরি ঘোষণা ও ফলাফল
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-ivory">
              ফলাফল ও আসন নিশ্চিতকরণ আপডেট পেতে যুক্ত থাকুন
            </h3>
            <p className="mt-2 text-sm sm:text-base text-ivory/80 max-w-lg mx-auto font-sans leading-relaxed">
              প্রাথমিক স্ক্রিনিং, নির্বাচিতদের তালিকা ও অডিটোরিয়ামে প্রবেশের গুরুত্বপূর্ণ দিকনির্দেশনা পেতে আস-সুন্নাহ ফাউন্ডেশনের অফিশিয়াল হোয়াটসঅ্যাপ চ্যানেলে যুক্ত হোন।
            </p>
            <div className="mt-6">
              <a
                href={getWhatsAppChannelUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-13 items-center gap-3 rounded-2xl bg-[#25D366] px-8 font-ui text-base font-bold text-white shadow-lg hover:bg-[#20ba59] transition-colors cursor-pointer"
              >
                <Send className="size-5" />
                <span>আস-সুন্নাহ হোয়াটসঅ্যাপ চ্যানেলে যুক্ত হোন</span>
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
