/** Shared content types — Phase 2 will lift these into the database schema. */

export type Level = "O Level" | "AS Level" | "A2 Level";

export interface FacultyMember {
  /** Stable id, used as React key and (later) for pre-filling the lead form. */
  slug: string;
  /** Display name including honorific, e.g. "Dr Noor Azeem". */
  name: string;
  /** Subjects taught, rendered as gold pills. */
  subjects: string[];
  /** Cambridge levels covered. */
  levels: Level[];
  /** One-line credential, e.g. "MBBS — 8+ years teaching A Level Biology". */
  credential?: string;
  /** Path under /public, e.g. "/images/faculty/noor-azeem.jpg". Optional — card falls back to a placeholder. */
  photo?: string;
  /**
   * Placeholder shown when there is no photo:
   * - "female" renders a girl profile logo,
   * - otherwise (default) the card shows the teacher's initials.
   */
  avatar?: "female";
}

export type BatchId = "morning" | "evening";

export interface TimeSlot {
  /** Display time range, e.g. "10:00 – 11:00". */
  time: string;
  /** Subjects running in this slot (parallel sections share a slot). */
  subjects: string[];
}

/** Morning Program: weekday grid, one column of slots per day. */
export interface MorningDay {
  day: string;
  slots: TimeSlot[];
}

/** Evening Program: weekend session, one column of slots per Cambridge track. */
export interface EveningTrack {
  track: "O Levels" | "AS Levels" | "A2 Levels";
  slots: TimeSlot[];
}

export interface TimetableContent {
  morning: {
    label: string;
    audience: string;
    days: MorningDay[];
    fridayNote: string;
  };
  evening: {
    label: string;
    audience: string;
    tracks: EveningTrack[];
  };
  /** Shown under both batches — timings can shift between sessions. */
  disclaimer: string;
}

export interface SiteContent {
  brandName: string;
  tagline: string;
  city: string;
  addressLines: string[];
  phones: string[];
  /** International format, digits only — used to build the wa.me deep link. */
  whatsappNumber: string;
  whatsappPrefill: string;
  instagramUrl: string;
  mapsUrl: string;
  /** Urgency strip under the hero CTAs. */
  sessionNote: string;
}
