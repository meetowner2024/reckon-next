"use client";
import { HeroSkeleton } from "@/utils/Skeletons/HeroSkeleton";
import { SectionSkeleton } from "@/utils/Skeletons/SectionSkeleton";
import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProjectsDropdown } from "../store/slices/projectsSlice";
import { setFooterData } from "../store/slices/footerSlice";
import { setHeader } from "../store/slices/headerSlice";
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
export default function Home({
  header,
  hero,
  advantages,
  mainTitle,
  products,
  whyChoose,
  testimonials,
  faqs,
  contactForm,
  footer,
  projectsDropdown,
}) {
 const dispatch = useDispatch();

  useEffect(() => {
    if (projectsDropdown?.length) {
      dispatch(setProjectsDropdown(projectsDropdown));
    } if (footer) {
      dispatch(setFooterData(footer));
    }
    if (header){
      dispatch(setHeader(header))
    }
  }, [dispatch, projectsDropdown,footer,header]);
  return (
    
    <main className="w-full overflow-hidden">
      <HeaderSection
        logo={header.logo}
        phone={header.phone}
        projectsDropdown={projectsDropdown}
      />

      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection slides={hero} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <AdvantagesSection advantages={advantages} mainTitle={mainTitle} />
      </Suspense>

      <OurproductsSection products={products} />

      <Suspense fallback={<SectionSkeleton />}>
        <WhyChooseuSection features={whyChoose} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection testimonials={testimonials} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <FAQSection faqs={faqs} />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection formConfig={contactForm} />
      </Suspense>

      <Footer footer={footer} projects={projectsDropdown} />
    </main>
  );
}
