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
  /**
   * Optional overrides for the gap above the description and above the buttons. Home's frame uses
   * 27px and 38px (the defaults, applied with classes so Home's markup is unchanged); the About frame
   * uses 22px and 61px. Applied as inline margins only when given.
   */
  descriptionGap?: string;
  actionsGap?: string;
  /**
   * Replaces the default 1280px-and-up sizing of the cream area ("xl:min-h-[550px] xl:py-0", the About
   * frame) for a frame with another band height: Current Project uses "xl:min-h-[466px] xl:py-0".
   * Pass whole Tailwind classes so they are generated. Ignored with `fullViewport`; when omitted the
   * markup is exactly what Home and About already render.
   */
  contentClassName?: string;
  /** Extra classes for the title, for example `text-balance` for a long title. Omitted: unchanged markup. */
  titleClassName?: string;
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
export function CtaBand({
  id,
  title,
  subtitle,
  description,
  fullViewport = false,
  descriptionGap,
  actionsGap,
  contentClassName,
  titleClassName,
  children,
}: CtaBandProps) {
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
            fullViewport ? "xl:py-24" : (contentClassName ?? "xl:min-h-[550px] xl:py-0"),
          )}
        >
          <h2 id={`${id}-heading`} className={cn("type-display-page text-canvas", titleClassName)}>
            {title}
          </h2>
          {subtitle ? <p className="type-h2 mt-[9px] text-canvas">{subtitle}</p> : null}
          {description ? (
            <p
              className="type-band-body mt-[27px] max-w-[536px] text-surface"
              style={descriptionGap ? { marginTop: descriptionGap } : undefined}
            >
              {description}
            </p>
          ) : null}
          {children ? (
            <div
              className="mt-[38px] flex flex-wrap items-center justify-center gap-4 md:gap-[38px]"
              style={actionsGap ? { marginTop: actionsGap } : undefined}
            >
              {children}
            </div>
          ) : null}
        </PageContainer>
      </div>
      <RuleStack position="bottom" />
    </section>
  );
}
