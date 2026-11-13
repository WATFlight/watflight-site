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
export type ButtonVariant = "light" | "dark" | "accent" | "outline" | "join";

const baseClasses =
  "type-button inline-flex items-center justify-center gap-3 rounded-control px-6 transition-colors duration-150 motion-reduce:transition-none";

// Default: a fixed 48px single-line button, as in the Design System.
const singleLineClasses = "h-12 whitespace-nowrap";
// `wrap`: for long labels in narrow containers (for example the project card on a phone). It keeps
// the 48px minimum height but lets the label wrap instead of pushing its container wider than the
// viewport.
const wrappingClasses = "min-h-12 max-w-full py-3 text-center";

const variantClasses: Record<ButtonVariant, string> = {
  // Cream by default; primary blue (#3F7CFF, #050505 text) on hover and keyboard focus; dark blue
  // (#1F4FBF) while pressed. Used by the hero "Join WATFlight", "Explore sponsorship" and the other
  // cream buttons (owner-directed; the Design System draws no hover state).
  light: "bg-ink text-canvas hover:bg-blue focus-visible:bg-blue active:bg-blue-dark active:text-ink",
  dark: "border border-rule-strong bg-surface text-ink hover:bg-surface-2 active:bg-canvas",
  accent: "bg-blue text-canvas hover:bg-blue-light active:bg-blue-dark active:text-ink",
  outline:
    "border border-ink-2 bg-ink text-canvas hover:border-blue-light hover:bg-blue-light active:border-blue-dark active:bg-blue-dark active:text-ink",
  // Header "Join WATFlight" call to action: the dark button (#0F0F0F, 1px #444444 border, cream text)
  // in both header themes, primary blue with #050505 text on hover and keyboard focus, #1F4FBF while
  // pressed. #050505 on #3F7CFF is 5.4:1 and #F4F4F0 on #1F4FBF is 6.5:1; the focus ring stays
  // visible (the header recolors it per theme). The label is 15px (the nav is 16px) so the uppercase
  // button balances against the mixed-case navigation; `!` beats the shared type-button size.
  join: "border border-rule-strong bg-surface text-ink text-[0.9375rem]! hover:border-blue hover:bg-blue hover:text-canvas focus-visible:border-blue focus-visible:bg-blue focus-visible:text-canvas active:border-blue-dark active:bg-blue-dark active:text-ink",
};

type CommonProps = {
  variant?: ButtonVariant;
  /** Allow the label to wrap onto several lines. Off by default (single-line, fixed height). */
  wrap?: boolean;
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

export function Button({ variant = "light", wrap = false, className, children, ...props }: ButtonProps) {
  const classes = cn(baseClasses, wrap ? wrappingClasses : singleLineClasses, variantClasses[variant], className);

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
