import { cn } from "@/lib/cn";

/**
 * The page's eyebrow: the label in the Label/Eyebrow style in the light text color, then a short blue rule
 * (decorative), as in the frame. The accent blue is kept to this rule on the page.
 */
export function NewsEyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn("type-eyebrow flex items-center gap-4 text-ink", className)}>
      {children}
      <span aria-hidden="true" className="block h-0.5 w-10 bg-blue" />
    </p>
  );
}
