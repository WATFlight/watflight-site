// Type roles for the News & Blog page. The frame is a flattened AI export, so its sizes were measured from the
// owner's 3x export (docs/rebuild-notes.md, "News & Blog page") and mapped to the Design System's faces:
// section titles are Bunken SC Wide like the other pages' section titles (31px from 1280px); the story titles
// are Geist Medium (the frame's white sans titles, about 34px for the featured story and 26px in the cards).
// Classes are literal so Tailwind generates them.

const sc = "font-(family-name:--font-display-sc) font-medium";

/** Section titles (h2): Bunken SC Wide, 31/40 from 1280px, 28/36 from 768px, 26/32 below. */
export const sectionTitleClass = `${sc} text-[26px] leading-8 md:text-[28px] md:leading-9 xl:text-[31px] xl:leading-10`;

/** Featured story title (h2): Geist Medium, 34/42 from 1280px, 30/36 from 768px, 26/32 below. */
export const featuredTitleClass =
  "text-[26px] leading-8 font-medium text-ink md:text-[30px] md:leading-9 xl:text-[34px] xl:leading-[42px]";

/** Story card titles (h3): Geist Medium, 26/33 from 1280px, 22/28 from 1024px, 20/26 below. */
export const cardTitleClass =
  "text-xl leading-[26px] font-medium text-ink lg:text-[22px] lg:leading-7 xl:text-[26px] xl:leading-[33px]";

/** Article page title (h1): Bunken SC Wide uppercase like every page title, 40/48 from 1280px, 32/40 from 768px, 26/32 below. */
export const articleTitleClass =
  "font-(family-name:--font-display-sc) text-[26px] leading-8 font-medium text-ink uppercase text-balance md:text-[32px] md:leading-10 xl:text-[40px] xl:leading-[48px]";

/** Article deck (the summary beside the title): Geist, 20/32 from 768px, 18/29 below, secondary grey. */
export const articleDeckClass = "text-[18px] leading-[29px] text-ink-2 md:text-xl md:leading-8";

/** Article section headings (h2): Bunken Std Wide, uppercase, 24/32 from 1280px, 22/30 from 768px, 20/28 below. */
export const articleHeadingClass =
  "font-(family-name:--font-display-std) text-[20px] leading-7 font-medium text-ink uppercase text-balance md:text-[22px] md:leading-[30px] xl:text-2xl xl:leading-8";

/** Article body text: Geist, 19/32 from 1280px, 18/30 from 768px, 17/27 below, cream at 80%. */
export const articleBodyClass = "text-[17px] leading-[27px] text-ink/80 md:text-[18px] md:leading-[30px] xl:text-[19px] xl:leading-8";

/**
 * The article's unified centered shell: the lead figure and its caption, the body (paragraphs, headings, lists
 * and every other block) and the bottom Back/Next navigation all use it, so they share their left and right
 * edges. 1040px at most below 1600px, 1120px at most from 1600px, and the whole available content width (the
 * page margins are 20px on phones, 32px on tablets, 48px from 1024px) below that. The header above it keeps the
 * full content width.
 */
export const articleShellClass = "mx-auto w-full max-w-[1040px] min-[1600px]:max-w-[1120px]";

/** `sizes` for pictures inside the shell, so browsers request the shell width and not the full rail width. */
export const articleImageSizes =
  "(min-width: 1600px) 1120px, (min-width: 1136px) 1040px, (min-width: 1024px) calc(100vw - 96px), (min-width: 768px) calc(100vw - 64px), calc(100vw - 40px)";

/**
 * Measure for paragraph text inside the shell: 44em, which holds about 95 characters of Geist per line (measured:
 * 100 to 110 characters per line, median 104, when paragraphs filled 48em, and 100 to 116 when they filled the
 * 1040px and 1120px shells at 19px, which is too long). Paragraphs and callout text stop there while headings,
 * lists, figures and the navigation keep the shell's full width. It is in em, not ch: the `ch` unit is the width
 * of "0" (about 12.6px at 19px), so 95ch would be 1197px and would never bind inside a 1040px or 1120px shell.
 */
export const articleMeasureClass = "max-w-[44em]";
