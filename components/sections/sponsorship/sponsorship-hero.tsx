import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/ui/page-container";
import { cn } from "@/lib/cn";
import { sponsorshipHero } from "@/content/sponsorship";
import { FramedPhoto } from "@/components/sections/sponsorship/framed-photo";
import { h1Class } from "@/components/sections/sponsorship/styles";

/**
 * Sponsorship hero (frame 340:771, 1440px reference from the owner's export): a blue-dashed eyebrow, the
 * two-line headline with "WATFLIGHT" in blue, a paragraph about 480px wide (it wraps as in the design at
 * this size), a light "BECOME A PARTNER" button, and the hangar photograph in its corner brackets to the
 * right. From 1024px the copy and photo are two equal columns centered on each other, in a section that
 * runs from the header to the rule below (about 620px at 1440px); below that the photo stacks under the
 * copy. The photograph is an illustrative AI image (see the notes).
 */
export function SponsorshipHero() {
  return (
    <section aria-labelledby="sponsorship-hero-heading">
      <PageContainer className="grid items-center gap-10 py-12 md:gap-12 md:py-16 lg:grid-cols-2 lg:gap-12 xl:py-20">
        <div>
          <p className="type-eyebrow flex items-center gap-3 text-blue">
            <span aria-hidden="true" className="block h-0.5 w-9 bg-blue" />
            {sponsorshipHero.eyebrow}
          </p>
          <h1 id="sponsorship-hero-heading" className={cn(h1Class, "mt-6 text-ink")}>
            {sponsorshipHero.titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? " " : null}
                <span className={cn("block", index === 1 && "text-blue")}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="type-body-lg mt-7 max-w-[480px] text-ink-2">{sponsorshipHero.intro}</p>
          <div className="mt-7">
            <Button href={sponsorshipHero.action.href} variant="light">
              {sponsorshipHero.action.label}
              <span aria-hidden="true">→</span>
            </Button>
          </div>
        </div>

        <FramedPhoto
          slot="SPONSORSHIP-HERO"
          alt={sponsorshipHero.imageAlt}
          sizes="(min-width: 1440px) 632px, (min-width: 1024px) 50vw, 100vw"
          priority
        />
      </PageContainer>
    </section>
  );
}
