import type { CSSProperties } from "react";
import Image from "next/image";
import type { SponsorEntry, SponsorImage } from "@/content/sponsors";

// Shared building blocks of the sponsor marquee, used by Home's single row (SponsorMarquee) and by the
// Sponsorship page's two rows (SponsorMarqueeRows). Everything here was moved out of sponsor-marquee.tsx
// unchanged, so Home's markup is byte-for-byte what it was. The motion, loading and reduced-motion
// behavior live in `.sponsor-marquee*` (app/globals.css) and SponsorMarqueeController.

/** Id of the marquee root: the `<noscript>` rule below targets it. One marquee per page. */
export const ROOT_ID = "sponsor-marquee";

// Scroll speed in px per second, desktop and below 768px (logos are 80% size there, gaps are smaller).
export const SPEED_LG = 42;
export const SPEED_SM = 38;
export const GAP_LG = 96;
export const GAP_SM = 56;

/** Rough rendered width of one entry at 768px and up, used only to pick Home's scroll duration. */
export function estimateWidth(entry: SponsorEntry): number {
  if (entry.kind === "image") return (entry.displayHeight * entry.width) / entry.height;
  return Math.min(entry.maxWidth, entry.name.length * entry.fontSize * 0.55);
}

/**
 * Exact rendered width of one entry at 768px and up: a logo's slot (height x the file's aspect ratio) or a
 * text wordmark's fixed box. Used to balance and time the Sponsorship page's two rows.
 */
export function renderedWidth(entry: SponsorEntry): number {
  return entry.kind === "image" ? (entry.displayHeight * entry.width) / entry.height : entry.maxWidth;
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
 * The visually hidden pause control (it appears while focused). One per marquee, however many rows it has:
 * a checked box pauses every track (`.sponsor-marquee:has(.sponsor-marquee__pause:checked)` in globals.css).
 */
export function MarqueeControls() {
  return (
    <div className="sponsor-marquee__controls sr-only focus-within:not-sr-only focus-within:absolute focus-within:top-2 focus-within:right-4 focus-within:z-10 focus-within:flex focus-within:items-center focus-within:gap-2 focus-within:border focus-within:border-rule-strong focus-within:bg-canvas focus-within:px-3 focus-within:py-2">
      <input id="sponsor-marquee-pause" type="checkbox" className="sponsor-marquee__pause size-4 accent-blue" />
      <label htmlFor="sponsor-marquee-pause" className="type-meta text-ink">
        Pause sponsor scrolling
      </label>
    </div>
  );
}

/** Without JavaScript nothing can mark a logo ready or start the motion, so show the logos and run every track. */
export function MarqueeNoscript() {
  return (
    <noscript>
      <style>{`#${ROOT_ID} .sponsor-marquee__logo{opacity:1}#${ROOT_ID} .sponsor-marquee__fallback{display:none}#${ROOT_ID} .sponsor-marquee__track{animation-play-state:running}`}</style>
    </noscript>
  );
}

export function MarqueeEntry({ entry, alt }: { entry: SponsorEntry; alt: string }) {
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
