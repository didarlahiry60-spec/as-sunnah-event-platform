"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  QrCode,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Loader2,
  Camera,
  CameraOff,
  UserCheck,
} from "lucide-react";
import { messages } from "@/lib/messages";
import { ApplicationRecord, extractQrToken } from "@/lib/applications";

export function CheckinScanner() {
  const searchParams = useSearchParams();
  const initialToken = searchParams.get("token") || "";

  const [tokenInput, setTokenInput] = useState(initialToken);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [result, setResult] = useState<{
    status: "IDLE" | "APPROVED" | "ALREADY_CHECKED_IN" | "INVALID_TOKEN";
    message: string;
    checkedInAt?: string;
    firstCheckedInAt?: string;
    application?: ApplicationRecord;
  }>({
    status: "IDLE",
    message: "",
  });

  const handleVerify = useCallback(async (tokenToUse?: string) => {
    const raw = (tokenToUse ?? tokenInput).trim();
    if (!raw) return;

    // Extract token if user/scanner supplied full URL
    const t = extractQrToken(raw);

    setLoading(true);

    try {
      const res = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: t }),
      });

      const data = await res.json();

      if (data.status === "APPROVED") {
        setResult({
          status: "APPROVED",
          message: data.message || messages.checkin.approvedTitle,
          checkedInAt: data.checkedInAt,
          application: data.application,
        });
      } else if (data.status === "ALREADY_CHECKED_IN") {
        setResult({
          status: "ALREADY_CHECKED_IN",
          message: data.message || messages.checkin.alreadyCheckedInTitle,
          firstCheckedInAt: data.firstCheckedInAt,
          application: data.application,
        });
      } else {
        setResult({
          status: "INVALID_TOKEN",
          message: data.message || messages.checkin.invalidTokenTitle,
        });
      }
    } catch (err) {
      console.error("Verification error:", err);
      setResult({
        status: "INVALID_TOKEN",
        message: "নেটওয়ার্ক বা সার্ভার ত্রুটি। আবার চেষ্টা করুন।",
      });
    } finally {
      setLoading(false);
    }
  }, [tokenInput]);

  // Auto-verify if token is present in URL
  useEffect(() => {
    if (!initialToken) return;
    let active = true;

    (async () => {
      try {
        const cleanToken = extractQrToken(initialToken.trim());
        const res = await fetch("/api/checkin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: cleanToken }),
        });
        const data = await res.json();
        if (!active) return;

        if (data.status === "APPROVED") {
          setResult({
            status: "APPROVED",
            message: data.message || messages.checkin.approvedTitle,
            checkedInAt: data.checkedInAt,
            application: data.application,
          });
        } else if (data.status === "ALREADY_CHECKED_IN") {
          setResult({
            status: "ALREADY_CHECKED_IN",
            message: data.message || messages.checkin.alreadyCheckedInTitle,
            firstCheckedInAt: data.firstCheckedInAt,
            application: data.application,
          });
        } else {
          setResult({
            status: "INVALID_TOKEN",
            message: data.message || messages.checkin.invalidTokenTitle,
          });
        }
      } catch {
        if (!active) return;
        setResult({
          status: "INVALID_TOKEN",
          message: "নেটওয়ার্ক বা সার্ভার ত্রুটি। আবার চেষ্টা করুন।",
        });
      }
    })();

    return () => {
      active = false;
    };
  }, [initialToken]);

  // Handle Camera toggling
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError("আপনার ব্রাউজারে ক্যামেরা ব্যবহারের সুবিধা পাওয়া যায়নি। ম্যানুয়ালি কোড প্রদান করুন।");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.warn("Camera start error:", err);
      setCameraError("ক্যামেরা চালু করা সম্ভব হয়নি। ক্যামেরা অনুমতি (Permission) নিশ্চিত করুন অথবা কোড লিখুন।");
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const handleReset = () => {
    setTokenInput("");
    setResult({ status: "IDLE", message: "" });
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Scanner / Token Input Card */}
      <div className="rounded-2xl border border-sand bg-white p-6 shadow-soft sm:p-8">
        <div className="flex items-center justify-between border-b border-sand pb-4">
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-brand-100 text-brand-950">
              <QrCode className="size-6" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-ink">
                {messages.checkin.title}
              </h2>
              <p className="text-xs text-muted font-sans mt-0.5">
                {messages.checkin.subtitle}
              </p>
            </div>
          </div>

          {/* Camera Toggle Button */}
          <button
            type="button"
            onClick={cameraActive ? stopCamera : startCamera}
            className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 font-ui text-xs font-bold transition cursor-pointer ${
              cameraActive
                ? "bg-red-100 text-red-800 hover:bg-red-200"
                : "bg-sand/60 text-brand-950 hover:bg-sand"
            }`}
          >
            {cameraActive ? (
              <>
                <CameraOff className="size-4" />
                <span>ক্যামেরা বন্ধ করুন</span>
              </>
            ) : (
              <>
                <Camera className="size-4 text-accent-700" />
                <span>ক্যামেরা স্ক্যানার</span>
              </>
            )}
          </button>
        </div>

        {/* Live Camera Viewfinder (if active) */}
        {cameraActive && (
          <div className="mt-6 rounded-2xl overflow-hidden border-2 border-brand-950 bg-black relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-64 object-cover"
            />
            {/* Viewfinder crosshairs */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="size-48 border-2 border-lime-400 rounded-2xl relative shadow-2xl">
                <span className="absolute top-2 left-2 text-[10px] font-mono text-lime-400 font-bold bg-black/60 px-1 rounded">
                  SCAN ZONE
                </span>
              </div>
            </div>
          </div>
        )}

        {cameraError && (
          <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 font-sans">
            {cameraError}
          </div>
        )}

        {/* Input Form */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleVerify();
          }}
          className="mt-6 space-y-4"
        >
          <div>
            <label htmlFor="token" className="block font-ui text-sm font-semibold text-ink mb-1.5">
              {messages.checkin.inputLabel}
            </label>
            <input
              id="token"
              type="text"
              value={tokenInput}
              onChange={e => setTokenInput(e.target.value)}
              placeholder="asf_pass_... অথবা সম্পূর্ণ যাচাই লিংক পেস্ট বা স্ক্যান করুন"
              className="w-full rounded-xl border border-sand bg-ivory/40 px-4 py-3 font-mono text-sm text-ink placeholder:text-muted/60 transition focus:outline-none focus:ring-2 focus:ring-accent-500"
              style={{ minHeight: "48px" }}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={loading || !tokenInput.trim()}
              className="flex-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 font-ui text-base font-bold text-brand-950 transition hover:bg-accent-300 active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-soft"
              style={{ minHeight: "48px" }}
            >
              {loading ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  <span>{messages.checkin.verifying}</span>
                </>
              ) : (
                <>
                  <QrCode className="size-5" />
                  <span>{messages.checkin.verifyButton}</span>
                </>
              )}
            </button>

            {result.status !== "IDLE" && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-sand bg-ivory px-5 font-ui text-sm font-semibold text-ink hover:bg-sand/60 transition cursor-pointer"
                style={{ minHeight: "48px" }}
              >
                {messages.checkin.scanNextButton}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* RESULT CARDS */}

      {/* 1. SUCCESS: APPROVED */}
      {result.status === "APPROVED" && result.application && (
        <div className="mt-8 rounded-3xl border-2 border-emerald-500 bg-emerald-50/80 p-6 sm:p-8 shadow-md">
          {/* Attendee Avatar Photo ID Badge */}
          <div className="flex items-center gap-4 border-b border-emerald-200 pb-5">
            <div className="size-16 rounded-2xl bg-brand-950 text-lime-400 border-2 border-lime-400/40 grid place-items-center font-display text-xl font-black shadow-md shrink-0">
              {result.application.applicant.name.slice(0, 2)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-ui text-xs font-bold rounded-md bg-brand-900 text-ivory px-2.5 py-0.5">
                  {messages.applyPage.categories[result.application.applicant.category] ||
                    result.application.applicant.category}
                </span>
                <span className="font-ui text-xs font-bold text-emerald-950 bg-emerald-200/90 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="size-3 text-emerald-700" />
                  <span>প্রবেশাধিকার অনুমোদিত</span>
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-emerald-950 mt-1">
                {result.application.applicant.name}
              </h3>
              <p className="text-xs text-emerald-900 font-sans mt-0.5">
                {result.application.applicant.mosqueName} • {result.application.applicant.district}
              </p>
            </div>
          </div>

          {/* Locked Check-in Time Stamp */}
          <div className="mt-5 rounded-xl border border-emerald-300 bg-white p-4 flex items-center justify-between text-xs sm:text-sm">
            <span className="font-ui font-semibold text-emerald-950">চেক-ইন সম্পন্ন সময় (লকড):</span>
            <span className="font-mono font-bold text-emerald-800">
              {result.checkedInAt
                ? new Date(result.checkedInAt).toLocaleTimeString("bn-BD", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "সবেমাত্র"}
            </span>
          </div>

          {/* Applicant & Event Details */}
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-white/95 p-5 space-y-3 font-sans text-sm text-ink">
            <h4 className="font-ui text-xs font-bold uppercase tracking-wider text-muted border-b border-sand pb-2 flex items-center gap-1.5">
              <UserCheck className="size-4 text-emerald-700" />
              <span>{messages.checkin.applicantDetails}</span>
            </h4>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <span className="block text-xs text-muted font-ui">{messages.checkin.nameLabel}</span>
                <strong className="text-base font-bold text-brand-950">
                  {result.application.applicant.name}
                </strong>
              </div>

              <div>
                <span className="block text-xs text-muted font-ui">{messages.checkin.mobileLabel}</span>
                <span className="font-mono font-semibold">{result.application.applicant.mobile}</span>
              </div>

              <div>
                <span className="block text-xs text-muted font-ui">{messages.checkin.categoryLabel}</span>
                <span>
                  {messages.applyPage.categories[result.application.applicant.category] ||
                    result.application.applicant.category}
                </span>
              </div>

              <div>
                <span className="block text-xs text-muted font-ui">{messages.checkin.districtLabel}</span>
                <span>
                  {result.application.applicant.district}, {result.application.applicant.division}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-sand/60">
              <span className="block text-xs text-muted font-ui">{messages.checkin.eventTitleLabel}</span>
              <span className="font-semibold text-brand-950">{result.application.eventTitle}</span>
            </div>

            <div>
              <span className="block text-xs text-muted font-ui">আবেদন নম্বর:</span>
              <span className="font-mono font-bold text-accent-700">{result.application.number}</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. DUPLICATE ENTRY WARNING: ALREADY CHECKED IN */}
      {result.status === "ALREADY_CHECKED_IN" && result.application && (
        <div className="mt-8 rounded-3xl border-2 border-amber-500 bg-amber-50 p-6 sm:p-8 shadow-md">
          <div className="flex items-start gap-4 border-b border-amber-200 pb-5">
            <div className="grid size-12 place-items-center rounded-2xl bg-amber-500 text-white shrink-0 shadow-sm">
              <AlertTriangle className="size-7" />
            </div>
            <div className="flex-1">
              <span className="inline-block rounded-full bg-amber-200 px-3 py-0.5 text-xs font-bold text-amber-950 font-ui mb-1">
                দ্বৈত প্রবেশ সতর্কতা (DUPLICATE ENTRY)
              </span>
              <h3 className="font-display text-2xl font-bold text-amber-950">
                {messages.checkin.alreadyCheckedInTitle}
              </h3>
              <p className="text-sm text-amber-900 font-sans mt-0.5">
                {messages.checkin.alreadyCheckedInDesc}
              </p>
            </div>
          </div>

          {/* First Checked-in Timestamp */}
          <div className="mt-5 rounded-xl border border-amber-300 bg-white p-4 flex items-center justify-between text-xs sm:text-sm">
            <span className="font-ui font-semibold text-amber-950">
              {messages.checkin.firstCheckedInAtLabel}
            </span>
            <span className="font-mono font-bold text-amber-900">
              {result.firstCheckedInAt
                ? new Date(result.firstCheckedInAt).toLocaleTimeString("bn-BD", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })
                : "ইতিপূর্বে"}
            </span>
          </div>

          {/* Prior Applicant Snapshot */}
          <div className="mt-4 rounded-xl border border-amber-200 bg-white/90 p-4 text-xs font-sans space-y-1.5">
            <p>
              <strong>নাম:</strong> {result.application.applicant.name} ({result.application.applicant.mobile})
            </p>
            <p>
              <strong>আবেদন নম্বর:</strong> {result.application.number}
            </p>
            <p>
              <strong>প্রতিষ্ঠান:</strong> {result.application.applicant.mosqueName}
            </p>
          </div>
        </div>
      )}

      {/* 3. ERROR: INVALID TOKEN */}
      {result.status === "INVALID_TOKEN" && (
        <div className="mt-8 rounded-3xl border-2 border-red-400 bg-red-50 p-6 sm:p-8 shadow-md">
          <div className="flex items-start gap-4">
            <div className="grid size-12 place-items-center rounded-2xl bg-red-600 text-white shrink-0">
              <XCircle className="size-7" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-red-950">
                {messages.checkin.invalidTokenTitle}
              </h3>
              <p className="text-sm text-red-900 font-sans mt-1">
                {result.message || messages.checkin.invalidTokenDesc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
