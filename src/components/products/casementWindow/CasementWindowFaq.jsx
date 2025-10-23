import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CasementWindowFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqs = [
    { id: 0, category: 'basics', question: 'What is an uPVC Casement Window?', answer: 'A uPVC casement window, also known as a crank window, is a versatile, weather-resistant design for tall, narrow spaces.' },
    { id: 1, category: 'benefits', question: 'What Are the Key Benefits of uPVC Casement Windows?', answer: 'uPVC casement windows are fire- and pollution-resistant, with mosquito mesh for insect control. They also help conserve energy & reduce outside noise, creating a more comfortable living environment.' },
    { id: 2, category: 'features', question: 'What Sets uPVC Casement Windows Apart?', answer: 'uPVC casement windows from RECKON stand out due to their enhanced corner strength, improved insulation, and effective ventilation options.' },
    { id: 3, category: 'upgrade', question: 'How Can I Upgrade My Space with uPVC Casement Windows?', answer: 'You can enhance your space with Reckon\'s premium uPVC casement windows. For more information, Contact Us.' },
    { id: 4, category: 'comparison', question: 'Why Choose uPVC Over Wooden Windows?', answer: 'uPVC casement windows outshine traditional wooden windows with weather resistance, energy efficiency, soundproofing, encasement window option, low maintenance, and European standards compliance.' },
    { id: 5, category: 'security', question: 'How Does uPVC Casement Windows Enhance Home Security?', answer: 'uPVC casement windows from RECKON feature advanced locking systems and robust construction, offering improved security for your home or space.' },
  ];

  const categories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'basics', label: 'Basics' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'features', label: 'Features' },
    { id: 'upgrade', label: 'Upgrade' },
    { id: 'comparison', label: 'Comparison' },
    { id: 'security', label: 'Security' },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 text-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Parallax Background Elements */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div 
            className="absolute top-10 left-20 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl"
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          />
          <motion.div 
            className="absolute bottom-10 right-20 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl"
            animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          />
        </motion.div>

        {/* Header with Search and Categories */}
        <motion.div 
          className="text-center mb-16 z-10 relative"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <a href="#" className="text-blue-500 text-sm font-semibold hover:underline mb-2 inline-block">
            GET ANSWERS
          </a>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Things You Need To Know</h2>
          
          {/* Search Bar with Clear Button */}
          <div className="max-w-xl mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-gray-700 transition-all duration-300 shadow-md"
              />
              <Search className="absolute left-4 top-5 w-5 h-5 text-gray-400" />
              <AnimatePresence>
                {searchTerm && (
                  <motion.button
                    initial={{ opacity: 0, rotate: -180 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 180 }}
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                  selectedCategory === cat.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.1, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Chatbot-Style Bubble FAQ Layout */}
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatePresence mode="wait">
            {filteredFaqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.95 }}
                transition={{ 
                  delay: index * 0.1, 
                  type: 'spring', 
                  stiffness: 100, 
                  damping: 20 
                }}
                layout // Smooth reordering on filter
              >
                <motion.div 
                  className="relative max-w-md w-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Bubble Tail */}
                  <div 
                    className={`absolute top-4 w-0 h-0 border-t-8 border-b-8 border-transparent ${
                      index % 2 === 0 
                        ? 'left-0 -ml-3 border-r-8 border-r-gray-50' 
                        : 'right-0 -mr-3 border-l-8 border-l-gray-50'
                    }`}
                    style={{ 
                      borderStyle: 'solid', 
                      borderTopColor: 'transparent', 
                      borderBottomColor: 'transparent',
                    }}
                  />
                  
                  {/* FAQ Bubble */}
                  <motion.div 
                    className={`bg-gray-50 rounded-2xl shadow-md overflow-hidden transition-all duration-300 ${
                      openIndex === faq.id ? 'ring-2 ring-blue-300 shadow-lg' : 'ring-0'
                    }`}
                    onClick={() => toggleFAQ(faq.id)}
                    style={{ cursor: 'pointer' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="p-5 flex justify-between items-start">
                      <h3 className="text-base font-semibold text-gray-900 pr-4 flex-1">{faq.question}</h3>
                      <motion.div
                        animate={{ rotate: openIndex === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <ChevronDown className={`w-5 h-5 transition-colors ${
                          openIndex === faq.id ? 'text-blue-500' : 'text-blue-600'
                        } flex-shrink-0`} />
                      </motion.div>
                    </div>

                    {/* Inline Answer Expansion */}
                    <AnimatePresence>
                      {openIndex === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} // Smoother bezier ease
                          className="overflow-hidden border-t border-gray-200"
                        >
                          <div className="p-5 pt-4">
                            <motion.p 
                              className="text-sm leading-relaxed text-gray-700 whitespace-pre-line mb-3"
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1, duration: 0.3 }}
                            >
                              {faq.answer}
                            </motion.p>
                            <motion.a 
                              href="#" 
                              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.2, duration: 0.3 }}
                              whileHover={{ x: 2 }}
                            >
                              <span>Learn More</span>
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </motion.a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredFaqs.length === 0 && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-500 text-lg">No matching FAQs. Try a different search or category!</p>
          </motion.div>
        )}

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400 mx-auto animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
};

export default CasementWindowFaq;