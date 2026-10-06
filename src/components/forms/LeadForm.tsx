"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, m } from "framer-motion";
import {
  BATCHES,
  GRADES,
  SUBJECTS,
  leadSchema,
  type LeadInput,
} from "@/lib/leadSchema";
import { PREFILL_EVENT, type PrefillDetail } from "@/lib/prefill";
import { whatsappLink } from "@/content/site";
import { WhatsAppGlyph } from "@/components/brand/WhatsAppGlyph";
import { SPRING, SPRING_TAP } from "@/components/motion/vocabulary";

type Status = "idle" | "success" | "error";

const BATCH_ICONS: Record<string, React.ReactNode> = {
  Morning: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
    </>
  ),
  Evening: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" strokeLinejoin="round" />,
};

function FieldError({ message }: { message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <m.p
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-2 flex items-center gap-1.5 text-sm font-medium text-red-600"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0" aria-hidden>
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
          </svg>
          {message}
        </m.p>
      )}
    </AnimatePresence>
  );
}

function Legend({
  step,
  children,
  aside,
}: {
  step: number;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <legend className="mb-2.5 flex w-full items-center gap-2 text-sm font-bold text-navy">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy font-display text-[0.65rem] text-gold">
        {step}
      </span>
      {children}
      {aside ? <span className="ml-auto">{aside}</span> : null}
    </legend>
  );
}

/** Confetti burst for the success state — CSS only, transform/opacity. */
const BURST = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  return {
    x: Math.round(Math.cos(angle) * (70 + (i % 3) * 22)),
    y: Math.round(Math.sin(angle) * (70 + (i % 3) * 22)),
    color: ["#F4B41A", "#0F1E4B", "#FFC93C", "#2A4290"][i % 4],
    round: i % 2 === 0,
  };
});

export function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [prefilled, setPrefilled] = useState<string[] | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      grade: "",
      batch: "",
      subjects: [],
    },
  });

  const chosen = watch("subjects") ?? [];

  // "Free trial with Sir X" on a faculty card ticks that teacher's subjects.
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const { subjects } = (event as CustomEvent<PrefillDetail>).detail ?? {};
      if (!subjects?.length) return;
      const current = getValues("subjects") ?? [];
      setValue("subjects", Array.from(new Set([...current, ...subjects])), {
        shouldValidate: !!errors.subjects,
      });
      setPrefilled(subjects);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, [getValues, setValue, errors.subjects]);

  // The confirmation card is shorter than the form — bring it into view.
  useEffect(() => {
    if (status === "success") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(response.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <m.div
        ref={successRef}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING}
        className="relative overflow-hidden rounded-[1.75rem] bg-white p-8 text-center shadow-2xl sm:p-12"
      >
        <div className="relative mx-auto h-24 w-24">
          {BURST.map((p, i) => (
            <m.span
              key={i}
              aria-hidden
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
              animate={{ x: p.x, y: p.y, opacity: 0, scale: 1 }}
              transition={{ duration: 1.1, ease: "easeOut", delay: 0.15 }}
              className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 ${p.round ? "rounded-full" : "rotate-45 rounded-[2px]"}`}
              style={{ backgroundColor: p.color }}
            />
          ))}
          <svg viewBox="0 0 96 96" className="h-24 w-24" aria-hidden>
            <circle cx="48" cy="48" r="44" fill="#FFF6DC" />
            <m.circle
              cx="48"
              cy="48"
              r="44"
              fill="none"
              stroke="#F4B41A"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <m.path
              d="M30 49 L43 61 L66 36"
              fill="none"
              stroke="#0F1E4B"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 0.45, ease: "easeOut" }}
            />
          </svg>
        </div>
        <h3 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-navy">
          Thanks, {getValues("name").trim().split(" ")[0]}!
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-slate-600">
          We&apos;ve got your details and will WhatsApp you within a few hours
          to schedule your free trial class.
        </p>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn mt-8 bg-[#25D366] text-navy-ink hover:bg-[#3ee07a]"
        >
          <WhatsAppGlyph className="h-5 w-5" />
          Or message us right now
        </a>
      </m.div>
    );
  }

  const inputClasses =
    "peer w-full rounded-2xl border border-navy/10 bg-cream/70 py-3.5 pl-12 pr-4 text-[0.95rem] font-medium text-navy placeholder:font-normal placeholder:text-slate-400 transition-colors hover:border-navy/20 focus:border-gold focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/20 aria-[invalid=true]:border-red-400";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-[1.75rem] bg-white p-6 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] sm:p-9"
    >
      {/* Honeypot — hidden from real users, filled by naive bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-2xl font-extrabold tracking-tight text-navy">
          Book your free trial
        </h3>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-pale px-3 py-1 text-xs font-bold text-gold-deep">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
            <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .2.08.39.22.53l3 3a.75.75 0 1 0 1.06-1.06l-2.78-2.78V5Z" clipRule="evenodd" />
          </svg>
          Takes 30 seconds
        </span>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="mb-2 block text-sm font-bold text-navy">
            Student&apos;s name
          </label>
          <div className="relative">
            <input
              id="lead-name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Ayesha Khan"
              className={inputClasses}
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/35 peer-focus:text-gold-dark" aria-hidden>
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
            </svg>
          </div>
          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor="lead-whatsapp" className="mb-2 block text-sm font-bold text-navy">
            WhatsApp number
          </label>
          <div className="relative">
            <input
              id="lead-whatsapp"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="03XX XXXXXXX"
              className={inputClasses}
              aria-invalid={!!errors.whatsapp}
              {...register("whatsapp")}
            />
            <WhatsAppGlyph className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/35 peer-focus:text-[#25D366]" />
          </div>
          <FieldError message={errors.whatsapp?.message} />
        </div>
      </div>

      <fieldset className="mt-6">
        <Legend step={1}>Grade / level</Legend>
        <div className="grid grid-cols-3 gap-2">
          {GRADES.map((grade) => (
            <label
              key={grade}
              className="flex min-h-11 cursor-pointer items-center justify-center rounded-xl border border-navy/10 bg-cream/70 px-2 text-center text-sm font-semibold text-navy transition-all hover:border-navy/30 has-[:checked]:border-navy has-[:checked]:bg-navy has-[:checked]:text-white has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-gold/30"
            >
              <input type="radio" value={grade} className="sr-only" {...register("grade")} />
              {grade}
            </label>
          ))}
        </div>
        <FieldError message={errors.grade?.message} />
      </fieldset>

      <fieldset className="mt-6">
        <Legend step={2}>Which batch suits you?</Legend>
        <div className="grid grid-cols-2 gap-3">
          {BATCHES.map(({ value, hint }) => (
            <label
              key={value}
              className="group flex cursor-pointer items-center gap-3 rounded-2xl border border-navy/10 bg-cream/70 p-3 transition-all hover:border-navy/30 has-[:checked]:border-gold has-[:checked]:bg-gold-pale has-[:checked]:shadow-[0_0_0_3px_rgba(244,180,26,0.25)] has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-gold/30"
            >
              <input type="radio" value={value} className="sr-only" {...register("batch")} />
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-navy shadow-sm transition-colors group-has-[:checked]:bg-navy group-has-[:checked]:text-gold">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
                  {BATCH_ICONS[value]}
                </svg>
              </span>
              <span className="leading-tight">
                <span className="block font-display text-sm font-bold text-navy">{value}</span>
                <span className="text-xs text-slate-500">{hint}</span>
              </span>
            </label>
          ))}
        </div>
        <FieldError message={errors.batch?.message} />
      </fieldset>

      <fieldset className="mt-6">
        <Legend
          step={3}
          aside={
            chosen.length > 0 ? (
              <span className="text-xs font-semibold text-gold-deep">
                {chosen.length} selected
              </span>
            ) : null
          }
        >
          Subjects you&apos;re interested in
        </Legend>
        <AnimatePresence>
          {prefilled && (
            <m.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 overflow-hidden text-xs font-medium text-slate-500"
            >
              ✓ We&apos;ve ticked {prefilled.join(" & ")} for you — add any others.
            </m.p>
          )}
        </AnimatePresence>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map((subject) => (
            <label
              key={subject}
              className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-navy/10 bg-cream/70 px-3.5 py-2 text-sm font-semibold text-navy transition-all hover:border-navy/30 has-[:checked]:border-gold has-[:checked]:bg-gold has-[:checked]:text-navy-dark has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-gold/30"
            >
              <input type="checkbox" value={subject} className="sr-only" {...register("subjects")} />
              <svg viewBox="0 0 20 20" fill="currentColor" className="hidden h-4 w-4 group-has-[:checked]:block" aria-hidden>
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
              </svg>
              {subject}
            </label>
          ))}
        </div>
        <FieldError message={errors.subjects?.message} />
      </fieldset>

      <m.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={SPRING_TAP}
        className="btn-gold mt-8 min-h-14 w-full text-base disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <>
            <svg viewBox="0 0 24 24" className="h-5 w-5 animate-spin" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
              <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            Sending…
          </>
        ) : (
          <>
            Book my free trial
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden>
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.64l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </>
        )}
      </m.button>

      <AnimatePresence>
        {status === "error" && (
          <m.div
            role="alert"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 rounded-2xl bg-red-50 p-4 text-center ring-1 ring-red-100"
          >
            <p className="text-sm font-semibold text-red-700">
              Something went wrong on our end — but you can still reach us instantly:
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-display font-bold text-navy underline decoration-gold decoration-2 underline-offset-4"
            >
              Message us on WhatsApp instead
            </a>
          </m.div>
        )}
      </AnimatePresence>

      <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
          <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
        </svg>
        No spam, no fees to inquire — we only use your number to schedule your trial.
      </p>
    </form>
  );
}
