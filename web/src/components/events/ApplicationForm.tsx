"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Building2,
  GraduationCap,
  Search,
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { BD_DIVISIONS } from "@/lib/geo-data";
import { normalizeBdPhone } from "@/lib/format";
import { messages } from "@/lib/messages";
import { PersonCategory } from "@prisma/client";
import { FormFieldSchema } from "@/lib/sample-data";

interface Props {
  eventSlug: string;
  eventTitle: string;
  venue: string;
  seats: number;
  formSchema?: FormFieldSchema[];
}

export function ApplicationForm({ eventSlug, eventTitle, formSchema }: Props) {
  const router = useRouter();

  // Form states
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState<PersonCategory>(PersonCategory.IMAM);
  const [mosqueName, setMosqueName] = useState("");
  const [division, setDivision] = useState("ঢাকা");
  const [district, setDistrict] = useState("ঢাকা");
  const [upazila, setUpazila] = useState("");
  const [unionName, setUnionName] = useState("");

  // Dynamic answers dictionary
  const [answers, setAnswers] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {
      qualification: "দাওরায়ে হাদিস / কামিল / মাস্টার্স",
      experienceYears: "২ থেকে ৫ বছর",
      motivation: "",
      hasSmartphone: true,
      age: "",
    };
    if (formSchema && formSchema.length > 0) {
      formSchema.forEach(field => {
        if (field.defaultValue !== undefined) {
          initial[field.id] = field.defaultValue;
        } else if (field.type === "checkbox") {
          initial[field.id] = true;
        } else {
          initial[field.id] = "";
        }
      });
    }
    return initial;
  });

  const updateAnswer = (key: string, value: unknown) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  // Status & Validation
  const [checkingPrefill, setCheckingPrefill] = useState(false);
  const [prefillFound, setPrefillFound] = useState<{
    name: string;
    category: PersonCategory;
    division?: string | null;
    district?: string | null;
    upazila?: string | null;
    unionName?: string | null;
    mosqueName?: string | null;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Districts for currently selected division
  const currentDivisionObj = BD_DIVISIONS.find(d => d.nameBn === division) || BD_DIVISIONS[0];
  const availableDistricts = currentDivisionObj.districts;

  // Handle Division change
  const handleDivisionChange = (newDiv: string) => {
    setDivision(newDiv);
    const divObj = BD_DIVISIONS.find(d => d.nameBn === newDiv);
    if (divObj && divObj.districts.length > 0) {
      setDistrict(divObj.districts[0].nameBn);
    }
  };

  // Convert Bengali numerals on mobile change and check prefill
  const handleMobileChange = (val: string) => {
    setMobile(val);
    setPrefillFound(null);

    const norm = normalizeBdPhone(val);
    if (/^01[3-9]\d{8}$/.test(norm)) {
      checkPrefill(norm);
    }
  };

  // Check prefill API
  const checkPrefill = async (phoneToCheck?: string) => {
    const p = phoneToCheck || normalizeBdPhone(mobile);
    if (!p || p.length < 11) {
      setErrors(prev => ({ ...prev, mobile: "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন" }));
      return;
    }

    setCheckingPrefill(true);
    setGeneralError(null);

    try {
      const res = await fetch(`/api/applications/prefill?mobile=${encodeURIComponent(p)}`);
      const data = await res.json();

      if (data.found && data.person) {
        setPrefillFound(data.person);
      } else {
        setPrefillFound(null);
      }
    } catch (err) {
      console.error("Prefill check failed:", err);
    } finally {
      setCheckingPrefill(false);
    }
  };

  // Apply prefill data (safe against applying masked asterisks)
  const applyPrefillData = () => {
    if (!prefillFound) return;
    if (prefillFound.name && !prefillFound.name.includes("*")) setName(prefillFound.name);
    if (prefillFound.category) setCategory(prefillFound.category);
    if (prefillFound.mosqueName && !prefillFound.mosqueName.includes("*")) setMosqueName(prefillFound.mosqueName);
    if (prefillFound.division) {
      setDivision(prefillFound.division);
      const divObj = BD_DIVISIONS.find(d => d.nameBn === prefillFound.division);
      if (divObj && prefillFound.district) {
        setDistrict(prefillFound.district);
      }
    }
    if (prefillFound.upazila && !prefillFound.upazila.includes("*")) setUpazila(prefillFound.upazila);
    if (prefillFound.unionName && !prefillFound.unionName.includes("*")) setUnionName(prefillFound.unionName);
    setPrefillFound(null);
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);

    // Client-side quick checks
    const newErrors: Record<string, string> = {};
    const normPhone = normalizeBdPhone(mobile);
    if (!/^01[3-9]\d{8}$/.test(normPhone)) {
      newErrors.mobile = "সঠিক ১১ ডিজিটের বাংলাদেশী মোবাইল নম্বর প্রদান করুন (যেমন: ০১৭১২৩৪৫৬৭৮)";
    }
    if (!name.trim() || name.trim().length < 2) {
      newErrors.name = "আপনার পূর্ণ নাম ন্যূনতম ২ অক্ষরের হতে হবে";
    }
    if (!mosqueName.trim() || mosqueName.trim().length < 2) {
      newErrors.mosqueName = "মসজিদ বা প্রতিষ্ঠানের নাম প্রদান করুন";
    }
    const qual = String(answers.qualification || "").trim();
    if (!qual) {
      newErrors.qualification = "সর্বোচ্চ শিক্ষাগত যোগ্যতা নির্বাচন করুন";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        eventSlug,
        name: name.trim(),
        mobile: normPhone,
        category,
        division,
        district,
        upazila: upazila.trim(),
        unionName: unionName.trim(),
        mosqueName: mosqueName.trim(),
        answers: {
          ...answers,
          qualification: qual || "দাওরায়ে হাদিস / কামিল / মাস্টার্স",
          experienceYears: answers.experienceYears || "২ থেকে ৫ বছর",
          motivation: String(answers.motivation || "").trim(),
          hasSmartphone: Boolean(answers.hasSmartphone ?? true),
        },
      };

      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.issues && Array.isArray(data.issues)) {
          const fieldErrors: Record<string, string> = {};
          data.issues.forEach((iss: { path: string; message: string }) => {
            fieldErrors[iss.path] = iss.message;
          });
          setErrors(fieldErrors);
        } else {
          setGeneralError(data.error || "আবেদন জমা দিতে সমস্যা হয়েছে");
        }
        setSubmitting(false);
        return;
      }

      // Success! Redirect to confirmation and digital pass page with secure authorization token
      const tokenParam = data.qrToken ? `&token=${encodeURIComponent(data.qrToken)}` : "";
      router.push(`/events/${eventSlug}/apply/success?appNumber=${encodeURIComponent(data.applicationNumber)}${tokenParam}`);
    } catch (err) {
      console.error("Submission failed:", err);
      setGeneralError("ইন্টারনেট সংযোগ বা সার্ভার জটিলতার কারণে আবেদন সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* General Error Banner */}
      {generalError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800 flex items-start gap-3">
          <AlertCircle className="size-5 shrink-0 mt-0.5" />
          <p className="text-sm font-sans font-medium">{generalError}</p>
        </div>
      )}

      {/* SECTION 1: Mobile & Basic Info */}
      <div className="rounded-2xl border border-sand bg-white p-6 shadow-soft sm:p-8">
        <div className="flex items-center gap-3 border-b border-sand pb-4">
          <div className="grid size-10 place-items-center rounded-xl bg-brand-100 text-brand-900">
            <User className="size-5" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              {messages.applyPage.sectionBasicInfo}
            </h2>
            <p className="text-xs text-muted font-sans mt-0.5">
              {eventTitle}-এ আবেদনের জন্য কোনো পাসওয়ার্ডের ঝামেলা নেই। আপনার মোবাইল নম্বরই আপনার পরিচয়।
            </p>
          </div>
        </div>

        {/* Mobile Number Input with Auto Prefill */}
        <div className="mt-6 space-y-2">
          <label htmlFor="mobile" className="block font-ui text-sm font-semibold text-ink">
            {messages.applyPage.phoneLabel} <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 text-muted" />
              <input
                id="mobile"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={mobile}
                onChange={e => handleMobileChange(e.target.value)}
                placeholder="০১XXXXXXXXX"
                aria-invalid={Boolean(errors.mobile)}
                aria-describedby={errors.mobile ? "mobile-error" : undefined}
                className={`w-full rounded-xl border bg-ivory/40 pl-11 pr-4 py-3 font-sans text-base text-ink placeholder:text-muted/60 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 ${
                  errors.mobile ? "border-red-400" : "border-sand focus:border-brand-600"
                }`}
                style={{ minHeight: "48px" }}
                required
              />
            </div>
            <button
              type="button"
              onClick={() => checkPrefill()}
              disabled={checkingPrefill}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-sand/60 px-5 font-ui text-sm font-bold text-brand-950 transition hover:bg-sand active:scale-[0.98] disabled:opacity-50 cursor-pointer"
            >
              {checkingPrefill ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>অনুসন্ধান চলছে...</span>
                </>
              ) : (
                <>
                  <Search className="size-4 text-brand-700" />
                  <span>{messages.applyPage.checkPrefillButton}</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-muted font-sans">{messages.applyPage.phoneHint}</p>
          {errors.mobile && (
            <p id="mobile-error" role="alert" className="text-xs font-semibold text-red-600">
              {errors.mobile}
            </p>
          )}

          {/* 1-Click Auto-Fill Notification Banner */}
          {prefillFound && (
            <div className="mt-3 rounded-xl border border-lime-400/40 bg-lime-100/70 p-4 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="size-5 text-brand-700 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-ui text-sm font-bold text-brand-950">
                      {messages.applyPage.prefillFoundAlert} ({prefillFound.name})
                    </h4>
                    <p className="text-xs text-ink/80 font-sans mt-0.5">
                      {messages.applyPage.prefillFoundDesc}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={applyPrefillData}
                  className="inline-flex min-h-10 items-center justify-center rounded-lg bg-brand-800 px-4 font-ui text-xs font-bold text-ivory transition hover:bg-brand-900 cursor-pointer shrink-0"
                >
                  {messages.applyPage.prefillApplyButton}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Full Name */}
        <div className="mt-6 space-y-2">
          <label htmlFor="name" className="block font-ui text-sm font-semibold text-ink">
            {messages.applyPage.nameLabel} <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder={messages.applyPage.namePlaceholder}
            className={`w-full rounded-xl border bg-ivory/40 px-4 py-3 font-sans text-base text-ink placeholder:text-muted/60 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 ${
              errors.name ? "border-red-400" : "border-sand focus:border-brand-600"
            }`}
            style={{ minHeight: "48px" }}
            required
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-xs font-semibold text-red-600">
              {errors.name}
            </p>
          )}
        </div>
      </div>

      {/* SECTION 2: Role, Mosque & Address */}
      <div className="rounded-2xl border border-sand bg-white p-6 shadow-soft sm:p-8">
        <div className="flex items-center gap-3 border-b border-sand pb-4">
          <div className="grid size-10 place-items-center rounded-xl bg-brand-100 text-brand-900">
            <Building2 className="size-5" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              {messages.applyPage.sectionDemographics}
            </h2>
            <p className="text-xs text-muted font-sans mt-0.5">
              অঞ্চলভিত্তিক কোটা ও নির্বাচন মূল্যায়নের জন্য সঠিক ঠিকানা দিন।
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="category" className="block font-ui text-sm font-semibold text-ink">
              {messages.applyPage.categoryLabel} <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value as PersonCategory)}
              className="w-full rounded-xl border border-sand bg-ivory/40 px-4 py-3 font-sans text-base text-ink transition focus:outline-none focus:ring-2 focus:ring-accent-500"
              style={{ minHeight: "48px" }}
            >
              <option value={PersonCategory.IMAM}>{messages.applyPage.categories.IMAM}</option>
              <option value={PersonCategory.MADRASA_TEACHER}>{messages.applyPage.categories.MADRASA_TEACHER}</option>
              <option value={PersonCategory.MADRASA_MANAGER}>{messages.applyPage.categories.MADRASA_MANAGER}</option>
              <option value={PersonCategory.VOLUNTEER}>{messages.applyPage.categories.VOLUNTEER}</option>
              <option value={PersonCategory.OTHER}>{messages.applyPage.categories.OTHER}</option>
            </select>
          </div>

          {/* Mosque or Institution Name */}
          <div className="space-y-2">
            <label htmlFor="mosqueName" className="block font-ui text-sm font-semibold text-ink">
              {messages.applyPage.mosqueLabel} <span className="text-red-500">*</span>
            </label>
            <input
              id="mosqueName"
              type="text"
              value={mosqueName}
              onChange={e => setMosqueName(e.target.value)}
              placeholder={messages.applyPage.mosquePlaceholder}
              className={`w-full rounded-xl border bg-ivory/40 px-4 py-3 font-sans text-base text-ink placeholder:text-muted/60 transition focus:outline-none focus:ring-2 ${
                errors.mosqueName ? "border-red-400 focus:ring-red-400" : "border-sand focus:ring-accent-500"
              }`}
              style={{ minHeight: "48px" }}
              required
            />
            {errors.mosqueName && <p className="text-xs font-semibold text-red-600">{errors.mosqueName}</p>}
          </div>

          {/* Division */}
          <div className="space-y-2">
            <label htmlFor="division" className="block font-ui text-sm font-semibold text-ink">
              {messages.applyPage.divisionLabel} <span className="text-red-500">*</span>
            </label>
            <select
              id="division"
              value={division}
              onChange={e => handleDivisionChange(e.target.value)}
              className="w-full rounded-xl border border-sand bg-ivory/40 px-4 py-3 font-sans text-base text-ink transition focus:outline-none focus:ring-2 focus:ring-accent-500"
              style={{ minHeight: "48px" }}
            >
              {BD_DIVISIONS.map(d => (
                <option key={d.nameBn} value={d.nameBn}>
                  {d.nameBn} বিভাগ
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="space-y-2">
            <label htmlFor="district" className="block font-ui text-sm font-semibold text-ink">
              {messages.applyPage.districtLabel} <span className="text-red-500">*</span>
            </label>
            <select
              id="district"
              value={district}
              onChange={e => setDistrict(e.target.value)}
              className="w-full rounded-xl border border-sand bg-ivory/40 px-4 py-3 font-sans text-base text-ink transition focus:outline-none focus:ring-2 focus:ring-accent-500"
              style={{ minHeight: "48px" }}
            >
              {availableDistricts.map(dist => (
                <option key={dist.nameBn} value={dist.nameBn}>
                  {dist.nameBn} {dist.isPriority ? "★ (অগ্রাধিকার জেলা)" : ""}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div className="space-y-2">
            <label htmlFor="upazila" className="block font-ui text-sm font-semibold text-ink">
              {messages.applyPage.upazilaLabel}
            </label>
            <input
              id="upazila"
              type="text"
              value={upazila}
              onChange={e => setUpazila(e.target.value)}
              placeholder={messages.applyPage.upazilaPlaceholder}
              className="w-full rounded-xl border border-sand bg-ivory/40 px-4 py-3 font-sans text-base text-ink placeholder:text-muted/60 transition focus:outline-none focus:ring-2 focus:ring-accent-500"
              style={{ minHeight: "48px" }}
            />
          </div>

          {/* Union / Area */}
          <div className="space-y-2">
            <label htmlFor="unionName" className="block font-ui text-sm font-semibold text-ink">
              {messages.applyPage.unionLabel}
            </label>
            <input
              id="unionName"
              type="text"
              value={unionName}
              onChange={e => setUnionName(e.target.value)}
              placeholder={messages.applyPage.unionPlaceholder}
              className="w-full rounded-xl border border-sand bg-ivory/40 px-4 py-3 font-sans text-base text-ink placeholder:text-muted/60 transition focus:outline-none focus:ring-2 focus:ring-accent-500"
              style={{ minHeight: "48px" }}
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Qualification, Experience & Dynamic Answers */}
      <div className="rounded-2xl border border-sand bg-white p-6 shadow-soft sm:p-8">
        <div className="flex items-center gap-3 border-b border-sand pb-4">
          <div className="grid size-10 place-items-center rounded-xl bg-brand-100 text-brand-900">
            <GraduationCap className="size-5" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              {messages.applyPage.sectionDynamicQuestions}
            </h2>
            <p className="text-xs text-muted font-sans mt-0.5">
              এই তথ্যের ভিত্তিতে আমাদের স্মার্ট অটো-স্ক্রিনিং ইঞ্জিন স্কোর নির্ধারণ করবে।
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {formSchema && formSchema.length > 0 ? (
            <div className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {formSchema
                  .filter(f => f.type === "select" || f.type === "number" || f.type === "text")
                  .map(f => (
                    <div key={f.id} className="space-y-2">
                      <label htmlFor={f.id} className="block font-ui text-sm font-semibold text-ink">
                        {f.label} {f.required && <span className="text-red-500">*</span>}
                      </label>
                      {f.type === "select" ? (
                        <select
                          id={f.id}
                          value={String(answers[f.id] ?? f.defaultValue ?? "")}
                          onChange={e => updateAnswer(f.id, e.target.value)}
                          className="w-full rounded-xl border border-sand bg-ivory/40 px-4 py-3 font-sans text-base text-ink transition focus:outline-none focus:ring-2 focus:ring-accent-500 cursor-pointer"
                          style={{ minHeight: "48px" }}
                        >
                          {f.options?.map(opt => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={f.id}
                          type={f.type === "number" ? "number" : "text"}
                          value={String(answers[f.id] ?? "")}
                          onChange={e => updateAnswer(f.id, e.target.value)}
                          placeholder={f.placeholder}
                          className="w-full rounded-xl border border-sand bg-ivory/40 px-4 py-3 font-sans text-base text-ink placeholder:text-muted/60 transition focus:outline-none focus:ring-2 focus:ring-accent-500"
                          style={{ minHeight: "48px" }}
                        />
                      )}
                      {f.description && (
                        <p className="text-xs text-muted font-sans">{f.description}</p>
                      )}
                      {errors[f.id] && (
                        <p className="text-xs font-semibold text-red-600">{errors[f.id]}</p>
                      )}
                    </div>
                  ))}
              </div>

              {formSchema
                .filter(f => f.type === "textarea")
                .map(f => (
                  <div key={f.id} className="space-y-2">
                    <label htmlFor={f.id} className="block font-ui text-sm font-semibold text-ink">
                      {f.label} {f.required && <span className="text-red-500">*</span>}
                    </label>
                    <textarea
                      id={f.id}
                      rows={3}
                      value={String(answers[f.id] ?? "")}
                      onChange={e => updateAnswer(f.id, e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full rounded-xl border border-sand bg-ivory/40 px-4 py-3 font-sans text-base text-ink placeholder:text-muted/60 transition focus:outline-none focus:ring-2 focus:ring-accent-500"
                    />
                    {f.description && (
                      <p className="text-xs text-muted font-sans">{f.description}</p>
                    )}
                  </div>
                ))}

              {formSchema
                .filter(f => f.type === "checkbox")
                .map(f => (
                  <div key={f.id} className="rounded-xl border border-sand bg-ivory/50 p-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Boolean(answers[f.id] ?? true)}
                        onChange={e => updateAnswer(f.id, e.target.checked)}
                        className="size-5 rounded border-sand text-brand-600 focus:ring-brand-500 mt-0.5 cursor-pointer"
                      />
                      <div className="text-sm font-sans text-ink leading-relaxed">
                        <span className="font-semibold block font-ui">{f.label}</span>
                        {f.description}
                      </div>
                    </label>
                  </div>
                ))}
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Qualification */}
                <div className="space-y-2">
                  <label htmlFor="qualification" className="block font-ui text-sm font-semibold text-ink">
                    {messages.applyPage.qualificationLabel} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="qualification"
                    value={String(answers.qualification || "দাওরায়ে হাদিস / কামিল / মাস্টার্স")}
                    onChange={e => updateAnswer("qualification", e.target.value)}
                    className="w-full rounded-xl border border-sand bg-ivory/40 px-4 py-3 font-sans text-base text-ink transition focus:outline-none focus:ring-2 focus:ring-accent-500 cursor-pointer"
                    style={{ minHeight: "48px" }}
                  >
                    <option value="দাওরায়ে হাদিস / কামিল / মাস্টার্স">
                      {messages.applyPage.qualifications.dawra} (সর্বোচ্চ স্কোর)
                    </option>
                    <option value="ফাজিল / স্নাতক (ডিগ্রি/অনার্স)">
                      {messages.applyPage.qualifications.fazil}
                    </option>
                    <option value="আলিম / এইচএসসি সমমান">
                      {messages.applyPage.qualifications.alim}
                    </option>
                    <option value="দাখিল / এসএসসি সমমান">
                      {messages.applyPage.qualifications.dakhil}
                    </option>
                    <option value="হিফজুল কুরআন">
                      {messages.applyPage.qualifications.hafiz}
                    </option>
                    <option value="অন্যান্য">{messages.applyPage.qualifications.other}</option>
                  </select>
                </div>

                {/* Experience */}
                <div className="space-y-2">
                  <label htmlFor="experienceYears" className="block font-ui text-sm font-semibold text-ink">
                    {messages.applyPage.experienceLabel} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="experienceYears"
                    value={String(answers.experienceYears || "২ থেকে ৫ বছর")}
                    onChange={e => updateAnswer("experienceYears", e.target.value)}
                    className="w-full rounded-xl border border-sand bg-ivory/40 px-4 py-3 font-sans text-base text-ink transition focus:outline-none focus:ring-2 focus:ring-accent-500 cursor-pointer"
                    style={{ minHeight: "48px" }}
                  >
                    <option value="১০ বছরের বেশি">
                      {messages.applyPage.experienceOptions.moreThanTen} (১০+ বছর)
                    </option>
                    <option value="৫ থেকে ১০ বছর">
                      {messages.applyPage.experienceOptions.fiveToTen}
                    </option>
                    <option value="২ থেকে ৫ বছর">
                      {messages.applyPage.experienceOptions.twoToFive}
                    </option>
                    <option value="২ বছরের কম">
                      {messages.applyPage.experienceOptions.lessThanTwo}
                    </option>
                  </select>
                </div>
              </div>

              {/* Motivation */}
              <div className="space-y-2">
                <label htmlFor="motivation" className="block font-ui text-sm font-semibold text-ink">
                  {messages.applyPage.motivationLabel}
                </label>
                <textarea
                  id="motivation"
                  rows={3}
                  value={String(answers.motivation || "")}
                  onChange={e => updateAnswer("motivation", e.target.value)}
                  placeholder={messages.applyPage.motivationPlaceholder}
                  className="w-full rounded-xl border border-sand bg-ivory/40 px-4 py-3 font-sans text-base text-ink placeholder:text-muted/60 transition focus:outline-none focus:ring-2 focus:ring-accent-500"
                />
              </div>

              {/* Smartphone Checkbox */}
              <div className="rounded-xl border border-sand bg-ivory/50 p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(answers.hasSmartphone ?? true)}
                    onChange={e => updateAnswer("hasSmartphone", e.target.checked)}
                    className="size-5 rounded border-sand text-brand-600 focus:ring-brand-500 mt-0.5 cursor-pointer"
                  />
                  <div className="text-sm font-sans text-ink leading-relaxed">
                    <span className="font-semibold block font-ui">
                      স্মার্টফোন ও প্ল্যাটফর্ম ফলো-আপ সম্মতি
                    </span>
                    {messages.applyPage.smartphoneConfirmation}
                  </div>
                </label>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Submission CTA Bar */}
      <div className="rounded-2xl border border-sand bg-ivory p-6 shadow-sm">
        <p className="text-xs text-muted leading-relaxed font-sans mb-5">
          {messages.applyPage.termsNotice}
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-3 rounded-full bg-accent-500 px-8 py-4 font-ui text-lg font-bold text-brand-950 transition hover:bg-accent-300 active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-soft"
          style={{ minHeight: "48px" }}
        >
          {submitting ? (
            <>
              <Loader2 className="size-6 animate-spin" />
              <span>{messages.applyPage.submittingButton}</span>
            </>
          ) : (
            <>
              <span>{messages.applyPage.submitButton}</span>
              <ArrowRight className="size-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
