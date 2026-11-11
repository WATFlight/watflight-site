import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type TextLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

/**
 * Blue label link with a rule underneath ("MORE ABOUT US", "LEARN MORE" in the comps):
 * Label/Metadata text style in #3F7CFF. Hover uses the light blue, pressed the dark blue.
 */
export function TextLink({ href, className, children, ...props }: TextLinkProps) {
  const classes = cn(
    "type-meta inline-block border-b-2 border-blue pb-0.5 text-blue transition-colors duration-150 motion-reduce:transition-none",
    "hover:border-blue-light hover:text-blue-light active:border-blue-dark active:text-blue-dark",
    className,
  );

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
