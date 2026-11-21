// Typed content for the Join the Team page (Figma frame 344:1128).
//
// The frame is delivered as the owner's 3x PNG export (4320x8544, all text legible), a flattened,
// AI-generated design reference. Every string below was transcribed from it, exactly as written, and is
// PROVISIONAL: visual direction, not verified recruitment information. Nothing here has been confirmed
// by the team (how to apply, the recipient address, the interview wording, what each subteam does); the
// register of items to confirm is in docs/rebuild-notes.md ("Join the Team page"). The export's footer
// column reads "New & Blog"; the shared footer's own wording ("News & Blog") is kept.
//
// Imagery: the five pictures are crops of the export (see content/assets.ts) and are illustrative
// AI-generated images, not documentation of real team activity. Each alt text says "Illustrative image".

import type { AssetSlotId } from "@/content/assets";

export const joinHero = {
  eyebrow: "JOIN OUR TEAM",
  title: "JOIN THE TEAM.",
  intro: [
    "WATFlight brings together students from different technical disciplines to design, build, and test sustainable aerospace systems.",
    "Explore the teams below to find where you can contribute.",
  ],
  // "APPLY NOW" goes to How to Apply, "LEARN MORE" to Subteams (both are sections of this page).
  apply: { label: "APPLY NOW", href: "#how-to-apply" },
  learn: { label: "LEARN MORE", href: "#subteams" },
  image: {
    slot: "JOIN-HERO",
    alt: "Illustrative image of three students in dark hoodies working on a long metal aircraft wing in a workshop, under a WATFlight banner.",
  },
} satisfies {
  eyebrow: string;
  title: string;
  intro: readonly string[];
  apply: { label: string; href: string };
  learn: { label: string; href: string };
  image: { slot: Extract<AssetSlotId, `JOIN-${string}`>; alt: string };
};

export type SubteamIcon = "wrench" | "chip" | "braces";

export type Subteam = {
  name: string;
  description: string;
  bullets: readonly string[];
  /** Decorative line icon drawn in code (components/sections/join/join-icons.tsx). */
  icon: SubteamIcon;
  image: { slot: Extract<AssetSlotId, `JOIN-SUBTEAM-${number}`>; alt: string };
};

export const joinSubteams = {
  id: "subteams",
  eyebrow: "SUBTEAMS",
  title: "THREE SUBTEAMS. ONE SHARED MISSION.",
  description:
    "Each team plays a key role in designing, building, and testing our aircraft. Regardless of your background, there is a place for you at WATFlight.",
  teams: [
    {
      name: "MECHANICAL",
      description: "Designs and develops the aircraft structure, mechanical systems, and physical integration.",
      bullets: [
        "Airframe and structural design",
        "Mechanical system design and integration",
        "CAD, analysis, and manufacturing",
        "Prototype build and assembly",
        "Ground and flight testing support",
      ],
      icon: "wrench",
      image: {
        slot: "JOIN-SUBTEAM-1",
        alt: "Illustrative close-up of a dark, glossy carbon-fibre cylinder with a flared end in a workshop.",
      },
    },
    {
      name: "ELECTRICAL",
      description: "Develops electronics, sensing, power systems, and hardware integration.",
      bullets: [
        "Avionics and embedded systems",
        "Sensor integration and data collection",
        "Power systems and distribution",
        "PCB design and hardware development",
        "System integration and testing",
      ],
      icon: "chip",
      image: {
        slot: "JOIN-SUBTEAM-2",
        alt: "Illustrative image of hands wiring a dense circuit assembly with orange cables.",
      },
    },
    {
      name: "SOFTWARE",
      description: "Builds autonomy, simulation, and flight software that enable intelligent and reliable operation.",
      bullets: [
        "Autonomy and flight control",
        "Simulation and modelling",
        "Onboard software and embedded systems",
        "Data analysis and testing",
        "Ground station and supporting tools",
      ],
      icon: "braces",
      image: {
        slot: "JOIN-SUBTEAM-3",
        alt: "Illustrative image of a laptop showing code and a three-dimensional aircraft view, with a student in glasses beside it.",
      },
    },
  ] satisfies readonly Subteam[],
};

export type ApplyIcon = "document" | "mail" | "people";

export const joinApply = {
  id: "how-to-apply",
  eyebrow: "GET STARTED",
  title: "HOW TO APPLY.",
  description: "Follow the steps below to apply to WATFlight.",
  // The recipient is the address shown in the design and in the site footer. UNVERIFIED (see the notes).
  email: "admin@watflight.com",
  steps: [
    {
      title: "Prepare Your Resume",
      description: "Include your resume and the subteam or area you’re interested in.",
      icon: "document",
      linksEmail: false,
    },
    {
      title: "Email Your Resume",
      description: "Send your resume to admin@watflight.com.",
      icon: "mail",
      // The address inside this sentence is a mailto: link too.
      linksEmail: true,
    },
    {
      title: "Wait to Hear From Us",
      description: "Selected applicants will be contacted to arrange an interview.",
      icon: "people",
      linksEmail: false,
    },
  ] satisfies readonly { title: string; description: string; icon: ApplyIcon; linksEmail: boolean }[],
  // There is no upload on this site: the button opens the visitor's email app with a prefilled, editable
  // draft (the visitor attaches the resume there). The subject and body are neutral and are NOT in the design.
  action: {
    label: "EMAIL YOUR RESUME",
    srOnly: " to admin@watflight.com, opens your email app",
    subject: "WATFlight application",
    body: "Hello,\r\n\r\nI would like to apply to WATFlight.\r\n\r\nSubteam or area of interest: ",
  },
};

export const joinProjectCta = {
  eyebrow: "INTERESTED IN THE PROJECT?",
  title: "WANT TO LEARN MORE ABOUT WHAT YOU’D BE WORKING ON?",
  action: { label: "EXPLORE THE CURRENT PROJECT", href: "/projects" },
  image: {
    slot: "JOIN-CTA",
    alt: "Illustrative image of a pale aircraft with a front propeller and long wings on a reflective hangar floor.",
  } satisfies { slot: Extract<AssetSlotId, `JOIN-${string}`>; alt: string },
};

/** The `mailto:` link behind "EMAIL YOUR RESUME" (subject and body are percent-encoded; line breaks are CRLF). */
export function applyMailto(): string {
  const { subject, body } = joinApply.action;
  return `mailto:${joinApply.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
