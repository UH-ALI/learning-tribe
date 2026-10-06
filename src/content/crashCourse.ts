/**
 * Copy for the Crash Courses section. Dates, timings and fees aren't
 * published on the site — the coordinator shares them on WhatsApp after
 * a student registers. Form options (levels, exam sessions) live in
 * lib/crashCourseSchema.ts.
 */
export const crashCourse = {
  title: "Exams around the corner?",
  accent: "Get exam-ready, fast.",
  blurb:
    "Short, intensive revision courses for O Level, AS & A2 — taught by the same specialist faculty, right here in Bahadurabad.",
  highlights: [
    {
      title: "Key topics, recapped",
      body: "The syllabus revisited at exam pace, with the tricky topics slowed right down.",
    },
    {
      title: "Past-paper practice",
      body: "Real Cambridge questions worked through and discussed in class.",
    },
    {
      title: "Doubts cleared",
      body: "Ask anything — nobody walks into the exam hall unsure.",
    },
  ],
  note: "Batch dates, timings and fees are shared on WhatsApp once you register.",
};

/** "How it works" steps shown beside the form in crash-course mode. */
export const crashCourseSteps = [
  {
    title: "Register your interest",
    body: "Level, exam session and subjects — that's all we need.",
  },
  {
    title: "Get the plan on WhatsApp",
    body: "Batch dates, timings and fees for your subjects.",
  },
  {
    title: "Revise with specialists",
    body: "Recap, past papers and doubt-clearing before the exam.",
  },
];
