import { Eyebrow } from "@/components/ui/eyebrow";
import { MediaFrame } from "@/components/ui/media-frame";
import { PageContainer } from "@/components/ui/page-container";
import { projectHero } from "@/content/projects";

// Figma gradient over 'image 27': black at the top, transparent at the bottom (the whole overlay below
// 1280px). From 1280px the intro paragraph is set over the picture, so a soft elliptical scrim is
// layered on top of that same gradient, centered on the paragraph (163px, 146px from the picture's top
// left, the paragraph being 306x145 at 10px, 73px): a plateau of 80% black that covers the paragraph's
// whole box with a few pixels to spare, then an eased fade (about 100px at the sides, 50px above and
// below) back to the photograph, so there is no visible box. It darkens the picture only; the crop, the
// text and every position are unchanged. Classes are literal so Tailwind generates them.
const heroOverlay =
  "[background-image:linear-gradient(180deg,#000_0%,rgba(0,0,0,0)_100%)] xl:[background-image:radial-gradient(ellipse_336px_162px_at_163px_146px,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.8)_69%,rgba(0,0,0,0.7)_75%,rgba(0,0,0,0.45)_85%,rgba(0,0,0,0.18)_93%,rgba(0,0,0,0)_100%),linear-gradient(180deg,#000_0%,rgba(0,0,0,0)_100%)]";

/**
 * Current Project hero (frame 333:496, 1440px reference). From 1280px the hero is a 745px stage (the
 * header ends at y=74 and the rule under the hero is the row above y=820) with the frame's own
 * placement, all measured from the 1440px-capped page box:
 *
 * - eyebrow centered at 79px; the two-line headline centered at 725.5px (the frame's text box is
 *   centered there, 5.5px right of the page center) starting 107px down, with the first line's trailing
 *   space kept as the frame has it;
 * - intro paragraph 306px wide at x=126, y=263 and goal paragraph 366px wide, right-aligned to x=1285,
 *   y=560, both set over the picture exactly as in the comp;
 * - the picture is 1260x420 at y=190 with its right edge 64px from the page edge; it grows and shrinks
 *   with the page between 1280 and 1440px and always keeps the slot's 3:1 ratio.
 *
 * Below 1280px nothing overlaps: eyebrow, headline, intro, picture, goal, centered, in that reading
 * order. The vertical rails (z-grid layer) draw over the picture.
 */
export function ProjectHero() {
  return (
    <section aria-labelledby="project-hero-heading" className="relative isolate">
      <PageContainer className="relative flex flex-col items-center pt-12 pb-16 text-center md:pt-16 md:pb-20 xl:block xl:h-[745px] xl:p-0 xl:text-left">
        <Eyebrow className="relative z-10 xl:absolute xl:top-[79px] xl:left-1/2 xl:-translate-x-1/2">
          {projectHero.eyebrow}
        </Eyebrow>

        <h1
          id="project-hero-heading"
          className="type-display-page relative z-10 mt-6 text-blue xl:absolute xl:top-[107px] xl:left-[calc(50%+5.5px)] xl:mt-0 xl:-translate-x-1/2 xl:text-center xl:whitespace-pre"
        >
          <span className="block">{`${projectHero.titleLines[0]} `}</span>
          <span className="block">{projectHero.titleLines[1]}</span>
        </h1>

        <p className="type-body-lg relative z-10 mt-8 max-w-[536px] text-ink-2 xl:absolute xl:top-[263px] xl:left-[126px] xl:mt-0 xl:w-[306px] xl:max-w-none">
          {projectHero.intro}
        </p>

        <div className="relative z-0 mt-10 w-full md:mt-12 xl:absolute xl:top-[190px] xl:right-16 xl:left-[116px] xl:mt-0 xl:w-auto">
          <MediaFrame
            slot="PROJ-HERO"
            alt={projectHero.imageAlt}
            sizes="(min-width: 1440px) 1260px, (min-width: 1280px) calc(100vw - 180px), 100vw"
            priority
            className="w-full bg-transparent!"
            overlayClassName={heroOverlay}
          />
        </div>

        <p className="type-body-lg relative z-10 mt-8 max-w-[536px] text-ink-2 xl:absolute xl:top-[560px] xl:right-[155px] xl:mt-0 xl:w-[366px] xl:max-w-none xl:text-right">
          {projectHero.goal}
        </p>
      </PageContainer>
    </section>
  );
}
