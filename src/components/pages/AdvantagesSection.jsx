"use client";
import React, { useEffect, useState, useRef } from "react";
import * as LucideIcons from "lucide-react";
const AdvantagesSection = ({ advantages }) => {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const iconMap = {
    leak: "Droplet",
    water: "Droplet",
    proof: "ShieldCheck",
    shock: "Zap",
    weather: "CloudSun",
    sound: "Volume2",
    strength: "Dumbbell",
    durable: "Hammer",
    eco: "Leaf",
    uv: "Sun",
    fungal: "Bug",
    maintenance: "Tool",
    protection: "ShieldCheck",
    resistant: "Shield",
    seal: "Lock",
    sustainable: "Recycle",
  };
  const fallbackIcons = [
    "ShieldCheck",
    "Leaf",
    "Sun",
    "Tool",
    "Star",
    "Zap",
    "Droplet",
    "Bug",
    "Cube",
    "Sparkles",
  ];
  const getIconByTitle = (title, index) => {
    if (!title) return LucideIcons.HelpCircle;
    const lower = title.toLowerCase();
    for (const [keyword, iconName] of Object.entries(iconMap)) {
      if (lower.includes(keyword) && LucideIcons[iconName]) {
        return LucideIcons[iconName];
      }
    }
    const fallbackName = fallbackIcons[index % fallbackIcons.length];
    return LucideIcons[fallbackName] || LucideIcons.HelpCircle;
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    let animationFrame;
    const scrollSpeed = 1;
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
        {advantages.title?.split(" ").map((word, i) =>
          word.toLowerCase().includes("reckonext") ? (
            <span key={i} className="text-[#1e3a8a]">
              {word}{" "}
            </span>
          ) : (
            word + " "
          )
        )}
      </h3>
      <div className="max-w-[1180px] md:px-0 px-4 mx-auto">
        <style>{`
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
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
          }
        `}</style>
        <div
          ref={scrollRef}
          className="carousel-container flex gap-4 sm:gap-6 md:gap-5 py-3 px-4 sm:px-6 md:px-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...advantages, ...advantages].map((item, index) => {
            const Icon = getIconByTitle(item.title, index);
            return (
              <div
                key={index}
                className="carousel-item flex items-center gap-2 sm:gap-3 whitespace-nowrap rounded-full bg-white px-3 py-2 sm:px-5 sm:py-2 shadow-sm cursor-default"
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#0e55a1]" />
                <span className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">
                  {item.title}
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
