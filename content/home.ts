// Typed content for the Home page (Figma frame 262:79).
//
// Copy follows the approved Home frame with the approved spelling and grammar fixes applied
// (what's, interdisciplinary, hands-on, low-emission, real-world). Decisions applied:
//  - the project is the Hydrogen-Electric UAV Program, described only with the summary already
//    retrieved from the Current Project frame (333:496);
//  - no coordinate block, no lorem ipsum, no "Project Name", no Sponsor Package button;
//  - the hero's top-right "PROJECT NAME / DESCRIPTION / EST. 2025" label is omitted (placeholder
//    text and an unverified date);
//  - no current development stage is identified.

import type { ButtonVariant } from "@/components/ui/button";

export type HomeAction = {
  label: string;
  href: string;
  variant: ButtonVariant;
};

export const hero = {
  title: "BUILDING THE FUTURE OF AEROSPACE",
  intro:
    "WATFlight is a student-run design team at the University of Waterloo designing, building and flying innovative aerospace systems.",
  actions: [
    { label: "Join WATFlight", href: "/join", variant: "light" },
    { label: "Contact us", href: "/sponsorship#contact", variant: "dark" },
  ] satisfies HomeAction[],
  imageAlt: "A WATFlight aircraft on a dark, reflective floor.",
};

export const mission = {
  title: "our mission",
  body: "We design, build and test innovative aerospace systems that push boundaries of what’s possible. Through hands-on experience, interdisciplinary collaboration and a passion for flight, we develop the next generation of engineers, leaders and innovators.",
  link: { label: "More about us", href: "/about" },
};

export const project = {
  title: "what we are building",
  cardTitle: "Hydrogen-Electric UAV Program",
  // Summary taken from the Current Project frame (333:496), with the approved "low-emission" fix.
  cardBody:
    "We are developing a hydrogen-electric unmanned aerial vehicle designed for long-endurance, low-emission flight through autonomous operation.",
  action: { label: "Learn more about the project", href: "/projects", variant: "light" } satisfies HomeAction,
  // The artwork also carries a baked-in spec readout (wingspan, payload, cruise speed). Those
  // figures are unverified (see content/assets.ts), so the alt text does not repeat them.
  imageAlt: "The Hydrogen-Electric UAV Program aircraft, shown with technical line drawings.",
};

export type ProgressStage = {
  title: string;
  description: string;
};

export const progress = {
  label: "Development progress",
  // Titles and descriptions are verbatim from the Figma frame. No stage is marked as current.
  stages: [
    { title: "Concept", description: "Ideation, research and initial designs." },
    { title: "Development", description: "Detailed design, prototyping and testing" },
    { title: "Flight", description: "Expanded capabilities and new missions" },
  ] satisfies ProgressStage[],
};

/**
 * How one source image (`HOME-PROGRESS`) is cropped into each of the three decorative slots.
 * Values come from the Figma crop of layers 'image 11', 'image 13' and 'image 12'.
 */
export const progressCrops = [
  { slotHeight: 212, offsetTop: 0, widthPercent: 299.59, leftPercent: 0, opacity: 1 },
  { slotHeight: 212, offsetTop: 0, widthPercent: 299.59, leftPercent: -100, opacity: 0.58 },
  // The third slot is taller and sits 8.42px higher than the other two in Figma.
  { slotHeight: 228.84, offsetTop: -8.42, widthPercent: 303.78, leftPercent: -203.78, opacity: 0.6 },
] as const;

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
  /** Derived white artwork, see "Sponsor logo treatment" in docs/rebuild-notes.md. */
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
 * Sponsors & partners marquee: the owner's list of 23 organizations, in the owner's order. Figma
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
export const sponsors = {
  title: "sponsors & partners",
  logos: [
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
      name: "Notion",
      listedAs: "Notion",
      src: `${sponsorDir}/notion.png`,
      sourceFile: "notion.png",
      wordmark: "Notion",
      width: 149,
      height: 156,
      displayHeight: 52,
      source: { type: "official-site", url: "https://www.notion.com/front-static/logo-ios.png" },
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
  ] satisfies SponsorEntry[],
  /** One accessible list plus (marqueeCopies - 1) inert, aria-hidden copies; the group is wider than any screen. */
  marqueeCopies: 3,
};

export const partner = {
  title: "partner with us",
  body: "Support a student-driven team advancing innovative aerospace systems. Partner with WATFlight to invest in talent, technology and real-world impact.",
  action: { label: "Explore sponsorship", href: "/sponsorship", variant: "light" } satisfies HomeAction,
  exchange: [
    {
      icon: "/images/icons/support.svg",
      iconWidth: 51,
      iconHeight: 35,
      title: "Your Support",
      description: "Partnership, funding, resources, expertise",
      descriptionMaxWidth: 214,
    },
    {
      icon: "/images/icons/airplane-departure.svg",
      iconWidth: 52,
      iconHeight: 34,
      title: "Student + Project Impact",
      description: "Innovation, skill development, real-world results",
      descriptionMaxWidth: 193,
    },
  ],
  arrow: { src: "/images/icons/arrow-right.svg", size: 35 },
};

export const joinBand = {
  id: "home-join",
  lead: "JOIN",
  wordmarkSrc: "/images/brand/watflight-wordmark-dark.svg",
  wordmarkAlt: "WATFlight",
  subtitle: "BUILD THE FUTURE OF AEROSPACE.",
  description:
    "Join a multidisciplinary team designing, building, and testing real aerospace systems at the University of Waterloo.",
  actions: [
    { label: "Join WATFlight", href: "/join", variant: "dark" },
    { label: "Explore our teams", href: "/about#leadership", variant: "outline" },
  ] satisfies HomeAction[],
};
