import React from "react";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark" | "auto";
  showSubtitle?: boolean;
}

export function AsSunnahLogo({ className = "", variant = "auto", showSubtitle = false }: LogoProps) {
  // variant="light" -> for dark backgrounds (white/ivory text)
  // variant="dark" -> for light backgrounds (dark ink text)
  // variant="auto" -> inherits currentColor
  const textColor = variant === "light" ? "text-ivory" : variant === "dark" ? "text-brand-950" : "currentColor";
  const subtextColor = variant === "light" ? "text-ivory/70" : variant === "dark" ? "text-muted" : "opacity-75";

  return (
    <div className={`inline-flex items-center gap-2.5 ${textColor} ${className}`}>
      {/* As-Sunnah Emblem SVG */}
      <svg
        className="size-9 shrink-0 drop-shadow-xs"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Background shield/circle subtle glow */}
        <circle cx="20" cy="20" r="19" fill="#04180F" fillOpacity="0.25" stroke="#8DC63F" strokeWidth="1" strokeOpacity="0.4" />
        
        {/* Outer leaf / crescent arch in vibrant lime */}
        <path
          d="M20 7C26 7 31 11.5 31.8 17.5C29 14.5 25 13 20 13.5C14.5 14 10.5 18 9 23.5C8.3 19 12 11 20 7Z"
          fill="#8DC63F"
        />
        
        {/* Inner flourish / leaf in rich emerald green */}
        <path
          d="M20 13C24 13 27 16 27.5 20C25 18 22 17.5 18.5 18C15 18.5 12.5 21 11 25C10.5 21.5 14 15.5 20 13Z"
          fill="#2F9E5B"
        />

        {/* Central pointed mihrab arch / ray */}
        <path
          d="M20 18C21.5 18 22.8 19.2 23 21C21.5 20 19.5 20 18 20.8C16.8 21.5 15.5 23 15 25.5C14.8 23 16.5 19.5 20 18Z"
          fill="#B7DE7A"
        />

        {/* Signature orange dot / rising sun emblem */}
        <circle cx="20" cy="26" r="3.2" fill="url(#sunnah-orange-foil)" />
        <circle cx="20" cy="26" r="4.2" stroke="#F0922B" strokeWidth="0.8" strokeOpacity="0.6" strokeDasharray="1.5 1.5" />

        <defs>
          <linearGradient id="sunnah-orange-foil" x1="17" y1="23" x2="23" y2="29" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFC477" />
            <stop offset="0.5" stopColor="#F0922B" />
            <stop offset="1" stopColor="#C9700F" />
          </linearGradient>
        </defs>
      </svg>

      {/* Brand title typography */}
      <div className="flex flex-col text-left leading-tight">
        <span className="font-display text-lg font-bold tracking-tight">আস-সুন্নাহ ইভেন্ট</span>
        {showSubtitle && (
          <span className={`font-ui text-xs ${subtextColor}`}>আস-সুন্নাহ ফাউন্ডেশন</span>
        )}
      </div>
    </div>
  );
}
