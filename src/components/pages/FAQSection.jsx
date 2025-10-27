
"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import FadeUp from "@/components/pages/FadeUp";

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch("/api/users/faqs");
        if (!res.ok) throw new Error("Failed to fetch FAQs");
        const data = await res.json();
        setFaqs(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggleFAQ = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-10 relative">
      <div className="container mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <FadeUp delay={100}>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#000000] mb-4 relative inline-block">
                Frequently Asked Questions
              </h2>
              <p className="text-base sm:text-lg text-[#7c7978] mt-2 max-w-2xl mx-auto">
                Find answers to common questions about our uPVC products and
                services
              </p>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto">
            {loading ? (
              <p className="col-span-2 text-center text-gray-500">
                Loading FAQs...
              </p>
            ) : error ? (
              <p className="col-span-2 text-center text-red-600">{error}</p>
            ) : faqs.length > 0 ? (
              faqs.map((faq, index) => (
                <FadeUp key={faq.id} delay={200 + index * 100}>
                  <div
                    className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-1 ${
                      openId === faq.id
                        ? "ring-2 ring-[#0e55a1] shadow-2xl border-0"
                        : "border border-gray-200"
                    }`}
                  >
                    {/* Header */}
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full flex items-center justify-between p-3 sm:p-4 text-left bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group"
                    >
                      <span className="font-semibold text-[#000000] text-base sm:text-lg pr-3 group-hover:text-[#0e55a1] transition-colors">
                        {faq.question}
                      </span>
                      <span className="flex-shrink-0 text-[#0e55a1] transform transition-transform duration-300 group-hover:rotate-180">
                        <ChevronDown
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            openId === faq.id ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    {/* Body – animated height */}
                    <div
                      className={`grid transition-all duration-500 ease-in-out ${
                        openId === faq.id
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="p-5 sm:p-6 pt-0 text-[#7c7978] text-sm sm:text-base leading-relaxed border-t border-gray-100">
                          {faq.answer}
                        </div>
                      </div>
                    </div>

                    {/* Subtle animated ring when open */}
                    {openId === faq.id && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl pointer-events-none opacity-10"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.1 }}
                        transition={{ duration: 0.3 }}
                        style={{
                          boxShadow: "0 0 0 2px rgba(14, 85, 161, 0.3)",
                        }}
                      />
                    )}
                  </div>
                </FadeUp>
              ))
            ) : (
              <p className="col-span-2 text-center text-gray-500">
                No FAQs added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;