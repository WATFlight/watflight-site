import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Current Project",
  description:
    "We are developing a hydrogen-electric unmanned aerial vehicle designed for long-endurance, low-emission flight through autonomous operation.",
};

// Route skeleton: page sections are built in later milestones (Current Project frame 333:496).
// The project identity (hydrogen-electric UAV program) follows the approved Figma direction.
export default function ProjectsPage() {
  return (
    <PageContainer className="py-16 md:py-24">
      <SectionHeading
        as="h1"
        size="display-page"
        eyebrow="Current Project"
        title="hydrogen-electric UAV program"
        titleClassName="text-blue"
      />
    </PageContainer>
  );
}
