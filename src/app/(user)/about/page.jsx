// app/about/page.js
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageBanner from "@/components/PageBanner";
import HeaderSection from "@/components/pages/HeaderSection";
import FadeUp from "@/components/pages/FadeUp";
import Footer from "@/components/pages/Footer";
import Image from "next/image";

const floating = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function AboutPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users/about")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!data) return null;

  const breadcrumbItems = [{ label: "Home", path: "/" }, { label: "About Us" }];

  return (
    <div>
      <HeaderSection />

      {/* Page Banner */}
      <div className="relative">
        <PageBanner title="About Us" subtitle="Leading the industry with innovation and quality" />
      </div>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
                  {data.title || "About Company"}
                </h2>
                <div
                  className="text-lg text-gray-700 space-y-4"
                  dangerouslySetInnerHTML={{ __html: (data.description || "").replace(/\n/g, "<br/>") }}
                />
              </div>
            </FadeUp>

            <FadeUp delay={200}>
              <motion.div className="relative" variants={floating} animate="animate">
                {data.mainImage ? (
                  <Image
                    src={data.mainImage}
                    alt="Company"
                    width={600}
                    height={500}
                    className="w-full h-auto max-h-[500px] rounded-2xl shadow-xl object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 border-2 border-dashed rounded-2xl w-full h-[500px]" />
                )}
              </motion.div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Philosophy */}
      <section className="md:py-10 sm:py-6 py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {(data.cards || []).map((item, index) => (
              <FadeUp key={index} delay={index * 100}>
                <motion.div
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 120 }}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 h-48" />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-3">{item.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section – Dynamic */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp delay={0}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium max-w-max mx-auto">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Our Leadership Team
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                {data.expertsInputTitle || "Meet Our Experts"}
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {data.expertsInputDescription || "The dedicated professionals driving innovation and excellence in uPVC manufacturing"}
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {(data.experts || []).map((member, index) => (
              <FadeUp key={index} delay={index * 150}>
                <motion.div
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden group"
                  whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative overflow-hidden aspect-square bg-gray-100">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ y: 20 }}
                      whileHover={{ y: 0 }}
                    >
                      <h3 className="font-bold text-sm">{member.name}</h3>
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-blue-600 font-medium text-sm uppercase tracking-wide">
                        {member.role}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}