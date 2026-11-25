"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { padBengali } from "@/lib/format";
import { useLanguage } from "@/lib/i18n";

function Countdown({ to }: { to: string }) {
  const { locale, t } = useLanguage();
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const target = new Date(to).getTime();
    if (isNaN(target)) return;
    const tick = () => setLeft(Math.max(0, target - Date.now()));
    tick();
    const tmr = setInterval(tick, 1000);
    return () => clearInterval(tmr);
  }, [to]);

  if (left === null) return <div className="h-16" />;

  const s = Math.floor(left / 1000);
  const parts = [
    [t.hero.timer.days, Math.floor(s / 86400)],
    [t.hero.timer.hours, Math.floor(s / 3600) % 24],
    [t.hero.timer.minutes, Math.floor(s / 60) % 60],
    [t.hero.timer.seconds, s % 60],
  ] as const;

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3" role="timer" aria-label={t.hero.timer.ariaLabel}>
      {parts.map(([label, val]) => (
        <div
          key={label}
          className="min-w-14 sm:min-w-16 flex-1 rounded-xl border border-accent-500/50 bg-brand-950/60 px-2 sm:px-3 py-2 text-center backdrop-blur-xs shadow-inner"
        >
          <div className="font-ui text-xl sm:text-2xl font-bold text-accent-500 tabular-nums">
            {locale === "en" ? String(val).padStart(2, "0") : padBengali(val)}
          </div>
          <div className="text-[11px] sm:text-xs text-ivory/80 font-ui">{label}</div>
        </div>
      ))}
    </div>
  );
}

export function Hero({
  title,
  startsAt,
  slug,
}: {
  title?: string;
  startsAt?: string;
  slug?: string;
}) {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0.9, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: 0.04 * i, ease: "easeOut" as const },
        };

  const hasEvent = Boolean(startsAt && slug);

  return (
    <section
      style={{
        backgroundImage:
          "radial-gradient(60% 50% at 78% 18%, rgba(141,198,63,.18), transparent 70%), radial-gradient(40% 40% at 15% 85%, rgba(240,146,43,.08), transparent 60%)",
      }}
      className="relative isolate overflow-hidden bg-brand-900 pt-28 pb-20 text-ivory md:pt-36 md:pb-28"
    >
      {/* 8-fold Geometric Lattice Background Pattern */}
      <svg className="absolute inset-0 -z-10 size-full opacity-[0.06]" aria-hidden="true">
        <defs>
          <pattern id="lattice" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect x="20" y="20" width="40" height="40" fill="none" stroke="#8DC63F" strokeWidth="1.2" />
            <rect
              x="20"
              y="20"
              width="40"
              height="40"
              fill="none"
              stroke="#8DC63F"
              strokeWidth="1.2"
              transform="rotate(45 40 40)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#lattice)" />
      </svg>

      <div className="mx-auto grid w-full max-w-[97%] 2xl:max-w-[1900px] items-center gap-10 lg:gap-14 xl:gap-20 px-3 sm:px-6 lg:px-8 md:grid-cols-[1.3fr_1fr] 2xl:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.div
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-4 py-1.5 text-sm sm:text-base font-ui text-lime-300 font-semibold"
          >
            <span className="size-2.5 rounded-full bg-lime-400" aria-hidden="true" />
            <span>{t.hero.badge}</span>
          </motion.div>

          <motion.h1
            {...rise(1)}
            className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight text-ivory tracking-tight"
          >
            {t.hero.headlineLine1} <br className="hidden sm:inline" />
            <span className="accent-foil">{t.hero.headlineHighlight}</span>
          </motion.h1>

          <motion.p {...rise(2)} className="mt-6 max-w-3xl text-lg sm:text-xl xl:text-2xl text-ivory/85 leading-relaxed font-sans">
            {t.hero.description}
          </motion.p>

          <motion.div {...rise(3)} className="mt-10 rounded-3xl border border-accent-500/30 bg-brand-950/50 p-6 sm:p-8 backdrop-blur-xs shadow-xl">
            <div className="mb-4 flex items-center justify-between font-ui text-base xl:text-lg">
              <span className="text-lime-300 flex items-center gap-2 font-bold">
                <Calendar className="size-5" /> {hasEvent ? t.hero.upcomingTitle : t.hero.noUpcomingTitle}
              </span>
              <span className="text-ivory/85 flex items-center gap-1.5 font-medium">
                <MapPin className="size-4 text-accent-500" /> {t.hero.locationDhaka}
              </span>
            </div>
            <p className="mb-5 font-ui text-xl sm:text-2xl xl:text-3xl font-bold text-ivory">
              {title ?? t.hero.noUpcomingTitle}
            </p>
            {hasEvent && startsAt ? (
              <Countdown to={startsAt} />
            ) : (
              <p className="font-ui text-base text-lime-300/90 py-2">
                {t.hero.noUpcomingNotice}
              </p>
            )}
          </motion.div>

          <motion.div {...rise(4)} className="mt-10 flex flex-wrap gap-4 sm:gap-5 items-center">
            {hasEvent && slug ? (
              <>
                <Button
                  href={`/events/${slug}/apply`}
                  variant="accent"
                  className="w-full sm:w-auto shadow-xl shadow-accent-700/30 text-base sm:text-lg px-8 py-3.5 font-bold hover:scale-[1.02] transition-transform"
                >
                  {t.hero.applyNow}
                </Button>
                <Button
                  href="/events"
                  variant="ghost"
                  className="w-full sm:w-auto text-base sm:text-lg px-8 py-3.5 font-bold hover:bg-white/10"
                >
                  {t.hero.viewCalendar}
                </Button>
              </>
            ) : (
              <>
                <Button
                  href="/events"
                  variant="accent"
                  className="w-full sm:w-auto shadow-xl shadow-accent-700/30 text-base sm:text-lg px-8 py-3.5 font-bold hover:scale-[1.02] transition-transform"
                >
                  {t.hero.viewCalendar}
                </Button>
                <Button
                  href="/about"
                  variant="ghost"
                  className="w-full sm:w-auto text-base sm:text-lg px-8 py-3.5 font-bold hover:bg-white/10"
                >
                  {t.nav.about}
                </Button>
              </>
            )}
          </motion.div>
        </div>

        {/* Mihrab (pointed-arch) signature visual element */}
        <motion.div
          {...rise(2)}
          className="relative mx-auto aspect-[3/4] w-full max-w-md sm:max-w-lg xl:max-w-xl overflow-hidden rounded-t-[999px] rounded-b-3xl border-2 border-accent-500/70 bg-gradient-to-b from-brand-850 via-brand-900 to-brand-950 p-8 sm:p-10 shadow-2xl shadow-brand-950/90 flex flex-col justify-between items-center text-center ring-1 ring-accent-400/30"
          aria-hidden="true"
        >
          {/* Subtle ambient lighting behind Mihrab */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(240,146,43,0.18),transparent_65%)]" />

          {/* Double inner pointed arch guide */}
          <div className="absolute inset-3 rounded-t-[999px] rounded-b-2xl border border-lime-400/25 pointer-events-none" />
          <div className="absolute inset-5 rounded-t-[999px] rounded-b-xl border border-accent-500/20 pointer-events-none" />

          {/* Mihrab crest */}
          <div className="pt-10 z-10">
            <div className="size-22 mx-auto rounded-3xl bg-brand-900/90 border-2 border-lime-400/40 p-3.5 shadow-xl shadow-brand-950/80 flex items-center justify-center ring-4 ring-lime-500/10 backdrop-blur-xs">
              <Image
                src="/as-sunnah-logo-light.svg"
                alt="আস-সুন্নাহ ফাউন্ডেশন"
                width={72}
                height={48}
                className="w-full h-auto object-contain drop-shadow-md"
              />
            </div>
          </div>

          {/* Mihrab center content */}
          <div className="z-10 py-6 sm:py-8 flex flex-col items-center">
            <p className="font-arabic text-2xl sm:text-3xl xl:text-4xl text-amber-300 drop-shadow-[0_2px_12px_rgba(240,146,43,0.45)] font-bold leading-relaxed pb-3 sm:pb-4 select-none">
              {t.hero.mihrab.bismillah}
            </p>
            <h3 className="mt-4 sm:mt-6 font-display text-2xl sm:text-3xl xl:text-4xl font-extrabold text-ivory tracking-tight drop-shadow-sm leading-normal">
              {t.hero.mihrab.title}
            </h3>
            <p className="mt-3 font-ui text-base xl:text-lg text-ivory/85 max-w-sm leading-relaxed">
              {t.hero.mihrab.subtitle}
            </p>
          </div>

          {/* Mihrab bottom badge */}
          <div className="w-full pb-6 z-10">
            <div className="rounded-2xl border border-accent-400/50 bg-brand-950/90 py-2.5 px-4 sm:px-6 inline-block max-w-full shadow-lg shadow-brand-950/60 backdrop-blur-xs">
              <span className="font-ui text-xs sm:text-sm xl:text-base font-bold text-accent-400 tracking-wider whitespace-nowrap block truncate">
                {t.hero.mihrab.tag}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
