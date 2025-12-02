import React, { useState, useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";
import FadeUp from "./FadeUp";
import Image from "next/image";
const TestimonialsSection = ({ testimonials }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  const extendedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];
  const getVisibleSlides = () => {
    if (windowWidth >= 1024) return 3;
    if (windowWidth >= 768) return 2;
    return 1;
  };
  const visibleSlides = getVisibleSlides();
  const slideWidthPercentage = 100 / visibleSlides;
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setCurrentSlide(0);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    if (!isAutoPlay || hoveredCardIndex !== null || isTransitioning) return;
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = prev === testimonials.length ? 0 : prev + 1;
        return next;
      });
    }, 4000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlay, hoveredCardIndex, isTransitioning, visibleSlides]);
  useEffect(() => {
    if (currentSlide === testimonials.length) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(0);
        setIsTransitioning(false);
      }, 50);
    }
  }, [currentSlide]);
  const handleCardHover = (index) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsAutoPlay(false);
    setHoveredCardIndex(index);
  };
  const handleCardLeave = () => {
    setHoveredCardIndex(null);
    setTimeout(() => {
      setIsAutoPlay(true);
    }, 1500);
  };
  const goToSlide = (index) => {
    setCurrentSlide(index);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsAutoPlay(false);
    setHoveredCardIndex(null);
  };
  const totalSlides = testimonials.length;
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeUp>
          <div className="text-center mb-12 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#000000] mb-4">
              What Our Clients Say
            </h2>
            <p className="text-base sm:text-lg text-[#7c7978] max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied
              customers have to say about our products and services.
            </p>
          </div>
        </FadeUp>
        {}
        <div className="relative">
          {}
          <div className="overflow-hidden bg-transparent py-4 rounded-xl">
            <div
              ref={containerRef}
              className={`flex transition-transform duration-${
                isTransitioning ? "50" : "1000"
              } ease-in-out h-full`}
              style={{
                transform: `translateX(-${
                  currentSlide * slideWidthPercentage
                }%)`,
                willChange: "transform",
              }}
            >
              {extendedTestimonials.map((testimonial, index) => {
                const originalIndex = index % testimonials.length;
                const isInView =
                  index >= currentSlide && index < currentSlide + visibleSlides;
                const isHovered = hoveredCardIndex === originalIndex;
                return (
                  <div
                    key={`${testimonial.id}-${index}`}
                    className={`flex-shrink-0 px-2 sm:px-3 lg:px-4 transition-all duration-500 ${
                      isInView ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                    style={{ width: `${slideWidthPercentage}%` }}
                  >
                    <div
                      className={`w-full h-full bg-white rounded-xl shadow-lg p-4 sm:p-5 lg:p-6 transition-all duration-500 relative group ${
                        isInView && originalIndex < testimonials.length
                          ? "cursor-pointer hover:shadow-2xl hover:scale-[1.02]"
                          : "pointer-events-none"
                      } ${
                        isHovered ? "animate-bobble-hovered scale-105 z-10" : ""
                      }`}
                      onMouseEnter={
                        isInView && originalIndex < testimonials.length
                          ? () => handleCardHover(originalIndex)
                          : undefined
                      }
                      onMouseLeave={
                        isInView && originalIndex < testimonials.length
                          ? handleCardLeave
                          : undefined
                      }
                    >
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 text-[#0e55a1]/10 group-hover:text-[#0e55a1]/20 transition-colors duration-300 pointer-events-none">
                        <Quote className="w-8 sm:w-10 h-8 sm:h-10" />
                      </div>
                      <div className="flex items-start sm:items-center mb-3 sm:mb-4">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-[#000000] text-sm sm:text-base truncate">
                            {testimonial.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-[#7c7978] truncate">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex mb-2 sm:mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 sm:w-4 h-3 sm:h-4 fill-[#0e55a1] text-[#0e55a1] flex-shrink-0"
                          />
                        ))}
                      </div>
                      <p className="text-[#7c7978] leading-relaxed text-xs sm:text-sm line-clamp-4 sm:line-clamp-3">
                        {testimonial.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {}
          {windowWidth >= 1024 && (
            <>
              <button
                onClick={() =>
                  goToSlide(
                    currentSlide === 0 ? totalSlides - 1 : currentSlide - 1
                  )
                }
                className="absolute left-4 sm:left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 sm:p-3 transition-all duration-300 z-10"
                aria-label="Previous slide"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-[#0e55a1] rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  goToSlide(
                    currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
                  )
                }
                className="absolute right-4 sm:right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 sm:p-3 transition-all duration-300 z-10"
                aria-label="Next slide"
              >
                <svg
                  className="w-4 sm:w-5 h-4 sm:h-5 text-[#0e55a1]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
          {}
          <div className="flex justify-center mt-4 sm:mt-6 space-x-2 sm:space-x-3">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full transition-all duration-300 ${
                  currentSlide % totalSlides === index
                    ? "bg-[#0e55a1] scale-125 shadow-lg"
                    : "bg-gray-300 hover:bg-[#0e55a1]/60 hover:scale-110"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes bobble {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-4px) rotate(0.5deg);
          }
          66% {
            transform: translateY(-8px) rotate(-0.5deg);
          }
        }
        @keyframes bobble-hovered {
          0%,
          100% {
            transform: scale(1.05) translateY(0px) rotate(0deg);
          }
          50% {
            transform: scale(1.05) translateY(-12px) rotate(0deg);
          }
        }
        .animate-bobble-hovered {
          animation: bobble-hovered 2s ease-in-out infinite;
        }
        .line-clamp-3,
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-4 {
          -webkit-line-clamp: 4;
        }
        .line-clamp-3 {
          -webkit-line-clamp: 3;
        }
        @media (hover: none) and (pointer: coarse) {
          .group:hover {
            transform: none !important;
          }
        }
        .h-full {
          height: 100%;
        }
      `}</style>
    </section>
  );
};
export default TestimonialsSection;
