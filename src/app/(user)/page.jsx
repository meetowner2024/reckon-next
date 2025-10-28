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
("use client");

import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export function Spinner() {
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
  const footer = useSelector((state) => state.footer);
  const projects = useSelector((state) => state.projects.projectsDropdown);
  const header = useSelector((state) => state.header.header);
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <HeaderSection projectsDropdown={projects}  logo={header.logo} phone={header.phone} />
        <HeroSection />
        <AdvantagesSection />
        <OurproductsSection />
        <WhyChooseuSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <Footer footer={footer.footerData} projects={projects} />
      </Suspense>
    </div>
  );
};

export default Home;
