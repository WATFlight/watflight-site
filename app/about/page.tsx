import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "WATFlight is a student-led engineering design team at the University of Waterloo designing, simulating, building, and flight-testing sustainable and autonomous unmanned aircraft systems.",
};

// Route skeleton: page sections are built in later milestones (About Us frame 262:80).
export default function AboutPage() {
  return (
    <PageContainer className="py-16 md:py-24">
      <SectionHeading as="h1" size="display-page" title="ABOUT WATFLIGHT" />
    </PageContainer>
  );
}
