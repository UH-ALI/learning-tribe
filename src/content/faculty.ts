import type { FacultyMember } from "./types";

/**
 * Faculty roster — grouped sciences → maths/CS → commerce → languages → humanities.
 * Photos live in /public/images/faculty (cropped square from the top in the card).
 * Teachers without a photo yet fall back to a branded placeholder.
 */
export const faculty: FacultyMember[] = [
  {
    slug: "noor-azeem",
    name: "Dr Noor Azeem",
    subjects: ["Biology", "Chemistry"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Doctor by training — Biology & Chemistry specialist",
    photo: "/images/faculty/noor-azeem.jpeg",
  },
  {
    slug: "abdul-mateen",
    name: "Sir Abdul Mateen",
    subjects: ["Chemistry"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Chemistry from O Level through A2",
    photo: "/images/faculty/abdul-mateen.jpeg",
  },
  {
    slug: "m-bilal",
    name: "Sir M Bilal",
    subjects: ["Chemistry"],
    levels: ["AS Level", "A2 Level"],
    credential: "A Level Chemistry specialist",
    photo: "/images/faculty/m-bilal.jpeg",
  },
  {
    slug: "fahad-ali",
    name: "Sir Fahad Ali",
    subjects: ["Physics"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Physics across all Cambridge levels",
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
  {
    slug: "mustafa-moten",
    name: "Sir Mustafa Moten",
    subjects: ["Business", "Economics"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Business & Economics across all levels",
  },
  {
    slug: "ali-moten",
    name: "Sir Ali Moten",
    subjects: ["Accounts"],
    levels: ["O Level", "AS Level", "A2 Level"],
    credential: "Accounting across all Cambridge levels",
    photo: "/images/faculty/ali-moten.jpeg",
  },
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
    slug: "ayesha",
    name: "Miss Ayesha",
    subjects: ["Urdu"],
    levels: ["O Level"],
    credential: "O Level Urdu specialist",
    avatar: "female",
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
    slug: "tayyab-ansari",
    name: "Sir Tayyab Ansari",
    subjects: ["Islamiyat"],
    levels: ["O Level"],
    credential: "Islamiyat specialist",
    photo: "/images/faculty/tayyab-ansari.jpeg",
  },
];
