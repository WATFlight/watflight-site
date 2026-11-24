import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { projectCta } from "@/content/projects";

/**
 * Bottom call-to-action (frame 333:496): the shared cream band between its two rule stacks, at this
 * frame's size (466px of cream from 1280px, content centered), not Home's full-viewport Join band.
 * The gaps are the frame's: 65px from the title to the paragraph and 32px from the paragraph to the
 * button. The band marks itself `data-header-theme="light"`, so the sticky header turns light only
 * while it overlaps the band.
 */
export function ProjectCta() {
  return (
    <CtaBand
      id={projectCta.id}
      title={projectCta.title}
      description={projectCta.description}
      descriptionGap="65px"
      actionsGap="32px"
      contentClassName="xl:min-h-[466px] xl:py-0"
      titleClassName="text-balance"
    >
      {projectCta.actions.map(({ label, href, variant }) => (
        <Button key={label} href={href} variant={variant}>
          {label}
        </Button>
      ))}
    </CtaBand>
  );
}
