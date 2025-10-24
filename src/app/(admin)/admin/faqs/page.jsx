// app/admin/faqs/page.jsx
"use client";

import { useState, useEffect } from "react";

export default function FAQManager() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    product: "",
    display: "All Pages",
  });

  // Load FAQs + Products
  useEffect(() => {
    Promise.all([fetchFAQs(), fetchProducts()]);
  }, []);

  const fetchFAQs = async () => {
    try {
      const res = await fetch("/api/users/faqs");
      const data = await res.json();
      setFaqs(data);
    } catch (err) {
      alert("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/users/productsDropdown");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Products load error");
    }
  };

  const openModal = (faq = null) => {
    setEditingFAQ(faq);
    setForm({
      question: faq?.question || "",
      answer: faq?.answer || "",
      product: faq?.product || "",
      display: faq?.display || "All Pages",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingFAQ(null);
  };

  const saveFAQ = async () => {
    const formData = new FormData();
    if (editingFAQ) formData.append("_id", editingFAQ._id);
    formData.append("question", form.question);
    formData.append("answer", form.answer);
    formData.append("product", form.product);
    formData.append("display", form.display);

    const res = await fetch("/api/faqs", {
      method: editingFAQ ? "PUT" : "POST",
      body: formData,
    });

    const result = await res.json();
    if (!res.ok) throw new Error(result.message);

    alert(editingFAQ ? "Updated!" : "Added!");
    closeModal();
    fetchFAQs();
  };

  const deleteFAQ = async (id) => {
    if (!confirm("Delete this FAQ?")) return;
    const res = await fetch(`/api/faqs?_id=${id}`, { method: "DELETE" });
    if (res.ok) fetchFAQs();
    else alert("Delete failed");
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-teal-600">FAQ Manager</h1>
        <button
          onClick={() => openModal()}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 font-medium"
        >
          Add FAQ
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {faqs.map((faq) => (
          <div key={faq._id} className="border rounded-xl p-5 bg-white shadow hover:shadow-lg transition">
            <h3 className="font-bold text-lg text-gray-800">{faq.question}</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{faq.answer}</p>

            <div className="flex gap-2 mt-3 text-xs">
              {faq.product && (
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {faq.product}
                </span>
              )}
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                {faq.display === "homepage" ? "Home Page" : faq.display}
              </span>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openModal(faq)}
                className="flex-1 bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                onClick={() => deleteFAQ(faq._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded text-sm font-medium hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
                  onChange={(e) => setForm({ ...form, question: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g. What are the benefits..."
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Answer *</label>
                <textarea
                  value={form.answer}
                  onChange={(e) => setForm({ ...form, answer: e.target.value })}
                  rows={4}
                  className="w-full p-2 border rounded resize-y focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-medium mb-1">Product</label>
                <select
                  value={form.product}
                  onChange={(e) => setForm({ ...form, product: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">-- None --</option>
                  {products
                    .filter(p => p._id !== "homepage")
                    .map(p => (
                      <option key={p._id} value={p._id}>
                        {p.title}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block font-medium mb-1">Display On</label>
                <select
                  value={form.display}
                  onChange={(e) => setForm({ ...form, display: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-teal-500"
                >
                  {products.map(p => (
                    <option key={p._id} value={p._id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={saveFAQ}
                className="flex-1 bg-teal-600 text-white py-2.5 rounded font-medium hover:bg-teal-700"
              >
                {editingFAQ ? "Update" : "Add"}
              </button>
              <button
                onClick={closeModal}
                className="flex-1 bg-gray-300 text-gray-700 py-2.5 rounded font-medium hover:bg-gray-400"
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