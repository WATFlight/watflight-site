"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  explore: [
    { label: "Products", href: "#products" },
    { label: "Technology", href: "#technology" },
    { label: "About", href: "#testimonials" },
    { label: "Team", href: "#team" },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-background">
      {/* Main Footer Content */}
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/watflight-logo.png"
                alt="WATFlight"
                width={32}
                height={32}
              />
              <span className="text-lg font-medium text-foreground">
                WATFLIGHT
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A University of Waterloo student team building aviation technology. Phantom is our first project — an autonomous racing drone showcasing student-driven innovation.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            2026 WATFLIGHT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
