import Image from "next/image";
import HeroNoImage from "./_components/Hero";
import Hero from "./_components/Hero";
import TrustedBy from "./_components/TrustedBy";
import ProblemSection from "./_components/ProblemSection";
import HowItWorks from "./_components/HowItWorks";
import FeaturesSection from "./_components/FeaturesSection";
import TryItFree from "./_components/TryItFree";
import PricingSection from "./_components/PricingSection";
import Testimonials from "./_components/Testimonials";
import FAQSection from "./_components/Faqsection";
import FinalCTA from "./_components/Finalcta";

export default function Home() {
  return (
    <div>
      <Hero />
      <TrustedBy />
      <ProblemSection />
      <HowItWorks />
      <FeaturesSection />
      <TryItFree />
      <PricingSection />
      <Testimonials />
      <FAQSection />
      <FinalCTA />
    </div>
  );
}
