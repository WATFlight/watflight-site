import type { ReactNode } from "react";

/**
 * The sponsors & partners area as one solid-black "blackout panel" (owner-directed): a block of
 * #050505 with no internal lines, no rule stack at its top and no box around the marquee. Spacing
 * and alignment separate the heading, the scrolling logos and the partner content.
 *
 * It is deliberately NOT in a layer above the global vertical grid rails (it has no z-index at all),
 * so the two rails (`GridRails`, `z-grid`) run uninterrupted from the Project section, through this
 * panel, into the Join band, painted over the black background, the logos and the other graphics.
 * Its only boundary treatment is at the bottom, where the Join band's own top rule stack is already
 * the next thing on the page.
 */
export function HomeBlackoutPanel({ children }: { children: ReactNode }) {
  return <div className="bg-canvas">{children}</div>;
}
