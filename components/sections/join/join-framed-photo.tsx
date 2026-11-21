import { MediaFrame } from "@/components/ui/media-frame";
import type { AssetSlotId } from "@/content/assets";
import { cn } from "@/lib/cn";

type JoinFramedPhotoProps = {
  slot: Extract<AssetSlotId, `JOIN-${string}`>;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** "lg": the hero's 30px corner brackets. "sm": smaller brackets for the subteam pictures. */
  frame?: "lg" | "sm";
  /** "blue": the design's blue frame (the hero). "neutral": the same frame in the grey rule colors (the subteam pictures). */
  tone?: "blue" | "neutral";
  className?: string;
};

// The design draws a thin blue outline with brighter L-shaped brackets on its photographs. They are
// interface elements, so they are rebuilt here as decorative CSS (never baked into the picture, which is
// cropped inside them) and hidden from assistive technology. To keep the accent blue sparing, only the hero
// keeps the blue frame; the three subteam pictures use the same frame in the grey rule colors (the brackets
// in #444444, a step lighter than the #2B2B2B rule so they still read over a dark photograph, the outline in
// #2B2B2B).
const bracketBase = "pointer-events-none absolute";
const bracketColor = { blue: "border-blue", neutral: "border-rule-strong" } as const;
const outlineColor = { blue: "border-blue/30", neutral: "border-rule" } as const;
const bracketSize = { lg: "size-5 md:size-[30px]", sm: "size-3.5 md:size-5" } as const;

/** A photograph in a corner-bracket frame (blue or neutral). The page's grid rails still draw over it. */
export function JoinFramedPhoto({
  slot,
  alt,
  sizes,
  priority = false,
  frame = "lg",
  tone = "blue",
  className,
}: JoinFramedPhotoProps) {
  const b = cn(bracketBase, bracketColor[tone], bracketSize[frame]);
  return (
    <div className={cn("relative", className)}>
      <MediaFrame slot={slot} alt={alt} sizes={sizes} priority={priority} className="w-full" />
      <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0 border", outlineColor[tone])} />
      <span aria-hidden="true" className={cn(b, "top-0 left-0 border-t-2 border-l-2")} />
      <span aria-hidden="true" className={cn(b, "top-0 right-0 border-t-2 border-r-2")} />
      <span aria-hidden="true" className={cn(b, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span aria-hidden="true" className={cn(b, "right-0 bottom-0 border-r-2 border-b-2")} />
    </div>
  );
}
