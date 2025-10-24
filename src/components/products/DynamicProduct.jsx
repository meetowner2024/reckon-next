"use client";
import Banner from "./Dynamic/Banner";
import AboutSection from "./Dynamic/AboutSection";
import Advantages from "./Dynamic/Advantages";
import Faqs from "./Dynamic/Faqs";

export default function DynamicProduct({ product }) {
  console.log("product: ", product);
  return (
    <div className="bg-gradient-to-br from-white via-[#f8fbff]/50 to-[#e6f0ff]/50">
      <Banner title={product.title} subtitle={product.subtitle} />
      <section className="max-w-6xl mx-auto py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <AboutSection product={product} />
        <Advantages product={product} />
        <Faqs product={product} />
      </section>
    </div>
  );
}
