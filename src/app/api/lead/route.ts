import { leadSchema } from "@/lib/leadSchema";
import { handleIntake } from "@/lib/webhook";

/**
 * Free-trial-class lead intake. Forwards to LEAD_WEBHOOK_URL (the Google
 * Apps Script behind the "Leads" sheet). See lib/webhook.ts for the flow.
 */
export function POST(request: Request) {
  return handleIntake(request, {
    schema: leadSchema,
    label: "lead",
    webhookUrl: process.env.LEAD_WEBHOOK_URL,
  });
}
