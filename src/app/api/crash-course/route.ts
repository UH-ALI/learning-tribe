import { crashCourseSchema } from "@/lib/crashCourseSchema";
import { handleIntake } from "@/lib/webhook";

/**
 * Crash-course registration intake.
 *
 * Every payload carries `form: "crash-course"`, which the Apps Script in
 * docs/google-apps-script.gs uses to write it to its own "Crash Course
 * Leads" tab — so by default it shares LEAD_WEBHOOK_URL with the trial
 * form. Set CRASH_COURSE_WEBHOOK_URL to send it to a completely separate
 * spreadsheet instead.
 */
export function POST(request: Request) {
  return handleIntake(request, {
    schema: crashCourseSchema,
    label: "crash-course",
    webhookUrl:
      process.env.CRASH_COURSE_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL,
    extra: { form: "crash-course" },
  });
}
