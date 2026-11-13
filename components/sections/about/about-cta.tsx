import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { aboutCta } from "@/content/about";

/**
 * Bottom call-to-action (frame 262:80): the shared cream band between its two rule stacks, at the
 * About frame's size (550px of cream from 1280px, content centered), not Home's full-viewport Join
 * band. The gaps are the About frame's: 22px from the title to the paragraph and 61px from the
 * paragraph to the buttons (Home uses 27px and 38px). The band marks itself
 * `data-header-theme="light"`, so the sticky header turns light only while it overlaps the band.
 */
export function AboutCta() {
  return (
    <CtaBand
      id={aboutCta.id}
      title={aboutCta.title}
      description={aboutCta.description}
      descriptionGap="22px"
      actionsGap="61px"
    >
      {aboutCta.actions.map(({ label, href, variant }) => (
        <Button key={label} href={href} variant={variant}>
          {label}
        </Button>
      ))}
    </CtaBand>
  );
}
