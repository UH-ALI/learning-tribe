"use client";

import { useRef, useState } from "react";
import { m } from "framer-motion";
import { faculty } from "@/content/faculty";
import { SUBJECT_GROUPS, groupOf, type SubjectGroupId } from "@/content/subjects";
import { FacultyCard } from "@/components/faculty/FacultyCard";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import {
  SPRING_TAP,
  VIEWPORT,
  cardRise,
  fadeRise,
  staggerGroup,
} from "@/components/motion/vocabulary";

type Filter = "all" | SubjectGroupId;

function teachesIn(group: SubjectGroupId) {
  return (member: (typeof faculty)[number]) =>
    member.subjects.some((s) => groupOf(s)?.id === group);
}

// Subject families with no teacher on the roster are left out entirely.
const FILTERS: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: "All", count: faculty.length },
  ...SUBJECT_GROUPS.map((g) => ({
    id: g.id,
    label: g.label,
    count: faculty.filter(teachesIn(g.id)).length,
  })).filter((f) => f.count > 0),
];

/** The closing tile fills whatever is left of the last grid row. */
const SPAN_SM: Record<number, string> = { 1: "sm:col-span-1", 2: "sm:col-span-2" };
const SPAN_LG: Record<number, string> = {
  1: "lg:col-span-1",
  2: "lg:col-span-2",
  3: "lg:col-span-3",
  4: "lg:col-span-4",
};

function MatchTile() {
  return (
    <a
      href="#enroll"
      className="group relative flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-dashed border-gold/40 bg-gradient-to-br from-gold/[0.12] to-transparent p-7 transition-colors hover:border-gold sm:min-h-0"
    >
      <span aria-hidden className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gold text-navy-dark">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden>
          <circle cx="10" cy="8" r="4" />
          <path d="M2.5 21c0-4 3.4-7 7.5-7 1.6 0 3 .4 4.2 1.1M19 14v6M16 17h6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="relative mt-10 block">
        <span className="block font-display text-2xl font-bold leading-tight tracking-tight text-white">
          Not sure who to start with?
        </span>
        <span className="mt-2 block max-w-sm text-sm leading-relaxed text-white/65">
          Tell us your subjects and we&apos;ll match you with the right
          specialist for a free trial class.
        </span>
        <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold text-gold">
          Get matched
          <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
        </span>
      </span>
    </a>
  );
}

/**
 * The core trust builder, on a deep navy stage so the portraits glow.
 * Subject filters re-key the list, so each change replays the cascade
 * instead of snapping. Mobile gets a thumb-friendly snap rail.
 */
export function FacultyDirectory() {
  const [filter, setFilter] = useState<Filter>("all");
  const railRef = useRef<HTMLUListElement>(null);

  const visible =
    filter === "all" ? faculty : faculty.filter(teachesIn(filter));

  const choose = (id: Filter) => {
    setFilter(id);
    railRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  return (
    <section
      id="faculty"
      className="relative isolate scroll-mt-20 overflow-hidden bg-navy-ink py-20 text-white sm:py-28"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(42,66,144,0.7),transparent)]" />
        <div className="absolute -right-40 bottom-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgba(244,180,26,0.12),transparent)]" />
        <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-overlay" />
      </div>

      <div className="mx-auto max-w-site px-5">
        <div className="flex flex-col gap-10">
          <m.div initial="hidden" whileInView="visible" viewport={VIEWPORT} variants={fadeRise}>
            <SectionHeading
              onDark
              align="left"
              eyebrow="Meet our teachers"
              title={
                <>
                  Learn from specialists, <Accent onDark>not generalists</Accent>
                </>
              }
              description="Every subject has a dedicated teacher — the same faculty families across Bahadurabad already trust."
            />
          </m.div>

          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={fadeRise}
            role="group"
            aria-label="Filter teachers by subject"
            className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0"
          >
            {FILTERS.map(({ id, label, count }) => {
              const active = filter === id;
              return (
                <m.button
                  key={id}
                  type="button"
                  onClick={() => choose(id)}
                  aria-pressed={active}
                  whileTap={{ scale: 0.95 }}
                  transition={SPRING_TAP}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                    active
                      ? "bg-gold text-navy-dark"
                      : "border border-white/15 text-white/80 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[0.7rem] font-bold tabular ${
                      active ? "bg-navy-dark/15" : "bg-white/10"
                    }`}
                  >
                    {count}
                  </span>
                </m.button>
              );
            })}
          </m.div>
        </div>

        <m.ul
          key={filter}
          ref={railRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px 0px" }}
          variants={staggerGroup(0.06)}
          aria-label="Faculty members"
          className="scrollbar-none -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-4"
        >
          {visible.map((member) => (
            <m.li
              key={member.slug}
              variants={cardRise}
              className="w-[78%] max-w-[20rem] shrink-0 snap-center sm:w-auto sm:max-w-none"
            >
              <FacultyCard member={member} />
            </m.li>
          ))}
          <m.li
            variants={cardRise}
            className={`w-[78%] max-w-[20rem] shrink-0 snap-center sm:w-auto sm:max-w-none ${SPAN_SM[2 - (visible.length % 2)]} ${SPAN_LG[4 - (visible.length % 4)]}`}
          >
            <MatchTile />
          </m.li>
        </m.ul>

        <p className="mt-6 text-center text-xs text-white/40 sm:hidden">
          Swipe to meet the whole team →
        </p>
      </div>
    </section>
  );
}
