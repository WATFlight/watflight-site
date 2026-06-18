"use client";

import { useState, useEffect } from "react";
import { navigateToSection } from "@/lib/smooth-scroll";

const sections = [
  { id: "hero", label: "Home" },
  { id: "products", label: "MiniFlight EVTOL" },
  { id: "technology", label: "Technology" },
  { id: "editorial", label: "Specs" },
  { id: "testimonials", label: "Vision" },
  { id: "team", label: "Team" },
];

export function ProgressionNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollProgress);

      // Determine active section based on scroll position
      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    const handleScroll = () => {
      if (rafId === null) rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update(); // Initial check
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToSection = (id: string) => {
    navigateToSection(id);
  };

  // Calculate which dot should be filled based on progress
  const getProgressForDot = (index: number) => {
    const segmentProgress = 100 / (sections.length - 1);
    const dotProgress = index * segmentProgress;
    return progress >= dotProgress;
  };

  return (
    <nav
      className="hidden md:flex fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center"
      aria-label="Page navigation"
    >
      {/* Container for the vertical line and dots */}
      <div className="relative flex flex-col items-center gap-6 py-4">
        {/* Progress bar background */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-px" style={{ background: "oklch(0.78 0.14 75 / 0.2)" }} />

        {/* Progress bar fill — amber */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-4 w-px transition-all duration-150 origin-top"
          style={{ height: `${progress}%`, maxHeight: 'calc(100% - 32px)', background: "oklch(0.78 0.14 75)" }}
        />

        {/* Section buttons */}
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group relative flex items-center justify-center z-10"
            aria-label={`Go to ${section.label}`}
            aria-current={activeSection === section.id ? "true" : undefined}
          >
            {/* Dot indicator */}
            <span
              className="relative w-2.5 h-2.5 rounded-full border-2 transition-all duration-300"
              style={
                activeSection === section.id
                  ? { background: "oklch(0.78 0.14 75)", borderColor: "oklch(0.78 0.14 75)", transform: "scale(1.2)" }
                  : getProgressForDot(index)
                  ? { background: "oklch(0.78 0.14 75 / 0.5)", borderColor: "oklch(0.78 0.14 75 / 0.5)" }
                  : { background: "transparent", borderColor: "oklch(0.78 0.14 75 / 0.25)" }
              }
            />

            {/* Label tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 text-xs font-mono text-foreground backdrop-blur-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none" style={{ background: "oklch(0.10 0.015 250 / 0.9)", border: "1px solid var(--border)" }}>
              {section.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
}
