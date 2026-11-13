import type { ReactNode } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { RuleStack } from "@/components/ui/rule-stack";
import { cn } from "@/lib/cn";

type CtaBandProps = {
  /** Used to wire `aria-labelledby`; must be unique on the page. */
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  /**
   * Fill the viewport below the sticky header (`min-height: calc(100svh - var(--header-height))`)
   * and center the content both ways. The rule stacks stay full width at the top and bottom.
   */
  fullViewport?: boolean;
  /** Buttons, rendered in a centered row. */
  children?: ReactNode;
};

/**
 * Full-bleed cream (#F4F4F0) call-to-action band between two rule stacks, as on Home and About.
 * Dark text on cream; `focus-on-light` darkens the focus ring so it keeps 3:1 contrast against the
 * cream fill. `data-header-theme="light"` tells HeaderTheme to switch the sticky header to its light
 * theme while the band is under it. By default, from 1280px the band is 550px tall with its content centered, as in the
 * comps; `fullViewport` makes the whole section (stacks included) at least one viewport tall.
 * Spacing between the title, subtitle, description and buttons follows the Home frame.
 */
export function CtaBand({ id, title, subtitle, description, fullViewport = false, children }: CtaBandProps) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      data-header-theme="light"
      className={cn(
        "focus-on-light",
        fullViewport && "flex min-h-[calc(100svh-var(--header-height))] flex-col",
      )}
    >
      <RuleStack position="top" />
      <div className={cn("bg-ink text-canvas", fullViewport && "flex flex-1 items-center justify-center")}>
        <PageContainer
          className={cn(
            "flex flex-col items-center justify-center py-16 text-center md:py-24",
            fullViewport ? "xl:py-24" : "xl:min-h-[550px] xl:py-0",
          )}
        >
          <h2 id={`${id}-heading`} className="type-display-page text-canvas">
            {title}
          </h2>
          {subtitle ? <p className="type-h2 mt-[9px] text-canvas">{subtitle}</p> : null}
          {description ? (
            <p className="type-band-body mt-[27px] max-w-[536px] text-surface">{description}</p>
          ) : null}
          {children ? (
            <div className="mt-[38px] flex flex-wrap items-center justify-center gap-4 md:gap-[38px]">
              {children}
            </div>
          ) : null}
        </PageContainer>
      </div>
      <RuleStack position="bottom" />
    </section>
  );
}
