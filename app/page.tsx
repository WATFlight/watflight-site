import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: { absolute: "WATFlight | Building the Future of Aerospace" },
  description:
    "WATFlight is a student-run design team at the University of Waterloo designing, building and flying innovative aerospace systems.",
};

// Route skeleton: page sections are built in later milestones (Home frame 262:79).
export default function HomePage() {
  return (
    <PageContainer className="py-16 md:py-24">
      <SectionHeading as="h1" size="display-hero" title="BUILDING THE FUTURE OF AEROSPACE" />
    </PageContainer>
  );
}
