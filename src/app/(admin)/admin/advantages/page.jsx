"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

export default function AdvantagesAdmin() {
  const [mainTitle, setMainTitle] = useState("");
  const [advantages, setAdvantages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const bottomRef = useRef(null);

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
    setAdvantages((prev) => [...prev, { title: "", description: "" }]);
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
const removeAdvantage = async (index) => {
  if (!confirm("Are you sure you want to delete this advantage?")) return;

  try {
    const res = await fetch("/api/users/advantages/deleteAdvantage", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ index }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Delete failed");

    alert("Advantage deleted successfully!");
    fetchAdvantages(); // refresh list from DB
  } catch (err) {
    console.error(err);
    alert("Failed to delete advantage");
  }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#48adb9]" />
        <span className="ml-2 text-base sm:text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-32">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#48adb9] tracking-tight">
            Reckonext Advantages
          </h1>
          <button
            onClick={saveAdvantages}
            disabled={saving}
            className="flex items-center gap-2 bg-[#48adb9] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-[#3a8a94] transition disabled:opacity-60 text-sm sm:text-base"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
          <label className="block text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">
            Main Title
          </label>
          <input
            type="text"
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
            placeholder="e.g. Why Choose Reckonext?"
            className="w-full p-3 sm:p-4 text-base border rounded-lg focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9] transition"
          />
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#48adb9]">
              Advantages ({advantages.length})
            </h2>
            <button
              onClick={addAdvantage}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg font-medium hover:bg-green-700 transition text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Advantage
            </button>
          </div>

          {advantages.length === 0 ? (
            <div className="text-center py-10 sm:py-12 bg-gray-50 rounded-xl text-gray-500">
              <p className="text-base sm:text-lg">
                No advantages yet. Click “Add Advantage” to start.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {advantages.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <span className="text-xs sm:text-sm font-medium text-[#48adb9] bg-[#48adb9]/10 px-2 sm:px-3 py-1 rounded-full">
                      Advantage #{index + 1}
                    </span>
                    <button
                      onClick={() => removeAdvantage(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1.5 sm:p-2 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Leak Proof"
                        value={item.title}
                        onChange={(e) =>
                          handleAdvChange(index, "title", e.target.value)
                        }
                        className="w-full p-2.5 sm:p-3 border rounded-lg focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        placeholder="e.g. Completely sealed design..."
                        value={item.description}
                        onChange={(e) =>
                          handleAdvChange(index, "description", e.target.value)
                        }
                        rows={3}
                        className="w-full p-2.5 sm:p-3 border rounded-lg resize-y focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9]"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
