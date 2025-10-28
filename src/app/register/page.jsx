"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  Lock,
  Shield,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    adminPassword: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ text: "Admin created! Redirecting...", type: "success" });
        setTimeout(() => router.push("/admin"), 1500);
      } else {
        setMessage({
          text: data.message || "Registration failed",
          type: "error",
        });
      }
    } catch (err) {
      setMessage({ text: "Network error. Try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#48ADB9]/10 via-white to-[#48ADB9]/5 px-4 py-8">
      <div className="w-full max-w-md">
        {}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-[#48ADB9] to-[#3d8f99] text-white text-2xl font-bold shadow-lg mb-4">
            R
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Create Admin Account
          </h1>
          <p className="text-gray-600 mt-2">Only authorized personnel</p>
        </div>
        {}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            {}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#48ADB9] focus:border-transparent"
                  placeholder="John Doe"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            {}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#48ADB9] focus:border-transparent"
                  placeholder="9876543210"
                  pattern="[0-9]{10}"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                10-digit mobile number
              </p>
            </div>
            {}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#48ADB9] focus:border-transparent"
                  placeholder="admin@reckonext.com"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            {}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#48ADB9] focus:border-transparent"
                  placeholder="••••••••"
                  required
                  minLength={6}
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
            </div>
            {}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Registration Key
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-red-500" />
                <input
                  type="password"
                  name="adminPassword"
                  value={form.adminPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-3 border border-red-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-red-300"
                  placeholder="Secret key required"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-red-600 mt-1">
                Only admins have this key
              </p>
            </div>
            {}
            {message && (
              <div
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  message.type === "success"
                    ? "bg-green-50 border border-green-200 text-green-700"
                    : "bg-red-50 border border-red-200 text-red-700"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <AlertCircle className="h-5 w-5" />
                )}
                <span>{message.text}</span>
              </div>
            )}
            {}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-[#48ADB9] to-[#3d8f99] text-white font-semibold py-3.5 rounded-xl hover:shadow-lg disabled:opacity-50 flex items-center justify-center space-x-2 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Creating Admin...</span>
                </>
              ) : (
                <span>Create Admin Account</span>
              )}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have access?{" "}
            <a
              href="/login"
              className="font-medium text-[#48ADB9] hover:text-[#3d8f99]"
            >
              Sign in
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-gray-500">
          © 2025 Reckonext. Protected Admin Panel.
        </p>
      </div>
    </div>
  );
}
