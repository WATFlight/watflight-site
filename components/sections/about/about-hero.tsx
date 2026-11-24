import { MediaFrame } from "@/components/ui/media-frame";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutHero } from "@/content/about";

// Figma gradient over 'Rectangle 39': black at the left edge, transparent at 71.154% of the width.
const heroOverlay = "[background-image:linear-gradient(90deg,#000_0%,rgba(0,0,0,0)_71.154%)]";

/**
 * About hero (frame 262:80, 1440px reference). The header rule is at y=74 and the hero's bottom rule
 * at y=652, so the section is 578px tall at 1280px and up. The headline starts 182px below the
 * header, set on two lines ("ABOUT" / "WATFLIGHT"), and the photo is 729x397, 112px below the
 * header with its right edge on the right grid rail (the section is capped to the 1440px frame like
 * the rails). The last 10 to 40px of the paragraph run over the photo's black left edge, as in the
 * comp.
 *
 * The photo always keeps the slot's 729:397 ratio, so the frame's centered `object-fit: cover` crop
 * is identical at every width. Below 1280px it stacks under the copy inside the page margins.
 * The vertical rails (z-grid layer) draw over it.
 */
export function AboutHero() {
  return (
    <section aria-labelledby="about-hero-heading" className="relative isolate xl:min-h-[578px]">
      <PageContainer className="relative z-10 pt-12 md:pt-20 xl:pt-[182px] xl:pb-[54px]">
        <div className="flex max-w-[644px] flex-col gap-6 md:gap-[37px]">
          <SectionHeading
            as="h1"
            size="display-page"
            id="about-hero-heading"
            title={aboutHero.titleLines.map((line, index) => (
              <span key={line}>
                {index > 0 ? " " : null}
                <span className="block">{line}</span>
              </span>
            ))}
            motion="enter"
          />
          <p data-enter="rise" data-step="2" className="type-body-lg text-ink-2">
            {aboutHero.intro}
          </p>
        </div>
      </PageContainer>

      <div className="relative z-0 mx-auto mt-10 w-full max-w-[1440px] px-5 pb-12 md:mt-12 md:px-8 md:pb-16 lg:px-12 xl:absolute xl:top-[112px] xl:left-1/2 xl:mt-0 xl:-translate-x-1/2 xl:p-0">
        <div className="xl:absolute xl:top-0 xl:right-[var(--rail-inset)] xl:w-[50.625%]">
          <MediaFrame
            slot="ABOUT-HERO"
            alt={aboutHero.imageAlt}
            sizes="(min-width: 1440px) 729px, (min-width: 1280px) 51vw, 100vw"
            priority
            scan
            className="w-full"
            overlayClassName={heroOverlay}
          />
        </div>
      </div>
    </section>
  );
}
