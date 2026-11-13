import type { Metadata } from "next";
import { AboutCta } from "@/components/sections/about/about-cta";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutJourney } from "@/components/sections/about/about-journey";
import { AboutSubteams } from "@/components/sections/about/about-subteams";
import { AboutTeam } from "@/components/sections/about/about-team";
import { FacultyAdvisory } from "@/components/sections/about/faculty-advisory";
import { Rule } from "@/components/ui/rule";
import { facultyAdvisory } from "@/content/about";

export const metadata: Metadata = {
  title: "About",
  description:
    "WATFlight is a student-led engineering design team at the University of Waterloo designing, simulating, building, and flight-testing sustainable and autonomous unmanned aircraft systems.",
};

// About (Figma frame 262:80). Full-width #2B2B2B rules sit under the hero and (when advisors exist)
// above the faculty section; the vertical grid rails overlay every section (z-grid layer). The
// faculty section renders nothing while its advisor list is empty, and the sticky header turns light
// only while the cream call-to-action band is under it.
export default function AboutPage() {
  const hasAdvisors = facultyAdvisory.advisors.length > 0;

  return (
    <>
      <AboutHero />
      <Rule />
      <AboutJourney />
      <AboutTeam />
      <AboutSubteams followedByRule={hasAdvisors} />
      <FacultyAdvisory title={facultyAdvisory.title} advisors={facultyAdvisory.advisors} />
      <AboutCta />
    </>
  );
}
