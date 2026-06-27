import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { competitions } from "@/content/site-content";

export function CompetitionsSection() {
  return (
    <section id="competitions" className="bg-background px-6 pt-0 pb-20 md:px-12 md:pt-0 lg:px-20 lg:pt-0">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Where We Compete"
          title="Competing on the world stage."
          className="mb-16"
        />

        {/* Competition Cards */}
        <div className="space-y-px border-t border-border">
          {competitions.map((comp) => (
            <div
              key={comp.id}
              className="group border-b border-border py-10 md:py-14"
            >
              <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
                {/* Index + organizer */}
                <div className="md:col-span-3">
                  <span className="text-xs font-mono text-muted-foreground">{comp.id}</span>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] font-mono text-muted-foreground">
                    {comp.organizer}
                  </p>
                </div>

                {/* Main content */}
                <div className="md:col-span-6">
                  <h3 className="text-2xl font-semibold text-foreground mb-3 md:text-3xl">
                    {comp.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground mb-6 max-w-prose">
                    {comp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {comp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 rounded-full border border-border text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Date + location + link */}
                <div className="md:col-span-3 flex flex-col justify-between md:items-end">
                  <div className="md:text-right">
                    <p className="text-sm text-foreground font-medium">{comp.date}</p>
                    <p className="text-xs text-muted-foreground mt-1">{comp.location}</p>
                  </div>
                  <Link
                    href={comp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground md:mt-0"
                  >
                    Learn more
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
