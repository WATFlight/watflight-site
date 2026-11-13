import type { CSSProperties } from "react";
import Image from "next/image";
import type { SponsorEntry, SponsorImage } from "@/content/home";
import { SponsorMarqueeController } from "@/components/sections/home/sponsor-marquee-controller";

type SponsorMarqueeProps = {
  logos: readonly SponsorEntry[];
  /** Number of identical groups in the track: one accessible list plus (copies - 1) hidden copies. */
  copies: number;
  /** Id of the section heading that names the list for assistive technology. */
  labelledBy: string;
};

const ROOT_ID = "sponsor-marquee";

// Scroll speed in px per second, desktop and below 768px (logos are 80% size there, gaps are smaller).
const SPEED_LG = 42;
const SPEED_SM = 38;
const GAP_LG = 96;
const GAP_SM = 56;

/** Rough rendered width of one entry at 768px and up, used only to pick a scroll duration. */
function estimateWidth(entry: SponsorEntry): number {
  if (entry.kind === "image") return (entry.displayHeight * entry.width) / entry.height;
  return Math.min(entry.maxWidth, entry.name.length * entry.fontSize * 0.55);
}

/**
 * Font size (px at 768px and up) for the fallback text so it fits its logo's reserved slot: the
 * largest size, up to 20px, at which the word-wrapped text fits the slot's width and height. The
 * estimate uses an average glyph width of 0.56em for Geist Medium; CSS wraps and never shrinks it
 * below 11px, so a longer name wraps instead of shrinking into an unreadable size.
 */
function fallbackSize(text: string, width: number, height: number): number {
  const words = text.split(" ");
  const longest = Math.max(...words.map((w) => w.length));
  for (let fs = 20; fs > 11; fs -= 0.5) {
    const perLine = Math.floor(width / (fs * 0.56));
    if (perLine < longest) continue;
    let lines = 1;
    let used = 0;
    for (const word of words) {
      const next = used === 0 ? word.length : used + 1 + word.length;
      if (next > perLine) {
        lines += 1;
        used = word.length;
      } else {
        used = next;
      }
    }
    if (lines * fs * 1.2 <= height) return fs;
  }
  return 11;
}

/**
 * Auto-scrolling sponsor marquee: white marks and text wordmarks on the black panel, sliding left
 * forever. Markup, pausing and the reduced-motion fallback are server-rendered and CSS-only
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
      <div className="sponsor-marquee__controls sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-2 focus-within:right-4 focus-within:z-10 focus-within:flex focus-within:items-center focus-within:gap-2 focus-within:border focus-within:border-rule-strong focus-within:bg-canvas focus-within:px-3 focus-within:py-2">
        <input id="sponsor-marquee-pause" type="checkbox" className="sponsor-marquee__pause size-4 accent-blue" />
        <label htmlFor="sponsor-marquee-pause" className="type-meta text-ink">
          Pause sponsor scrolling
        </label>
      </div>

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

      {/* Without JavaScript nothing can mark a logo ready or start the motion, so show the logos and run the track. */}
      <noscript>
        <style>{`#${ROOT_ID} .sponsor-marquee__logo{opacity:1}#${ROOT_ID} .sponsor-marquee__fallback{display:none}#${ROOT_ID} .sponsor-marquee__track{animation-play-state:running}`}</style>
      </noscript>
      <SponsorMarqueeController rootId={ROOT_ID} />
    </div>
  );
}

function MarqueeEntry({ entry, alt }: { entry: SponsorEntry; alt: string }) {
  if (entry.kind === "text") {
    return (
      <span
        className="sponsor-marquee__wordmark"
        style={
          {
            "--wordmark-size": `${entry.fontSize}px`,
            "--wordmark-max": `${entry.maxWidth}px`,
          } as CSSProperties
        }
      >
        {entry.name}
      </span>
    );
  }

  return <MarqueeLogo entry={entry} alt={alt} />;
}

function MarqueeLogo({ entry, alt }: { entry: SponsorImage; alt: string }) {
  const slotWidth = (entry.displayHeight * entry.width) / entry.height;

  return (
    <span
      data-logo-slot=""
      className="sponsor-marquee__slot"
      style={
        {
          "--logo-height": `${entry.displayHeight}px`,
          // Exact file ratio: the slot keeps it, so the track's geometry is fixed before any image loads.
          "--logo-ratio": entry.width / entry.height,
          "--fallback-size": `${fallbackSize(entry.wordmark, slotWidth, entry.displayHeight)}px`,
        } as CSSProperties
      }
    >
      <Image
        src={entry.src}
        alt={alt}
        width={entry.width}
        height={entry.height}
        // Rendered at most `displayHeight` px tall; width follows the aspect ratio.
        sizes={`${Math.ceil(slotWidth)}px`}
        // Deferred in the HTML so no logo competes with the hero image; SponsorMarqueeController flips
        // every one to eager the moment the page has loaded, long before the section is reached (and
        // the browser still loads any that are scrolled into view first). Never "priority": that
        // would preload every file.
        loading="lazy"
        fetchPriority="low"
        className="sponsor-marquee__logo"
      />
      <span aria-hidden="true" className="sponsor-marquee__fallback">
        {entry.wordmark}
      </span>
    </span>
  );
}
