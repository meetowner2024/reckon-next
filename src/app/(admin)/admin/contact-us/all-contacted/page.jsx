"use client";
import { useState, useEffect } from "react";
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
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ContactDataTable({ onEdit }) {
  const [contacts, setContacts] = useState([]);
  const [formConfig, setFormConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedMessage, setExpandedMessage] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && expandedMessage) {
        setExpandedMessage(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [expandedMessage]);

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

  // Pagination calculations
  const totalPages = Math.ceil(contacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContacts = contacts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setExpandedMessage(null); // Close expanded message when changing pages
  };

  const toggleMessage = (contactId, message) => {
    console.log("Toggle message clicked:", contactId, message?.substring(0, 50));
    if (expandedMessage?.id === contactId) {
      setExpandedMessage(null);
    } else {
      setExpandedMessage({ id: contactId, message });
    }
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
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-[#0e55a1] tracking-tight">
            Contact Submissions
          </h2>
          <p className="text-sm text-gray-600">
            {contacts.length} {contacts.length === 1 ? "entry" : "entries"}{" "}
            total
          </p>
        </div>
        <button
          onClick={fetchData}
          className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-sm font-medium text-[#0e55a1] rounded-lg hover:bg-[#0e55a1]/5 hover:border-[#0e55a1] transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-linear-to-r from-[#0e55a1]/10 via-[#0e55a1]/5 to-transparent">
                <th className="px-4 md:px-6 py-4 text-left text-xs font-bold text-[#0e55a1] uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4" /> #
                  </div>
                </th>
                {formConfig?.formFields.map((field) => (
                  <th
                    key={field.id}
                    className="px-4 md:px-6 py-4 text-left text-xs font-bold text-[#0e55a1] uppercase tracking-wider"
                  >
                    <div className="flex items-center gap-2">
                      {getIcon(field.id)}
                      {field.label}
                    </div>
                  </th>
                ))}
                <th className="px-4 md:px-6 py-4 text-left text-xs font-bold text-[#0e55a1] uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Submitted
                  </div>
                </th>
                <th className="px-4 md:px-6 py-4 text-right text-xs font-bold text-[#0e55a1] uppercase tracking-wider pr-8">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {currentContacts.map((contact, idx) => (
                  <motion.tr
                    key={contact._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: idx * 0.03 }}
                    className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      } hover:bg-linear-to-r hover:from-blue-50/70 hover:to-transparent transition-all duration-300 group`}
                  >
                    <td className="px-4 md:px-6 py-5 text-sm font-mono text-gray-600 font-medium">
                      {startIndex + idx + 1}
                    </td>
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
                          className="px-4 md:px-6 py-5 text-sm text-gray-800"
                        >
                          {field.id.includes("message") ? (
                            <div className="flex items-center gap-2">
                              <div
                                className="truncate max-w-[150px] md:max-w-[200px] text-gray-600 italic"
                                title={value !== "-" ? value : ""}
                              >
                                {value !== "-" && value.length > 50
                                  ? value.slice(0, 50) + "..."
                                  : value !== "-" ? value : "—"}
                              </div>
                              {value !== "-" && value.length > 50 && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log("View button clicked for:", contact._id);
                                    toggleMessage(contact._id, value);
                                  }}
                                  className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded transition-colors cursor-pointer whitespace-nowrap flex-shrink-0 ${expandedMessage?.id === contact._id
                                    ? "bg-[#0e55a1] text-white"
                                    : "text-[#0e55a1] bg-[#0e55a1]/10 hover:bg-[#0e55a1]/20"
                                    }`}
                                >
                                  <Eye className="w-3 h-3" />
                                  {expandedMessage?.id === contact._id ? "Hide" : "View"}
                                </button>
                              )}
                            </div>
                          ) : value === "-" ? (
                            <span className="text-gray-400">—</span>
                          ) : (
                            <span className="font-medium break-words">{value}</span>
                          )}
                        </td>
                      );
                    })}
                    <td className="px-4 md:px-6 py-5 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span className="font-medium whitespace-nowrap">
                          {formatDate(contact.created_at)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
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
                          className="p-2.5 cursor-pointer bg-blue-50 text-[#0e55a1] rounded-lg hover:bg-[#0e55a1] hover:text-white transition-all duration-200 shadow-sm"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(contact._id)}
                          disabled={deletingId === contact._id}
                          className="p-2.5 cursor-pointer bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200 shadow-sm disabled:opacity-50"
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
      </div>

      {/* Message Modal Overlay */}
      <AnimatePresence>
        {expandedMessage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedMessage(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setExpandedMessage(null)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl border-2 border-[#0e55a1]/20 w-full max-w-2xl max-h-[80vh] overflow-hidden"
              >
                {/* Modal Header */}
                <div className="bg-gradient-to-r from-[#0e55a1] to-[#0c4580] px-6 py-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-white" />
                    <h3 className="text-lg font-bold text-white">Full Message</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpandedMessage(null)}
                    className="text-white/80 hover:text-white transition-colors cursor-pointer p-1 hover:bg-white/10 rounded-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap break-words">
                      {expandedMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-[#0e55a1]">{startIndex + 1}</span> to{" "}
            <span className="font-semibold text-[#0e55a1]">{Math.min(endIndex, contacts.length)}</span> of{" "}
            <span className="font-semibold text-[#0e55a1]">{contacts.length}</span> entries
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#0e55a1] bg-white border border-gray-300 rounded-lg hover:bg-[#0e55a1]/5 hover:border-[#0e55a1] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${currentPage === page
                        ? "bg-[#0e55a1] text-white shadow-md"
                        : "text-[#0e55a1] bg-white border border-gray-300 hover:bg-[#0e55a1]/5 hover:border-[#0e55a1]"
                        }`}
                    >
                      {page}
                    </button>
                  );
                } else if (page === currentPage - 2 || page === currentPage + 2) {
                  return (
                    <span key={page} className="px-2 text-gray-400">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#0e55a1] bg-white border border-gray-300 rounded-lg hover:bg-[#0e55a1]/5 hover:border-[#0e55a1] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
