import Image from "next/image";
import { assetSlots, type AssetSlotId } from "@/content/assets";
import { cn } from "@/lib/cn";

type MediaFrameProps = {
  /** Slot id from `content/assets.ts`; the image path and aspect ratio come from the registry. */
  slot: AssetSlotId;
  /** Alt text for an informative image. Use "" for a purely decorative one. */
  alt: string;
  /** Realistic `sizes` for the layout the frame sits in (required because the image uses `fill`). */
  sizes: string;
  priority?: boolean;
  bordered?: boolean;
  /**
   * Skip the registry aspect ratio so the frame can be sized by its parent (stretch, absolute
   * insets). Without it the frame keeps the slot's aspect ratio.
   */
  fluid?: boolean;
  /** Optional gradient overlay classes, for example "bg-gradient-to-r from-black to-transparent". */
  overlayClassName?: string;
  className?: string;
  imageClassName?: string;
};

/**
 * Image slot. When the slot's asset is still missing (`path: null`) it renders an empty framed
 * surface at the right aspect ratio. It never renders substitute photography. In development an
 * empty slot also shows its id so it can be matched to the missing-asset list.
 */
export function MediaFrame({
  slot,
  alt,
  sizes,
  priority = false,
  bordered = false,
  fluid = false,
  overlayClassName,
  className,
  imageClassName,
}: MediaFrameProps) {
  const { path, width, height } = assetSlots[slot];

  return (
    <div
      className={cn("relative overflow-hidden bg-surface", bordered && "border border-rule", className)}
      style={fluid ? undefined : { aspectRatio: `${width} / ${height}` }}
    >
      {path ? (
        <>
          <Image
            src={path}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={cn("object-cover", imageClassName)}
          />
          {overlayClassName ? (
            <div aria-hidden="true" className={cn("absolute inset-0", overlayClassName)} />
          ) : null}
        </>
      ) : process.env.NODE_ENV !== "production" ? (
        <span
          aria-hidden="true"
          className="type-meta absolute inset-0 flex items-center justify-center text-ink-muted"
        >
          {slot}
        </span>
      ) : null}
    </div>
  );
}
