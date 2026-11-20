// Shared sponsor and partner roster.
//
// This is the owner-approved list of 23 organizations (in the owner's order) with each entry's accessible
// name, white-logo artwork and provenance. It was moved verbatim out of content/home.ts so the Home
// marquee and the Sponsorship page read ONE list instead of two copies; content/home.ts re-exports the
// types and builds its marquee settings from `sponsorLogos`. Do not edit entries here without updating
// the inventory in docs/rebuild-notes.md ("Sponsor logo treatment and inventory").

/** Where a logo or name came from, for the inventory in docs/rebuild-notes.md. */
type SponsorSource =
  | { type: "figma"; layer: string }
  | { type: "official-site"; url: string }
  /** A logo file the team supplied themselves; the untouched file is kept as `sourceFile`. */
  | { type: "owner-supplied"; note: string }
  | { type: "none"; note: string };

type SponsorBase = {
  /** Full organization name: the logo's alt text, or the visible wordmark text. */
  name: string;
  /** How the owner's list names it, when it is on the list (null: kept from the earlier approved set). */
  listedAs: string | null;
  source: SponsorSource;
};

/** A white-on-transparent logo. The untouched source file sits next to `white/` (see `sourceFile`). */
export type SponsorImage = SponsorBase & {
  kind: "image";
  /**
   * Derived white artwork, see "Sponsor logo treatment" in docs/rebuild-notes.md. The one exception is the
   * "Made with Notion" badge, whose `src` is the supplied SVG itself (it is already white on black).
   */
  src: string;
  /** Untouched source asset in /public/images/home/sponsors. */
  sourceFile: string;
  /**
   * Short visible name shown in the logo's reserved slot while the image is loading or if it fails
   * (Geist on the black panel, same contrast as the permanent text wordmarks). The logo's `alt`
   * (the full `name`) stays the accessible name; this text is decorative and `aria-hidden`.
   */
  wordmark: string;
  /** Intrinsic size of `src`. */
  width: number;
  height: number;
  /**
   * Height in px at 768px and up (scaled to 80% below that), tuned per logo against its trimmed
   * aspect ratio so wordmarks and stacked marks carry a similar optical weight in the row.
   */
  displayHeight: number;
};

/**
 * Clean text-only wordmark for an organization whose official logo is pending: no graphic is used
 * unless the official identity is unambiguous and the asset is available from the organization.
 * The visible text is the accessible name, so it is announced exactly once.
 */
export type SponsorWordmark = SponsorBase & {
  kind: "text";
  /** Font size in px at 768px and up (scaled to 80% below that). */
  fontSize: number;
  /**
   * Width in px of the wordmark's box (scaled with the font on small screens): the width at which
   * the text wraps, and a fixed width, so the track's geometry never depends on which font has
   * loaded. A one-word wordmark gets its natural Geist width (HOMLab: 116.5px at 28px) plus a little.
   */
  maxWidth: number;
};

export type SponsorEntry = SponsorImage | SponsorWordmark;

const sponsorDir = "/images/home/sponsors/white";

/**
 * The owner's list of 23 organizations, in the owner's order. Figma
 * stores its logos as raster fills ('image N' layers in the Home frame, 262:79); the white versions
 * are made from the untouched originals by a luminance-to-alpha conversion (ink density becomes
 * white opacity, light areas become transparent, existing transparency is kept), so internal detail
 * survives as tone. No CSS filter or mask is applied. Logo files the team supplied directly
 * (`owner-supplied`) are treated as authoritative and go through the same conversion.
 *
 * 20|20 Laboratory and Fuel Cell Green Energy Lab are one organization: the owner confirmed that the
 * 20|20 Laboratory logo is the Fuel Cell Green Energy Lab's logo, so the two are a single entry
 * (the University of Waterloo's own pages say "Fuel Cell and Green Energy Lab"; the logo reads
 * "20|20 Laboratory for Fuel Cell & Green Energy RD&D"; the owner-specified accessible name carries
 * both, joined by an em dash).
 *
 * Not shown: Figma 'image 21' (319:324), a red circuit-tree mark with no readable name, which looks
 * like the Psycraft logo but could not be compared (its file was not kept).
 */
export const sponsorLogos = [
  {
    kind: "image",
    name: "Waterloo Institute for Sustainable Aeronautics (WISA)",
    listedAs: "Waterloo Institute for Sustainable Aeronautics (WISA)",
    src: `${sponsorDir}/wisa.png`,
    sourceFile: "wisa.png",
    wordmark: "WISA",
    width: 341,
    height: 127,
    displayHeight: 52,
    source: { type: "figma", layer: "image 18 (315:312)" },
  },
  {
    kind: "image",
    name: "Simantic",
    listedAs: "Simantic",
    src: `${sponsorDir}/simantic.png`,
    sourceFile: "simantic.png",
    wordmark: "Simantic",
    width: 300,
    height: 64,
    displayHeight: 32,
    source: { type: "figma", layer: "image 20 (319:321)" },
  },
  {
    kind: "image",
    name: "Siemens",
    listedAs: "Siemens",
    src: `${sponsorDir}/siemens.png`,
    sourceFile: "siemens.png",
    wordmark: "Siemens",
    width: 573,
    height: 96,
    displayHeight: 28,
    source: { type: "owner-supplied", note: "Attachment 1: teal wordmark on a transparent background." },
  },
  {
    kind: "image",
    name: "UTSM",
    listedAs: "UTSM",
    src: `${sponsorDir}/utsm.png`,
    sourceFile: "utsm.png",
    wordmark: "UTSM",
    width: 353,
    height: 113,
    displayHeight: 48,
    source: { type: "owner-supplied", note: "Attachment 2: black wordmark, blue swoosh and red maple leaf on white." },
  },
  {
    kind: "text",
    name: "Waterloo Real-time Embedded Systems Lab",
    listedAs: "Waterloo Real-time Embedded Systems Lab",
    fontSize: 20,
    maxWidth: 240,
    source: {
      type: "none",
      note: "University of Waterloo ECE lab (RESL); its pages carry only the Waterloo Engineering wordmark, no lab logo.",
    },
  },
  {
    kind: "image",
    name: "Microchip Technology",
    listedAs: "Microchip",
    src: `${sponsorDir}/microchip.png`,
    sourceFile: "microchip.png",
    wordmark: "Microchip",
    width: 313,
    height: 192,
    displayHeight: 64,
    source: { type: "figma", layer: "image 23 (319:333)" },
  },
  {
    kind: "image",
    name: "Fuel Cell and Green Energy Lab — 20|20 Laboratory for Fuel Cell & Green Energy RD&D",
    listedAs: "Fuel Cell Green Energy Lab (same organization as 20|20 Laboratory, confirmed by the owner)",
    src: `${sponsorDir}/20-20-laboratory.png`,
    sourceFile: "20-20-laboratory.png",
    wordmark: "20|20 Laboratory",
    width: 197,
    height: 192,
    displayHeight: 64,
    source: { type: "figma", layer: "image 19 (319:318)" },
  },
  {
    kind: "image",
    name: "Kenesto",
    listedAs: "Kenesto",
    src: `${sponsorDir}/kenesto.png`,
    sourceFile: "kenesto.png",
    wordmark: "Kenesto",
    width: 371,
    height: 126,
    displayHeight: 42,
    source: { type: "figma", layer: "image 25 (319:342)" },
  },
  {
    kind: "image",
    name: "Multi-Scale Additive Manufacturing Lab (MSAM)",
    listedAs: "MSAM",
    src: `${sponsorDir}/msam.png`,
    sourceFile: "msam.png",
    wordmark: "MSAM",
    width: 392,
    height: 120,
    displayHeight: 40,
    source: { type: "figma", layer: "image 24 (319:339)" },
  },
  {
    kind: "image",
    name: "AeroSoc, Waterloo Aviation and Aeronautics Society",
    listedAs: "AeroSoc",
    src: `${sponsorDir}/aerosoc.png`,
    sourceFile: "aerosoc.png",
    wordmark: "AeroSoc",
    width: 766,
    height: 138,
    displayHeight: 46,
    source: { type: "figma", layer: "image 22 (319:327)" },
  },
  {
    kind: "image",
    name: "Psycraft",
    listedAs: "Psycraft",
    src: `${sponsorDir}/psycraft.png`,
    sourceFile: "psycraft.svg",
    wordmark: "Psycraft",
    width: 133,
    height: 168,
    displayHeight: 68,
    source: { type: "official-site", url: "https://psycraft.ca/logo.svg" },
  },
  {
    kind: "image",
    name: "University of Waterloo",
    listedAs: "University of Waterloo",
    src: `${sponsorDir}/university-of-waterloo.png`,
    sourceFile: "university-of-waterloo.png",
    wordmark: "University of Waterloo",
    width: 559,
    height: 132,
    displayHeight: 44,
    source: { type: "figma", layer: "image 16 (315:297)" },
  },
  {
    kind: "image",
    name: "Dassault Systèmes (SOLIDWORKS)",
    listedAs: "Dassault System (Solidworks)",
    src: `${sponsorDir}/dassault-systemes.png`,
    sourceFile: "dassault-systemes.svg",
    wordmark: "Dassault Syst\u00e8mes",
    width: 393,
    height: 120,
    displayHeight: 44,
    source: { type: "official-site", url: "https://menu.3ds.com/assets/img/logo/3ds-dark.svg" },
  },
  {
    kind: "image",
    // Official name, confirmed by the owner (the first list wrote "Green Production Group").
    name: "Greener Production Group",
    listedAs: "Greener Production Group",
    src: `${sponsorDir}/greener-production-group.png`,
    sourceFile: "greener-production-group.png",
    wordmark: "Greener Production Group",
    width: 451,
    height: 240,
    displayHeight: 72,
    source: { type: "owner-supplied", note: "Attachment 3: lightbulb terrarium mark and 'Greener Production Group' on white." },
  },
  {
    kind: "text",
    name: "HOMLab",
    listedAs: "HOMLab",
    fontSize: 28,
    maxWidth: 118,
    source: { type: "none", note: "Organization not identifiable from the name alone; no official logo verified." },
  },
  {
    kind: "image",
    // The complete "Made with Notion" badge, not the plain Notion cube that stood here before.
    name: "Made with Notion",
    listedAs: "Notion",
    // The supplied SVG, used exactly as supplied (byte-identical, SHA-256 f1d022a3...78e7) and not a derived
    // white file: its artwork is already white (cube, wording and outline) on a black badge, so it needs no
    // conversion and no filter. A brightness/invert filter would turn the whole badge into a blank white
    // block. SVGs are served as they are (Next does not optimize them); the file has intrinsic 135x60.
    src: "/images/home/sponsors/made-with-notion-black.svg",
    sourceFile: "made-with-notion-black.svg",
    wordmark: "Made with Notion",
    width: 135,
    height: 60,
    // 72px high (162px wide, the badge's own 2.25:1 ratio, nothing stretched) so the "Made with Notion"
    // wording inside it stays legible; the other logos are 28 to 72px high.
    displayHeight: 72,
    source: {
      type: "owner-supplied",
      note: "Notion's official 'Made with Notion' badge, black version (made-with-notion-black.svg from the owner's 'Made for:with Notion badge 2' folder), copied unmodified.",
    },
  },
  {
    kind: "text",
    name: "Fluid Mechanics Research Lab",
    listedAs: "Fluid Mechanics Research Lab",
    fontSize: 22,
    maxWidth: 220,
    source: {
      type: "none",
      note: "Likely the University of Waterloo's Fluid Mechanics Research Laboratory (unconfirmed); its pages carry only the Waterloo Engineering wordmark, no lab logo.",
    },
  },
  {
    kind: "image",
    name: "Colony (YC F26)",
    listedAs: "Colony (YC F26)",
    src: `${sponsorDir}/colony.png`,
    sourceFile: "colony.png",
    wordmark: "Colony",
    width: 394,
    height: 132,
    displayHeight: 44,
    source: { type: "owner-supplied", note: "Attachment 4: white 'Colony' wordmark in its own white frame on black." },
  },
  {
    kind: "image",
    name: "T-MOTOR",
    listedAs: "T-motor",
    src: `${sponsorDir}/t-motor.png`,
    sourceFile: "t-motor.svg",
    wordmark: "T-MOTOR",
    width: 581,
    height: 120,
    displayHeight: 40,
    source: { type: "official-site", url: "https://uav-en.tmotor.com/svg/symbol-defs.svg#logo" },
  },
  {
    kind: "image",
    // The supplied logo shows the VibeFlow mark and wordmark only; the accessible name keeps the SJTU affiliation from the list.
    name: "SJTU \u2013 VibeFlow",
    listedAs: "SJTU \u2013 VibeFlow",
    src: `${sponsorDir}/vibeflow.png`,
    sourceFile: "vibeflow.png",
    wordmark: "SJTU \u2013 VibeFlow",
    width: 604,
    height: 120,
    displayHeight: 42,
    source: { type: "owner-supplied", note: "Attachment 5: red mark and light 'VibeFlow' wordmark on a dark navy background." },
  },
  {
    kind: "image",
    // The supplied logo reads "MKS"; the list names the organization MKS Servo.
    name: "MKS Servo",
    listedAs: "MKS Servo",
    src: `${sponsorDir}/mks-servo.png`,
    sourceFile: "mks-servo.png",
    wordmark: "MKS Servo",
    width: 309,
    height: 63,
    displayHeight: 32,
    source: { type: "owner-supplied", note: "Attachment 6: white italic 'MKS' wordmark on a dark gray background." },
  },
  {
    kind: "image",
    name: "RoboHub",
    listedAs: "RoboHub",
    src: `${sponsorDir}/robohub.png`,
    sourceFile: "robohub.png",
    wordmark: "RoboHub",
    width: 407,
    height: 164,
    displayHeight: 54,
    source: { type: "owner-supplied", note: "Attachment 7: robot-head mark and 'ROBOHUB' wordmark in purple and gray on white." },
  },
  {
    kind: "image",
    name: "Ansys",
    listedAs: "Ansys",
    src: `${sponsorDir}/ansys.png`,
    sourceFile: "ansys-black-background.jpg",
    wordmark: "Ansys",
    width: 336,
    height: 108,
    displayHeight: 36,
    source: {
      type: "official-site",
      url: "https://www.ansys.com/content/dam/company/brand/logos/ansys-logos/ansys-logo-black-background.jpg",
    },
  },
] satisfies SponsorEntry[];

// ---------------------------------------------------------------------------------------------------------
// Two-row marquee (Sponsorship page: "Our partners"). The rows are an explicit, stored assignment, not
// computed at render time, so they cannot reshuffle when the roster order or logo sizes are tuned.
//
// Every organization is in exactly one row (23 = 11 + 12). The split was chosen from every 12/11 partition
// of the roster by rendered width (logo or fixed wordmark-box widths plus one 96px gap per item): the rows
// are 2,846.7px and 2,846.6px at desktop size (20.9px apart at the 80% mobile scale). It was re-balanced
// when the plain Notion cube (50px wide) became the 162px-wide "Made with Notion" badge; among the 706
// partitions within half a pixel of equal, it is the one that moves the fewest organizations (5) from the
// earlier assignment the owner had reviewed, then interleaves the owner's order the most (15 of 22
// neighbouring entries land in different rows). The five logos at least 60px high split 3 and 2, the three
// text-only wordmarks 2 and 1. Each row keeps the owner's relative order. `startOffset` is the fraction of
// one loop the row starts through, so the two rows never line up into columns.
// Home keeps its single row (`sponsorLogos`, unchanged apart from the badge).
// ---------------------------------------------------------------------------------------------------------
export const sponsorRowAssignment = [
  {
    startOffset: 0,
    names: [
      "Waterloo Institute for Sustainable Aeronautics (WISA)",
      "Siemens",
      "Waterloo Real-time Embedded Systems Lab",
      "Kenesto",
      "Psycraft",
      "Dassault Systèmes (SOLIDWORKS)",
      "Greener Production Group",
      "Made with Notion",
      "Fluid Mechanics Research Lab",
      "T-MOTOR",
      "SJTU – VibeFlow",
    ],
  },
  {
    startOffset: 0.4,
    names: [
      "Simantic",
      "UTSM",
      "Microchip Technology",
      "Fuel Cell and Green Energy Lab — 20|20 Laboratory for Fuel Cell & Green Energy RD&D",
      "Multi-Scale Additive Manufacturing Lab (MSAM)",
      "AeroSoc, Waterloo Aviation and Aeronautics Society",
      "University of Waterloo",
      "HOMLab",
      "Colony (YC F26)",
      "MKS Servo",
      "RoboHub",
      "Ansys",
    ],
  },
] as const;

export type SponsorMarqueeRow = { entries: readonly SponsorEntry[]; startOffset: number };

/**
 * The two rows resolved to roster entries. Throws while the module loads (so the build fails) if a name is
 * unknown or listed twice, or if any roster entry is left out: every organization must be in exactly one row.
 */
export const sponsorMarqueeRows: readonly SponsorMarqueeRow[] = (() => {
  const remaining = new Map<string, SponsorEntry>(sponsorLogos.map((entry) => [entry.name, entry]));
  const rows = sponsorRowAssignment.map(({ names, startOffset }) => ({
    startOffset,
    entries: names.map((name) => {
      const entry = remaining.get(name);
      if (!entry) throw new Error(`Sponsor row assignment: "${name}" is unknown or assigned to more than one row.`);
      remaining.delete(name);
      return entry;
    }),
  }));
  if (remaining.size > 0) {
    throw new Error(`Sponsor row assignment: not assigned to a row: ${[...remaining.keys()].join("; ")}`);
  }
  return rows;
})();
