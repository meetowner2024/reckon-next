"use client";
import React, { useState, useEffect, useRef } from "react";
import { Upload, X, Image as ImageIcon, GripVertical } from "lucide-react";
import Image from "next/image";
export default function GalleryAdmin() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState("");
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const fetchImages = async () => {
    try {
      const res = await fetch("/api/users/gallery");
      const data = await res.json();
      setImages(data.sort((a, b) => a.order - b.order));
    } catch (error) {}
  };
  useEffect(() => {
    fetchImages();
  }, []);
  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("order", order || (images.length + 1).toString());
    setUploading(true);
    try {
      const res = await fetch("/api/users/gallery", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setFile(null);
        setTitle("");
        setOrder("");
        fetchImages();
      } else {
        const error = await res.json();
      }
    } catch (error) {
    } finally {
      setUploading(false);
    }
  };
  const removeImage = async (id) => {
    if (!confirm("Delete this image?")) return;
    try {
      await fetch(`/api/users/gallery?id=${id}`, { method: "DELETE" });
      fetchImages();
    } catch (error) {}
  };
  const handleDragStart = (e, index) => {
    dragItem.current = index;
    e.dataTransfer.effectAllowed = "move";
    const target = e.target;
    setTimeout(() => {
      target.style.opacity = "0.5";
    }, 0);
  };
  const handleDragEnter = (e, index) => {
    dragOverItem.current = index;
    e.preventDefault();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDragLeave = (e) => {
    const target = e.target;
    if (!target.closest(".drag-item")) {
      dragOverItem.current = null;
    }
  };
  const handleDrop = async (e) => {
    e.preventDefault();
    const dragIndex = dragItem.current;
    const dropIndex = dragOverItem.current;
    if (dragIndex === null || dropIndex === null || dragIndex === dropIndex) {
      resetDragStyles();
      return;
    }
    const newImages = [...images];
    const [draggedItem] = newImages.splice(dragIndex, 1);
    newImages.splice(dropIndex, 0, draggedItem);
    const updatedImages = newImages.map((img, idx) => ({
      ...img,
      order: idx + 1,
    }));
    setImages(updatedImages);
    const updates = updatedImages.map((img) => ({
      updateOne: {
        filter: { _id: img._id },
        update: { $set: { order: img.order } },
      },
    }));
    try {
      await fetch("/api/admin/gallery/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch (error) {
      fetchImages();
    }
    resetDragStyles();
  };
  const resetDragStyles = () => {
    document.querySelectorAll(".drag-item").forEach((el) => {
      el.style.opacity = "1";
    });
    dragItem.current = null;
    dragOverItem.current = null;
  };
  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Gallery Upload
          </h1>
          {}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition">
                    <Upload className="w-5 h-5" />
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {file && (
                    <span className="text-sm text-gray-600 truncate max-w-xs">
                      {file.name}
                    </span>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title (optional)
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Team Building 2025"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order (number)
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    placeholder={`${images.length + 1}`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={uploading || !file}
                className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>Uploading...</>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload Image
                  </>
                )}
              </button>
            </form>
            {}
            {file && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Preview:
                </p>
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
          {}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ImageIcon className="w-6 h-6" />
              Current Images ({images.length})
            </h2>
            {images.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No images uploaded yet.
              </p>
            ) : (
              <div className="space-y-3">
                {images.map((img, index) => (
                  <div
                    key={img._id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnter={(e) => handleDragEnter(e, index)}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className="drag-item flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-move select-none transition-opacity"
                  >
                    <GripVertical className="w-5 h-5 text-gray-400" />
                    <div className="w-16 h-16 relative rounded overflow-hidden">
                      <Image
                        src={img.url}
                        alt={img.title || "Gallery"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate max-w-xs">
                        {img.title || "Untitled"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Order: {img.order}
                      </p>
                    </div>
                    <button
                      onClick={() => removeImage(img._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
