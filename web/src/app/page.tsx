import { getEventsData } from "@/lib/events-data";
import { Hero } from "@/components/site/Hero";
import { Button } from "@/components/ui/Button";
import { Calendar, Users, MapPin, ArrowRight, Camera, Clock } from "lucide-react";
import Link from "next/link";
import { toBengaliDigits, formatBengaliDate } from "@/lib/format";
import { messages } from "@/lib/messages";
import { SAMPLE_BLOG_POSTS, SAMPLE_GALLERY } from "@/lib/sample-data";

export const dynamic = "force-dynamic";

const stats = [
  messages.stats.imam,
  messages.stats.madrasa,
  messages.stats.volunteers,
];

const pillars = [
  messages.pillars.pillar1,
  messages.pillars.pillar2,
  messages.pillars.pillar3,
];

export default async function Home() {
  const allEvents = await getEventsData();
  const events = allEvents.filter(e => e.status === "UPCOMING").slice(0, 3);

  const next = events[0];

  return (
    <>
      <Hero
        title={next?.title}
        startsAt={next?.startsAt ? next.startsAt : undefined}
        slug={next?.slug}
      />

      {/* Impact Numbers Section */}
      <section className="relative overflow-hidden border-y border-lime-500/20 bg-gradient-to-b from-brand-950 via-brand-900 to-brand-950 py-16 md:py-24 text-ivory shadow-xl">
        {/* Subtle Ambient Radial Glow */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(141,198,63,0.08),transparent_70%)]" />

        <div className="relative mx-auto grid w-full max-w-[97%] 2xl:max-w-[1900px] gap-8 xl:gap-10 px-3 sm:px-6 lg:px-8 sm:grid-cols-3">
          {stats.map(s => (
            <div
              key={s.label}
              className="group relative overflow-hidden border-l-6 border-lime-400 border border-white/5 bg-gradient-to-br from-brand-900/80 via-brand-950/90 to-brand-900/80 p-8 sm:p-10 xl:p-12 rounded-r-3xl shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-lime-500/30 hover:border-l-lime-300"
            >
              <div className="font-display text-5xl sm:text-6xl xl:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-300 tracking-tight drop-shadow-sm">
                {s.value}
              </div>
              <div className="mt-4 font-ui text-2xl xl:text-3xl font-extrabold text-ivory">{s.label}</div>
              <div className="mt-2 text-base xl:text-lg text-ivory/80 leading-relaxed font-sans">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8 py-14 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-sand pb-8">
          <div>
            <span className="font-ui text-base font-bold uppercase tracking-wider text-brand-600">
              {messages.events.sectionTag}
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl xl:text-5xl">
              {messages.events.sectionTitle}
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-ui text-brand-700 hover:text-brand-900 font-bold text-lg group"
          >
            <span>{messages.events.viewAll}</span>
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-sand bg-white p-12 text-center shadow-soft md:p-16">
            <div className="mx-auto size-20 rounded-full bg-lime-100 text-brand-800 grid place-items-center mb-6">
              <Calendar className="size-10" />
            </div>
            <h3 className="font-display text-3xl font-bold text-ink">{messages.events.emptyTitle}</h3>
            <p className="mx-auto mt-3 max-w-xl text-lg text-muted">
              {messages.events.emptyDescription}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-5">
              <Button href="/notices" variant="primary" className="text-base px-8 py-3.5">
                {messages.events.checkNotices}
              </Button>
              <Button href="/contact" variant="outline" className="text-base px-8 py-3.5">
                {messages.events.contactUs}
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 xl:gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {events.map(e => (
              <article
                key={e.id}
                className="flex flex-col justify-between rounded-3xl border border-sand/90 bg-white p-8 xl:p-10 shadow-soft transition-all duration-200 hover:-translate-y-1.5 hover:shadow-2xl hover:border-brand-600/40"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="w-fit rounded-full bg-lime-100 border border-lime-300/80 px-4 py-1.5 font-ui text-sm font-bold text-brand-900">
                      {e.type}
                    </span>
                    <span className="flex items-center gap-1.5 font-ui text-sm font-medium text-muted">
                      <Users className="size-4 text-accent-500" />
                      <span>{toBengaliDigits(e.seats ?? 0)} {messages.events.seats}</span>
                    </span>
                  </div>

                  <h3 className="mt-6 font-ui text-2xl xl:text-3xl font-bold text-ink leading-snug">
                    {e.title}
                  </h3>

                  <div className="mt-6 space-y-3 text-base text-muted">
                    <p className="flex items-center gap-2.5">
                      <Calendar className="size-5 text-brand-600 shrink-0" />
                      <span>{formatBengaliDate(e.startsAt)}</span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <MapPin className="size-5 text-brand-600 shrink-0" />
                      <span>{e.venue ?? messages.brand.auditorium}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-sand">
                  <Button href={`/events/${e.slug}/apply`} variant="accent" className="w-full text-base sm:text-lg py-3.5 font-bold rounded-xl shadow-md">
                    {messages.events.applyButton}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 3 Pillars Section */}
      <section className="bg-sand/60 py-20 md:py-28 border-t border-sand">
        <div className="mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl font-bold text-ink">
              {messages.pillars.sectionTitle}
            </h2>
            <p className="mt-4 text-muted text-lg xl:text-xl leading-relaxed">
              {messages.pillars.sectionSubtitle}
            </p>
          </div>

          <div className="mt-14 grid gap-8 xl:gap-12 sm:grid-cols-3">
            {pillars.map((p, idx) => {
              const bgNumClass =
                idx === 0
                  ? "bg-lime-100 text-brand-800"
                  : idx === 1
                  ? "bg-accent-100 text-accent-700"
                  : "bg-brand-100 text-brand-800";
              return (
                <div key={p.number} className="rounded-3xl bg-white p-8 xl:p-10 shadow-soft border border-sand/90 transition-transform hover:-translate-y-1 hover:shadow-xl">
                  <div className={`size-16 xl:size-20 rounded-2xl grid place-items-center font-bold text-2xl xl:text-3xl mb-8 ${bgNumClass}`}>
                    {p.number}
                  </div>
                  <h3 className="font-display text-2xl xl:text-3xl font-bold text-ink">{p.title}</h3>
                  <p className="mt-4 text-base xl:text-lg leading-relaxed text-muted">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog & Articles Preview Section (Proposal Section 3.1 Item 6) */}
      <section className="mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-sand pb-8">
          <div>
            <span className="font-ui text-base font-bold uppercase tracking-wider text-brand-600">
              জ্ঞান ও গবেষণা
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold text-ink sm:text-4xl xl:text-5xl">
              সাম্প্রতিক দাওয়াহ ও শিক্ষামূলক প্রবন্ধ
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-ui text-brand-700 hover:text-brand-900 font-bold text-lg group"
          >
            <span>সকল প্রবন্ধ দেখুন</span>
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLE_BLOG_POSTS.slice(0, 3).map(post => (
            <article
              key={post.id}
              className="flex flex-col justify-between rounded-3xl border border-sand/90 bg-white p-8 xl:p-10 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/40 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="rounded-full bg-lime-100 px-3.5 py-1 font-ui text-xs font-bold text-brand-900">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 font-ui text-xs text-muted">
                    <Clock className="size-3.5" />
                    <span>{toBengaliDigits(post.readTimeMinutes)} মিনিট পাঠ</span>
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-ink leading-snug hover:text-brand-700 transition-colors">
                  <Link href="/blog">{post.title}</Link>
                </h3>

                <p className="mt-3 text-base text-muted font-sans line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-sand/70 flex items-center justify-between font-ui text-sm">
                <span className="text-ink/80 font-semibold">{post.author.name}</span>
                <Link
                  href="/blog"
                  className="font-bold text-brand-700 hover:text-brand-900 inline-flex items-center gap-1"
                >
                  <span>পড়ুন</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Photo Gallery Preview Section (Proposal Section 3.1 Item 6) */}
      <section className="bg-brand-950 py-16 md:py-24 text-ivory border-t border-brand-800">
        <div className="mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 border-b border-brand-800 pb-8">
            <div>
              <span className="font-ui text-base font-bold uppercase tracking-wider text-lime-400">
                স্মৃতির অ্যালবাম
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold text-ivory sm:text-4xl xl:text-5xl">
                ফটো গ্যালারি ও মাঠপর্যায়ের কার্যক্রম
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 font-ui text-lime-300 hover:text-lime-200 font-bold text-lg group"
            >
              <span>সম্পূর্ণ গ্যালারি দেখুন</span>
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SAMPLE_GALLERY.slice(0, 4).map(item => (
              <Link
                key={item.id}
                href="/gallery"
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-brand-800 bg-brand-900/60 p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-lime-500/40 hover:shadow-2xl"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-brand-950">
                  {item.thumbnailUrl && item.thumbnailUrl !== "/logo.png" ? (
                    <>
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-brand-950/80 via-transparent to-transparent opacity-60" />
                    </>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <div className="grid size-14 place-items-center rounded-2xl bg-brand-800/80 text-lime-400 border border-lime-500/30 group-hover:scale-110 transition-transform shadow-lg">
                        <Camera className="size-6" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-5">
                  <span className="font-ui text-xs font-semibold text-lime-400 block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-display text-lg font-bold text-ivory leading-snug line-clamp-2 group-hover:text-lime-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-xs text-ivory/70 line-clamp-2 font-sans">
                    {item.caption}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
