"use client";

import { useEffect, useRef, useState } from "react";
import { m, useInView } from "framer-motion";
import { resultStats, testimonials } from "@/content/results";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { trackSpotlight } from "@/components/motion/spotlight";
import {
  VIEWPORT,
  cardRise,
  fadeRise,
  staggerGroup,
} from "@/components/motion/vocabulary";

/** Splits "65%+" into 65 and "%+" so the number can count up. */
function splitStat(value: string): { n: number; suffix: string } | null {
  const match = value.match(/^(\d+)(.*)$/);
  return match ? { n: Number(match[1]), suffix: match[2] } : null;
}

/** Counts from 0 when scrolled into view (ease-out, ~1.6s). */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  const parsed = splitStat(value);
  const [shown, setShown] = useState(parsed ? 0 : null);

  useEffect(() => {
    if (!inView || !parsed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(parsed.n);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setShown(Math.round(parsed.n * (1 - Math.pow(1 - t, 4))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className="tabular">
      {parsed ? (
        <>
          {shown}
          <span className="text-gold/70">{parsed.suffix}</span>
        </>
      ) : (
        value
      )}
    </span>
  );
}

function initialsOf(name: string) {
  return name
    .replace(/^(Mrs?\.?|Ms\.?)\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

/** "A — O Level Chemistry" → grade "A", course "O Level Chemistry". */
function splitDetail(detail: string): { grade?: string; course: string } {
  const match = detail.match(/^([A-E]\*?)\s+—\s+(.*)$/);
  return match ? { grade: match[1], course: match[2] } : { course: detail };
}

export function SocialProof() {
  // The first testimonial in content/results.ts is the featured one.
  const [featured, ...rest] = testimonials;

  return (
    <section
      id="results"
      className="relative isolate scroll-mt-20 overflow-hidden bg-navy-ink py-20 text-white sm:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(244,180,26,0.2),transparent)]" />
        <div className="bg-grid absolute inset-0 opacity-60" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-site px-5">
        <m.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeRise}>
          <SectionHeading
            onDark
            eyebrow="Results & reviews"
            title={
              <>
                The grades <Accent onDark>speak for themselves</Accent>
              </>
            }
            description="Real students, real CAIE results — from the same classrooms you'll sit in."
          />
        </m.div>

        {/* Results wall */}
        <m.dl
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerGroup(0.08)}
          className="mt-14 grid grid-cols-2 overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] backdrop-blur lg:grid-cols-4"
        >
          {resultStats.map(({ value, label }, i) => (
            <m.div
              key={label}
              variants={fadeRise}
              className={`flex flex-col-reverse justify-end gap-2 p-6 sm:p-8 ${
                i % 2 === 1 ? "border-l border-white/10" : ""
              } ${i >= 2 ? "border-t border-white/10 lg:border-t-0" : ""} ${
                i === 2 ? "lg:border-l" : ""
              }`}
            >
              <dt className="min-h-[2.5em] text-sm leading-snug text-slate-400">{label}</dt>
              <dd className="font-display text-5xl font-extrabold tracking-tighter text-gold sm:text-6xl">
                <CountUp value={value} />
              </dd>
            </m.div>
          ))}
        </m.dl>

        {/* Testimonials — featured story + supporting voices */}
        <m.ul
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={staggerGroup(0.1)}
          aria-label="Student testimonials"
          className="mt-6 grid gap-4 md:grid-cols-3 lg:gap-5"
        >
          {featured && (
            <m.li
              variants={cardRise}
              onPointerMove={trackSpotlight}
              className="spotlight relative grid overflow-hidden rounded-[1.75rem] bg-gold p-8 text-navy-dark [--spot:rgba(255,255,255,0.4)] sm:p-10 md:col-span-3 md:grid-cols-[auto_1fr] md:gap-10 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:p-12"
            >
              <span aria-hidden className="font-serif text-[7rem] leading-[0.5] text-navy-dark/25 md:text-[10rem] md:leading-[0.6] lg:self-start">
                &ldquo;
              </span>
              <div className="flex flex-col">
                <blockquote className="mt-6 max-w-3xl font-serif text-[1.65rem] leading-snug sm:text-[2.1rem] md:mt-0 lg:text-[2.5rem]">
                  {featured.quote}
                </blockquote>
                <Person {...featured} tone="gold" hideGradeFrom="lg" />
              </div>
              <GradeMedallion detail={featured.detail} />
            </m.li>
          )}
          {rest.map((t) => (
            <m.li
              key={t.name}
              variants={cardRise}
              onPointerMove={trackSpotlight}
              className="spotlight flex flex-col rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-colors hover:border-white/20 sm:p-7"
            >
              <blockquote className="text-[0.95rem] leading-relaxed text-slate-200">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <Person {...t} tone="dark" />
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}

function Person({
  name,
  detail,
  tone,
  hideGradeFrom,
}: {
  name: string;
  detail: string;
  tone: "gold" | "dark";
  /** The featured card shows the grade as a medallion from this breakpoint up. */
  hideGradeFrom?: "lg";
}) {
  const { grade, course } = splitDetail(detail);
  return (
    <footer className="mt-auto flex items-center gap-3 pt-6">
      <span
        aria-hidden
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold ${
          tone === "gold" ? "bg-navy-dark text-gold" : "bg-gradient-to-br from-gold to-gold-dark text-navy-dark"
        }`}
      >
        {initialsOf(name)}
      </span>
      <div className="min-w-0 flex-1">
        <p className={`font-display text-sm font-bold ${tone === "gold" ? "text-navy-dark" : "text-white"}`}>
          {name}
        </p>
        <p className={`text-xs ${tone === "gold" ? "text-navy-dark/70" : "text-slate-400"}`}>{course}</p>
      </div>
      {grade && (
        <span
          className={`shrink-0 rounded-xl px-3 py-1.5 font-display text-lg font-extrabold ${
            hideGradeFrom === "lg" ? "lg:hidden" : ""
          } ${
            tone === "gold" ? "bg-navy-dark text-gold" : "bg-gold/15 text-gold ring-1 ring-gold/30"
          }`}
          aria-label={`Grade ${grade}`}
        >
          {grade}
        </span>
      )}
    </footer>
  );
}

/** Exam-certificate style seal for the featured student's grade. */
function GradeMedallion({ detail }: { detail: string }) {
  const { grade, course } = splitDetail(detail);
  if (!grade) return null;
  return (
    <div aria-hidden className="relative hidden h-44 w-44 shrink-0 rotate-[-8deg] items-center justify-center lg:flex">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-navy-dark">
        {/* Scalloped rosette edge */}
        <path
          fill="currentColor"
          d={Array.from({ length: 48 }, (_, i) => {
            const a = (i / 48) * Math.PI * 2;
            const r = i % 2 === 0 ? 50 : 46.5;
            return `${i === 0 ? "M" : "L"}${(50 + r * Math.cos(a)).toFixed(2)} ${(50 + r * Math.sin(a)).toFixed(2)}`;
          }).join(" ") + " Z"}
        />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#F4B41A" strokeOpacity="0.55" strokeDasharray="1.5 2.5" />
      </svg>
      <div className="relative text-center text-gold">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-gold/70">Grade</p>
        <p className="font-serif text-6xl leading-none">{grade}</p>
        <p className="mx-auto mt-1 max-w-[6.5rem] text-[0.55rem] font-semibold uppercase leading-tight tracking-wider text-gold/70">
          {course.replace(" & ", " · ")}
        </p>
      </div>
    </div>
  );
}
