// app/hero/page.js
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroSlides() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editSlide, setEditSlide] = useState(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    const res = await fetch("/api/users/hero");
    const data = await res.json();
    setSlides(data);
    setLoading(false);
  };

  const deleteSlide = async (id) => {
    if (!confirm("Delete this slide?")) return;
    await fetch(`/api/users/hero/${id}`, { method: "DELETE" });
    await fetchSlides();
  };

  const openEdit = (slide) => {
    setEditSlide(slide);
    setShowModal(true);
  };

  const saveEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await fetch(`/api/users/hero/${editSlide._id}`, {
      method: "PATCH",
      body: formData,
    });
    setShowModal(false);
    await fetchSlides();
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-600">Loading slides...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "#48adb9" }}>
           Slides
        </h1>
        <a
          href="/admin/banner"
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

            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800">{slide.title}</h3>
              {slide.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {slide.description}
                </p>
              )}
              {slide.label && (
                <span
                  className="inline-block mt-2 px-3 py-1 text-xs rounded-full text-white"
                  style={{ backgroundColor: "#48adb9" }}
                >
                  {slide.label}
                </span>
              )}
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border">
                  {slide.icon_image ? (
                    <Image
                      src={slide.icon_image}
                      alt=""
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-200 flex items-center justify-center text-gray-400">
                      N/A
                    </div>
                  )}
                </div>

                <code className="text-xs text-gray-500 font-mono">
                  {slide.icon}
                </code>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openEdit(slide)}
                  className="flex-1 bg-teal-700 text-white py-2 rounded-lg  transition text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSlide(slide._id)}
                  className="flex-1 bg-red-800 text-white py-2 rounded-lg  transition text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========== EDIT MODAL ========== */}
      {showModal && editSlide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b" style={{ borderColor: "#48adb9" }}>
              <h2 className="text-2xl font-bold" style={{ color: "#48adb9" }}>
                Edit Slide
              </h2>
            </div>

            <form onSubmit={saveEdit} className="p-6 space-y-5">
              {/* Hero Image */}
              <div>
                <label className="block font-medium mb-2">Hero Image</label>
                <div className="flex gap-3 items-center">
                  {editSlide.image ? (
                    <Image
                      src={editSlide.image}
                      alt=""
                      width={96}
                      height={64}
                      className="object-cover rounded border"
                    />
                  ) : (
                    <div className="w-24 h-16 bg-gray-200 rounded border flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}

                  <input
                    type="file"
                    name="hero_image"
                    accept="image/*"
                    className="flex-1 text-sm file:mr-3 file:py-2 file:px-4 file:rounded file:bg-[#48adb9] file:text-white"
                  />
                </div>
              </div>

              {/* Icon Image + Key */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block font-medium mb-1">Icon Key</label>
                  <input
                    name="icon"
                    defaultValue={editSlide.icon}
                    required
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9]"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Icon Image</label>
                  <div className="flex gap-2 items-center">
                    {editSlide.icon_image ? (
                      <Image
                        src={editSlide.icon_image}
                        alt=""
                        width={48}
                        height={48}
                        className="object-contain rounded border"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center text-gray-400">
                        N/A
                      </div>
                    )}

                    <input
                      type="file"
                      name="icon_image"
                      accept="image/*"
                      className="flex-1 text-sm file:mr-3 file:py-2 file:px-4 file:rounded file:bg-green-600 file:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block font-medium mb-1">Title *</label>
                <input
                  name="title"
                  defaultValue={editSlide.title}
                  required
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={editSlide.description}
                  rows={3}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9]"
                />
              </div>

              {/* Label */}
              <div>
                <label className="block font-medium mb-1">Button Label</label>
                <input
                  name="label"
                  defaultValue={editSlide.label}
                  className="w-full p-3 border rounded focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#48adb9] text-white py-3 rounded-lg font-bold hover:bg-[#3a8a94] transition"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
