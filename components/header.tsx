"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navigateToSection } from "@/lib/smooth-scroll";

const navLinks = [
  { href: "#competitions", id: "competitions", label: "Competitions" },
  { href: "#sponsors", id: "sponsors", label: "Sponsors" },
  { href: "#team", id: "team", label: "Team" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setIsMenuOpen(false);
    navigateToSection(id);
    history.replaceState(null, "", id ? `#${id}` : "#");
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      {/* Main pill */}
      <div
        className="site-header-surface relative flex items-center justify-between rounded-full border px-4 py-2.5"
      >
        {/* Logo */}
        <Link href="#" onClick={(e) => handleNavClick(e, "")} className="flex items-center gap-2.5 z-10">
          <Image
            src="/images/watflight-logo.png"
            alt="WATFlight"
            width={26}
            height={26}
          />
          <span className="text-sm font-semibold tracking-widest uppercase text-foreground">
            WATFLIGHT
          </span>
        </Link>

        {/* Desktop nav — absolutely centered */}
        <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-0.5">
          {navLinks.map(({ href, id, label }) => (
            <Link
              key={id}
              href={href}
              onClick={(e) => handleNavClick(e, id)}
              className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition-all duration-200 hover:bg-foreground/6 hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right: Join CTA + mobile toggle */}
        <div className="flex items-center gap-2 z-10">
          <Link
            href="#join"
            onClick={(e) => handleNavClick(e, "join")}
            className="hidden items-center rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-foreground hover:text-background md:inline-flex"
          >
            Join
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-foreground transition-all duration-200 hover:bg-foreground/10 md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — separate card below pill */}
      {isMenuOpen && (
        <div className="mt-2 overflow-hidden rounded-2xl border border-border/60 bg-background/95 backdrop-blur-xl transition-all duration-200">
          <nav className="flex flex-col p-2">
            {[{ href: "#hero", id: "hero", label: "Home" }, ...navLinks, { href: "#join", id: "join", label: "Join" }].map(({ href, id, label }) => (
              <Link
                key={id}
                href={href}
                onClick={(e) => handleNavClick(e, id)}
                className="rounded-xl px-4 py-3 text-sm text-foreground transition-colors hover:bg-foreground/6"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
