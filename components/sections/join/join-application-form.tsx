"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Turnstile } from "@/components/ui/turnstile";
import { cn } from "@/lib/cn";
import { joinApply } from "@/content/join";

const MAX_RESUME_BYTES = 2 * 1024 * 1024;

type FieldErrors = Partial<Record<"name" | "email" | "subteam" | "resume", string>>;
type Status = "idle" | "submitting" | "sent" | "error";

const controlClass =
  "block w-full rounded-control border border-field-border bg-surface px-4 text-base text-ink placeholder:text-ink-2 " +
  "transition-colors duration-150 motion-reduce:transition-none hover:border-ink " +
  "aria-invalid:border-ink aria-invalid:shadow-[inset_0_0_0_1px_var(--color-ink)]";

function errorId(field: keyof FieldErrors) {
  return `join-application-${field}-error`;
}

export function JoinApplicationForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);

  function clearFieldError(field: keyof FieldErrors) {
    setStatus("idle");
    setStatusMessage("");
    if (!errors[field]) return;
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const subteam = String(formData.get("subteam") ?? "").trim();
    const resume = formData.get("resume");
    const nextErrors: FieldErrors = {};

    if (!name) nextErrors.name = joinApply.form.errors.name;
    if (!email) nextErrors.email = joinApply.form.errors.emailMissing;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = joinApply.form.errors.emailInvalid;
    if (!subteam) nextErrors.subteam = joinApply.form.errors.subteam;
    if (!(resume instanceof File) || resume.size === 0) nextErrors.resume = joinApply.form.errors.resumeMissing;
    else if (resume.size > MAX_RESUME_BYTES) nextErrors.resume = joinApply.form.errors.resumeSize;
    else if (!resume.name.toLowerCase().endsWith(".pdf")) nextErrors.resume = joinApply.form.errors.resumeType;

    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0] as keyof FieldErrors | undefined;
    if (firstError) {
      setStatus("idle");
      setStatusMessage("");
      const firstInvalid = form.elements.namedItem(firstError);
      if (firstInvalid instanceof HTMLElement) firstInvalid.focus();
      return;
    }

    if (!turnstileToken) {
      setStatus("error");
      setStatusMessage(joinApply.form.statusSpamCheck);
      return;
    }

    setStatus("submitting");
    setStatusMessage(joinApply.form.statusSending);
    formData.set("formType", "join");
    formData.set("turnstileToken", turnstileToken);

    try {
      const response = await fetch("/api/forms", { method: "POST", body: formData });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;
      if (!response.ok) throw new Error(result?.message || joinApply.form.statusError);

      form.reset();
      setErrors({});
      setStatus("sent");
      setStatusMessage(joinApply.form.statusSent);
    } catch (error) {
      setStatus("error");
      setStatusMessage(error instanceof Error ? error.message : joinApply.form.statusError);
    } finally {
      setTurnstileToken("");
      setTurnstileReset((current) => current + 1);
    }
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-label={joinApply.form.label}
      aria-busy={status === "submitting"}
      className="mx-auto max-w-[880px]"
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="join-application-website">Website</label>
        <input id="join-application-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 md:gap-x-8">
        <div>
          <label htmlFor="join-application-name" className="type-eyebrow mb-2.5 block font-semibold text-ink">
            {joinApply.form.nameLabel}
          </label>
          <input
            id="join-application-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder={joinApply.form.namePlaceholder}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? errorId("name") : undefined}
            onChange={() => clearFieldError("name")}
            className={cn(controlClass, "h-12")}
          />
          {errors.name ? (
            <p id={errorId("name")} className="motion-status type-body-sm mt-2 text-ink">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="join-application-email" className="type-eyebrow mb-2.5 block font-semibold text-ink">
            {joinApply.form.emailLabel}
          </label>
          <input
            id="join-application-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={joinApply.form.emailPlaceholder}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? errorId("email") : undefined}
            onChange={() => clearFieldError("email")}
            className={cn(controlClass, "h-12")}
          />
          {errors.email ? (
            <p id={errorId("email")} className="motion-status type-body-sm mt-2 text-ink">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="join-application-subteam" className="type-eyebrow mb-2.5 block font-semibold text-ink">
            {joinApply.form.subteamLabel}
          </label>
          <select
            id="join-application-subteam"
            name="subteam"
            required
            defaultValue=""
            aria-invalid={errors.subteam ? true : undefined}
            aria-describedby={errors.subteam ? errorId("subteam") : undefined}
            onChange={() => clearFieldError("subteam")}
            className={cn(controlClass, "h-12 [color-scheme:dark]")}
          >
            <option value="" disabled>
              {joinApply.form.subteamPlaceholder}
            </option>
            {joinApply.form.subteamOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.subteam ? (
            <p id={errorId("subteam")} className="motion-status type-body-sm mt-2 text-ink">
              {errors.subteam}
            </p>
          ) : null}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="join-application-message" className="type-eyebrow mb-2.5 block font-semibold text-ink">
            {joinApply.form.messageLabel}
            <span className="font-normal tracking-normal text-ink-2 normal-case"> (optional)</span>
          </label>
          <textarea
            id="join-application-message"
            name="message"
            rows={4}
            placeholder={joinApply.form.messagePlaceholder}
            onChange={() => {
              setStatus("idle");
              setStatusMessage("");
            }}
            className={cn(controlClass, "min-h-32 resize-y py-3.5")}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="join-application-resume" className="type-eyebrow mb-2.5 block font-semibold text-ink">
            {joinApply.form.resumeLabel}
          </label>
          <input
            id="join-application-resume"
            name="resume"
            type="file"
            accept=".pdf,application/pdf"
            required
            aria-invalid={errors.resume ? true : undefined}
            aria-describedby={cn("join-application-resume-help", errors.resume && errorId("resume"))}
            onChange={() => clearFieldError("resume")}
            className={cn(
              controlClass,
              "min-h-12 cursor-pointer py-2 file:mr-4 file:rounded-control file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-canvas",
            )}
          />
          <p id="join-application-resume-help" className="type-body-sm mt-2 text-ink-2">
            {joinApply.form.resumeHelp}
          </p>
          {errors.resume ? (
            <p id={errorId("resume")} className="motion-status type-body-sm mt-2 text-ink">
              {errors.resume}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-7">
        <Turnstile action="join" resetSignal={turnstileReset} onTokenChange={setTurnstileToken} />
      </div>

      <div className="mt-7">
        <Button type="submit" variant="light" wrap disabled={status === "submitting"}>
          {status === "submitting" ? joinApply.form.submittingLabel : joinApply.form.submitLabel}
          <span aria-hidden="true">→</span>
        </Button>
      </div>

      <p
        role={status === "error" ? "alert" : "status"}
        aria-live="polite"
        className={cn("motion-status type-body-sm text-ink", statusMessage && "mt-3")}
      >
        {statusMessage}
      </p>
    </form>
  );
}
