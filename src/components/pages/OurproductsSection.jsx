import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
const items = [
  {
    id: 1,
    name: "Casement Doors",
    imgQuery: "/products/casement-doors",
    images: [
      "/assets/images/CasementDoors1.jpg",
      "/assets/images/CasementDoors2.jpg",
      "/assets/images/CasementDoors3.jpg",
    ],
  },
  {
    id: 2,
    name: "Casement Windows",
    imgQuery: "/products/casement-windows",
    images: [
      "/assets/images/CasementWindows1.jpg",
      "/assets/images/CasementWindows2.jpg",
      "/assets/images/CasementWindows3.jpg",
    ],
  },
  {
    id: 3,
    name: "Sliding Doors",
    imgQuery: "/products/sliding-doors",
    images: [
      "/assets/images/SlidingDoors1.jpg",
      "/assets/images/SlidingDoors2.jpg",
      "/assets/images/SlidingDoors3.jpg",
    ],
  },
  {
    id: 5,
    name: "Sliding Windows",
    imgQuery: "/products/sliding-windows",
    images: [
      "/assets/images/SlidingWindows3.jpg",
      "/assets/images/SlidingWindows1.jpg",
      "/assets/images/SlidingWindows2.jpg",
      "/assets/images/SlidingWindows4.jpg",
    ],
  },
  {
    id: 6,
    name: "French Windows",
    imgQuery: "/products/french-windows",
    images: [
      "/assets/images/FrenchWindows2.jpg",
      "/assets/images/FrenchWindows1.jpg",
      "/assets/images/FrenchWindows3.jpg",
      "/assets/images/FrenchWindows4.jpg",
    ],
  },
];
const ImageCarousel = ({ images, currentIndex, onDotClick, onScroll }) => {
  const carouselRef = useRef(null);
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const handleWheel = (e) => {
      e.preventDefault();
      onScroll(e.deltaY);
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [onScroll]);
  return (
    <div className="relative" ref={carouselRef}>
      <div className="overflow-hidden rounded-t-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <Image
                src={image}
                alt={`${images[0].name} - ${index + 1}`}
                className="w-full h-55 object-cover"
                loading="lazy"
                width={500}
                height={300}
              />
            </div>
          ))}
        </div>
      </div>
      {}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 pointer-events-none">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => onDotClick(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 pointer-events-auto ${
                index === currentIndex
                  ? "bg-[#0e55a1] scale-125"
                  : "bg-[#f0f9ff] hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
export default function DoorsAndWindowsGallery() {
  const [activeIndexes, setActiveIndexes] = useState({});
  const handleDotClick = (itemId, index) => {
    setActiveIndexes((prev) => ({
      ...prev,
      [itemId]: index,
    }));
  };
  const handleScroll = (itemId, deltaY, totalImages) => {
    setActiveIndexes((prev) => {
      const current = prev[itemId] || 0;
      let newIndex = current;
      if (deltaY > 0) {
        newIndex = current + 1 >= totalImages ? 0 : current + 1;
      } else {
        newIndex = current - 1 < 0 ? totalImages - 1 : current - 1;
      }
      return { ...prev, [itemId]: newIndex };
    });
  };
  return (
    <section className="px-6 md:pt-8 sm:pt-6 pt-4 md:pb-12 sm:pb-8 pb-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#000000] mb-2">
          Our <span className="text-[#1e3a8a]">Products</span>
        </h2>
        <p className="text-gray-600 text-center text-lg md:text-lg font-200 mb-8">
          Scroll or click dots to navigate images. Hover to reveal view button.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const currentIndex = activeIndexes[item.id] || 0;
            return (
              <article
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {}
                <div className="relative">
                  <ImageCarousel
                    images={item.images}
                    currentIndex={currentIndex}
                    onDotClick={(index) => handleDotClick(item.id, index)}
                    onScroll={(deltaY) =>
                      handleScroll(item.id, deltaY, item.images.length)
                    }
                  />
                  {}
                  <div className="absolute inset-0 flex items-end justify-center p-4 pointer-events-none">
                    <Link
                      href={item.imgQuery}
                      className="pointer-events-auto mb-2 opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out"
                      aria-label={`Open ${item.name} page`}
                    >
                      <button className="bg-[#f0f9ff]/75 text-[#044182] backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400">
                        View {item.name}
                      </button>
                    </Link>
                  </div>
                </div>
                {}
                <div className="p-4">
                  <p className="text-xs text-gray-400 italic mb-1">
                    Images: {item.images.length} - {item.name}
                  </p>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mt-2 text-sm">
                    A brief description can go here. Replace with real content
                    as needed.
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
