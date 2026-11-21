import { PageContainer } from "@/components/ui/page-container";
import { cn } from "@/lib/cn";
import { JoinEyebrow } from "@/components/sections/join/join-eyebrow";
import { JoinFramedPhoto } from "@/components/sections/join/join-framed-photo";
import { SubteamGlyph } from "@/components/sections/join/join-icons";
import { cardTitleClass, sectionTitleClass } from "@/components/sections/join/styles";
import { joinSubteams } from "@/content/join";

/**
 * Subteams (frame 344:1128, 1440px reference): the eyebrow and title at the left of one row and a short
 * paragraph at the right (from 1280px; stacked below), then three entries. Each entry is an `article`
 * in a list: its own picture in a grey corner-bracket frame (5:3), a line icon, an `h3`, a description and a bulleted
 * `ul`. From 1280px the entries are three equal columns 52px apart with a 1px #2B2B2B separator centered in
 * each gap, running the entry's full height (as in the frame). Below 1280px they stack without separators:
 * from 768px each row has the picture at the left and the text at the right (so a tablet does not show one
 * picture and a wide empty band per entry), and on a phone the picture sits over the text. The icons
 * are decorative and drawn in code; the
 * pictures are illustrative AI-generated images (see the notes). The section is the target of the hero's
 * "LEARN MORE" button, so it carries id="subteams".
 */
export function JoinSubteams() {
  return (
    <section id={joinSubteams.id} aria-labelledby="join-subteams-heading">
      <PageContainer className="py-14 md:py-20 xl:pt-[68px] xl:pb-[43px]">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between xl:gap-12">
          <div>
            <JoinEyebrow>{joinSubteams.eyebrow}</JoinEyebrow>
            <h2 id="join-subteams-heading" className={cn(sectionTitleClass, "mt-4 text-ink")}>
              {joinSubteams.title}
            </h2>
          </div>
          <p className="type-body max-w-[460px] text-ink-2 xl:max-w-[384px]">{joinSubteams.description}</p>
        </div>

        <ul role="list" className="mt-10 grid gap-14 md:mt-12 md:gap-16 xl:mt-[73px] xl:grid-cols-3 xl:gap-x-[52px] xl:gap-y-0">
          {joinSubteams.teams.map((team, index) => (
            <li
              key={team.name}
              className={cn(
                "relative",
                // From 1280px a separator sits in the middle of the 52px gap, left of every entry but the first.
                index > 0 &&
                  "xl:before:absolute xl:before:inset-y-0 xl:before:-left-[26px] xl:before:w-px xl:before:bg-rule xl:before:content-['']",
              )}
            >
              {/* Phones: picture over text. 768px to 1279px: picture at the left, text at the right. From 1280px: a column. */}
              <article className="md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-start md:gap-x-10 xl:block xl:pb-6">
                <JoinFramedPhoto
                  slot={team.image.slot}
                  alt={team.image.alt}
                  sizes="(min-width: 1440px) 403px, (min-width: 1280px) 350px, (min-width: 768px) 42vw, 100vw"
                  frame="sm"
                  tone="neutral"
                />
                <div>
                  {/* Every icon sits in the same 40px-tall box so the three names line up across the columns. */}
                  <div className="mt-8 flex h-10 items-center md:mt-0 xl:mt-9">
                    <SubteamGlyph name={team.icon} className="text-ink" />
                  </div>
                  <h3 className={cn(cardTitleClass, "mt-5 text-ink md:mt-4 xl:mt-6")}>{team.name}</h3>
                  <p className="type-body-lg mt-3.5 max-w-[400px] text-ink-2">{team.description}</p>
                  <ul role="list" className="mt-9 space-y-[7px] md:mt-7 xl:mt-10">
                    {team.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="type-body-lg relative pl-10 text-ink-2 before:absolute before:top-[0.8em] before:left-0 before:h-0.5 before:w-5 before:bg-ink-2 before:content-[''] xl:pl-[42px]"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
