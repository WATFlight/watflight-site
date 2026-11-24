import Image from "next/image";
import { PageContainer } from "@/components/ui/page-container";
import { assetSlots } from "@/content/assets";
import { progress, progressCrops } from "@/content/home";
import { cn } from "@/lib/cn";

const SLOT_WIDTH = 226;

/**
 * Development progress (Home frame): three decorative blueprint crops, a full-width track with
 * three markers overlapping the crops' lower edge, and the stage text underneath.
 *
 * Deviation from the Figma frame, by decision: Figma fills the first marker and 219px of the track
 * in blue to mark a current stage. No current stage may be identified until confirmed, so all
 * markers and the whole track use the neutral #444444 style.
 *
 * From 768px the stages sit in three columns on one track. Below that they become a vertical list
 * with markers on a left rule, and the decorative crops are not rendered.
 */
export function DevelopmentProgress({ className }: { className?: string }) {
  const sourcePath = assetSlots["HOME-PROGRESS"].path;
  const source = assetSlots["HOME-PROGRESS"];

  return (
    <div data-progress="" className={cn("relative", className)}>
      <PageContainer>
        <p
          id="home-progress-label"
          data-reveal=""
          className="type-meta mb-8 text-ink md:absolute md:top-1 md:left-1/2 md:z-10 md:mb-0 md:-translate-x-1/2"
        >
          {progress.label}
        </p>
      </PageContainer>

      {sourcePath ? (
        <PageContainer className="hidden md:block">
          <div
            aria-hidden="true"
            data-reveal="fade"
            className="relative z-0 mx-auto grid h-[212px] max-w-[1196px] grid-cols-[repeat(3,226px)] items-start justify-between"
          >
            {progressCrops.map((crop, index) => (
              <div
                key={index}
                className="relative overflow-hidden"
                style={{ width: SLOT_WIDTH, height: crop.slotHeight, marginTop: crop.offsetTop }}
              >
                <div className="absolute inset-0" style={{ opacity: crop.opacity }}>
                  <Image
                    src={sourcePath}
                    alt=""
                    width={source.width}
                    height={source.height}
                    sizes="690px"
                    style={{
                      position: "absolute",
                      maxWidth: "none",
                      height: "auto",
                      width: `${crop.widthPercent}%`,
                      left: `${crop.leftPercent}%`,
                      top: 0,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      ) : null}

      {/* Track and markers: the 26px markers overlap the crops' lower edge by 27px. */}
      <div
        aria-hidden="true"
        className={cn("relative z-10 hidden h-[26px] md:block", sourcePath && "-mt-[27px]")}
      >
        <div data-draw="x" className="absolute inset-x-0 top-[12px] h-[2px] bg-rule-strong" />
        <PageContainer className="relative">
          <div className="mx-auto grid max-w-[1164px] grid-cols-[repeat(3,162px)] justify-between">
            {progress.stages.map((stage) => (
              <div key={stage.title} data-at="" className="flex justify-center">
                <span data-node="" className="size-[26px] rounded-full border-2 border-rule-strong bg-canvas" />
              </div>
            ))}
          </div>
        </PageContainer>
      </div>

      <PageContainer>
        <ol
          aria-labelledby="home-progress-label"
          className="mx-auto grid max-w-[1164px] gap-8 md:mt-[22px] md:grid-cols-[repeat(3,162px)] md:justify-between md:gap-0"
        >
          {progress.stages.map((stage) => (
            <li
              key={stage.title}
              data-at=""
              className="relative pl-10 before:absolute before:top-8 before:bottom-[-32px] before:left-[12px] before:w-[2px] before:bg-rule-strong last:before:hidden md:pl-0 md:text-center md:before:hidden"
            >
              <span
                aria-hidden="true"
                data-node=""
                className="absolute top-0 left-0 size-[26px] rounded-full border-2 border-rule-strong bg-canvas md:hidden"
              />
              <p className="type-h5 text-ink">{stage.title}</p>
              <p className="type-body-sm text-ink-2">{stage.description}</p>
            </li>
          ))}
        </ol>
      </PageContainer>
    </div>
  );
}
