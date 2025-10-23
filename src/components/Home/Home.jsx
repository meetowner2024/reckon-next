"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const HeaderSection = dynamic(
  () => import("@/components/pages/HeaderSection"),
  { ssr: false }
);
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
const Home = () => {
  return (
    <Suspense
      fallback={
        <div className="text-center py-10 text-gray-600">Loading...</div>
      }
    >
      <HeaderSection />
      <HeroSection />
      <AdvantagesSection />
      <OurproductsSection />
      <WhyChooseuSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </Suspense>
  );
};
export default Home;
