"use client";
import { useState, useEffect } from "react";
import {
  Zap,
  Volume2,
  Shield,
  Leaf,
  Sun,
  Bug,
  Wrench,
  Droplets,
  Lock,
  Wind,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "@/components/pages/FadeUp";
const getIconFromTitle = (title) => {
  const map = {
    "leak proof": Droplets,
    "shock resistant": Zap,
    "weather proof": Wind,
    "sound proofing": Volume2,
    strength: Shield,
    durability: Shield,
    "eco friendly": Leaf,
    "uv resistant": Sun,
    "anti-fungal": Bug,
    "easy maintenance": Wrench,
    lock: Lock,
  };
  const key = title.toLowerCase();
  for (const [k, Icon] of Object.entries(map)) {
    if (key.includes(k)) return Icon;
  }
  return Shield;
};
const colors = [
  "#0e55a1",
  "#10b981",
  "#f59e0b",
  "#8b5cf6",
  "#ef4444",
  "#06b6d4",
  "#6366f1",
  "#ec4899",
  "#14b8a6",
];
export default function Advantages({ product }) {
  const [advantages, setAdvantages] = useState([]);
  const [mainTitle, setMainTitle] = useState("Our Advantages");
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAdvantages = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/users/advantages");
        const data = await res.json();
        if (data.advantages && Array.isArray(data.advantages)) {
          setAdvantages(data.advantages);
          setMainTitle(`Advantages of ${product.title}` || "Our Advantages");
        }
      } catch (err) {
        console.error("Error fetching advantages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvantages();
  }, []);
  const nextSlide = () => setActiveIndex((i) => (i + 1) % advantages.length);
  const prevSlide = () =>
    setActiveIndex((i) => (i - 1 + advantages.length) % advantages.length);
  if (loading) {
    return (
      <section className="py-20 bg-linear-to-br from-[#f8fbff]/50 to-[#e6f0ff]/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-full w-64 mx-auto mb-6"></div>
            <div className="h-32 bg-gray-100 rounded-3xl w-full max-w-lg mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }
  if (!advantages.length) {
    return null;
  }
  const current = advantages[activeIndex];
  const Icon = getIconFromTitle(current.title);
  const color = colors[activeIndex % colors.length];
  return (
    <section className="relative py-16 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-linear-to-br from-[#f8fbff]/50 via-white to-[#e6f0ff]/50">
      {}
      <div className="absolute inset-0 bg-linear-to-t from-blue-50/50 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        {}
        <FadeUp delay={0}>
          <div className="text-center mb-12 lg:mb-16">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-blue-600 to-indigo-700 text-white rounded-full text-sm font-bold shadow-lg mb-6"
            >
              <Shield className="w-4 h-4" />
              {advantages.length} Key Advantages
            </motion.div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 leading-tight">
              {mainTitle}
            </h2>
          </div>
        </FadeUp>
        {}
        <FadeUp delay={100}>
          <div className="relative max-w-2xl mx-auto mb-16">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/50 text-center"
                >
                  {}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div
                      className="p-4 rounded-2xl shadow-lg"
                      style={{
                        background: `linear-linear(135deg, ${color}20, ${color}05)`,
                        border: `1px solid ${color}30`,
                      }}
                    >
                      <Icon className="w-12 h-12" style={{ color }} />
                    </div>
                    <span className="bg-linear-to-r from-gray-100 to-gray-50 px-5 py-2 rounded-full text-sm font-bold text-gray-700 shadow">
                      {activeIndex + 1} / {advantages.length}
                    </span>
                  </div>
                  {}
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                    {current.title}
                  </h3>
                  <p className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>
              {}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:scale-110 transition"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:scale-110 transition"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            {}
            <div className="flex justify-center gap-2 mt-8">
              {advantages.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? "w-10 h-2 bg-linear-to-r from-blue-600 to-indigo-700"
                      : "w-2 h-2 bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </FadeUp>
        {}
        <FadeUp delay={200}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg gag-6">
            {advantages.map((adv, i) => {
              const Icon = getIconFromTitle(adv.title);
              const isActive = i === activeIndex;
              const color = colors[i % colors.length];
              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -8, scale: 1.05 }}
                  onClick={() => setActiveIndex(i)}
                  className="group cursor-pointer"
                >
                  <div
                    className="p-5 lg:p-6 rounded-2xl backdrop-blur-lg border transition-all duration-300 shadow-md hover:shadow-xl"
                    style={{
                      background: isActive
                        ? `linear-linear(135deg, ${color}10, ${color}05)`
                        : "rgba(255, 255, 255, 0.85)",
                      borderColor: isActive
                        ? color + "40"
                        : "rgba(255, 255, 255, 0.6)",
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className="p-3 rounded-xl mb-3 transition-transform group-hover:scale-110"
                        style={{
                          background: isActive
                            ? `linear-linear(135deg, ${color}20, ${color}10)`
                            : `${color}10`,
                        }}
                      >
                        <Icon
                          className="w-7 h-7 lg:w-8 lg:h-8"
                          style={{ color }}
                        />
                      </div>
                      <p className="text-sm lg:text-base font-bold text-gray-800 leading-tight">
                        {adv.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
