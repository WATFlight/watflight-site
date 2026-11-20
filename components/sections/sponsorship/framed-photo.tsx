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
const bracket = "pointer-events-none absolute size-5 border-blue md:size-[30px]";

/** A photograph in the design's corner-bracket frame. The page's grid rails still draw over it. */
export function FramedPhoto({ slot, alt, sizes, priority = false, className }: FramedPhotoProps) {
  return (
    <div className={cn("relative", className)}>
      <MediaFrame slot={slot} alt={alt} sizes={sizes} priority={priority} className="w-full" />
      <span aria-hidden="true" className={cn(bracket, "top-0 left-0 border-t-2 border-l-2")} />
      <span aria-hidden="true" className={cn(bracket, "top-0 right-0 border-t-2 border-r-2")} />
      <span aria-hidden="true" className={cn(bracket, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span aria-hidden="true" className={cn(bracket, "right-0 bottom-0 border-r-2 border-b-2")} />
    </div>
  );
}
