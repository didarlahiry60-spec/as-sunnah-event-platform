"use client";

import { useState, useEffect } from "react";
import {
  Link2,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Radio,
  Loader2,
} from "lucide-react";
import { SAMPLE_EVENTS } from "@/lib/sample-data";
import { messages } from "@/lib/messages";
import { EventInvitationCard } from "@/components/events/EventInvitationCard";

export function AdminWhatsAppChannelConsole() {
  const [channelUrl, setChannelUrl] = useState<string>("");
  const [inputUrl, setInputUrl] = useState<string>("");
  const [savingUrl, setSavingUrl] = useState(false);
  const [urlSaved, setUrlSaved] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string>(SAMPLE_EVENTS[0]?.id || "");

  // Fetch active channel URL on mount
  useEffect(() => {
    async function fetchUrl() {
      try {
        const res = await fetch("/api/admin/settings/whatsapp");
        const data = await res.json();
        if (data.success && typeof data.url === "string") {
          setChannelUrl(data.url);
          setInputUrl(data.url);
        }
      } catch {
        // Fallback to empty
      }
    }
    fetchUrl();
  }, []);

  const handleSaveChannelUrl = async (e: React.FormEvent) => {
    e.preventDefault();

    setSavingUrl(true);
    setUrlSaved(false);

    try {
      const res = await fetch("/api/admin/settings/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: inputUrl.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setChannelUrl(data.url);
        setUrlSaved(true);
        setTimeout(() => setUrlSaved(false), 3000);
      } else {
        alert(data.error || "সংরক্ষণ করতে সমস্যা হয়েছে");
      }
    } catch {
      alert("নেটওয়ার্ক ত্রুটি। পুনরায় চেষ্টা করুন।");
    } finally {
      setSavingUrl(false);
    }
  };

  const selectedEvent = SAMPLE_EVENTS.find(e => e.id === selectedEventId) || SAMPLE_EVENTS[0];

  return (
    <div className="space-y-10">
      {/* 1. CHANNEL CONNECTION SETTINGS CARD - Light Theme */}
      <div className="rounded-3xl border border-sand/80 bg-white p-6 sm:p-10 text-ink shadow-soft">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-sand/60">
          <div className="flex items-center gap-4">
            <div className="grid size-12 place-items-center rounded-xl bg-ivory text-brand-800 border border-sand shrink-0">
              <Radio className="size-5" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-ink">
                অফিসিয়াল WhatsApp চ্যানেল সেটিংস
              </h2>
              <p className="mt-1 text-sm text-muted font-sans">
                আপনার আসল হোয়াটসঅ্যাপ চ্যানেলের লিংক এখানে যোগ করে সংরক্ষণ করুন।
              </p>
            </div>
          </div>

          <div className="shrink-0">
            {channelUrl ? (
              <span className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm font-ui font-semibold text-emerald-900">
                <ShieldCheck className="size-4 text-emerald-600" />
                <span>চ্যানেল সংযুক্ত রয়েছে</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-xl bg-ivory border border-sand px-4 py-2 text-sm font-ui font-medium text-muted">
                <span>এখনো কোনো লিংক যোগ করা হয়নি</span>
              </span>
            )}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSaveChannelUrl} className="mt-8">
          <label className="block font-ui text-sm font-bold text-ink mb-2">
            আপনার আস-সুন্নাহ হোয়াটসঅ্যাপ চ্যানেলের লিংক (WhatsApp Channel Invite URL):
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted" />
              <input
                type="url"
                value={inputUrl}
                onChange={e => setInputUrl(e.target.value)}
                placeholder="https://whatsapp.com/channel/..."
                className="w-full min-h-12 rounded-xl border border-sand bg-ivory/60 pl-12 pr-4 text-sm sm:text-base text-ink placeholder:text-muted focus:border-brand-600 focus:bg-white focus:outline-none font-ui transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={savingUrl}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-600 hover:bg-brand-700 px-6 font-ui text-sm sm:text-base font-bold text-white shadow-xs transition-colors cursor-pointer disabled:opacity-50 shrink-0"
            >
              {savingUrl ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle2 className="size-4" />}
              <span>{savingUrl ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}</span>
            </button>

            {channelUrl && (
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-sand bg-ivory px-5 font-ui text-sm font-semibold text-ink hover:bg-sand/40 transition-colors cursor-pointer shrink-0"
              >
                <ExternalLink className="size-4" />
                <span>চ্যানেল দেখুন</span>
              </a>
            )}
          </div>

          {urlSaved && (
            <p className="mt-3 text-sm font-ui font-bold text-emerald-700 flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600" />
              <span>চ্যানেল লিংকটি সফলভাবে সংরক্ষিত হয়েছে এবং পুরো ওয়েবসাইটে লাইভ হয়ে গেছে!</span>
            </p>
          )}
        </form>
      </div>

      {/* 2. EVENT INVITATION DISPATCHER & PREVIEW */}
      <div className="rounded-3xl border border-sand/90 bg-white p-6 sm:p-10 shadow-soft">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-sand">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-lime-100 px-3.5 py-1 text-xs font-bold text-brand-900 font-ui mb-2">
              <span className="size-2 rounded-full bg-brand-600" aria-hidden="true" />
              <span>লাইভ ইভেন্ট ইনভিটেশন ব্রডকাস্টার</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-ink">
              ইভেন্ট নির্বাচন ও ইনভিটেশন কার্ড
            </h3>
            <p className="mt-1 text-base text-muted font-sans">
              যে ইভেন্টটি আপনি চ্যানেলে পাঠাতে চান সেটি বেছে নিন। স্বয়ংক্রিয়ভাবে কার্ড ও সম্পূর্ণ ক্যাপশন প্রস্তুত হয়ে যাবে।
            </p>
          </div>

          {/* Event Picker Dropdown */}
          <div className="min-w-64">
            <label className="block text-xs font-ui font-bold text-muted mb-1.5">
              ইভেন্ট সিলেক্ট করুন:
            </label>
            <select
              value={selectedEventId}
              onChange={e => setSelectedEventId(e.target.value)}
              className="w-full min-h-12 rounded-xl border border-sand bg-ivory px-4 text-sm font-ui font-bold text-ink focus:border-brand-700 focus:outline-none"
            >
              {SAMPLE_EVENTS.map(ev => (
                <option key={ev.id} value={ev.id}>
                  {ev.title} ({ev.seats} আসন)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Invitation Card & Caption Generator */}
        <div className="mt-8">
          <EventInvitationCard
            event={selectedEvent}
            channelUrl={channelUrl}
          />
        </div>
      </div>
    </div>
  );
}
