import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { sponsors, sponsorshipTiers } from "@/content/site-content";

export function SponsorshipSection() {
  return (
    <section id="sponsors" className="bg-background px-6 pt-0 pb-20 md:px-12 md:pt-0 md:pb-28 lg:px-20 lg:pt-0 lg:pb-36">
      <div className="max-w-6xl mx-auto">

        <SectionHeading
          eyebrow="Partner With Us"
          title="Help us build the future of flight."
          description="WATFlight is a University of Waterloo student design team dedicated to advancing sustainable aviation. Your sponsorship directly funds the development of cleaner, more efficient aircraft and helps us prove that the future of flight can be both autonomous and environmentally responsible."
          className="mb-20"
        />

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {sponsorshipTiers.map((tier) => (
            <div
              key={tier.rank}
              className="relative rounded-2xl p-8 flex flex-col bg-muted/40"
              style={{
                border: `1px solid ${tier.borderColor}`,
              }}
            >
              {/* Tier heading + badge */}
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="mb-1 text-2xl font-semibold text-foreground">
                    {tier.rank}
                  </h3>
                  <p className="font-mono text-sm" style={{ color: tier.color }}>
                    {tier.price}
                  </p>
                </div>
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono"
                  style={{
                    background: `${tier.color}22`,
                    color: tier.color,
                    border: `1px solid ${tier.borderColor}`,
                  }}
                  aria-hidden="true"
                >
                  {tier.badge === "star" ? (
                    <Star className="h-4 w-4 fill-current" strokeWidth={1.5} />
                  ) : (
                    <span className="text-[13px] tabular-nums">{tier.badge}</span>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border mb-8" />

              {/* Perks */}
              <ul className="space-y-4 flex-1">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {sponsors.map((sponsor) => {
              const tile = (
                <div
                  className="flex h-full items-center justify-center rounded-xl border border-border px-8 py-8 md:px-12 md:py-10"
                  style={{ background: "oklch(0.14 0.01 250)" }}
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    width={560}
                    height={200}
                    sizes="(max-width: 640px) calc(100vw - 112px), 336px"
                    className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto max-w-[85%] object-contain"
                  />
                </div>
              );

              return (
                <Link
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={sponsor.name}
                  className="block transition-opacity hover:opacity-80"
                >
                  {tile}
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-start md:flex-row md:items-center md:justify-between gap-4 border-t border-border pt-16">
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
