"use client";
import dynamic from "next/dynamic";
const HeaderSection = dynamic(() => import("@/components/pages/HeaderSection"));
const HeroSection = dynamic(() => import("@/components/pages/HeroSection"));
const AdvantagesSection = dynamic(() =>
  import("@/components/pages/AdvantagesSection")
);
const OurproductsSection = dynamic(() =>
  import("@/components/pages/OurproductsSection")
);
const WhyChooseuSection = dynamic(() =>
  import("@/components/pages/WhyChooseuSection")
);
const TestimonialsSection = dynamic(() =>
  import("@/components/pages/TestimonialsSection")
);
const FAQSection = dynamic(() => import("@/components/pages/FAQSection"));
const ContactSection = dynamic(() =>
  import("@/components/pages/ContactSection")
);
const Footer = dynamic(() => import("@/components/pages/Footer"));
export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <HeaderSection />

      <HeroSection />

      <AdvantagesSection />

      <OurproductsSection />
      <WhyChooseuSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
