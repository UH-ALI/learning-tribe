"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { faculty } from "@/content/faculty";
import { SUBJECT_GROUPS, groupOf, type SubjectGroupId } from "@/content/subjects";
import { FacultyCard } from "@/components/faculty/FacultyCard";
import { openEnrol } from "@/lib/prefill";
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

const MOBILE_FACES = 6;

function MatchTile() {
  const faces = faculty.filter((f) => f.photo);
  return (
    <a
      href="#enroll"
      onClick={(e) => {
        e.preventDefault();
        openEnrol("trial");
      }}
      className="group relative flex h-full min-h-[22rem] flex-col justify-between gap-8 overflow-hidden rounded-[1.75rem] border border-gold/25 bg-gradient-to-br from-gold/[0.14] via-white/[0.03] to-transparent p-7 transition-colors hover:border-gold/60 sm:min-h-0"
    >
      <span aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />

      {/* The whole team in one overlapping row; phones show six plus a count */}
      <span aria-hidden className="relative flex -space-x-3">
        {faces.map((f, i) => (
          <span
            key={f.slug}
            className={`relative h-12 w-12 overflow-hidden rounded-full ring-[3px] ring-navy-ink transition-transform duration-500 group-hover:-translate-y-1 sm:h-14 sm:w-14 ${
              i >= MOBILE_FACES ? "hidden sm:block" : ""
            }`}
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            <Image src={f.photo!} alt="" fill sizes="56px" className="object-cover object-top" />
          </span>
        ))}
        {faces.length > MOBILE_FACES && (
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gold font-display text-sm font-extrabold text-navy-dark ring-[3px] ring-navy-ink sm:hidden">
            +{faces.length - MOBILE_FACES}
          </span>
        )}
      </span>

      <span className="relative block">
        <span className="block font-display text-2xl font-bold leading-tight tracking-tight text-white">
          Not sure who to start with?
        </span>
        <span className="mt-2 block max-w-sm text-sm leading-relaxed text-white/65">
          Tell us your subjects and we&apos;ll match you with the right
          specialist for a free trial class.
        </span>
        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-display text-sm font-bold text-navy-dark">
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
      className="relative isolate scroll-mt-20 overflow-hidden bg-navy-ink pb-20 pt-14 text-white sm:pb-28 sm:pt-20"
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
