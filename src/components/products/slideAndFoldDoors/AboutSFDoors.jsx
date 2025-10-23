import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  Cog,
  Home,
  ArrowRight,
  Star,
  Palette,
  Lock,
  Wind,
  Droplets,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import FadeUp from "../../../components/FadeUp";

const AboutSFDoors = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % pillars.length);
    }, 4000);
    const sliderInterval = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % useCases.length);
    }, 3000);
    return () => {
      clearInterval(interval);
      clearInterval(sliderInterval);
    };
  }, []);

  const pillars = [
    { icon: CheckCircle, title: "Certified", desc: "ISO 9001 • CE • GreenPro" },
    { icon: Cog, title: "Innovative Work", desc: "Multi-Sash • 7-Chamber" },
    { icon: Home, title: "Experienced", desc: "25+ Years • 50K Homes" },
  ];

  const mainText = `There is nothing that looks and functions as good as Reckon's slide-fold doors, whether in gardens or as main entrances. New-generation uPVC designed for larger openings with unique sashes by our experts.`;

  const manufacturerText = `India's top manufacturer offering color options, best materials, secure insulation. Enhances home aesthetics at great value.`;

  const specs = [
    { icon: Palette, label: "200+ Colors", value: "RAL Shades" },
    { icon: Lock, label: "16-Point Lock", value: "RC2 Security" },
    { icon: Wind, label: "200km/h", value: "Wind Resistance" },
    { icon: Droplets, label: "IP68", value: "Waterproof" },
  ];

  const useCases = [
    {
      title: "Garden",
      desc: "Terrace Views",
      img: "/assets/images/Ourproducts-CasementWindows.jpg",
    },
    {
      title: "Terrace",
      desc: "Outdoor Living",
      img: "/assets/images/SlidingDoors1.jpg",
    },
    {
      title: "Main Entrance",
      desc: "Grand Welcome",
      img: "/assets/images/SlidingWindows1.jpg",
    },
    {
      title: "Balcony",
      desc: "Space Saving",
      img: "/assets/images/FrenchWindows1.jpg",
    },
  ];

  return (
    <section className="relative py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-[#f8fbff]/50 to-[#e6f0ff]/50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-8">
          <FadeUp delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#0e55a1] to-[#0c4a8e] text-white rounded-full text-xs font-bold mb-4">
              <Star className="w-3 h-3" />
              India's Premium Slide-Fold
            </div>
          </FadeUp>

          <FadeUp delay={100}>
            <h1 className="text-3xl lg:text-4xl font-light text-[#1f2e4a] mb-3">
              Reckon Slide-Fold Doors
            </h1>
          </FadeUp>

          {/* Pillars Carousel */}
          <div className="flex justify-center gap-4 mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur rounded-full shadow-sm border border-white/50 text-xs"
              >
                {(() => {
                  const ActivePillarIcon = pillars[activeTab].icon;
                  return (
                    <>
                      <ActivePillarIcon className="w-4 h-4 text-[#0e55a1]" />
                      <span className="font-medium text-[#1f2e4a]">
                        {pillars[activeTab].title}
                      </span>
                      <span className="text-[#0c4a8e]/70">
                        {pillars[activeTab].desc}
                      </span>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
            <div className="flex gap-2 self-center">
              {pillars.map((_, i) => (
                <motion.div
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`w-1.5 h-1.5 rounded-full cursor-pointer ${
                    activeTab === i ? "bg-[#0e55a1]" : "bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.5 }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
          {/* Main Image */}
          <FadeUp delay={200}>
            <motion.div whileHover={{ scale: 1.02 }} className="relative">
              <img
                src="/assets/images/doors.jpg"
                alt="Reckon Slide-Fold Doors"
                className="w-full h-[280px] lg:h-[320px] rounded-2xl object-cover shadow-lg"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 space-y-1">
                {["ISO", "25Yr", "200+"].map((t, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 bg-white/90 text-xs font-bold text-[#0e55a1] rounded shadow-sm"
                  >
                    {t}
                  </div>
                ))}
              </div>
            </motion.div>
          </FadeUp>

          <div className="space-y-4">
            <FadeUp delay={250}>
              <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-white/50">
                <h3 className="text-sm font-bold text-[#0e55a1] mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  About Slide-Fold Doors
                </h3>
                <p className="text-xs leading-relaxed text-[#1f2e4a]/80">
                  {mainText}
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={300}>
              <div className="bg-white/70 backdrop-blur rounded-xl p-4 border border-white/50">
                <h3 className="text-sm font-bold text-[#0c4a8e] mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Why Reckon?
                </h3>
                <p className="text-xs leading-relaxed text-[#1f2e4a]/80">
                  {manufacturerText}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Specifications */}
        <FadeUp delay={350}>
          <div className="flex justify-center gap-4 mb-8">
            {specs.map((spec, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -2 }}
                className="flex flex-col items-center gap-1 p-3 bg-white/60 backdrop-blur rounded-lg border border-white/50 text-center"
              >
                <spec.icon className="w-5 h-5 text-[#0e55a1]" />
                <p className="text-xs font-bold text-[#1f2e4a]">{spec.label}</p>
                <p className="text-[10px] text-[#0c4a8e]">{spec.value}</p>
              </motion.div>
            ))}
          </div>
        </FadeUp>

        {/* Use Cases - IMAGES ABOVE + TEXT BELOW */}
        <FadeUp delay={400}>
          <div className="mb-8">
            <h3 className="text-center text-sm font-bold text-[#0e55a1] mb-6 flex items-center justify-center gap-2">
              <Star className="w-4 h-4" />
              See in Your Space
            </h3>

            {/* Images Grid ABOVE */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <AnimatePresence mode="wait">
                {useCases.map((useCase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSliderIndex(i)}
                    className={`relative rounded-xl overflow-hidden shadow-lg cursor-pointer border-2 transition-all duration-300 ${
                      sliderIndex === i 
                        ? 'border-[#0e55a1] ring-2 ring-[#0e55a1]/30' 
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={useCase.img}
                      alt={`${useCase.title} Door`}
                      className="w-full h-32 md:h-40 object-cover"
                      loading="lazy"
                    />
                    {/* Active Indicator */}
                    {sliderIndex === i && (
                      <motion.div
                        className="absolute top-2 right-2 w-4 h-4 bg-[#0e55a1] rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* TEXT BELOW */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {useCases.map((useCase, i) => {
                const activeStyle = sliderIndex === i;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2 }}
                    className={`text-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                      activeStyle 
                        ? 'bg-gradient-to-r from-[#0e55a1] to-[#0c4a8e] text-white shadow-lg' 
                        : 'bg-white/60 border-gray-200 text-[#1f2e4a]'
                    }`}
                  >
                    <p
                      className={`text-xs font-bold mb-1 ${
                        activeStyle ? 'drop-shadow-sm' : ''
                      }`}
                    >
                      {useCase.title}
                    </p>
                    <p
                      className={`text-[10px] ${
                        activeStyle ? 'drop-shadow-sm' : 'text-[#0c4a8e]/70'
                      }`}
                    >
                      {useCase.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Slider Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {useCases.map((_, i) => (
                <motion.div
                  key={i}
                  onClick={() => setSliderIndex(i)}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                    sliderIndex === i 
                      ? "bg-[#0e55a1] scale-125 shadow-sm" 
                      : "bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.5 }}
                />
              ))}
            </div>
          </div>
        </FadeUp>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="px-6 py-2.5 bg-gradient-to-r from-[#0e55a1] to-[#0c4a8e] text-white font-medium text-sm rounded-full shadow-lg flex items-center gap-2 mx-auto"
          >
            Get Free Quote
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <p className="text-[10px] text-[#1f2e4a]/60 mt-2">
            7 Days Install | EMI Available
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutSFDoors;