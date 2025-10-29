"use client";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import HeaderSection from "@/components/pages/HeaderSection";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/pages/Footer";
import ContactSection from "@/components/pages/ContactSection";
import FadeUp from "@/components/pages/FadeUp";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function Contact() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const footer = useSelector((state) => state.footer);
  const projects = useSelector((state) => state.projects.projectsDropdown);
  const header = useSelector((state) => state.header.header);
  useEffect(() => {
    fetch("/api/users/contactus/contact", {
      cache: "force-cache",
      next: { revalidate: 3600 },
    })
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);
  const pulse = {
    animate: {
      scale: [1, 1.1, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };
  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#0e55a1]"></div>
      </div>
    );
  }
  const { office, phones = [], emails = [] } = data;
  const contactItems = [
    {
      icon: <FaMapMarkerAlt className="w-7 h-7" />,
      title: office?.title || "Visit Office",
      description: office?.description || "",
      details: office?.address || "",
    },
    {
      icon: <FaPhoneAlt className="w-7 h-7" />,
      title: "Make a Call",
      description: "Keeping you always better connected.",
      details: phones.map((p) => `${p.label}: ${p.number}`).join("\n"),
    },
    {
      icon: <FaEnvelope className="w-7 h-7" />,
      title: "Send Email",
      description: "Drop us a mail, we’ll answer you ASAP.",
      details: emails.map((e) => `${e.label}: ${e.address}`).join("\n"),
    },
  ];
  const firstPhone = phones[0];
  const firstEmail = emails[0];
  return (
    <div className="relative overflow-hidden">
      <HeaderSection
        projectsDropdown={projects}
        logo={header.logo}
        phone={header.phone}
      />
      <PageBanner title="Contact Us"  />
      {}
      <section className="relative py-8 sm:py-12 md:py-16 lg:py-18 overflow-hidden bg-white text-gray-900">
        <motion.div
          className="absolute -top-16 -left-16 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-[#0e55a1]/10 rounded-full"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-16 -right-16 w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-[#0e55a1]/10 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative bg-white shadow-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-center mx-auto"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 text-gray-900 drop-shadow-lg">
              Connect With Us Anytime
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#0e55a1]/80 mb-6 sm:mb-8">
              Reach out via office visit, call, or email. Our team in Hyderabad
              is eager to assist!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {firstPhone && (
                <motion.a
                  href={
                    firstPhone.tel ||
                    `tel:${firstPhone.number.replace(/[^0-9+]/g, "")}`
                  }
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  whileHover={{ scale: 1.05, rotateX: 2, rotateY: 2 }}
                  className="flex items-center space-x-3 sm:space-x-4 bg-[#0e55a1] text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300"
                >
                  <motion.div
                    variants={pulse}
                    animate="animate"
                    className="text-2xl sm:text-3xl"
                  >
                    <FaPhoneAlt />
                  </motion.div>
                  <div className="text-left">
                    <p className="font-semibold text-sm sm:text-base">
                      24/7 Support
                    </p>
                    <p className="text-xs sm:text-sm opacity-80">
                      {firstPhone.number}
                    </p>
                  </div>
                </motion.a>
              )}
              {firstEmail && (
                <motion.a
                  href={firstEmail.mailto || `mailto:${firstEmail.address}`}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{ scale: 1.05, rotateX: 2, rotateY: 2 }}
                  className="flex items-center space-x-3 sm:space-x-4 bg-[#0e55a1] text-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg cursor-pointer hover:opacity-90 hover:shadow-2xl transition-all duration-300"
                >
                  <motion.div
                    variants={pulse}
                    animate="animate"
                    className="text-2xl sm:text-3xl"
                  >
                    <FaEnvelope />
                  </motion.div>
                  <div className="text-left">
                    <p className="font-semibold text-sm sm:text-base">
                      Dedicated Team
                    </p>
                    <p className="text-xs sm:text-sm opacity-80">
                      {firstEmail.address}
                    </p>
                  </div>
                </motion.a>
              )}
            </div>
          </motion.div>
        </div>
      </section>
      {}
      <section className="py-9 sm:py-12 md:py-15 bg-gray-50 relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 bg-blue-200 rounded-full opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-8 -right-8 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-300 rounded-full opacity-15 animate-pulse-slow"></div>
        <div className="max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 relative z-10">
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.06,
                  rotateX: 2,
                  rotateY: 2,
                  transition: { type: "spring", stiffness: 120 },
                }}
                animate={{
                  y: [0, -5, 0],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                className="relative group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-transparent hover:border-blue-400 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute -top-8 -left-8 w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 rounded-full opacity-20 animate-spin-slow pointer-events-none"></div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 sm:w-32 sm:h-32 bg-blue-200 rounded-full opacity-15 animate-ping-slow pointer-events-none"></div>
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-[#0e55a1] to-[#0d4a8a] text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <motion.div
                    variants={pulse}
                    animate="animate"
                    className="text-xl sm:text-2xl"
                  >
                    {item.icon}
                  </motion.div>
                </div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-lg sm:text-xl font-bold text-[#0e55a1] text-center mb-2 sm:mb-3"
                >
                  {item.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.3 }}
                  className="text-gray-600 text-center mb-3 sm:mb-4 text-sm sm:text-base"
                >
                  {item.description}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.4 }}
                  className="text-gray-500 text-center whitespace-pre-line text-xs sm:text-sm leading-relaxed"
                >
                  {item.details}
                </motion.p>
                <span className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#0e55a1] to-[#0d4a8a] group-hover:w-1/2 transition-all duration-500 rounded-full"></span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="mb-10 max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp delay={200}>
            <div className="w-full max-w-7xl">
              <ContactSection />
            </div>
          </FadeUp>
        </div>
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto h-[300px] sm:h-[400px] md:h-[450px]">
          <iframe
            src={office?.mapUrl || ""}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
            title="Company Location Map"
          />
        </div>
      </section>
      <Footer footer={footer.footerData} projects={projects} />
    </div>
  );
}
