"use client";

import { useMemo, useState } from "react";
import { m } from "framer-motion";
import { timetable } from "@/content/timetable";
import type { BatchId, TimeSlot } from "@/content/types";
import { SUBJECTS } from "@/lib/leadSchema";
import { canonicalSubject, groupOf, type Subject } from "@/content/subjects";
import { SPRING_TAP, staggerGroup } from "@/components/motion/vocabulary";
import { BatchToggle } from "./BatchToggle";
import { DayAgenda } from "./DayAgenda";
import { formatRange, layoutLanes, parseRange, type LaidOutSlot } from "./time";

/** Pixel height of one hour on the calendar. */
const HOUR_PX = 76;

interface Column {
  title: string;
  short: string;
  slots: TimeSlot[];
}

const COLUMNS: Record<BatchId, Column[]> = {
  morning: timetable.morning.days.map(({ day, slots }) => ({
    title: day,
    short: day.slice(0, 3),
    slots,
  })),
  evening: timetable.evening.tracks.map(({ track, slots }) => ({
    title: track,
    short: track.replace(" Levels", ""),
    slots,
  })),
};

/** Literal classes per column count — the JIT compiler can't see template strings. */
const GRID_COLS: Record<number, string> = {
  3: "md:grid-cols-[4.5rem_repeat(3,minmax(0,1fr))]",
  4: "md:grid-cols-[4.5rem_repeat(4,minmax(0,1fr))]",
};

function hourLabel(hour: number): string {
  const suffix = hour >= 12 ? "PM" : "AM";
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h} ${suffix}`;
}

function slotHas(slot: TimeSlot, subject: Subject | null) {
  return !!subject && slot.subjects.some((s) => canonicalSubject(s) === subject);
}

/**
 * Two views of the same data. Desktop: a week grid where blocks are
 * sized by duration (overlapping classes side by side), so days compare
 * at a glance. Phone: one day at a time as a compact list (DayAgenda),
 * picked from day tabs that stay pinned under the navbar. "Find your
 * subject" lights up every slot for one subject in both views — zero
 * network, pure client state.
 */
export function TimetableSwitcher() {
  const [batch, setBatch] = useState<BatchId>("morning");
  const [column, setColumn] = useState(0);
  const [highlight, setHighlight] = useState<Subject | null>(null);

  const columns = COLUMNS[batch];

  const { startHour, endHour } = useMemo(() => {
    const ranges = columns.flatMap((c) => c.slots.map((s) => parseRange(s.time)));
    return {
      startHour: Math.floor(Math.min(...ranges.map(([a]) => a)) / 60),
      endHour: Math.ceil(Math.max(...ranges.map(([, b]) => b)) / 60),
    };
  }, [columns]);

  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);
  const height = (endHour - startHour) * HOUR_PX;

  // Subjects offered in this batch, in the form's canonical order.
  const offered = useMemo(() => {
    const present = new Set(
      columns.flatMap((c) => c.slots.flatMap((s) => s.subjects.map(canonicalSubject))),
    );
    return SUBJECTS.filter((s) => present.has(s));
  }, [columns]);

  const switchBatch = (next: BatchId) => {
    setBatch(next);
    setColumn(0);
    setHighlight((h) => (h && COLUMNS[next].some((c) => c.slots.some((s) => slotHas(s, h))) ? h : null));
  };

  const meta = batch === "morning" ? timetable.morning : timetable.evening;

  return (
    <div className="mt-12">
      <BatchToggle
        value={batch}
        onChange={switchBatch}
        labels={{
          morning: timetable.morning.label,
          evening: timetable.evening.label,
        }}
      />

      <p className="mt-5 text-center text-sm font-semibold text-navy/60">{meta.audience}</p>

      {/* Find your subject */}
      <div className="mt-8">
        <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-navy/40">
          Find your subject
        </p>
        <div
          role="group"
          aria-label="Highlight a subject"
          className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
        >
          {offered.map((subject) => {
            const active = highlight === subject;
            const group = groupOf(subject);
            return (
              <m.button
                key={subject}
                type="button"
                whileTap={{ scale: 0.94 }}
                transition={SPRING_TAP}
                aria-pressed={active}
                onClick={() => setHighlight(active ? null : subject)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
                  active
                    ? "bg-gold text-navy-dark shadow-glow"
                    : "bg-white text-navy ring-1 ring-navy/10 hover:ring-navy/30"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${active ? "bg-navy-dark" : group?.tone.dot}`} />
                {subject}
              </m.button>
            );
          })}
        </div>
      </div>

      {/* Calendar */}
      <div
        id="timetable-panel"
        role="tabpanel"
        aria-label={meta.label}
        className="mt-8 overflow-clip rounded-[2rem] bg-white shadow-lift ring-1 ring-navy/[0.07]"
      >
        {/* Mobile: day picker — pinned under the navbar while the day scrolls */}
        <div className="scrollbar-none sticky top-[5.25rem] z-20 flex gap-2 overflow-x-auto border-b border-navy/[0.07] bg-white/95 p-3 backdrop-blur md:hidden">
          {columns.map((c, i) => {
            const matches = c.slots.filter((s) => slotHas(s, highlight)).length;
            return (
              <button
                key={c.title}
                type="button"
                onClick={() => setColumn(i)}
                aria-pressed={column === i}
                className={`relative flex flex-1 shrink-0 flex-col items-center rounded-2xl px-3 py-2 font-display text-sm font-bold transition-colors ${
                  column === i ? "bg-navy text-white" : "bg-cream text-navy/70"
                }`}
              >
                {c.short}
                <span className={`font-sans text-[0.65rem] font-semibold ${column === i ? "text-white/60" : "text-navy/45"}`}>
                  {c.slots.reduce((n, s) => n + s.subjects.length, 0)} classes
                </span>
                {matches > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[0.65rem] text-navy-dark">
                    {matches}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Desktop: column headers */}
        <div className={`hidden border-b border-navy/[0.07] px-2 sm:px-3 md:grid ${GRID_COLS[columns.length]}`}>
          <span />
          {columns.map((c) => (
            <p
              key={c.title}
              className="border-l border-navy/[0.06] px-4 py-4 font-display text-base font-bold text-navy"
            >
              {c.title}
            </p>
          ))}
        </div>

        {/* Phone: one day as a list */}
        <div className="md:hidden">
          <DayAgenda
            title={columns[column].title}
            slots={columns[column].slots}
            highlight={highlight}
          />
        </div>

        {/* Desktop: hour grid comparing every day */}
        <div className="hidden px-2 py-5 sm:px-3 md:block">
          <m.div
            key={batch}
            initial="hidden"
            animate="visible"
            variants={staggerGroup(0.025)}
            className="relative"
            style={{ height }}
          >
            {/* Hour grid lines */}
            {hours.map((h) => (
              <div
                key={h}
                aria-hidden
                className="absolute inset-x-0 border-t border-dashed border-navy/[0.08]"
                style={{ top: (h - startHour) * HOUR_PX }}
              />
            ))}

            <div className={`relative grid h-full ${GRID_COLS[columns.length]}`}>
              {/* Time gutter */}
              <div className="relative">
                {hours.map((h) => (
                  <span
                    key={h}
                    className="absolute right-3 -translate-y-1/2 bg-white pl-1 text-[0.7rem] font-semibold text-navy/40 tabular"
                    style={{ top: (h - startHour) * HOUR_PX }}
                  >
                    {hourLabel(h)}
                  </span>
                ))}
              </div>

              {columns.map((c) => (
                <div key={c.title} className="relative border-l border-navy/[0.06]">
                  {layoutLanes(c.slots).map((slot) => (
                    <SlotBlock
                      key={`${slot.time}-${slot.subjects.join()}`}
                      slot={slot}
                      startHour={startHour}
                      highlight={highlight}
                    />
                  ))}
                </div>
              ))}
            </div>
          </m.div>
        </div>
      </div>

      {batch === "morning" && (
        <div className="mt-5 flex items-start gap-3 rounded-2xl bg-gold-pale px-5 py-4 text-sm text-navy ring-1 ring-gold/30">
          <span aria-hidden className="mt-0.5 text-gold-dark">✦</span>
          <p className="font-medium">{timetable.morning.fridayNote}</p>
        </div>
      )}
    </div>
  );
}

const blockIn = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 160, damping: 20 } },
};

function SlotBlock({
  slot,
  startHour,
  highlight,
}: {
  slot: LaidOutSlot;
  startHour: number;
  highlight: Subject | null;
}) {
  const { start, end, lane, lanes } = slot;
  const top = ((start - startHour * 60) / 60) * HOUR_PX;
  const blockHeight = ((end - start) / 60) * HOUR_PX - 5;

  const groups = slot.subjects.map(groupOf);
  const single = groups.every((g) => g && g.id === groups[0]?.id) ? groups[0] : undefined;
  const lit = slotHas(slot, highlight);
  const dimmed = !!highlight && !lit;

  return (
    <m.div
      variants={blockIn}
      className={`absolute overflow-hidden rounded-xl py-2 pl-4 pr-2.5 ring-1 transition-[opacity,box-shadow,filter] duration-300 ${
        lit
          ? "z-10 bg-gold-pale shadow-glow ring-gold"
          : single
            ? single.tone.soft
            : "bg-slate-50 text-navy ring-navy/10"
      } ${dimmed ? "opacity-30 grayscale" : ""}`}
      // Overlapping classes share the column width, one lane each.
      style={{
        top: top + 2,
        height: blockHeight,
        left: `calc(${(lane / lanes) * 100}% + 6px)`,
        width: `calc(${100 / lanes}% - 10px)`,
      }}
    >
      <span
        aria-hidden
        className={`absolute inset-y-2 left-1.5 w-1 rounded-full ${lit ? "bg-gold" : single?.tone.bar ?? "bg-navy/30"}`}
      />
      <p className="text-[0.72rem] font-semibold opacity-70 tabular">{formatRange(start, end)}</p>
      <p className="mt-0.5 flex flex-wrap gap-x-2.5 gap-y-0.5 font-display text-[0.9rem] font-bold leading-tight text-navy">
        {slot.subjects.map((s, i) => (
          <span key={s} className="inline-flex items-center gap-1.5">
            {!single && <span className={`h-1.5 w-1.5 rounded-full ${groups[i]?.tone.dot ?? "bg-navy/40"}`} />}
            {s}
          </span>
        ))}
      </p>
    </m.div>
  );
}
