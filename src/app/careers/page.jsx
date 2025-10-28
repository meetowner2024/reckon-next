"use client";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/pages/Footer";
import HeaderSection from "@/components/pages/HeaderSection";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
export default function Career() {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [submitMsg, setSubmitMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
   const footer = useSelector((state) => state.footer);
    const projects=useSelector((state)=>state.projects.projectsDropdown)
        const header=useSelector((state)=>state.header.header)
  useEffect(() => {
    fetch("/api/users/careers")
      .then((r) => r.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMsg("");

    try {
      // Prepare FormData for multipart/form-data
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const res = await fetch("/api/users/careers/applications", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await res.json();

      if (res.ok) {
        setSubmitMsg("✅ Application submitted successfully!");
        setFormData({});
        e.target.reset();
      } else {
        setSubmitMsg(result.message || "❌ Submission failed. Try again.");
      }
    } catch (error) {
      console.error("❌ Submit error:", error);
      setSubmitMsg("❌ Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !config) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#0e55a1]"></div>
      </div>
    );
  }
  const {
    formTitle = "Application",
    formFields = [],
    benefits = [],
    testimonials = [],
  } = config;
  return (
    <div className="min-h-screen bg-white">
      <HeaderSection projectsDropdown={projects}   logo={header.logo}
        phone={header.phone}/>
      <PageBanner
        title="Careers"
        subtitle="Leading the industry with innovation and quality"
      />
      {}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0e55a1]/3 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-5xl font-bold text-[#0e55a1] mb-6"
            >
              Ready to Build the Future?
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg text-[#000000]/70 mb-6"
            >
              Work with a team that values creativity and growth.
            </motion.p>
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#0e55a1] to-[#000000] mb-8"
            >
              {formTitle}
            </motion.h2>
          </motion.div>
          <motion.form
            variants={itemVariants}
            className="bg-white rounded-2xl p-8 lg:p-10 border border-[#0e55a1]/10 shadow-lg"
            onSubmit={handleSubmit}
          >
            <p className="text-lg text-[#000000]/70 mb-8">
              Tell us about yourself. We'll get back to you within 48 hours.
            </p>
            {submitMsg && (
              <p
                className={`text-center mb-4 ${
                  submitMsg.includes("success")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {submitMsg}
              </p>
            )}
            <div className="grid md:grid-cols-2 gap-6">
              {formFields.map((field) => (
                <motion.div key={field.id} whileHover={{ scale: 1.02 }}>
                  {field.type === "textarea" ? (
                    <>
                      <label className="block text-sm font-bold text-[#000000] mb-3">
                        {field.label} {field.required && "*"}
                      </label>
                      <textarea
                        name={field.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 rounded-xl border-2 border-[#0e55a1]/20 text-[#000000] focus:border-[#0e55a1] focus:outline-none transition-all duration-300 resize-none bg-white/50"
                        placeholder={field.placeholder}
                        required={field.required}
                        rows={field.rows || 5}
                      />
                    </>
                  ) : field.type === "file" ? (
                    <>
                      <label className="block text-sm font-bold text-[#000000] mb-3">
                        {field.label} {field.required && "*"}
                      </label>
                      <input
                        type="file"
                        name={field.name}
                        onChange={handleInputChange} // ← add this
                        className="w-full px-3 py-3 rounded-xl border-2 border-[#0e55a1]/20 text-[#000000] focus:border-[#0e55a1] focus:outline-none transition-all duration-300 bg-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#0e55a1] file:text-white hover:file:bg-[#0d4a8a]"
                        accept=".pdf,.doc,.docx"
                      />
                    </>
                  ) : (
                    <>
                      <label className="block text-sm font-bold text-[#000000] mb-3">
                        {field.label} {field.required && "*"}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
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
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Application"}
            </motion.button>
          </motion.form>
        </div>
      </section>
      {}
      <section className="py-10 bg-gradient-to-b from-[#0e55a1]/5 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-black text-[#000000] text-center mb-4"
          >
            Why Join Us?
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-3 mt-6"
          >
            {benefits.map((b, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="text-center p-4"
              >
                <div className="text-4xl mb-4">{b.icon}</div>
                <h3 className="text-xl font-bold text-[#000000] mb-3">
                  {b.title}
                </h3>
                <p className="text-[#000000]/70">{b.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
     <Footer footer={footer.footerData} projects={projects}/>
    </div>
  );
}
