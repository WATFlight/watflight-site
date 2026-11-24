// Typed content for the Sponsorship page (Figma frame 340:771).
//
// The frame's body is ONE flattened, AI-generated screenshot (`image 34`), so there are no text layers:
// every string below was transcribed from the owner's 3x PNG export of the frame (4320x9573, all text
// legible) and is PROVISIONAL, visual direction rather than verified production content. Nothing here
// is a confirmed fact about WATFlight, its programs, its students or its partners; the register of
// statements to confirm is in docs/rebuild-notes.md ("Sponsorship page"). Corrections applied to the
// transcription: the form button reads "SEND INQURIY" in the export and is "Send inquiry" here.

export const sponsorshipHero = {
  eyebrow: "Sponsorship",
  // The headline is two lines; the second ("WATFLIGHT") is blue in the design.
  titleLines: ["PARTNER WITH", "WATFLIGHT"] as const,
  intro:
    "Help shape the next generation of sustainable aerospace. Your support enables student-led development of hydrogen-electric aircraft while giving your organization access to top engineering talent and meaningful collaboration opportunities.",
  // The design shows a white "BECOME A PARTNER →" button; its destination is not stated, so it goes to
  // the page's own inquiry form (an assumption recorded in the notes).
  action: { label: "Become a partner", href: "#contact" },
  imageAlt:
    "Illustrative image of a white unmanned aircraft with a dark nose parked in a dim, reflective hangar.",
};

/** Decorative line icons drawn for this page (components/sections/sponsorship/sponsorship-icon.tsx). */
export type SponsorshipIconName = "users" | "bulb" | "gear" | "cube" | "tools" | "chart";

export const sponsorshipWhy = {
  title: "WHY PARTNER WITH US",
  description:
    "Your support helps us advance sustainable aviation while creating meaningful opportunities for your organization.",
  // The design draws a blue icon above each title (people, light bulb, gear). The originals are
  // flattened AI artwork with no vector source, so each card gets a simple replacement of the same subject.
  cards: [
    {
      icon: "users",
      title: "Access to Top Talent",
      description:
        "Connect with highly motivated Waterloo engineering students with hands-on experience across real aerospace systems.",
    },
    {
      icon: "bulb",
      title: "Brand Visibility",
      description:
        "Showcase your organization through our aircraft, events, digital channels, and the University of Waterloo engineering community.",
    },
    {
      icon: "gear",
      title: "Real Impact",
      description:
        "Support the development of sustainable aviation technologies and contribute to technical collaboration, testing, mentorship, and more.",
    },
  ] satisfies readonly { icon: SponsorshipIconName; title: string; description: string }[],
};

export const sponsorshipWays = {
  title: "WAYS TO SUPPORT",
  description:
    "There are many ways to partner with WATFlight. Your contribution directly enables the development and testing of our aircraft.",
  // Icons (cube, crossed tools, bars) are replacements of the same subjects, for the same reason as above.
  items: [
    {
      icon: "cube",
      title: "Hardware + Components",
      description: "Aircraft systems, sensors, electronics, materials, or computing hardware.",
    },
    {
      icon: "tools",
      title: "Technical Expertise",
      description: "Engineering mentorship, product knowledge, testing support, or collaboration.",
    },
    {
      icon: "chart",
      title: "Financial Support",
      description: "Funding prototype development, manufacturing, testing, and project operations.",
    },
  ] satisfies readonly { icon: SponsorshipIconName; title: string; description: string }[],
  imageAlt:
    "Illustrative image of two people in dark jackets working at a workshop bench beside a long, dark aircraft wing.",
};

export const sponsorshipPartners = {
  title: "OUR PARTNERS",
  description: "We are grateful to the organizations that support WATFlight’s engineering and testing.",
};

export type ContactField = {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "textarea";
  autoComplete?: string;
  /** Desktop layout (from 768px): two fields share a row ("half"), or the field spans the form ("full"). Below 768px every field is full width. */
  layout: "half" | "full";
  /** Optional visible suffix after the label, for example "(optional)": shown in plain case, part of the accessible name. */
  labelSuffix?: string;
  /** Required fields carry the native `required` attribute and an error when empty; the others never error. */
  required: boolean;
  /** Functional copy (not in the design): shown under a required field when it is empty on submit. */
  errorMissing?: string;
  /** Functional copy: shown when the browser's own type check rejects the value (email only). */
  errorInvalid?: string;
};

// Revised after the owner's visual review (these changes override the screenshot): the form is the primary
// contact path and direct email is secondary, so the left column no longer carries the "Sponsorship
// Inquiries" email block, the fields are stacked (label above field), Company is optional, there is no
// "all fields required" sentence, and the Message placeholder is neutral. The form now submits directly
// through the site; the address underneath remains available as a secondary contact path.
export const sponsorshipContact = {
  id: "contact",
  // No eyebrow or other metadata label above the title (owner's review). The title is one string and
  // wraps naturally across the available width.
  title: "LET’S BUILD SOMETHING TOGETHER.",
  description:
    "We welcome discussions on sponsorship, technical collaboration, and other forms of project support.",
  email: "admin@watflight.com",
  formLabel: "Sponsorship inquiry",
  fields: [
    {
      id: "name",
      label: "Name",
      placeholder: "Your name",
      type: "text",
      autoComplete: "name",
      layout: "half",
      required: true,
      errorMissing: "Enter your name.",
    },
    {
      id: "company",
      label: "Company",
      labelSuffix: "(optional)",
      placeholder: "Your company",
      type: "text",
      autoComplete: "organization",
      layout: "half",
      required: false,
    },
    {
      id: "email",
      label: "Work email",
      placeholder: "you@company.com",
      type: "email",
      autoComplete: "email",
      layout: "full",
      required: true,
      errorMissing: "Enter your work email.",
      errorInvalid: "Enter a valid email address, for example you@company.com.",
    },
    {
      id: "message",
      label: "Message",
      placeholder: "Tell us what you’d like to discuss",
      type: "textarea",
      layout: "full",
      required: true,
      errorMissing: "Enter a message.",
    },
  ] satisfies readonly ContactField[],
  submitLabel: "Send inquiry",
  submittingLabel: "Sending inquiry",
  // Shown directly under the button; only the address is a link.
  directEmailPrompt: "Prefer to email directly?",
  statusSending: "Sending your inquiry…",
  statusSent: "Thanks — your inquiry has been sent to WATFlight.",
  statusSpamCheck: "Complete the spam check before sending your inquiry.",
  statusError: "We could not send your inquiry. Please try again later.",
};
