import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark" | "auto";
  showSubtitle?: boolean;
}

export function AsSunnahLogo({ className = "", variant = "auto", showSubtitle = false }: LogoProps) {
  // variant="light" -> for dark backgrounds (white/ivory text)
  // variant="dark" -> for light backgrounds (dark ink text)
  // variant="auto" -> defaults to light
  const isDarkBg = variant === "light" || variant === "auto";
  const logoSrc = isDarkBg ? "/as-sunnah-logo-light.svg" : "/as-sunnah-logo-dark.svg";
  const textColor = isDarkBg ? "text-ivory" : "text-brand-950";
  const badgeStyle = isDarkBg
    ? "bg-brand-900/80 text-lime-400 border-lime-500/40"
    : "bg-sand text-brand-900 border-brand-800/30";

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 ${textColor} ${className}`}>
      {/* Official As-Sunnah Foundation Logo */}
      <Image
        src={logoSrc}
        alt="আস-সুন্নাহ ফাউন্ডেশন"
        width={60}
        height={39}
        priority
        className="h-9 sm:h-10 w-auto object-contain shrink-0"
      />

      {/* Brand title typography */}
      <div className="flex flex-col text-left leading-tight">
        <div className="flex items-center gap-1.5">
          <span className="font-display text-base sm:text-lg font-bold tracking-tight">
            ইভেন্ট
          </span>
          <span className={`text-[10px] sm:text-xs font-ui font-semibold px-2 py-0.5 rounded-full border ${badgeStyle}`}>
            প্ল্যাটফর্ম
          </span>
        </div>
        {showSubtitle && (
          <span className="font-ui text-xs text-lime-400/90 mt-0.5">আস-সুন্নাহ ফাউন্ডেশন</span>
        )}
      </div>
    </div>
  );
}
