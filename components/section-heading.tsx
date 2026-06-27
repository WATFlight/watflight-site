import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  descriptionClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
  descriptionClassName = "max-w-2xl",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {eyebrow}
      </p>
      <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description ? (
        <div className={`mt-6 text-lg leading-relaxed text-muted-foreground ${descriptionClassName}`}>
          {description}
        </div>
      ) : null}
    </div>
  );
}
