"use client";

import Link from "next/link";
import Image from "next/image";

const tiers = [
  {
    rank: "Captain",
    price: "$2,000+",
    badge: "★",
    color: "oklch(0.78 0.14 75)",
    borderColor: "oklch(0.78 0.14 75 / 0.5)",
    perks: [
      "Large logo on ALL aircraft made by WATFlight",
      "Logo on the wall of our workshop",
      "Logo featured on our website in the Captain Tier",
      "Priority access to internal recruitment and networking events",
      "DIY team logo mechanism (3D-printed), designed by the WATFlight Engineering Team",
    ],
  },
  {
    rank: "First Officer",
    price: "$750+",
    badge: "01",
    color: "oklch(0.78 0.10 220)",
    borderColor: "oklch(0.78 0.10 220 / 0.4)",
    perks: [
      "Large logo on competition aircraft made by WATFlight",
      "Logo featured on our website in the First Officer Tier",
      "Access to internal recruitment events",
      "3D-printed WATFlight Logo with white LED lighting, designed by the Engineering Team",
    ],
  },
  {
    rank: "Second Officer",
    price: "$300+",
    badge: "02",
    color: "oklch(0.65 0.05 220)",
    borderColor: "oklch(0.65 0.05 220 / 0.3)",
    perks: [
      "Small logo on competition aircraft made by WATFlight",
      "Logo featured on our website in the Second Officer Tier",
      "3D-printed WATFlight Logo gifted by the Engineering Team",
    ],
  },
];

// Current sponsors per tier. A sponsor with a `logo` renders as a logo tile;
// otherwise it renders as a dashed "Join Us" placeholder.
const sponsorGroups: { tier: string; sponsors: { name: string; logo?: string; url?: string }[] }[] = [
  {
    tier: "Captain",
    sponsors: [{ name: "Join Us" }],
  },
  {
    tier: "First Officer",
    sponsors: [
      {
        name: "Waterloo Institute for Sustainable Aeronautics",
        logo: "/images/wisa-logo.png",
        url: "https://uwaterloo.ca/sustainable-aeronautics/",
      },
    ],
  },
  {
    tier: "Second Officer",
    sponsors: [{ name: "Join Us" }, { name: "Join Us" }, { name: "Join Us" }],
  },
];

export function SponsorshipSection() {
  return (
    <section id="sponsors" className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <p className="text-xs uppercase tracking-[0.25em] font-mono text-muted-foreground mb-6">
            Partner With Us
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl max-w-3xl mb-6">
            Help us build the future of flight.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            WATFlight is a University of Waterloo student design team building autonomous aerial vehicles. Your sponsorship directly funds aircraft development, competition entries, and hands-on engineering education.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {tiers.map((tier) => (
            <div
              key={tier.rank}
              className="relative rounded-2xl p-8 flex flex-col bg-muted/40"
              style={{
                border: `1px solid ${tier.borderColor}`,
              }}
            >
              {/* Badge */}
              <div
                className="text-xs font-mono mb-6 w-8 h-8 flex items-center justify-center rounded-full"
                style={{
                  background: `${tier.color}22`,
                  color: tier.color,
                  border: `1px solid ${tier.borderColor}`,
                }}
              >
                {tier.badge}
              </div>

              {/* Tier name + price */}
              <h3 className="text-2xl font-semibold text-foreground mb-1">
                {tier.rank}
              </h3>
              <p
                className="text-sm font-mono mb-8"
                style={{ color: tier.color }}
              >
                {tier.price}
              </p>

              {/* Divider */}
              <div className="border-t border-border mb-8" />

              {/* Perks */}
              <ul className="space-y-4 flex-1">
                {tier.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                      style={{ background: `${tier.color}22`, color: tier.color }}
                    >
                      ✓
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {perk}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Current Sponsors */}
        <div className="border-t border-border pt-16">
          <p className="text-xs uppercase tracking-[0.25em] font-mono text-muted-foreground mb-12 text-center">
            Our Sponsors
          </p>

          {sponsorGroups.map((group) => (
            <div key={group.tier} className="mb-12">
              <p className="text-xs font-mono text-muted-foreground mb-6 uppercase tracking-widest">
                {group.tier} Tier
              </p>
              <div
                className={`flex flex-row flex-wrap gap-4 ${
                  group.sponsors.some((s) => s.logo) ? "justify-center" : ""
                }`}
              >
                {group.sponsors.map((sponsor, i) => {
                  const sizeStyle = {
                    minWidth: group.tier === "Captain" ? "240px" : group.tier === "First Officer" ? "180px" : "140px",
                    minHeight: group.tier === "Captain" ? "80px" : "60px",
                  };

                  if (sponsor.logo) {
                    const tile = (
                      <div
                        className="flex w-full max-w-[560px] items-center justify-center rounded-xl border border-border px-8 py-8 md:px-12 md:py-10"
                        style={{ background: "oklch(0.14 0.01 250)" }}
                      >
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name}
                          width={560}
                          height={118}
                          className="h-12 w-auto max-w-full object-contain md:h-24"
                        />
                      </div>
                    );

                    return sponsor.url ? (
                      <Link
                        key={i}
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={sponsor.name}
                        className="transition-opacity hover:opacity-80"
                      >
                        {tile}
                      </Link>
                    ) : (
                      <div key={i}>{tile}</div>
                    );
                  }

                  return (
                    <div
                      key={i}
                      className="flex items-center justify-center rounded-xl border border-dashed border-border px-10 py-6 text-sm text-muted-foreground font-mono"
                      style={sizeStyle}
                    >
                      {sponsor.name}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-border pt-16">
          <div>
            <h4 className="text-xl font-semibold text-foreground mb-2">Interested in sponsoring?</h4>
            <p className="text-sm text-muted-foreground">Reach out to our team to discuss partnership opportunities.</p>
          </div>
          <Link
            href="mailto:j66shao@uwaterloo.ca"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors bg-foreground text-background hover:bg-foreground/80 border border-foreground"
          >
            Contact Us
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
