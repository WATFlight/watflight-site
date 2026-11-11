// Shared site content for the Figma-based rebuild: navigation, footer, contact and social links.
// Values here come from the approved Figma frames, or from the existing site where the owner
// approved reuse (social destinations, decision D12). Nothing else from the legacy
// `site-content.ts` is carried over.

export const siteName = "WATFlight";

/** Header navigation, in Figma order. The join call-to-action is rendered separately. */
export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/sponsorship", label: "Sponsorship" },
  { href: "/news", label: "News" },
] as const;

export const joinCta = { href: "/join", label: "Join WATFlight" } as const;

/** Footer "Navigation" column. Figma reads "New & Blog"; corrected to "News & Blog" (decision D10). */
export const footerNavLinks = [
  { href: "/about", label: "About Us" },
  { href: "/projects", label: "Current Project" },
  { href: "/sponsorship", label: "Sponsorship" },
  { href: "/join", label: "Join WATFlight" },
  { href: "/news", label: "News & Blog" },
] as const;

export const contact = {
  email: "admin@watflight.com",
  addressLines: ["University of Waterloo", "Waterloo, Ontario", "Canada"],
} as const;

export const institutionLabel = "University of Waterloo / Faculty of Engineering";

/** Existing, previously verified destinations (decision D12). GitHub is intentionally omitted. */
export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/watflight" },
  { label: "Instagram", href: "https://instagram.com/watflight" },
  { label: "Discord", href: "https://discord.gg/GVFaZvz2Zd" },
] as const;
