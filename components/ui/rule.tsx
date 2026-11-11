import { cn } from "@/lib/cn";

type RuleProps = {
  orientation?: "horizontal" | "vertical";
  className?: string;
};

/** Decorative 1px rule in the Design System grid/border color (#2B2B2B). */
export function Rule({ orientation = "horizontal", className }: RuleProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(orientation === "horizontal" ? "h-px w-full" : "h-full w-px", "bg-rule", className)}
    />
  );
}
