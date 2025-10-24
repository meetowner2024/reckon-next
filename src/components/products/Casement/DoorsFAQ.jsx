import React from 'react';
import { 
  ArrowRight, 
  Phone, 
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const DoorsFAQ = () => {
  const faqs = [
    {
      question: 'What is a casement door, and how does it differ from other door types?',
      answer: "Casement doors open outwards like windows using a crank mechanism. Unlike sliding doors (horizontal) or French doors (inward swing), they provide maximum ventilation and a modern, seamless look."
    },
    {
      question: 'How does a uPVC openable door differ from traditional doors in performance and efficiency?',
      answer:
       "uPVC doors offer 75% better insulation, zero maintenance, and 25-year lifespan vs wood's 5-7 years. They save ₹15K/year on AC bills and never warp, rot, or need painting."
    },
    {
      question: 'Can you tell me more about "Rosandan" and its significance in casement door design?',
      answer:
       "Rosandan is our patented 16-point RC2 security lock system. It engages at top, bottom, and sides for burglar-proof protection. Certified by European standards - unique to Reckon doors."
    },
    {
      question: 'Are casement doors suitable for both residential and commercial applications?',
      answer:
       "Absolutely! Installed in 50K+ homes for elegance and 2K+ offices for soundproofing. Perfect for balconies, patios, showrooms, and apartments - adapts to any space."
    },
    {
      question: 'What are the advantages of choosing casement door uPVC for my home or business?',
      answer:
       "Weatherproof, soundproof (40dB reduction), UV-resistant, termite-proof, easy maintenance. Energy-efficient design cuts AC bills by 30% annually. Lifetime warranty included."
    },
    {
      question: 'Can I customise the design and features of a casement door to match my specific preferences?',
      answer: 
      "Yes! 200+ RAL colors, custom sizes up to 10ft, smart lock integration, double-glazing options. Design your dream door in 3D with our experts - free consultation."
    },
  ];

  return (
    <section className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* YOUR EXACT HEADER */}
        <div className="text-center mb-12">
          <a href="#" className="text-blue-500 text-sm font-semibold hover:underline mb-2 inline-block">
            GET ANSWERS
          </a>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Things You Need To Know</h2>
        </div>

        {/* ARROW BUTTONS - SIMPLE */}
        <div className="flex justify-center gap-4 mb-8">
          <motion.button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button className="p-2 text-blue-500 hover:bg-blue-50 rounded-full">
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* YOUR EXACT GRID - CLEAN */}
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
              <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
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

export default DoorsFAQ;