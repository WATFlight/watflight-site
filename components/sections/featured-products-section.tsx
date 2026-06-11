"use client";

import { FadeImage } from "@/components/fade-image";

const features = [
  {
    title: "Autonomous Navigation",
    description: "Intelligence",
    image: "https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=1200&q=80",
  },
  {
    title: "Aerospace-Grade Materials",
    description: "Engineering",
    image: "https://images.unsplash.com/photo-1525414731706-45ce11db8c9c?w=1200&q=80",
  },
  {
    title: "Advanced Propulsion",
    description: "Power",
    image: "https://images.unsplash.com/photo-1470922792794-b15b12d20e80?w=1200&q=80",
  },
  {
    title: "Precision Sensor Systems",
    description: "Safety",
    image: "https://images.unsplash.com/photo-1567384029258-b9459c319fcd?w=1200&q=80",
  },
  {
    title: "Modular Power Systems",
    description: "Endurance",
    image: "https://images.unsplash.com/photo-1575830401034-3c4964fec7f1?w=1200&q=80",
  },
  {
    title: "Real-Time Flight Control",
    description: "Control",
    image: "https://images.unsplash.com/photo-1569347553039-e58886c71963?w=1200&q=80",
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="technology" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32 lg:pb-16">
        <div className="max-w-4xl">
          <p className="mb-6 text-xs uppercase tracking-[0.25em] font-mono text-muted-foreground">
            Core Technology
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-10">
            Technology that makes<br />the dream possible.
          </h2>
          {/* Joby-style inline spec highlights */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground border-t pt-8" style={{ borderColor: "var(--border)" }}>
            <span>Vertical take-off and landing</span>
            <span className="text-border">·</span>
            <span>160 km/h top speed</span>
            <span className="text-border">·</span>
            <span>Electric propulsion</span>
            <span className="text-border">·</span>
            <span>Fully autonomous flight</span>
            <span className="text-border">·</span>
            <span>Student-engineered</span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-px px-6 pb-20 md:grid-cols-3 md:px-12 lg:px-20" style={{ background: "var(--border)" }}>
        {features.map((feature) => (
          <div key={feature.title} className="group relative" style={{ background: "var(--background)" }}>
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <FadeImage
                src={feature.image || "/placeholder.svg"}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              {/* Amber corner accent */}
              <div className="absolute top-0 left-0 w-8 h-[2px]" style={{ background: "var(--primary)" }} />
              <div className="absolute top-0 left-0 w-[2px] h-8" style={{ background: "var(--primary)" }} />
            </div>

            {/* Content */}
            <div className="p-6 border-t" style={{ borderColor: "var(--border)" }}>
              <p className="mb-1 text-[10px] uppercase tracking-[0.25em] font-mono" style={{ color: "var(--primary)" }}>
                {feature.description}
              </p>
              <h3 className="text-foreground text-lg font-medium">
                {feature.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
