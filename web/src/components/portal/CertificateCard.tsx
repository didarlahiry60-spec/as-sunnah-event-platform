"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Printer, ShieldCheck, CheckCircle2, ExternalLink, Award, QrCode } from "lucide-react";
import { CertificateRecord } from "@/lib/certificates";
import { messages } from "@/lib/messages";

interface CertificateCardProps {
  certificate: CertificateRecord;
  showActions?: boolean;
}

export function CertificateCard({ certificate, showActions = true }: CertificateCardProps) {
  const [copied, setCopied] = useState(false);
  const msg = messages.certificates;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}${certificate.verificationUrl}`;
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="certificate-wrapper my-6">
      {/* Certificate Frame with Nur & Geometry styling */}
      <div
        id={`certificate-${certificate.certificateNo}`}
        className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-2xl border-4 border-lime-500/40 bg-white p-6 shadow-soft sm:p-10 text-ink print:border-2 print:shadow-none print:m-0 print:p-8"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(141,198,63,0.03) 0%, rgba(4,24,15,0.01) 100%)",
        }}
      >
        {/* Inner border with decorative corners */}
        <div className="pointer-events-none absolute inset-2 rounded-xl border border-brand-900/15 sm:inset-3" />

        {/* Certificate Header */}
        <div className="relative text-center">
          {/* Logo & Official Seal */}
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="relative size-16 sm:size-20">
              <Image
                src="/as-sunnah-official-seal.svg"
                alt="আস-সুন্নাহ অফিসিয়াল সিল"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-900/10 bg-ivory px-3.5 py-1 font-ui text-xs font-semibold text-brand-900">
            <ShieldCheck className="size-3.5 text-brand-600" />
            <span>আস-সুন্নাহ ফাউন্ডেশন • প্রশিক্ষণ ও ফলো-আপ সেল</span>
          </div>

          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-brand-950 sm:text-3xl">
            প্রশিক্ষণ সমাপ্তি সনদপত্র
          </h2>
          <p className="font-sans text-xs text-muted sm:text-sm">
            CERTIFICATE OF COMPLETION & DIPLOMA
          </p>
        </div>

        {/* Decorative divider */}
        <div className="my-5 flex items-center justify-center gap-3">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-brand-900/30" />
          <Award className="size-5 text-accent-500" />
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-brand-900/30" />
        </div>

        {/* Certificate Body */}
        <div className="relative text-center space-y-4 px-2 sm:px-6">
          <p className="font-ui text-xs text-muted sm:text-sm">
            {msg.certifiedToText}
          </p>

          <div className="py-1">
            <h3 className="font-display text-2xl font-bold text-brand-950 sm:text-4xl underline decoration-lime-500/60 decoration-2 underline-offset-8">
              {certificate.recipientName}
            </h3>
            <p className="mt-2 font-ui text-xs font-medium text-brand-800 sm:text-sm">
              {certificate.recipientCategory} • {certificate.recipientInstitution || "বাংলাদেশ"} ({certificate.recipientDistrict})
            </p>
          </div>

          <p className="mx-auto max-w-xl font-sans text-xs text-ink/80 leading-relaxed sm:text-sm">
            {msg.completionStatement}
          </p>

          {/* Course Title Badge */}
          <div className="mx-auto max-w-lg rounded-xl border border-lime-500/30 bg-lime-100/50 p-3 sm:p-4 text-center">
            <span className="block font-ui text-[11px] font-bold uppercase tracking-wider text-brand-700">
              কোর্সের নাম
            </span>
            <h4 className="mt-0.5 font-display text-base font-bold text-brand-950 sm:text-lg">
              {certificate.courseTitle}
            </h4>
            <p className="mt-1 font-ui text-xs font-semibold text-accent-700">
              {certificate.grade}
            </p>
          </div>

          {/* Date & Metadata */}
          <div className="grid grid-cols-2 gap-4 border-t border-b border-sand py-3 text-xs sm:text-sm">
            <div className="text-left pl-2">
              <span className="text-muted block text-[11px]">ইস্যুর তারিখ ও হিজরি সন:</span>
              <span className="font-semibold text-ink">{certificate.issueDate} ({certificate.issueDateHijri})</span>
            </div>
            <div className="text-right pr-2">
              <span className="text-muted block text-[11px]">সনদ নম্বর (Certificate ID):</span>
              <span className="font-mono font-bold text-brand-900">{certificate.certificateNo}</span>
            </div>
          </div>
        </div>

        {/* Certificate Signatures & QR Section */}
        <div className="mt-8 grid grid-cols-3 items-end gap-2 pt-4 sm:gap-6 border-t border-brand-900/10">
          {/* Signer 1: Shaykh Ahmadullah */}
          <div className="text-center">
            <div className="mx-auto mb-1 h-8 w-24 sm:w-32 border-b border-ink/40 flex items-center justify-center font-display italic text-brand-900 text-sm">
              শায়খ আহমাদুল্লাহ
            </div>
            <p className="font-ui text-xs font-bold text-ink sm:text-sm">
              {certificate.signerName}
            </p>
            <p className="text-[10px] text-muted sm:text-xs">
              {certificate.signerTitle}
            </p>
          </div>

          {/* Center QR Code Verification */}
          <div className="text-center flex flex-col items-center justify-center">
            <div className="rounded-lg border border-sand bg-ivory p-1.5 shadow-sm">
              <QrCode className="size-10 text-brand-950 sm:size-12" />
            </div>
            <span className="mt-1 text-[9px] text-muted sm:text-[10px] font-mono">
              যাচাইযোগ্য ডিজিটাল সিল
            </span>
          </div>

          {/* Signer 2: Advisor */}
          <div className="text-center">
            <div className="mx-auto mb-1 h-8 w-24 sm:w-32 border-b border-ink/40 flex items-center justify-center font-display italic text-brand-900 text-sm">
              ড. মানজুরে ইলাহী
            </div>
            <p className="font-ui text-xs font-bold text-ink sm:text-sm">
              {certificate.advisorName}
            </p>
            <p className="text-[10px] text-muted sm:text-xs">
              {certificate.advisorTitle}
            </p>
          </div>
        </div>
      </div>

      {/* Trainee Action Controls (Hidden on Print) */}
      {showActions && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="flex min-h-12 items-center justify-center gap-2 rounded-full accent-foil-bg px-6 font-ui text-sm font-bold text-brand-950 shadow-md hover:brightness-110 cursor-pointer"
          >
            <Printer className="size-4" />
            <span>সনদ প্রিন্ট / PDF সংরক্ষণ</span>
          </button>

          <Link
            href={certificate.verificationUrl}
            target="_blank"
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-sand bg-white px-5 font-ui text-sm font-semibold text-brand-900 shadow-sm hover:bg-sand/40 cursor-pointer"
          >
            <ExternalLink className="size-4 text-brand-600" />
            <span>অনলাইনে যাচাই করুন</span>
          </Link>

          <button
            type="button"
            onClick={handleCopyLink}
            className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-sand bg-white px-4 font-ui text-xs font-medium text-muted hover:text-ink cursor-pointer"
          >
            {copied ? (
              <>
                <CheckCircle2 className="size-3.5 text-success" />
                <span className="text-success font-bold">লিংক কপি হয়েছে!</span>
              </>
            ) : (
              <span>যাচাই লিংক কপি করুন</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
