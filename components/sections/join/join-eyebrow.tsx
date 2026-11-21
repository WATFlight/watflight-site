import { cn } from "@/lib/cn";

/**
 * The page's eyebrow: a short blue dash, then the label in the Label/Eyebrow style. The design draws the
 * label in the light text color (unlike the Sponsorship page's blue one). The dash is decorative.
 */
export function JoinEyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn("type-eyebrow flex items-center gap-3 text-ink", className)}>
      <span aria-hidden="true" className="block h-0.5 w-8 bg-blue" />
      {children}
    </p>
  );
}
