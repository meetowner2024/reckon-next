"use client";
import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  ArrowUp,
  GripVertical,
} from "lucide-react";
export default function CareersAdmin() {
  const [formTitle, setFormTitle] = useState("");
  const [formFields, setFormFields] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const bottomRef = useRef(null);
  const topRef = useRef(null);
  useEffect(() => {
    fetchConfig();
  }, []);
  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/users/careers");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setFormTitle(data.formTitle || "Career Application");
      setFormFields(
        Array.isArray(data.formFields)
          ? data.formFields.map((f) => ({
              id: f.id || String(Date.now() + Math.random()),
              name: f.name || "",
              label: f.label || "",
              type: f.type || "text",
              placeholder: f.placeholder || "",
              required: f.required || false,
              rows: f.rows || 5,
            }))
          : []
      );
      setBenefits(
        Array.isArray(data.benefits)
          ? data.benefits.map((b) => ({
              icon: b.icon || "Icon",
              title: b.title || "",
              desc: b.desc || "",
            }))
          : []
      );
      setTestimonials(
        Array.isArray(data.testimonials)
          ? data.testimonials.map((t) => ({
              name: t.name || "",
              role: t.role || "",
              quote: t.quote || "",
              image: t.image || "",
            }))
          : []
      );
    } catch (err) {
      console.error(err);
      alert("Failed to load careers config");
    } finally {
      setLoading(false);
    }
  };
  const handleFieldChange = (index, field, value) => {
    const updated = [...formFields];
    updated[index][field] = value;
    setFormFields(updated);
  };
  const addField = () => {
    setFormFields((prev) => [
      ...prev,
      {
        id: String(Date.now() + Math.random()),
        name: "",
        label: "",
        type: "text",
        placeholder: "",
        required: false,
        rows: 5,
      },
    ]);
    scrollToBottom();
  };
  const removeField = (index) => {
    setFormFields(formFields.filter((_, i) => i !== index));
  };
  const addBenefit = () => {
    setBenefits((prev) => [...prev, { icon: "Icon", title: "", desc: "" }]);
    scrollToBottom();
  };
  const removeBenefit = (index) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };
  const addTestimonial = () => {
    setTestimonials((prev) => [
      ...prev,
      { name: "", role: "", quote: "", image: "" },
    ]);
    scrollToBottom();
  };
  const removeTestimonial = (index) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };
  const scrollToBottom = () => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const onDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragOver = (e) => e.preventDefault();
  const onDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    const updated = [...formFields];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, moved);
    setFormFields(updated);
    setDraggedIndex(null);
  };
  const saveConfig = async () => {
    if (!formTitle.trim()) return alert("Form title is required");
    if (formFields.some((f) => !f.label.trim() || !f.name.trim()))
      return alert("All form fields must have label and name");
    setSaving(true);
    try {
      const payload = {
        formTitle: formTitle.trim(),
        formFields: formFields.map((f) => ({
          id: f.id,
          name: f.name.trim(),
          label: f.label.trim(),
          type: f.type,
          placeholder: f.placeholder.trim(),
          required: f.required,
          rows: f.type === "textarea" ? f.rows : undefined,
        })),
        benefits: benefits.map((b) => ({
          icon: b.icon.trim(),
          title: b.title.trim(),
          desc: b.desc.trim(),
        })),
        testimonials: testimonials.map((t) => ({
          name: t.name.trim(),
          role: t.role.trim(),
          quote: t.quote.trim(),
          image: t.image.trim(),
        })),
      };
      const res = await fetch("/api/users/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Save failed");
      alert("Careers configuration saved successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  };
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#0e55a1]" />
        <span className="ml-2 text-lg">Loading careers config...</span>
      </div>
    );
  }
  return (
    <>
      <div ref={topRef} className="h-0" />
      <div className="max-w-5xl mx-auto p-6 space-y-10 pb-32">
        {}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#0e55a1] tracking-tight">
            Careers Page Admin
          </h1>
          <button
            onClick={saveConfig}
            disabled={saving}
            className="flex cursor-pointer  items-center gap-2 bg-[#0e55a1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d4a8a] transition disabled:opacity-60"
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
        {}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Form Title
          </label>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="e.g. Career Application"
            className="w-full p-4 text-lg border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
          />
        </div>
        {}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#0e55a1]">
              Form Fields ({formFields.length})
            </h2>
            <button
              onClick={addField}
              className="flex cursor-pointer  items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
            >
              <Plus className="w-5 h-5" />
              Add Field
            </button>
          </div>
          {formFields.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl text-gray-500">
              <p className="text-lg">
                No fields yet. Click “Add Field” to start.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {formFields.map((field, index) => (
                <div
                  key={field.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, index)}
                  onDragOver={onDragOver}
                  onDrop={(e) => onDrop(e, index)}
                  className={`bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition cursor-move ${
                    draggedIndex === index ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-5 h-5 text-gray-400 cursor-grab" />
                      <span className="text-sm font-medium text-[#0e55a1] bg-[#0e55a1]/10 px-3 py-1 rounded-full">
                        Field #{index + 1}
                      </span>
                    </div>
                    <button
                      onClick={() => removeField(index)}
                      className="text-red-600 cursor-pointer  hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Label
                      </label>
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) =>
                          handleFieldChange(index, "label", e.target.value)
                        }
                        placeholder="Full Name"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name (for backend)
                      </label>
                      <input
                        type="text"
                        value={field.name}
                        onChange={(e) =>
                          handleFieldChange(index, "name", e.target.value)
                        }
                        placeholder="full_name"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Type
                      </label>
                      <select
                        value={field.type}
                        onChange={(e) =>
                          handleFieldChange(index, "type", e.target.value)
                        }
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="tel">Phone</option>
                        <option value="file">File</option>
                        <option value="textarea">Textarea</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Placeholder
                      </label>
                      <input
                        type="text"
                        value={field.placeholder}
                        onChange={(e) =>
                          handleFieldChange(
                            index,
                            "placeholder",
                            e.target.value
                          )
                        }
                        placeholder="Enter your name"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
                      />
                    </div>
                    {field.type === "textarea" && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Rows
                        </label>
                        <input
                          type="number"
                          value={field.rows}
                          onChange={(e) =>
                            handleFieldChange(
                              index,
                              "rows",
                              parseInt(e.target.value) || 5
                            )
                          }
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <label className="text-sm font-semibold text-gray-700">
                        Required
                      </label>
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) =>
                          handleFieldChange(index, "required", e.target.checked)
                        }
                        className="w-5 h-5 text-[#0e55a1] rounded focus:ring-[#0e55a1]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#0e55a1]">
              Why Join us ({benefits.length})
            </h2>
            <button
              onClick={addBenefit}
              className="flex cursor-pointer  items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              Add Benefit
            </button>
          </div>
          {benefits.map((b, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium text-[#0e55a1] bg-[#0e55a1]/10 px-3 py-1 rounded-full">
                  Benefit #{i + 1}
                </span>
                <button
                  onClick={() => removeBenefit(i)}
                  className="text-red-600 cursor-pointer  hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  placeholder="Icon (e.g. Innovation)"
                  value={b.icon}
                  onChange={(e) => {
                    const updated = [...benefits];
                    updated[i].icon = e.target.value;
                    setBenefits(updated);
                  }}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
                />
                <input
                  placeholder="Title"
                  value={b.title}
                  onChange={(e) => {
                    const updated = [...benefits];
                    updated[i].title = e.target.value;
                    setBenefits(updated);
                  }}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
                />
                <input
                  placeholder="Description"
                  value={b.desc}
                  onChange={(e) => {
                    const updated = [...benefits];
                    updated[i].desc = e.target.value;
                    setBenefits(updated);
                  }}
                  className="p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
                />
              </div>
            </div>
          ))}
        </div>
        {}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-40">
          <button
            onClick={saveConfig}
            disabled={saving}
            className="w-full cursor-pointer  flex items-center justify-center gap-2 bg-[#0e55a1] text-white py-3 rounded-lg font-bold hover:bg-[#0d4a8a] transition disabled:opacity-60"
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
      {}
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-24 cursor-pointer  right-6 bg-[#0e55a1] text-white p-4 rounded-full shadow-2xl
          hover:bg-[#0d4a8a] transition-all duration-300 z-[9999] flex items-center justify-center
          ${
            showScrollTop
              ? "opacity-100 scale-100"
              : "opacity-0 scale-50 pointer-events-none"
          }
        `}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </>
  );
}
