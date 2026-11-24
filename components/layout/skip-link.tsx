/** First focusable element on every page: jumps keyboard users past the header to `#main`. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="type-button sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-skip focus-visible:bg-ink focus-visible:px-4 focus-visible:py-3 focus-visible:text-canvas"
    >
      Skip to main content
    </a>
  );
}
