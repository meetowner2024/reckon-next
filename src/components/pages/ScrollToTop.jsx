"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {visible && (
        <div className="flex justify-center items-center">
         
        <button className="flex"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            padding: "10px 15px",
            background: "#000",
            color: "#fff",
            borderRadius: "50px",
            border: "none",
            cursor: "pointer",
            zIndex: 999,
            fontSize: "14px",
          }}
        >          
          <ArrowUp size={18} />
        </button>
        </div>
      )}
    </>
  );
}
