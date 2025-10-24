"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Faqs({ faqs }) {
  if (!faqs?.length) return null;

  return (
    <section className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <a
          href="#"
          className="text-blue-500 text-sm font-semibold hover:underline mb-2 inline-block"
        >
          GET ANSWERS
        </a>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Things You Need To Know
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h3 className="text-base font-semibold text-gray-900 mb-3 leading-tight">
              {faq.question}
            </h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {faq.answer}
            </p>
            <a
              href="#"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Learn More <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
