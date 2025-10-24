"use client";

import { useState, useEffect } from "react";

export default function AdvantagesAdmin() {
  const [mainTitle, setMainTitle] = useState("");
  const [advantages, setAdvantages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    } finally {
      setLoading(false);
    }
  };

  const handleAdvChange = (
    index,
    field,
    value
  ) => {
    const updated = [...advantages];
    updated[index][field] = value;
    setAdvantages(updated);
  };

  const addAdvantage = () => {
    setAdvantages([...advantages, { title: "", description: "" }]);
  };

  const removeAdvantage = (index) => {
    setAdvantages(advantages.filter((_, i) => i !== index));
  };

  const saveAdvantages = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/users/advantages/uploadAdvantage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          main_title: mainTitle,
          advantages: advantages.map((a) => ({
            title: a.title.trim(),
            description: a.description.trim(),
          })),
        }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to save advantages");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-[#48adb9]">
        Reckonext Advantages
      </h1>

      <div>
        <label className="block font-medium mb-2 text-gray-700">
          Main Title
        </label>
        <input
          type="text"
          value={mainTitle}
          onChange={(e) => setMainTitle(e.target.value)}
          placeholder="e.g. The Reckonext Advantages"
          className="w-full p-3 border rounded focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9]"
        />
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-[#48adb9]">
          Advantages
        </h2>

        {advantages.map((item, index) => (
          <div
            key={index}
            className="grid md:grid-cols-2 gap-4 items-start border-b pb-6 last:border-0"
          >

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Advantage #{index + 1} – Title
              </label>
              <input
                type="text"
                placeholder="e.g. Leak Proof"
                value={item.title}
                onChange={(e) =>
                  handleAdvChange(index, "title", e.target.value)
                }
                className="w-full p-2 border rounded focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9]"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Advantage #{index + 1} – Description
              </label>
              <textarea
                placeholder="e.g. Completely sealed design prevents leaks. Works even under high pressure and extreme conditions."
                value={item.description}
                onChange={(e) =>
                  handleAdvChange(index, "description", e.target.value)
                }
                rows={4}
                className="w-full p-2 border rounded resize-y focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9]"
              />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                onClick={() => removeAdvantage(index)}
                className="bg-red-500 text-white px-4 py-1.5 rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={addAdvantage}
          className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition"
        >
          + Add Advantage
        </button>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={saveAdvantages}
          disabled={saving}
          className="bg-[#48adb9] text-white px-8 py-3 rounded hover:bg-[#3a8a94] font-bold disabled:opacity-60 transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}