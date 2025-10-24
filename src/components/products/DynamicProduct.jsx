"use client";
import Banner from "./Dynamic/Banner";
import AboutSection from "./Dynamic/AboutSection";
import Advantages from "./Dynamic/Advantages";
import Faqs from "./Dynamic/Faqs";
import { Zap, Volume2, Shield, Leaf, Sun, Bug, Wrench } from "lucide-react";
import verification from "../../../public/assets/images/verification.png";
import mute from "../../../public/assets/images/mute.png";
import eco from "../../../public/assets/images/eco.jpg";
import maintanence from "../../../public/assets/images/maintanence.jpg";
import fungal from "../../../public/assets/images/fungal.jpg";
import uvHouse from "../../../public/assets/images/uv-house.jpeg";
import quality from "../../../public/assets/images/quality.png";

export default function DynamicProduct({ product }) {
  console.log("product: ", product);
  // const product = {
  //   title: "Casement Doors",
  //   subtitle: "Leading the industry with innovation and quality",
  //   about: [
  //     {
  //       title: "About Casement Doors",
  //       description:
  //         "Casement doors are hinged at the side and open outward, providing maximum ventilation and unobstructed views.",
  //     },
  //     {
  //       title: "Why Reckon?",
  //       description:
  //         "India's best manufacturer offering 200+ colors, premium materials, secure insulation. Enhances home aesthetics at unbeatable value.",
  //     },
  //   ],
  //   advantages: [
  //     {
  //       id: 1,
  //       title: "Weather Proof",
  //       description: "Reliarik weatherproofing for lasting protection.",
  //       Icon: Zap,
  //       image: verification,
  //     },
  //     {
  //       id: 2,
  //       title: "Sound Proofing",
  //       description: "Seal gaps, reduce noise effectively.",
  //       Icon: Volume2,
  //       image: mute,
  //     },
  //     {
  //       id: 3,
  //       title: "Strength & Durability",
  //       description: "Unrivaled strength for lasting performance.",
  //       Icon: Shield,
  //       image: quality,
  //     },
  //     {
  //       id: 4,
  //       title: "Eco Friendly",
  //       description: "Sustainable solutions without compromise.",
  //       Icon: Leaf,
  //       image: eco,
  //     },
  //     {
  //       id: 5,
  //       title: "UV Resistant",
  //       description: "Protection against harmful UV rays.",
  //       Icon: Sun,
  //       image: uvHouse,
  //     },
  //     {
  //       id: 6,
  //       title: "Anti-Fungal",
  //       description: "Protection from fungi and termites.",
  //       Icon: Bug,
  //       image: fungal,
  //     },
  //     {
  //       id: 7,
  //       title: "Easy Maintenance",
  //       description: "Simple care, durable materials.",
  //       Icon: Wrench,
  //       image: maintanence,
  //     },
  //   ],
  //   faqs: [
  //     {
  //       id: 0,
  //       category: "basics",
  //       question: "What is an uPVC Casement Window?",
  //       answer:
  //         "A uPVC casement window, also known as a crank window, is a versatile, weather-resistant design for tall, narrow spaces.",
  //     },
  //     {
  //       id: 1,
  //       category: "benefits",
  //       question: "What Are the Key Benefits of uPVC Casement Windows?",
  //       answer:
  //         "uPVC casement windows are fire- and pollution-resistant, with mosquito mesh for insect control. They also help conserve energy & reduce outside noise, creating a more comfortable living environment.",
  //     },
  //     {
  //       id: 2,
  //       category: "features",
  //       question: "What Sets uPVC Casement Windows Apart?",
  //       answer:
  //         "uPVC casement windows from RECKON stand out due to their enhanced corner strength, improved insulation, and effective ventilation options.",
  //     },
  //     {
  //       id: 3,
  //       category: "upgrade",
  //       question: "How Can I Upgrade My Space with uPVC Casement Windows?",
  //       answer:
  //         "You can enhance your space with Reckon's premium uPVC casement windows. For more information, Contact Us.",
  //     },
  //     {
  //       id: 4,
  //       category: "comparison",
  //       question: "Why Choose uPVC Over Wooden Windows?",
  //       answer:
  //         "uPVC casement windows outshine traditional wooden windows with weather resistance, energy efficiency, soundproofing, encasement window option, low maintenance, and European standards compliance.",
  //     },
  //     {
  //       id: 5,
  //       category: "security",
  //       question: "How Does uPVC Casement Windows Enhance Home Security?",
  //       answer:
  //         "uPVC casement windows from RECKON feature advanced locking systems and robust construction, offering improved security for your home or space.",
  //     },
  //   ],
  // };
  return (
    <div className="bg-gradient-to-br from-white via-[#f8fbff]/50 to-[#e6f0ff]/50">
      <Banner title={product.title} subtitle={product.subtitle} />
      <section className="max-w-6xl mx-auto py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <AboutSection about={product.about} />
        <Advantages advantages={product.advantages} />
        <Faqs faqs={product.faqs} />
      </section>
    </div>
  );
}
