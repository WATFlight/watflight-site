import type { Metadata } from "next";
import { ProjectCta } from "@/components/sections/projects/project-cta";
import { ProjectGallery } from "@/components/sections/projects/project-gallery";
import { ProjectHero } from "@/components/sections/projects/project-hero";
import { ProjectRoadmap } from "@/components/sections/projects/project-roadmap";
import { ProjectSystem } from "@/components/sections/projects/project-system";
import { Rule } from "@/components/ui/rule";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Current Project",
  description:
    "We are developing a hydrogen-electric unmanned aerial vehicle designed for long-endurance, low-emission flight through autonomous operation.",
  path: "/projects",
});

// Current Project (Figma frame 333:496). Full-width #2B2B2B rules sit under the hero and under the
// system/specification section only (the frame draws no others); the vertical grid rails overlay every
// section (z-grid layer). The sticky header turns light only while the cream call-to-action band is
// under it. All copy and technical statements are pending team verification (docs/rebuild-notes.md).
export default function ProjectsPage() {
  return (
    <>
      <ProjectHero />
      <Rule />
      <ProjectSystem />
      <Rule />
      <ProjectRoadmap />
      <ProjectGallery />
      <ProjectCta />
    </>
  );
}
