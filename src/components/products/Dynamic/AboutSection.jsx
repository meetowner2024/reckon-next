"use client";
import React, { useState } from "react";
import {
  Shield,
  Cog,
  Home,
  ArrowRight,
  Star,
  Palette,
  Lock,
  Wind,
  Droplets,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "@/components/pages/FadeUp";
import Image from "next/image";
const AboutSection = ({ product }) => {
  const [activeTab, setActiveTab] = useState(0);
  const about = product?.about?.[0] || {};
  const mainImage = product?.banner?.[0] || "/assets/images/placeholder.jpg";
  const title = product?.title || "Product";
  const subtitle = product?.subtitle || "Premium quality for modern living.";
  const description =
    about.description ||
    `Discover the elegance and durability of our ${title}.`;
  const paragraphs = description.split("\n\n").filter((p) => p.trim());
  const pillars = [
    { icon: Shield, title: "Certified", desc: "ISO 9001 • CE • GreenPro" },
    { icon: Cog, title: "Innovative", desc: "Multi-Sash • 7-Chamber" },
    { icon: Home, title: "Experienced", desc: "25+ Years • 50K+ Homes" },
  ];
  const specs = [
    { icon: Palette, label: "200+ Colors", value: "RAL Shades" },
    { icon: Lock, label: "16-Point Lock", value: "RC2 Security" },
    { icon: Wind, label: "200km/h", value: "Wind Resistance" },
    { icon: Droplets, label: "IP68", value: "Waterproof" },
  ];
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-gray-50 via-white to-blue-50/30 py-16 lg:py-24">
      {}
      <div className="absolute inset-0 bg-linear-to-t from-blue-100/20 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          {}
          <FadeUp delay={0}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-full text-sm font-bold shadow-lg mb-6"
            >
              <Star className="w-4 h-4" />
              India's Premium {title}
            </motion.div>
          </FadeUp>
          {}
          <FadeUp delay={100}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 mb-4 leading-tight">
              {about.title || `Reckon ${title}`}
            </h1>
          </FadeUp>
          {}
          <FadeUp delay={150}>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light">
              {subtitle}
            </p>
          </FadeUp>
          {}
          <div className="flex justify-center items-center gap-6 mt-10 flex-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 px-5 py-3 bg-white rounded-full shadow-md border border-gray-100"
              >
                {(() => {
                  const Icon = pillars[activeTab].icon;
                  return (
                    <>
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Icon className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {pillars[activeTab].title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {pillars[activeTab].desc}
                        </p>
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
            {}
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    activeTab === i ? "bg-blue-600 w-8" : "bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>
        {}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {}
          <FadeUp delay={200}>
            <motion.div whileHover={{ scale: 1.02 }} className="relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={mainImage}
                  alt={`${title} - Premium View`}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover aspect-video lg:aspect-auto lg:h-[500px]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              {}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {["ISO Certified", "25Yr Warranty", "200+ Colors"].map(
                  (badge, i) => (
                    <motion.div
                      key={i}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-xs font-bold text-blue-700 rounded-full shadow-md flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      {badge}
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          </FadeUp>
          {}
          <div className="space-y-6 lg:space-y-8">
            {}
            {paragraphs.map((para, i) => (
              <FadeUp key={i} delay={250 + i * 100}>
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {para.trim()}
                  </p>
                </div>
              </FadeUp>
            ))}
            {}
            <FadeUp delay={400}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {specs.map((spec, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, scale: 1.05 }}
                    className="text-center p-4 bg-white/80 backdrop-blur rounded-xl border border-gray-100 shadow-sm"
                  >
                    <spec.icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-bold text-gray-800">
                      {spec.label}
                    </p>
                    <p className="text-xs text-gray-500">{spec.value}</p>
                  </motion.div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
        {}
        <FadeUp delay={500}>
          <div className="text-center mt-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Get Free Quote
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <p className="text-sm text-gray-600 mt-3">
              <span className="font-medium">7 Days Installation</span> • EMI
              Available • Free Consultation
            </p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
export default AboutSection;
