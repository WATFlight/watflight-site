"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { sponsorshipContact, type ContactField } from "@/content/sponsorship";

// A mailto: URL longer than this is truncated or refused by some mail clients and browsers.
const MAX_MAILTO_LENGTH = 1800;

type FieldValues = Record<string, string>;
type FieldErrors = Record<string, string>;
type Status = "idle" | "opening" | "tooLong";

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

function buildMailto(values: FieldValues): string {
  const lines = [
    `Name: ${values.name}`,
    // The optional company line is left out when it is empty.
    ...(values.company ? [`Company: ${values.company}`] : []),
    `Email: ${values.email}`,
    "",
    values.message,
  ];
  const body = lines.join("\r\n");
  return `mailto:${sponsorshipContact.email}?subject=${encodeURIComponent(sponsorshipContact.mailtoSubject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Sponsorship inquiry form, the page's primary contact path. There is no backend: "Open email draft"
 * validates the fields with the browser's constraint validation, then hands the message to the visitor's
 * email app through a prefilled mailto: link to the sponsorship address. The button's label and accessible
 * name say exactly that, and nothing ever claims a message was sent (the status line only says the email app
 * should open). Nothing is stored. The plain address sits under the button as the secondary option.
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

  const fields = sponsorshipContact.fields;

  function onChange(field: ContactField, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setStatus("idle");
    if (errors[field.id] && fieldError(field, event.currentTarget) === "") {
      setErrors((current) => {
        const next = { ...current };
        delete next[field.id];
        return next;
      });
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
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
      firstInvalid.focus();
      return;
    }

    const href = buildMailto(values);
    if (href.length > MAX_MAILTO_LENGTH) {
      setStatus("tooLong");
      return;
    }
    setStatus("opening");
    // Hand the message to the visitor's email app through a temporary link click (the same as
    // following a mailto: link). The page stays where it is.
    const link = document.createElement("a");
    link.href = href;
    link.hidden = true;
    document.body.append(link);
    link.click();
    link.remove();
  }

  const statusText =
    status === "opening"
      ? sponsorshipContact.statusOpening
      : status === "tooLong"
        ? sponsorshipContact.statusTooLong
        : "";

  return (
    <form noValidate onSubmit={onSubmit} aria-label={sponsorshipContact.formLabel}>
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
        <Button type="submit" variant="light" wrap>
          {sponsorshipContact.submitLabel}
          <span className="sr-only">{sponsorshipContact.submitSrOnly}</span>
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

      <p role="status" aria-live="polite" className={cn("type-body-sm text-ink", statusText && "mt-2")}>
        {statusText}
      </p>
    </form>
  );
}
