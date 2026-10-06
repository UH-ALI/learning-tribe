"use client";

import type { Ref } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { AnimatePresence, m } from "framer-motion";
import { whatsappLink } from "@/content/site";
import { WhatsAppGlyph } from "@/components/brand/WhatsAppGlyph";
import { SPRING, SPRING_TAP } from "@/components/motion/vocabulary";

/**
 * Building blocks shared by the trial-class and crash-course forms, so
 * both look, validate and fail over to WhatsApp the same way.
 */

export type FormStatus = "idle" | "success" | "error";

/**
 * POSTs a form's values to an intake route. The honeypot input isn't
 * registered with react-hook-form, so its DOM value is read here and sent
 * along for the server-side bot check.
 */
export async function postForm(
  url: string,
  data: object,
  form: HTMLFormElement | null,
): Promise<FormStatus> {
  const honeypot = form?.elements.namedItem("company");
  const company = honeypot instanceof HTMLInputElement ? honeypot.value : "";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(company ? { ...data, company } : data),
    });
    return response.ok ? "success" : "error";
  } catch {
    return "error";
  }
}

export const inputClasses =
  "peer w-full rounded-2xl border border-navy/10 bg-cream/70 py-3.5 pl-12 pr-4 text-[0.95rem] font-medium text-navy placeholder:font-normal placeholder:text-slate-400 transition-colors hover:border-navy/20 focus:border-gold focus:bg-white focus:outline-none focus:ring-4 focus:ring-gold/20 aria-[invalid=true]:border-red-400";

/** Selectable chip for radio/checkbox groups (the input itself is visually hidden). */
export const choiceClasses =
  "flex min-h-11 cursor-pointer items-center justify-center rounded-xl border border-navy/10 bg-cream/70 px-2 text-center text-sm font-semibold text-navy transition-all hover:border-navy/30 has-[:checked]:border-navy has-[:checked]:bg-navy has-[:checked]:text-white has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-gold/30";

export function FieldError({ message }: { message?: string }) {
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

export function Legend({
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

/** Honeypot — hidden from real users, filled by naive bots. */
export function Honeypot() {
  return (
    <input
      type="text"
      name="company"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute left-[-9999px] h-0 w-0 opacity-0"
    />
  );
}

/** Student name + WhatsApp number, side by side from `sm` up. */
export function ContactFields({
  idPrefix,
  name,
  whatsapp,
  errors,
}: {
  idPrefix: string;
  name: UseFormRegisterReturn;
  whatsapp: UseFormRegisterReturn;
  errors: { name?: string; whatsapp?: string };
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <div>
        <label htmlFor={`${idPrefix}-name`} className="mb-2 block text-sm font-bold text-navy">
          Student&apos;s name
        </label>
        <div className="relative">
          <input
            id={`${idPrefix}-name`}
            type="text"
            autoComplete="name"
            placeholder="e.g. Ayesha Khan"
            className={inputClasses}
            aria-invalid={!!errors.name}
            {...name}
          />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/35 peer-focus:text-gold-dark" aria-hidden>
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
          </svg>
        </div>
        <FieldError message={errors.name} />
      </div>

      <div>
        <label htmlFor={`${idPrefix}-whatsapp`} className="mb-2 block text-sm font-bold text-navy">
          WhatsApp number
        </label>
        <div className="relative">
          <input
            id={`${idPrefix}-whatsapp`}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="03XX XXXXXXX"
            className={inputClasses}
            aria-invalid={!!errors.whatsapp}
            {...whatsapp}
          />
          <WhatsAppGlyph className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/35 peer-focus:text-[#25D366]" />
        </div>
        <FieldError message={errors.whatsapp} />
      </div>
    </div>
  );
}

/** Multi-select subject chips with a tick on the chosen ones. */
export function SubjectChips({
  subjects,
  registration,
}: {
  subjects: readonly string[];
  registration: UseFormRegisterReturn;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {subjects.map((subject) => (
        <label
          key={subject}
          className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-navy/10 bg-cream/70 px-3.5 py-2 text-sm font-semibold text-navy transition-all hover:border-navy/30 has-[:checked]:border-gold has-[:checked]:bg-gold has-[:checked]:text-navy-dark has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-gold/30"
        >
          <input type="checkbox" value={subject} className="sr-only" {...registration} />
          <svg viewBox="0 0 20 20" fill="currentColor" className="hidden h-4 w-4 group-has-[:checked]:block" aria-hidden>
            <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.58l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
          </svg>
          {subject}
        </label>
      ))}
    </div>
  );
}

export function SelectedCount({ count }: { count: number }) {
  return count > 0 ? (
    <span className="text-xs font-semibold text-gold-deep">{count} selected</span>
  ) : null;
}

export function SubmitButton({
  submitting,
  children,
}: {
  submitting: boolean;
  children: React.ReactNode;
}) {
  return (
    <m.button
      type="submit"
      disabled={submitting}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={SPRING_TAP}
      className="btn-gold mt-8 min-h-14 w-full text-base disabled:cursor-not-allowed disabled:opacity-70"
    >
      {submitting ? (
        <>
          <svg viewBox="0 0 24 24" className="h-5 w-5 animate-spin" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
            <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
          Sending…
        </>
      ) : (
        <>
          {children}
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5" aria-hidden>
            <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.64l-3.22-3.22a.75.75 0 1 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06l3.22-3.22H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
          </svg>
        </>
      )}
    </m.button>
  );
}

/** Delivery failed — never dead-end a lead; hand over to WhatsApp. */
export function ErrorNotice({ show, href = whatsappLink }: { show: boolean; href?: string }) {
  return (
    <AnimatePresence>
      {show && (
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
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block font-display font-bold text-navy underline decoration-gold decoration-2 underline-offset-4"
          >
            Message us on WhatsApp instead
          </a>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export function PrivacyNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-xs text-slate-400">
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0" aria-hidden>
        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
      </svg>
      {children}
    </p>
  );
}

/** Confetti burst for the success state — transform/opacity only. */
const BURST = Array.from({ length: 14 }, (_, i) => {
  const angle = (i / 14) * Math.PI * 2;
  return {
    x: Math.round(Math.cos(angle) * (70 + (i % 3) * 22)),
    y: Math.round(Math.sin(angle) * (70 + (i % 3) * 22)),
    color: ["#F4B41A", "#0F1E4B", "#FFC93C", "#2A4290"][i % 4],
    round: i % 2 === 0,
  };
});

export function SuccessCard({
  ref,
  title,
  children,
  whatsappHref = whatsappLink,
}: {
  ref?: Ref<HTMLDivElement>;
  title: string;
  children: React.ReactNode;
  whatsappHref?: string;
}) {
  return (
    <m.div
      ref={ref}
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
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-slate-600">{children}</p>
      <a
        href={whatsappHref}
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

/** First word of the name, for "Thanks, Ayesha!" */
export function firstName(name: string) {
  return name.trim().split(" ")[0];
}
