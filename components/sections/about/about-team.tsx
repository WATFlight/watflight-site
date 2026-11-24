import { PageContainer } from "@/components/ui/page-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { team } from "@/content/about";

/**
 * Meet the team (frame 262:80), anchor `#leadership` (target of Home's "Explore our teams").
 *
 * Four members: 289x255 portrait frames with a 1px #444444 border, then the name (Std Wide 28/36),
 * a 45px #1F4FBF accent rule and the role (Geist Medium 18/26, #969690), 19px, 10px and 9px apart as
 * in the frame. The portrait frames are empty in the approved comp and stay empty on purpose: they
 * are decorative (`aria-hidden`), so they announce nothing, and no legacy portrait is reused.
 *
 * Grid: four columns from 1024px (53px gaps from 1280px, 24px below), two from 768px, one below.
 * `scroll-mt` leaves 48px of air above the heading when the anchor is followed.
 */
export function AboutTeam() {
  return (
    <section
      id={team.id}
      aria-labelledby="about-team-heading"
      className="scroll-mt-[calc(var(--header-height)+48px)]"
    >
      <PageContainer className="pb-16 md:pb-20 xl:pb-[82px]">
        <SectionHeading id="about-team-heading" title={team.title} />
        <ul
          role="list"
          className="mt-8 grid gap-x-6 gap-y-12 md:mt-10 md:grid-cols-2 lg:grid-cols-4 xl:mt-[42px] xl:gap-x-[53px]"
        >
          {team.members.map((member) => (
            <li key={member.name} data-reveal="">
              <article>
                {/* 288.5:255, the mean of the frame's 289 and 288px wide cards, all 255px tall at 1440px. */}
                <div aria-hidden="true" className="aspect-[288.5/255] border border-rule-strong" />
                <h3 className="type-h3 mt-[19px] text-ink">{member.name}</h3>
                <span aria-hidden="true" className="mt-2.5 block h-px w-[45px] bg-blue-dark" />
                <p className="type-h5 mt-[9px] text-ink-2">{member.role}</p>
              </article>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
