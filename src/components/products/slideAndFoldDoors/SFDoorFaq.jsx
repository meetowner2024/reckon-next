import React from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const SFDoorFaq = () => {
  const faqs = [
    {
      question: "What is a uPVC slide and fold door?",
      answer:
        "Slide and fold doors, often known as bi-fold sliding doors, are folding & sliding glass doors that can be a key architectural element that distinguishes your home. Choosing to install Reckon.EXT uPVC sliding & folding doors will be a great addition to your house since they will help create a contemporary atmosphere for you to relax, play, and work in. They are, without a doubt, one of the most effective and beautiful ways to open up your home without sacrificing on the open space inside.",
    },
    {
      question: "How much do uPVC slide and fold doors cost?",
      answer:
        "The cost of the multi-slide doors will be well worth the investment when you consider the several benefits they provide. Reckon.EXT ensures you get aesthetically superior products along with precise installation, whether it is the sliding & folding wardrobe doors, a bi-fold sliding barn door, a 3-fold sliding door, or even an uPVC bi-fold or tri-fold folding & sliding patio door.",
    },
    {
      question: "Till what point uPVC slide and fold doors can open?",
      answer:
        "Reckon.EXT uPVC bi-fold sliding doors come with a variety of customization options. These doors can be opened to any width within the set frame. When compared to other door types, their ability to be opened out of or into a room and folded to the side provides a great deal of versatility. Furthermore, Reckon.EXT uPVC slide and fold doors are a perfect fit because they are made precisely with the calculated measurements of your fixtures in mind.",
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

export default SFDoorFaq;