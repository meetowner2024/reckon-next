"use client";
import { useParams } from "next/navigation";
import HeaderSection from "@/components/pages/HeaderSection";
import Footer from "@/components/pages/Footer";
import PageBanner from "@/components/PageBanner";
import DoorsPage from "@/components/products/Casement/DoorsPage";
import SlidingDoors from "@/components/products/slidingDoors/SlidingDoors";
import SFDoors from "@/components/products/slideAndFoldDoors/SFDoors";
import CasementWindow from "@/components/products/casementWindow/CasementWindow";
import SlidingWindows from "@/components/products/slidingWindows/SlidingWindows";
import FrenchWindows from "@/components/products/frenchWindows/FrenchWindows";
export default function ProductPage() {
  const { slug } = useParams();
  const productConfig = {
    "casement-doors": {
      title: "Casement Doors",
      subtitle: "Leading the industry with innovation and quality",
      content: <DoorsPage />,
    },
    "sliding-doors": {
      title: "Sliding Doors",
      subtitle: "Leading the industry with innovation and quality",
      content: <SlidingDoors />,
    },
    "casement-windows": {
      title: "Casement Windows",
      subtitle: "Leading the industry with innovation and quality",
      content: <CasementWindow />,
    },
    "sliding-windows": {
      title: "Sliding Windows",
      subtitle: "Leading the industry with innovation and quality",
      content: <SlidingWindows />,
    },
    "french-windows": {
      title: "French Windows",
      subtitle: "Leading the industry with innovation and quality",
      content: <FrenchWindows />,
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
