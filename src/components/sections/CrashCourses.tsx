"use client";

import { m } from "framer-motion";
import { crashCourse } from "@/content/crashCourse";
import { whatsappCrashLink } from "@/content/site";
import { CRASH_LEVELS } from "@/lib/crashCourseSchema";
import { CrashCourseForm } from "@/components/forms/CrashCourseForm";
import { WhatsAppGlyph } from "@/components/brand/WhatsAppGlyph";
import {
  VIEWPORT,
  cardRise,
  fadeRise,
  staggerGroup,
} from "@/components/motion/vocabulary";

const HIGHLIGHT_ICONS = [
  // Recap — stacked layers
  <path key="a" d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" strokeLinejoin="round" />,
  // Past papers — document
  <path key="b" d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Zm0 0v5h5M9 13h6M9 17h4" strokeLinejoin="round" strokeLinecap="round" />,
  // Doubts — speech bubble with question
  <path key="c" d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12ZM10 9.5a2 2 0 1 1 2.8 1.8c-.5.3-.8.7-.8 1.2M12 15.5h.01" strokeLinejoin="round" strokeLinecap="round" />,
];

/**
 * Exam-season crash courses — a separate offer with its own form and its
 * own Google Sheet tab. Set on solid gold so it reads as a distinct,
 * time-sensitive announcement between the timetable and the results.
 */
export function CrashCourses() {
  return (
    <section
      id="crash-courses"
      className="relative isolate scroll-mt-20 overflow-hidden bg-gold py-20 text-navy-dark sm:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(10,20,53,0.045)_0_2px,transparent_2px_22px)]" />
        <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.55),transparent)]" />
        <div className="absolute -bottom-48 -right-32 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(217,154,6,0.6),transparent)]" />
        {/* Stopwatch outline */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.35"
          className="absolute -bottom-24 -left-24 h-[30rem] w-[30rem] text-navy-dark/[0.08]"
        >
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l2.5 2.5M10 2h4M12 2v3M19 6l1.5-1.5" strokeLinecap="round" />
        </svg>
        <div className="bg-noise absolute inset-0 opacity-[0.08] mix-blend-overlay" />
      </div>

      <div className="mx-auto grid max-w-site items-start gap-12 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <m.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerGroup(0.08)}
          className="lg:sticky lg:top-28"
        >
          <m.p
            variants={fadeRise}
            className="inline-flex items-center gap-2.5 rounded-full bg-navy-dark py-1.5 pl-1.5 pr-4 text-xs font-bold uppercase tracking-[0.18em] text-white"
          >
            <span className="rounded-full bg-gold px-2.5 py-1 font-display text-[0.7rem] tracking-wider text-navy-dark">
              New
            </span>
            Crash courses
          </m.p>

          <m.h2
            variants={fadeRise}
            className="mt-6 font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-6xl"
          >
            {crashCourse.title}{" "}
            <span className="block font-serif font-normal italic tracking-normal text-navy-light">
              {crashCourse.accent}
            </span>
          </m.h2>

          <m.p variants={fadeRise} className="mt-5 max-w-lg text-base leading-relaxed text-navy-dark/80 sm:text-lg">
            {crashCourse.blurb}
          </m.p>

          <m.ul variants={fadeRise} className="mt-6 flex flex-wrap gap-2" aria-label="Levels offered">
            {CRASH_LEVELS.map((level) => (
              <li
                key={level}
                className="rounded-full border border-navy-dark/20 bg-white/30 px-4 py-1.5 font-display text-sm font-bold backdrop-blur"
              >
                {level}
              </li>
            ))}
          </m.ul>

          <ul className="mt-10 space-y-3">
            {crashCourse.highlights.map((item, i) => (
              <m.li
                key={item.title}
                variants={cardRise}
                className="flex gap-4 rounded-2xl bg-white/45 p-4 ring-1 ring-navy-dark/[0.06] backdrop-blur-sm"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-dark text-gold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="h-5 w-5" aria-hidden>
                    {HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]}
                  </svg>
                </span>
                <div>
                  <p className="font-display text-base font-bold">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-navy-dark/70">{item.body}</p>
                </div>
              </m.li>
            ))}
          </ul>

          <m.div variants={fadeRise} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
            <p className="font-medium text-navy-dark/75">{crashCourse.note}</p>
            <a
              href={whatsappCrashLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display font-bold underline decoration-navy-dark/30 decoration-2 underline-offset-4 hover:decoration-navy-dark"
            >
              <WhatsAppGlyph className="h-4 w-4" />
              Questions? Ask on WhatsApp
            </a>
          </m.div>
        </m.div>

        <m.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={cardRise}>
          <CrashCourseForm />
        </m.div>
      </div>
    </section>
  );
}
