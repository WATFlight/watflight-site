import Image from "next/image";
import { PageContainer } from "@/components/ui/page-container";
import { Rule } from "@/components/ui/rule";
import { SectionHeading } from "@/components/ui/section-heading";
import type { FacultyAdvisor } from "@/content/about";

type FacultyAdvisoryProps = {
  title: string;
  advisors: readonly FacultyAdvisor[];
};

/**
 * Faculty advisory (frame 262:80). LAUNCH BLOCKER: the frame shows "Dr. John Doe" and "Dr. Jane Doe",
 * which are placeholders, so `content/about.ts` keeps the advisor list empty and this section renders
 * nothing (no heading, no rule, no empty box) until real advisors are added. See docs/rebuild-notes.md.
 *
 * Structure, once there are advisors: a full-width rule, the h2 (Std Wide 36/44), then a list of
 * cards (#0F0F0F, 1px #444444 border) each with an 83px portrait frame (`#2B2B2B` fill and a 1px
 * #969690 border, decorative unless a portrait with alt text is supplied), a 76px #2B2B2B divider,
 * the name (Std Wide 22/30), the department and the institution (Geist 16/25, #969690). Two columns
 * from 1024px, one below. The clipped duplicate "Mechanical" text that sits off-canvas inside the
 * frame's first card is not carried over.
 */
export function FacultyAdvisory({ title, advisors }: FacultyAdvisoryProps) {
  if (advisors.length === 0) return null;

  return (
    <section aria-labelledby="about-faculty-heading">
      <Rule />
      <PageContainer className="pt-9 pb-20 md:pb-24 xl:pb-[134px]">
        <SectionHeading as="h2" size="h2" id="about-faculty-heading" title={title} />
        <ul role="list" className="mt-8 grid gap-6 lg:grid-cols-2 xl:mt-[54px] xl:gap-x-[51px]">
          {advisors.map((advisor) => (
            <li key={advisor.name} className="flex">
              <article className="flex min-h-[124px] w-full items-stretch gap-5 border border-rule-strong bg-surface p-[19px] pl-[23px] sm:gap-[29px]">
                <div className="relative size-[83px] shrink-0 self-start border border-ink-2 bg-rule">
                  {advisor.image ? (
                    <Image
                      src={advisor.image.src}
                      alt={advisor.image.alt}
                      fill
                      sizes="83px"
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div aria-hidden="true" className="my-1 w-px shrink-0 bg-rule" />
                <div className="min-w-0 self-center">
                  <h3 className="type-h4 text-ink">{advisor.name}</h3>
                  <p className="type-body mt-1 text-ink-2">{advisor.department}</p>
                  <p className="type-body text-ink-2">{advisor.institution}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
