import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  className?: string;
  children: ReactNode;
};

/** Small uppercase label above a heading: Label/Eyebrow text style in the secondary text color. */
export function Eyebrow({ className, children }: EyebrowProps) {
  return <p className={cn("type-eyebrow text-ink-2", className)}>{children}</p>;
}
