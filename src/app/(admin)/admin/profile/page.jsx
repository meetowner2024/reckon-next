"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Loader2, Upload } from "lucide-react";
import Image from "next/image";
export default function ProfileAdmin() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    fetchConfig();
  }, []);
  const fetchConfig = async () => {
    try {
      const res = await fetch("/api/users/profile");
      const data = await res.json();

      setSections(data.sections || []);
    } catch {
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { title: "", diagrams: [{ title: "", src: "", file: null }] },
    ]);
  };
  const updateSection = (idx, field, value) => {
    const updated = [...sections];
    updated[idx][field] = value;
    setSections(updated);
  };
  const addDiagram = (secIdx) => {
    const updated = [...sections];
    updated[secIdx].diagrams.push({ title: "", src: "", file: null });
    setSections(updated);
  };
  const updateDiagram = (secIdx, diagIdx, field, value) => {
    const updated = [...sections];
    updated[secIdx].diagrams[diagIdx][field] = value;
    setSections(updated);
  };
  const removeDiagram = (secIdx, diagIdx) => {
    const updated = [...sections];
    updated[secIdx].diagrams.splice(diagIdx, 1);
    setSections(updated);
  };
  const removeSection = (idx) => {
    setSections(sections.filter((_, i) => i !== idx));
  };
  const handleFileChange = (e, secIdx, diagIdx) => {
    const file = e.target.files[0];
    if (file) {
      const updated = [...sections];
      updated[secIdx].diagrams[diagIdx].file = file;
      updated[secIdx].diagrams[diagIdx].src = URL.createObjectURL(file);
      setSections(updated);
    }
  };
  const save = async () => {
    if (sections.some((s) => !s.title.trim()))
      return alert("All sections need a title");
    if (sections.some((s) => s.diagrams.some((d) => !d.title.trim())))
      return alert("All diagrams need a title");
    setSaving(true);
    const formData = new FormData();

    const filesToUpload = [];
    const fileMap = [];
    sections.forEach((sec, secIdx) => {
      sec.diagrams.forEach((diag, diagIdx) => {
        if (diag.file) {
          filesToUpload.push(diag.file);
          fileMap.push([secIdx, diagIdx]);
        }
      });
    });
    formData.append("sections", JSON.stringify(sections));
    formData.append("fileMap", JSON.stringify(fileMap));
    filesToUpload.forEach((file) => formData.append("files", file));
    try {
      const res = await fetch("/api/users/profile", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error();
      alert("Profile saved!");
      fetchConfig();
    } catch {
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };
  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#0e55a1]" />
      </div>
    );
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#0e55a1]">Profile Admin</h1>
        <button
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 bg-[#0e55a1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d4a8a] disabled:opacity-60"
        >
          {saving ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" /> Save
            </>
          )}
        </button>
      </div>

      <button
        onClick={addSection}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#0e55a1] hover:text-[#0e55a1] transition flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" /> Add Section
      </button>
      {sections.map((section, secIdx) => (
        <div
          key={secIdx}
          className="bg-white p-6 rounded-xl shadow-sm border space-y-6"
        >
          <div className="flex justify-between items-center">
            <input
              type="text"
              value={section.title}
              onChange={(e) => updateSection(secIdx, "title", e.target.value)}
              placeholder="Section Title"
              className="text-xl font-bold flex-1 p-2 border rounded-lg"
            />
            <button
              onClick={() => removeSection(secIdx)}
              className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {section.diagrams.map((diag, diagIdx) => (
              <div
                key={diagIdx}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <input
                  type="text"
                  value={diag.title}
                  onChange={(e) =>
                    updateDiagram(secIdx, diagIdx, "title", e.target.value)
                  }
                  placeholder="Diagram Title"
                  className="flex-1 p-2 border rounded-lg"
                />
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, secIdx, diagIdx)}
                  />
                  <div className="px-4 py-2 bg-[#0e55a1] text-white rounded-lg text-sm flex items-center gap-1">
                    <Upload className="w-4 h-4" />{" "}
                    {diag.file ? "Change" : "Upload"}
                  </div>
                </label>
                {diag.src && (
                  <Image
                    src={diag.src}
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                    width={64}
                    height={64}
                  />
                )}
                <button
                  onClick={() => removeDiagram(secIdx, diagIdx)}
                  className="text-red-600 hover:bg-red-50 p-2 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => addDiagram(secIdx)}
              className="text-sm text-[#0e55a1] hover:underline flex items-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add Diagram
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
