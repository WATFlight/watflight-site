import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { EditorialSection } from "@/components/sections/editorial-section";
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
      <PhilosophySection />
      <TechnologySection />
      <EditorialSection />
      <TestimonialsSection />
      <CompetitionsSection />
      <SponsorshipSection />
      <TeamSection />
    </main>
  );
}
