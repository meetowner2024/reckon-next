import React from "react";
import { Suspense, lazy } from "react";

const Footer = lazy(() => import("../pages/footer/Footer"));
const HeaderSection = lazy(() => import("../components/HeaderSection"));
const HeroSection = lazy(() => import("../components/HeroSection"));
const AdvantagesSection = lazy(() => import("../components/AdvantagesSection"));
const OurproductsSection = lazy(() =>
  import("../components/OurproductsSection")
);
const TestimonialsSection = lazy(() =>
  import("../components/TestimonialsSection")
);
const FAQSection = lazy(() => import("../components/FAQSection"));
const ContactSection = lazy(() => import("../components/ContactSection"));
const WhyChooseuSection = lazy(() => import("../components/WhyChooseuSection"));

const Home = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
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
    </div>
  );
};

export default Home;
