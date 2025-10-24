"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HeaderSection from "@/components/pages/HeaderSection";
import Footer from "@/components/pages/Footer";
import DynamicProduct from "@/components/products/DynamicProduct";
export default function ProductPage() {
  const { slug } = useParams();
  console.log("slug: ", slug);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/users/products?slug=${slug}`);
        const data = await res.json();
        if (data.length > 0) setProduct(data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }
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
      <DynamicProduct product={product} />
      <Footer />
    </div>
  );
}
