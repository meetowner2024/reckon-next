"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSlides() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",         
    hero_image: null,
    imagePreview: "",
  });

  useEffect(() => { fetchSlides(); }, []);

  const fetchSlides = async () => {
    try {
      const res = await fetch("/api/users/hero");
      const data = await res.json();
      setSlides(data);
    } catch { } finally { setLoading(false); }
  };
const deleteSlide = async (id) => {
  if (!confirm("Are you sure you want to delete this slide?")) return;

  try {
    const res = await fetch(`/api/users/hero/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();

    if (!res.ok) throw new Error(result.message || "Failed to delete");

    alert("Slide deleted successfully!");
    fetchSlides(); // refresh slides
  } catch (err) {
    alert("Error deleting slide: " + (err.message || "Unknown error"));
  }
};

  const openEditModal = (slide) => {
    setEditingSlide(slide);
    setForm({
      title: slide.title || "",
      description: slide.description || "",
      location: slide.location || "",      
      hero_image: null,
      imagePreview: slide.image || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSlide(null);
    setForm({ title: "", description: "", location: "", hero_image: null, imagePreview: "" });
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
    if (!form.title.trim() || !form.location) {
      alert("Title and location required!");
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("location", form.location);   
    if (form.hero_image) formData.append("hero_image", form.hero_image);

    try {
      const url = editingSlide ? `/api/users/hero/${editingSlide._id}` : "/api/users/hero";
      const method = editingSlide ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });
      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Failed");

      alert(editingSlide ? "Slide updated!" : "Slide added!");
      closeModal();
      fetchSlides();
    } catch (err) {
      alert("Error: " + (err.message || "Unknown"));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-20 text-gray-600">Loading slides...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "#48adb9" }}>Banners</h1>
        <a href="/admin/hero" className="bg-[#48adb9] text-white px-6 py-2 rounded-lg hover:bg-[#3a8a94] transition font-medium">
          Add New Slide
        </a>
      </div>

      {/* Grid of slides */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slides.map((slide) => (
          <div key={slide._id} className="border rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300">
            <div className="relative h-56 bg-gray-100">
              {slide.image ? (
                <Image src={slide.image} alt={slide.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
              )}
            </div>
            <div className="p-5 space-y-2">
              <h3 className="font-bold text-lg text-gray-800">{slide.title}</h3>
              {slide.description && <p className="text-sm text-gray-600 line-clamp-2">{slide.description}</p>}
              {slide.location && (
                <span className="inline-block mt-1 px-3 py-1 text-xs rounded-full text-white" style={{ backgroundColor: "#48adb9" }}>
                  {slide.location === "main-slider" ? "Main Slider" : "Except Main Slider"}
                </span>
              )}
              <div className="flex gap-2 mt-4">
                <button onClick={() => openEditModal(slide)} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition">Edit</button>
                <button onClick={() => deleteSlide(slide._id)} className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-center mb-4 text-[#48adb9]">
              {editingSlide ? "Edit Slide" : "Add New Slide"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                <input type="text" value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#48adb9]" placeholder="e.g. About Us" />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} rows={3}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-2 border rounded resize-y focus:ring-2 focus:ring-[#48adb9]" />
              </div>

              {/* LOCATION IN MODAL */}
              <div>
                <label className="block font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-[#48adb9]">
                  <option value="">Select location</option>
                  <option value="main-slider">Main Slider</option>
                  <option value="except-main-slider">Except Main Slider</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Hero Image {editingSlide && "(optional to replace)"}
                </label>
                {form.imagePreview && (
                  <div className="mb-2 relative h-48 rounded overflow-hidden border">
                    <Image src={form.imagePreview} alt="Preview" fill className="object-cover" />
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleImageChange}
                  className="w-full p-2 border rounded" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={saveSlide} disabled={saving}
                className="flex-1 bg-[#48adb9] text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3a8a94]">
                {saving ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : editingSlide ? "Update Slide" : "Add Slide"}
              </button>
              <button onClick={closeModal}
                className="flex-1 bg-gray-300 text-gray-700 py-2.5 rounded-lg font-medium hover:bg-gray-400 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}