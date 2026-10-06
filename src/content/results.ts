import { faculty } from "./faculty";

/**
 * Results & reviews content.
 * NOTE: verify the two results-flavoured stats (A*–A rate, students coached)
 * against actual records before launch — the teacher/subject counts are factual.
 */

export interface ResultStat {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  /** e.g. "A — O Level Pakistan Studies & Islamiyat" */
  detail: string;
}

export const resultStats: ResultStat[] = [
  { value: "65%+", label: "A*–B grades in recent CAIE results" },
  { value: "150+", label: "students coached across Karachi" },
  { value: String(faculty.length), label: "specialist subject teachers" },
  { value: "12+", label: "Cambridge subjects under one roof" },
];

/** The first entry is featured large on the gold card. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Last year I studied with Sir Waleed Fulara and Sir Tayyab — they were amazing. Achieved an A in both subjects, Alhamdulillah.",
    name: "Fiza Anwer",
    detail: "A — O Level Pakistan Studies & Islamiyat",
  },
  {
    quote:
      "The academy's environment is super adjustable, and the teachers here are so welcoming — they never let you leave with doubts. Fan of Sir Zaryab; the way he clarifies every single concept makes me truly love Computer Science.",
    name: "Mahanoor",
    detail: "O Level Computer Science",
  },
  {
    quote:
      "I joined two months before my CAIEs, honestly scared of Chemistry. The past-paper drills and doubt sessions turned it around — went from a C in mocks to an A in the real exam.",
    name: "Hamza S.",
    detail: "A — O Level Chemistry",
  },
  {
    quote:
      "As a parent, what I value most is the communication. The coordinator keeps us updated on WhatsApp, timings respect school hours, and my daughter actually looks forward to her classes.",
    name: "Mrs. Siddiqui",
    detail: "Parent of a Grade 10 student",
  },
];
