"use client"
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaUserTie,
} from "react-icons/fa";

import HeaderSection from "@/components/pages/HeaderSection";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/pages/Footer";
import ContactSection from "@/components/pages/ContactSection";
import FadeUp from "@/components/pages/FadeUp";

export const Contact = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Contact Us" },
  ];

  const handleNavigate = (path) => {
    window.scrollTo(0, 0);
    window.location.href = path;
  };

  const pulse = {
    animate: {
      scale: [1, 1.1, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const contactItems = [
    {
      icon: <FaMapMarkerAlt className="w-7 h-7" />,
      title: "Visit Office",
      description: "You are most welcome to visit our office.",
      details:
        "H No: 10-158/1, New Venkateshwara Colony,\nJillellaguda, Gayatrinagar,\nHyderabad, Telangana - 500097.",
    },
    {
      icon: <FaPhoneAlt className="w-7 h-7" />,
      title: "Make a Call",
      description: "Keeping you always better connected.",
      details: "Service: +91 88860 77754\nService: +91 88860 77745",
    },
    {
      icon: <FaEnvelope className="w-7 h-7" />,
      title: "Send Email",
      description: "Drop us a mail, we’ll answer you ASAP.",
      details: "Service: reckonext@gmail.com",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <HeaderSection />

      {/* Banner with Breadcrumb */}
      <PageBanner title="Contact Us" subtitle="Get in touch with us today" />

      <section className="relative py-8 sm:py-12 md:py-16 lg:py-18 overflow-hidden bg-white text-gray-900">
        {/* Animated blue circles */}
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
          {/* Glass Card */}
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
              <motion.a
                href="tel:+918886077754"
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
                    +91 88860 77754
                  </p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:reckonext@gmail.com"
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
                    reckonext@gmail.com
                  </p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-9 sm:py-12 md:py-15 bg-gray-50 relative overflow-hidden">
        {/* Animated background circles */}
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
                {/* Animated background shapes */}
                <div className="absolute -top-8 -left-8 w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 rounded-full opacity-20 animate-spin-slow pointer-events-none"></div>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 sm:w-32 sm:h-32 bg-blue-200 rounded-full opacity-15 animate-ping-slow pointer-events-none"></div>

                {/* Icon with gradient pulse */}
                <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-[#0e55a1] to-[#0d4a8a] text-white shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <motion.div
                    variants={pulse}
                    animate="animate"
                    className="text-xl sm:text-2xl"
                  >
                    {item.icon}
                  </motion.div>
                </div>

                {/* Card Text */}
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

                {/* Animated bottom gradient line */}
                <span className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-[#0e55a1] to-[#0d4a8a] group-hover:w-1/2 transition-all duration-500 rounded-full"></span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Form Section */}
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3812.1348004710476!2d78.4713745!3d17.1636526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbbb5db50e2485%3A0x79b44a6c190497d8!2sPlastic%20Park%20Mankhal!5e0!3m2!1sen!2sin!4v1760690741289!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
            title="Reckonext Location Map"
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
