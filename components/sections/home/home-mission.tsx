import { MediaFrame } from "@/components/ui/media-frame";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TextLink } from "@/components/ui/text-link";
import { mission } from "@/content/home";

/**
 * Mission (Home frame). Owner-directed change to the Figma treatment: the Earth-horizon image is
 * not an inset card any more. It fills the section's entire framed area, from the horizontal rule
 * above to the one below and from the left to the right edge, so no black space is left inside
 * those boundaries. The vertical grid rails render above it (z-grid layer) to keep the framing
 * visible.
 *
 * Composition: `object-cover` anchored right, 30% from the top, so the horizon and the bright
 * right side stay in frame (the 2.5:1 image only loses a thin slice at 1440px). The `earth-overlay`
 * gradient (globals.css) keeps the copy readable: a solid-black left half fading out to the right
 * from 1280px, and a top-down scrim when the copy sits above the image on smaller screens.
 * Text is 93px below the top rule at 1440px, as in Figma.
 */
export function HomeMission() {
  return (
    <section aria-labelledby="home-mission-heading" className="relative isolate">
      {/* The wrapper does the positioning: MediaFrame sets its own `relative`. */}
      <div className="absolute inset-0 z-0">
        <MediaFrame
          slot="HOME-GLOBE"
          alt=""
          sizes="100vw"
          fluid
          className="h-full w-full"
          imageClassName="object-[100%_30%]"
          overlayClassName="earth-overlay"
        />
      </div>

      <PageContainer className="relative z-10 pt-12 pb-[220px] md:pb-[260px] xl:pt-[93px] xl:pb-[114px]">
        <div className="flex max-w-[695px] flex-col gap-6 xl:gap-[49px]">
          <SectionHeading id="home-mission-heading" title={mission.title} />
          <p className="type-body-lg max-w-[586px] text-ink-2">{mission.body}</p>
          <div className="flex">
            <TextLink href={mission.link.href}>{mission.link.label}</TextLink>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
