import type { TimeSlot } from "@/content/types";

/**
 * Poster times omit AM/PM ("11:30 – 1:30"); classes run 9 AM – 7 PM,
 * so any hour before 8 is afternoon.
 */
export function toMinutes(clock: string): number {
  const [h, min] = clock.trim().split(":").map(Number);
  return (h < 8 ? h + 12 : h) * 60 + (min || 0);
}

export function parseRange(range: string): [number, number] {
  const [from, to] = range.split("–");
  return [toMinutes(from), toMinutes(to)];
}

function period(minutes: number) {
  return minutes >= 12 * 60 ? "PM" : "AM";
}

/** 810 → "1:30" */
export function clock(minutes: number) {
  const h = Math.floor(minutes / 60) % 12 || 12;
  return `${h}:${String(minutes % 60).padStart(2, "0")}`;
}

/** 810 → { time: "1:30", period: "PM" } */
export function clockParts(minutes: number) {
  return { time: clock(minutes), period: period(minutes) };
}

/** "2:00 – 3:00 PM", or "11:15 AM – 12:15 PM" when it crosses noon. */
export function formatRange(start: number, end: number) {
  return period(start) === period(end)
    ? `${clock(start)} – ${clock(end)} ${period(end)}`
    : `${clock(start)} ${period(start)} – ${clock(end)} ${period(end)}`;
}

/** 90 → "1 hr 30 min" */
export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m} min`;
  return m ? `${h} hr ${m} min` : `${h} hr`;
}

export interface TimedSlot extends TimeSlot {
  start: number;
  end: number;
}

/**
 * Sorts a day's slots and groups the ones whose times overlap — those
 * are parallel classes for different students, shown together.
 */
export function clusterSlots(slots: TimeSlot[]): TimedSlot[][] {
  const timed = slots
    .map((s) => {
      const [start, end] = parseRange(s.time);
      return { ...s, start, end };
    })
    .sort((a, b) => a.start - b.start || a.end - b.end);

  const clusters: TimedSlot[][] = [];
  let clusterEnd = -1;
  for (const slot of timed) {
    if (clusters.length && slot.start < clusterEnd) {
      clusters[clusters.length - 1].push(slot);
      clusterEnd = Math.max(clusterEnd, slot.end);
    } else {
      clusters.push([slot]);
      clusterEnd = slot.end;
    }
  }
  return clusters;
}

export interface LaidOutSlot extends TimedSlot {
  /** Column within its overlap cluster (0-based). */
  lane: number;
  /** How many columns that cluster needs. */
  lanes: number;
}

/**
 * Desktop grid layout: overlapping classes sit side by side instead of
 * on top of each other. Each slot takes the first lane that's free by
 * its start time; a cluster is as wide as its busiest moment needs.
 */
export function layoutLanes(slots: TimeSlot[]): LaidOutSlot[] {
  return clusterSlots(slots).flatMap((cluster) => {
    const laneEnds: number[] = [];
    const placed = cluster.map((slot) => {
      let lane = laneEnds.findIndex((end) => end <= slot.start);
      if (lane === -1) {
        lane = laneEnds.length;
        laneEnds.push(slot.end);
      } else {
        laneEnds[lane] = slot.end;
      }
      return { ...slot, lane };
    });
    return placed.map((slot) => ({ ...slot, lanes: laneEnds.length }));
  });
}
