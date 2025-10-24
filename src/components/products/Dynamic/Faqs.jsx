"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
export default function Faqs({ product }) {
  const [openIndex, setOpenIndex] = useState(null);
  if (!product?.faqs?.length) return null;
  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };
  return (
    <section className="py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white via-blue-50/30 to-white">
      <div className="max-w-7xl mx-auto">
        {}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 bg-linear-to-r from-blue-600 to-indigo-700 text-White rounded-full text-sm font-bold shadow-lg mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            FAQ
          </motion.div>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extralight text-gray-900 leading-tight"
          >
            Things You Need To Know
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-light"
          >
            Get instant answers to the most common questions about our{" "}
            {product.title}.
          </motion.p>
        </div>
        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {product.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group"
              >
                <div onClick={() => toggle(idx)} className="cursor-pointer">
                  {}
                  <div
                    className={`relative overflow-hidden rounded-3xl transition-all duration-300 ${
                      isOpen
                        ? "bg-linear-to-br from-blue-600/10 to-indigo-700/10 ring-2 ring-blue-200 shadow-xl"
                        : "bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {}
                    <div className="p-6 lg:p-8 flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className={`p-2 rounded-xl transition-colors ${
                              isOpen
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 group-hover:bg-blue-100"
                            }`}
                          >
                            <HelpCircle className="w-5 h-5" />
                          </div>
                          <span
                            className={`text-sm font-bold uppercase tracking-wider ${
                              isOpen ? "text-blue-700" : "text-gray-500"
                            }`}
                          >
                            Question {idx + 1}
                          </span>
                        </div>
                        <h3
                          className={`text-lg lg:text-xl font-semibold transition-colors pr-8 ${
                            isOpen
                              ? "text-gray-900"
                              : "text-gray-800 group-hover:text-gray-900"
                          }`}
                        >
                          {faq.question}
                        </h3>
                      </div>
                      {}
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`p-2 rounded-full transition-colors ${
                          isOpen
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600 group-hover:bg-blue-100"
                        }`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </div>
                    {}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                            <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent mb-5" />
                            <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                              {faq.answer}
                            </p>
                            <motion.a
                              href="#"
                              whileHover={{ x: 5 }}
                              className="inline-flex items-center gap-2 mt-5 text-blue-600 hover:text-blue-800 font-medium text-sm"
                            >
                              Learn More
                              <ArrowRight className="w-4 h-4" />
                            </motion.a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Still Have Questions?
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
