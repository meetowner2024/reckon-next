"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Plus, Trash2, Upload, ArrowLeft } from "lucide-react";
export default function AddProduct() {
  const [bannerImages, setBannerImages] = useState([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [aboutSections, setAboutSections] = useState([
    { title: "", description: "" },
  ]);
  const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [productId, setProductId] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setIsEdit(true);
      setProductId(id);
      fetchProduct(id);
    }
  }, [searchParams]);
  const fetchProduct = async (id) => {
    try {
      const res = await fetch(`/api/users/products?id=${id}`);
      const products = await res.json();
      const product = products[0];
      if (!product) throw new Error("Product not found");
      setTitle(product.title || "");
      setSubtitle(product.subtitle || "");
      setAboutSections(
        product.about?.length ? product.about : [{ title: "", description: "" }]
      );
      setFaqs(
        product.faqs?.length ? product.faqs : [{ question: "", answer: "" }]
      );
      setBannerImages(
        product.banner?.map((url) => ({ url, preview: url })) || []
      );
    } catch (err) {
      setMsg("Failed to load product");
    }
  };
  const handleBannerImages = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setBannerImages((prev) => [...prev, ...newImages]);
  };
  const removeBannerImage = (index) => {
    setBannerImages((prev) => prev.filter((_, i) => i !== index));
  };
  const addAboutSection = () =>
    setAboutSections((prev) => [...prev, { title: "", description: "" }]);
  const updateAboutSection = (i, field, val) =>
    setAboutSections((prev) =>
      prev.map((x, idx) => (idx === i ? { ...x, [field]: val } : x))
    );
  const removeAboutSection = (i) =>
    setAboutSections((prev) => prev.filter((_, idx) => idx !== i));
  const addFaq = () =>
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  const updateFaq = (i, field, val) =>
    setFaqs((prev) =>
      prev.map((x, idx) => (idx === i ? { ...x, [field]: val } : x))
    );
  const removeFaq = (i) =>
    setFaqs((prev) => prev.filter((_, idx) => idx !== i));
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/users/products/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    return data.url;
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!title || bannerImages.length === 0) {
      setMsg("Title and at least one image required");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      const newImageUrls = await Promise.all(
        bannerImages
          .filter((img) => img.file)
          .map((img) => uploadImage(img.file))
      );
      const existingUrls = bannerImages
        .filter((img) => img.url && !img.file)
        .map((img) => img.url);
      const finalBanner = [...existingUrls, ...newImageUrls];
      const payload = {
        ...(isEdit && { _id: productId }),
        title,
        subtitle,
        banner: finalBanner,
        about: aboutSections.filter((s) => s.title || s.description),
        faqs: faqs.filter((f) => f.question || f.answer),
        updated_at: new Date().toISOString(),
      };
      const res = await fetch("/api/users/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (res.ok) {
        setMsg(isEdit ? "Product updated!" : "Product added!");
        setTimeout(() => router.push("/admin/products"), 1500);
      } else {
        setMsg(result.message || "Save failed");
      }
    } catch (err) {
      setMsg(err.message || "Error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-3xl font-bold text-blue-700">
          {isEdit ? "Edit Product" : "Add New Product"}
        </h2>
      </div>
      <form onSubmit={submit} className="space-y-8">
        {}
        <div>
          <label className="block font-semibold mb-2">Product Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Casement Doors"
            className="w-full p-3 border rounded-lg"
          />
        </div>
        {}
        <div>
          <label className="block font-semibold mb-2">Subtitle</label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Leading with innovation..."
            className="w-full p-3 border rounded-lg"
          />
        </div>
        {}
        <div className="p-5 border-2 border-dashed border-blue-400 rounded-xl bg-blue-50">
          <label className="block font-bold text-blue-800 mb-3">
            Banner Images *
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleBannerImages}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:bg-blue-600 file:text-white"
          />
          <p className="text-sm text-gray-600 mt-1">Add more images</p>
          {bannerImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {bannerImages.map((img, i) => (
                <div
                  key={i}
                  className="relative group border-2 border-blue-200 rounded-lg overflow-hidden"
                >
                  <Image
                    src={img.preview || img.url}
                    alt={`Banner ${i + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeBannerImage(i)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={16} />
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      Main
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        {}
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-xl font-bold text-green-700">About Sections</h3>
            <button
              type="button"
              onClick={addAboutSection}
              className="text-green-600 flex items-center gap-1"
            >
              <Plus size={20} /> Add
            </button>
          </div>
          {aboutSections.map((s, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg bg-green-50 flex gap-3"
            >
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  value={s.title}
                  onChange={(e) =>
                    updateAboutSection(i, "title", e.target.value)
                  }
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  value={s.description}
                  onChange={(e) =>
                    updateAboutSection(i, "description", e.target.value)
                  }
                  rows={2}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                />
              </div>
              {aboutSections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAboutSection(i)}
                  className="text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
        {}
        <div className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-xl font-bold text-purple-700">FAQs</h3>
            <button
              type="button"
              onClick={addFaq}
              className="text-purple-600 flex items-center gap-1"
            >
              <Plus size={20} /> Add
            </button>
          </div>
          {faqs.map((f, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg bg-purple-50 flex gap-3"
            >
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  value={f.question}
                  onChange={(e) => updateFaq(i, "question", e.target.value)}
                  placeholder="Question"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  value={f.answer}
                  onChange={(e) => updateFaq(i, "answer", e.target.value)}
                  rows={2}
                  placeholder="Answer"
                  className="w-full p-2 border rounded"
                />
              </div>
              {faqs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
                  className="text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
        {}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? "Saving..." : isEdit ? "Update Product" : "Add Product"}
          <Upload size={20} />
        </button>
      </form>
      {msg && (
        <div
          className={`mt-6 p-4 rounded-lg text-center text-sm font-medium ${
            msg.includes("success") || msg.includes("updated")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {msg}
        </div>
      )}
    </div>
  );
}
