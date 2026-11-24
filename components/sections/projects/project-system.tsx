import Image from "next/image";
import type { CSSProperties } from "react";
import { MediaFrame } from "@/components/ui/media-frame";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { projectSpecs, projectSystem } from "@/content/projects";

/** Custom properties read by the 1280px-and-up layout (Tailwind's `xl:top-(--title-top)` and friends). */
const vars = (values: Record<`--${string}`, string>) => values as CSSProperties;

/**
 * Hydrogen-electric system and technical specifications (frame 333:496, 1440px reference): two
 * columns split by a 1px #2B2B2B divider on the page center line (it runs from y=899 to y=1410, so it
 * is inset 79px from the top of the section and 71px from the bottom). The section sits between two
 * full-width rules.
 *
 * Left: the 36/44 heading, a 577px paragraph, then four entries (render + title + description). The
 * renders are an auto-layout column (centered in 181px, 47px apart); the frame places each entry's text
 * by hand, so its offset from the render is data (`titleTop`, `descriptionGap`).
 *
 * Right: the 28/36 heading (its baseline matches the left heading), a paragraph and a `<dl>` of four
 * term/description rows with a 33px icon column. Row heights, text tops, icon tops and the starts of the
 * three divider lines (each 3px further right than the last) are the frame's own numbers. At 1440px the
 * two columns end together (y=1420) and the section is 661px tall.
 *
 * Below 1024px the columns stack (system first). The right column's rows then flow normally with a
 * rule between them; below 1280px the hand-placed offsets give way to ordinary spacing. Between 1280
 * and 1440px the gap between a render and its text grows from 32px to the frame's 81px with the viewport
 * (one `clamp`), the left text may wrap (nowrap only from 1440px) and the row dividers end at the column
 * edge instead of the frame's fixed 537px, so nothing reaches the divider or the right rail.
 */
export function ProjectSystem() {
  return (
    <section aria-labelledby="project-system-heading">
      <PageContainer className="relative pt-12 pb-16 md:pt-16 md:pb-20 xl:pt-[51px] xl:pb-[61px]">
        <div className="grid lg:grid-cols-2">
          <div className="lg:pr-8">
            <SectionHeading as="h2" size="h2" id="project-system-heading" title={projectSystem.title} />
            <p data-reveal="" className="type-body mt-1.5 max-w-[577px] text-ink-2 xl:min-h-[51px]">
              {projectSystem.description}
            </p>

            <ul role="list" className="mt-8 flex flex-col gap-10 xl:mt-[45px] xl:gap-[47px]">
              {projectSystem.components.map((component) => (
                <li key={component.name} data-reveal="">
                  <article className="flex flex-col gap-4 md:flex-row md:items-start md:gap-8 xl:grid xl:grid-cols-[181px_minmax(0,1fr)] xl:gap-x-[clamp(2rem,calc(2rem_+_(100vw_-_80rem)_*_0.30625),5.0625rem)]">
                    <div className="max-w-full md:flex md:w-[181px] md:shrink-0 md:justify-center xl:w-auto">
                      <div className="max-w-full" style={{ width: component.imageWidth }}>
                        <MediaFrame
                          slot={component.slot}
                          alt=""
                          sizes={`${component.imageWidth}px`}
                          motion="none"
                          className="w-full bg-transparent!"
                        />
                      </div>
                    </div>
                    <div
                      className="xl:relative xl:top-(--title-top)"
                      style={vars({ "--title-top": `${component.titleTop}px`, "--description-gap": `${component.descriptionGap}px` })}
                    >
                      <h3 className="type-h5 text-ink min-[1440px]:whitespace-nowrap">{component.name}</h3>
                      <p className="type-body-sm mt-1 text-ink-2 xl:mt-(--description-gap) min-[1440px]:whitespace-nowrap">
                        {component.description}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14 lg:mt-0 lg:pl-8 xl:pl-[63px]">
            <SectionHeading
              as="h2"
              size="h3"
              id="project-specs-heading"
              title={projectSpecs.title}
              className="xl:mt-2"
            />
            <p data-reveal="" className="type-body mt-1.5 max-w-[577px] text-ink-2 xl:min-h-[51px]">
              {projectSpecs.description}
            </p>

            <dl className="mt-8 xl:mt-[44px]">
              {projectSpecs.rows.map((row, index) => (
                <div
                  key={row.term}
                  data-reveal=""
                  className={cn(
                    "relative pl-14 xl:h-(--row-h) xl:pl-0",
                    index === 0
                      ? "pb-6 xl:pb-0"
                      : "border-t border-rule py-6 xl:border-t-0 xl:py-0 xl:before:absolute xl:before:-top-px xl:before:right-0 xl:before:left-(--divider-shift) xl:before:h-px xl:before:bg-rule xl:before:content-[''] min-[1440px]:before:right-auto min-[1440px]:before:w-[537px]",
                  )}
                  style={vars({
                    "--row-h": `${row.xl.height}px`,
                    "--title-top": `${row.xl.titleTop}px`,
                    "--icon-top": `${row.xl.iconTop}px`,
                    "--icon-left": `${row.xl.iconLeft}px`,
                    "--divider-shift": `${row.xl.dividerShift}px`,
                  })}
                >
                  <dt className="type-h5 text-ink xl:absolute xl:top-(--title-top) xl:left-[57px] xl:whitespace-nowrap">
                    <span
                      aria-hidden="true"
                      // From 1280px the <dt> is itself absolutely placed (title top, 57px in), so the icon's
                      // offsets, given from the row, are corrected by the same amounts.
                      className={cn(
                        "absolute left-0 block xl:top-[calc(var(--icon-top)-var(--title-top))] xl:left-[calc(var(--icon-left)-57px)]",
                        index === 0 ? "top-0" : "top-6",
                      )}
                      style={{ width: row.icon.box, height: row.icon.box }}
                    >
                      <Image
                        src={row.icon.src}
                        alt=""
                        width={row.icon.size}
                        height={row.icon.size}
                        className="absolute max-w-none"
                        style={{ left: row.icon.inset, top: row.icon.inset }}
                      />
                    </span>
                    {row.term}
                  </dt>
                  <dd
                    className="type-body-sm text-ink-2 xl:absolute xl:top-[calc(var(--title-top)+26px)] xl:left-[57px]"
                    style={{ maxWidth: row.descriptionMaxWidth }}
                  >
                    {row.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <span
          aria-hidden="true"
          data-reveal="rule-y"
          className="absolute top-[79px] bottom-[71px] left-1/2 hidden w-px bg-rule lg:block"
        />
      </PageContainer>
    </section>
  );
}
