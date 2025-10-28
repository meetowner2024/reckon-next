"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSlides() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    hero_image: null,
    imagePreview: "",
  });

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const res = await fetch("/api/users/hero");
      const data = await res.json();
      setSlides(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSlide = async (id) => {
    if (!confirm("Delete this slide?")) return;
    await fetch(`/api/users/hero/${id}`, { method: "DELETE" });
   await fetchSlides();
  };

  const openEditModal = (slide) => {
    setEditingSlide(slide);
    setForm({
      title: slide.title || "",
      description: slide.description || "",
      hero_image: null,
      imagePreview: slide.image || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSlide(null);
    setForm({
      title: "",
      description: "",
      hero_image: null,
      imagePreview: "",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        hero_image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const saveSlide = async () => {
  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("description", form.description);
  if (form.hero_image) formData.append("hero_image", form.hero_image);

  try {
    const url = editingSlide
      ? `/api/users/hero/${editingSlide._id}`   
      : "/api/users/hero";                      

    const method = editingSlide ? "PUT" : "POST";

    const res = await fetch(url, { method, body: formData });
    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed");

    alert(editingSlide ? "Slide updated!" : "Slide added!");
    closeModal();
    fetchSlides();
  } catch (err) {
    console.error(err);
    alert("Error: " + (err.message || "Unknown"));
  }
};

  if (loading)
    return <p className="text-center mt-20 text-gray-600">Loading slides...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "#48adb9" }}>
         Banners 
        </h1>
        <a
          href="/hero/add"
          className="bg-[#48adb9] text-white px-6 py-2 rounded-lg hover:bg-[#3a8a94] transition font-medium"
        >
          Add New Slide
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div
            key={slide._id}
            className="border rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-56 bg-gray-100">
              {slide.image ? (
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <div className="p-5 space-y-2">
              <h3 className="font-bold text-lg text-gray-800">{slide.title}</h3>
              {slide.description && (
                <p className="text-sm text-gray-600 line-clamp-2">
                  {slide.description}
                </p>
              )}
              {slide.label && (
                <span
                  className="inline-block mt-1 px-3 py-1 text-xs rounded-full text-white"
                  style={{ backgroundColor: "#48adb9" }}
                >
                  {slide.label}
                </span>
              )}
              <div>
                <code className="text-xs text-gray-600 font-mono">
                  Icon: {slide.icon}
                </code>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openEditModal(slide)}
                  className="flex-1 cursor-pointer bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSlide(slide._id)}
                  className="flex-1 cursor-pointer bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 hide-scrollbar">
            <h2 className="text-2xl font-bold text-center mb-4 text-[#48adb9]">
              {editingSlide ? "Edit Slide" : "Add New Slide"}
            </h2>

            <div className="space-y-4">

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#48adb9]"
                  placeholder="e.g. Powerful Performance"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full p-2 border rounded resize-y focus:ring-2 focus:ring-[#48adb9]"
                  placeholder="Optional detailed description..."
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Hero Image {editingSlide && "(optional to replace)"}
                </label>
                {form.imagePreview && (
                  <div className="mb-2 relative h-48 rounded overflow-hidden border">
                    <Image
                      src={form.imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={saveSlide}
                className="flex-1 bg-[#48adb9] cursor-pointer text-white py-2.5 rounded-lg font-medium hover:bg-[#3a8a94] transition"
              >
                {editingSlide ? "Update Slide" : "Add Slide"}
              </button>
              <button
                onClick={closeModal}
                className="flex-1 cursor-pointer bg-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}