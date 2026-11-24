import { cn } from "@/lib/cn";

/**
 * The page's eyebrow: a short blue dash, then the label in the Label/Eyebrow style. The design draws the
 * label in the light text color (unlike the Sponsorship page's blue one). The dash is decorative.
 * Motion (app/motion.css): the dash draws, then the label rises. `enter` plays on first paint (the hero),
 * `reveal` (default) once as the eyebrow scrolls into view.
 */
export function JoinEyebrow({
  children,
  className,
  motion = "reveal",
}: {
  children: string;
  className?: string;
  motion?: "enter" | "reveal";
}) {
  return (
    <p
      className={cn("type-eyebrow flex items-center gap-3 text-ink", className)}
      {...(motion === "enter" ? { "data-enter": "rise" } : { "data-reveal": "" })}
    >
      <span
        aria-hidden="true"
        className="block h-0.5 w-8 bg-blue"
        {...(motion === "enter" ? { "data-enter": "rule", "data-step": 1 } : { "data-reveal": "rule" })}
      />
      {children}
    </p>
  );
}
