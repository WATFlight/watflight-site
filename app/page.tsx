import { HeroSection } from "@/components/sections/hero-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { TeamSection } from "@/components/sections/team-section";
import { CompetitionsSection } from "@/components/sections/competitions-section";
import { SponsorshipSection } from "@/components/sections/sponsorship-section";
import { ProgressionNav } from "@/components/progression-nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <ProgressionNav />
      <HeroSection />
      <TestimonialsSection />
      <CompetitionsSection />
      <SponsorshipSection />
      <TeamSection />
    </main>
  );
}
