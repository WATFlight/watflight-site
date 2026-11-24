// Type roles for the Sponsorship page. The frame's body is a flattened AI screenshot, so its sizes are
// measured from the owner's 3x export (docs/rebuild-notes.md, "Sponsorship page") rather than taken from
// Figma text styles. Where a Design System role is within about 15% of the measured size it is used
// (`type-body-lg`, `type-body`, `type-eyebrow`); the display sizes below have no role at their size
// (the headline is 52px, the section titles 42 to 47px, against Display Page's 64px), so they are set
// here, in the same Bunken faces, and documented as page-local. Classes are literal so Tailwind
// generates them.

const sc = "font-(family-name:--font-display-sc) font-medium";
const std = "font-(family-name:--font-display-std) font-medium";

/** Headline: Bunken SC Wide, 52/60 from 1280px (measured 52px), 40/46 from 768px, 32/38 below. */
export const h1Class = `${sc} text-[32px] leading-[38px] md:text-[40px] md:leading-[46px] xl:text-[52px] xl:leading-[60px]`;

/** Section titles: Bunken SC Wide, 44/52 from 1280px (measured 42 to 47px), 36/44 from 768px, 28/34 below. */
export const h2Class = `${sc} text-[28px] leading-[34px] md:text-[36px] md:leading-[44px] xl:text-[44px] xl:leading-[52px]`;

/** Card and list-row titles: Bunken Std Wide, 18/24, uppercase (measured 18 to 19px). */
export const cardTitleClass = `${std} text-[18px] leading-6 uppercase`;
