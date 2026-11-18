import { db } from "@/lib/db";
import { Hero } from "@/components/site/Hero";
import { Button } from "@/components/ui/Button";
import { Calendar, Users, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const bnNum = (n: number) => String(n).replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[+d]);

const stats = [
  { label: "ইমাম প্রশিক্ষণার্থী", value: "৬০০+", desc: "সারাদেশের জেলা-উপজেলা পর্যায়ে" },
  { label: "মাদরাসা শিক্ষক ও পরিচালক", value: "২০০+", desc: "আধুনিক শিক্ষা ও ব্যবস্থাপনা" },
  { label: "সমাজসেবী ও ভলান্টিয়ার", value: "১,০০০+", desc: "দুর্যোগকালীন জরুরি ত্রাণ ও সেবা" },
];

export default async function Home() {
  const events = await db.event
    .findMany({ where: { status: "UPCOMING" }, orderBy: { startsAt: "asc" }, take: 3 })
    .catch(() => []);

  const next = events[0];
  // eslint-disable-next-line react-hooks/purity
  const defaultStartsAt = (next?.startsAt ?? new Date(Date.now() + 30 * 864e5)).toISOString();

  return (
    <>
      <Hero
        title={next?.title ?? "নতুন ইভেন্ট শীঘ্রই"}
        startsAt={defaultStartsAt}
        slug={next?.slug ?? ""}
      />

      {/* Impact Numbers Section */}
      <section className="border-y border-accent-500/20 bg-brand-950 py-12 text-ivory">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:grid-cols-3">
          {stats.map(s => (
            <div
              key={s.label}
              className="border-l-3 border-lime-500 bg-brand-900/30 p-5 rounded-r-xl"
            >
              <div className="font-display text-4xl sm:text-5xl font-bold text-lime-400">
                {s.value}
              </div>
              <div className="mt-1 font-ui text-lg font-semibold text-ivory">{s.label}</div>
              <div className="text-xs text-ivory/70">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="font-ui text-sm font-semibold uppercase tracking-wider text-brand-600">
              রেজিস্ট্রেশন চলছে
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
              আসন্ন প্রশিক্ষণ ও ইভেন্ট
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 font-ui text-brand-700 hover:text-brand-900 font-semibold text-base group"
          >
            <span>সকল ইভেন্ট দেখুন</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-sand bg-white p-8 text-center shadow-soft md:p-12">
            <div className="mx-auto size-16 rounded-full bg-lime-100 text-brand-800 grid place-items-center mb-4">
              <Calendar className="size-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-ink">নতুন কোনো ইভেন্ট ঘোষণা হয়নি</h3>
            <p className="mx-auto mt-2 max-w-md text-muted">
              পরবর্তী কোর্সের নোটিশ শীঘ্রই প্রকাশ করা হবে। নোটিশ বোর্ডে চোখ রাখুন অথবা আমাদের সাথে যোগাযোগ করুন।
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button href="/notices" variant="primary">
                নোটিশ বোর্ড দেখুন
              </Button>
              <Button href="/contact" variant="ghost" className="border-brand-800 text-brand-900 hover:bg-sand">
                যোগাযোগ করুন
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map(e => (
              <article
                key={e.id}
                className="flex flex-col justify-between rounded-2xl border border-sand bg-white p-6 shadow-soft transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="w-fit rounded-full bg-lime-100 px-3 py-1 font-ui text-xs font-semibold text-brand-800">
                      {e.type}
                    </span>
                    <span className="flex items-center gap-1 font-ui text-xs text-muted">
                      <Users className="size-3.5 text-accent-500" />
                      <span>{bnNum(e.seats ?? 0)} আসন</span>
                    </span>
                  </div>

                  <h3 className="mt-4 font-ui text-xl font-bold text-ink leading-snug">
                    {e.title}
                  </h3>

                  <div className="mt-4 space-y-2 text-sm text-muted">
                    <p className="flex items-center gap-2">
                      <Calendar className="size-4 text-brand-600 shrink-0" />
                      <span>
                        {e.startsAt.toLocaleDateString("bn-BD", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="size-4 text-brand-600 shrink-0" />
                      <span>{e.venue ?? "আস-সুন্নাহ অডিটোরিয়াম"}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-sand">
                  <Button href={`/events/${e.slug}/apply`} variant="accent" className="w-full">
                    আবেদন করুন
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 3 Pillars Section */}
      <section className="bg-sand/60 py-16 md:py-24 border-t border-sand">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              আস-সুন্নাহর ত্রিমুখী ফলো-আপ ব্যবস্থা
            </h2>
            <p className="mt-3 text-muted text-base sm:text-lg">
              প্রশিক্ষণ শেষে প্রশিক্ষণার্থীরা একা নন—প্ল্যাটফর্মের মাধ্যমে তারা সবসময় যুক্ত থাকেন কেন্দ্রীয় নেটওয়ার্কের সাথে।
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-7 shadow-soft border border-sand">
              <div className="size-12 rounded-xl bg-lime-100 text-brand-800 grid place-items-center font-bold text-xl mb-5">
                ০১
              </div>
              <h3 className="font-display text-xl font-bold text-ink">বিষয়ভিত্তিক খুতবা ও আমল</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                প্রতি মঙ্গলবার সকাল ৮টায় সমসাময়িক গুরুত্বপূর্ণ বিষয়ের খুতবা এবং সপ্তাহে নফল রোজা ও আমল নির্দেশিকা পৌঁছে যায় ইমামদের ফোনে।
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-soft border border-sand">
              <div className="size-12 rounded-xl bg-accent-100 text-accent-700 grid place-items-center font-bold text-xl mb-5">
                ০২
              </div>
              <h3 className="font-display text-xl font-bold text-ink">স্বয়ংক্রিয় পয়েন্ট ও স্কোরিং</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                মসজিদ পরিচ্ছন্নতা, হালাকা, বৃক্ষরোপণ কিংবা অনলাইন ক্লাসে অংশগ্রহণ—কাজের ছবি জমা দিলেই অটো-পয়েন্ট ও স্বীকৃতি।
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 shadow-soft border border-sand">
              <div className="size-12 rounded-xl bg-brand-100 text-brand-800 grid place-items-center font-bold text-xl mb-5">
                ০৩
              </div>
              <h3 className="font-display text-xl font-bold text-ink">সরাসরি মতবিনিময় ও সম্মাননা</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                নিয়মিত অনলাইন কাউন্সেলিং, সরাসরি মতবিনিময় সভা এবং বছরশেষে সক্রিয় পারফর্মারদের সম্মাননা ও পুনর্মিলনী।
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
