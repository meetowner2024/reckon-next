"use client"
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/pages/Footer";
import HeaderSection from "@/components/pages/HeaderSection";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";


const ProfileSection = ({ title, diagrams }) => {
  const [selectedDiagram, setSelectedDiagram] = useState(null);

  return (
    <>
      <section className="md:py-12 sm:py-8 py-6 px-4 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, type: "spring" }}
        >
          <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#000000] mb-3 relative inline-block">
            {title}
            <motion.span
              className="block h-1 bg-[#1E3A8A] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </h2>
          <p className="text-gray-600 text-lg font-medium">
            Discover innovative designs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 lg:gap-8">
          {diagrams.map((diagram, index) => (
            <motion.div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(30, 58, 138, 0.2)",
              }}
              onClick={() => setSelectedDiagram(diagram)}
            >
              <div className="relative overflow-hidden bg-white">
                <Image
                  width={500}
                  height={500}
                  src={diagram?.src}
                  alt={diagram.title}
                  unoptimized
                  className="w-full h-64 lg:h-72 object-contain p-4 transition-all duration-700 group-hover:scale-110 group-hover:p-2 group-hover:rotate-2"
                 
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#0e55a1] backdrop-blur-sm transform translate-y-0 group-hover:translate-y-0 transition-all duration-300">
                <p className="text-[#ffffff] font-400 text-sm text-center group-hover:text-white transition-colors">
                  {diagram.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Compact Modal */}
      {selectedDiagram && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 lg:p-8 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedDiagram(null)}
        >
          <motion.div
            className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-3 hover:bg-white transition-colors shadow-md"
              onClick={() => setSelectedDiagram(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#1E3A8A]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative bg-gray-50 p-4 lg:p-6">
              <img
                src={selectedDiagram.src}
                alt={selectedDiagram.title}
                className="w-full object-contain max-h-96"
                onError={(e) => {
                  e.target.src = `https://placehold.co/800x800?text=${encodeURIComponent(
                    selectedDiagram.title
                  )}`;
                }}
              />
            </div>
            <div className="p-4 bg-gradient-to-r from-[#1E3A8A] to-[#152a66] text-white text-center">
              <p className="text-xl font-400">
                {selectedDiagram.title}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export const Profile = () => {
  const sections = [
    {
      title: "Casement System",
      diagrams: [
        { title: "60X56 - Casement Outer Frame", src: "/assets/images/casement1.jpg" },
        { title: "78X60 - Casement Window Sash (Outward Open)", src: "/assets/images/casement2.jpg" },
        { title: "49X35 - Casement Frame for Ventilator", src: "/assets/images/casement3.jpg" },
        { title: "44X60 - Casement Door Sash (Inward Open)", src: "/assets/images/casement4.jpg" },
        { title: "60X25 - Mullion for Fly Screen Sash", src: "/assets/images/casement5.jpg" },
        { title: "72X60 - T-Mullion", src: "/assets/images/casement6.jpg" },
      ],
    },
    {
      title: "Sliding Coupling",
      diagrams: [
        { title: "88X50 - 2.5 Track Sliding Outer Frame (Super)", src: "/assets/images/sliding1.jpg" },
        { title: "60X58 Two Track Sliding Outer Frame (Super)", src: "/assets/images/sliding2.jpg" },
        { title: "108X58 - Three Track Sliding Outer Frame (Super)", src: "/assets/images/sliding3.jpg" },
        { title: "84X42 - Sliding Window Sash", src: "/assets/images/sliding4.jpg" },
        { title: "58X42 - Sliding Window Sash", src: "/assets/images/sliding5.jpg" },
        { title: "80X46 - 2.5 Track Sliding Outer Frame", src: "/assets/images/sliding6.jpg" },
        { title: "54X35 - Small Sliding Window Sash", src: "/assets/images/sliding7.jpg" },
        { title: "60X25 - Fly Screen Sash", src: "/assets/images/sliding8.jpg" },
        { title: "36X22 - Inter Lock", src: "/assets/images/sliding9.jpg" },
        { title: "60X60 - Mid-Rail for Sliding Slash", src: "/assets/images/sliding10.jpg" },
        { title: "22X40 - Fly Screen Sash", src: "/assets/images/sliding11.jpg" },
        { title: "45X35 - Inter Lock for Sliding Window Sash", src: "/assets/images/sliding12.jpg" },
      ],
    },
    {
      title: "Beading System",
      diagrams: [
        { title: "36X26 - Casement Single Glazing Bead", src: "/assets/images/beading1.jpg" },
        { title: "25X22 - Sliding Single Glazing Bead", src: "//assets/images/beading2.jpg" },
        { title: "5X22 - Single Glazing Bead", src: "/assets/images/beading3.jpg" },
      ],
    },
    {
      title: "Coupling",
      diagrams: [
        { title: "13X19 - Coupling (180degrees)", src: "/assets/images/coupling1.jpg" },
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <HeaderSection />

      <div className="relative">
        <PageBanner
          title="Profile"
          subtitle="Leading the industry with innovation and quality"
        />
      </div>

      <div className="max-w-screen-2xl mx-auto py-4 ">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
          >
            <ProfileSection title={section.title} diagrams={section.diagrams} />
          </motion.div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
