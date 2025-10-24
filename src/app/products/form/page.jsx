"use client";
import { useState } from "react";
import Image from "next/image";
export default function AddProductPage() {
  const [form, setForm] = useState({
    slug: "",
    title: "",
    banner: { title: "", subtitle: "", image: [] },
    about: {
      mainText: "",
      manufacturerText: "",
      specs: [],
      useCases: [],
    },
    advantages: [],
    faqs: [],
  });
  const [uploading, setUploading] = useState(false);
  const handleFileUpload = async (file, fieldPath) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/users/products/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUploading(false);
    if (data.url) {
      setForm((prev) => {
        const updated = { ...prev };
        const keys = fieldPath.split(".");
        let obj = updated;
        for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
        obj[keys[keys.length - 1]] = data.url;
        return updated;
      });
    }
  };
  const handleChange = (e, fieldPath) => {
    const { value } = e.target;
    setForm((prev) => {
      const updated = { ...prev };
      const keys = fieldPath.split(".");
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };
  const addUseCase = () => {
    setForm((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        useCases: [...prev.about.useCases, { title: "", desc: "", img: "" }],
      },
    }));
  };
  const addAdvantage = () => {
    setForm((prev) => ({
      ...prev,
      advantages: [...prev.advantages, { title: "", desc: "" }],
    }));
  };
  const addFaq = () => {
    setForm((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/users/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    alert(data.message || "Submitted!");
  };
  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {}
        <div>
          <label className="block font-medium mb-1">Slug</label>
          <input
            type="text"
            className="border rounded-md w-full p-2"
            value={form.slug}
            onChange={(e) => handleChange(e, "slug")}
            placeholder="e.g. casement-doors"
          />
        </div>
        {}
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="border rounded-md w-full p-2"
            value={form.title}
            onChange={(e) => handleChange(e, "title")}
            placeholder="Product Title"
          />
        </div>
        {}
        {/* ✅ Banner Section */}
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-3">Banner Section</h2>

          <input
            type="text"
            className="border p-2 w-full mb-2"
            placeholder="Banner Title"
            value={form.banner.title}
            onChange={(e) => handleChange(e, "banner.title")}
          />
          <input
            type="text"
            className="border p-2 w-full mb-2"
            placeholder="Banner Subtitle"
            value={form.banner.subtitle}
            onChange={(e) => handleChange(e, "banner.subtitle")}
          />

          {/* ✅ Multiple Banner Images */}
          <div>
            <label className="block mb-2 font-medium">
              Banner Images (Slider)
            </label>
            <input
              type="file"
              multiple
              onChange={async (e) => {
                const files = Array.from(e.target.files);
                setUploading(true);
                const uploadedUrls = [];

                for (const file of files) {
                  const formData = new FormData();
                  formData.append("file", file);
                  const res = await fetch("/api/users/products/upload", {
                    method: "POST",
                    body: formData,
                  });
                  const data = await res.json();
                  if (data.url) uploadedUrls.push(data.url);
                }

                setForm((prev) => ({
                  ...prev,
                  banner: {
                    ...prev.banner,
                    images: [...(prev.banner.images || []), ...uploadedUrls],
                  },
                }));

                setUploading(false);
              }}
            />

            {uploading && (
              <p className="text-sm text-gray-500 mt-1">Uploading...</p>
            )}

            {/* ✅ Show uploaded images with delete option */}
            <div className="flex flex-wrap gap-3 mt-3">
              {form.banner.images?.map((img, idx) => (
                <div
                  key={idx}
                  className="relative border rounded-lg overflow-hidden group"
                >
                  <Image
                    src={img}
                    alt={`banner-${idx}`}
                    width={160}
                    height={100}
                    className="rounded object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        banner: {
                          ...prev.banner,
                          images: prev.banner.images.filter(
                            (_, i) => i !== idx
                          ),
                        },
                      }))
                    }
                    className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {}
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-3">About Section</h2>
          <textarea
            className="border w-full p-2 mb-2"
            rows="3"
            placeholder="Main Text"
            value={form.about.mainText}
            onChange={(e) => handleChange(e, "about.mainText")}
          />
          <textarea
            className="border w-full p-2"
            rows="3"
            placeholder="Manufacturer Text"
            value={form.about.manufacturerText}
            onChange={(e) => handleChange(e, "about.manufacturerText")}
          />
          {}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Use Cases</h3>
            {form.about.useCases.map((uc, idx) => (
              <div key={idx} className="border rounded p-3 mb-3 bg-gray-50">
                <input
                  type="text"
                  placeholder="Use Case Title"
                  className="border p-2 w-full mb-2"
                  value={uc.title}
                  onChange={(e) => {
                    const updated = [...form.about.useCases];
                    updated[idx].title = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      about: { ...prev.about, useCases: updated },
                    }));
                  }}
                />
                <textarea
                  placeholder="Description"
                  className="border p-2 w-full mb-2"
                  value={uc.desc}
                  onChange={(e) => {
                    const updated = [...form.about.useCases];
                    updated[idx].desc = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      about: { ...prev.about, useCases: updated },
                    }));
                  }}
                />
                <input
                  type="file"
                  onChange={(e) =>
                    handleFileUpload(
                      e.target.files[0],
                      `about.useCases.${idx}.img`
                    )
                  }
                />
                {uc.img && (
                  <Image
                    src={uc.img}
                    alt="usecase"
                    width={120}
                    height={80}
                    className="rounded mt-2"
                  />
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addUseCase}
              className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
            >
              + Add Use Case
            </button>
          </div>
        </div>
        {}
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-3">Advantages</h2>
          {form.advantages.map((adv, idx) => (
            <div key={idx} className="border rounded p-3 mb-3 bg-gray-50">
              <input
                type="text"
                placeholder="Advantage Title"
                className="border p-2 w-full mb-2"
                value={adv.title}
                onChange={(e) => {
                  const updated = [...form.advantages];
                  updated[idx].title = e.target.value;
                  setForm((prev) => ({ ...prev, advantages: updated }));
                }}
              />
              <textarea
                placeholder="Advantage Description"
                className="border p-2 w-full"
                value={adv.desc}
                onChange={(e) => {
                  const updated = [...form.advantages];
                  updated[idx].desc = e.target.value;
                  setForm((prev) => ({ ...prev, advantages: updated }));
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addAdvantage}
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
          >
            + Add Advantage
          </button>
        </div>
        {}
        <div className="border rounded-lg p-4">
          <h2 className="font-semibold text-lg mb-3">FAQs</h2>
          {form.faqs.map((faq, idx) => (
            <div key={idx} className="border rounded p-3 mb-3 bg-gray-50">
              <input
                type="text"
                placeholder="Question"
                className="border p-2 w-full mb-2"
                value={faq.question}
                onChange={(e) => {
                  const updated = [...form.faqs];
                  updated[idx].question = e.target.value;
                  setForm((prev) => ({ ...prev, faqs: updated }));
                }}
              />
              <textarea
                placeholder="Answer"
                className="border p-2 w-full"
                value={faq.answer}
                onChange={(e) => {
                  const updated = [...form.faqs];
                  updated[idx].answer = e.target.value;
                  setForm((prev) => ({ ...prev, faqs: updated }));
                }}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addFaq}
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm"
          >
            + Add FAQ
          </button>
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          {uploading ? "Uploading..." : "Submit Product"}
        </button>
      </form>
    </div>
  );
}
