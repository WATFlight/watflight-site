import { cn } from "@/lib/cn";

type RuleStackProps = {
  /** `top` sits above a band, `bottom` sits below it (mirrored). */
  position: "top" | "bottom";
  className?: string;
};

/**
 * Three stacked horizontal bars (2px, 5px, 8px) used to frame cream bands. Bar thicknesses and gaps
 * were read from the Home frame's line layers (2 / 5 / 8px bars, 10 / 5 / 3px gaps toward the band).
 * The color is the Design System rule color; the stack's tone in Figma is unverified at full
 * resolution. Total height is 33px.
 */
export function RuleStack({ position, className }: RuleStackProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex w-full", position === "top" ? "flex-col" : "flex-col-reverse", className)}
    >
      <div className="h-[2px] bg-rule" />
      <div className="h-[10px]" />
      <div className="h-[5px] bg-rule" />
      <div className="h-[5px]" />
      <div className="h-[8px] bg-rule" />
      <div className="h-[3px]" />
    </div>
  );
}
