import { SUBJECTS } from "@/lib/leadSchema";

/**
 * One subject vocabulary for the whole site. The timetable posters use
 * short names ("Islamiat", "Computer"); the form and faculty use the
 * canonical ones from leadSchema — `canonicalSubject` reconciles them.
 */
export type Subject = (typeof SUBJECTS)[number];

const ALIASES: Record<string, Subject> = {
  Islamiat: "Islamiyat",
  Computer: "Computer Science",
};

export function canonicalSubject(name: string): Subject | undefined {
  if (name in ALIASES) return ALIASES[name];
  return (SUBJECTS as readonly string[]).includes(name)
    ? (name as Subject)
    : undefined;
}

export type SubjectGroupId = "sciences" | "maths-cs" | "commerce" | "humanities";

interface SubjectGroup {
  id: SubjectGroupId;
  label: string;
  subjects: Subject[];
  /** Literal Tailwind classes (must stay literal for the JIT compiler). */
  tone: {
    dot: string;
    bar: string;
    soft: string;
  };
}

export const SUBJECT_GROUPS: SubjectGroup[] = [
  {
    id: "sciences",
    label: "Sciences",
    subjects: ["Physics", "Chemistry", "Biology"],
    tone: {
      dot: "bg-sky-400",
      bar: "bg-sky-400",
      soft: "bg-sky-50 text-sky-950 ring-sky-200/80",
    },
  },
  {
    id: "maths-cs",
    label: "Maths & CS",
    subjects: ["Maths", "Computer Science"],
    tone: {
      dot: "bg-violet-400",
      bar: "bg-violet-400",
      soft: "bg-violet-50 text-violet-950 ring-violet-200/80",
    },
  },
  {
    id: "commerce",
    label: "Commerce",
    subjects: ["Business", "Economics", "Accounts"],
    tone: {
      dot: "bg-emerald-400",
      bar: "bg-emerald-400",
      soft: "bg-emerald-50 text-emerald-950 ring-emerald-200/80",
    },
  },
  {
    id: "humanities",
    label: "Languages & Humanities",
    subjects: ["English", "Urdu", "Islamiyat", "Pakistan Studies"],
    tone: {
      dot: "bg-rose-400",
      bar: "bg-rose-400",
      soft: "bg-rose-50 text-rose-950 ring-rose-200/80",
    },
  },
];

export function groupOf(subject: string): SubjectGroup | undefined {
  const canonical = canonicalSubject(subject);
  return SUBJECT_GROUPS.find((g) => canonical && g.subjects.includes(canonical));
}
