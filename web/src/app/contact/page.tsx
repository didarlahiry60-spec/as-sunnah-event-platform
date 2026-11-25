import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Headphones, ExternalLink } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { messages } from "@/lib/messages";
import { getServerMessages } from "@/lib/i18n-server";
import { CONTACT_INFO } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: `${messages.contactPage.title} | ${messages.brand.name}`,
  description: messages.contactPage.subtitle,
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const { locale, t } = await getServerMessages();
  const isEn = locale === "en";

  return (
    <div className="min-h-screen bg-ivory">
      {/* Page Hero */}
      <section className="relative overflow-hidden bg-brand-950 pt-28 pb-16 text-ivory">
        <div className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-lime-500/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-lime-500/40 bg-brand-900/80 px-4 py-1.5 font-ui text-sm font-semibold text-lime-400">
                <Headphones className="size-4" />
                <span>{t.contactPage.badge}</span>
              </div>

              <h1 className="mt-4 font-display text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-ivory">
                {t.contactPage.title}
              </h1>

              <p className="mt-4 max-w-3xl text-lg sm:text-xl xl:text-2xl text-ivory/80 leading-relaxed font-sans">
                {t.contactPage.subtitle}
              </p>
            </div>

            {/* Quick KPI stats in Hero Header */}
            <div className="flex flex-wrap gap-4 font-ui text-sm">
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">{isEn ? "Emergency Helpline" : "জরুরি হেল্পলাইন"}</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-lime-400">
                  {isEn ? "09610-001089" : "০৯৬১০-০০১০৮৯"}
                </span>
              </div>
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">{isEn ? "Call Center Hours" : "কল সেন্টার সময়সূচি"}</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-accent-500">
                  {isEn ? "8:00 AM — 10:00 PM" : "সকাল ৮টা — রাত ১০টা"}
                </span>
              </div>
              <div className="rounded-2xl border border-brand-800 bg-brand-900/70 px-5 py-3.5 backdrop-blur-xs shadow-md">
                <span className="text-ivory/70 block text-xs sm:text-sm">{isEn ? "Complex Location" : "কমপ্লেক্স লোকেশন"}</span>
                <span className="font-display text-xl sm:text-2xl font-bold text-lime-300">
                  {isEn ? "Aftabnagar, Dhaka" : "আফতাবনগর, ঢাকা"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Info on Left, Interactive Form on Right */}
      <main className="mx-auto w-full max-w-[97%] 2xl:max-w-[1900px] px-3 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="grid gap-10 xl:gap-14 lg:grid-cols-12 items-start">
          {/* Contact Details (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Office Address Card */}
            <div className="rounded-3xl border border-sand/90 bg-white p-8 xl:p-10 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-lime-100 text-brand-800 shrink-0">
                  <MapPin className="size-7" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {messages.contactPage.officeHeading}
                  </h3>
                  <p className="mt-3 text-base xl:text-lg leading-relaxed text-ink/85 font-sans">
                    {CONTACT_INFO.address}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {CONTACT_INFO.locationLandmark}
                  </p>
                  <a
                    href={CONTACT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 font-ui text-sm sm:text-base font-bold text-brand-700 hover:text-brand-900"
                  >
                    <span>গুগল ম্যাপে সরাসরি দেখুন</span>
                    <ExternalLink className="size-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Hotlines Card */}
            <div className="rounded-3xl border border-sand/90 bg-white p-8 xl:p-10 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-lime-100 text-brand-800 shrink-0">
                  <Phone className="size-7" />
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="font-display text-2xl font-bold text-ink">
                    {messages.contactPage.hotlineHeading}
                  </h3>
                  <div className="space-y-3">
                    {CONTACT_INFO.phoneNumbers.map(ph => (
                      <div key={ph.raw} className="flex items-center justify-between text-sm sm:text-base font-ui border-b border-sand/60 pb-2">
                        <span className="text-muted font-medium">{ph.label}:</span>
                        <a
                          href={`tel:${ph.raw}`}
                          className="font-bold text-brand-900 hover:text-brand-600 transition-colors"
                        >
                          {ph.number}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="rounded-3xl border border-sand/90 bg-white p-8 xl:p-10 shadow-soft">
              <div className="flex items-start gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-lime-100 text-brand-800 shrink-0">
                  <Mail className="size-7" />
                </div>
                <div className="space-y-4 flex-1">
                  <h3 className="font-display text-2xl font-bold text-ink">
                    অফিসিয়াল ইমেইল
                  </h3>
                  <div className="space-y-3">
                    {CONTACT_INFO.emails.map(em => (
                      <div key={em.address} className="flex items-center justify-between text-sm sm:text-base font-ui border-b border-sand/60 pb-2">
                        <span className="text-muted font-medium">{em.label}:</span>
                        <a
                          href={`mailto:${em.address}`}
                          className="font-bold text-brand-900 hover:text-brand-600 transition-colors"
                        >
                          {em.address}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div className="rounded-3xl border border-sand bg-brand-950 p-8 xl:p-10 text-ivory shadow-soft">
              <div className="flex items-start gap-4">
                <div className="grid size-14 place-items-center rounded-2xl bg-brand-900 text-lime-400 shrink-0 border border-lime-500/30">
                  <Clock className="size-7" />
                </div>
                <div className="space-y-3 flex-1">
                  <h3 className="font-display text-2xl font-bold text-ivory">
                    {messages.contactPage.hoursHeading}
                  </h3>
                  <div className="space-y-2.5 font-ui text-sm sm:text-base text-ivory/80">
                    {CONTACT_INFO.officeHours.map(h => (
                      <div key={h.days} className="flex items-center justify-between border-b border-brand-800/80 pb-2">
                        <span>{h.days}</span>
                        <span className="font-bold text-lime-400">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
}
