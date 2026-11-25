import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { getEventBySlug, getEventsData } from "@/lib/events-data";
import { formatBengaliDate, toBengaliDigits } from "@/lib/format";
import { messages } from "@/lib/messages";
import { CONTACT_INFO } from "@/lib/sample-data";
import { EventInvitationCard } from "@/components/events/EventInvitationCard";
import { getWhatsAppChannelUrl } from "@/lib/settings";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: `ইভেন্ট পাওয়া যায়নি | ${messages.brand.name}`,
    };
  }

  return {
    title: `${event.title} | ${messages.brand.name}`,
    description: event.description,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const allEvents = await getEventsData();
  const otherEvents = allEvents.filter(e => e.slug !== event.slug).slice(0, 2);

  const isUpcoming = event.status === "UPCOMING";
  const isCompleted = event.status === "COMPLETED";

  return (
    <div className="min-h-screen bg-ivory">
      {/* Top Banner Header */}
      <section className="relative overflow-hidden bg-brand-950 pt-28 pb-16 text-ivory">
        <div className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-lime-500/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8">
          {/* Breadcrumb link */}
          <Link
            href="/events"
            className="inline-flex items-center gap-2 font-ui text-base text-ivory/70 hover:text-lime-400 transition-colors"
          >
            {messages.eventDetails.backToEvents}
          </Link>

          {/* Badges */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-sand/20 px-4 py-1.5 font-ui text-sm font-bold text-lime-300 border border-lime-400/30">
              {event.type}
            </span>
            <span
              className={`rounded-full px-4 py-1.5 font-ui text-sm font-bold ${
                isUpcoming
                  ? "bg-lime-500 text-brand-950"
                  : isCompleted
                  ? "bg-sand/30 text-ivory/80"
                  : "bg-accent-500 text-brand-950"
              }`}
            >
              {isUpcoming
                ? messages.eventsPage.statusUpcomingBadge
                : isCompleted
                ? messages.eventsPage.statusCompletedBadge
                : messages.eventsPage.statusOngoingBadge}
            </span>
          </div>

          {/* Event Title */}
          <h1 className="mt-5 font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight text-ivory tracking-tight">
            {event.title}
          </h1>

          {/* Key Facts Strip */}
          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-brand-800/80 pt-8 sm:grid-cols-4">
            <div className="space-y-1.5">
              <span className="flex items-center gap-2 font-ui text-sm text-ivory/70">
                <Calendar className="size-4 text-lime-400" />
                {messages.eventDetails.timelineLabel}
              </span>
              <p className="font-ui text-base xl:text-lg font-bold text-ivory">
                {formatBengaliDate(event.startsAt)}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="flex items-center gap-2 font-ui text-sm text-ivory/70">
                <MapPin className="size-4 text-accent-500" />
                {messages.eventDetails.venueLabel}
              </span>
              <p className="truncate font-ui text-base xl:text-lg font-bold text-ivory">
                {event.venue}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="flex items-center gap-2 font-ui text-sm text-ivory/70">
                <Users className="size-4 text-lime-400" />
                {messages.eventDetails.seatsLabel}
              </span>
              <p className="font-ui text-base xl:text-lg font-bold text-ivory">
                {toBengaliDigits(event.seats)} জন
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="flex items-center gap-2 font-ui text-sm text-ivory/70">
                <Clock className="size-4 text-accent-500" />
                {messages.eventDetails.applyDeadlineLabel}
              </span>
              <p className="font-ui text-base xl:text-lg font-bold text-ivory">
                {formatBengaliDate(event.applyClosesAt)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid gap-10 xl:gap-14 lg:grid-cols-12 items-start">
          {/* Main Info Columns (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Real Event Photo Banner */}
            {event.bannerUrl && (
              <div className="relative aspect-[21/9] sm:aspect-[2.2/1] w-full overflow-hidden rounded-3xl border border-sand/80 shadow-soft">
                <img
                  src={event.bannerUrl}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-950/80 via-transparent to-transparent opacity-50" />
                <span className="absolute bottom-4 left-6 rounded-full bg-brand-950/85 px-4 py-1.5 font-ui text-xs font-bold text-lime-400 border border-lime-500/30 backdrop-blur-xs">
                  পূর্ববর্তী ব্যাচের সরাসরি আলোকচিত্র
                </span>
              </div>
            )}

            {/* Overview / Description */}
            <section className="rounded-3xl border border-sand/90 bg-white p-8 sm:p-12 xl:p-14 shadow-soft">
              <h2 className="font-display text-2xl sm:text-3xl xl:text-4xl font-bold text-ink">
                {messages.eventDetails.overviewTitle}
              </h2>
              <div className="mt-5 text-base sm:text-lg xl:text-xl leading-relaxed text-ink/85 font-sans">
                <p>{event.description}</p>
              </div>

              {/* Special Features */}
              {event.features && event.features.length > 0 && (
                <div className="mt-8 border-t border-sand pt-8">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-ink">
                    {messages.eventDetails.featuresTitle}
                  </h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {event.features.map(f => (
                      <div
                        key={f}
                        className="flex items-start gap-3 rounded-2xl bg-ivory p-4 text-base text-ink/90 border border-sand"
                      >
                        <CheckCircle2 className="size-5 text-brand-600 shrink-0 mt-0.5" />
                        <span className="font-sans">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Course Outline & Modules */}
            {event.courseOutline && event.courseOutline.length > 0 && (
              <section className="rounded-2xl border border-sand bg-white p-6 shadow-soft sm:p-8">
                <div className="flex items-center gap-2">
                  <BookOpen className="size-6 text-brand-700" />
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {messages.eventDetails.outlineTitle}
                  </h2>
                </div>

                <div className="mt-6 space-y-4">
                  {event.courseOutline.map((item, idx) => (
                    <div
                      key={item.title}
                      className="relative rounded-xl border border-sand bg-ivory/60 p-5 pl-12 transition-all hover:bg-white hover:shadow-sm"
                    >
                      {/* Step Number Badge */}
                      <span className="absolute left-4 top-5 grid size-6 place-items-center rounded-full bg-brand-800 font-ui text-xs font-bold text-ivory">
                        {toBengaliDigits(idx + 1)}
                      </span>

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="font-display text-lg font-bold text-ink">
                          {item.title}
                        </h4>
                        <span className="font-ui text-xs font-semibold text-brand-700">
                          {item.duration}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-muted">{item.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Eligibility Requirements */}
            {event.eligibility && event.eligibility.length > 0 && (
              <section className="rounded-2xl border border-sand bg-white p-6 shadow-soft sm:p-8">
                <div className="flex items-center gap-2">
                  <GraduationCap className="size-6 text-accent-700" />
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {messages.eventDetails.eligibilityTitle}
                  </h2>
                </div>

                <ul className="mt-4 space-y-3">
                  {event.eligibility.map((crit, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-ink/90">
                      <span className="mt-1 size-2 rounded-full bg-accent-500 shrink-0" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Trainers / Speakers Profiles */}
            {event.trainers && event.trainers.length > 0 && (
              <section className="rounded-2xl border border-sand bg-white p-6 shadow-soft sm:p-8">
                <div className="flex items-center gap-2">
                  <GraduationCap className="size-6 text-brand-600" />
                  <h2 className="font-display text-2xl font-bold text-ink">
                    {messages.eventDetails.trainersTitle}
                  </h2>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {event.trainers.map(tr => (
                    <div
                      key={tr.name}
                      className="rounded-xl border border-sand bg-ivory/60 p-4 transition-all hover:bg-white hover:shadow-sm"
                    >
                      <h4 className="font-display text-lg font-bold text-brand-950">
                        {tr.name}
                      </h4>
                      <p className="font-ui text-xs font-semibold text-brand-700 mt-0.5">
                        {tr.title}
                      </p>
                      <p className="font-ui text-xs text-muted mt-1">{tr.organization}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* CTA Application Box */}
            <div className="sticky top-24 rounded-2xl border-2 border-brand-800/30 bg-brand-950 p-6 text-ivory shadow-lg">
              <h3 className="font-display text-xl font-bold text-ivory">
                {messages.eventDetails.sidebarTitle}
              </h3>

              <div className="mt-6 space-y-4 border-y border-brand-800 py-5 font-ui text-base">
                <div className="flex items-center justify-between">
                  <span className="text-ivory/70">আসন সংখ্যা:</span>
                  <span className="font-bold text-lime-400">
                    {toBengaliDigits(event.seats)} জন
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ivory/70">আবেদনের শেষ তারিখ:</span>
                  <span className="font-bold text-accent-300">
                    {formatBengaliDate(event.applyClosesAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-ivory/70">আবেদন ফি:</span>
                  <span className="font-bold text-lime-400">বিনামূল্যে</span>
                </div>
              </div>

              {/* Main Action Button */}
              <div className="mt-8">
                {isUpcoming ? (
                  <Link
                    href={`/events/${event.slug}/apply`}
                    className="flex min-h-14 w-full items-center justify-center rounded-2xl accent-foil-bg px-8 font-ui text-lg font-bold text-brand-950 transition-all hover:brightness-110 shadow-lg cursor-pointer"
                  >
                    <span>{messages.eventDetails.applyButton}</span>
                    <ArrowRight className="ml-2.5 size-5" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-brand-900 px-8 font-ui text-lg font-semibold text-ivory/60 cursor-not-allowed"
                  >
                    {messages.eventDetails.appliedClosedButton}
                  </button>
                )}
              </div>

              <p className="mt-4 text-center text-sm text-ivory/70 font-ui">
                {messages.eventDetails.applyNote}
              </p>

              {/* Support Hotline */}
              <div className="mt-8 border-t border-brand-800 pt-6">
                <span className="font-ui text-sm font-semibold text-ivory/70">
                  {messages.eventDetails.helplineTitle}
                </span>
                <div className="mt-2.5 flex items-center gap-2.5">
                  <PhoneCall className="size-5 text-lime-400" />
                  <a
                    href={`tel:${CONTACT_INFO.phoneNumbers[0]?.raw}`}
                    className="font-ui text-base font-bold text-ivory hover:text-lime-300 transition-colors"
                  >
                    {CONTACT_INFO.phoneNumbers[0]?.number}
                  </a>
                </div>
              </div>
            </div>

            {/* Venue & Directions Card */}
            <div className="rounded-3xl border border-sand bg-white p-8 xl:p-10 shadow-soft">
              <h4 className="font-display text-xl font-bold text-ink">
                {messages.eventDetails.locationDirections}
              </h4>
              <p className="mt-3 text-base text-muted font-sans">{event.venue}</p>
              <div className="mt-4 text-sm text-ink/80 bg-sand/40 p-4 rounded-xl border border-sand font-sans">
                {CONTACT_INFO.locationLandmark}
              </div>
              <a
                href={CONTACT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-ui font-bold text-brand-700 hover:text-brand-900"
              >
                <span>গুগল ম্যাপে অবস্থান দেখুন</span>
                <ArrowRight className="size-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Official Digital Invitation & WhatsApp Proposal Card Section */}
        <section className="mt-16 border-t border-sand pt-14">
          <EventInvitationCard
            event={event}
            channelUrl={getWhatsAppChannelUrl()}
          />
        </section>

        {/* Other Upcoming Events Carousel / Strip */}
        {otherEvents.length > 0 && (
          <section className="mt-20 border-t border-sand pt-16">
            <h3 className="font-display text-3xl font-bold text-ink">
              {messages.eventDetails.relatedTitle}
            </h3>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {otherEvents.map(e => (
                <div
                  key={e.id}
                  className="rounded-3xl border border-sand bg-white p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="rounded-full bg-sand px-4 py-1.5 font-ui text-xs font-bold text-brand-900">
                    {e.type}
                  </span>
                  <h4 className="mt-4 font-display text-2xl font-bold text-ink">
                    <Link href={`/events/${e.slug}`} className="hover:text-brand-700">
                      {e.title}
                    </Link>
                  </h4>
                  <p className="mt-3 line-clamp-2 text-base text-muted font-sans">{e.description}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-sand/70 pt-4">
                    <span className="text-sm font-ui text-muted">
                      {formatBengaliDate(e.startsAt)}
                    </span>
                    <Link
                      href={`/events/${e.slug}`}
                      className="inline-flex items-center gap-1.5 text-base font-ui font-bold text-brand-800 hover:text-brand-600"
                    >
                      <span>বিস্তারিত</span>
                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
