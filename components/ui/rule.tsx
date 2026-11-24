import { cn } from "@/lib/cn";

type RuleProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

/**
 * Decorative 1px rule in the Design System grid/border color (#2B2B2B).
 *
 * `relative z-10` keeps the rule above neighbouring photographs. Image sections are positioned, so
 * they paint after in-flow blocks; without a layer of its own a rule that lands on a fractional
 * pixel (any layout driven by an aspect ratio) is covered by the image's edge pixels and can
 * disappear between two images. The layer is local to <main> / <footer>, see "Stacking layers" in
 * app/globals.css.
 */
export function Rule({ orientation = "horizontal", className }: RuleProps) {
  return (
    <div
      aria-hidden="true"
      data-reveal={orientation === "horizontal" ? "rule" : "rule-y"}
      className={cn(
        "relative z-10 bg-rule",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
    />
  );
}
