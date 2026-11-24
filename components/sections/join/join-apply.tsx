import { PageContainer } from "@/components/ui/page-container";
import { cn } from "@/lib/cn";
import { JoinApplicationForm } from "@/components/sections/join/join-application-form";
import { JoinEyebrow } from "@/components/sections/join/join-eyebrow";
import { ApplyGlyph } from "@/components/sections/join/join-icons";
import { sectionTitleClass, stepTitleClass } from "@/components/sections/join/styles";
import { joinApply } from "@/content/join";

/** A decorative connector chevron, in the grey secondary-text color (the accent blue is kept sparing on this page). */
function Chevron({ className, ...props }: { className?: string; "data-draw-end"?: string }) {
  return (
    <svg
      aria-hidden="true"
      {...props}
      focusable="false"
      width="8"
      height="12"
      viewBox="0 0 8 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("shrink-0 text-ink-2", className)}
    >
      <path d="m1.500 1.500 5 4.500-5 4.500" />
    </svg>
  );
}

/**
 * How to apply (frame 344:1128, 1440px reference): the eyebrow, title and one sentence, then the application
 * process as a real ordered list of three steps (Prepare Your Resume, Submit Your Application, Wait to Hear From Us),
 * each a very light numeral and a line icon, a title and a description, and the application form beneath
 * them. Numerals, icons and the arrows between steps are live elements; the numerals, icons
 * and arrows are decorative (aria-hidden: the list already numbers its items and the titles name them).
 * From 768px the steps are three centered columns with a thin grey arrow between each pair; below 768px they
 * form a vertical process: the numeral at the left with a thin grey line and a chevron running down through
 * the steps, in chronological order. The section is the target of the hero's "APPLY NOW" button, so it
 * carries id="how-to-apply". The application form sends the applicant's details and PDF résumé directly
 * to the team instead of relying on a local email app.
 */
export function JoinApply() {
  const steps = joinApply.steps;

  return (
    <section id={joinApply.id} aria-labelledby="join-apply-heading">
      <PageContainer className="py-14 md:py-16 xl:pt-[55px] xl:pb-[38px]">
        <JoinEyebrow>{joinApply.eyebrow}</JoinEyebrow>
        <h2 id="join-apply-heading" data-reveal="" className={cn(sectionTitleClass, "mt-4 text-ink")}>
          {joinApply.title}
        </h2>
        <p data-reveal="" className="type-body-lg mt-4 text-ink">
          {joinApply.description}
        </p>

        {/* Motion (app/motion.css): the connector is drawn by scroll progress and each step comes online as it
            reaches it (data-progress / data-draw / data-at). Everything is plain content without it. */}
        <div data-progress="" className="relative mt-10 md:mt-8 xl:mt-7">
          {/* Decorative vertical line and chevron through the steps (below 768px). */}
          <span
            aria-hidden="true"
            data-draw="y"
            className="absolute top-8 bottom-0 left-[22px] w-px bg-ink-2/50 md:hidden"
          />
          <Chevron
            data-draw-end=""
            className="absolute bottom-0 left-[22px] -translate-x-1/2 rotate-90 md:hidden"
          />

          <ol role="list" className="grid gap-y-12 pb-8 md:grid-cols-3 md:gap-y-0 md:pb-0">
            {steps.map((step, index) => (
              <li
                key={step.title}
                data-at=""
                className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-x-5 md:flex md:flex-col md:items-center md:text-center"
              >
                <span
                  aria-hidden="true"
                  className="relative row-span-2 self-start bg-canvas text-center text-[44px] leading-[44px] font-extralight text-ink md:hidden"
                >
                  {index + 1}
                </span>

                {/* From 768px: the numeral and the icon side by side, centered. */}
                <div className="flex items-center gap-4 md:justify-center">
                  <span aria-hidden="true" className="hidden text-[64px] leading-[64px] font-extralight text-ink md:block">
                    {index + 1}
                  </span>
                  <ApplyGlyph name={step.icon} className="size-8 text-ink md:size-10" />
                </div>

                <div className="mt-3 md:mt-4">
                  <h3 className={stepTitleClass}>{step.title}</h3>
                  <p className="type-body mt-2 max-w-[300px] text-ink-2 text-balance md:mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* From 768px: a thin grey arrow centered on the boundary to the next column, between the groups. */}
                {index < steps.length - 1 ? (
                  <span
                    aria-hidden="true"
                    data-wipe=""
                    className="absolute top-8 right-0 hidden w-[min(137px,calc(100%-150px))] translate-x-1/2 items-center md:flex"
                  >
                    <span className="h-px flex-1 bg-ink-2/60" />
                    <Chevron className="-ml-1" />
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal="" className="mt-12 md:mt-14">
          <JoinApplicationForm />
        </div>
      </PageContainer>
    </section>
  );
}
