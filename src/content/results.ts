/**
 * ⚠️ PLACEHOLDER DATA — every value below is sample copy so the section
 * can be designed and tested. Replace with REAL results and testimonials
 * (with student consent) before launch. Do not publish fabricated results.
 */

export interface ResultStat {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. "A* — A2 Chemistry, CAIE 2025" */
  detail: string;
}

export const resultStats: ResultStat[] = [
  { value: "12", label: "A*s in CAIE 2025 (sample)" },
  { value: "95%", label: "A*–B grades (sample)" },
  { value: "150+", label: "students coached (sample)" },
  { value: "11", label: "specialist teachers" },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "Sample testimonial — replace with a real student quote about their result and experience.",
    name: "Student Name",
    detail: "A* — O Level Chemistry (sample)",
  },
  {
    quote:
      "Sample testimonial — replace with a real parent quote about communication and progress.",
    name: "Parent Name",
    detail: "Parent of Grade 10 student (sample)",
  },
  {
    quote:
      "Sample testimonial — replace with a real student quote about the teaching style.",
    name: "Student Name",
    detail: "A — AS Physics (sample)",
  },
];
