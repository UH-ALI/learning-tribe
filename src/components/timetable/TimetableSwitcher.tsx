"use client";

import { useState } from "react";
import { timetable } from "@/content/timetable";
import type { BatchId, TimeSlot } from "@/content/types";
import { BatchToggle } from "./BatchToggle";

/**
 * The page's only stateful island so far. Both schedules are rendered
 * up front and toggled with CSS visibility — switching batches costs
 * zero network requests and zero re-layout of images.
 */
export function TimetableSwitcher() {
  const [batch, setBatch] = useState<BatchId>("morning");

  return (
    <div className="mt-10">
      <BatchToggle
        value={batch}
        onChange={setBatch}
        labels={{
          morning: timetable.morning.label,
          evening: timetable.evening.label,
        }}
      />

      {/* Morning Batch */}
      <div
        id="timetable-morning"
        role="tabpanel"
        hidden={batch !== "morning"}
        className="mt-8"
      >
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-navy/60">
          {timetable.morning.audience}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {timetable.morning.days.map(({ day, slots }) => (
            <ScheduleCard key={day} title={day} slots={slots} />
          ))}
        </div>
        <p className="mt-5 rounded-xl bg-gold/10 px-4 py-3 text-center text-sm font-medium text-navy">
          {timetable.morning.fridayNote}
        </p>
      </div>

      {/* Evening Batch */}
      <div
        id="timetable-evening"
        role="tabpanel"
        hidden={batch !== "evening"}
        className="mt-8"
      >
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-navy/60">
          {timetable.evening.audience}
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {timetable.evening.tracks.map(({ track, slots }) => (
            <ScheduleCard key={track} title={track} slots={slots} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScheduleCard({ title, slots }: { title: string; slots: TimeSlot[] }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <h3 className="bg-navy px-4 py-3 text-center font-display text-base font-bold text-gold">
        {title}
      </h3>
      <ul className="divide-y divide-slate-100">
        {slots.map(({ time, subjects }) => (
          <li key={time} className="flex items-baseline gap-3 px-4 py-3">
            <span className="w-24 shrink-0 text-xs font-bold tabular-nums text-navy/60">
              {time}
            </span>
            <span className="text-sm font-semibold text-navy">
              {subjects.join(" · ")}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
