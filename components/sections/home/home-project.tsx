import { Button } from "@/components/ui/button";
import { MediaFrame } from "@/components/ui/media-frame";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { project } from "@/content/home";
import { DevelopmentProgress } from "@/components/sections/home/development-progress";

/**
 * "what we are building" (Home frame): a 760:533 split at 1280px and up, a 760x332 image with a
 * #2B2B2B border beside a #0F0F0F card with a 19px gap, then the development-progress row.
 * The image carries baked-in spec figures that are not verified, see `HOME-PROJECT` in
 * content/assets.ts and docs/rebuild-notes.md.
 */
export function HomeProject() {
  return (
    <section aria-labelledby="home-project-heading" className="pt-12 pb-12 xl:pb-[47px]">
      <PageContainer>
        <SectionHeading id="home-project-heading" title={project.title} />
        <div className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-5 xl:mt-12 xl:grid-cols-[760fr_533fr] xl:gap-[19px]">
          <div className="aspect-[760/332] xl:aspect-auto xl:min-h-[332px]">
            <MediaFrame
              slot="HOME-PROJECT"
              alt={project.imageAlt}
              sizes="(min-width: 1440px) 760px, (min-width: 1280px) 57vw, 100vw"
              bordered
              fluid
              className="h-full w-full"
              // Figma anchors the image to the frame's top-left and crops about 4% off the right.
              imageClassName="object-left"
            />
          </div>
          <SurfaceCard as="article" className="flex min-w-0 flex-col items-start gap-6 px-5 py-6 sm:px-7 sm:py-[33px]">
            <h3 className="type-h2 text-ink">{project.cardTitle}</h3>
            <p className="type-body text-ink-2">{project.cardBody}</p>
            <Button href={project.action.href} variant={project.action.variant} wrap>
              {project.action.label}
            </Button>
          </SurfaceCard>
        </div>
      </PageContainer>

      <DevelopmentProgress className="mt-12 xl:mt-11" />
    </section>
  );
}
