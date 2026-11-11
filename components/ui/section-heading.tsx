import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/eyebrow";

type HeadingLevel = "h1" | "h2" | "h3";

/** Visual size, named after the Figma text styles. The semantic level is chosen with `as`. */
type HeadingSize = "display-hero" | "display-page" | "h2" | "h3";

const sizeClasses: Record<HeadingSize, string> = {
  "display-hero": "type-display-hero",
  "display-page": "type-display-page",
  h2: "type-h2",
  h3: "type-h3",
};

type SectionHeadingProps = {
  title: ReactNode;
  as?: HeadingLevel;
  size?: HeadingSize;
  eyebrow?: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

/**
 * Heading block: optional eyebrow, a heading element, and an optional description in Body/Large.
 * Each page uses exactly one `h1`; section titles are `h2`, and sub-section titles `h3`.
 */
export function SectionHeading({
  title,
  as: Tag = "h2",
  size = "display-page",
  eyebrow,
  description,
  align = "left",
  id,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    // The default heading color is inherited from the wrapper so `titleClassName` can override it.
    <div className={cn("text-ink", align === "center" && "text-center", className)}>
      {eyebrow ? <Eyebrow className="mb-6">{eyebrow}</Eyebrow> : null}
      <Tag id={id} className={cn(sizeClasses[size], titleClassName)}>
        {title}
      </Tag>
      {description ? (
        <p className={cn("type-body-lg mt-6 max-w-[644px] text-ink-2", align === "center" && "mx-auto", descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
