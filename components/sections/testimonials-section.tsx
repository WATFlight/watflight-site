"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-background">
      {/* Joby-style "Dream of Flight" section */}
      <div className="px-6 py-24 md:px-12 md:py-32 lg:px-20 lg:py-40">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-6xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-[9vw] leading-[0.95]">
            The sky was<br />never the limit.
          </h2>
        </div>
      </div>
    </section>
  );
}
