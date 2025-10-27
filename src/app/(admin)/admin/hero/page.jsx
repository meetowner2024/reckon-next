"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddHeroSlide() {
  const [heroImg, setHeroImg] = useState(null);
  const [heroPrev, setHeroPrev] = useState("");

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
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

  const submit = async (e) => {
    e.preventDefault();
    if (!heroImg || !title || !iconKey) {
      setMsg("All fields are required");
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("hero_image", heroImg);
    form.append("icon", iconKey);
    form.append("title", title);
    form.append("description", desc);
    form.append("label", label || title);

    try {
      const res = await fetch("/api/users/hero/upload", { method: "POST", body: form });
      const data = await res.json();
      if (res.ok) {
        setMsg("Slide added successfully!");
        setTimeout(() => router.push("/admin/hero/all"), 1200);
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
      <h2 className="text-2xl font-bold text-center mb-8 text-[#48ADB9]">
        Add Hero Slide
      </h2>

      <form onSubmit={submit} className="space-y-6">

        <div>
          <label className="block font-semibold mb-2">Hero Image *</label>
          {heroPrev && (
            <div className="mb-3 border rounded-lg overflow-hidden">
              <Image
                src={heroPrev}
                alt="Hero"
                width={600}
                height={300}
                className="w-full h-64 object-cover"
              />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleHero}
            required
            className="w-full  cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:bg-[#48ADB9] file:text-white"
          />
        </div>

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

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer bg-[#48ADB9] text-white font-bold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition"
        >
          {loading ? "Submitting Slide..." : "Submit"}
        </button>
      </form>

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
