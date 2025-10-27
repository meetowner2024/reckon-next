"use client";
import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Save, Loader2, ArrowUp } from "lucide-react";
export default function ContactAdmin() {
  const [office, setOffice] = useState({
    title: "",
    description: "",
    address: "",
    mapUrl: "",
  });
  const [phones, setPhones] = useState([]);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const bottomRef = useRef(null);
  const topRef = useRef(null);
  useEffect(() => {
    fetchContact();
  }, []);
  const fetchContact = async () => {
    try {
      const res = await fetch("/api/users/contactus/contact");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setOffice({
        title: data.office?.title ?? "",
        description: data.office?.description ?? "",
        address: data.office?.address ?? "",
        mapUrl: data.office?.mapUrl ?? "",
      });
      setPhones(
        Array.isArray(data.phones)
          ? data.phones.map((p) => ({
              label: p.label ?? "",
              number: p.number ?? "",
            }))
          : []
      );
      setEmails(
        Array.isArray(data.emails)
          ? data.emails.map((e) => ({
              label: e.label ?? "",
              address: e.address ?? "",
            }))
          : []
      );
    } catch (err) {
      console.error(err);
      alert("Failed to load contact data");
    } finally {
      setLoading(false);
    }
  };
  const handleOfficeChange = (field, value) => {
    setOffice((prev) => ({ ...prev, [field]: value }));
  };
  const handlePhoneChange = (index, field, value) => {
    const updated = [...phones];
    updated[index][field] = value;
    setPhones(updated);
  };
  const handleEmailChange = (index, field, value) => {
    const updated = [...emails];
    updated[index][field] = value;
    setEmails(updated);
  };
  const addPhone = () => {
    setPhones((prev) => [...prev, { label: "Service", number: "" }]);
    scrollToBottom();
  };
  const addEmail = () => {
    setEmails((prev) => [...prev, { label: "Service", address: "" }]);
    scrollToBottom();
  };
  const removePhone = (index) => {
    setPhones(phones.filter((_, i) => i !== index));
  };
  const removeEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
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
  const saveContact = async () => {
    if (!office.title.trim()) return alert("Office title is required");
    if (!office.description.trim())
      return alert("Office description is required");
    if (!office.address.trim()) return alert("Office address is required");
    if (phones.some((p) => !p.label.trim() || !p.number.trim())) {
      return alert("All phone entries must have label and number");
    }
    if (emails.some((e) => !e.label.trim() || !e.address.trim())) {
      return alert("All email entries must have label and address");
    }
    setSaving(true);
    try {
      const payload = {
        office: {
          title: office.title.trim(),
          description: office.description.trim(),
          address: office.address.trim(),
          mapUrl: office.mapUrl.trim(),
        },
        phones: phones.map((p) => ({
          label: p.label.trim(),
          number: p.number.trim(),
          tel: `tel:${p.number.replace(/[^0-9+]/g, "")}`,
        })),
        emails: emails.map((e) => ({
          label: e.label.trim(),
          address: e.address.trim(),
          mailto: `mailto:${e.address.trim()}`,
        })),
      };
      const res = await fetch("/api/users/contactus/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");
      alert("Contact updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save contact");
    } finally {
      setSaving(false);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#0e55a1]" />
        <span className="ml-2 text-lg">Loading contact data...</span>
      </div>
    );
  }
  return (
    <>
      {}
      <div ref={topRef} className="h-0" />
      <div className="max-w-5xl mx-auto p-6 space-y-10 pb-32">
        {}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#0e55a1] tracking-tight">
            Contact Information
          </h1>
          <button
            onClick={saveContact}
            disabled={saving}
            className="flex items-center gap-2 bg-[#0e55a1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d4a8a] transition disabled:opacity-60"
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
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Office Details
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={office.title}
                onChange={(e) => handleOfficeChange("title", e.target.value)}
                placeholder="e.g. Visit Office"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1] focus:border-[#0e55a1]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                value={office.description}
                onChange={(e) =>
                  handleOfficeChange("description", e.target.value)
                }
                placeholder="e.g. You are most welcome..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address (use \n for line breaks)
              </label>
              <textarea
                value={office.address}
                onChange={(e) => handleOfficeChange("address", e.target.value)}
                rows={4}
                placeholder="H No: 10-158/1..."
                className="w-full p-3 border rounded-lg resize-y focus:ring-2 focus:ring-[#0e55a1]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Google Maps Embed URL
              </label>
              <input
                type="text"
                value={office.mapUrl}
                onChange={(e) => handleOfficeChange("mapUrl", e.target.value)}
                placeholder="https://www.google.com/maps/embed?..."
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
              />
            </div>
          </div>
        </div>
        {}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#0e55a1]">
              Phone Numbers ({phones.length})
            </h2>
            <button
              onClick={addPhone}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
            >
              <Plus className="w-5 h-5" />
              Add Phone
            </button>
          </div>
          {phones.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl text-gray-500">
              <p className="text-lg">
                No phone numbers yet. Click “Add Phone” to start.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {phones.map((phone, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm font-medium text-[#0e55a1] bg-[#0e55a1]/10 px-3 py-1 rounded-full">
                      Phone #{index + 1}
                    </span>
                    <button
                      onClick={() => removePhone(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
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
                        value={phone.label}
                        onChange={(e) =>
                          handlePhoneChange(index, "label", e.target.value)
                        }
                        placeholder="e.g. Service"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number
                      </label>
                      <input
                        type="text"
                        value={phone.number}
                        onChange={(e) =>
                          handlePhoneChange(index, "number", e.target.value)
                        }
                        placeholder="+91 88860 77754"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
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
              Email Addresses ({emails.length})
            </h2>
            <button
              onClick={addEmail}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              <Plus className="w-5 h-5" />
              Add Email
            </button>
          </div>
          {emails.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl text-gray-500">
              <p className="text-lg">
                No emails yet. Click “Add Email” to start.
              </p>
            </div>
          ) : (
            <div className="grid gap-6">
              {emails.map((email, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm font-medium text-[#0e55a1] bg-[#0e55a1]/10 px-3 py-1 rounded-full">
                      Email #{index + 1}
                    </span>
                    <button
                      onClick={() => removeEmail(index)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
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
                        value={email.label}
                        onChange={(e) =>
                          handleEmailChange(index, "label", e.target.value)
                        }
                        placeholder="e.g. Support"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email.address}
                        onChange={(e) =>
                          handleEmailChange(index, "address", e.target.value)
                        }
                        placeholder="reckonext@gmail.com"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#0e55a1]"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
        {}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg z-40">
          <button
            onClick={saveContact}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-[#0e55a1] text-white py-3 rounded-lg font-bold hover:bg-[#0d4a8a] transition disabled:opacity-60"
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
          fixed bottom-24 right-6 bg-[#0e55a1] text-white p-4 rounded-full shadow-2xl
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
