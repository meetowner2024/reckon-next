"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Phone, Lock, Loader2, AlertCircle } from "lucide-react";
export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        if (res.ok) {
          router.replace("/admin");
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [router]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/admin");
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };
  const isMobile = /^\d{10}$/.test(identifier);
  const isEmail = identifier.includes("@") && identifier.includes(".");
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-[#48ADB9]" />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#48ADB9]/10 via-white to-[#48ADB9]/5 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-[#48ADB9] to-[#3d8f99] text-white text-2xl font-bold shadow-lg mb-4">
            R
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Sign in with mobile or email</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {isMobile ? (
                    <Phone className="h-5 w-5 text-green-600" />
                  ) : isEmail ? (
                    <Mail className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Mail className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value.trim())}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#48ADB9] focus:border-transparent transition-all duration-200"
                  placeholder="user@gmail.com"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter 10-digit mobile or valid email
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#48ADB9] focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-pulse">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-[#48ADB9] to-[#3d8f99] text-white font-semibold py-3.5 px-4 rounded-xl hover:shadow-lg hover:from-[#3d8f99] hover:to-[#48ADB9] focus:outline-none focus:ring-2 focus:ring-[#48ADB9] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Don't have an account?{" "}
              <a
                href="/register"
                className="font-medium text-[#48ADB9] hover:text-[#3d8f99] transition-colors"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-gray-500">
          © 2025 Reckonext. All rights reserved.
        </p>
      </div>
    </div>
  );
}
