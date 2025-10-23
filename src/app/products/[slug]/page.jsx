"use client";

import PageBanner from "@/components/PageBanner";
import Footer from "@/components/pages/Footer";
import HeaderSection from "@/components/pages/HeaderSection";
import AboutCasementDoor from "@/components/products/Casement/AboutCasementDoor";
import AdvantagesDoors from "@/components/products/Casement/AdvantagesDoors";
import DoorsFAQ from "@/components/products/Casement/DoorsFAQ";
import AboutSlidingDoors from "@/components/products/slidingDoors/AboutSlidingDoors";
import SlidingDoorAdv from "@/components/products/slidingDoors/SlidingDoorAdv";
import SlidingDoorsFaq from "@/components/products/slidingDoors/SlidingDoorsFaq";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";


// Dynamically import components (so only relevant ones load)
// const AboutCasementDoor = dynamic(() => import("@/components/products/casement-doors/AboutCasementDoor"));
// const AdvantagesDoors = dynamic(() => import("@/components/products/casement-doors/AdvantagesDoors"));
// const DoorsFAQ = dynamic(() => import("@/components/products/casement-doors/DoorsFAQ"));

// const AboutSlidingDoors = dynamic(() => import("@/components/products/sliding-doors/AboutSlidingDoors"));
// const SlidingDoorAdv = dynamic(() => import("@/components/products/sliding-doors/SlidingDoorAdv"));
// const SlidingDoorsFaq = dynamic(() => import("@/components/products/sliding-doors/SlidingDoorsFaq"));

// Add imports for others as needed (slide-fold, casement windows, etc.)

export default function ProductPage() {
  const { slug } = useParams();

  // map each slug to its content config
  const productConfig = {
    "casement-doors": {
      title: "Casement Doors",
      subtitle: "Leading the industry with innovation and quality",
      content: (
        <>
          <AboutCasementDoor />
          <AdvantagesDoors />
          <DoorsFAQ />
        </>
      ),
    },
    "sliding-doors": {
      title: "Sliding Doors",
      subtitle: "Leading the industry with innovation and quality",
      content: (
        <>
          <AboutSlidingDoors />
          <SlidingDoorAdv />
          <SlidingDoorsFaq />
        </>
      ),
    },
    


    
  };

  const product = productConfig[slug];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          Product not found
        </h1>
      </div>
    );
  }

  return (
    <div>
      <HeaderSection />
      <PageBanner title={product.title} subtitle={product.subtitle} />
      {product.content}
      <Footer />
    </div>
  );
}
