// app/hero/add/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddHeroSlide() {
  const [heroImg, setHeroImg] = useState(null);
  const [heroPrev, setHeroPrev] = useState("");
  const [iconKey, setIconKey] = useState("");
  const [iconImg, setIconImg] = useState(null);
  const [iconPrev, setIconPrev] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [label, setLabel] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleHero = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeroImg(file);
      setHeroPrev(URL.createObjectURL(file));
    }
  };

  const handleIcon = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIconImg(file);
      setIconPrev(URL.createObjectURL(file));
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!heroImg || !iconImg || !title || !iconKey) {
      setMsg("All fields are required");
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("hero_image", heroImg);
    form.append("icon_image", iconImg);
    form.append("icon", iconKey); // <-- icon key
    form.append("title", title);
    form.append("description", desc);
    form.append("label", label || title);

    try {
      const res = await fetch("/api/users/hero/upload", { method: "POST", body: form });
      const data = await res.json();

      if (res.ok) {
        setMsg("Slide added successfully!");
        setTimeout(() => router.push("/hero"), 1200);
      } else {
        setMsg(data.message);
      }
    } catch {
      setMsg("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-8 text-blue-700">
        Add Hero Slide
      </h2>

      <form onSubmit={submit} className="space-y-6">

        {/* Hero Image */}
        <div>
          <label className="block font-semibold mb-2">Hero Image *</label>
          {heroPrev && (
            <div className="mb-3 border rounded-lg overflow-hidden">
              <Image src={heroPrev} alt="Hero" width={600} height={300} className="w-full h-64 object-cover" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleHero}
            required
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:bg-blue-600 file:text-white"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block font-semibold mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Casement Doors"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
            placeholder="Crafted for durability..."
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* Label */}
        <div>
          <label className="block font-semibold mb-2">Button Label</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Casement Doors"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* === ICON KEY + IMAGE (COMBINED) === */}
        <div className="p-5 border-2 border-dashed border-green-500 rounded-xl bg-green-50">
          <label className="block font-bold text-green-800 mb-3">
            Icon Key & Image *
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Icon Key */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon Key (e.g., DoorOpen)
              </label>
              <input
                type="text"
                value={iconKey}
                onChange={(e) => setIconKey(e.target.value)}
                required
                placeholder="DoorOpen"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use camelCase, no spaces
              </p>
            </div>

            {/* Icon Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleIcon}
                required
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:bg-green-600 file:text-white"
              />
            </div>
          </div>

          {/* Icon Preview */}
          {iconPrev && (
            <div className="mt-4 flex justify-center">
              <div className="relative w-20 h-20 border-2 border-green-600 rounded-lg overflow-hidden">
                <Image
                  src={iconPrev}
                  alt="Icon preview"
                  fill
                  className="object-contain p-2"
                />
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition"
        >
          {loading ? "Adding Slide..." : "Add Hero Slide"}
        </button>
      </form>

      {msg && (
        <div
          className={`mt-6 p-4 rounded-lg text-center font-medium text-sm ${
            msg.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {msg}
        </div>
      )}
    </div>
  );
}