"use client";

import { useState } from "react";
import Link from "next/link";
import { Printer, Copy, Check, ArrowLeft, QrCode } from "lucide-react";
import { messages } from "@/lib/messages";

interface Props {
  appNumber: string;
  qrToken?: string;
  isAuthorized?: boolean;
}

export function SuccessPassActions({ appNumber, qrToken, isAuthorized = true }: Props) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(appNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-4 print:hidden">
      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Print / Save Pass Button */}
        <button
          type="button"
          onClick={handlePrint}
          className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-accent-500 px-6 font-ui text-sm font-bold text-brand-950 transition hover:bg-accent-400 active:scale-[0.99] cursor-pointer shadow-soft"
          style={{ minHeight: "48px" }}
        >
          <Printer className="size-4 text-brand-950" />
          <span>{messages.successPage.printButton}</span>
        </button>

        {/* Copy Application ID Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-sand bg-white px-5 font-ui text-sm font-semibold text-ink hover:bg-sand/40 active:scale-[0.99] transition cursor-pointer shadow-sm"
          style={{ minHeight: "48px" }}
        >
          {copied ? (
            <>
              <Check className="size-4 text-emerald-600" />
              <span className="text-emerald-700 font-bold">{messages.successPage.copiedText}</span>
            </>
          ) : (
            <>
              <Copy className="size-4 text-muted" />
              <span>{messages.successPage.copyNumberButton}</span>
            </>
          )}
        </button>

        {/* Back to Home */}
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full border border-sand bg-ivory px-5 font-ui text-sm font-semibold text-brand-950 hover:bg-sand/60 transition cursor-pointer"
          style={{ minHeight: "48px" }}
        >
          <ArrowLeft className="size-4" />
          <span>{messages.successPage.backHomeButton}</span>
        </Link>
      </div>

      {/* Staff Gatekeeper Check-in link (only for authorized visitors) */}
      {isAuthorized && qrToken && (
        <div className="text-center pt-2">
          <Link
            href={`/checkin?token=${encodeURIComponent(qrToken)}`}
            className="inline-flex items-center gap-1.5 font-ui text-xs text-muted hover:text-brand-900 transition-colors underline"
          >
            <QrCode className="size-3.5" />
            <span>গেটকিপার ভেরিফিকেশন কনসোল (অফিসিয়াল গেট টিম)</span>
          </Link>
        </div>
      )}
    </div>
  );
}
