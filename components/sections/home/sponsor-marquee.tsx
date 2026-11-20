import type { CSSProperties } from "react";
import type { SponsorEntry } from "@/content/home";
import { SponsorMarqueeController } from "@/components/sections/home/sponsor-marquee-controller";
import {
  GAP_LG,
  GAP_SM,
  MarqueeControls,
  MarqueeEntry,
  MarqueeNoscript,
  ROOT_ID,
  SPEED_LG,
  SPEED_SM,
  estimateWidth,
} from "@/components/sections/home/sponsor-marquee-parts";

type SponsorMarqueeProps = {
  logos: readonly SponsorEntry[];
  /** Number of identical groups in the track: one accessible list plus (copies - 1) hidden copies. */
  copies: number;
  /** Id of the section heading that names the list for assistive technology. */
  labelledBy: string;
};

/**
 * Auto-scrolling sponsor marquee: white marks and text wordmarks on the black panel, sliding left
 * forever. This is the one-row version (Home); the Sponsorship page's two-row version, SponsorMarqueeRows,
 * is built from the same parts (sponsor-marquee-parts.tsx). Markup, pausing and the reduced-motion fallback are server-rendered and CSS-only
 * (`.sponsor-marquee*` in app/globals.css); the one small client piece, SponsorMarqueeController,
 * only reports which logos have loaded and starts the motion once the track is stable.
 *
 * Loading (why the row is never empty)
 *  - Every logo is a reserved slot (`.sponsor-marquee__slot`, exact width and height from the file's
 *    aspect ratio) holding the <img> and a short text wordmark. The wordmark is visible from the
 *    first server-rendered byte until the image is ready (or if it fails, permanently); then the
 *    controller marks the slot `data-state="ready"` and CSS swaps text for logo in place, so nothing
 *    resizes or moves. The marquee itself is never hidden.
 *  - Every image is `fetchpriority="low"`. They are `loading="lazy"` in the HTML so nothing competes
 *    with the hero image (measured: eager logos cost the hero's LCP about 190ms on a throttled
 *    connection), and the controller flips them all to `eager` as soon as the page's load event fires,
 *    so every unique file is downloading, and normally ready, long before the section scrolls into
 *    view. Copies request the same URLs as the real list, so the browser downloads each file once.
 *  - The track animation stays paused until fonts are ready and the images have settled (or three
 *    seconds have passed) and the track's width has stopped changing.
 *
 * Accessibility
 *  - The first group is the one real list (`ul` labelled by the section heading): each organization
 *    appears once, as an image with its full name as alt text or as visible text. Every other group
 *    is a copy that is `aria-hidden`, `inert` (so nothing in it can take focus) and has empty alt
 *    text, so assistive technology never meets a duplicate. The fallback text is `aria-hidden`: the
 *    alt text already names the organization (and is what a broken image exposes).
 *  - Motion pauses on hover and whenever focus is inside the marquee. The visually hidden
 *    "Pause sponsor scrolling" checkbox is reachable by keyboard (it appears while focused) and
 *    holds the pause until unchecked.
 *  - With `prefers-reduced-motion: reduce` the animation, copies and checkbox are removed and the
 *    list becomes a static, wrapping, centered list with no duplicated logos.
 */
export function SponsorMarquee({ logos, copies, labelledBy }: SponsorMarqueeProps) {
  const widthLg = logos.reduce((sum, entry) => sum + estimateWidth(entry), 0) + logos.length * GAP_LG;
  const widthSm = logos.reduce((sum, entry) => sum + estimateWidth(entry) * 0.8, 0) + logos.length * GAP_SM;

  const style = {
    "--marquee-copies": copies,
    "--marquee-duration-lg": `${Math.round(widthLg / SPEED_LG)}s`,
    "--marquee-duration-sm": `${Math.round(widthSm / SPEED_SM)}s`,
  } as CSSProperties;

  return (
    <div id={ROOT_ID} className="sponsor-marquee" style={style}>
      <MarqueeControls />

      <div className="sponsor-marquee__viewport">
        <div className="sponsor-marquee__track">
          {/* role="list" keeps the list semantics in Safari/VoiceOver, which drops them with list-style: none. */}
          <ul role="list" aria-labelledby={labelledBy} className="sponsor-marquee__group">
            {logos.map((entry) => (
              <li key={entry.name} className="sponsor-marquee__item">
                <MarqueeEntry entry={entry} alt={entry.name} />
              </li>
            ))}
          </ul>

          {Array.from({ length: copies - 1 }, (_, copy) => (
            <ul
              key={copy}
              aria-hidden="true"
              inert
              className="sponsor-marquee__group sponsor-marquee__group--copy"
            >
              {logos.map((entry) => (
                <li key={entry.name} className="sponsor-marquee__item">
                  <MarqueeEntry entry={entry} alt="" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <MarqueeNoscript />
      <SponsorMarqueeController rootId={ROOT_ID} />
    </div>
  );
}
