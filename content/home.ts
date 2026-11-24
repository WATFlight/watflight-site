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
import { sponsorLogos } from "@/content/sponsors";

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

// The sponsor roster (types, the 23 entries and their provenance) lives in content/sponsors.ts so the
// Home marquee and the Sponsorship page share one list. These re-exports keep existing imports working.
export type { SponsorEntry, SponsorImage, SponsorWordmark } from "@/content/sponsors";

/** Sponsors & partners marquee: the shared roster plus the marquee's own settings. */
export const sponsors = {
  title: "sponsors & partners",
  logos: sponsorLogos,
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
