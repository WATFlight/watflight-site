import type { CSSProperties } from "react";
import type { SponsorMarqueeRow } from "@/content/sponsors";
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
  renderedWidth,
} from "@/components/sections/home/sponsor-marquee-parts";

type SponsorMarqueeRowsProps = {
  /** The stored, disjoint row assignment (content/sponsors.ts): each organization appears in exactly one row. */
  rows: readonly SponsorMarqueeRow[];
  /** Identical groups per row's track: one real group plus (copies - 1) hidden copies. */
  copies: number;
  /** Id of the section heading that names the list for assistive technology. */
  labelledBy: string;
};

/**
 * Two independently looping sponsor rows (Sponsorship page, "Our partners"), the Home marquee's look and
 * behavior with more different organizations on screen at once. Every part is Home's: the same logo slots
 * (exact reserved geometry, text fallback in every slot, white artwork), sizes, gaps, edge fade, pause control,
 * client controller and `.sponsor-marquee*` styles.
 *
 * Rows. Each row is its own track with its own group width, so each gets its own duration: the exact
 * rendered width of its group divided by the same speed Home uses (42px/s, 38px/s below 768px), so both
 * rows move at the same pixels per second. Both move left. `startOffset` (stored with the assignment) is
 * applied as a negative animation delay, so the rows begin part-way through their loops and never line up
 * into columns. The motion starts for both rows together, when the shared controller reports a stable track;
 * hovering or focusing anywhere in the marquee, or checking the one pause box, pauses both.
 *
 * Accessibility. The two rows are one list of all 23 organizations, each exposed once: the outer element is
 * a `list` named by the section heading, each real entry a `listitem` (generic wrappers in between are
 * ignored by assistive technology), with the logo's alt text or the visible wordmark as its name. Every
 * loop copy is `aria-hidden`, `inert` and has empty alt text, and requests the same image URLs as the real
 * entry, so no file is downloaded twice. With `prefers-reduced-motion: reduce` the rows, tracks and groups
 * stop wrapping anything (`display: contents`) and the one list becomes a static, wrapping, centered set
 * with no duplicates.
 */
export function SponsorMarqueeRows({ rows, copies, labelledBy }: SponsorMarqueeRowsProps) {
  const style = { "--marquee-copies": copies } as CSSProperties;

  return (
    <div id={ROOT_ID} className="sponsor-marquee" style={style}>
      <MarqueeControls />

      <div role="list" aria-labelledby={labelledBy} className="sponsor-marquee__rows">
        {rows.map(({ entries, startOffset }, rowIndex) => {
          const widthLg = entries.reduce((sum, entry) => sum + renderedWidth(entry), 0) + entries.length * GAP_LG;
          const widthSm = entries.reduce((sum, entry) => sum + renderedWidth(entry) * 0.8, 0) + entries.length * GAP_SM;
          const rowStyle = {
            "--marquee-duration-lg": `${(widthLg / SPEED_LG).toFixed(2)}s`,
            "--marquee-duration-sm": `${(widthSm / SPEED_SM).toFixed(2)}s`,
            "--marquee-start": startOffset,
          } as CSSProperties;

          return (
            <div key={rowIndex} className="sponsor-marquee__row" style={rowStyle}>
              <div className="sponsor-marquee__viewport">
                <div className="sponsor-marquee__track">
                  <div className="sponsor-marquee__group">
                    {entries.map((entry) => (
                      <div key={entry.name} role="listitem" className="sponsor-marquee__item">
                        <MarqueeEntry entry={entry} alt={entry.name} />
                      </div>
                    ))}
                  </div>

                  {Array.from({ length: copies - 1 }, (_, copy) => (
                    <div
                      key={copy}
                      aria-hidden="true"
                      inert
                      className="sponsor-marquee__group sponsor-marquee__group--copy"
                    >
                      {entries.map((entry) => (
                        <div key={entry.name} className="sponsor-marquee__item">
                          <MarqueeEntry entry={entry} alt="" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MarqueeNoscript />
      <SponsorMarqueeController rootId={ROOT_ID} />
    </div>
  );
}
