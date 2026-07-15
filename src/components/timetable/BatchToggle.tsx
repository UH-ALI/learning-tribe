"use client";

import type { BatchId } from "@/content/types";

interface BatchToggleProps {
  value: BatchId;
  onChange: (batch: BatchId) => void;
  labels: Record<BatchId, string>;
}

/** Segmented control for switching schedules. Pure toggle — state lives in the parent. */
export function BatchToggle({ value, onChange, labels }: BatchToggleProps) {
  const options: BatchId[] = ["morning", "evening"];

  return (
    <div
      role="tablist"
      aria-label="Choose a batch schedule"
      className="mx-auto grid w-full max-w-sm grid-cols-2 gap-1 rounded-full bg-navy/10 p-1"
    >
      {options.map((batch) => {
        const active = batch === value;
        return (
          <button
            key={batch}
            role="tab"
            type="button"
            aria-selected={active}
            aria-controls={`timetable-${batch}`}
            onClick={() => onChange(batch)}
            className={`min-h-11 rounded-full px-4 font-display text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${
              active
                ? "bg-navy text-gold shadow"
                : "text-navy/70 hover:text-navy"
            }`}
          >
            {labels[batch]}
          </button>
        );
      })}
    </div>
  );
}
