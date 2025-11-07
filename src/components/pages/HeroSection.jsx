"use client";
import { useState } from "react";
import Image from "next/image";
import FadeUp from "./FadeUp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
const HeroSection = ({ slides }) => {
  const [isHovered, setIsHovered] = useState(false);
  if (!slides || slides.length === 0) return null;
  return (
    <section
      className="relative w-full h-[480px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !bg-white/40 hover:!bg-white/70",
          bulletActiveClass: "!bg-black/100 !scale-150",
        }}
        speed={1000}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide._id}>
            <div className="relative h-full">
              <Image
                src={slide.image}
                alt={slide.title || "Hero slide"}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
              {}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
              {}
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
          </SwiperSlide>
        ))}
      </Swiper>
      {}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 24px !important;
        }
        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          margin: 0 4px !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 6px;
        }
          .bulletActiveClass {
            width: 24px;
            color: #fff;
            background: #000;
            border-radius: 10px;
          }
      `}</style>
    </section>
  );
};
export default HeroSection;
