"use client";
import AboutSection from "./Dynamic/AboutSection";
import Advantages from "./Dynamic/Advantages";
import Faqs from "./Dynamic/Faqs";
import PageBanner from "../PageBanner";
import Footer from "../pages/Footer";
import { useSelector } from "react-redux";

export default function DynamicProduct({ product, advantages }) {
  const footer = useSelector((state) => state.footer);
  const projects = useSelector((state) => state.projects.projectsDropdown);
  return (
    <div className="bg-linear-to-br from-white via-[#f8fbff]/50 to-[#e6f0ff]/50">
      <PageBanner title={product.title} subtitle={product.subtitle} />
      <section className="max-w-6xl mx-auto  lg:py-16 px-4  sm:px-6 lg:px-8">
        <AboutSection product={product} />
        <Advantages product={product} advantages={advantages} />
        <Faqs product={product} />
      </section>
      <Footer footer={footer.footerData} projects={projects} />
    </div>
  );
}
