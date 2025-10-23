import { useState } from "react";
import { ChevronDown } from "lucide-react";
import FadeUp from "./FadeUp";
import { motion } from "framer-motion";
const faqData = [
  {
    id: 1,
    question: "What are the benefits of uPVC windows and doors?",
    answer:
      "uPVC windows and doors offer excellent thermal insulation, are low maintenance, durable, weather-resistant, and provide superior noise reduction. They are also energy-efficient, helping to reduce heating and cooling costs.",
  },
  {
    id: 2,
    question: "How long do uPVC products last?",
    answer:
      "High-quality uPVC windows and doors can last 20-30 years or more with minimal maintenance. They are resistant to rot, corrosion, and fading, making them a long-term investment for your home.",
  },
  {
    id: 3,
    question: "Are uPVC products environmentally friendly?",
    answer:
      "Yes, uPVC is 100% recyclable and can be reprocessed multiple times without losing quality. The energy efficiency of uPVC products also helps reduce your carbon footprint by lowering energy consumption.",
  },
  {
    id: 4,
    question: "Do you offer customization options?",
    answer:
      "Absolutely! We offer a wide range of customization options including different colors, finishes, hardware styles, and glass types. Our team can work with you to create products that match your specific design preferences.",
  },
  {
    id: 5,
    question: "What is the installation process like?",
    answer:
      "Our professional installation team handles the entire process from measurement to final installation. We ensure minimal disruption to your daily routine and complete most installations within a day, depending on the scope of the project.",
  },
  {
    id: 6,
    question: "Do you provide warranty coverage?",
    answer:
      "Yes, we offer comprehensive warranty coverage on all our products. Our standard warranty covers manufacturing defects and performance issues, giving you peace of mind with your investment.",
  },
];
const FAQSection = () => {
  const [openId, setOpenId] = useState(null);
  const toggleFAQ = (id) => {
    setOpenId(openId === id ? null : id);
  };
  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-10 relative">
      <div className="container mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0e55a1]/5 to-transparent"></div>
        </div>
        <div className="relative">
          <FadeUp delay={100}>
            <div className="text-center mb-12 md:mb-16 relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#000000] mb-4 relative inline-block">
                Frequently Asked Questions
                <span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-[#0e55a1] transform scale-x-0 transition-transform duration-500 ease-out origin-left animate-in"
                  style={{ animation: "slide-in 0.8s forwards 0.5s" }}
                ></span>
              </h2>
              <p className="text-base sm:text-lg text-[#7c7978] mt-2 max-w-2xl mx-auto">
                Find answers to common questions about our uPVC products and
                services
              </p>
            </div>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-5xl mx-auto relative z-10">
            {faqData.map((faq, index) => (
              <FadeUp key={faq.id} delay={200 + index * 100}>
                <div
                  className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out hover:shadow-2xl hover:-translate-y-1 ${
                    openId === faq.id
                      ? "ring-2 ring-[#0e55a1] shadow-2xl border-0"
                      : "border border-gray-200"
                  }`}
                  style={{
                    animation: `fade-up 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
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
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      openId === faq.id
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="p-5 sm:p-6 pt-0 text-[#7c7978] text-sm sm:text-base leading-relaxed border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-400">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
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
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-in {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
};
export default FAQSection;
