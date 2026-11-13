import Image from "next/image";
import { MediaFrame } from "@/components/ui/media-frame";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { assetSlots } from "@/content/assets";
import { projectRoadmap } from "@/content/projects";

// Source size of the roadmap raster ('Screenshot 2026-10-30 at 9.24.24 PM 1'). The stage columns sit
// at 5% to 99% of its width, so splitting it into equal halves or quarters never cuts a stage.
const SOURCE_WIDTH = 1630;
const SOURCE_HEIGHT = 398;

type CropProps = {
  /** Which part to show (0-based) when the picture is cut into `parts` equal pieces. */
  index: number;
  parts: 2 | 4;
  sizes: string;
  className?: string;
};

/** One piece of the exact roadmap raster, shown at its natural proportions: the same pixels, cropped. */
function RoadmapCrop({ index, parts, sizes, className }: CropProps) {
  const path = assetSlots["PROJ-ROADMAP"].path;
  if (!path) return null;

  return (
    <div
      aria-hidden="true"
      className={cn("relative w-full overflow-hidden bg-surface", className)}
      style={{ aspectRatio: `${SOURCE_WIDTH / parts} / ${SOURCE_HEIGHT}` }}
    >
      <Image
        src={path}
        alt=""
        width={SOURCE_WIDTH}
        height={SOURCE_HEIGHT}
        sizes={sizes}
        className="absolute top-0 h-full max-w-none"
        style={{ width: `${parts * 100}%`, left: `${-index * 100}%` }}
      />
    </div>
  );
}

/**
 * Project roadmap (frame 333:496, 1440px reference): the 64/72 title 61px under the rule, a 761px
 * paragraph 12px below it, and the roadmap picture 35px further down, 1274px wide and centered
 * (19px inside the page margins). In the frame the roadmap is a single raster, so it stays the exact
 * export instead of being redrawn. Its text is baked into the pixels, so the figure also carries a
 * visually hidden ordered list with the stage labels, titles and descriptions printed in the picture
 * (pending verification), and the picture itself is hidden from assistive technology.
 *
 * Readable treatment by width: the whole picture from 1280px (as in the frame); two stacked halves
 * (two stages each) from 768px; four stacked quarters (one stage each) below that. Each crop is the
 * same image, never scaled below about 0.8x its pixels, so the small type stays legible and the page
 * never scrolls sideways.
 */
export function ProjectRoadmap() {
  return (
    <section aria-labelledby="project-roadmap-heading">
      <PageContainer className="pt-12 pb-16 md:pt-16 md:pb-20 xl:pt-[61px] xl:pb-[79px]">
        <SectionHeading as="h2" size="display-page" id="project-roadmap-heading" title={projectRoadmap.title} />
        <p className="type-body-lg mt-3 max-w-[761px] text-ink-2">{projectRoadmap.description}</p>

        <figure aria-labelledby="project-roadmap-caption" className="mt-8 md:mt-10 xl:mx-auto xl:mt-[35px] xl:max-w-[1274px]">
          <figcaption id="project-roadmap-caption" className="sr-only">
            {projectRoadmap.caption}
          </figcaption>
          <ol className="sr-only">
            {projectRoadmap.stages.map((stage) => (
              <li key={stage.label}>
                {stage.label}: {stage.title}. {stage.description}
              </li>
            ))}
          </ol>

          {/* 1280px and up: the whole picture. */}
          <MediaFrame
            slot="PROJ-ROADMAP"
            alt=""
            sizes="(min-width: 1440px) 1274px, 100vw"
            className="hidden w-full xl:block"
          />

          {/* 768 to 1279px: two stages per row. */}
          <div className="hidden md:flex md:flex-col md:gap-6 xl:hidden">
            {[0, 1].map((index) => (
              <RoadmapCrop
                key={index}
                index={index}
                parts={2}
                sizes="(min-width: 768px) min(1632px, calc(2 * (100vw - 4rem)))"
                className="md:max-w-[815px]"
              />
            ))}
          </div>

          {/* Below 768px: one stage per row. */}
          <div className="flex flex-col gap-8 md:hidden">
            {[0, 1, 2, 3].map((index) => (
              <RoadmapCrop
                key={index}
                index={index}
                parts={4}
                sizes="min(1632px, calc(4 * (100vw - 2.5rem)))"
                className="max-w-[408px]"
              />
            ))}
          </div>
        </figure>
      </PageContainer>
    </section>
  );
}
