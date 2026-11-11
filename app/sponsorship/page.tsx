import type { Metadata } from "next";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata: Metadata = {
  title: "Sponsorship",
  description:
    "Support a student-driven team advancing innovative aerospace systems. Partner with WATFlight to invest in talent, technology and real-world impact.",
};

// Route skeleton: page sections are built in later milestones (Sponsorship frame 340:771).
// The h1 wording is PROVISIONAL: the frame body is a flattened image read at thumbnail scale.
export default function SponsorshipPage() {
  return (
    <PageContainer className="py-16 md:py-24">
      <SectionHeading
        as="h1"
        size="display-page"
        title={
          <>
            PARTNER WITH <span className="text-blue">WATFLIGHT</span>
          </>
        }
      />
    </PageContainer>
  );
}
