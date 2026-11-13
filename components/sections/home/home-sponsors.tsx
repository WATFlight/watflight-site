import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SponsorMarquee } from "@/components/sections/home/sponsor-marquee";
import { sponsors } from "@/content/home";

/**
 * Sponsors & partners (Home): a light heading, then a full-bleed marquee of white logos moving
 * freely across the black panel (see HomeBlackoutPanel). No rules or boxes: the marquee has no
 * borders and the heading has no underline; generous vertical space does the separating.
 */
export function HomeSponsors() {
  return (
    <section aria-labelledby="home-sponsors-heading" className="pt-20 md:pt-28 xl:pt-32">
      <PageContainer>
        <SectionHeading id="home-sponsors-heading" title={sponsors.title} />
      </PageContainer>

      <div className="mt-14 md:mt-16 xl:mt-20">
        <SponsorMarquee logos={sponsors.logos} copies={sponsors.marqueeCopies} labelledBy="home-sponsors-heading" />
      </div>
    </section>
  );
}
