"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SUBJECTS } from "@/lib/leadSchema";
import {
  CRASH_LEVELS,
  EXAM_SESSIONS,
  crashCourseSchema,
  type CrashCourseInput,
} from "@/lib/crashCourseSchema";
import { whatsappCrashLink } from "@/content/site";
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

/**
 * Crash-course registration. Posts to /api/crash-course, which tags the
 * row so it lands in its own Google Sheet tab, apart from trial leads.
 */
export function CrashCourseForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CrashCourseInput>({
    resolver: zodResolver(crashCourseSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      level: "",
      session: "",
      subjects: [],
    },
  });

  const chosen = watch("subjects") ?? [];

  useEffect(() => {
    if (status === "success") {
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  const onSubmit = handleSubmit(async (data) => {
    setStatus(await postForm("/api/crash-course", data, formRef.current));
  });

  if (status === "success") {
    return (
      <SuccessCard
        ref={successRef}
        title={`You're in, ${firstName(getValues("name"))}!`}
        whatsappHref={whatsappCrashLink}
      >
        We&apos;ve saved your crash-course registration and will WhatsApp you
        the batch dates, timings and fees shortly.
      </SuccessCard>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-[1.75rem] bg-white p-6 shadow-[0_40px_100px_-30px_rgba(10,20,53,0.55)] sm:p-9"
    >
      <Honeypot />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-2xl font-extrabold tracking-tight text-navy">
          Register for a crash course
        </h3>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1 text-xs font-bold text-gold">
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden>
            <path d="M11.98 1.67a.75.75 0 0 0-1.35-.46L3.88 10.2A.75.75 0 0 0 4.5 11.4h4.68l-1.16 6.93a.75.75 0 0 0 1.35.46l6.75-8.99a.75.75 0 0 0-.6-1.2h-4.68l1.14-6.93Z" />
          </svg>
          Limited seats
        </span>
      </div>

      <div className="mt-7">
        <ContactFields
          idPrefix="crash"
          name={register("name")}
          whatsapp={register("whatsapp")}
          errors={{ name: errors.name?.message, whatsapp: errors.whatsapp?.message }}
        />
      </div>

      <fieldset className="mt-6">
        <Legend step={1}>Level</Legend>
        <div className="grid grid-cols-3 gap-2">
          {CRASH_LEVELS.map((level) => (
            <label key={level} className={choiceClasses}>
              <input type="radio" value={level} className="sr-only" {...register("level")} />
              {level}
            </label>
          ))}
        </div>
        <FieldError message={errors.level?.message} />
      </fieldset>

      <fieldset className="mt-6">
        <Legend step={2}>Which exam are you preparing for?</Legend>
        <div className="grid grid-cols-2 gap-2">
          {EXAM_SESSIONS.map((session) => (
            <label key={session} className={choiceClasses}>
              <input type="radio" value={session} className="sr-only" {...register("session")} />
              {session}
            </label>
          ))}
        </div>
        <FieldError message={errors.session?.message} />
      </fieldset>

      <fieldset className="mt-6">
        <Legend step={3} aside={<SelectedCount count={chosen.length} />}>
          Subjects you need help with
        </Legend>
        <SubjectChips subjects={SUBJECTS} registration={register("subjects")} />
        <FieldError message={errors.subjects?.message} />
      </fieldset>

      <SubmitButton submitting={isSubmitting}>Reserve my seat</SubmitButton>
      <ErrorNotice show={status === "error"} href={whatsappCrashLink} />
      <PrivacyNote>
        Registering is free — we&apos;ll only use your number to share the course details.
      </PrivacyNote>
    </form>
  );
}
