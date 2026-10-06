"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { LeadForm } from "@/components/forms/LeadForm";
import { CrashCourseForm } from "@/components/forms/CrashCourseForm";
import { LogoMark } from "@/components/brand/Logo";
import { site } from "@/content/site";
import { crashCourseSteps } from "@/content/crashCourse";
import {
  CRASH_COURSE_HASH,
  ENROL_MODE_EVENT,
  PREFILL_EVENT,
  type EnrolMode,
} from "@/lib/prefill";
import { SPRING, VIEWPORT, cardRise, fadeRise } from "@/components/motion/vocabulary";

const COPY: Record<
  EnrolMode,
  {
    eyebrow: string;
    title: string;
    accent: string;
    blurb: string;
    steps: { title: string; body: string }[];
  }
> = {
  trial: {
    eyebrow: "Free trial class",
    title: "Sit in a class before you",
    accent: "decide.",
    blurb: `Tell us who's joining and which subjects — our coordinator will WhatsApp you to set up a free trial at ${site.city}.`,
    steps: [
      {
        title: "Tell us about the student",
        body: "Name, WhatsApp number, grade and subjects — that's all we need.",
      },
      {
        title: "We WhatsApp you",
        body: "Our coordinator confirms a trial slot that fits your timetable.",
      },
      {
        title: "Sit in a real class",
        body: "Meet the teacher, feel the vibe — then decide. No pressure.",
      },
    ],
  },
  crash: {
    eyebrow: "Crash course",
    title: "Lock in your seat before",
    accent: "exam season.",
    blurb:
      "Register in 30 seconds — our coordinator will WhatsApp you the batch dates, timings and fees for your subjects.",
    steps: crashCourseSteps,
  },
};

const MODES: { id: EnrolMode; label: string; isNew?: boolean }[] = [
  { id: "trial", label: "Free trial class" },
  { id: "crash", label: "Crash course", isNew: true },
];

/**
 * The single sign-up moment of the page. One navy stage, two modes:
 * the free-trial enquiry (default) and crash-course registration. Each
 * mode keeps its own form, endpoint and Google Sheet tab — the switch only
 * changes what's on stage. Both forms stay mounted so nothing typed is
 * lost when a visitor flips between them.
 *
 * Entry points: every "Book a free trial" CTA (trial), the crash-course
 * pass's "Register now" and the #crash-course-form hash (crash).
 */
export function LeadCapture() {
  const [mode, setMode] = useState<EnrolMode>("trial");

  useEffect(() => {
    const onMode = (e: Event) => setMode((e as CustomEvent<EnrolMode>).detail);
    const onPrefill = () => setMode("trial");
    window.addEventListener(ENROL_MODE_EVENT, onMode);
    window.addEventListener(PREFILL_EVENT, onPrefill);

    // Deep link for crash-course ads: /#crash-course-form
    if (window.location.hash === CRASH_COURSE_HASH) {
      setMode("crash");
      requestAnimationFrame(() =>
        document.getElementById("enroll-form")?.scrollIntoView(),
      );
    }

    return () => {
      window.removeEventListener(ENROL_MODE_EVENT, onMode);
      window.removeEventListener(PREFILL_EVENT, onPrefill);
    };
  }, []);

  const copy = COPY[mode];

  return (
    <section id="enroll" className="scroll-mt-16 bg-white px-3 pb-4 pt-16 sm:px-5 sm:pt-20">
      <div className="relative isolate mx-auto max-w-[84rem] overflow-hidden rounded-[2rem] bg-navy-ink px-5 py-14 text-white sm:rounded-[2.75rem] sm:px-10 sm:py-20 lg:px-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className={`absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(244,180,26,0.2),transparent)] transition-transform duration-1000 ease-out ${
              mode === "crash" ? "translate-x-[60%] scale-125" : ""
            }`}
          />
          <div className="absolute -bottom-60 right-0 h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(closest-side,rgba(42,66,144,0.8),transparent)]" />
          <LogoMark tone="white" className="absolute -bottom-16 -left-20 w-[30rem] opacity-[0.035]" />
          <div className="bg-noise absolute inset-0 opacity-[0.06] mix-blend-overlay" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <m.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeRise}>
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={mode}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0, transition: SPRING }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
              >
                <p className="eyebrow text-gold">
                  <span aria-hidden className="h-px w-8 bg-current opacity-60" />
                  {copy.eyebrow}
                </p>
                <h2
                  className="mt-4 font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl"
                >
                  {copy.title}{" "}
                  <span className="font-serif font-normal italic tracking-normal text-gold">
                    {copy.accent}
                  </span>
                </h2>
                <p className="mt-5 max-w-md text-slate-300">{copy.blurb}</p>

                <ol className="relative mt-10 space-y-7">
                  <span aria-hidden className="absolute bottom-4 left-[1.1875rem] top-4 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent" />
                  {copy.steps.map((step, i) => (
                    <li key={step.title} className="relative flex gap-5">
                      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold font-display text-sm font-extrabold text-navy-dark ring-4 ring-navy-ink">
                        {i + 1}
                      </span>
                      <div className="pt-1.5">
                        <p className="font-display text-lg font-bold">{step.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </m.div>
            </AnimatePresence>

            <figure className="relative mt-12 hidden overflow-hidden rounded-3xl ring-1 ring-white/10 lg:block">
              <Image
                src="/images/campus/classroom.jpeg"
                alt="Students in a Learning Tribe classroom"
                width={544}
                height={220}
                sizes="28rem"
                className="h-44 w-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-ink/90 via-navy-ink/20 to-transparent" />
              <figcaption className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-sm">
                <span className="font-semibold">Real classrooms, {site.city}</span>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                  {site.campusDirections}
                </span>
              </figcaption>
            </figure>
          </m.div>

          <m.div
            id="enroll-form"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={cardRise}
            className="scroll-mt-24"
          >
            {/* Mode switch — the gold thumb slides on a CSS transform */}
            <div
              role="tablist"
              aria-label="What would you like to sign up for?"
              className="relative mb-4 grid grid-cols-2 rounded-full bg-white/[0.07] p-1.5 ring-1 ring-white/10 backdrop-blur"
            >
              <span
                aria-hidden
                className={`absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-gold shadow-[0_8px_24px_-8px_rgba(244,180,26,0.7)] transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
                  mode === "crash" ? "translate-x-full" : "translate-x-0"
                }`}
              />
              {MODES.map(({ id, label, isNew }) => {
                const active = mode === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls={id === "trial" ? "enroll-trial-panel" : "crash-course-form"}
                    onClick={() => setMode(id)}
                    className={`relative z-10 flex min-h-12 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-2 font-display text-[0.82rem] font-bold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold sm:gap-2 sm:px-3 sm:text-[0.95rem] ${
                      active ? "text-navy-dark" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {label}
                    {isNew && (
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[0.6rem] font-extrabold uppercase leading-none tracking-wide transition-colors ${
                          active ? "bg-navy-dark text-gold" : "bg-gold text-navy-dark"
                        }`}
                      >
                        New
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Both stay mounted; display:none → block replays the entrance */}
            <div
              id="enroll-trial-panel"
              role="tabpanel"
              hidden={mode !== "trial"}
              className="animate-[plate-in_0.45s_ease-out]"
            >
              <LeadForm />
            </div>
            <div
              id="crash-course-form"
              role="tabpanel"
              hidden={mode !== "crash"}
              className="animate-[plate-in_0.45s_ease-out]"
            >
              <CrashCourseForm />
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
