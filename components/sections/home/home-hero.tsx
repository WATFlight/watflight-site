import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { hero } from "@/content/home";

// Figma gradients over 'image 10': the right edge fades to black, and the left 26% is solid black
// fading to transparent, so the headline sits on dark floor.
const heroOverlay =
  "[background-image:linear-gradient(90deg,rgba(0,0,0,0)_90.865%,#000_100%),linear-gradient(90deg,#000_26.442%,rgba(0,0,0,0)_100%)]";

/**
 * Hero (Home frame, 1440px reference): the aircraft photo sits 94px below the header rule and spans
 * 810px; the headline starts 222px below the rule and overlaps the photo. The overlay layout is used
 * from 1280px up, where the black left side of the photo still sits behind the text. Below that the
 * photo stacks under the copy at full width, so the headline never covers the aircraft.
 */
export function HomeHero() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate xl:min-h-[min(904px,calc(94px_+_56.25vw))]"
    >
      <PageContainer className="relative z-10 pt-12 pb-10 md:pt-20 xl:pt-[222px] xl:pb-24">
        <div className="flex max-w-[847px] flex-col gap-6 md:gap-[37px]">
          <SectionHeading as="h1" size="display-hero" id="home-hero-heading" title={hero.title} />
          <p className="type-body-lg max-w-[644px] text-ink-2">{hero.intro}</p>
          <div className="flex flex-wrap gap-4 md:gap-[33px]">
            {hero.actions.map(({ label, href, variant }) => (
              <Button key={label} href={href} variant={variant}>
                {label}
              </Button>
            ))}
          </div>
        </div>
      </PageContainer>

      <div className="relative z-0 aspect-[1440/810] w-full xl:absolute xl:top-[94px] xl:bottom-0 xl:left-1/2 xl:aspect-auto xl:max-w-[1440px] xl:-translate-x-1/2">
        <MediaFrame
          slot="HOME-HERO"
          alt={hero.imageAlt}
          sizes="(min-width: 1440px) 1440px, 100vw"
          priority
          fluid
          className="h-full w-full"
          imageClassName="object-right"
          overlayClassName={heroOverlay}
        />
      </div>
    </section>
  );
}
