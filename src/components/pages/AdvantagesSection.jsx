"use client";
import React, { useState, useEffect, useRef } from "react";
import * as LucideIcons from "lucide-react";
const AdvantagesSection = () => {
  const [advantages, setAdvantages] = useState([]);
  const [title, setTitle] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  useEffect(() => {
    const fetchAdvantages = async () => {
      try {
        const res = await fetch("/api/users/advantages");
        const data = await res.json();
        if (data.advantages) {
          setAdvantages(data.advantages);
          setTitle(data.main_title || "Our Advantages");
        }
      } catch (err) {
        console.error("Error fetching advantages:", err);
      }
    };
    fetchAdvantages();
  }, []);
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
        {title.split(" ").map((word, i) =>
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
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
        `}</style>
        <div
          ref={scrollRef}
          className="carousel-container flex gap-4 sm:gap-6 md:gap-5 py-3 px-4 sm:px-6 md:px-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...advantages, ...advantages].map((item, index) => {
            const Icon = LucideIcons[item.icon] || LucideIcons.HelpCircle;
            return (
              <div
                key={index}
                className="carousel-item flex items-center gap-2 sm:gap-3 whitespace-nowrap rounded-full bg-white px-3 py-2 sm:px-5 sm:py-2 shadow-sm cursor-default"
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-[#0e55a1]" />
                <span className="text-gray-700 font-medium text-xs sm:text-sm md:text-base">
                  {item.adv}
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
