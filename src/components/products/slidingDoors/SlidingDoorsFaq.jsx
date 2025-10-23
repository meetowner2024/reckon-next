import React from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const SlidingDoorsFaq = () => {
  const faqs = [
    {
      question: "What is uPVC sliding door?",
      answer:
        "uPVC sliding doors from Reckon.EXT are the best option if you want to install sliding doors in your home but have less space. It offers noiseless, effortless and unhindered operation of sliding system. They maintain the internal temperature of the home and offer effective sound insulation. These sliding doors are fusion welded and designed with silicone sealant and laminated glass which makes them low-maintenance in nature.",
    },
    {
      question: "Are uPVC sliding doors good?",
      answer:
        "Reckon.EXT range of uPVC sliding doors is robust and requires little maintenance. They offer improved quality, noise insulation, sturdy construction and are energy efficient which makes them extremely good for use.",
    },
    {
      question: "What is a standard size of uPVC sliding door?",
      answer:
        "One of the most popular designs in uPVC sliding door is the Pocket door design. These are designed to hide the profile in the wall cavity when fully opened, giving an unobstructed view of the exterior. The standard uPVC sliding door includes a single track or a 2-track sliding mechanism.",
    },
    {
      question: "How much does a uPVC sliding door cost?",
      answer:
        "uPVC sliding doors from Reckon.EXT do not require much maintenance. These type of windows are robust and sturdy and offer a long life. uPVC sliding doors cost depends on the type of doors you choose, such as bypass, pocket or sliding French doors, as well as on the mesh, handles and colours etc. Get an accurate price quote for the actual cost of uPVC sliding doors based on your specific needs.",
    },
  ];

  return (
    <section className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
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

        <div className="flex justify-center gap-4 mb-8">
          <motion.button
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
            whileHover={{ scale: 1.1 }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
            whileHover={{ scale: 1.1 }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
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
                Learn More
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SlidingDoorsFaq;