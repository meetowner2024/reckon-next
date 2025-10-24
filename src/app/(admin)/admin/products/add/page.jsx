"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Trash2, Upload } from "lucide-react";
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
  const router = useRouter();
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
  const addAboutSection = () => {
    setAboutSections((prev) => [...prev, { title: "", description: "" }]);
  };
  const updateAboutSection = (index, field, value) => {
    setAboutSections((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };
  const removeAboutSection = (index) => {
    setAboutSections((prev) => prev.filter((_, i) => i !== index));
  };
  const addFaq = () => {
    setFaqs((prev) => [...prev, { question: "", answer: "" }]);
  };
  const updateFaq = (index, field, value) => {
    setFaqs((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };
  const removeFaq = (index) => {
    setFaqs((prev) => prev.filter((_, i) => i !== index));
  };
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/users/products/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Upload failed");
    return data.url;
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!title || bannerImages.length === 0) {
      setMsg("Title and at least one banner image are required");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      const bannerUrls = await Promise.all(
        bannerImages.map((img) => uploadImage(img.file))
      );
      const productData = {
        title,
        subtitle,
        banner: bannerUrls,
        about: aboutSections.filter((s) => s.title || s.description),
        faqs: faqs.filter((f) => f.question || f.answer),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const res = await fetch("/api/users/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });
      const result = await res.json();
      if (res.ok) {
        setMsg("Product added successfully!");
        setTimeout(() => router.push("/products"), 1500);
      } else {
        setMsg(result.message || "Failed to add product");
      }
    } catch (err) {
      setMsg(err.message || "Network or upload error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
        Add New Product
      </h2>
      <form onSubmit={submit} className="space-y-8">
        {}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Product Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., Casement Doors"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Subtitle
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="e.g., Leading the industry with innovation and quality"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {}
        <div className="p-5 border-2 border-dashed border-blue-400 rounded-xl bg-blue-50">
          <label className="block font-bold text-blue-800 mb-3">
            Banner Images * (Multiple)
          </label>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleBannerImages}
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:bg-blue-600 file:text-white file:border-0"
            />
            <p className="text-sm text-gray-600 mt-1">
              Select multiple images (first will be main banner)
            </p>
          </div>
          {bannerImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {bannerImages.map((img, i) => (
                <div
                  key={i}
                  className="relative group border-2 border-blue-200 rounded-lg overflow-hidden"
                >
                  <Image
                    src={img.preview}
                    alt={`Banner ${i + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeBannerImage(i)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
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
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-green-700">About Sections</h3>
            <button
              type="button"
              onClick={addAboutSection}
              className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium"
            >
              <Plus size={20} /> Add Section
            </button>
          </div>
          {aboutSections.map((section, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg bg-green-50 flex gap-3 items-start"
            >
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) =>
                    updateAboutSection(i, "title", e.target.value)
                  }
                  placeholder="Section Title (e.g., About Casement Doors)"
                  className="w-full p-2 border rounded-lg"
                />
                <textarea
                  value={section.description}
                  onChange={(e) =>
                    updateAboutSection(i, "description", e.target.value)
                  }
                  rows={2}
                  placeholder="Description..."
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              {aboutSections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAboutSection(i)}
                  className="text-red-600 hover:text-red-700 mt-1"
                >
                  <Trash2 size={20} />
                </button>
              )}
            </div>
          ))}
        </div>
        {}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-purple-700">FAQs</h3>
            <button
              type="button"
              onClick={addFaq}
              className="flex items-center gap-1 text-purple-600 hover:text-purple-700 font-medium"
            >
              <Plus size={20} /> Add FAQ
            </button>
          </div>
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg bg-purple-50 flex gap-3 items-start"
            >
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => updateFaq(i, "question", e.target.value)}
                  placeholder="Question"
                  className="w-full p-2 border rounded-lg"
                />
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(i, "answer", e.target.value)}
                  rows={2}
                  placeholder="Answer"
                  className="w-full p-2 border rounded-lg"
                />
              </div>
              {faqs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFaq(i)}
                  className="text-red-600 hover:text-red-700 mt-1"
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
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <>Uploading & Saving...</>
          ) : (
            <>
              <Upload size={20} /> Add Product
            </>
          )}
        </button>
      </form>
      {}
      {msg && (
        <div
          className={`mt-6 p-4 rounded-lg text-center font-medium text-sm ${
            msg.includes("success")
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
