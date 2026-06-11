"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phantomTranslateY, setPhantomTranslateY] = useState(100);
  const [titleOpacity, setTitleOpacity] = useState(1);
  const rafRef = useRef<number | null>(null);

  const updateTransforms = useCallback(() => {
    if (!sectionRef.current) return;
    
    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = sectionRef.current.offsetHeight;
    
    // Calculate progress based on scroll position
    const scrollableRange = sectionHeight - windowHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableRange));
    
    // Phantom rises from bottom (100% to 0%)
    setPhantomTranslateY((1 - progress) * 100);
    
    // Title fades out as block comes up
    setTitleOpacity(1 - progress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Use requestAnimationFrame for smooth updates
      rafRef.current = requestAnimationFrame(updateTransforms);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateTransforms();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateTransforms]);

  return (
    <section id="products" className="bg-background">
      {/* Scroll-Animated Product Grid */}
      <div ref={sectionRef} className="relative" style={{ height: "200vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <div className="relative w-full">
            {/* Title - positioned behind the blocks */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              style={{ opacity: titleOpacity }}
            >
              <h2 className="text-[12vw] font-medium leading-[0.95] tracking-tighter text-foreground md:text-[10vw] lg:text-[8vw] text-center px-6">
                Our First Project.
              </h2>
            </div>

            {/* Product Grid */}
            <div className="relative z-10 flex items-center justify-center px-6 md:px-12 lg:px-20">
              {/* Phantom Image - single centered product */}
              <div 
                className="relative aspect-[4/3] w-full max-w-3xl overflow-hidden rounded-2xl"
                style={{
                  transform: `translate3d(0, ${phantomTranslateY}%, 0)`,
                  WebkitTransform: `translate3d(0, ${phantomTranslateY}%, 0)`,
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  opacity: 1 - (phantomTranslateY / 100),
                }}
              >
                <Image
                  src="/images/miniflight-evtol.png"
                  alt="WATFlight MiniFlight EVTOL"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6">
                  <span className="backdrop-blur-md px-4 py-2 text-sm font-mono font-medium rounded-full text-white" style={{ background: "oklch(0.78 0.14 75 / 0.25)", border: "1px solid oklch(0.78 0.14 75 / 0.4)" }}>
                    MiniFlight EVTOL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36 lg:pb-14">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-[0.25em] font-mono text-muted-foreground mb-6">
            Our First Aircraft
          </p>
          <h3 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-8">
            Nowhere to go<br />but up.
          </h3>
          <p className="text-lg leading-relaxed text-muted-foreground max-w-2xl">
            MiniFlight EVTOL is WATFlight&apos;s first autonomous aircraft — vertical take-off,
            electric propulsion, and student-engineered from the ground up at the University of Waterloo.
          </p>
        </div>
      </div>
    </section>
  );
}
