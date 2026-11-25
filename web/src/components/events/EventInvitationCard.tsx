"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  Users,
  Award,
  CheckCircle2,
  Copy,
  Printer,
  ExternalLink,
  QrCode,
  ShieldCheck,
  Send,
} from "lucide-react";
import { EventItem } from "@/lib/sample-data";
import { formatBengaliDate, toBengaliDigits } from "@/lib/format";
import { messages } from "@/lib/messages";

interface EventInvitationCardProps {
  event: EventItem;
  channelUrl?: string;
  appBaseUrl?: string;
}

export function EventInvitationCard({
  event,
  channelUrl = "",
  appBaseUrl = "https://assunnah.foundation",
}: EventInvitationCardProps) {
  const [copied, setCopied] = useState(false);

  const applyUrl = `${appBaseUrl}/events/${event.slug}/apply`;
  const startDateBn = formatBengaliDate(event.startsAt);
  const endDateBn = formatBengaliDate(event.endsAt);
  const seatsBn = toBengaliDigits(event.seats);

  const channelFooter = channelUrl.trim()
    ? `\n━━━━━━━━━━━━━━━━━━━━\nনতুন সকল আয়োজন ও সার্কুলার সবার আগে পেতে আস-সুন্নাহ ফাউন্ডেশন অফিশিয়াল হোয়াটসঅ্যাপ চ্যানেল ফলো করুন:\n${channelUrl.trim()}`
    : "";

  // Formatted Rich Text Caption for WhatsApp & Social Media (clean text, no emojis)
  const captionText = `بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

আস-সুন্নাহ ফাউন্ডেশন • অফিসিয়াল ইভেন্ট ও প্রশিক্ষণ বিজ্ঞপ্তি
━━━━━━━━━━━━━━━━━━━━
কোর্সের নাম: ${event.title}

তারিখ: ${startDateBn} — ${endDateBn}
স্থান: ${event.venue || messages.brand.auditorium}
সর্বমোট আসন: ${seatsBn} জন (১০০% সম্পূর্ণ ফ্রি স্কলারশিপ)
সুযোগ-সুবিধা: বিনামূল্যে প্রশিক্ষণ, পাঠ্যসামগ্রী, খাবার, আবাসন ও ডিজিটাল সনদ

অংশগ্রহণের যোগ্যতা ও বিবরণ:
${event.eligibility.slice(0, 2).map(e => `• ${e}`).join("\n")}

অনলাইনে সরাসরি আবেদনের লিংক:
${applyUrl}

জরুরি হেল্পলাইন ও তথ্য: ০৯৬১০-০০১০৮৯${channelFooter}`;

  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(captionText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleShareToWhatsApp = () => {
    // Open WhatsApp with pre-filled message
    const encoded = encodeURIComponent(captionText);
    const whatsappWebUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(whatsappWebUrl, "_blank", "noopener,noreferrer");
  };

  const handleOpenChannel = () => {
    window.open(channelUrl, "_blank", "noopener,noreferrer");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-8 print:p-0">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-sand/90 bg-white p-5 shadow-soft print:hidden">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">
              ডিজিটাল ইনভিটেশন কার্ড ও হোয়াটসঅ্যাপ ক্যাপশন
            </h3>
            <p className="font-ui text-xs sm:text-sm text-muted">
              সোশ্যাল মিডিয়া ও হোয়াটসঅ্যাপ চ্যানেলে সরাসরি প্রচারের জন্য অফিসিয়াল ফরম্যাট
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleShareToWhatsApp}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#25D366] px-5 font-ui text-sm font-bold text-white shadow-md hover:bg-[#20ba59] transition-all cursor-pointer"
          >
            <Send className="size-4" />
            <span>হোয়াটসঅ্যাপে শেয়ার</span>
          </button>

          <button
            onClick={handleCopyCaption}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-sand bg-sand/40 px-4 font-ui text-sm font-bold text-ink hover:bg-sand transition-all cursor-pointer"
          >
            {copied ? <CheckCircle2 className="size-4 text-brand-600" /> : <Copy className="size-4" />}
            <span>{copied ? "কপি হয়েছে!" : "ক্যাপশন কপি"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-brand-900/20 bg-white px-4 font-ui text-sm font-bold text-brand-900 hover:bg-lime-50 transition-all cursor-pointer"
          >
            <Printer className="size-4" />
            <span>প্রিন্ট / সেভ</span>
          </button>
        </div>
      </div>

      {/* Main Showcase Grid: Left Visual Card + Right Text Caption */}
      <div className="grid gap-8 lg:grid-cols-12 items-stretch">
        {/* =========================================================
            LEFT COLUMN: THE VISUAL INVITATION CARD (7 COLS)
        ========================================================= */}
        <div className="lg:col-span-7 flex flex-col">
          <div
            id={`invitation-card-${event.slug}`}
            className="relative flex-1 overflow-hidden rounded-3xl border-4 border-lime-500/40 bg-brand-950 p-6 sm:p-10 text-ivory shadow-2xl print:border-2 print:shadow-none print:m-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 15%, rgba(141,198,63,0.18) 0%, rgba(4,24,15,0.98) 75%)",
            }}
          >
            {/* Ornamental Mihrab Border Line */}
            <div className="pointer-events-none absolute inset-3 rounded-2xl border border-lime-500/30 sm:inset-4" />

            {/* Header: Bismillah + Official Seal */}
            <div className="relative text-center pb-6 border-b border-brand-800/80">
              <p className="font-arabic text-xl sm:text-2xl text-lime-300 tracking-wide mb-4 leading-relaxed">
                {messages.invitationCard.bismillah}
              </p>

              <div className="flex items-center justify-center gap-3">
                <div className="relative size-12 sm:size-14">
                  <Image
                    src="/as-sunnah-official-seal.svg"
                    alt="আস-সুন্নাহ সিল"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="text-left">
                  <span className="block font-display text-lg sm:text-xl font-bold text-ivory leading-tight">
                    {messages.brand.foundation}
                  </span>
                  <span className="block font-ui text-xs text-lime-400 font-semibold">
                    {messages.invitationCard.orgSubtitle}
                  </span>
                </div>
              </div>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-lime-500/40 bg-lime-500/10 px-4 py-1 font-ui text-xs font-bold text-lime-300">
                <ShieldCheck className="size-3.5" />
                <span>{messages.invitationCard.officialBadge}</span>
              </div>
            </div>

            {/* Event Title */}
            <div className="relative py-6 sm:py-8 text-center">
              <span className="font-ui text-xs uppercase tracking-wider text-accent-400 font-bold block mb-2">
                আসন্ন প্রশিক্ষণ ও দাওয়াহ কর্মসূচি
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ivory leading-snug">
                {event.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-ivory/80 max-w-xl mx-auto font-sans line-clamp-2">
                {event.description}
              </p>
            </div>

            {/* Key Fact Boxes Grid */}
            <div className="relative grid gap-3 sm:grid-cols-2 mb-8">
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 p-4 backdrop-blur-xs flex items-center gap-3.5">
                <div className="grid size-11 place-items-center rounded-xl bg-lime-400/15 text-lime-400 shrink-0">
                  <Calendar className="size-5" />
                </div>
                <div>
                  <span className="block font-ui text-xs text-ivory/70">তারিখ ও সময়</span>
                  <span className="block font-display text-base font-bold text-ivory leading-tight">
                    {startDateBn} — {endDateBn}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 p-4 backdrop-blur-xs flex items-center gap-3.5">
                <div className="grid size-11 place-items-center rounded-xl bg-lime-400/15 text-lime-400 shrink-0">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <span className="block font-ui text-xs text-ivory/70">আয়োজনের স্থান</span>
                  <span className="block font-display text-base font-bold text-ivory leading-tight line-clamp-1">
                    {event.venue || messages.brand.auditorium}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 p-4 backdrop-blur-xs flex items-center gap-3.5">
                <div className="grid size-11 place-items-center rounded-xl bg-accent-400/15 text-accent-400 shrink-0">
                  <Users className="size-5" />
                </div>
                <div>
                  <span className="block font-ui text-xs text-ivory/70">আসন সংখ্যা</span>
                  <span className="block font-display text-base font-bold text-accent-400 leading-tight">
                    সর্বমোট {seatsBn} জন
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 p-4 backdrop-blur-xs flex items-center gap-3.5">
                <div className="grid size-11 place-items-center rounded-xl bg-lime-400/15 text-lime-400 shrink-0">
                  <Award className="size-5" />
                </div>
                <div>
                  <span className="block font-ui text-xs text-ivory/70">স্কলারশিপ</span>
                  <span className="block font-display text-base font-bold text-lime-300 leading-tight">
                    ১০০% সম্পূর্ণ ফ্রি
                  </span>
                </div>
              </div>
            </div>

            {/* Card Footer: QR Code & Signatures */}
            <div className="relative pt-6 border-t border-brand-800/80 flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* QR Code & Scan instructions */}
              <div className="flex items-center gap-4">
                <div className="size-20 rounded-2xl bg-white p-2 text-brand-950 shrink-0 flex items-center justify-center shadow-md">
                  <QrCode className="size-16" />
                </div>
                <div className="text-left font-ui">
                  <span className="block text-xs font-bold text-lime-300">
                    {messages.invitationCard.scanToApply}
                  </span>
                  <span className="block text-[11px] text-ivory/70 mt-0.5">
                    অথবা ভিজিট করুন: {appBaseUrl}
                  </span>
                </div>
              </div>

              {/* Chairman Signature Line */}
              <div className="text-right font-ui border-l border-brand-800 pl-6">
                <span className="block font-display text-base font-bold text-ivory">
                  {messages.invitationCard.chairmanSign}
                </span>
                <span className="block text-xs text-ivory/70">
                  {messages.invitationCard.chairmanTitle}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            RIGHT COLUMN: PREPARED TEXT CAPTION PREVIEW (5 COLS)
        ========================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-sand/90 bg-white p-6 sm:p-8 shadow-soft">
          <div>
            <div className="flex items-center justify-between border-b border-sand pb-4 mb-5">
              <div className="flex items-center gap-2">
                <Send className="size-5 text-[#25D366]" />
                <span className="font-ui text-base font-bold text-ink">
                  হোয়াটসঅ্যাপ ও সোশ্যাল রেডি ক্যাপশন
                </span>
              </div>
              <span className="rounded-full bg-lime-100 px-3 py-1 font-ui text-xs font-bold text-brand-900">
                অফিসিয়াল ড্রাফট
              </span>
            </div>

            {/* Caption Code / Textarea Box */}
            <div className="relative">
              <pre className="w-full h-96 overflow-y-auto whitespace-pre-wrap rounded-2xl border border-sand bg-sand/20 p-5 font-sans text-sm text-ink leading-relaxed select-all">
                {captionText}
              </pre>
            </div>
          </div>

          {/* Quick Action Footer */}
          <div className="mt-6 pt-5 border-t border-sand flex flex-col gap-3">
            <button
              onClick={handleShareToWhatsApp}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 px-6 font-ui text-base font-bold text-white shadow-md hover:bg-[#20ba59] transition-all cursor-pointer"
            >
              <Send className="size-5" />
              <span>সরাসরি হোয়াটসঅ্যাপ চ্যানেলে ড্রপ করুন</span>
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleCopyCaption}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-sand bg-sand/50 py-2.5 px-4 font-ui text-sm font-bold text-ink hover:bg-sand transition-all cursor-pointer"
              >
                {copied ? <CheckCircle2 className="size-4 text-brand-600" /> : <Copy className="size-4" />}
                <span>{copied ? "কপি সম্পন্ন!" : "ক্যাপশন কপি"}</span>
              </button>

              <button
                onClick={handleOpenChannel}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-brand-900/20 bg-white py-2.5 px-4 font-ui text-sm font-bold text-brand-900 hover:bg-lime-50 transition-all cursor-pointer"
              >
                <ExternalLink className="size-4" />
                <span>চ্যানেল খুলুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
