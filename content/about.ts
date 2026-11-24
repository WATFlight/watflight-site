// About page content (Figma frame 262:80). Copy is transcribed from the approved frame; the only
// changes are the two owner-approved corrections ("designing", "unmanned") and "PCB" for "PBC".
// Nothing here is invented: the faculty advisor list is intentionally empty (see below).

export type AboutAction = {
  label: string;
  href: string;
  variant: "light" | "dark" | "outline";
};

export const aboutHero = {
  /** One h1, set on two lines as in the frame. The lines are joined with a space for assistive technology. */
  titleLines: ["ABOUT", "WATFLIGHT"],
  // Figma: "...University of Waterloo design, simulating, building, and flight-testing ... unscrewed
  // aircraft systems." Corrected to "designing" and "unmanned" (owner-approved).
  intro:
    "WATFlight is a student-led engineering design team at the University of Waterloo designing, simulating, building, and flight-testing sustainable and autonomous unmanned aircraft systems.",
  // Describes only what is visible. The photo's provenance (real team photo or illustration) is
  // unverified, so the text does not claim the people are team members.
  imageAlt:
    "People in black WATFlight shirts and hoodies work together on an aircraft airframe at a workshop bench, with a WATFlight banner on the wall behind them.",
};

export type JourneyStage = {
  /** Figma label: a year, or "TODAY". Dates are provisional (docs/rebuild-notes.md). */
  label: string;
  title: string;
  description: string;
};

export const journey = {
  // The SC cut draws lowercase as small caps, so the source text stays lowercase (as on Home).
  title: "our journey",
  // Exact Figma text, which has no terminal period.
  intro:
    "We empower students to apply engineering, creativity, and collaboration to develop autonomous aircraft systems that address real-world challenges in sustainable aviation",
  stages: [
    { label: "2025", title: "Founded", description: "WATFlight is established at the University of Waterloo" },
    {
      label: "2025",
      title: "Early Development",
      description: "Initial aircraft designs, competitions and technical exploration",
    },
    {
      label: "2026",
      title: "Autonomous Aviation",
      description: "Shift towards autonomous aviation and sustainable flight systems",
    },
    {
      label: "TODAY",
      title: "Current Stage",
      description: "Continued development, testing, and expansion of the team.",
    },
  ] satisfies JourneyStage[],
};

export type TeamMember = {
  name: string;
  role: string;
};

export const team = {
  /** Anchor target of the Home "Explore our teams" button (/about#leadership). */
  id: "leadership",
  title: "meet the team",
  // Roster and titles are provisional (decision D2). The portrait frames stay empty in the comp, so
  // there is deliberately no image field: no legacy portrait is reused and none is invented.
  members: [
    { name: "JACKIE", role: "Founder & Team Director" },
    { name: "SHAOFU", role: "Founder & Mechanical Lead" },
    { name: "HIRAM", role: "Electrical Lead" },
    { name: "MANYA", role: "Software Lead" },
  ] satisfies TeamMember[],
};

export type Subteam = {
  name: string;
  description: string;
  /** Exact Figma icon export; width and height are the file's own root size and are not overridden. */
  icon: { src: string; size: number };
  /**
   * Width of the description's text box in the frame (px, at 1440). It only matters from 1280px up,
   * where it reproduces the frame's line breaks; narrower cards wrap naturally.
   */
  descriptionMaxWidth: number;
};

export const subteams = {
  title: "SUBTEAM DISCIPLINES",
  items: [
    {
      name: "Mechanical",
      description: "Airframe aerodynamics, composite carbon-fiber manufacturing and structural test validation.",
      icon: { src: "/images/about/subteam-mechanical-wrench.svg", size: 30 },
      descriptionMaxWidth: 352,
    },
    {
      name: "Electrical",
      // Figma: "Custom PBC avionics"; corrected to PCB (printed circuit board).
      description: "Custom PCB avionics, power distribution, battery management, and RF telemetry systems.",
      icon: { src: "/images/about/subteam-electrical-circuit-board.svg", size: 24 },
      descriptionMaxWidth: 379,
    },
    {
      name: "Software",
      description: "Autonomous flight control algorithms, vehicle state estimation and ground station telemetry.",
      icon: { src: "/images/about/subteam-software-code-brackets.svg", size: 22 },
      descriptionMaxWidth: 352,
    },
  ] satisfies Subteam[],
  link: { label: "Learn more", href: "/join" },
};

export type FacultyAdvisor = {
  name: string;
  department: string;
  institution: string;
  /** Optional portrait. Without one the frame's empty square is drawn (decorative). */
  image?: { src: string; alt: string };
};

/**
 * Faculty advisory. LAUNCH BLOCKER: the Figma frame shows "Dr. John Doe" and "Dr. Jane Doe", which
 * are placeholders. They must never be rendered, so the list is empty and `FacultyAdvisory` renders
 * nothing while it is. Add real, confirmed advisors here (name, department, institution, and a
 * portrait only if one is supplied) and the section appears with its rule and heading.
 */
export const facultyAdvisory = {
  title: "FACULTY ADVISORY",
  advisors: [] as readonly FacultyAdvisor[],
};

export const aboutCta = {
  id: "about-cta",
  title: "Explore what we’re building",
  description: "Learn more about our aircraft architecture or apply to join our engineering cohort.",
  actions: [
    { label: "Explore projects", href: "/projects", variant: "dark" },
    { label: "Join WATFlight", href: "/join", variant: "outline" },
  ] satisfies AboutAction[],
};
