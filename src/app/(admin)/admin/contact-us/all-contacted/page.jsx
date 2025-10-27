"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Edit,
  Trash2,
  Loader2,
  Calendar,
  Mail,
  Phone,
  User,
  MessageSquare,
  Hash,
  RefreshCw,
} from "lucide-react";
export default function ContactDataTable({ onEdit }) {
  const [contacts, setContacts] = useState([]);
  const [formConfig, setFormConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const [configRes, dataRes] = await Promise.all([
        fetch("/api/users/contactus/form-config"),
        fetch("/api/users/contactus/contact-submit"),
      ]);
      if (!configRes.ok || !dataRes.ok) throw new Error("Failed to load");
      const config = await configRes.json();
      const data = await dataRes.json();
      const contactArray = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
        ? data.data
        : [];
      const fieldsWithId = config.formFields.map((f, i) => ({
        ...f,
        id:
          f.id ||
          f.label
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "") ||
          `field-${i}`,
      }));
      setFormConfig({ ...config, formFields: fieldsWithId });
      setContacts(contactArray);
    } catch (err) {
      console.error("Failed to load contact data:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this contact?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/users/contactus/contact-submit?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    } finally {
      setDeletingId(null);
    }
  };
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  const getIcon = (key) => {
    if (key.includes("name") || key.includes("full"))
      return <User className="w-4 h-4 text-blue-600" />;
    if (key.includes("mobile") || key.includes("phone"))
      return <Phone className="w-4 h-4 text-green-600" />;
    if (key.includes("email") || key.includes("gmail"))
      return <Mail className="w-4 h-4 text-purple-600" />;
    if (key.includes("message"))
      return <MessageSquare className="w-4 h-4 text-orange-600" />;
    return <Hash className="w-4 h-4 text-gray-500" />;
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#0e55a1]" />
        <span className="ml-3 text-lg font-medium text-gray-700">
          Loading contacts...
        </span>
      </div>
    );
  }
  if (contacts.length === 0) {
    return (
      <div className="text-center py-16 bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-28 h-28 mx-auto mb-5" />
        <p className="text-2xl font-bold text-gray-700">No Submissions Yet</p>
        <p className="text-sm text-gray-500 mt-2">
          Contact form data will appear here
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-3">
        {}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-[#0e55a1] tracking-tight">
            Contact Submissions
          </h2>
          <p className="text-sm text-gray-600">
            {contacts.length} {contacts.length === 1 ? "entry" : "entries"}{" "}
            total
          </p>
        </div>
        {}
        <button
          onClick={fetchData}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-sm font-medium text-[#0e55a1] rounded-lg hover:bg-[#0e55a1]/5 hover:border-[#0e55a1] transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>
      <div className=" overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white">
        <table className="w-full">
          <thead>
            <tr className="bg-linear-to-r from-[#0e55a1]/10 via-[#0e55a1]/5 to-transparent">
              <th className="px-6 py-4 text-left text-xs font-bold text-[#0e55a1] uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4" /> #
                </div>
              </th>
              {formConfig?.formFields.map((field) => (
                <th
                  key={field.id}
                  className="px-6 py-4 text-left text-xs font-bold text-[#0e55a1] uppercase tracking-wider"
                >
                  <div className="flex items-center gap-2">
                    {getIcon(field.id)}
                    {field.label}
                  </div>
                </th>
              ))}
              <th className="px-6 py-4 text-left text-xs font-bold text-[#0e55a1] uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Submitted
                </div>
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-[#0e55a1] uppercase tracking-wider pr-8">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence>
              {contacts.map((contact, idx) => (
                <motion.tr
                  key={contact._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ delay: idx * 0.03 }}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  } hover:bg-linear-to-r hover:from-blue-50/70 hover:to-transparent transition-all duration-300 group`}
                >
                  {}
                  <td className="px-6 py-7 text-sm font-mono text-gray-600 font-medium">
                    {idx + 1}
                  </td>
                  {}
                  {formConfig?.formFields.map((field) => {
                    const value =
                      contact[field.id] ||
                      contact[
                        Object.keys(contact).find((k) =>
                          k.toLowerCase().includes(field.id.toLowerCase())
                        )
                      ] ||
                      "-";
                    return (
                      <td
                        key={field.id}
                        className="px-6 py-7 text-sm text-gray-800 max-w-xs"
                      >
                        {field.id.includes("message") ? (
                          <div
                            className="truncate max-w-[220px] text-gray-600 italic"
                            title={value}
                          >
                            {value.length > 60
                              ? value.slice(0, 60) + "..."
                              : value}
                          </div>
                        ) : value === "-" ? (
                          <span className="text-gray-400">—</span>
                        ) : (
                          <span className="font-medium">{value}</span>
                        )}
                      </td>
                    );
                  })}
                  {}
                  <td className="px-6 py-7 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-medium">
                        {formatDate(contact.created_at)}
                      </span>
                    </div>
                  </td>
                  {}
                  <td className="px-6 py-7 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {}
                      <button
                        onClick={() => {
                          const formData = {};
                          formConfig.formFields.forEach((f) => {
                            const key = Object.keys(contact).find((k) =>
                              k.toLowerCase().includes(f.id.toLowerCase())
                            );
                            formData[f.id] = contact[key] || "";
                          });
                          onEdit(formData, contact._id);
                        }}
                        className="p-2.5 bg-blue-50 text-[#0e55a1] rounded-lg hover:bg-[#0e55a1] hover:text-white transition-all duration-200 shadow-sm"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {}
                      <button
                        onClick={() => handleDelete(contact._id)}
                        disabled={deletingId === contact._id}
                        className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm disabled:opacity-50"
                        title="Delete"
                      >
                        {deletingId === contact._id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      {}
      <div className="md:hidden space-y-4">
        {contacts.map((contact, idx) => (
          <motion.div
            key={contact._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-gray-500" />
                <span className="font-mono text-sm font-semibold text-[#0e55a1]">
                  #{idx + 1}
                </span>
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => handleDelete(contact._id)}
                  disabled={deletingId === contact._id}
                  className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition disabled:opacity-50"
                >
                  {deletingId === contact._id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-3">
              {formConfig?.formFields.map((field) => {
                const value =
                  contact[field.id] ||
                  contact[
                    Object.keys(contact).find((k) =>
                      k.toLowerCase().includes(field.id.toLowerCase())
                    )
                  ] ||
                  "-";
                return (
                  <div key={field.id} className="flex items-start gap-3">
                    <div className="mt-0.5">{getIcon(field.id)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        {field.label}
                      </p>
                      <p className="text-sm text-gray-800 wrap-break-word">
                        {field.id.includes("message") && value.length > 100
                          ? value.slice(0, 100) + "..."
                          : value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-2 border-t border-gray-100">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(contact.created_at)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
