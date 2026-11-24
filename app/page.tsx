import type { Metadata } from "next";
import { HomeBlackoutPanel } from "@/components/sections/home/home-blackout-panel";
import { HomeHero } from "@/components/sections/home/home-hero";
import { HomeJoinBand } from "@/components/sections/home/home-join-band";
import { HomeMission } from "@/components/sections/home/home-mission";
import { HomePartner } from "@/components/sections/home/home-partner";
import { HomeProject } from "@/components/sections/home/home-project";
import { HomeSponsors } from "@/components/sections/home/home-sponsors";
import { Rule } from "@/components/ui/rule";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: { absolute: "WATFlight | Building the Future of Aerospace" },
  description:
    "WATFlight is a student-run design team at the University of Waterloo designing, building and flying innovative aerospace systems.",
  path: "/",
});

// Home (Figma frame 262:79). The sections above the sponsors are separated by full-width #2B2B2B
// rules that run to both viewport edges and cross the vertical grid rails; the rails overlay those
// sections (z-grid layer). Sponsors & partners is one solid-black panel with no layer of its own, so
// the rails run through it unbroken; it begins right after the Project section with no rule at its
// top and ends at the Join band's own rule stack. The sticky header sits above everything and turns
// light while the cream Join band is under it.
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Rule />
      <HomeMission />
      <Rule />
      <HomeProject />
      <HomeBlackoutPanel>
        <HomeSponsors />
        <HomePartner />
      </HomeBlackoutPanel>
      <HomeJoinBand />
    </>
  );
}
