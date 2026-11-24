import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PageContainerProps = {
  as?: "div" | "section" | "article";
  className?: string;
  children: ReactNode;
};

/**
 * Page-width wrapper: 1440px max, with side margins of 20 / 32 / 48 / 64px at the base, md, lg and
 * xl breakpoints. 64px is the Figma page margin at 1440 and 1280.
 */
export function PageContainer({ as: Tag = "div", className, children }: PageContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-12 xl:px-16", className)}>
      {children}
    </Tag>
  );
}
