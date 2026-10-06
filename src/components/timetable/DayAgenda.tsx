"use client";

import { Fragment } from "react";
import type { TimeSlot } from "@/content/types";
import { canonicalSubject, groupOf, type Subject } from "@/content/subjects";
import {
  clockParts,
  clusterSlots,
  formatDuration,
  formatRange,
  type TimedSlot,
} from "./time";

interface Entry {
  subject: string;
  start: number;
  end: number;
}

function entriesOf(cluster: TimedSlot[]): Entry[] {
  return cluster.flatMap((slot) =>
    slot.subjects.map((subject) => ({ subject, start: slot.start, end: slot.end })),
  );
}

function ClassCard({
  entry,
  highlight,
  showTime = true,
}: {
  entry: Entry;
  highlight: Subject | null;
  showTime?: boolean;
}) {
  const group = groupOf(entry.subject);
  const lit = !!highlight && canonicalSubject(entry.subject) === highlight;
  const dimmed = !!highlight && !lit;

  return (
    <div
      className={`relative rounded-2xl py-3 pl-5 pr-4 ring-1 transition-[opacity,box-shadow] duration-300 ${
        lit ? "bg-gold-pale shadow-glow ring-gold" : group?.tone.soft ?? "bg-slate-50 ring-navy/10"
      } ${dimmed ? "opacity-35" : ""}`}
    >
      <span
        aria-hidden
        className={`absolute inset-y-3 left-2 w-1 rounded-full ${lit ? "bg-gold" : group?.tone.bar ?? "bg-navy/30"}`}
      />
      <p className="font-display text-[1.05rem] font-bold leading-tight text-navy">
        {entry.subject}
      </p>
      {showTime && (
        <p className="mt-1 text-[0.8rem] font-semibold text-navy/65 tabular">
          {formatRange(entry.start, entry.end)}
          <span className="text-navy/40"> · {formatDuration(entry.end - entry.start)}</span>
        </p>
      )}
    </div>
  );
}

function ParallelIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5" aria-hidden>
      <path d="M3 6h11m0 0-3-3m3 3-3 3M17 14H6m0 0 3-3m-3 3 3 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Phone view of one day: a compact list instead of an hour grid.
 * Each class is one row with AM/PM times and its length; overlapping
 * classes (parallel sections for different students) are grouped in
 * one card; gaps between classes show as a short "break" line.
 */
export function DayAgenda({
  title,
  slots,
  highlight,
}: {
  title: string;
  slots: TimeSlot[];
  highlight: Subject | null;
}) {
  const clusters = clusterSlots(slots);
  const first = clusters[0]?.[0]?.start ?? 0;
  const last = Math.max(...clusters.flat().map((s) => s.end));
  const classCount = slots.reduce((n, s) => n + s.subjects.length, 0);

  return (
    <div key={title} className="animate-[plate-in_0.35s_ease-out] px-4 pb-6 pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="font-display text-xl font-bold text-navy">{title}</h3>
        <p className="text-xs font-semibold text-navy/55">
          {classCount} classes · {formatRange(first, last)}
        </p>
      </div>

      <ol className="mt-5 space-y-2.5">
        {clusters.map((cluster, i) => {
          const prevEnd = i > 0 ? Math.max(...clusters[i - 1].map((s) => s.end)) : null;
          const gap = prevEnd === null ? 0 : cluster[0].start - prevEnd;
          const entries = entriesOf(cluster);
          const start = clockParts(cluster[0].start);
          const sameTime = cluster.every((s) => s.start === cluster[0].start && s.end === cluster[0].end);

          return (
            <Fragment key={`${cluster[0].start}-${i}`}>
              {gap >= 10 && (
                <li aria-hidden className="grid grid-cols-[3.5rem_1fr] gap-3">
                  <span />
                  <span className="flex items-center gap-2 text-[0.72rem] font-semibold text-navy/40">
                    <span className="flex-1 border-t border-dashed border-navy/15" />
                    {formatDuration(gap)} break
                    <span className="flex-1 border-t border-dashed border-navy/15" />
                  </span>
                </li>
              )}

              <li className="grid grid-cols-[3.5rem_1fr] gap-3">
                {/* Start time anchors the row for quick scanning */}
                <div className="pt-3 text-right">
                  <p className="font-display text-[1.05rem] font-bold leading-none text-navy tabular">
                    {start.time}
                  </p>
                  <p className="mt-1 text-[0.68rem] font-bold tracking-wide text-navy/45">
                    {start.period}
                  </p>
                </div>

                {entries.length === 1 ? (
                  <ClassCard entry={entries[0]} highlight={highlight} />
                ) : (
                  <div className="rounded-[1.25rem] bg-white p-1.5 ring-1 ring-navy/10">
                    <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 px-2.5 pb-2 pt-1.5 text-[0.7rem] font-bold uppercase tracking-wider text-navy/50">
                      <span className="inline-flex items-center gap-1.5">
                        <ParallelIcon />
                        {entries.length} classes at the same time
                      </span>
                      {sameTime && (
                        <span className="font-semibold normal-case tracking-normal text-navy/65 tabular">
                          {formatRange(cluster[0].start, cluster[0].end)} ·{" "}
                          {formatDuration(cluster[0].end - cluster[0].start)}
                        </span>
                      )}
                    </p>
                    <div className={sameTime ? "grid grid-cols-2 gap-1.5" : "space-y-1.5"}>
                      {entries.map((entry) => (
                        <ClassCard
                          key={`${entry.subject}-${entry.start}`}
                          entry={entry}
                          highlight={highlight}
                          showTime={!sameTime}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </div>
  );
}
