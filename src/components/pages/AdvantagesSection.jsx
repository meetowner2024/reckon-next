import React, { useState, useEffect, useRef } from "react";
import {
  ShieldCheck,
  Droplets,
  Zap,
  Activity,
  Wind,
  Sun,
  Award,
  Cloud,
  FileBadge2,
  Volume2,
} from "lucide-react";

const advantages = [
  { name: "100% Quality Transparency", icon: ShieldCheck },
  { name: "Leak Proof", icon: Droplets },
  { name: "Shock Proof", icon: Zap },
  { name: "Tensile Strength", icon: Activity },
  { name: "Anti Dust", icon: Wind },
  { name: "Heat Insulation", icon: Sun },
  { name: "UV Protection", icon: Award },
  { name: "Many Years of Color Warranty", icon: FileBadge2 },
  { name: "Weather Resistance", icon: Cloud },
  { name: "ISO Certified", icon: ShieldCheck },
  { name: "Sound Insulation", icon: Volume2 },
];

const AdvantagesSection = () => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollSpeed = 1;
    let animationFrame;

    const scroll = () => {
      if (!isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  return (
    <section className="w-full bg-gray-50 pt-12 pb-4">
      <h3 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#000000] mb-4">
        The <span className="text-[#1e3a8a]">Reckonext</span> Advantages
      </h3>
      <div className="max-w-[1180px] md:px-0 px-4 mx-auto">
        <style>
          {`
          .carousel-container {
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .carousel-container::-webkit-scrollbar {
            display: none;
          }
          .carousel-item {
            transition: all 0.3s ease;
            border: 1px solid transparent;
          }
          .carousel-item:hover {
            transform: scale(1.05);
            background-color: #f0f9ff;
            border-color: #3b82f6;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
        `}
        </style>

        <div
          ref={scrollRef}
          className="carousel-container flex gap-4 sm:gap-6 md:gap-5 py-3 px-4 sm:px-6 md:px-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...advantages, ...advantages].map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="carousel-item flex items-center gap-2 sm:gap-3 whitespace-nowrap rounded-full bg-white px-3 py-2 sm:px-5 sm:py-2 shadow-sm cursor-default"
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#0e55a1]" />
                <span className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
