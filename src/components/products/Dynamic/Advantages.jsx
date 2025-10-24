"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Volume2,
  Shield,
  Leaf,
  Sun,
  Bug,
  Wrench,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "../../FadeUp";
export default function Advantages() {
  const [activeAdv, setActiveAdv] = React.useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const advantages = [
    {
      id: 1,
      title: "Weather Proof",
      description: "Reliable weatherproofing for lasting protection.",
      Icon: Zap,
      color: "#0e55a1",
    },
    {
      id: 2,
      title: "Sound Proofing",
      description: "Seal gaps, reduce noise effectively.",
      Icon: Volume2,
      color: "#10b981",
    },
    {
      id: 3,
      title: "Strength & Durability",
      description: "Unrivaled strength for lasting performance.",
      Icon: Shield,
      color: "#f59e0b",
    },
    {
      id: 4,
      title: "Eco Friendly",
      description: "Sustainable solutions without compromise.",
      Icon: Leaf,
      color: "#8b5cf6",
    },
    {
      id: 5,
      title: "UV Resistant",
      description: "Protection against harmful UV rays.",
      Icon: Sun,
      color: "#ef4444",
    },
    {
      id: 6,
      title: "Anti-Fungal",
      description: "Protection from fungi and termites.",
      Icon: Bug,
      color: "#06b6d4",
    },
    {
      id: 7,
      title: "Easy Maintenance",
      description: "Simple care, durable materials.",
      Icon: Wrench,
      color: "#6366f1",
    },
  ];
  return (
    <section className="relative py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f8fbff]/50 to-[#e6f0ff]/50">
      <div className="max-w-6xl mx-auto">
        <FadeUp delay={0}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0e55a1] to-[#0c4a8e] text-white rounded-full text-sm font-bold mb-6">
              <Shield className="w-4 h-4" />7 Key Advantages
            </div>
            <h2 className="text-4xl lg:text-5xl font-light text-[#1f2e4a] mb-4">
              Why Casement Doors Excel
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <div className="relative max-w-lg mx-auto mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/90 backdrop-blur rounded-3xl p-8 border border-white/50 text-center"
              >
                <div className="flex items-center justify-center gap-4 mb-6">
                  {(() => {
                    const CurrentIcon = advantages[activeIndex].Icon;
                    return (
                      <CurrentIcon
                        className="w-12 h-12"
                        style={{ color: advantages[activeIndex].color }}
                      />
                    );
                  })()}

                  <span className="bg-gradient-to-r from-white to-white/60 px-4 py-2 rounded-full text-sm font-bold text-[#1f2e4a]">
                    {activeIndex + 1}/7
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-[#1f2e4a] mb-3">
                  {advantages[activeIndex].title}
                </h3>
                <p className="text-base text-[#0c4a8e]/90 leading-relaxed">
                  {advantages[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-3 mt-6">
              {advantages.map((_, i) => (
                <motion.div
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-3 h-3 rounded-full cursor-pointer ${
                    activeIndex === i
                      ? "bg-[#0e55a1] scale-125 shadow-lg"
                      : "bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.75 }}
                />
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 mb-12">
            {advantages.map((adv, i) => {
              const Icon = adv.Icon;
              const isActive = activeIndex === i;
              return (
                <motion.div
                  key={adv.id}
                  whileHover={{ y: -6, scale: 1.08 }}
                  onClick={() => setActiveIndex(i)}
                  style={{
                    background: isActive
                      ? `linear-gradient(to-br, ${adv.color}, ${adv.color}80)`
                      : "rgba(255,255,255,0.9)",
                    borderColor: isActive ? adv.color : "rgba(255,255,255,0.8)",
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                  }}
                  className="backdrop-blur rounded-xl border p-4 text-center cursor-pointer transition-all group"
                >
                  <Icon
                    className="w-6 h-6 mx-auto mb-3 group-hover:scale-125 transition"
                    style={{
                      color: isActive
                        ? advantages[activeIndex].color
                        : adv.color,
                    }}
                  />
                  <p
                    className={`text-sm font-bold leading-tight ${"text-[#1f2e4a]"}`}
                  >
                    {adv.title}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </FadeUp>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-10 py-4 bg-gradient-to-r from-[#0e55a1] to-[#0c4a8e] text-white font-medium text-base rounded-full shadow-lg flex items-center gap-2 mx-auto"
          >
            Explore All Features
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
