import { NextResponse } from "next/server";
import type { z } from "zod";

interface IntakeOptions {
  schema: z.ZodType<object>;
  /** Log prefix, e.g. "lead" or "crash-course". */
  label: string;
  /** Where to forward the submission. Server-side only — never sent to the client. */
  webhookUrl: string | undefined;
  /** Fields added to the forwarded payload, e.g. { form: "crash-course" } for routing. */
  extra?: Record<string, string>;
}

/**
 * Shared intake for every enquiry form.
 *
 * Flow: parse JSON → honeypot check → re-validate with the form's zod
 * schema → forward to the webhook (Google Apps Script → Google Sheet,
 * Zapier, Make — anything that accepts a JSON POST).
 *
 * With no webhook configured (local dev / pre-launch) the submission is
 * logged to the server console and still accepted, so the funnel is
 * testable end-to-end before the sheet is wired up.
 */
export async function handleIntake(
  request: Request,
  { schema, label, webhookUrl, extra }: IntakeOptions,
) {
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

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed" },
      { status: 400 },
    );
  }

  const payload = { ...extra, ...parsed.data, submittedAt: new Date().toISOString() };

  if (!webhookUrl) {
    console.log(`[${label}] no webhook URL set — submission received:`, payload);
    return NextResponse.json({ ok: true });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
  } catch (error) {
    console.error(`[${label}] webhook delivery failed:`, error);
    // Client shows the WhatsApp fallback — a lead is never dead-ended.
    return NextResponse.json(
      { ok: false, error: "Delivery failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
