"use client";

import Link from "next/link";

const competitions = [
  {
    id: "01",
    name: "SUAS Competition",
    organizer: "RoboNation",
    date: "Sep 14–17, 2026",
    location: "Tulsa, Oklahoma",
    description:
      "The Student Unmanned Aerial Systems Competition challenges teams to design, build, and fly fully autonomous drones. WATFlight will compete in autonomous navigation, obstacle avoidance, object detection, and payload delivery — putting our engineering to the test against top university teams.",
    tags: ["Autonomous Flight", "Obstacle Avoidance", "Payload Delivery"],
    href: "https://suas-competition.org/",
  },
  {
    id: "02",
    name: "Fly Your Ideas",
    organizer: "Airbus",
    date: "Finals June 25, 2026",
    location: "Remote · Farnborough Airshow",
    description:
      "Airbus's global student innovation challenge asks teams to tackle real aerospace industry problems. The 2026 theme focuses on innovative digital technologies to secure tomorrow's connected aerospace systems. Finalists earn guaranteed Airbus internships and pitch live to industry leaders.",
    tags: ["Innovation", "Digital Technology", "Aerospace Security"],
    href: "https://www.airbus.com/en/flyyourideas",
  },
];

export function CompetitionsSection() {
  return (
    <section id="competitions" className="bg-background px-6 pt-0 pb-20 md:px-12 md:pt-0 md:pb-28 lg:px-20 lg:pt-0 lg:pb-36">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.25em] font-mono text-muted-foreground mb-6">
            Where We Compete
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl max-w-2xl">
            Competing on the world stage.
          </h2>
        </div>

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
