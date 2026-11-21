// Type roles for the Join page. The frame is a flattened AI export, so its sizes were measured from the
// owner's 3x export (docs/rebuild-notes.md, "Join the Team page"): the headline matches Display Page
// (64/72, measured about 69px), the section titles measure 29 to 34px (they are set at one size, 31px from
// 1280px) and the card titles about 25px. The faces are the Design System's Bunken faces. Classes are
// literal so Tailwind generates them.

const sc = "font-(family-name:--font-display-sc) font-medium";
const std = "font-(family-name:--font-display-std) font-medium";

/** Section titles (h2): Bunken SC Wide, 31/40 from 1280px, 28/36 from 768px, 26/32 below. */
export const sectionTitleClass = `${sc} text-[26px] leading-8 md:text-[28px] md:leading-9 xl:text-[31px] xl:leading-10`;

/** Subteam names (h3): Bunken Std Wide, 26/32 from 1280px, 24/30 from 768px, 22/28 below. */
export const cardTitleClass = `${std} text-[22px] leading-7 md:text-[24px] md:leading-[30px] xl:text-[26px] xl:leading-8`;

/** Step titles (h3): Geist Medium 18/26 (the design's white step titles). */
export const stepTitleClass = "text-lg leading-[26px] font-medium text-ink";
