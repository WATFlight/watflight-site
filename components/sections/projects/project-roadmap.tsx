import Image from "next/image";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { assetSlots } from "@/content/assets";
import { projectRoadmap } from "@/content/projects";

// Phase label colors, as printed in the approved picture: the first phase in blue, the next two light,
// the last (Flight) dimmer. All of them are 5:1 or better on #050505.
const labelTone = ["text-blue", "text-ink", "text-ink", "text-ink-2"] as const;

/**
 * Project roadmap (frame 333:496), rebuilt as live HTML and CSS. In the frame the whole roadmap is one
 * flattened raster; here it is an ordered list of four phases (Concept, Simulation, Integration, Flight),
 * each a label, an independent illustration, a title and a description, all real selectable text except
 * the illustrations. The connecting line, the blue timeline nodes and the terminal arrow are decorative
 * CSS and SVG, hidden from assistive technology, so screen readers meet the four phases once, in order,
 * and the roadmap reads without any image. The "PROJECT ROADMAP" heading and its paragraph are unchanged.
 *
 * Timeline nodes: filled blue for the first three phases, an outlined ring for Flight, as in the picture.
 * Layouts (the phase order is always obvious: one connecting line runs through the nodes, in order):
 * - 1280px and up: four equal columns under a horizontal line with the label above each node, the nodes on
 *   the line at each column's left edge, and an arrow at its right end. Each illustration sits in an equal
 *   2:1 area, left- and bottom-aligned (as in the frame), then the title and description.
 * - 768 to 1279px: a vertical timeline (at most 820px wide, like the paragraph above it), one phase per row;
 *   the illustration and the text sit side by side.
 * - Below 768px: the same vertical timeline with each phase stacked (label, illustration, title,
 *   description). Nothing is scaled down as a picture, so the text never shrinks and nothing scrolls sideways.
 */
export function ProjectRoadmap() {
  return (
    <section aria-labelledby="project-roadmap-heading">
      <PageContainer className="pt-12 pb-16 md:pt-16 md:pb-20 xl:pt-[61px] xl:pb-[79px]">
        <SectionHeading as="h2" size="display-page" id="project-roadmap-heading" title={projectRoadmap.title} />
        <p className="type-body-lg mt-3 max-w-[761px] text-ink-2">{projectRoadmap.description}</p>

        <div className="relative mt-10 md:mt-12 xl:mt-12">
          {/* Decorative connecting line and terminal arrow: vertical below 1280px, horizontal from 1280px. */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-3 left-[6px] w-px bg-blue-dark/35 xl:top-[34px] xl:right-[8px] xl:bottom-auto xl:h-px xl:w-auto"
          />
          <svg
            aria-hidden="true"
            focusable="false"
            width="9"
            height="15"
            viewBox="0 0 9 15"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute bottom-0 left-[6px] -translate-x-1/2 rotate-90 text-blue/80 xl:top-[34.5px] xl:right-0 xl:bottom-auto xl:left-auto xl:translate-x-0 xl:-translate-y-1/2 xl:rotate-0"
          >
            <path d="M1.5 1.5 7.5 7.5 1.5 13.5" />
          </svg>

          <ol
            role="list"
            className="flex flex-col gap-12 md:max-w-[820px] md:gap-14 xl:grid xl:max-w-none xl:grid-cols-4 xl:gap-x-8"
          >
            {projectRoadmap.stages.map((stage, index) => {
              const { path, width, height } = assetSlots[stage.illustration.slot];

              return (
                <li
                  key={stage.label}
                  className="relative pl-9 md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-x-8 md:gap-y-5 md:pl-12 xl:block xl:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-0.5 left-0 size-[13px] rounded-full xl:top-7",
                      stage.node === "filled" ? "bg-blue" : "border-2 border-blue bg-canvas",
                    )}
                  />

                  <p className={cn("type-eyebrow md:col-span-2 xl:col-auto", labelTone[index])}>{stage.label}</p>

                  {path ? (
                    <div className="mt-5 md:mt-0 xl:mt-[49px] xl:flex xl:aspect-[2/1] xl:items-end">
                      <Image
                        src={path}
                        alt={stage.illustration.alt}
                        width={width}
                        height={height}
                        // Vector files (hairline strokes that stay 1px at any size): served as they are, never re-encoded.
                        unoptimized
                        className="block h-auto w-full max-w-[340px] md:max-w-[360px] xl:h-full xl:max-w-none xl:object-contain xl:object-left-bottom"
                      />
                    </div>
                  ) : null}

                  <div className="mt-5 md:mt-0 md:self-center xl:mt-6">
                    <h3 className="text-base leading-6 font-medium text-ink">{stage.title}</h3>
                    <p className="type-body-sm mt-2 max-w-[360px] text-ink-2">{stage.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </PageContainer>
    </section>
  );
}
