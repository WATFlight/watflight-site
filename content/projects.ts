// Typed content for the Current Project page (Figma frame 333:496).
//
// All copy is the frame's own text. Two corrections were applied (docs/rebuild-notes.md, "Current
// Project page"): "Hydrogen=electric" is "Hydrogen-electric" (as instructed), and "Manages and
// distribute" is "Manages and distributes". "low emission" is "low-emission", the same fix Home
// already applies to this sentence. Every technical statement here is pending team verification
// before launch; no figure that is not in the frame has been added.

import type { AssetSlotId } from "@/content/assets";

export type ProjectAction = { label: string; href: string; variant: "light" | "dark" };

export const projectHero = {
  eyebrow: "Current project",
  // The frame sets "hydrogen-electric" and "UAV program" as two lines (lowercase source text: the
  // SC Wide cut draws lowercase as small caps).
  titleLines: ["hydrogen-electric", "UAV program"] as const,
  intro:
    "We are developing a hydrogen-electric unmanned aerial vehicle designed for long-endurance, low-emission flight through autonomous operation",
  goal: "Our goal is to advance sustainable aviation by designing, building and testing an efficient and autonomous aircraft platform.",
  imageAlt:
    "A white fixed-wing unmanned aircraft with blue accents, a rear-mounted propeller and the WATFLIGHT logo on its fuselage.",
};

/** One entry of the "Hydrogen-Electric System" list. `titleTop` and `descriptionGap` reproduce the frame's hand-placed text at 1440px. */
export type ProjectComponent = {
  name: string;
  description: string;
  slot: Extract<AssetSlotId, `PROJ-COMP-${number}`>;
  /** Image width in px at 1440 (the slot width), also used for the `sizes` hint. */
  imageWidth: number;
  /** Title top relative to the image top at 1440px (px, may be negative). */
  titleTop: number;
  /** Extra space between title and description at 1440px (px). */
  descriptionGap: number;
};

export const projectSystem = {
  id: "project-system",
  title: "Hydrogen-Electric System",
  description:
    "Our aircraft integrates a hydrogen-electric propulsion system with autonomous flight control to enable long endurance, sustainable flight.",
  components: [
    {
      name: "Hydrogen-Electric Propulsion System",
      description: "Generates electrical power from hydrogen.",
      slot: "PROJ-COMP-1",
      imageWidth: 161,
      titleTop: -4,
      descriptionGap: 4,
    },
    {
      name: "Aircraft Power System",
      description: "Manages and distributes power to onboard systems.",
      slot: "PROJ-COMP-2",
      imageWidth: 165,
      titleTop: 10,
      descriptionGap: 0,
    },
    {
      name: "Flight Control Stack",
      description: "Handles autonomy, navigation and control.",
      slot: "PROJ-COMP-3",
      imageWidth: 159,
      titleTop: 8,
      descriptionGap: 0,
    },
    {
      name: "UAV Platform",
      description: "Integrated systems enable efficient, autonomous flight.",
      slot: "PROJ-COMP-4",
      imageWidth: 181,
      titleTop: 5,
      descriptionGap: 0,
    },
  ] satisfies readonly ProjectComponent[],
};

/**
 * One row of the specification list. The frame hand-places every row, so the 1440px geometry is data:
 * row height, title top, icon top/left and the start of the divider above the row (the frame's three
 * divider lines start 3px further right each).
 */
export type SpecRow = {
  term: string;
  description: string;
  /** Wrap width of the description at 1440px, from the frame. */
  descriptionMaxWidth: number;
  icon: {
    src: string;
    /** Rendered SVG size (root width and height of the exported file). */
    size: number;
    /** Square box the icon sits in (the frame's icon layer). */
    box: number;
    /** Offset of the SVG inside the box. */
    inset: number;
  };
  xl: { height: number; titleTop: number; iconTop: number; iconLeft: number; dividerShift: number };
};

export const projectSpecs = {
  title: "Technical Specifications",
  description: "Key components and target specifications for the current iteration of our hydrogen-electric UAV.",
  rows: [
    {
      term: "Propulsion",
      description: "Hydrogen-electric architecture and system configuration",
      descriptionMaxWidth: 296,
      icon: { src: "/images/projects/spec-propulsion-lightning-charge.svg", size: 33, box: 33, inset: 0 },
      xl: { height: 86, titleTop: 0, iconTop: 13, iconLeft: 0, dividerShift: 0 },
    },
    {
      term: "Flight Control",
      description: "Flight controller and software stack for autonomous operation",
      descriptionMaxWidth: 313,
      icon: { src: "/images/projects/spec-flight-control-gear.svg", size: 30.3333, box: 34, inset: 1.8333 },
      xl: { height: 117, titleTop: 33, iconTop: 47, iconLeft: 0, dividerShift: 0 },
    },
    {
      term: "Target Performance",
      description: "Range, endurance, altitude and payload targets for the current program.",
      descriptionMaxWidth: 337,
      icon: { src: "/images/projects/spec-target-performance-bar-graph.svg", size: 31, box: 31, inset: 0 },
      xl: { height: 117, titleTop: 29, iconTop: 43, iconLeft: 0, dividerShift: 3 },
    },
    {
      term: "Aircraft",
      description: "Airframe configuration and key design characteristics.",
      descriptionMaxWidth: 344,
      icon: { src: "/images/projects/spec-aircraft-airplane.svg", size: 36, box: 36, inset: 0 },
      xl: { height: 84, titleTop: 20, iconTop: 25, iconLeft: -1, dividerShift: 6 },
    },
  ] satisfies readonly SpecRow[],
};

/**
 * Project roadmap (frame 333:496). In the frame the roadmap is ONE flattened raster ("Screenshot 2026-10-30
 * at 9.24.24 PM 1", 1630x398) with its labels, titles and descriptions baked in. It is rebuilt here as live
 * text: the four phases below are the wording printed in that picture, copied exactly (labels, titles and
 * descriptions), in the picture's order. They are still pending verification (docs/rebuild-notes.md); no
 * dates and no completion states are stated, because the picture gives none in words. The four aircraft
 * illustrations are independent SVG files (slots PROJ-ROADMAP-1 to -4): original vector redraws of the four
 * pictures in that raster, which served only as visual references. They hold no words and no timeline graphics.
 *
 * `node` is the timeline marker's state in the picture: filled blue for the first three phases, an
 * outlined ring for Flight. It is purely visual (the marker is hidden from assistive technology), so it
 * carries no meaning in words.
 */
export type RoadmapStage = {
  label: string;
  title: string;
  description: string;
  illustration: { slot: Extract<AssetSlotId, `PROJ-ROADMAP-${number}`>; alt: string };
  node: "filled" | "outlined";
};

export const projectRoadmap = {
  title: "project roadmap",
  description: "Our development roadmap takes the aircraft from concept through design, testing and flight.",
  stages: [
    {
      label: "Concept",
      title: "Concept + Design",
      description: "Define requirements and develop the initial aircraft design.",
      illustration: {
        slot: "PROJ-ROADMAP-1",
        alt: "Blue wireframe drawing of an aircraft with dimension marks.",
      },
      node: "filled",
    },
    {
      label: "Simulation",
      title: "Simulation + Systems",
      description: "Develop and test autonomy, propulsion, and system integration in simulation.",
      illustration: {
        slot: "PROJ-ROADMAP-2",
        alt: "White wireframe aircraft over wavy contour lines.",
      },
      node: "filled",
    },
    {
      label: "Integration",
      title: "Hardware Integration + Testing",
      description: "Integrate subsystems and conduct ground and flight testing.",
      illustration: {
        slot: "PROJ-ROADMAP-3",
        alt: "Exploded view of an aircraft fuselage and its internal components between two wing panels.",
      },
      node: "filled",
    },
    {
      label: "Flight",
      title: "Flight Testing / Future Development",
      description: "Full flight testing and continued iteration towards long-endurance autonomous operation.",
      illustration: {
        slot: "PROJ-ROADMAP-4",
        alt: "Aircraft with long wings and two propellers over a dark ground.",
      },
      node: "outlined",
    },
  ] satisfies readonly RoadmapStage[],
};

export type GalleryImage = {
  slot: Extract<AssetSlotId, `PROJ-GALLERY-${number}`>;
  alt: string;
  /** Tailwind object-position class that reproduces the frame's crop of the source picture ("" = centered). */
  imageClassName: string;
};

/**
 * "Inside the project" mosaic, in the frame's order: the two stacked pictures on the left, then the
 * two tall ones. Crops (computed from the frame's image offsets): picture 2 starts 19.8% down its
 * overflow, picture 3 is bottom-aligned (its frame crops 4% off the top), pictures 1 and 4 are centered.
 */
export const projectGallery = {
  title: "inside the project",
  description: "A look at our aircraft design, development progress and testing.",
  images: [
    {
      slot: "PROJ-GALLERY-1",
      alt: "Two people in black WATFlight hoodies work on an aircraft fuselage and wing at a workshop bench.",
      imageClassName: "",
    },
    {
      slot: "PROJ-GALLERY-2",
      alt: "Two people in black WATFlight hoodies study hand-drawn system diagrams on a whiteboard in a workshop.",
      imageClassName: "object-[50%_19.8%]",
    },
    {
      slot: "PROJ-GALLERY-3",
      alt: "A person in a black hoodie works at a desk with two monitors showing source code and an aircraft flight-path view.",
      imageClassName: "object-bottom",
    },
    {
      slot: "PROJ-GALLERY-4",
      alt: "A white WATFlight fixed-wing unmanned aircraft flying just above an airfield runway, with equipment out of focus in the foreground.",
      imageClassName: "",
    },
  ] satisfies readonly GalleryImage[],
};

export const projectCta = {
  id: "project-cta",
  title: "help us take the next step.",
  description:
    "Industry partners can support the continued development, testing and flight of our hydrogen-electric UAV program",
  actions: [{ label: "Sponsor WATFlight", href: "/sponsorship", variant: "dark" }] satisfies readonly ProjectAction[],
};
