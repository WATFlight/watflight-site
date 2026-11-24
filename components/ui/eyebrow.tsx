import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = HTMLAttributes<HTMLParagraphElement>;

/** Small uppercase label above a heading: Label/Eyebrow text style in the secondary text color. Extra props (for example motion data attributes) go to the <p>. */
export function Eyebrow({ className, children, ...props }: EyebrowProps) {
  return (
    <p className={cn("type-eyebrow text-ink-2", className)} {...props}>
      {children}
    </p>
  );
}
