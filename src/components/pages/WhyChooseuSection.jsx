"use client";
import React, { useEffect, useState } from "react";
import {
  Factory,
  Wrench,
  Timer,
  Users,
  Star,
  Cog,
  Settings,
  Construction,
  Cpu,
  Rocket,
  CheckCircle,
} from "lucide-react";
const WhyChooseuSection = ({ features }) => {
  const icons = [
    Factory,
    Wrench,
    Timer,
    Users,
    Star,
    Cog,
    Settings,
    Construction,
    Cpu,
    Rocket,
    CheckCircle,
  ];

  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#000000] mb-10">
          Why Choose Us
        </h2>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.length > 0 ? (
            features.map((feature, index) => {
              const Icon =
                icons[index % icons.length] ||
                icons[Math.floor(Math.random() * icons.length)];
              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-20 h-20 flex items-center justify-center mb-6 rounded-2xl bg-gray-50 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                    <Icon className="h-10 w-10 text-[#0e55a1] transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                    {feature.description}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm">No features added yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};
export default WhyChooseuSection;
