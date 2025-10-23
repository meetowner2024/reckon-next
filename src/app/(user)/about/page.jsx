"use client"
import { motion } from "framer-motion";
import React from "react";
import PageBanner from "../../../components/PageBanner";



// Local image imports
import AboutPageImage from "../../../../public/assets/images/AboutPage.png";
import Team from "@/components/Team";
import Footer from "@/components/pages/Footer";
import { useRouter } from "next/navigation";
import HeaderSection from "@/components/pages/HeaderSection";
import FadeUp from "@/components/pages/FadeUp";

export const AboutPage = () => {
  const floating = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const router=useRouter()
  const handleNavigate = (path) => navigate(path);

  const breadcrumbItems = [{ label: "Home", path: "/" }, { label: "About Us" }];

  // Mission, Vision, Philosophy data with local images
  const companyValues = [
    {
      title: "MISSION",
      description:
        "Our mission is to give clients the most eco-friendly and high-quality uPVC products, enabling them to design homes and workplaces of their dreams.",
      image: AboutPageImage,
    },
    {
      title: "VISION",
      description:
        "Our vision is to become India's leading uPVC manufacturer while establishing a strong presence in the global market.",
      image: AboutPageImage,
    },
    {
      title: "PHILOSOPHY",
      description:
        "Craft durable, energy-efficient window and door profiles with innovative designs, prioritizing aesthetics, functionality, and sustainability.",
      image: AboutPageImage,
    },
  ];

  return (
    <div>
      <HeaderSection />

      {/* Page Banner with Breadcrumb on bottom */}
      <div className="relative">
        <PageBanner
          title="About Us"
          subtitle="Leading the industry with innovation and quality"
        />
      </div>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
                  About Company
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  <strong>RECKON EXT. uPVC MANUFACTURERS</strong> provides a
                  brand new experience in the world of uPVC profiles, windows,
                  and doors. Windows extend beyond being mere connectors between
                  your home's interior and the outside world — they define your
                  comfort, style, and energy efficiency.
                </p>
                <p className="text-lg text-gray-700 mb-4">
                  Choose the best uPVC profiles, doors, and windows manufacturer
                  in India and experience hassle-free installation at very
                  affordable prices.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={200}>
              <motion.div
                className="relative"
                variants={floating}
                animate="animate"
              >
                <motion.img
                  src={AboutPageImage?.src}
                  alt="Company building"
                  className="w-full h-auto max-h-[500px] rounded-2xl shadow-xl object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
              </motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Philosophy Section */}
      <section className="md:py-10 sm:py-6 py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {companyValues.map((item, index) => (
              <FadeUp key={index} delay={index * 100}>
                <motion.div
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  <motion.img
                    src={item.image?.src}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    variants={floating}
                    animate="animate"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <Team />

      <Footer />
    </div>
  );
};

export default AboutPage;