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
"use client";

import { motion } from "framer-motion";

export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-[#f0f6ff]">
      <motion.div
        className="w-16 h-16 border-4 border-[#0e55a1] border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.9, ease: "easeInOut" }}
      />
    </div>
  );
}

const Home = () => {
  return (
    <Suspense
      fallback={
        <Spinner />
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
