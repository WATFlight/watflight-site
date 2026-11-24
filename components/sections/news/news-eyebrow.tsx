import { cn } from "@/lib/cn";

/**
 * The page's eyebrow: the label in the Label/Eyebrow style in the light text color, then a short blue rule
 * (decorative), as in the frame. The accent blue is kept to this rule on the page.
 * Motion (app/motion.css): the label rises on first paint, then the rule draws.
 */
export function NewsEyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p data-enter="rise" className={cn("type-eyebrow flex items-center gap-4 text-ink", className)}>
      {children}
      <span aria-hidden="true" data-enter="rule" data-step="1" className="block h-0.5 w-10 bg-blue" />
    </p>
  );
}
