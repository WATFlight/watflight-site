import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Design System button variants (frame 77:2):
 * - light:   #F4F4F0 fill, #050505 text
 * - dark:    #0F0F0F fill, 1px #444444 border, #F4F4F0 text
 * - accent:  #3F7CFF fill, #050505 text
 * - outline: the unnamed fourth variant, #F4F4F0 fill with a 1px #969690 border
 * All are 48px high with 24px side padding, a 2px radius and the UI/Button text style.
 *
 * Hover (light blue) and pressed (dark blue) states follow the Design System color roles; the
 * Design System frame does not draw those states, so they are derived and need visual review.
 */
export type ButtonVariant = "light" | "dark" | "accent" | "outline";

const baseClasses =
  "type-button inline-flex h-12 items-center justify-center gap-3 rounded-control px-6 whitespace-nowrap transition-colors duration-150 motion-reduce:transition-none";

const variantClasses: Record<ButtonVariant, string> = {
  light: "bg-ink text-canvas hover:bg-blue-light active:bg-blue-dark active:text-ink",
  dark: "border border-rule-strong bg-surface text-ink hover:bg-surface-2 active:bg-canvas",
  accent: "bg-blue text-canvas hover:bg-blue-light active:bg-blue-dark active:text-ink",
  outline:
    "border border-ink-2 bg-ink text-canvas hover:border-blue-light hover:bg-blue-light active:border-blue-dark active:bg-blue-dark active:text-ink",
};

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type AnchorButtonProps = CommonProps & {
  href: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

type NativeButtonProps = CommonProps & {
  href?: undefined;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

export function Button({ variant = "light", className, children, ...props }: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (props.href !== undefined) {
    const { href, ...anchorProps } = props;
    // Internal routes and in-page anchors use next/link; mailto:, tel: and external URLs use <a>.
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
