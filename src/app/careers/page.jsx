"use client"
import PageBanner from "@/components/PageBanner";
import FadeUp from "@/components/pages/FadeUp";
import Footer from "@/components/pages/Footer";
import HeaderSection from "@/components/pages/HeaderSection";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";


// Dummy JSON data for form fields
const formFields = [
  {
    id: "1",
    name: "full_name",
    label: "Full Name",
    type: "text",
    required: true,
    placeholder: "John Doe",
  },
  {
    id: "2",
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "john@company.com",
  },
  {
    id: "3",
    name: "phone",
    label: "Phone",
    type: "tel",
    required: false,
    placeholder: "+1 (555) 000-0000",
  },
  {
    id: "4",
    name: "resume",
    label: "Resume",
    type: "file",
    required: false,
    placeholder: "Link to resume or description (optional)",
  },
  {
    id: "5",
    name: "description",
    label: "We’d love to know what excites you about Reckon?",
    type: "textarea",
    required: true,
    placeholder: "What excites you about our company? Which role interests you most?",
    rows: 5,
  },
];

export const Career = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setMessage] = useState("");
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Design Lead",
      quote: "Crafting sustainable uPVC designs is rewarding. The team’s innovation inspires me daily.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Rahul Verma",
      role: "Production Manager",
      quote: "Our collaborative culture drives cutting-edge solutions for India’s homes.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Anita Rao",
      role: "Sales Executive",
      quote: "Working here feels like family. Every project fuels my passion for excellence.",
      image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Simulate API call
    try {
      console.log("Form Data Submitted:", formData);
      setMessage("Application submitted successfully!");
      setFormData({});
      e.target.reset();
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminPanel = () => {
    setShowAdminPanel((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-white">
      <HeaderSection />
      <PageBanner title="Careers" subtitle="Leading the industry with innovation and quality" />

      {/* Admin Panel Toggle (for demo purposes) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <button
          onClick={toggleAdminPanel}
          className="px-4 py-2 bg-[#0e55a1] text-white rounded-lg"
        >
          {showAdminPanel ? "Hide Admin Panel" : "Show Admin Panel"}
        </button>
      </div>

      {/* Admin Panel */}
      {/* {showAdminPanel && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 my-4">
          <h2 className="text-2xl font-bold text-[#0e55a1] mb-4">Admin Panel</h2>
          <EditCareers formFields={formFields} />
          <UpdateCareers formFields={formFields} />
          <DeleteCareers formFields={formFields} />
        </div>
      )} */}

      {/* Application Form Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0e55a1]/3 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <FadeUp delay={0}>
              <motion.h1
                variants={itemVariants}
                className="text-3xl md:text-5xl font-bold text-[#0e55a1] mb-6 leading-tight"
              >
                Ready to Build the Future?
              </motion.h1>
            </FadeUp>
            <FadeUp delay={100}>
              <motion.p
                variants={itemVariants}
                className="text-lg text-[#000000]/70 mb-6"
              >
                Join 200+ innovators shaping tomorrow. We're hiring passionate
                talent across engineering, design, and product.
              </motion.p>
            </FadeUp>
            <FadeUp delay={200}>
              <motion.h2
                className="text-2xl sm:text-4xl font-semi-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0e55a1] to-[#000000] mb-8 tracking-tight"
                whileHover={{ scale: 1.03 }}
              >
                Application
              </motion.h2>
            </FadeUp>
          </motion.div>

          {/* Dynamic Application Form */}
          <FadeUp delay={300}>
            <motion.form
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 lg:p-10 border border-[#0e55a1]/10 shadow-lg"
              onSubmit={handleSubmit}
            >
              <p className="text-lg text-[#000000]/70 mb-8">
                Tell us about yourself. We'll get back to you within 48 hours.
              </p>

              {successMessage && (
                <p
                  className={`text-center mb-4 ${
                    successMessage.includes("successfully")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {successMessage}
                </p>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {formFields.map((field) => (
                  <motion.div key={field.id} whileHover={{ scale: 1.02 }}>
                    {field.type === "textarea" ? (
                      <>
                        <label className="block text-sm font-bold text-[#000000] mb-3">
                          {field.label} {field.required ? "*" : ""}
                        </label>
                        <textarea
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 rounded-xl border-2 border-[#0e55a1]/20 text-[#000000] focus:border-[#0e55a1] focus:outline-none transition-all duration-300 resize-none bg-white/50"
                          placeholder={field.placeholder}
                          required={field.required}
                          rows={field.rows || 5}
                        />
                      </>
                    ) : (
                      <>
                        <label className="block text-sm font-bold text-[#000000] mb-3">
                          {field.label} {field.required ? "*" : ""}
                          {field.name === "resume" && (
                            <span className="text-xs text-[#0e55a1]">(Optional)</span>
                          )}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={handleInputChange}
                          className="w-full px-3 py-3 rounded-xl border-2 border-[#0e55a1]/20 text-[#000000] focus:border-[#0e55a1] focus:outline-none transition-all duration-300 bg-white/50"
                          placeholder={field.placeholder}
                          required={field.required}
                        />
                      </>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-2 bg-gradient-to-r from-[#0e55a1] to-[#000000] text-white font-semibold text-base rounded-lg shadow-md hover:shadow-lg transition-all duration-300 mt-6"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </motion.button>
            </motion.form>
          </FadeUp>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-10 bg-gradient-to-b from-[#0e55a1]/5 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp delay={0}>
            <motion.h2
              variants={itemVariants}
              className="text-4xl font-black text-[#000000] text-center mb-4"
            >
              Why Join Us?
            </motion.h2>
          </FadeUp>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-3 mt-6"
          >
            {[
              { icon: "💡", title: "Innovate", desc: "Work on cutting-edge projects" },
              { icon: "🌍", title: "Global", desc: "Collaborate with 50+ countries" },
              { icon: "🚀", title: "Growth", desc: "Unlimited career advancement" },
              { icon: "⚖️", title: "Balance", desc: "Flexible work, unlimited PTO" },
              { icon: "🏆", title: "Impact", desc: "Shape products for millions" },
              { icon: "💰", title: "Rewards", desc: "Competitive pay + equity" },
            ].map((benefit, i) => (
              <FadeUp key={i} delay={i * 100}>
                <motion.div variants={itemVariants} className="text-center p-4">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-[#000000] mb-3">{benefit.title}</h3>
                  <p className="text-[#000000]/70">{benefit.desc}</p>
                </motion.div>
              </FadeUp>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 bg-gradient-to-b from-white to-[#0e55a1]/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl font-bold text-[#0e55a1] text-center mb-4"
          >
            Our Team Speaks
          </motion.h2>
          <div className="relative">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="overflow-hidden"
            >
              <motion.div
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex"
              >
                {testimonials.map((testimonial, i) => (
                  <FadeUp key={i} delay={i * 50}>
                    <motion.div variants={itemVariants} className="min-w-full p-2">
                      <div className="bg-white rounded-lg border border-[#0e55a1]/10 shadow-sm p-4 text-center mx-auto max-w-sm">
                        <img
                          src={testimonial.image}
                          alt={`${testimonial.name}'s portrait`}
                          className="w-14 h-14 mx-auto mb-2 rounded-full object-cover"
                        />
                        <p className="text-xs text-gray-600 italic mb-2 line-clamp-2">
                          "{testimonial.quote}"
                        </p>
                        <p className="text-sm font-semibold text-[#0e55a1]">{testimonial.name}</p>
                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                      </div>
                    </motion.div>
                  </FadeUp>
                ))}
              </motion.div>
            </motion.div>
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
              }
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-1 bg-[#0e55a1] text-white rounded-full shadow-md hover:bg-[#0c4a8e] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
              }
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 bg-[#0e55a1] text-white rounded-full shadow-md hover:bg-[#0c4a8e] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={14} />
            </button>
            <div className="flex justify-center mt-3 gap-1">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full ${
                    currentIndex === i ? "bg-[#0e55a1]" : "bg-gray-300"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Career;