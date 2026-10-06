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
import {
  ContactFields,
  ErrorNotice,
  FieldError,
  Honeypot,
  Legend,
  PrivacyNote,
  SelectedCount,
  SubjectChips,
  SubmitButton,
  SuccessCard,
  choiceClasses,
  firstName,
  postForm,
  type FormStatus,
} from "./parts";

const BATCH_ICONS: Record<string, React.ReactNode> = {
  Morning: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
    </>
  ),
  Evening: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" strokeLinejoin="round" />,
};

export function LeadForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [prefilled, setPrefilled] = useState<string[] | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
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
    setStatus(await postForm("/api/lead", data, formRef.current));
  });

  if (status === "success") {
    return (
      <SuccessCard ref={successRef} title={`Thanks, ${firstName(getValues("name"))}!`}>
        We&apos;ve got your details and will WhatsApp you within a few hours
        to schedule your free trial class.
      </SuccessCard>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-[1.75rem] bg-white p-6 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)] sm:p-9"
    >
      <Honeypot />

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

      <div className="mt-7">
        <ContactFields
          idPrefix="lead"
          name={register("name")}
          whatsapp={register("whatsapp")}
          errors={{ name: errors.name?.message, whatsapp: errors.whatsapp?.message }}
        />
      </div>

      <fieldset className="mt-6">
        <Legend step={1}>Grade / level</Legend>
        <div className="grid grid-cols-3 gap-2">
          {GRADES.map((grade) => (
            <label key={grade} className={choiceClasses}>
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
        <Legend step={3} aside={<SelectedCount count={chosen.length} />}>
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
        <SubjectChips subjects={SUBJECTS} registration={register("subjects")} />
        <FieldError message={errors.subjects?.message} />
      </fieldset>

      <SubmitButton submitting={isSubmitting}>Book my free trial</SubmitButton>
      <ErrorNotice show={status === "error"} />
      <PrivacyNote>
        No spam, no fees to inquire — we only use your number to schedule your trial.
      </PrivacyNote>
    </form>
  );
}
