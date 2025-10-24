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
      setMainTitle(data.main_title || "");
      setAdvantages(data.advantages || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleAdvChange = (index, field, value) => {
    const updated = [...advantages];
    updated[index][field] = value;
    setAdvantages(updated);
  };

  const addAdvantage = () => {
    setAdvantages([...advantages, { adv: "", icon: "" }]);
  };

  const removeAdvantage = (index) => {
    const updated = advantages.filter((_, i) => i !== index);
    setAdvantages(updated);
  };

  const saveAdvantages = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/users/advantages/uploadAdvantage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ main_title: mainTitle, advantages }),
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-[#48adb9]">Reckonext Advantages</h1>

      {/* Main Title */}
      <div>
        <label className="block font-medium mb-2">Main Title</label>
        <input
          type="text"
          value={mainTitle}
          onChange={(e) => setMainTitle(e.target.value)}
          className="w-full p-3 border rounded focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9]"
        />
      </div>

      {/* Advantages List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#48adb9]">Advantages</h2>
        {advantages.map((item, index) => (
          <div key={index} className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Advantage text"
              value={item.adv}
              onChange={(e) => handleAdvChange(index, "adv", e.target.value)}
              className="flex-1 p-2 border rounded focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9]"
            />
            <input
              type="text"
              placeholder="Icon key"
              value={item.icon}
              onChange={(e) => handleAdvChange(index, "icon", e.target.value)}
              className="w-40 p-2 border rounded focus:ring-2 focus:ring-[#48adb9] focus:border-[#48adb9]"
            />
            <button
              onClick={() => removeAdvantage(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={addAdvantage}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Advantage
        </button>
      </div>

      {/* Save Button */}
      <button
        onClick={saveAdvantages}
        disabled={saving}
        className="bg-[#48adb9] text-white px-6 py-3 rounded hover:bg-[#3a8a94] font-bold mt-4"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
