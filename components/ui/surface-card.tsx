import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SurfaceCardProps = {
  as?: "div" | "article" | "section" | "li";
  /** `default` uses the #2B2B2B rule color; `strong` uses #444444 (About / Current Project cards). */
  border?: "default" | "strong";
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "className" | "children">;

/** Raised card: #0F0F0F surface with a 1px border and square corners. Padding is set by the caller. Extra props (for example motion data attributes) go to the element. */
export function SurfaceCard({ as: Tag = "div", border = "default", className, children, ...props }: SurfaceCardProps) {
  return (
    <Tag className={cn("border bg-surface", border === "strong" ? "border-rule-strong" : "border-rule", className)} {...props}>
      {children}
    </Tag>
  );
}
