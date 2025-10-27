"use client";
import { useState, useEffect } from "react";

export default function FAQManager() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);

  const [form, setForm] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const res = await fetch("/api/users/faqs");
      const data = await res.json();
      setFaqs(data);
    } catch {
      alert("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (faq = null) => {
    setEditingFAQ(faq);
    setForm({
      question: faq?.question ?? "",
      answer: faq?.answer ?? "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingFAQ(null);
  };

  const saveFAQ = async () => {
    if (!form.question.trim() || !form.answer.trim()) {
      alert("Both fields are required");
      return;
    }

    const payload = {
      ...(editingFAQ ? { _id: editingFAQ._id } : {}),
      question: form.question.trim(),
      answer: form.answer.trim(),
    };

    const res = await fetch("/api/users/faqs", {
      method: editingFAQ ? "PUT" : "PUT", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message ?? "Save failed");
    }

    alert(editingFAQ ? "Updated!" : "Added!");
    closeModal();
    fetchFAQs();
  };

  const deleteFAQ = async (id) => {
    if (!confirm("Delete this FAQ?")) return;

    const res = await fetch(`/api/users/faqs?_id=${id}`, { method: "DELETE" });
    if (res.ok) {
      fetchFAQs();
    } else {
      alert("Delete failed");
    }
  };


  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-teal-600">FAQ Manager</h1>
        <button
          onClick={() => openModal()}
          className="bg-teal-600 cursor-pointer cursor-pointer text-white px-6 py-2 rounded-lg hover:bg-teal-700 font-medium"
        >
          Add FAQ
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {faqs.map((faq) => (
          <div
            key={faq._id}
            className="border rounded-xl p-5 bg-white shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg text-gray-800">{faq.question}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {faq.answer}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openModal(faq)}
                className="flex-1  cursor-pointer bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => deleteFAQ(faq._id)}
                className="flex-1 cursor-pointer bg-red-600 text-white py-2 rounded text-sm font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-5 text-teal-600">
              {editingFAQ ? "Edit FAQ" : "Add New FAQ"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Question *</label>
                <input
                  type="text"
                  value={form.question}
                  onChange={(e) =>
                    setForm({ ...form, question: e.target.value })
                  }
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. What are the benefits..."
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Answer *</label>
                <textarea
                  value={form.answer}
                  onChange={(e) =>
                    setForm({ ...form, answer: e.target.value })
                  }
                  rows={4}
                  className="w-full p-2 border rounded resize-y focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={saveFAQ}
                className="flex-1 cursor-pointer bg-teal-600 text-white py-2.5 rounded font-medium hover:bg-teal-700"
              >
                {editingFAQ ? "Update" : "Add"}
              </button>
              <button
                onClick={closeModal}
                className="flex-1 cursor-pointer bg-gray-300 text-gray-700 py-2.5 rounded font-medium hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}