"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AddHeroSlide() {
  const [heroImg, setHeroImg] = useState(null);
  const [heroPrev, setHeroPrev] = useState("");
  const [mobileImg, setMobileImg] = useState(null);
  const [mobilePrev, setMobilePrev] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState("");
  const router = useRouter();

  const handleHero = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeroImg(file);
      setHeroPrev(URL.createObjectURL(file));
    }
  };

  const handleMobileHero = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMobileImg(file);
      setMobilePrev(URL.createObjectURL(file));
    }
  };


  const checkTitle = async (value) => {
    if (!value.trim()) return;
    setTitleError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/users/hero/check?title=${encodeURIComponent(value)}`);
      const { exists } = await res.json();
      if (exists) {
        setTitleError("This title already exists. Only the first slide will be used.");
      }
    } catch {
      setTitleError("Failed to check title");
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!heroImg || !title.trim() || !desc.trim() || !location) {
      alert("All fields are required");
      return;
    }

    const res = await fetch(`/api/users/hero/check?title=${encodeURIComponent(title)}`);
    const { exists } = await res.json();
    if (exists && !confirm("A slide with this title already exists. Continue? Only the first one will be shown.")) {
      return;
    }

    setLoading(true);
    const form = new FormData();
    form.append("hero_image", heroImg);
    if (mobileImg) {
      form.append("mobile_image", mobileImg);
    }
    form.append("title", title);
    form.append("description", desc);
    form.append("location", location);

    try {
      const res = await fetch("/api/users/hero/upload", { method: "POST", body: form });
      const data = await res.json();
      if (res.ok) {
        alert("Banner added successfully!");
        setTimeout(() => router.push("/admin/hero/all"), 1200);
      } else {
        alert(data.message);
      }
    } catch {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-8 text-[#48ADB9]">
        Add Banner
      </h2>

      <form onSubmit={submit} className="space-y-6">
        <div>
          <label className="block font-semibold mb-2">Hero Image (Desktop) *</label>
          {heroPrev && (
            <div className="mb-3 border rounded-lg overflow-hidden">
              <Image src={heroPrev} alt="Hero" width={600} height={300} className="w-full h-64 object-cover" />
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleHero} required
            className="w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:bg-[#48ADB9] file:text-white" />
        </div>

        <div>
          <label className="block font-semibold mb-2">Hero Image (Mobile)</label>
          {mobilePrev && (
            <div className="mb-3 border rounded-lg overflow-hidden">
              <Image src={mobilePrev} alt="Mobile Hero" width={300} height={300} className="w-full h-64 object-cover" />
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleMobileHero}
            className="w-full cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:bg-[#48ADB9] file:text-white" />
        </div>


        <div>
          <label className="block font-semibold mb-2">Title *</label>
          <input type="text" value={title} required placeholder="e.g. About Us"
            onChange={(e) => {
              setTitle(e.target.value);
              setTitleError("");
              clearTimeout(window.titleCheckTimeout);
              window.titleCheckTimeout = setTimeout(() => checkTitle(e.target.value), 500);
            }}
            className="w-full p-3 border rounded-lg" />
          {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
        </div>

        <div>
          <label className="block font-semibold mb-2">Description *</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={3} required
            placeholder="Leading the industry..." className="w-full p-3 border rounded-lg" />
        </div>

        <div>
          <label className="block font-semibold mb-2">Location to Display *</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)} required
            className="w-full p-3 border rounded-lg">
            <option value="">Select location</option>
            <option value="main-slider">Main Slider</option>
            <option value="except-main-slider">Except Main Slider</option>
          </select>
        </div>

        <button type="submit" disabled={loading || !!titleError}
          className="w-full bg-[#48ADB9] text-white font-bold py-3 rounded-lg hover:bg-[#3a8a94] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2">
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
              </svg>
              Submitting...
            </>
          ) : "Submit"}
        </button>
      </form>
    </div>
  );
}