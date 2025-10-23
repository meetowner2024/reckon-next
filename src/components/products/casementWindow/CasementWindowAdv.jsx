import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Zap, Volume2, Shield, Leaf, Sun, Bug, Wrench } from "lucide-react";
import quality from "../../../../public/assets/images/quality.png";
import house from "../../../../public/assets/images/house.png";
import verification from '../../../../public/assets/images/verification.png';
import mute from '../../../../public/assets/images/mute.png';
import eco from '../../../../public/assets/images/eco.jpg'
import maintanence from '../../../../public/assets/images/maintanence.jpg'
import fungal from '../../../../public/assets/images/fungal.jpg'
import uvHouse from '../../../../public/assets/images/uv-house.jpeg'

const advantages = [
  { 
    id: 1, 
    title: "Weather Proof", 
    description: "Reliarik weatherproofing for lasting protection.", 
    Icon: Zap,
    image: verification, 
  },
  { 
    id: 2, 
    title: "Sound Proofing", 
    description: "Seal gaps, reduce noise effectively.", 
    Icon: Volume2,
    image: mute,
  },
  { 
    id: 3, 
    title: "Strength & Durability", 
    description: "Unrivaled strength for lasting performance.", 
    Icon: Shield,
    image: quality,
  },
  { 
    id: 4, 
    title: "Eco Friendly", 
    description: "Sustainable solutions without compromise.", 
    Icon: Leaf,
    image: eco,
  },
  { 
    id: 5, 
    title: "UV Resistant", 
    description: "Protection against harmful UV rays.", 
    Icon: Sun,
    image: uvHouse,
  },
  { 
    id: 6, 
    title: "Anti-Fungal", 
    description: "Protection from fungi and termites.", 
    Icon: Bug,
    image: fungal,
  },
  { 
    id: 7, 
    title: "Easy Maintenance", 
    description: "Simple care, durable materials.", 
    Icon: Wrench,
    image: maintanence,
  },
];

const CasementWindowAdv = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerViewDesktop = 4;
  const cardsPerViewTablet = 3;
  const cardsPerViewMobile = 1;
  const totalCards = advantages.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCards);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalCards]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalCards - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalCards);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < totalCards; i++) {
      cards.push(advantages[(currentIndex + i) % totalCards]);
    }
    return cards;
  };

  const visibleAdvantages = getVisibleCards();

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-cyan-50 py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-extrabold rounded-full mb-5 shadow-xl animate-pulse">
            Modern Advantages
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-gray-800 to-blue-700 bg-clip-text text-transparent leading-snug tracking-tight">
            Casement Windows
          </h2>
          <p className="mt-3 text-gray-600 text-lg font-medium">Discover cutting-edge features in a sleek design</p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-2xl bg-white/50 backdrop-blur-md border border-white/20">
            <div className="flex transition-transform duration-1000 ease-in-out">
              {/* Desktop: Show 4 cards */}
              <div className="hidden lg:flex w-full flex-shrink-0">
                {visibleAdvantages.slice(0, cardsPerViewDesktop).map((adv, idx) => (
                  <div key={`${adv.id}-${idx}`} className="w-1/4 px-3 py-4">
                    <AdvCard adv={adv} />
                  </div>
                ))}
              </div>
              {/* Tablet: Show 3 cards */}
              <div className="hidden md:flex lg:hidden w-full flex-shrink-0">
                {visibleAdvantages.slice(0, cardsPerViewTablet).map((adv, idx) => (
                  <div key={`${adv.id}-${idx}`} className="w-1/3 px-3 py-4">
                    <AdvCard adv={adv} />
                  </div>
                ))}
              </div>
              {/* Mobile: Show 1 card */}
              <div className="md:hidden w-full flex-shrink-0">
                <div className="px-3 py-4">
                  <AdvCard adv={visibleAdvantages[0]} />
                </div>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center space-x-4 mt-8">
            {[...Array(totalCards)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-4 h-4 rounded-full transition-all duration-500 shadow-md border-2 border-transparent ${
                  currentIndex === i 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 scale-150 shadow-cyan-500/50' 
                    : 'bg-white/80 hover:bg-cyan-100/80 border-cyan-200/50'
                }`}
              />
            ))}
          </div>

          {/* Arrows - Refined: Smaller, Subtler, Smoother Animations */}
          <button 
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md rounded-full p-2.5 shadow-md hover:shadow-lg border border-gray-200/50 hover:border-cyan-300/70 transition-all duration-200 ease-linear hover:scale-110 z-10 group hidden sm:block"
          >
            <ChevronLeft className="w-5 h-5 text-cyan-600 group-hover:text-blue-700 transition-colors duration-200" />
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md rounded-full p-2.5 shadow-md hover:shadow-lg border border-gray-200/50 hover:border-cyan-300/70 transition-all duration-200 ease-linear hover:scale-110 z-10 group hidden sm:block"
          >
            <ChevronRight className="w-5 h-5 text-cyan-600 group-hover:text-blue-700 transition-colors duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

const AdvCard = ({ adv }) => {
  const { Icon } = adv;
  return (
    <div className="group relative bg-white rounded-2xl p-6 h-full transition-all duration-300 ease-out border border-gray-100 shadow-md hover:shadow-xl hover:border-cyan-200/50 hover:-translate-y-1">
      {/* Image Container with Modern Glow */}
      <div className="relative overflow-hidden rounded-xl mb-5 h-40 flex items-center justify-center bg-gradient-to-br from-gray-50 to-cyan-50/50 shadow-inner">
        <img 
          src={adv.image?.src} 
          alt={adv.title} 
          className="w-32 h-32 object-contain transition-transform duration-500 ease-out group-hover:scale-115 group-hover:rotate-2 filter drop-shadow-md" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 rounded-xl ring-0 group-hover:ring-2 ring-cyan-400/10 transition-all duration-300" />
      </div>

      <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform group-hover:scale-110 group-hover:rotate-6">
        <Icon className="w-6 h-6 text-white drop-shadow-md" />
        <div className="absolute inset-0 rounded-full bg-cyan-400/30 blur-md animate-pulse opacity-75" />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-gray-800 text-lg leading-tight group-hover:text-cyan-600 transition-colors duration-300 tracking-wider">
          {adv.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed font-semibold">
          {adv.description}
        </p>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 ease-out group-hover:w-full rounded-b-2xl" />
    </div>
  );
};

export default CasementWindowAdv;