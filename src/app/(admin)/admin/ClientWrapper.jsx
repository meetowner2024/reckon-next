"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ClientWrapper({ children }) {
  const contentRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = contentRef.current?.scrollTop || 0;
      setShowScrollTop(scrollTop > 200);
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (content) {
        content.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      ref={contentRef}
      className="flex-1 p-6 overflow-auto relative lg:ml-64"
    >
      {children}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-[#48ADB9] text-white p-3 rounded-full shadow-lg hover:bg-[#48a5af] cursor-pointer transition"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
