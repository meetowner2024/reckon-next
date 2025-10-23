import { motion } from "framer-motion";
import React from "react";
import Ramakrishnagumma from "../../public/assets/images/Ramakrishnagumma.jpg";
import Ndevadas from "../../public/assets/images/Ndevadas.jpg";
console.log("Ndevadas ",Ndevadas )
import Likhithreddy from "../../public/assets/images/Likhithreddy.jpg";
import FadeUp from "./pages/FadeUp";

const Team = () => {
  // Team members data with local images
  const teamMembers = [
    {
      name: "Ramakrishna Gumma",
      title: "Founder",
      image: Ramakrishnagumma,
    },
    {
      name: "N. Devadas",
      title: "Managing Partner",
      image: Ndevadas,
    },
    {
      name: "Likhith Reddy",
      title: "Technical Head",
      image: Likhithreddy,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeUp delay={0}>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium max-w-max mx-auto">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Our Leadership Team
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The dedicated professionals driving innovation and excellence in
              uPVC manufacturing
            </p>
          </div>
        </FadeUp>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <FadeUp key={index} delay={index * 150}>
              <motion.div
                className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-square bg-gray-100">
                  <motion.img
                    src={member.image?.src}                 alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />

                  {/* Name overlay on hover */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 20 }}
                    whileHover={{ y: 0 }}
                  >
                    <h3 className="font-bold text-sm">{member.name}</h3>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-600 font-medium text-sm uppercase tracking-wide">
                      {member.title}
                    </span>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;