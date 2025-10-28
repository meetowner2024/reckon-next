"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    const fetchImages = async () => {
      try {
        const cached = sessionStorage.getItem("gallery_cache");
        if (cached) {
          setImages(JSON.parse(cached));
          setLoading(false);
          return;
        }
        const res = await fetch("/api/users/gallery", {
          next: { revalidate: 300 },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setImages(data);
        sessionStorage.setItem("gallery_cache", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to load gallery:", error);
      } finally {
        setLoading(false);
        hasFetched.current = true;
      }
    };
    fetchImages();
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }
  if (images.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        No images in gallery yet. Upload from admin panel.
      </div>
    );
  }
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Our Gallery
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={{ clickable: true }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          className="relative overflow-hidden rounded-2xl shadow-xl"
        >
          {images.map((img, index) => (
            <SwiperSlide key={img._id}>
              <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
                <Image
                  src={img.url}
                  alt={img.title || "Gallery image"}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
