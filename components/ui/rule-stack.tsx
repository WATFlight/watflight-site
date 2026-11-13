import { cn } from "@/lib/cn";

type RuleStackProps = {
  /** `top` sits above a band, `bottom` sits below it (mirrored). */
  position: "top" | "bottom";
  className?: string;
};

/**
 * Three stacked horizontal bars (2px, 5px, 8px) framing a cream band. Measurements and color come
 * from the Home frame's line assets: strokes of 2 / 5 / 8px in #F4F4F0 (the cream band color, not
 * the #2B2B2B rule color), with 10 / 5 / 3px gaps counting toward the band. Total height is 33px.
 */
export function RuleStack({ position, className }: RuleStackProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex w-full", position === "top" ? "flex-col" : "flex-col-reverse", className)}
    >
      <div className="h-[2px] bg-ink" />
      <div className="h-[10px]" />
      <div className="h-[5px] bg-ink" />
      <div className="h-[5px]" />
      <div className="h-[8px] bg-ink" />
      <div className="h-[3px]" />
    </div>
  );
}
