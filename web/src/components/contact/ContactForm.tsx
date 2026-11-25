"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2, RotateCcw } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { normalizeBdPhone } from "@/lib/format";

interface FormState {
  name: string;
  phone: string;
  email: string;
  category: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  category?: string;
  subject?: string;
  message?: string;
  general?: string;
}

const INITIAL_STATE: FormState = {
  name: "",
  phone: "",
  email: "",
  category: "IMAM",
  subject: "",
  message: "",
};

export function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.name.trim()) {
      errs.name = "আপনার পূর্ণ নাম লিখুন";
    }

    // BD Phone validation: Supports Bengali digits, dashes, spaces, and +88/88 prefix
    const cleanPhone = normalizeBdPhone(formData.phone);
    if (!formData.phone.trim()) {
      errs.phone = "আপনার সক্রিয় মোবাইল নম্বর লিখুন";
    } else if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      errs.phone = "সঠিক ১১ ডিজিটের মোবাইল নম্বর লিখুন (যেমন: ০১৭XXXXXXXX)";
    }

    // Email validation if provided
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "সঠিক ইমেইল ঠিকানা প্রদান করুন";
    }

    if (!formData.subject.trim()) {
      errs.subject = "বার্তার বিষয়টি উল্লেখ করুন";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "অনুগ্রহ করে বিস্তারিত বার্তা লিখুন (ন্যূনতম ১০ অক্ষর)";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrors({ general: data.error || "বার্তা পাঠাতে সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।" });
      } else {
        setIsSuccess(true);
        setFormData(INITIAL_STATE);
      }
    } catch {
      setErrors({ general: "নেটওয়ার্ক সংযোগ ত্রুটি। পুনরায় চেষ্টা করুন।" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="rounded-3xl border-2 border-lime-500/40 bg-lime-100/70 p-8 text-center sm:p-12 shadow-soft">
        <div className="mx-auto mb-4 grid size-16 place-items-center rounded-full bg-brand-800 text-lime-400">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="font-display text-2xl font-bold text-brand-950 sm:text-3xl">
          {t.contactPage.successHeading}
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base leading-relaxed text-ink/85 font-sans">
          {t.contactPage.successText}
        </p>

        <button
          onClick={() => setIsSuccess(false)}
          className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-900 px-6 font-ui text-sm font-semibold text-ivory hover:bg-brand-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="size-4" />
          <span>{t.contactPage.sendAnother}</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-3xl border border-sand/90 bg-white p-8 sm:p-12 xl:p-14 shadow-soft">
      <div className="mb-8 border-b border-sand/70 pb-6">
        <h3 className="font-display text-2xl sm:text-3xl xl:text-4xl font-bold text-ink">
          {t.contactPage.formHeading}
        </h3>
        <p className="mt-2 text-base xl:text-lg text-muted font-sans">
          {t.contactPage.formSubtitle}
        </p>

        {errors.general && (
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 font-ui text-sm text-red-700">
            <AlertCircle className="size-5 shrink-0 text-red-600" />
            <span>{errors.general}</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Name & Phone */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="block font-ui text-sm sm:text-base font-bold text-ink/90 mb-2">
              {t.contactPage.nameLabel} <span className="text-danger">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder={t.contactPage.namePlaceholder}
              className={`w-full min-h-13 rounded-2xl border bg-ivory/50 px-5 py-3 text-base font-sans text-ink placeholder:text-muted focus:bg-white focus:outline-none transition-colors ${
                errors.name ? "border-danger" : "border-sand focus:border-brand-600"
              }`}
            />
            {errors.name && (
              <p className="mt-1.5 flex items-center gap-1 font-ui text-xs sm:text-sm text-danger">
                <AlertCircle className="size-3.5" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-phone" className="block font-ui text-sm sm:text-base font-bold text-ink/90 mb-2">
              {t.contactPage.phoneLabel} <span className="text-danger">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder={t.contactPage.phonePlaceholder}
              className={`w-full min-h-13 rounded-2xl border bg-ivory/50 px-5 py-3 text-base font-sans text-ink placeholder:text-muted focus:bg-white focus:outline-none transition-colors ${
                errors.phone ? "border-danger" : "border-sand focus:border-brand-600"
              }`}
            />
            {errors.phone && (
              <p className="mt-1.5 flex items-center gap-1 font-ui text-xs sm:text-sm text-danger">
                <AlertCircle className="size-3.5" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Email & Category */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-email" className="block font-ui text-sm sm:text-base font-bold text-ink/90 mb-2">
              {t.contactPage.emailLabel}
            </label>
            <input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder={t.contactPage.emailPlaceholder}
              className={`w-full min-h-13 rounded-2xl border bg-ivory/50 px-5 py-3 text-base font-sans text-ink placeholder:text-muted focus:bg-white focus:outline-none transition-colors ${
                errors.email ? "border-danger" : "border-sand focus:border-brand-600"
              }`}
            />
            {errors.email && (
              <p className="mt-1.5 flex items-center gap-1 font-ui text-xs sm:text-sm text-danger">
                <AlertCircle className="size-3.5" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-category" className="block font-ui text-sm sm:text-base font-bold text-ink/90 mb-2">
              {t.contactPage.categoryLabel}
            </label>
            <select
              id="contact-category"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              className="w-full min-h-13 rounded-2xl border border-sand bg-ivory/50 px-5 py-3 font-ui text-base text-ink focus:border-brand-600 focus:bg-white focus:outline-none transition-colors"
            >
              {t.contactPage.categoryOptions.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="contact-subject" className="block font-ui text-sm sm:text-base font-bold text-ink/90 mb-2">
            {t.contactPage.subjectLabel} <span className="text-danger">*</span>
          </label>
          <input
            id="contact-subject"
            type="text"
            value={formData.subject}
            onChange={e => setFormData({ ...formData, subject: e.target.value })}
            placeholder={t.contactPage.subjectPlaceholder}
            className={`w-full min-h-13 rounded-2xl border bg-ivory/50 px-5 py-3 text-base font-sans text-ink placeholder:text-muted focus:bg-white focus:outline-none transition-colors ${
              errors.subject ? "border-danger" : "border-sand focus:border-brand-600"
            }`}
          />
          {errors.subject && (
            <p className="mt-1.5 flex items-center gap-1 font-ui text-xs sm:text-sm text-danger">
              <AlertCircle className="size-3.5" />
              <span>{errors.subject}</span>
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className="block font-ui text-sm sm:text-base font-bold text-ink/90 mb-2">
            {t.contactPage.messageLabel} <span className="text-danger">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
            placeholder={t.contactPage.messagePlaceholder}
            className={`w-full rounded-2xl border bg-ivory/50 p-5 text-base text-ink placeholder:text-muted focus:bg-white focus:outline-none transition-colors font-sans leading-relaxed ${
              errors.message ? "border-danger" : "border-sand focus:border-brand-600"
            }`}
          />
          {errors.message && (
            <p className="mt-1.5 flex items-center gap-1 font-ui text-xs sm:text-sm text-danger">
              <AlertCircle className="size-3.5" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex min-h-14 w-full sm:w-auto items-center justify-center gap-2.5 rounded-2xl accent-foil-bg px-10 font-ui text-base sm:text-lg font-bold text-brand-950 transition-all hover:brightness-110 shadow-lg cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                <span>{t.contactPage.submitting}</span>
              </>
            ) : (
              <>
                <span>{t.contactPage.submitButton}</span>
                <Send className="size-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
