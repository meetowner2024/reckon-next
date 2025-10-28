"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const generateSlug = (title) =>
  "/" +
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
export default function DoorsAndWindowsGallery({ products, loading }) {
  const [error] = useState("");
  if (loading) {
    return (
      <section className="px-6 py-12 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-55 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return (
      <section className="px-6 py-12 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </section>
    );
  }
  return (
    <section className="px-6 md:pt-8 sm:pt-6 pt-4 md:pb-12 sm:pb-8 pb-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#000000] mb-2">
          Our <span className="text-[#1e3a8a]">Products</span>
        </h2>
        <p className="text-gray-600 text-center text-lg md:text-lg font-200 mb-8">
          Swipe, scroll, or click dots to navigate images. Hover to reveal view
          button.
        </p>
        {products.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No products available.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const images = product.banner || [];
              const slug = generateSlug(product.title);
              return (
                <article
                  key={product._id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative">
                    {images.length > 0 ? (
                      <Swiper
                        modules={[Navigation, Pagination, Mousewheel]}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={images.length > 1}
                        pagination={{
                          clickable: true,
                          dynamicBullets: false,
                          bulletActiveClass: "swiper-pagination-bullet-active",
                          bulletClass: "swiper-pagination-bullet",
                        }}
                        mousewheel={{ forceToAxis: true }}
                        className="h-55"
                      >
                        {images.map((image, index) => (
                          <SwiperSlide key={index}>
                            <Image
                              src={image}
                              alt={`${product.title} - image ${index + 1}`}
                              width={500}
                              height={300}
                              className="w-full h-55 object-cover"
                              loading="lazy"
                            />
                          </SwiperSlide>
                        ))}
                        {}
                      </Swiper>
                    ) : (
                      <div className="h-55 bg-gray-200 flex items-center justify-center rounded-t-2xl">
                        <span className="text-gray-500">No images</span>
                      </div>
                    )}
                    {}
                    <div className="absolute inset-0 flex items-end justify-center p-4 pointer-events-none">
                      <Link
                        href={`/products/${slug}/${product._id}`}
                        className="pointer-events-auto mb-2 opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out"
                        aria-label={`Open ${product.title} page`}
                      >
                        <button className="bg-[#f0f9ff]/75 text-[#044182] backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400">
                          View {product.title}
                        </button>
                      </Link>
                    </div>
                  </div>
                  {}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                      {product.subtitle ||
                        "Premium quality product with modern design and durability."}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
