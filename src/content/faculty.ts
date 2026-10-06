import type { FacultyMember } from "./types";

/**
 * Faculty roster. The array order IS the display order (4-col grid on
 * desktop, swipeable rail on mobile; visitors can also filter by subject
 * family). The "Row" comments below group teachers by subject family:
 *   Row 1: Tayyab · Waleed Fulara · Miss Ayesha
 *   Row 2: Fahad · Ibrahim · Zaryab
 *   Row 3: Abdul Mateen · Dr Noor · Danyal
 *   Row 4: Ahmed Sewani · Kamran · M Bilal
 *   Row 5: Mustafa Moten · Ali Moten
 * Photos live in /public/images/faculty as face-centred 4:5 portraits
 * (800×1000, face roughly a third of the way down) so every card frames
 * the same way.
 */
export const faculty: FacultyMember[] = [
  // Row 1 — humanities & languages
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
  {
    slug: "ayesha",
    name: "Miss Ayesha",
    subjects: ["Urdu"],
    levels: ["O Level"],
    credential: "O Level Urdu specialist",
    avatar: "female",
  },

  // Row 2 — physics, maths, computer science
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

  // Row 3 — chemistry & biology
  {
    slug: "abdul-mateen",
    name: "Sir Abdul Mateen",
    subjects: ["Chemistry"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Chemistry from O Level through A2",
    photo: "/images/faculty/abdul-mateen.jpeg",
  },
  {
    slug: "noor-azeem",
    name: "Dr Noor Azeem",
    subjects: ["Biology", "Chemistry"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Doctor by training — Biology & Chemistry specialist",
    photo: "/images/faculty/noor-azeem.jpeg",
  },
  {
    slug: "danyal",
    name: "Sir Danyal",
    subjects: ["Biology"],
    levels: ["O Level"],
    credential: "O Level Biology specialist",
    photo: "/images/faculty/danyal.jpeg",
  },

  // Row 4 — English & A Level chemistry
  {
    slug: "ahmed-sewani",
    name: "Sir Ahmed Sewani",
    subjects: ["English"],
    levels: ["O Level"],
    credential: "O Level English language specialist",
    photo: "/images/faculty/ahmed-sewani.jpeg",
  },
  {
    slug: "kamran-ali",
    name: "Sir Kamran Ali",
    subjects: ["English"],
    levels: ["AS Level", "A2 Level"],
    credential: "A Level English specialist",
  },
  {
    slug: "m-bilal",
    name: "Sir M Bilal",
    subjects: ["Chemistry"],
    levels: ["AS Level", "A2 Level"],
    credential: "A Level Chemistry specialist",
    photo: "/images/faculty/m-bilal.jpeg",
  },

  // Row 5 — commerce
  {
    slug: "mustafa-moten",
    name: "Sir Mustafa Moten",
    subjects: ["Business", "Economics"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Business & Economics across all levels",
    photo: "/images/faculty/mustafa-moten.jpeg",
  },
  {
    slug: "ali-moten",
    name: "Sir Ali Moten",
    subjects: ["Accounts"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Accounting across all Cambridge levels",
    photo: "/images/faculty/ali-moten.jpeg",
  },
];
