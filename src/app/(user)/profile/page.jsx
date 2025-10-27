"use client";
import { useState, useEffect } from "react";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/pages/Footer";
import HeaderSection from "@/components/pages/HeaderSection";
import { motion } from "framer-motion";
import Image from "next/image";
import { Loader2 } from "lucide-react";
const ProfileSection = ({ title, diagrams }) => {
  const [selected, setSelected] = useState(null);
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#000000] mb-3 relative inline-block">
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
          {diagrams.map((diag, i) => (
            <motion.div
              key={i}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{
                y: -10,
                boxShadow: "0 20px 40px rgba(30, 58, 138, 0.2)",
              }}
              onClick={() => setSelected(diag)}
            >
              <div className="relative overflow-hidden bg-white">
                <Image
                  width={500}
                  height={500}
                  src={diag.src}
                  alt={diag.title}
                  unoptimized
                  className="w-full h-64 lg:h-72 object-contain p-4 transition-all duration-700 group-hover:scale-110 group-hover:p-2 group-hover:rotate-2"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#0e55a1] backdrop-blur-sm">
                <p className="text-white font-400 text-sm text-center">
                  {diag.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      {selected && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 lg:p-8 overflow-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelected(null)}
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
              onClick={() => setSelected(null)}
            >
              <svg
                className="h-6 w-6 text-[#1E3A8A]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
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
              <Image
                src={selected.src}
                alt={selected.title}
                className="w-full object-contain max-h-96"
                onError={(e) => {
                  e.target.src = `https://placehold.co/800x800?text=${encodeURIComponent(
                    selected.title
                  )}`;
                }}
                width={600}
                height={600}
              />
            </div>
            <div className="p-4 bg-gradient-to-r from-[#1E3A8A] to-[#152a66] text-white text-center">
              <p className="text-xl font-400">{selected.title}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};
export default function ProfilePage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/users/profile")
      .then((r) => r.json())
      .then((data) => {
        setSections(data.sections || []);
        setLoading(false);
      });
  }, []);
  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen">
      <HeaderSection />
      <PageBanner
        title="Profile"
        subtitle="Leading the industry with innovation and quality"
      />
      <div className="max-w-screen-2xl mx-auto py-4">
        {sections.map((sec, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
          >
            <ProfileSection title={sec.title} diagrams={sec.diagrams} />
          </motion.div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
