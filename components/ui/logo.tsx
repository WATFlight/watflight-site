import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoProps = {
  size?: "header" | "footer";
  className?: string;
};

/**
 * TEMPORARY logo lockup. The exact Figma logo is a vector (WATFLIGHT-mark + WATFLIGHT-wordmark)
 * that has not been exported yet. Until then:
 *  - the mark is the existing raster `public/images/watflight-logo.png` (same hexagon + arrow,
 *    but on a black rounded square), and
 *  - the wordmark is live text in the display-font fallback, not the Figma lettering.
 * Replace this component's contents with the exported SVGs when they are approved.
 * Tracked in docs/rebuild-notes.md.
 */
export function Logo({ size = "header", className }: LogoProps) {
  const isFooter = size === "footer";

  return (
    <span className={cn("inline-flex items-center", isFooter ? "gap-4" : "gap-3", className)}>
      <Image
        src="/images/watflight-logo.png"
        alt=""
        width={isFooter ? 72 : 36}
        height={isFooter ? 72 : 36}
        className={isFooter ? "size-[72px]" : "size-9"}
      />
      <span
        className={cn(
          "font-display-std font-medium uppercase leading-none tracking-[0.14em] text-ink",
          isFooter ? "text-[32px]" : "text-[20px]",
        )}
      >
        WATFlight
      </span>
    </span>
  );
}
