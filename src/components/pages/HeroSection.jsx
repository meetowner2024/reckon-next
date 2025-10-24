"use client";

import { useState, useEffect } from "react";
import FadeUp from "./FadeUp";
import * as LucideIcons from "lucide-react";

const HeroSection = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    async function fetchSlides() {
      const res = await fetch("/api/users/hero");
      const data = await res.json();
      const slidesWithApiUrl = data.map((slide) => ({
        ...slide,
        image: `/uploads/${slide.image.split("/").pop()}`,
      }));
      setSlides(slidesWithApiUrl);
    }
    fetchSlides();
  }, []);

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (slides.length === 0) return null;

  return (
    <div className="relative w-full h-[480px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

      <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
        {slides.map((slide, index) => (
          <div
            key={slide._id}
            className={`absolute inset-0 flex flex-col justify-center items-center text-center transition-opacity duration-700 ${
              index === currentSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <FadeUp>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-4">
                {slide.title}
              </h1>
            </FadeUp>
            <FadeUp delay={200}>
              <p className="text-lg sm:text-xl text-white/90 mb-6 max-w-2xl">
                {slide.description}
              </p>
            </FadeUp>
          </div>
        ))}
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-10">
        {slides.map((slide, index) => {
          const IconComponent =
            LucideIcons[slide.icon] || LucideIcons.DoorClosed;
          return (
            <button
              key={slide._id}
              onClick={() => goToSlide(index)}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white text-[#044182] scale-110 shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/40"
              }`}
            >
              <IconComponent size={20} />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
