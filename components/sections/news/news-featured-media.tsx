"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export type FeaturedSlide = { src: string | null; alt: string };

type NewsFeaturedMediaProps = {
  slides: FeaturedSlide[];
  /** Intrinsic size of the pictures (they share one aspect ratio; the first slot's size is used). */
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  className?: string;
};

// The frame's corner marks and overlay gridline are interface decoration, so they are rebuilt here in CSS
// (never baked into the pictures, which are cropped inside them) and hidden from assistive technology.
const bracket = "pointer-events-none absolute size-5 border-ink/45 md:size-[26px]";

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "left" ? <path d="M16 10H4m5-5-5 5 5 5" /> : <path d="M4 10h12m-5-5 5 5-5 5" />}
    </svg>
  );
}

const controlClass =
  "inline-flex size-12 items-center justify-center border border-rule-strong text-ink transition-colors duration-150 hover:border-blue hover:text-blue-light disabled:cursor-not-allowed disabled:text-ink-2/50 disabled:hover:border-rule-strong disabled:hover:text-ink-2/50 motion-reduce:transition-none";

/**
 * Featured picture frame, ready for several slides. With ONE slide (all that is approved today) it is just the
 * framed picture: no counter, no arrows, nothing that suggests more. With two or more it adds a counter
 * ("01 / 04", announced politely) and previous/next buttons that are real buttons with clear labels and a
 * disabled state at each end. It never advances by itself (no autoplay) and shows one slide at a time.
 */
export function NewsFeaturedMedia({ slides, width, height, sizes, priority = false, className }: NewsFeaturedMediaProps) {
  const [index, setIndex] = useState(0);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const total = slides.length;
  const multiple = total > 1;
  const slide = slides[Math.min(index, total - 1)];

  const frame = (
    <div className="relative overflow-hidden border border-rule bg-surface" style={{ aspectRatio: `${width} / ${height}` }}>
      {slide?.src ? (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes={sizes}
          priority={priority && index === 0}
          className="object-cover"
        />
      ) : null}
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[51%] w-px bg-ink/10" />
      <span aria-hidden="true" className={cn(bracket, "top-3 left-3 border-t-[1.5px] border-l-[1.5px] md:top-[18px] md:left-[18px]")} />
      <span aria-hidden="true" className={cn(bracket, "top-3 right-3 border-t-[1.5px] border-r-[1.5px] md:top-[18px] md:right-[18px]")} />
      <span aria-hidden="true" className={cn(bracket, "bottom-3 left-3 border-b-[1.5px] border-l-[1.5px] md:bottom-[18px] md:left-[18px]")} />
      <span aria-hidden="true" className={cn(bracket, "right-3 bottom-3 border-r-[1.5px] border-b-[1.5px] md:right-[18px] md:bottom-[18px]")} />
    </div>
  );

  if (!multiple) return <div className={className}>{frame}</div>;

  return (
    <div className={className} role="group" aria-roledescription="carousel" aria-label="Featured story pictures">
      <div role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${total}`}>
        {frame}
      </div>
      <div className="mt-6 flex items-center justify-end gap-6">
        <p aria-live="polite" aria-atomic="true" className="type-meta tabular-nums tracking-[0.2em] text-ink">
          {String(index + 1).padStart(2, "0")} <span className="px-2 text-ink-2">/</span> {String(total).padStart(2, "0")}
        </p>
        <div className="flex">
          <button
            type="button"
            ref={prevRef}
            className={controlClass}
            aria-label="Previous picture"
            disabled={index === 0}
            onClick={() => {
              setIndex(Math.max(0, index - 1));
              // A button that just became disabled cannot keep keyboard focus, so hand it to the other one.
              if (index - 1 <= 0) nextRef.current?.focus();
            }}
          >
            <Arrow direction="left" />
          </button>
          <button
            type="button"
            ref={nextRef}
            className={cn(controlClass, "-ml-px")}
            aria-label="Next picture"
            disabled={index === total - 1}
            onClick={() => {
              setIndex(Math.min(total - 1, index + 1));
              if (index + 1 >= total - 1) prevRef.current?.focus();
            }}
          >
            <Arrow direction="right" />
          </button>
        </div>
      </div>
    </div>
  );
}
