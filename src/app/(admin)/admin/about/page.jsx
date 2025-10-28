// components/AddCompanyForm.js
"use client";

import { useState, useEffect } from "react";
import { Plus, Save, X, RefreshCw } from "lucide-react";
import Image from "next/image";

export default function AddCompanyForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [mainPreview, setMainPreview] = useState("");
  const [expertsInputTitle, setExpertsInputTitle] = useState("");
  const [expertsInputDescription, setExpertsInputDescription] = useState("");
  const [cards, setCards] = useState([]);
  const [experts, setExperts] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users/about")
      .then((r) => r.json())
      .then((data) => {
        if (data.title) {
          setTitle(data.title);
          setDescription(data.description || "");
          setMainPreview(data.mainImage || "");
          setExpertsInputTitle(data.expertsInputTitle || "");
          setExpertsInputDescription(data.expertsInputDescription || "");

          setCards(
            (data.cards || []).map((c, i) => ({
              id: `c-${i}`,
              image: null,
              preview: c.image || null,
              title: c.title || "",
              description: c.description || "",
            }))
          );

          setExperts(
            (data.experts || []).map((e, i) => ({
              id: `e-${i}`,
              image: null,
              preview: e.image || null,
              name: e.name || "",
              role: e.role || "",
            }))
          );
        } else {
          setCards([{ id: "c-0", image: null, preview: null, title: "", description: "" }]);
          setExperts([{ id: "e-0", image: null, preview: null, name: "", role: "" }]);
        }
      })
      .catch(() => alert("Failed to load data"))
      .finally(() => setLoading(false));
  }, []);

  const handlePreview = (file, setFn) => {
    if (!file) return setFn(null);
    const reader = new FileReader();
    reader.onload = (e) => setFn(e.target.result);
    reader.readAsDataURL(file);
  };

  const addCard = () => {
    const newId = Date.now().toString();
    setCards((c) => {
      const updated = [...c, { id: newId, image: null, preview: null, title: "", description: "" }];
      requestAnimationFrame(() => {
        const el = document.getElementById(`card-${newId}`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return updated;
    });
  };
  const removeCard = (id) => setCards((c) => c.filter((x) => x.id !== id));

  const addExpert = () => {
    const newId = Date.now().toString();
    const newExpert = { id: newId, image: null, preview: null, name: "", role: "" };
    setExperts((prev) => {
      const updated = [...prev, newExpert];
      requestAnimationFrame(() => {
        const el = document.getElementById(`expert-${newId}`);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return updated;
    });
  };
  const removeExpert = (id) => setExperts((e) => e.filter((x) => x.id !== id));

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    if (mainImage) form.append("mainImage", mainImage);
    form.append("expertsInputTitle", expertsInputTitle);
    form.append("expertsInputDescription", expertsInputDescription);

    form.append("cardCount", cards.length);
    cards.forEach((c, i) => {
      if (c.image) form.append(`cardImage_${i}`, c.image);
      form.append(`cardTitle_${i}`, c.title);
      form.append(`cardDesc_${i}`, c.description);
    });

    form.append("expCount", experts.length);
    experts.forEach((ex, i) => {
      if (ex.image) form.append(`expImage_${i}`, ex.image);
      form.append(`expName_${i}`, ex.name);
      form.append(`expRole_${i}`, ex.role);
    });

    const isUpdate = !!mainPreview || cards.some((c) => c.preview) || experts.some((e) => e.preview);
    const res = await fetch("/api/users/about", {
      method: isUpdate ? "PUT" : "POST",
      body: form,
    });

    const data = await res.json();
    setSaving(false);
    alert(data.message || data.error);
    if (res.ok) {
      onSuccess && onSuccess();
      setTimeout(() => window.location.reload(), 800);
    }
  };

  if (loading) return <p className="text-center p-6">Loading form...</p>;

  return (
    <form onSubmit={submit} className="space-y-10 max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">About Information</h2>
        <button type="button" onClick={() => window.location.reload()} className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800">
          <RefreshCw size={16} /> Reload
        </button>
      </div>

      <div className="space-y-4">
        <input type="text" placeholder="Main Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded-lg p-3 focus:ring-2  outline-none" />
        <textarea placeholder="Main Description..."  value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full border rounded-lg p-3 focus:ring-2  outline-none" />
        <div>
          <label className="block font-bold mb-1 text-black">Main Image</label>
          <input type="file" accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0] || null;
              setMainImage(file);
              handlePreview(file, setMainPreview);
            }}
            className="block text-sm text-gray-600"
          />
          {mainPreview && (
            <div className="relative inline-block mt-2">
              <Image src={mainPreview} alt="Main" width={100} height={80} className="object-cover rounded-md border" />
              <button type="button" onClick={() => { setMainImage(null); setMainPreview(""); }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">Cards</h3>
          <button type="button" onClick={addCard} className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
            <Plus size={16} /> Add Card
          </button>
        </div>
        {cards.map((c, i) => (
          <div key={c.id} id={`card-${c.id}`} className="p-4 border rounded-lg bg-gray-50 space-y-3 relative">
            {cards.length > 1 && (
              <button type="button" onClick={() => removeCard(c.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                <X size={18} />
              </button>
            )}
            <input placeholder="Card Title" value={c.title} onChange={(e) => { const nc = [...cards]; nc[i].title = e.target.value; setCards(nc); }} className="w-full border rounded-lg p-2" />
            <textarea placeholder="Card Description" value={c.description} onChange={(e) => { const nc = [...cards]; nc[i].description = e.target.value; setCards(nc); }} rows={2} className="w-full border rounded-lg p-2" />
            <div className="flex items-center gap-4">
              <input type="file" accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0] || null;
                  const nc = [...cards];
                  nc[i].image = file;
                  handlePreview(file, (url) => { nc[i].preview = url; setCards([...nc]); });
                }}
                className="block text-sm text-gray-600"
              />
              {c.preview && (
                <div className="relative inline-block">
                  <Image src={c.preview} alt="Card" width={80} height={60} className="object-cover rounded-md border" />
                  <button type="button" onClick={() => {
                    const nc = [...cards]; nc[i].image = null; nc[i].preview = null; setCards(nc);
                  }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Experts Section Title</label>
              <input
                type="text"
                placeholder="e.g., Meet Our Experts"
                value={expertsInputTitle}
                onChange={(e) => setExpertsInputTitle(e.target.value)}
                className="w-full px-4 py-3 text-xl font-bold text-center bg-white border border-blue-300 rounded-lg focus:ring-2  focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-blue-900 mb-2">Section Description</label>
              <textarea
                placeholder="e.g., The dedicated professionals driving innovation..."
                value={expertsInputDescription}
                onChange={(e) => setExpertsInputDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 text-sm text-gray-700 bg-white border border-blue-300 rounded-lg resize-none focus:ring-2  focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={addExpert}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Plus size={18} /> Add Expert
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto custom-scrollbar space-y-6">
          {experts.map((ex, i) => (
            <div
              key={ex.id}
              id={`expert-${ex.id}`}
              className="relative group bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
            >
              {experts.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExpert(ex.id)}
                  className="absolute top-3 right-3 bg-red-200 text-red-600 p-2 rounded-full"
                >
                  <X size={16} />
                </button>
              )}

              <div className="grid md:grid-cols-3 gap-5">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Photo</label>
                  <div className="flex flex-col items-center">
                    {ex.preview ? (
                      <div className="relative">
                        <Image
                          src={ex.preview}
                          alt="Expert"
                          width={140}
                          height={120}
                          className="object-cover border-4 border-white shadow-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const ne = [...experts];
                            ne[i].image = null;
                            ne[i].preview = null;
                            setExperts(ne);
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0] || null;
                        const ne = [...experts];
                        ne[i].image = file;
                        handlePreview(file, (url) => {
                          ne[i].preview = url;
                          setExperts([...ne]);
                        });
                      }}
                      className="mt-3 block w-full text-xs text-gray-600 file:mr-3 file:py-2 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      placeholder="e.g., John Doe"
                      value={ex.name}
                      onChange={(e) => {
                        const ne = [...experts];
                        ne[i].name = e.target.value;
                        setExperts(ne);
                      }}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2  focus:border-transparent outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role / Designation</label>
                    <input
                      placeholder="e.g., Chief Technology Officer"
                      value={ex.role}
                      onChange={(e) => {
                        const ne = [...experts];
                        ne[i].role = e.target.value;
                        setExperts(ne);
                      }}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2  focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center pt-4 border-t space-y-2">
        <button disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-[#48adb9] hover:bg-[#48a5af] text-white rounded-lg font-medium disabled:opacity-50">
          <Save size={18} /> {saving ? "Saving..." : "Save All"}
        </button>
      </div>
    </form>
  );
}