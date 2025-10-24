"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Save, Loader2, ArrowUp } from "lucide-react";

export default function AdvantagesAdmin() {
  const [mainTitle, setMainTitle] = useState("");
  const [advantages, setAdvantages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const bottomRef = useRef(null);
  const topRef = useRef(null); // This will be the scroll target

  useEffect(() => {
    fetchAdvantages();
  }, []);

  const fetchAdvantages = async () => {
    try {
      const res = await fetch("/api/users/advantages");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      setMainTitle(data.main_title ?? "");
      setAdvantages(
        Array.isArray(data.advantages)
          ? data.advantages.map((a) => ({
              title: a.title ?? "",
              description: a.description ?? "",
            }))
          : []
      );
    } catch (err) {
      console.error(err);
      alert("Failed to load advantages");
    } finally {
      setLoading(false);
    }
  };

  const handleAdvChange = (index, field, value) => {
    const updated = [...advantages];
    updated[index][field] = value;
    setAdvantages(updated);
  };

  const addAdvantage = () => {
    const newAdv = { title: "", description: "" };
    setAdvantages((prev) => [...prev, newAdv]);

    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const removeAdvantage = (index) => {
    setAdvantages(advantages.filter((_, i) => i !== index));
  };

  const saveAdvantages = async () => {
    if (!mainTitle.trim()) {
      alert("Please enter a main title");
      return;
    }
    if (advantages.some((a) => !a.title.trim() || !a.description.trim())) {
      alert("All advantages must have a title and description");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/users/advantages/uploadAdvantage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          main_title: mainTitle.trim(),
          advantages: advantages.map((a) => ({
            title: a.title.trim(),
            description: a.description.trim(),
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");

      alert("Advantages saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save advantages");
    } finally {
      setSaving(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;

    // Show button after user scrolls 200px from top
    setShowScrollTop(scrollTop > 200);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#48adb9]" />
        <span className="ml-2 text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <>
      {/* TOP ANCHOR - GIVE IT HEIGHT */}
      <div ref={topRef} className="h-0" />

      <div className="max-w-5xl mx-auto p-6 space-y-10 pb-32">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-[#48adb9] tracking-tight">
            Reckonext Advantages
          </h1>
          <button
            onClick={saveAdvantages}
            disabled={saving}
            className="flex items-center gap-2 bg-[#48adb9] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3a8a94] transition disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>

        {/* Main Title */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Main Title
          </label>
          <input
            type="text"
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
            placeholder="e.g. Why Choose Reckonext?"
            className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9] transition"
          />
        </div>

        {/* Advantages */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#48adb9]">
              Advantages ({advantages.length})
            </h2>
            <button
              onClick={addAdvantage}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
            >
              <Plus className="w-5 h-5" />
              Add Advantage
            </button>
          </div>

          {advantages.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl text-gray-500">
              <p className="text-lg">
                No advantages yet. Click “Add Advantage” to start.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {advantages.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm font-medium text-[#48adb9] bg-[#48adb9]/10 px-3 py-1 rounded-full">
                      Advantage #{index + 1}
                    </span>
                    <button
                      onClick={() => removeAdvantage(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Leak Proof"
                        value={item.title}
                        onChange={(e) =>
                          handleAdvChange(index, "title", e.target.value)
                        }
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        placeholder="e.g. Completely sealed design..."
                        value={item.description}
                        onChange={(e) =>
                          handleAdvChange(index, "description", e.target.value)
                        }
                        rows={3}
                        className="w-full p-3 border rounded-lg resize-y focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9]"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* Mobile Save Button */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-40">
          <button
            onClick={saveAdvantages}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-[#48adb9] text-white py-3 rounded-lg font-bold hover:bg-[#3a8a94] transition disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>

   <button
  onClick={scrollToTop}
  className={`
    fixed 
    bottom-24 
    right-6 
    bg-[#48adb9] text-white 
    p-4 
    rounded-full 
    shadow-2xl 
    hover:bg-[#3a8a94] 
    transition-all duration-300 
    z-[9999] 
    flex items-center justify-center
    ${showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-50 pointer-events-none"}
  `}
  aria-label="Scroll to top"
>
  <ArrowUp className="w-6 h-6" />
</button>

    </>
  );
}