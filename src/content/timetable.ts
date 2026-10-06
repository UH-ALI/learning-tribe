import type { TimetableContent } from "./types";

/**
 * Morning schedule transcribed from the Session 2026–27 Morning Program
 * poster; the weekend (Evening Batch) schedule is the October 2026
 * Saturday/Sunday timetable for O, AS & A2. Timings shift between
 * sessions — the section UI always shows the coordinator disclaimer
 * alongside this data.
 */
export const timetable: TimetableContent = {
  morning: {
    label: "Morning Batch",
    audience: "Weekdays · Grades 9, 10 & 11 · Science & Commerce",
    days: [
      {
        day: "Monday",
        slots: [
          { time: "10:00 – 11:00", subjects: ["English"] },
          { time: "11:15 – 12:15", subjects: ["Islamiat"] },
          { time: "12:30 – 1:30", subjects: ["Maths"] },
          { time: "2:00 – 3:00", subjects: ["Accounts", "Chemistry"] },
          { time: "3:00 – 4:00", subjects: ["Physics"] },
        ],
      },
      {
        day: "Tuesday",
        slots: [
          { time: "10:00 – 11:00", subjects: ["English"] },
          { time: "11:30 – 1:30", subjects: ["Maths"] },
          { time: "2:00 – 3:00", subjects: ["Accounts", "Chemistry"] },
          { time: "3:00 – 4:00", subjects: ["Physics"] },
        ],
      },
      {
        day: "Wednesday",
        slots: [
          { time: "9:00 – 10:00", subjects: ["Business"] },
          { time: "10:00 – 11:00", subjects: ["Economics"] },
          { time: "11:15 – 12:40", subjects: ["Islamiat"] },
          { time: "1:00 – 2:00", subjects: ["Urdu"] },
          { time: "2:00 – 3:00", subjects: ["Pakistan Studies"] },
          { time: "3:00 – 4:00", subjects: ["Computer"] },
        ],
      },
      {
        day: "Thursday",
        slots: [
          { time: "9:00 – 10:00", subjects: ["Business"] },
          { time: "10:00 – 11:00", subjects: ["Economics"] },
          { time: "11:30 – 1:00", subjects: ["Urdu"] },
          { time: "2:00 – 3:00", subjects: ["Pakistan Studies"] },
          { time: "3:00 – 4:00", subjects: ["Computer"] },
        ],
      },
    ],
    fridayNote:
      "Friday: Students Enrichment Program, 9:00 AM – 12:00 noon (onsite & offsite sessions, alternating).",
  },
  evening: {
    label: "Evening Batch",
    audience: "Weekend session · Saturday & Sunday",
    tracks: [
      {
        track: "O Levels",
        slots: [
          { time: "10:00 – 11:00", subjects: ["Chemistry"] },
          { time: "12:00 – 1:00", subjects: ["Physics", "Urdu"] },
          { time: "1:00 – 2:00", subjects: ["Maths"] },
          {
            time: "2:00 – 3:00",
            subjects: ["Computer", "Biology", "Business", "Pakistan Studies"],
          },
          { time: "3:00 – 4:00", subjects: ["English"] },
          { time: "4:00 – 5:00", subjects: ["Accounts"] },
          { time: "5:00 – 6:00", subjects: ["Economics"] },
        ],
      },
      {
        track: "AS Levels",
        slots: [
          { time: "11:00 – 12:00", subjects: ["Biology"] },
          { time: "12:00 – 1:00", subjects: ["Maths"] },
          { time: "1:00 – 2:00", subjects: ["Computer", "Chemistry"] },
          { time: "2:00 – 3:00", subjects: ["Physics"] },
          { time: "3:00 – 4:00", subjects: ["Business"] },
          { time: "4:00 – 5:00", subjects: ["Accounts"] },
        ],
      },
      {
        track: "A2 Levels",
        slots: [
          { time: "9:00 – 10:00", subjects: ["Biology"] },
          { time: "11:00 – 12:00", subjects: ["Maths", "Urdu"] },
          { time: "12:00 – 1:00", subjects: ["Chemistry", "Computer"] },
          { time: "1:00 – 2:00", subjects: ["Physics", "Business"] },
          { time: "3:00 – 4:00", subjects: ["Accounts"] },
        ],
      },
    ],
  },
  disclaimer:
    "Timings may vary from batch to batch. Please ask our coordinator on WhatsApp to confirm the current schedule — or to book a free demo class.",
};
