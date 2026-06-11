"use client";

import { FadeImage } from "@/components/fade-image";

const accessories = [
  {
    id: 1,
    name: "Pro Racing Controller",
    description: "Precision joysticks with haptic feedback",
    price: "$349",
    image: "https://images.unsplash.com/photo-1594818379709-c56870d59424?w=800&q=80",
  },
  {
    id: 2,
    name: "FPV Racing Goggles",
    description: "4K OLED display with head tracking",
    price: "$599",
    image: "https://images.unsplash.com/photo-1651188509800-7e5c2d7197bb?w=800&q=80",
  },
  {
    id: 3,
    name: "Carbon Fiber Propeller Set",
    description: "Ultra-balanced racing propellers",
    price: "$89",
    image: "https://images.unsplash.com/photo-1667686325725-1a1b2078bb0b?w=800&q=80",
  },
  {
    id: 4,
    name: "High-Capacity Battery Pack",
    description: "Extended flight time with quick charging",
    price: "$199",
    image: "https://images.unsplash.com/photo-1671178424718-f076fd8988b1?w=800&q=80",
  },
  {
    id: 5,
    name: "Professional Carry Case",
    description: "Hard shell protection with custom foam",
    price: "$249",
    image: "https://images.unsplash.com/photo-1614686028671-6a76a69c7925?w=800&q=80",
  },
  {
    id: 6,
    name: "Illuminated Landing Pad",
    description: "Portable pad with LED markers",
    price: "$79",
    image: "https://images.unsplash.com/photo-1727600950764-9d1c729ac94e?w=800&q=80",
  },
];

export function CollectionSection() {
  return (
    <section id="accessories" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Racing Accessories
        </h2>
      </div>

      {/* Accessories Grid/Carousel */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="group flex-shrink-0 w-[75vw] snap-center">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {accessory.description}
                    </p>
                  </div>
                  <span className="text-lg font-medium text-foreground">
                    {accessory.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {accessories.map((accessory) => (
            <div key={accessory.id} className="group">
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {accessory.description}
                    </p>
                  </div>
                  <span className="font-medium text-foreground text-2xl">
                    {accessory.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
