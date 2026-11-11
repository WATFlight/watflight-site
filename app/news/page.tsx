import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "News",
  description: "News and updates from the WATFlight student design team at the University of Waterloo.",
};

// Route skeleton: page sections are built in later milestones (News & Blog frame 344:1129).
// The h1 wording is PROVISIONAL: the frame body is a flattened image read at thumbnail scale.
export default function NewsPage() {
  return (
    <PageContainer className="py-16 md:py-24">
      <SectionHeading as="h1" size="display-page" title="LATEST FROM WATFLIGHT." />
    </PageContainer>
  );
}
