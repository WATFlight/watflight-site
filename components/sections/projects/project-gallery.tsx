import { MediaFrame } from "@/components/ui/media-frame";
import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";
import { projectGallery } from "@/content/projects";

// Per picture: the frame's own aspect ratio (slot size), and where the picture sits in the 1280px-and-up
// mosaic. The first picture takes the second one's ratio on tablets so the two share a row height.
const layout = [
  "aspect-[440/158] md:aspect-[441/188] xl:aspect-[440/158] xl:col-start-1 xl:row-start-1",
  "aspect-[441/188] xl:col-start-1 xl:row-start-2",
  "aspect-[428/353] xl:col-start-3 xl:row-span-2 xl:row-start-1 xl:self-start",
  "aspect-[425/353] xl:col-start-5 xl:row-span-2 xl:row-start-1 xl:self-start",
] as const;

/**
 * Inside the project (frame 333:496, 1440px reference): the 64/72 title, a 761px paragraph 12px under
 * it, and the mosaic 27px below that. Desktop mosaic from 1280px: two stacked pictures on the left
 * (440x158 over 441x188, 11px apart), then 428x353 and 425x353, with 16px and 8px between the columns.
 * The columns are fractions of 441:16:428:8:425, so the mosaic scales with the page and the frame's
 * 1318px (6px wider than the page content) is exact at 1440px. Each picture keeps the crop the frame
 * gives it (`imageClassName`).
 *
 * Tablet (768 to 1279px): two even columns, the wide pair first with a shared ratio, then the tall pair.
 * Phone: one column, each picture at its own frame ratio. The rails draw over the pictures.
 */
export function ProjectGallery() {
  return (
    <section aria-labelledby="project-gallery-heading">
      <PageContainer className="pb-16 md:pb-20 xl:pb-[123px]">
        <SectionHeading as="h2" size="display-page" id="project-gallery-heading" title={projectGallery.title} />
        <p className="type-body-lg mt-3 max-w-[761px] text-ink-2">{projectGallery.description}</p>

        <ul
          role="list"
          className="mt-8 grid gap-4 md:mt-10 md:grid-cols-2 md:gap-6 xl:mt-[27px] xl:w-[calc(100%+6px)] xl:grid-cols-[441fr_16fr_428fr_8fr_425fr] xl:gap-x-0 xl:gap-y-[11px]"
        >
          {projectGallery.images.map((image, index) => (
            <li key={image.slot} className={cn("relative", layout[index])}>
              <MediaFrame
                slot={image.slot}
                alt={image.alt}
                sizes="(min-width: 1440px) 441px, (min-width: 1280px) 33vw, (min-width: 768px) 46vw, 100vw"
                fluid
                className="h-full w-full"
                imageClassName={image.imageClassName}
              />
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
