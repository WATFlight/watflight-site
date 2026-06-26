"use client";

import { useState, useEffect, type MouseEvent } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setIsMenuOpen(false);
    navigateToSection(id);
    history.replaceState(null, "", id ? `#${id}` : "#");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
      {/* Main pill */}
      <div
        className={`relative flex items-center justify-between px-4 py-2.5 rounded-full border transition-all duration-500 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-border/60 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-white/5 backdrop-blur-sm border-white/10"
        }`}
      >
        {/* Logo */}
        <Link href="#" onClick={(e) => handleNavClick(e, "")} className="flex items-center gap-2.5 z-10">
          <Image
            src="/images/watflight-logo.png"
            alt="WATFlight"
            width={26}
            height={26}
          />
          <span className={`text-sm font-semibold tracking-widest uppercase transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}>
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
              className={`text-sm px-3.5 py-1.5 rounded-full transition-all duration-200 ${
                isScrolled
                  ? "text-muted-foreground hover:text-foreground hover:bg-foreground/6"
                  : "text-white/65 hover:text-white hover:bg-white/10"
              }`}
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
            className={`hidden md:inline-flex items-center text-sm font-medium px-4 py-1.5 rounded-full border transition-all duration-200 ${
              isScrolled
                ? "border-foreground/20 text-foreground hover:bg-foreground hover:text-background"
                : "border-white/30 text-white hover:bg-white hover:text-black"
            }`}
          >
            Join
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 md:hidden ${
              isScrolled
                ? "text-foreground hover:bg-foreground/10"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu — separate card below pill */}
      {isMenuOpen && (
        <div className={`mt-2 rounded-2xl border overflow-hidden transition-all duration-200 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-xl border-border/60"
            : "bg-black/80 backdrop-blur-xl border-white/10"
        }`}>
          <nav className="flex flex-col p-2">
            {[{ href: "#hero", id: "hero", label: "Home" }, ...navLinks, { href: "#join", id: "join", label: "Join" }].map(({ href, id, label }) => (
              <Link
                key={id}
                href={href}
                onClick={(e) => handleNavClick(e, id)}
                className={`text-sm px-4 py-3 rounded-xl transition-colors ${
                  isScrolled
                    ? "text-foreground hover:bg-foreground/6"
                    : "text-white/80 hover:text-white hover:bg-white/8"
                }`}
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
