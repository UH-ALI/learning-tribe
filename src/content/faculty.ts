import type { FacultyMember } from "./types";

/**
 * Faculty roster. The array order IS the display order (4-col grid on
 * desktop, swipeable rail on mobile; visitors can also filter by subject
 * family). Entries are grouped by subject family below.
 * Photos live in /public/images/faculty as face-centred 4:5 portraits
 * (800×1000, face roughly a third of the way down) so every card frames
 * the same way.
 */
export const faculty: FacultyMember[] = [
  // Humanities & languages
  {
    slug: "tayyab-ansari",
    name: "Sir Tayyab Ansari",
    subjects: ["Islamiyat"],
    levels: ["O Level"],
    credential: "Islamiyat specialist",
    photo: "/images/faculty/tayyab-ansari.jpeg",
  },
  {
    slug: "waleed-fulara",
    name: "Sir Waleed Fulara",
    subjects: ["Pakistan Studies"],
    levels: ["O Level"],
    credential: "Pakistan Studies specialist",
    photo: "/images/faculty/waleed-fulara.jpeg",
  },

  // Physics, maths, computer science
  {
    slug: "fahad-ali",
    name: "Sir Fahad Ali",
    subjects: ["Physics"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Physics across all Cambridge levels",
    photo: "/images/faculty/fahad-ali.jpeg",
  },
  {
    slug: "ibrahim-ali",
    name: "Sir Ibrahim Ali",
    subjects: ["Maths"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Mathematics from O Level through A2",
    photo: "/images/faculty/ibrahim-ali.jpeg",
  },
  {
    slug: "zaryab-hussain",
    name: "Sir Zaryab Hussain",
    subjects: ["Computer Science"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Computer Science from O Level through A2",
    photo: "/images/faculty/zaryab-hussain.jpeg",
  },

  // Chemistry & biology
  {
    slug: "noor-azeem",
    name: "Dr Noor Azeem",
    subjects: ["Biology", "Chemistry"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Doctor by training — Biology & Chemistry specialist",
    photo: "/images/faculty/noor-azeem.jpeg",
  },

  // English
  {
    slug: "ahmed-sewani",
    name: "Sir Ahmed Sewani",
    subjects: ["English"],
    levels: ["O Level"],
    credential: "O Level English language specialist",
    photo: "/images/faculty/ahmed-sewani.jpeg",
  },

  // Commerce
  {
    slug: "hammad-muneer",
    name: "Sir Hammad Muneer",
    subjects: ["Accounts"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Accounting across all Cambridge levels",
    photo: "/images/faculty/hammad-muneer.jpeg",
  },
  {
    slug: "unais-iqbal",
    name: "Sir Unais Iqbal",
    subjects: ["Business"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Business from O Level through A2",
    photo: "/images/faculty/unais-iqbal-portrait.jpeg",
  },
  {
    slug: "shehnil-kashif",
    name: "Sir Shehnil Kashif",
    subjects: ["Economics"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Economics from O Level through A2",
    photo: "/images/faculty/shehnil-kashif-portrait.jpeg",
  },
];
