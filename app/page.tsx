import { HeroSection } from '@/components/home/HeroSection';
import { ModulesGrid } from '@/components/home/ModulesGrid';
import { StatsSection } from '@/components/home/StatsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ModulesGrid />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
