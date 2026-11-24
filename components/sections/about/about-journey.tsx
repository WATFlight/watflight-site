import Image from "next/image";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { journey } from "@/content/about";

// The same inset the vertical rails use (components/ui/grid-rails.tsx), so the timeline's line runs
// from rail to rail like the 1338px line in the frame (x=52 to x=1390 at 1440px).
const railEdge = "max(var(--rail-inset), calc((100% - 1440px) / 2 + var(--rail-inset)))";

/**
 * Our journey (frame 262:80): title and intro on one row, then a four-stage timeline.
 *
 * Timeline, 768px and up (horizontal, as in the frame): a 1px #969690 line from rail to rail with a
 * 22px marker on it (the exact `Group 35` export), a 12px blue stem below each marker, and the year,
 * title and description starting at the stem. From 1280px the columns use the frame's own
 * proportions (stems at 126, 402, 736 and 1061px from the left page margin at 1440px, description
 * boxes 181px wide); from 768 to 1279px they are four equal columns.
 *
 * Below 768px it becomes a vertical timeline: the line runs down through the markers at the left,
 * the stem points to the text, and nothing scrolls sideways.
 *
 * Semantics: an ordered list; each stage is a list item with its label, an h3 and a description.
 * The dates are provisional (docs/rebuild-notes.md).
 */
export function AboutJourney() {
  return (
    <section aria-labelledby="about-journey-heading">
      {/* Frame: the paragraph starts 65px below the rule and the title 3px lower (718 and 721 at 1440px). */}
      <PageContainer className="pt-16 md:pt-20 xl:pt-[65px]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:items-start xl:pr-5">
          <SectionHeading id="about-journey-heading" title={journey.title} className="lg:mt-[3px]" />
          <p data-reveal="" className="type-body text-ink-2">
            {journey.intro}
          </p>
        </div>
      </PageContainer>

      <div data-progress="" className="relative mt-12 pb-20 md:mt-16 md:pb-24 xl:mt-[112px] xl:pb-[129px]">
        <span
          aria-hidden="true"
          data-draw="x"
          className="absolute top-0 hidden h-px bg-ink-2 md:block"
          style={{ left: `calc(${railEdge} + 1px)`, right: `calc(${railEdge} + 1px)` }}
        />
        <PageContainer>
          <ol className="md:grid md:grid-cols-4 md:gap-x-6 xl:grid-cols-[276fr_334fr_325fr_251fr] xl:gap-x-0 xl:pl-[9.604%]">
            {journey.stages.map((stage) => (
              <li
                key={`${stage.label}-${stage.title}`}
                data-at=""
                className="group/stage relative pb-10 pl-[44px] last:pb-0 md:pb-0 md:pl-0 md:pt-[29px]"
              >
                <Image
                  src="/images/about/timeline-marker.svg"
                  alt=""
                  width={22}
                  height={22}
                  data-node=""
                  className="absolute top-0 left-0 z-10 md:-top-[10px] md:-left-[11px]"
                />
                {/* Vertical line between markers (phones only; the last stage has none). */}
                <span
                  aria-hidden="true"
                  className="absolute top-[11px] bottom-0 left-[11px] w-px bg-ink-2 group-last/stage:hidden md:hidden"
                />
                {/* Blue stem: points right from the marker on phones, down from it from 768px. */}
                <span
                  aria-hidden="true"
                  className="absolute top-[11px] left-[22px] h-px w-3 bg-blue md:top-3 md:left-0 md:h-3 md:w-px"
                />
                <p className="type-eyebrow mt-[3px] text-ink md:mt-0">{stage.label}</p>
                <h3 className="type-h5 mt-1 text-ink">{stage.title}</h3>
                <p className="type-body-sm mt-2.5 max-w-[181px] text-ink-2">{stage.description}</p>
              </li>
            ))}
          </ol>
        </PageContainer>
      </div>
    </section>
  );
}
