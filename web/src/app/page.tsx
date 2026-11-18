import { db } from "@/lib/db";
import { Hero } from "@/components/site/Hero";
import { Button } from "@/components/ui/Button";
import { Calendar, Users, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { toBengaliDigits, formatBengaliDate } from "@/lib/format";
import { messages } from "@/lib/messages";

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
  const events = await db.event
    .findMany({ where: { status: "UPCOMING" }, orderBy: { startsAt: "asc" }, take: 3 })
    .catch(() => []);

  const next = events[0];

  return (
    <>
      <Hero
        title={next?.title}
        startsAt={next?.startsAt ? next.startsAt.toISOString() : undefined}
        slug={next?.slug}
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
              {messages.events.sectionTag}
            </span>
            <h2 className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
              {messages.events.sectionTitle}
            </h2>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 font-ui text-brand-700 hover:text-brand-900 font-semibold text-base group"
          >
            <span>{messages.events.viewAll}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-sand bg-white p-8 text-center shadow-soft md:p-12">
            <div className="mx-auto size-16 rounded-full bg-lime-100 text-brand-800 grid place-items-center mb-4">
              <Calendar className="size-8" />
            </div>
            <h3 className="font-display text-2xl font-bold text-ink">{messages.events.emptyTitle}</h3>
            <p className="mx-auto mt-2 max-w-md text-muted">
              {messages.events.emptyDescription}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button href="/notices" variant="primary">
                {messages.events.checkNotices}
              </Button>
              <Button href="/contact" variant="outline">
                {messages.events.contactUs}
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
                      <span>{toBengaliDigits(e.seats ?? 0)} {messages.events.seats}</span>
                    </span>
                  </div>

                  <h3 className="mt-4 font-ui text-xl font-bold text-ink leading-snug">
                    {e.title}
                  </h3>

                  <div className="mt-4 space-y-2 text-sm text-muted">
                    <p className="flex items-center gap-2">
                      <Calendar className="size-4 text-brand-600 shrink-0" />
                      <span>{formatBengaliDate(e.startsAt)}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="size-4 text-brand-600 shrink-0" />
                      <span>{e.venue ?? messages.brand.auditorium}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-sand">
                  <Button href={`/events/${e.slug}/apply`} variant="accent" className="w-full">
                    {messages.events.applyButton}
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
              {messages.pillars.sectionTitle}
            </h2>
            <p className="mt-3 text-muted text-base sm:text-lg">
              {messages.pillars.sectionSubtitle}
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {pillars.map((p, idx) => {
              const bgNumClass =
                idx === 0
                  ? "bg-lime-100 text-brand-800"
                  : idx === 1
                  ? "bg-accent-100 text-accent-700"
                  : "bg-brand-100 text-brand-800";
              return (
                <div key={p.number} className="rounded-2xl bg-white p-7 shadow-soft border border-sand">
                  <div className={`size-12 rounded-xl grid place-items-center font-bold text-xl mb-5 ${bgNumClass}`}>
                    {p.number}
                  </div>
                  <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
