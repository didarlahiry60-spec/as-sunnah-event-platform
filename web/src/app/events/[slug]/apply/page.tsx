import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { getEventBySlug } from "@/lib/events-data";
import { formatBengaliDate, toBengaliDigits } from "@/lib/format";
import { messages } from "@/lib/messages";
import { CONTACT_INFO } from "@/lib/sample-data";
import { ApplicationForm } from "@/components/events/ApplicationForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return {
      title: `আবেদন | ${messages.brand.name}`,
    };
  }

  return {
    title: `আবেদন: ${event.title} | ${messages.brand.name}`,
    description: `${event.title}-এর অনলাইন আবেদনপত্র।`,
  };
}

export default async function EventApplyPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header Banner */}
      <section className="bg-brand-950 pt-28 pb-14 text-ivory">
        <div className="mx-auto max-w-4xl px-5">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1.5 font-ui text-sm text-ivory/70 hover:text-lime-300 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span>{event.title}-এর বিস্তারিত পৃষ্ঠায় ফিরুন</span>
          </Link>

          <div className="mt-4 flex items-center gap-2">
            <span className="rounded-full bg-sand/20 px-3 py-0.5 font-ui text-xs font-bold text-lime-400 border border-lime-400/30">
              {messages.applyPage.badge}
            </span>
            <span className="font-ui text-xs text-ivory/70">
              {messages.applyPage.deadlineLabel} {formatBengaliDate(event.applyClosesAt)}
            </span>
          </div>

          <h1 className="mt-3 font-display text-2xl font-bold sm:text-4xl text-ivory">
            {event.title}
          </h1>
          <p className="mt-2 text-sm text-ivory/80">
            {messages.applyPage.venueLabel} {event.venue} • {messages.applyPage.seatsLabel} {toBengaliDigits(event.seats)} জন
          </p>
        </div>
      </section>

      {/* Main Container */}
      <main className="mx-auto max-w-4xl px-5 py-12">
        {/* No-login notice */}
        <div className="mb-8 rounded-2xl border border-lime-500/30 bg-lime-100/70 p-5 text-brand-950 shadow-soft">
          <div className="flex items-start gap-3.5">
            <ShieldCheck className="size-6 text-brand-700 shrink-0 mt-0.5" />
            <div>
              <h2 className="font-display text-lg font-bold text-brand-950">
                {messages.applyPage.noLoginNotice}
              </h2>
              <p className="mt-1 text-sm text-ink/80 leading-relaxed font-sans">
                {messages.applyPage.noLoginDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Live Interactive Application Form */}
        <ApplicationForm
          eventSlug={event.slug}
          eventTitle={event.title}
          venue={event.venue}
          seats={event.seats}
          formSchema={event.formSchema}
        />

        {/* Emergency helpline note */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-sand pt-6 text-xs text-muted gap-2">
          <span>জরুরি হেল্পলাইন: {CONTACT_INFO.phoneNumbers[1]?.number}</span>
          <span>ইমেইল: {CONTACT_INFO.emails[0]?.address}</span>
        </div>
      </main>
    </div>
  );
}
