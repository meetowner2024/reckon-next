"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import FadeUp from "./FadeUp";
const HeroSection = ({ serverSlides }) => {
  const [slides, setSlides] = useState(serverSlides || []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  useEffect(() => {
    async function fetchSlides() {
      try {
        const res = await fetch("/api/users/hero", { cache: "force-cache" });
        const data = await res.json();
        const slidesWithApiUrl = data.map((slide) => ({
          ...slide,
          image: `/uploads/${slide.image.split("/").pop()}`,
        }));
        setSlides(slidesWithApiUrl);
      } catch (err) {
        console.error("Failed to load hero slides:", err);
      }
    }
    fetchSlides();
  }, []);
  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return;
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };
  if (slides.length === 0) return null;
  return (
    <section className="relative w-full h-[480px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide._id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title || "Slide image"}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

          <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
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
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === currentSlide
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
export default HeroSection;
