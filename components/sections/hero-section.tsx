"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const word = "WATFLIGHT";

const sideImages = [
  {
    src: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200&q=80",
    alt: "Quadcopter drone in flight",
    position: "left",
    span: 1,
    objectPosition: "center",
  },
  {
    src: "https://images.unsplash.com/photo-1629731102977-e970387c8464?w=1200&q=80",
    alt: "Hands wiring a drone",
    position: "left",
    span: 1,
    objectPosition: "center",
  },
  {
    src: "https://images.unsplash.com/photo-1731579884331-95c1da04e988?w=1200&q=80",
    alt: "Fixed-wing UAV in flight",
    position: "right",
    span: 1,
    objectPosition: "center",
  },
  {
    src: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=1200&q=80",
    alt: "Aerial drone over landscape",
    position: "right",
    span: 1,
    objectPosition: "center",
  },
];

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrollableHeight = window.innerHeight * 2;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      setScrollProgress(progress);
    };

    const handleScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Text fades out first (0 to 0.2)
  const textOpacity = Math.max(0, 1 - (scrollProgress / 0.2));

  // Image transforms start after text fades (0.2 to 1)
  const imageProgress = Math.max(0, Math.min(1, (scrollProgress - 0.2) / 0.8));

  // Tagline fades in as grid fully forms (0.75 to 1)
  const taglineOpacity = Math.max(0, Math.min(1, (imageProgress - 0.75) / 0.25));
  const taglineY = (1 - taglineOpacity) * 30; // slides up from below
  
  // Smooth interpolations
  const centerWidth = 100 - (imageProgress * 58); // 100% to 42%
  const centerHeight = 100 - (imageProgress * 30); // 100% to 70%
  const sideWidth = imageProgress * 22; // 0% to 22%
  const sideOpacity = imageProgress;
  const sideTranslateLeft = -100 + (imageProgress * 100); // -100% to 0%
  const sideTranslateRight = 100 - (imageProgress * 100); // 100% to 0%
  const borderRadius = imageProgress * 24; // 0px to 24px
  const gap = imageProgress * 16; // 0px to 16px
  
  // Vertical offset for side columns to move them up on mobile
  const sideTranslateY = -(imageProgress * 15); // Move up by 15% when fully expanded

  return (
    <section id="hero" ref={sectionRef} className="relative bg-black">
      {/* Sticky container for scroll animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {/* Bento Grid Container */}
          <div 
            className="relative flex h-full w-full items-stretch justify-center"
            style={{ gap: `${gap}px`, padding: `${imageProgress * 16}px`, paddingBottom: `${60 + (imageProgress * 40)}px` }}
          >
            
            {/* Left Column */}
            <div
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateLeft}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "left").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Main Hero Image - Center */}
            <div
              className="relative overflow-hidden will-change-transform bg-black"
              style={{
                width: `${centerWidth}%`,
                height: `${centerHeight}%`,
                flex: "0 0 auto",
                borderRadius: `${borderRadius}px`,
              }}
            >
              <Image
                src="/images/watflight-logo.png"
                alt="WATFlight logo"
                fill
                className="object-contain p-16 md:p-24 lg:p-32"
                priority
              />
              
              {/* Overlay Text - Fades out first */}
              <div 
                className="absolute inset-0 flex items-end overflow-hidden"
                style={{ opacity: textOpacity }}
              >
                <h1 className="w-full whitespace-nowrap text-[12vw] font-medium leading-[0.8] tracking-tighter text-white md:text-[14vw]">
                  {word.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="inline-block animate-[slideUp_0.8s_ease-out_forwards] opacity-0"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        transition: 'all 1.5s',
                        transitionTimingFunction: 'cubic-bezier(0.86, 0, 0.07, 1)',
                      }}
                    >
                      {letter}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Right Column */}
            <div
              className="flex flex-col will-change-transform"
              style={{
                width: `${sideWidth}%`,
                gap: `${gap}px`,
                transform: `translateX(${sideTranslateRight}%) translateY(${sideTranslateY}%)`,
                opacity: sideOpacity,
              }}
            >
              {sideImages.filter(img => img.position === "right").map((img, idx) => (
                <div 
                  key={idx} 
                  className="relative overflow-hidden will-change-transform"
                  style={{
                    flex: img.span,
                    borderRadius: `${borderRadius}px`,
                  }}
                >
                  <Image
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    style={{ objectPosition: img.objectPosition }}
                  />
                </div>
              ))}
            </div>

          </div>

          {/* Tagline — fades in as bento grid forms */}
          <div
            className="absolute bottom-8 left-0 w-full text-center pointer-events-none"
            style={{ opacity: taglineOpacity, transform: `translateY(${taglineY}px)` }}
          >
            <h2 className="text-[9vw] font-semibold leading-none tracking-tight text-white md:text-[7vw]">
              Built by students.
            </h2>
            <h2 className="text-[9vw] font-semibold leading-none tracking-tight text-white/60 md:text-[7vw]">
              Cleared for flight.
            </h2>
          </div>
        </div>
      </div>

      {/* Scroll space to enable animation */}
      <div className="h-[200vh]" />
    </section>
  );
}
