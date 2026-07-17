import { z } from "zod";

/** Batch options — Morning is weekday, Evening is weekend. */
export const BATCHES = [
  { value: "Morning", hint: "Weekdays" },
  { value: "Evening", hint: "Weekend" },
] as const;

const BATCH_VALUES = BATCHES.map((b) => b.value);

/** Options for the grade dropdown — mirrors the batches we actually run. */
export const GRADES = [
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "O Level",
  "AS Level",
  "A2 Level",
] as const;

/** Subject checkboxes — every subject a faculty member currently teaches. */
export const SUBJECTS = [
  "Maths",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Business",
  "Economics",
  "Accounts",
  "English",
  "Urdu",
  "Islamiyat",
  "Pakistan Studies",
] as const;

/**
 * Validated on the client (react-hook-form resolver) AND re-validated
 * inside /api/lead — never trust the client.
 */
export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "That name looks too long"),
  whatsapp: z
    .string()
    .trim()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .refine(
      (v) => /^(?:\+?92|0)3\d{9}$/.test(v),
      "Enter a valid Pakistani mobile number, e.g. 0317 8915543",
    ),
  grade: z
    .string()
    .refine(
      (v) => (GRADES as readonly string[]).includes(v),
      "Please select your grade / level",
    ),
  batch: z
    .string()
    .refine(
      (v) => (BATCH_VALUES as readonly string[]).includes(v),
      "Please choose a batch",
    ),
  subjects: z
    .array(z.string())
    .min(1, "Pick at least one subject")
    .refine(
      (arr) => arr.every((s) => (SUBJECTS as readonly string[]).includes(s)),
      "Unknown subject selected",
    ),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
