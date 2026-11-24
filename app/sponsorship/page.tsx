import type { Metadata } from "next";
import { SponsorshipContact } from "@/components/sections/sponsorship/sponsorship-contact";
import { SponsorshipHero } from "@/components/sections/sponsorship/sponsorship-hero";
import { SponsorshipPartners } from "@/components/sections/sponsorship/sponsorship-partners";
import { SponsorshipWays } from "@/components/sections/sponsorship/sponsorship-ways";
import { SponsorshipWhy } from "@/components/sections/sponsorship/sponsorship-why";
import { Rule } from "@/components/ui/rule";

export const metadata: Metadata = {
  title: "Sponsorship",
  description:
    "Support a student-driven team advancing innovative aerospace systems. Partner with WATFlight to invest in talent, technology and real-world impact.",
};

// Sponsorship (Figma frame 340:771). The frame's body is one flattened AI-generated screenshot, so every
// section below is rebuilt as semantic HTML from the owner's PNG export, using it as visual direction
// only; all of its copy is provisional (see docs/rebuild-notes.md, "Sponsorship page"). Full-width
// #2B2B2B rules separate the hero, why, ways and partners sections and close the page above the contact
// section; the grid rails overlay every section. The page has no cream band, so the sticky header stays
// dark throughout.
export default function SponsorshipPage() {
  return (
    <>
      <SponsorshipHero />
      <Rule />
      <SponsorshipWhy />
      <Rule />
      <SponsorshipWays />
      <Rule />
      <SponsorshipPartners />
      <Rule />
      <SponsorshipContact />
    </>
  );
}
