import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leadSchema";

/**
 * Lead intake endpoint.
 *
 * Flow: re-validate payload → forward to LEAD_WEBHOOK_URL (Google Apps
 * Script → Google Sheet, Zapier, Make — anything that accepts JSON).
 * The webhook URL lives server-side only; the client never sees it.
 *
 * With no LEAD_WEBHOOK_URL configured (local dev / pre-launch) the lead
 * is logged to the server console and still accepted, so the funnel is
 * testable end-to-end before the sheet is wired up.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body" },
      { status: 400 },
    );
  }

  // Honeypot: real users never see this field. Bots that fill it get a
  // fake success so they don't retry.
  if (
    typeof body === "object" &&
    body !== null &&
    "company" in body &&
    (body as Record<string, unknown>).company
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed" },
      { status: 400 },
    );
  }

  const lead = { ...parsed.data, submittedAt: new Date().toISOString() };
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log("[lead] LEAD_WEBHOOK_URL not set — lead received:", lead);
    return NextResponse.json({ ok: true });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  } catch (error) {
    console.error("[lead] webhook delivery failed:", error);
    // Client shows the WhatsApp fallback — a lead is never dead-ended.
    return NextResponse.json(
      { ok: false, error: "Delivery failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
