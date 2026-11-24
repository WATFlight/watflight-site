"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@/components/ui/turnstile";
import { cn } from "@/lib/cn";
import { sponsorshipContact, type ContactField } from "@/content/sponsorship";

type FieldValues = Record<string, string>;
type FieldErrors = Record<string, string>;
type Status = "idle" | "submitting" | "sent" | "error";

const controlClass =
  "block w-full rounded-control border border-field-border bg-surface px-4 text-base text-ink placeholder:text-ink-2 " +
  "transition-colors duration-150 motion-reduce:transition-none hover:border-ink " +
  "aria-invalid:border-ink aria-invalid:shadow-[inset_0_0_0_1px_var(--color-ink)]";

function fieldError(field: ContactField, element: HTMLInputElement | HTMLTextAreaElement): string {
  // The browser's own constraint validation decides; the wording is ours so it reads the same in every browser.
  if (field.required && element.validity.valueMissing) return field.errorMissing ?? "";
  if (element.validity.typeMismatch || element.validity.patternMismatch) return field.errorInvalid ?? "";
  return "";
}

/**
 * Sponsorship inquiry form, the page's primary contact path. It validates in the browser, verifies a
 * Cloudflare Turnstile token on the server, then sends the inquiry to the team through the shared form
 * endpoint. The sender's address becomes the email's reply-to address. Nothing is stored. The plain team
 * address remains under the button as a secondary option.
 *
 * Layout: each field is a label directly above its control (10px), 26px between rows. From 768px Name and
 * Company share the first row as two equal columns and Work email, Message and the actions span the full
 * form width (rail to rail); below 768px every field is one column. The actions sit under the Message field
 * on the form's left edge. Name, Work email and Message are required (native `required`); Company is
 * optional and says so.
 *
 * Accessibility: every field has a visible label and its autocomplete token; errors appear only for a
 * field that has one, as plain text under it, linked with aria-describedby and aria-invalid, and focus
 * moves to the first invalid field; the status line is an always-present polite live region.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);

  const fields = sponsorshipContact.fields;

  function onChange(field: ContactField, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setStatus("idle");
    setStatusMessage("");
    if (errors[field.id] && fieldError(field, event.currentTarget) === "") {
      setErrors((current) => {
        const next = { ...current };
        delete next[field.id];
        return next;
      });
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const nextErrors: FieldErrors = {};
    const values: FieldValues = {};
    let firstInvalid: HTMLElement | null = null;
    for (const field of fields) {
      const element = form.elements.namedItem(field.id) as HTMLInputElement | HTMLTextAreaElement | null;
      if (!element) continue;
      // Trim so a field holding only spaces counts as empty.
      values[field.id] = element.value.trim();
      const message =
        field.required && values[field.id] === "" ? (field.errorMissing ?? "") : fieldError(field, element);
      if (message) {
        nextErrors[field.id] = message;
        firstInvalid ??= element;
      }
    }

    setErrors(nextErrors);
    if (firstInvalid) {
      setStatus("idle");
      setStatusMessage("");
      firstInvalid.focus();
      return;
    }

    if (!turnstileToken) {
      setStatus("error");
      setStatusMessage(sponsorshipContact.statusSpamCheck);
      return;
    }

    setStatus("submitting");
    setStatusMessage(sponsorshipContact.statusSending);

    const formData = new FormData(form);
    formData.set("formType", "sponsorship");
    formData.set("turnstileToken", turnstileToken);

    try {
      const response = await fetch("/api/forms", { method: "POST", body: formData });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) throw new Error(result?.message || sponsorshipContact.statusError);

      form.reset();
      setErrors({});
      setStatus("sent");
      setStatusMessage(sponsorshipContact.statusSent);
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : sponsorshipContact.statusError);
    } finally {
      setTurnstileToken("");
      setTurnstileReset((current) => current + 1);
    }
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-label={sponsorshipContact.formLabel}
      aria-busy={status === "submitting"}
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="grid gap-y-[26px] md:grid-cols-2 md:gap-x-8">
        {fields.map((field) => {
          const inputId = `contact-${field.id}`;
          const errorId = `${inputId}-error`;
          const error = errors[field.id];
          const common = {
            id: inputId,
            name: field.id,
            required: field.required,
            autoComplete: field.autoComplete,
            placeholder: field.placeholder,
            "aria-invalid": error ? true : undefined,
            "aria-describedby": error ? errorId : undefined,
            onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(field, event),
          };
          return (
            <div key={field.id} className={cn(field.layout === "full" && "md:col-span-2")}>
              <label htmlFor={inputId} className="type-eyebrow mb-2.5 block font-semibold text-ink">
                {field.label}
                {field.labelSuffix ? (
                  <span className="font-normal tracking-normal text-ink-2 normal-case"> {field.labelSuffix}</span>
                ) : null}
              </label>
              {field.type === "textarea" ? (
                <textarea {...common} rows={5} className={cn(controlClass, "min-h-36 resize-y py-3.5")} />
              ) : (
                <input {...common} type={field.type} className={cn(controlClass, "h-12")} />
              )}
              {error ? (
                <p id={errorId} className="type-body-sm mt-2 text-ink">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-7">
        <Turnstile action="sponsorship" resetSignal={turnstileReset} onTokenChange={setTurnstileToken} />
      </div>

      <div className="mt-7">
        <Button type="submit" variant="light" wrap disabled={status === "submitting"}>
          {status === "submitting" ? sponsorshipContact.submittingLabel : sponsorshipContact.submitLabel}
          <span aria-hidden="true">→</span>
        </Button>
      </div>

      <p className="type-body-sm mt-2 flex flex-wrap items-center gap-x-1.5 text-ink-2">
        {sponsorshipContact.directEmailPrompt}{" "}
        <a
          href={`mailto:${sponsorshipContact.email}`}
          className="inline-flex min-h-11 items-center text-ink underline underline-offset-4 transition-colors duration-150 hover:text-blue-light motion-reduce:transition-none"
        >
          {sponsorshipContact.email}
        </a>
      </p>

      <p
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
        className={cn("type-body-sm text-ink", statusMessage && "mt-2")}
      >
        {statusMessage}
      </p>
    </form>
  );
}
