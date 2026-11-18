"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Calendar, MapPin, Sparkles } from "lucide-react";

const bn = (n: number) => String(n).padStart(2, "0").replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[+d]);

function Countdown({ to }: { to: string }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(Math.max(0, new Date(to).getTime() - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [to]);

  if (left === null) return <div className="h-16" />;

  const s = Math.floor(left / 1000);
  const parts = [
    ["দিন", Math.floor(s / 86400)],
    ["ঘণ্টা", Math.floor(s / 3600) % 24],
    ["মিনিট", Math.floor(s / 60) % 60],
    ["সেকেন্ড", s % 60],
  ] as const;

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3" role="timer" aria-label="ইভেন্ট শুরুর কাউন্টডাউন">
      {parts.map(([l, v]) => (
        <div
          key={l}
          className="min-w-14 sm:min-w-16 flex-1 rounded-xl border border-accent-500/50 bg-brand-950/60 px-2 sm:px-3 py-2 text-center backdrop-blur-xs shadow-inner"
        >
          <div className="font-ui text-xl sm:text-2xl font-bold text-accent-500 tabular-nums">
            {bn(v)}
          </div>
          <div className="text-[11px] sm:text-xs text-ivory/80 font-ui">{l}</div>
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
  title: string;
  startsAt: string;
  slug: string;
}) {
  const reduce = useReducedMotion();
  const rise = (i: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay: 0.12 * i, ease: "easeOut" as const },
        };

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

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.div {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-lime-500/30 bg-lime-500/10 px-3.5 py-1 text-xs sm:text-sm font-ui text-lime-300">
            <Sparkles className="size-3.5 text-lime-400" />
            <span>আস-সুন্নাহ ফাউন্ডেশন অডিটোরিয়াম</span>
          </motion.div>

          <motion.h1
            {...rise(1)}
            className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl text-ivory"
          >
            জ্ঞানে, আমলে ও সেবায় <br className="hidden sm:inline" />
            <span className="accent-foil">একসাথে পথচলা</span>
          </motion.h1>

          <motion.p {...rise(2)} className="mt-5 max-w-xl text-lg text-ivory/85 leading-relaxed">
            প্রশিক্ষণ, কর্মশালা ও সেমিনারে আবেদন করুন সহজেই। শুধু প্রশিক্ষণই নয়—মাঠপর্যায়ে আপনার নিয়মিত কার্যক্রমেও আমরা সারাবছর পাশে আছি।
          </motion.p>

          <motion.div {...rise(3)} className="mt-8 rounded-2xl border border-accent-500/30 bg-brand-950/40 p-5 backdrop-blur-xs">
            <div className="mb-3 flex items-center justify-between font-ui text-sm">
              <span className="text-lime-300 flex items-center gap-1.5 font-semibold">
                <Calendar className="size-4" /> আসন্ন আয়োজন
              </span>
              <span className="text-ivory/80 flex items-center gap-1">
                <MapPin className="size-3.5 text-accent-500" /> ঢাকা
              </span>
            </div>
            <p className="mb-4 font-ui text-lg sm:text-xl font-bold text-ivory">{title}</p>
            <Countdown to={startsAt} />
          </motion.div>

          <motion.div {...rise(4)} className="mt-8 flex flex-wrap gap-4 items-center">
            <Button
              href={slug ? `/events/${slug}/apply` : "/events"}
              variant="accent"
              className="w-full sm:w-auto shadow-lg shadow-accent-700/20"
            >
              আবেদন করুন
            </Button>
            <Button href="/events" variant="ghost" className="w-full sm:w-auto">
              ইভেন্ট ক্যালেন্ডার দেখুন
            </Button>
          </motion.div>
        </div>

        {/* Mihrab (pointed-arch) signature visual element */}
        <motion.div
          {...rise(2)}
          className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-t-[999px] rounded-b-3xl border-2 border-accent-500/60 bg-linear-to-b from-brand-800 via-brand-900 to-brand-950 p-6 shadow-2xl shadow-brand-950/80 flex flex-col justify-between items-center text-center"
          aria-hidden="true"
        >
          {/* Subtle inner pointed arch guide */}
          <div className="absolute inset-2.5 rounded-t-[999px] rounded-b-2xl border border-lime-500/20 pointer-events-none" />

          {/* Mihrab crest */}
          <div className="pt-8">
            <div className="size-16 mx-auto rounded-full bg-linear-to-br from-lime-500/20 to-brand-600/20 border border-lime-500/40 grid place-items-center">
              <Sparkles className="size-8 text-lime-400" />
            </div>
          </div>

          {/* Mihrab center content */}
          <div className="z-10 py-6">
            <p className="font-arabic text-2xl text-lime-300 drop-shadow-xs">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <h3 className="mt-4 font-display text-2xl font-bold text-ivory">দেশজুড়ে খিদমত ও তাকওয়া</h3>
            <p className="mt-2 font-ui text-sm text-ivory/70 max-w-xs">
              সারাদেশের ইমাম, মাদরাসা শিক্ষক ও সমাজকর্মীদের ঐক্যবদ্ধ প্ল্যাটফর্ম
            </p>
          </div>

          {/* Mihrab bottom badge */}
          <div className="w-full pb-4">
            <div className="rounded-xl border border-accent-500/40 bg-brand-950/80 py-2.5 px-4">
              <span className="font-ui text-xs font-semibold text-accent-500 tracking-wide">
                আস-সুন্নাহ ফাউন্ডেশন • প্রশিক্ষণ ও ফলো-আপ
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
