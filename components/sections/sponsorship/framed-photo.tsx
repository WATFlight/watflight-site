import { MediaFrame } from "@/components/ui/media-frame";
import type { AssetSlotId } from "@/content/assets";
import { cn } from "@/lib/cn";

type FramedPhotoProps = {
  slot: Extract<AssetSlotId, `SPONSORSHIP-${string}`>;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

// The design draws a blue L-shaped bracket on each corner of its photographs (30px arms, 2px lines).
// They are interface elements, so they are rebuilt here as decorative CSS (never baked into the image,
// which is cropped inside them) and hidden from assistive technology.
const bracket = "pointer-events-none absolute z-[3] size-5 border-blue md:size-[30px]";

/**
 * A photograph in the design's corner-bracket frame. The page's grid rails still draw over it.
 * Motion (app/motion.css): the picture develops and the four brackets lock in from just outside their
 * corners. The hero (`priority`) plays on first paint with the calibration sweep; the other frame plays
 * once as it scrolls into view.
 */
export function FramedPhoto({ slot, alt, sizes, priority = false, className }: FramedPhotoProps) {
  const corner = (position: "tl" | "tr" | "bl" | "br", step: number) =>
    priority
      ? { "data-bracket": position, "data-enter": "bracket", "data-step": step }
      : { "data-bracket": position, "data-reveal": "bracket" };
  return (
    <div className={cn("relative", className)}>
      <MediaFrame slot={slot} alt={alt} sizes={sizes} priority={priority} scan={priority} className="w-full" />
      <span aria-hidden="true" {...corner("tl", 0)} className={cn(bracket, "top-0 left-0 border-t-2 border-l-2")} />
      <span aria-hidden="true" {...corner("tr", 1)} className={cn(bracket, "top-0 right-0 border-t-2 border-r-2")} />
      <span aria-hidden="true" {...corner("bl", 1)} className={cn(bracket, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span aria-hidden="true" {...corner("br", 2)} className={cn(bracket, "right-0 bottom-0 border-r-2 border-b-2")} />
    </div>
  );
}
