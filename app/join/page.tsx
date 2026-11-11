import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Join",
  description:
    "Join a multidisciplinary team designing, building, and testing real aerospace systems at the University of Waterloo.",
};

// Route skeleton: page sections are built in later milestones (Join the Team frame 344:1128).
// The h1 wording is PROVISIONAL: the frame body is a flattened image read at thumbnail scale.
export default function JoinPage() {
  return (
    <PageContainer className="py-16 md:py-24">
      <SectionHeading as="h1" size="display-page" title="JOIN THE TEAM." />
    </PageContainer>
  );
}
