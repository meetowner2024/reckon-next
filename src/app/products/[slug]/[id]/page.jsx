"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import HeaderSection from "@/components/pages/HeaderSection";
import DynamicProduct from "@/components/products/DynamicProduct";
import { useSelector } from "react-redux";
import Footer from "@/components/pages/Footer";
export default function ProductPage() {
  const { id, slug } = useParams();
  const [product, setProduct] = useState(null);
  const [advantages, setAdvantages] = useState([]);
  const [loading, setLoading] = useState(true);
  const projectsDropdown = useSelector(
    (state) => state.projects.projectsDropdown
  );
  const header = useSelector((state) => state.header.header);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/users/products?id=${id}`, {
          cache: "force-cache",
          next: { revalidate: 3600 },
        });
        const data = await res.json();
        if (data.length > 0) setProduct(data[0]);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchProduct();
  }, [id]);
  useEffect(() => {
    async function fetchAdvantages() {
      try {
        const res = await fetch("/api/users/advantages", {
          cache: "force-cache",
          next: { revalidate: 3600 },
        });
        const data = await res.json();
        if (data.advantages && Array.isArray(data.advantages)) {
          setAdvantages(data.advantages);
        }
      } catch (err) {
        console.error("Error fetching advantages:", err);
      }
    }

    fetchAdvantages();
  }, []);
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
      <HeaderSection projectsDropdown={projectsDropdown} phone={header.phone} />
      <DynamicProduct
        product={product}
        advantages={advantages}
        loading={loading}
      />
      <Footer />
    </div>
  );
}
