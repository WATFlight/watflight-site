import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoProps = {
  size?: "header" | "footer";
  /**
   * Header only: also render the dark artwork and swap between the two with the header theme
   * (`group/header` with `data-theme="light"`), so the logo never goes through a raster filter.
   */
  themed?: boolean;
  className?: string;
};

/**
 * WATFlight lockup (mark + wordmark): the exact vector from the approved Home frame's header
 * `LOGO` layer, saved as `public/images/brand/watflight-lockup.svg` (white artwork for the dark
 * canvas). `watflight-lockup-dark.svg` is the same vector with its fills changed to #050505 (paths
 * untouched), used while the header is on its light theme. The footer uses the white vector at
 * 429px wide, which is how the Figma footer scales it.
 * The images are decorative: the surrounding link supplies the accessible name.
 */
export function Logo({ size = "header", themed = false, className }: LogoProps) {
  const isFooter = size === "footer";
  const width = isFooter ? 429 : 214;
  const height = isFooter ? 72 : 36;
  // Footer: fill the 429px-at-most link around it (a definite width), not a fixed 429px with max-w-full: a
  // percentage max-width inside a shrink-to-fit link does not constrain an image that fails to load, which
  // then pushed the page sideways below about 430px.
  const sizeClasses = isFooter ? "h-auto w-full" : "h-9 w-auto";

  return (
    <>
      <Image
        src="/images/brand/watflight-lockup.svg"
        alt=""
        width={width}
        height={height}
        className={cn(sizeClasses, themed && "group-data-[theme=light]/header:hidden", className)}
      />
      {themed ? (
        <Image
          src="/images/brand/watflight-lockup-dark.svg"
          alt=""
          width={width}
          height={height}
          className={cn(sizeClasses, "hidden group-data-[theme=light]/header:block", className)}
        />
      ) : null}
    </>
  );
}
