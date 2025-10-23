import { useState, useEffect } from "react";
import {
  DoorClosed,
  DoorOpen,
  Grid2x2,
  PanelRight,
  Grid3X3,
} from "lucide-react";
import FadeUp from "./FadeUp";
const slides = [
  {
    id: 1,
    title: "Casement Doors",
    description: "Crafted for durability and design excellence.",
    label: "Casement Doors",
    icon: DoorOpen,
    image: "/assets/images/Slider1.jpg",
  },
  {
    id: 2,
    title: "Sliding Doors",
    description: "Secure, stylish, and built to last.",
    label: "Sliding Doors",
    icon: DoorClosed,
    image: "/assets/images/Slider2.jpg",
  },
  {
    id: 3,
    title: "Slide & Fold Doors",
    description: "Modern designs with superior functionality.",
    label: "Slide & Fold Doors",
    icon: DoorOpen,
    image: "/assets/images/Slider3.jpg",
  },
  {
    id: 4,
    title: "Casement Windows",
    description: "Space-saving and sleek aesthetics.",
    label: "Casement Windows",
    icon: Grid2x2,
    image: "/assets/images/Slider1.jpg",
  },
  {
    id: 5,
    title: "Sliding Windows",
    description: "Where beauty meets performance.",
    label: "Sliding Windows",
    icon: PanelRight,
    image: "/assets/images/Slider2.jpg",
  },
  {
    id: 6,
    title: "French Windows",
    description: "Redefining modern entrances.",
    label: "French Windows",
    icon: Grid3X3,
    image: "/assets/images/Slider3.jpg",
  },
];
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };
  return (
    <div className="relative w-full h-[480px] overflow-hidden">
      {}
      {slides.map((slide, index) => (
        <div
          key={`bg-${slide.id}`}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}
      {}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
      {}
      <div className="relative h-full flex flex-col justify-center items-center text-center px-6">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
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
            <FadeUp delay={400}>
              <button className="bg-white text-[#0e55a1] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Us
              </button>
            </FadeUp>
          </div>
        ))}
      </div>
      {}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col space-y-4 z-10">
        {slides.map((slide, index) => {
          const Icon = slide.icon;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white text-[#044182] scale-110 shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/40"
              }`}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default HeroSection;
