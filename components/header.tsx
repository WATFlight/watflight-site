"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md rounded-full" : "bg-transparent"}`}
      style={{
        boxShadow: isScrolled ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px" : "none"
      }}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-2 pl-5 py-2">
        {/* Logo */}
        <Link href="#" className="flex items-center gap-2">
          <Image
            src="/images/watflight-logo.png"
            alt="WATFlight"
            width={32}
            height={32}
            className="transition-all duration-300"
          />
          <span className={`text-lg font-medium tracking-tight transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-white"}`}>
            WATFLIGHT
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          <Link
            href="#products"
            className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Projects
          </Link>
          <Link
            href="#team"
            className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Team
          </Link>
          <Link
            href="#competitions"
            className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Competitions
          </Link>
          <Link
            href="#sponsors"
            className={`text-sm transition-colors ${isScrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"}`}
          >
            Sponsors
          </Link>
          <Link
            href="#join"
            className={`text-sm transition-colors px-4 py-1.5 rounded-full border ${isScrolled ? "border-foreground/20 text-foreground hover:bg-foreground hover:text-background" : "border-white/30 text-white hover:bg-white hover:text-black"}`}
          >
            Join
          </Link>
        </nav>

        {/* Theme Toggle */}
        <div className="flex items-center gap-2">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all border ${
                isScrolled
                  ? "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                  : "border-white/20 text-white/70 hover:text-white hover:border-white/40"
              }`}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={13} /> : <Moon size={13} />}
              {theme === "dark" ? "LIGHT" : "DARK"}
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`transition-colors flex md:hidden ${isScrolled ? "text-foreground" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-8 md:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-6">
            <Link href="#hero" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link href="#products" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Projects</Link>
            <Link href="#team" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Team</Link>
            <Link href="#competitions" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Competitions</Link>
            <Link href="#sponsors" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Sponsors</Link>
            <Link href="#join" className="text-lg text-foreground" onClick={() => setIsMenuOpen(false)}>Join</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
