import type { FacultyMember } from "./types";

/**
 * Faculty roster — sourced from the "Meet Our Teacher" Instagram series.
 * TODO(content): add cropped square headshots to /public/images/faculty/
 * and fill in each teacher's one-line credential (qualification + years).
 */
export const faculty: FacultyMember[] = [
  {
    slug: "noor-azeem",
    name: "Dr Noor Azeem",
    subjects: ["Biology", "Chemistry"],
    levels: ["A2 Level", "AS Level"],
    credential: "Doctor by training — A Level sciences specialist",
  },
  {
    slug: "fahad-ali",
    name: "Sir Fahad Ali",
    subjects: ["Physics"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Physics across all Cambridge levels",
  },
  {
    slug: "zaryab-hussain",
    name: "Sir Zaryab Hussain",
    subjects: ["Computer Science"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Computer Science from O Level through A2",
  },
  {
    slug: "mustafa-moten",
    name: "Sir Mustafa Moten",
    subjects: ["Business", "Economics"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Business & Economics across all levels",
  },
  {
    slug: "ahmed-shah",
    name: "Sir Ahmed Shah",
    subjects: ["Chemistry"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Chemistry across all Cambridge levels",
  },
  {
    slug: "ibrahim-ali",
    name: "Sir Ibrahim Ali",
    subjects: ["Maths"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Mathematics from O Level through A2",
  },
  {
    slug: "ali-moten",
    name: "Sir Ali Moten",
    subjects: ["Accounts"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Accounting across all Cambridge levels",
  },
  {
    slug: "ahmed-sewani",
    name: "Sir Ahmed Sewani",
    subjects: ["English"],
    levels: ["O Level"],
    credential: "O Level English language specialist",
  },
  {
    slug: "farah",
    name: "Miss Farah",
    subjects: ["Urdu"],
    levels: ["O Level"],
    credential: "O Level Urdu specialist",
  },
  {
    slug: "waleed-fulara",
    name: "Sir Waleed Fulara",
    subjects: ["Pakistan Studies"],
    levels: ["O Level"],
    credential: "Pakistan Studies specialist",
  },
  {
    slug: "tayyab-ansari",
    name: "Sir Tayyab Ansari",
    subjects: ["Islamiyat"],
    levels: ["O Level"],
    credential: "Islamiyat specialist",
  },
];
