import type { Metadata } from "next";
import { JoinApply } from "@/components/sections/join/join-apply";
import { JoinCta } from "@/components/sections/join/join-cta";
import { JoinHero } from "@/components/sections/join/join-hero";
import { JoinSubteams } from "@/components/sections/join/join-subteams";
import { Rule } from "@/components/ui/rule";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Join a multidisciplinary team designing, building, and testing real aerospace systems at the University of Waterloo.",
};

// Join the Team (Figma frame 344:1128). The frame is the owner's 3x PNG export of a flattened, AI-generated
// design reference, rebuilt here as semantic HTML: only its five photographs were extracted (public/images/join).
// All copy is provisional (content/join.ts; docs/rebuild-notes.md, "Join the Team page"). Full-width #2B2B2B
// rules separate the hero, subteams, how-to-apply and project sections; the grid rails overlay every section,
// the sticky header stays dark (the page has no cream band) and "Join WATFlight" is the active nav item.
export default function JoinPage() {
  return (
    <>
      <JoinHero />
      <Rule />
      <JoinSubteams />
      <Rule />
      <JoinApply />
      <Rule />
      <JoinCta />
    </>
  );
}
