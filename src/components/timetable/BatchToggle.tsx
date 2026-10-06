"use client";

import type { BatchId } from "@/content/types";

interface BatchToggleProps {
  value: BatchId;
  onChange: (batch: BatchId) => void;
  labels: Record<BatchId, string>;
}

const HINTS: Record<BatchId, string> = {
  morning: "Mon – Thu",
  evening: "Sat & Sun",
};

function Sun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
}

function Moon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Segmented control for switching schedules. The navy thumb slides on a
 * CSS transform — no layout animation library needed. State lives in
 * the parent.
 */
export function BatchToggle({ value, onChange, labels }: BatchToggleProps) {
  const options: BatchId[] = ["morning", "evening"];

  return (
    <div
      role="tablist"
      aria-label="Choose a batch schedule"
      className="relative mx-auto grid w-full max-w-md grid-cols-2 rounded-full bg-white p-1.5 shadow-card ring-1 ring-navy/[0.07]"
    >
      <span
        aria-hidden
        className={`absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-navy shadow-lg shadow-navy/30 transition-transform duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          value === "evening" ? "translate-x-full" : "translate-x-0"
        }`}
      />
      {options.map((batch) => {
        const active = batch === value;
        return (
          <button
            key={batch}
            role="tab"
            type="button"
            aria-selected={active}
            aria-controls="timetable-panel"
            onClick={() => onChange(batch)}
            className={`relative z-10 flex min-h-14 flex-col items-center justify-center rounded-full px-4 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              active ? "text-white" : "text-navy/60 hover:text-navy"
            }`}
          >
            <span className="flex items-center gap-2 font-display text-sm font-bold">
              <span className={active ? "text-gold" : ""}>
                {batch === "morning" ? <Sun /> : <Moon />}
              </span>
              {labels[batch]}
            </span>
            <span className={`text-[0.7rem] font-medium ${active ? "text-white/60" : "text-navy/40"}`}>
              {HINTS[batch]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
