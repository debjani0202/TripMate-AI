import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { AgentTeamSection } from "./AgentTeamSection";
import { DestinationsSection } from "./DestinationsSection";
import { BenefitsSection } from "./BenefitsSection";
import { FinalCtaSection } from "./FinalCtaSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AgentTeamSection />
      <DestinationsSection />
      <BenefitsSection />
      <FinalCtaSection />
    </>
  );
}
