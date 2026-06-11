"use client";

const specs = [
  { label: "All-Up Weight", value: "1.2 kg" },
  { label: "Top Speed", value: "122 km/h" },
  { label: "Wingspan", value: "800 mm" },
  { label: "Cruise Speed", value: "68 km/h" },
];

export function EditorialSection() {
  return (
    <section id="editorial" className="bg-background">
      {/* Specs — Joby-style headline + big numbers */}
      <div className="px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
        <p className="text-xs uppercase tracking-[0.25em] font-mono text-muted-foreground mb-6">
          Flight Specifications
        </p>
        <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-16">
          The numbers<br />speak for themselves.
        </h2>

        {/* Big stat grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: "var(--border)" }}>
          {specs.map((spec) => (
            <div
              key={spec.label}
              className="px-4 py-8 md:px-8 md:py-10"
              style={{ background: "var(--background)" }}
            >
              <p className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl whitespace-nowrap">
                {spec.value}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                {spec.label}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
