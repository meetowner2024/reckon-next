"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  Loader2,
  Calendar,
  FileText,
  User,
  Mail,
  Phone,
  Briefcase,
  Hash,
  RefreshCw,
  Download,
  AlertCircle,
  Settings,
} from "lucide-react";
export default function CareersSubmissionsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchApplications();
  }, []);
  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/users/careers/applications");
      if (!res.ok) throw new Error("Failed to load applications");
      const data = await res.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/users/careers/applications?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      setApplications((prev) => prev.filter((app) => app._id !== id));
    } catch (err) {
    } finally {
      setDeletingId(null);
    }
  };
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  const getFieldIcon = (label) => {
    const l = label.toLowerCase();
    if (l.includes("name")) return <User className="w-4 h-4 text-blue-600" />;
    if (l.includes("email"))
      return <Mail className="w-4 h-4 text-purple-600" />;
    if (l.includes("phone") || l.includes("mobile"))
      return <Phone className="w-4 h-4 text-green-600" />;
    if (l.includes("resume") || l.includes("cv"))
      return <FileText className="w-4 h-4 text-orange-600" />;
    if (l.includes("position") || l.includes("role"))
      return <Briefcase className="w-4 h-4 text-indigo-600" />;
    return <Hash className="w-4 h-4 text-gray-500" />;
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#0e55a1]" />
        <span className="ml-3 text-lg font-medium text-gray-700">
          Loading applications...
        </span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-16 bg-red-50 rounded-2xl border border-red-200">
        <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <p className="text-lg font-medium text-red-800">{error}</p>
        <button
          onClick={fetchApplications}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }
  if (applications.length === 0) {
    return (
      <div className="text-center py-16 bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-28 h-28 mx-auto mb-5" />
        <p className="text-2xl font-bold text-gray-700">No Applications Yet</p>
        <p className="text-sm text-gray-500 mt-2">
          Job applications will appear here
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="mx-auto p-6 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-[#0e55a1] tracking-tight">
              All Career Applications
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {applications.length}{" "}
              {applications.length === 1 ? "application" : "applications"} total
            </p>
          </div>

          <button
            onClick={fetchApplications}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-sm font-medium text-[#0e55a1] rounded-lg hover:bg-[#0e55a1]/5 hover:border-[#0e55a1] transition-all ml-auto"
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
                    <Hash className="w-4 h-4" />
                  </div>
                </th>
                {applications[0] &&
                  Object.keys(applications[0])
                    .filter(
                      (k) =>
                        !["_id", "created_at", "updated_at", "resume"].includes(
                          k
                        )
                    )
                    .map((key) => (
                      <th
                        key={key}
                        className="px-6 py-4 text-left text-xs font-bold text-[#0e55a1] uppercase tracking-wider"
                      >
                        <div className="flex items-center gap-2">
                          {getFieldIcon(key)}
                          {key.replace(/-/g, " ").replace(/_/g, " ")}
                        </div>
                      </th>
                    ))}
                <th className="px-6 py-4 text-left text-xs font-bold text-[#0e55a1] uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Resume
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#0e55a1] uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Applied
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[#0e55a1] uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {applications.map((app, idx) => (
                  <motion.tr
                    key={app._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: idx * 0.03 }}
                    className={`${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    } hover:bg-linear-to-r hover:from-blue-50/70 hover:to-transparent transition-all duration-300 group`}
                  >
                    <td className="px-6 py-7 text-sm font-mono text-gray-600 font-medium">
                      {idx + 1}
                    </td>

                    {Object.keys(app)
                      .filter(
                        (k) =>
                          ![
                            "_id",
                            "created_at",
                            "updated_at",
                            "resume",
                          ].includes(k)
                      )
                      .map((key) => {
                        const value = app[key] || "-";
                        return (
                          <td
                            key={key}
                            className="px-6 py-7 text-sm text-gray-800 max-w-xs"
                          >
                            {value === "-" ? (
                              <span className="text-gray-400">—</span>
                            ) : (
                              <span
                                className="block truncate max-w-[220px]"
                                title={value}
                              >
                                {value}
                              </span>
                            )}
                          </td>
                        );
                      })}

                    <td className="px-6 py-7 text-sm">
                      {app.resume ? (
                        <a
                          href={app.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[#0e55a1] hover:text-[#0d4a8a] font-medium underline"
                        >
                          <Download className="w-4 h-4" />
                          View Resume
                        </a>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>

                    <td className="px-6 py-7 text-sm text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span className="font-medium">
                          {formatDate(app.created_at)}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-7 text-left">
                      <div className="flex items-center ">
                        <button
                          onClick={() => handleDelete(app._id)}
                          disabled={deletingId === app._id}
                          className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm disabled:opacity-50"
                          title="Delete"
                        >
                          {deletingId === app._id ? (
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

        <div className="md:hidden space-y-5">
          {applications.map((app, idx) => (
            <motion.div
              key={app._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-5 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <span className="font-mono text-sm font-bold text-[#0e55a1]">
                    #{idx + 1}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(app._id)}
                    disabled={deletingId === app._id}
                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition disabled:opacity-50"
                  >
                    {deletingId === app._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {Object.keys(app)
                  .filter(
                    (k) =>
                      !["_id", "created_at", "updated_at", "resume"].includes(k)
                  )
                  .map((key) => (
                    <div key={key} className="flex items-start gap-3">
                      <div className="mt-0.5">{getFieldIcon(key)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                          {key.replace(/-/g, " ").replace(/_/g, " ")}
                        </p>
                        <p className="text-sm text-gray-800 break-words font-medium">
                          {app[key] || "—"}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {app.resume && (
                <a
                  href={app.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#0e55a1] hover:underline"
                >
                  <Download className="w-4 h-4" />
                  View Resume
                </a>
              )}

              <div className="flex items-center gap-1.5 text-xs text-gray-500 pt-3 border-t border-gray-100">
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-medium">
                  {formatDate(app.created_at)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
}
