import { z } from "zod";
import { nameField, subjectsField, whatsappField } from "./leadSchema";

/** Crash courses are exam prep, so they're offered by Cambridge level only. */
export const CRASH_LEVELS = ["O Level", "AS Level", "A2 Level"] as const;

/** Which Cambridge exam series the student is preparing for. Edit as sessions roll over. */
export const EXAM_SESSIONS = ["Oct/Nov 2026", "May/June 2027"] as const;

/**
 * Validated on the client AND re-validated inside /api/crash-course.
 * Kept separate from the trial-class lead so each lands in its own sheet.
 */
export const crashCourseSchema = z.object({
  name: nameField,
  whatsapp: whatsappField,
  level: z
    .string()
    .refine(
      (v) => (CRASH_LEVELS as readonly string[]).includes(v),
      "Please select your level",
    ),
  session: z
    .string()
    .refine(
      (v) => (EXAM_SESSIONS as readonly string[]).includes(v),
      "Please choose your exam session",
    ),
  subjects: subjectsField,
});

export type CrashCourseInput = z.input<typeof crashCourseSchema>;
export type CrashCourseLead = z.output<typeof crashCourseSchema>;
