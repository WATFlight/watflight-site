import { PageContainer } from "@/components/ui/page-container";
import { cn } from "@/lib/cn";
import { sponsorshipContact } from "@/content/sponsorship";
import { ContactForm } from "@/components/sections/sponsorship/contact-form";
import { h2Class } from "@/components/sections/sponsorship/styles";

/**
 * Contact (frame 340:771, redesigned after the owner's second visual review and simplified after the third):
 * one continuous section with no line inside it. A full-width introduction on top (the title across the whole
 * space between the grid rails, left-aligned, wrapping naturally; the paragraph directly under it, at most
 * 800px wide), then the whole inquiry form at the full content width. There is no eyebrow, label or divider
 * between the introduction and the form (the internal rule was deleted, not hidden); the two vertical rails
 * run through, and the footer's own top rule closes the section. The section is the target of the page's
 * `#contact` links (the hero button and Home's "Contact us"), so it carries id="contact"; the shell's scroll
 * margin keeps it clear of the sticky header.
 *
 * Spacing: 72px above the title and below the form from 1280px (64px at 768 to 1279px, 56px below), 28px
 * from the title to the paragraph (24px on small screens), and one gap from the paragraph to the first form
 * row: 48px from 1280px, 40px from 768px, 32px below.
 */
export function SponsorshipContact() {
  return (
    <section id={sponsorshipContact.id} aria-labelledby="sponsorship-contact-heading">
      <PageContainer className="pt-14 pb-14 md:pt-16 md:pb-16 xl:pt-[72px] xl:pb-[72px]">
        <h2 id="sponsorship-contact-heading" data-reveal="" className={cn(h2Class, "text-balance text-ink")}>
          {sponsorshipContact.title}
        </h2>
        <p data-reveal="" className="type-body-lg mt-6 max-w-[800px] text-pretty text-ink-2 xl:mt-7">
          {sponsorshipContact.description}
        </p>

        <div data-reveal="" className="mt-8 md:mt-10 xl:mt-12">
          <ContactForm />
        </div>
      </PageContainer>
    </section>
  );
}
