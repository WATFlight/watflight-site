import { randomUUID } from "node:crypto";

const MAX_REQUEST_BYTES = 3_000_000;
const MAX_RESUME_BYTES = 2 * 1024 * 1024;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";

type FormType = "sponsorship" | "join";

type TurnstileResult = {
  success: boolean;
  hostname?: string;
  action?: string;
};

type EmailPayload = {
  from: string;
  to: string[];
  subject: string;
  text: string;
  reply_to: string;
  attachments?: { filename: string; content: string }[];
  tags: { name: string; value: string }[];
};

function jsonError(message: string, status: number) {
  return Response.json({ ok: false, message }, { status });
}

function textValue(form: FormData, key: string, maxLength: number): string {
  const value = form.get(key);
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

function safeFilename(value: string): string {
  const cleaned = value.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
  return cleaned.slice(0, 120) || "resume.pdf";
}

function requestIp(request: Request): string | undefined {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    undefined
  );
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

async function verifyTurnstile(request: Request, token: string, expectedAction: FormType): Promise<boolean> {
  const secret =
    process.env.TURNSTILE_SECRET_KEY ??
    (process.env.NODE_ENV === "development" ? TURNSTILE_TEST_SECRET : undefined);

  if (!secret) throw new Error("TURNSTILE_SECRET_KEY is not configured");

  const body: Record<string, string> = { secret, response: token };
  const ip = requestIp(request);
  if (ip) body.remoteip = ip;

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) return false;
  const result = (await response.json()) as TurnstileResult;
  if (!result.success) return false;

  // Cloudflare's official development test keys intentionally return no action and example.com.
  if (process.env.NODE_ENV === "production") {
    const requestHostname = new URL(request.url).hostname;
    return result.action === expectedAction && result.hostname === requestHostname;
  }

  return true;
}

function sponsorshipEmail(form: FormData): EmailPayload | Response {
  const name = textValue(form, "name", 120);
  const company = textValue(form, "company", 160);
  const email = textValue(form, "email", 254);
  const message = textValue(form, "message", 5_000);

  if (!name || !email || !message) return jsonError("Complete all required fields.", 400);
  if (!validEmail(email)) return jsonError("Enter a valid work email address.", 400);

  return {
    from: process.env.CONTACT_FROM_EMAIL ?? "",
    to: [process.env.CONTACT_TO_EMAIL ?? ""],
    reply_to: email,
    subject: `Sponsorship inquiry — ${company || name}`,
    text: [
      "New sponsorship inquiry from watflight.com",
      "",
      `Name: ${name}`,
      `Company: ${company || "Not provided"}`,
      `Reply email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n"),
    tags: [{ name: "form", value: "sponsorship" }],
  };
}

async function joinEmail(form: FormData): Promise<EmailPayload | Response> {
  const name = textValue(form, "name", 120);
  const email = textValue(form, "email", 254);
  const subteam = textValue(form, "subteam", 80);
  const message = textValue(form, "message", 2_000);
  const resume = form.get("resume");

  if (!name || !email || !subteam) return jsonError("Complete all required fields.", 400);
  if (!validEmail(email)) return jsonError("Enter a valid email address.", 400);
  if (!(resume instanceof File) || resume.size === 0) return jsonError("Attach your résumé as a PDF.", 400);
  if (resume.size > MAX_RESUME_BYTES) return jsonError("Your résumé must be 2 MB or smaller.", 400);
  if (!resume.name.toLowerCase().endsWith(".pdf")) return jsonError("Your résumé must be a PDF file.", 400);
  if (resume.type && resume.type !== "application/pdf") return jsonError("Your résumé must be a PDF file.", 400);

  const resumeBuffer = Buffer.from(await resume.arrayBuffer());
  if (resumeBuffer.subarray(0, 5).toString("ascii") !== "%PDF-") {
    return jsonError("The attached file is not a valid PDF.", 400);
  }

  return {
    from: process.env.CONTACT_FROM_EMAIL ?? "",
    to: [process.env.CONTACT_TO_EMAIL ?? ""],
    reply_to: email,
    subject: `WATFlight application — ${name} — ${subteam}`,
    text: [
      "New team application from watflight.com",
      "",
      `Name: ${name}`,
      `Reply email: ${email}`,
      `Subteam or area of interest: ${subteam}`,
      "",
      "Additional note:",
      message || "Not provided",
      "",
      `Résumé attached: ${resume.name}`,
    ].join("\n"),
    attachments: [{ filename: safeFilename(resume.name), content: resumeBuffer.toString("base64") }],
    tags: [{ name: "form", value: "join" }],
  };
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return jsonError("This form can only be submitted from watflight.com.", 403);

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return jsonError("The submission is too large. Keep the résumé under 2 MB.", 413);
  }

  if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
    return jsonError("Invalid form submission.", 415);
  }

  try {
    const form = await request.formData();
    const formType = textValue(form, "formType", 32) as FormType;
    const turnstileToken = textValue(form, "turnstileToken", 2_048);
    const website = textValue(form, "website", 200);

    if (website) return Response.json({ ok: true });
    if (formType !== "sponsorship" && formType !== "join") return jsonError("Invalid form submission.", 400);
    if (!turnstileToken) return jsonError("Complete the spam check and try again.", 400);

    const resendApiKey = process.env.RESEND_API_KEY;
    const from = process.env.CONTACT_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL;
    if (!resendApiKey || !from || !to) {
      console.error("Form delivery is missing required environment variables");
      return jsonError("Form delivery is temporarily unavailable. Please try again later.", 503);
    }

    const turnstileValid = await verifyTurnstile(request, turnstileToken, formType);
    if (!turnstileValid) return jsonError("The spam check expired or failed. Please try again.", 400);

    const email = formType === "sponsorship" ? sponsorshipEmail(form) : await joinEmail(form);
    if (email instanceof Response) return email;

    const resendResponse = await fetch(RESEND_EMAILS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": randomUUID(),
      },
      body: JSON.stringify(email),
      signal: AbortSignal.timeout(15_000),
    });

    if (!resendResponse.ok) {
      console.error("Resend delivery failed", { status: resendResponse.status });
      return jsonError("We could not send your submission. Please try again later.", 502);
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Form submission failed", error instanceof Error ? error.message : "Unknown error");
    return jsonError("We could not send your submission. Please try again later.", 500);
  }
}
