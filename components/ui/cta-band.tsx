import type { ReactNode } from "react";
import { PageContainer } from "@/components/ui/page-container";
import { RuleStack } from "@/components/ui/rule-stack";

type CtaBandProps = {
  /** Used to wire `aria-labelledby`; must be unique on the page. */
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  /** Buttons, rendered in a centered row. */
  children?: ReactNode;
};

/**
 * Full-bleed cream (#F4F4F0) call-to-action band between two rule stacks, as on Home, About,
 * Current Project and Join. Dark text on cream; `focus-on-light` darkens the focus ring so it keeps
 * 3:1 contrast against the cream fill.
 */
export function CtaBand({ id, title, subtitle, description, children }: CtaBandProps) {
  return (
    <section aria-labelledby={`${id}-heading`} className="focus-on-light">
      <RuleStack position="top" />
      <div className="bg-ink text-canvas">
        <PageContainer className="flex flex-col items-center py-16 text-center md:py-24 xl:py-[132px]">
          <h2 id={`${id}-heading`} className="type-display-page text-canvas">
            {title}
          </h2>
          {subtitle ? <p className="type-h2 mt-6 text-canvas">{subtitle}</p> : null}
          {description ? <p className="type-body-lg mt-6 max-w-[536px] text-surface">{description}</p> : null}
          {children ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-[38px]">{children}</div>
          ) : null}
        </PageContainer>
      </div>
      <RuleStack position="bottom" />
    </section>
  );
}
