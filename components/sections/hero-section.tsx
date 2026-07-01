"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { subscribeToScroll } from "@/lib/scroll-store";

const word = "WATFLIGHT";

const sideImages = [
  {
    src: "/images/saf-green-flight.webp",
    alt: "Aircraft powered by sustainable aviation fuel",
    position: "left",
    objectPosition: "100% 42%",
  },
  {
    src: "/images/pillar-environmental.avif",
    alt: "Environmental sustainability in aviation",
    position: "left",
    objectPosition: "center",
  },
  {
    src: "/images/pillar-economic.avif",
    alt: "Economic sustainability in aviation",
    position: "right",
    objectPosition: "center",
  },
  {
    src: "/images/pillar-social.avif",
    alt: "Social sustainability in aviation",
    position: "right",
    objectPosition: "center",
  },
] as const;

const leftImages = sideImages.filter((image) => image.position === "left");
const rightImages = sideImages.filter((image) => image.position === "right");
type SideImage = (typeof sideImages)[number];

const initialHeroStyle = {
  "--hero-gap": "0px",
  "--hero-padding-top": "0px",
  "--hero-padding-side": "0px",
  "--hero-padding-bottom": "0px",
  "--hero-side-width": "0%",
  "--hero-side-opacity": "0",
  "--hero-left-x": "-100%",
  "--hero-right-x": "100%",
  "--hero-center-width": "100%",
  "--hero-center-height": "100%",
  "--hero-radius": "0px",
  "--hero-text-opacity": "1",
  "--hero-tagline-opacity": "0",
  "--hero-tagline-y": "30px",
} as CSSProperties;

function applyHeroProgress(section: HTMLElement, scrollProgress: number) {
  const textOpacity = Math.max(0, 1 - scrollProgress / 0.2);
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));
  const taglineOpacity = Math.max(0, Math.min(1, (imageProgress - 0.75) / 0.25));

  section.style.setProperty("--hero-gap", `${imageProgress * 16}px`);
  section.style.setProperty("--hero-padding-top", `${imageProgress * 96}px`);
  section.style.setProperty("--hero-padding-side", `${imageProgress * 16}px`);
  section.style.setProperty("--hero-padding-bottom", `${imageProgress * 100}px`);
  section.style.setProperty("--hero-side-width", `${imageProgress * 22}%`);
  section.style.setProperty("--hero-side-opacity", `${imageProgress}`);
  section.style.setProperty("--hero-left-x", `${-100 + imageProgress * 100}%`);
  section.style.setProperty("--hero-right-x", `${100 - imageProgress * 100}%`);
  section.style.setProperty("--hero-center-width", `${100 - imageProgress * 58}%`);
  section.style.setProperty("--hero-center-height", `${100 - imageProgress * 30}%`);
  section.style.setProperty("--hero-radius", `${imageProgress * 24}px`);
  section.style.setProperty("--hero-text-opacity", `${textOpacity}`);
  section.style.setProperty("--hero-tagline-opacity", `${taglineOpacity}`);
  section.style.setProperty("--hero-tagline-y", `${(1 - taglineOpacity) * 30}px`);
}

function SideColumn({ images, side }: { images: readonly SideImage[]; side: "left" | "right" }) {
  return (
    <div
      className="flex flex-col will-change-transform"
      style={{
        width: "var(--hero-side-width)",
        gap: "var(--hero-gap)",
        opacity: "var(--hero-side-opacity)",
        transform: `translateX(var(--hero-${side}-x))`,
      }}
    >
      {images.map((image) => (
        <div
          key={image.src}
          className="relative flex-1 overflow-hidden"
          style={{ borderRadius: "var(--hero-radius)" }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="22vw"
            className="object-cover"
            style={{ objectPosition: image.objectPosition }}
          />
        </div>
      ))}
    </div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sectionTop = section.offsetTop;
    let lastViewportHeight = 0;

    return subscribeToScroll(({ scrollY, viewportHeight }) => {
      if (lastViewportHeight !== viewportHeight) {
        lastViewportHeight = viewportHeight;
        sectionTop = section.offsetTop;
      }

      if (reducedMotion.matches) {
        applyHeroProgress(section, 1);
        return;
      }

      const scrollableHeight = viewportHeight * 2;
      const scrolled = scrollY - sectionTop;
      const progress = scrollableHeight > 0
        ? Math.max(0, Math.min(1, scrolled / scrollableHeight))
        : 0;
      applyHeroProgress(section, progress);
    });
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hero-section relative bg-black"
      style={initialHeroStyle}
    >
      <div className="hero-sticky sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="relative flex h-full w-full items-stretch justify-center"
            style={{
              gap: "var(--hero-gap)",
              paddingTop: "var(--hero-padding-top)",
              paddingRight: "var(--hero-padding-side)",
              paddingBottom: "var(--hero-padding-bottom)",
              paddingLeft: "var(--hero-padding-side)",
            }}
          >
            <SideColumn images={leftImages} side="left" />

            <div
              className="relative flex-none overflow-hidden bg-black"
              style={{
                width: "var(--hero-center-width)",
                height: "var(--hero-center-height)",
                borderRadius: "var(--hero-radius)",
              }}
            >
              <Image
                src="/images/watflight-logo.png"
                alt="WATFlight logo"
                fill
                sizes="100vw"
                className="hero-logo-image object-contain p-6 sm:p-12 md:p-24 lg:p-32"
                priority
              />

              <div
                className="absolute inset-0 flex items-end pb-0 overflow-hidden"
                style={{ opacity: "var(--hero-text-opacity)" }}
              >
                <h1 className="w-full whitespace-nowrap text-center text-[16vw] font-medium leading-[0.8] tracking-tighter text-white lg:text-[13vw]">
                  {word.split("").map((letter, index) => (
                    <span
                      key={`${letter}-${index}`}
                      className="hero-letter inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{ animationDelay: `${index * 0.08}s` }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            <SideColumn images={rightImages} side="right" />
          </div>

          <div
            className="pointer-events-none absolute bottom-6 md:bottom-8 left-0 w-full text-center"
            style={{
              opacity: "var(--hero-tagline-opacity)",
              transform: "translateY(var(--hero-tagline-y))",
            }}
          >
            <h2 className="hero-slogan-text text-[9vw] font-semibold leading-[1.1] tracking-tight text-white md:text-[7vw]">
              Built by students.
            </h2>
            <h2 className="hero-slogan-text-dim text-[9vw] font-semibold leading-[1.1] tracking-tight text-white/60 md:text-[7vw]">
              Cleared for flight.
            </h2>
          </div>
        </div>
      </div>

      <div className="hero-scroll-space h-[235vh]" />
    </section>
  );
}
