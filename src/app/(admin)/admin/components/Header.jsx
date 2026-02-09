"use client";
import { useState } from "react";
import { LogOut, User, ChevronDown, Menu, Lock } from "lucide-react";
import Link from "next/link";
export default function Header({ toggleSidebar, isSidebarOpen }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isLoggedIn = true;
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("token");
      localStorage.removeItem("admin_token");
      sessionStorage.clear();
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      window.location.href = "/";
    }
  };
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-40 lg:left-64">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-end">
        {}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-600 hover:text-[#48ADB9]"
          aria-label="Toggle sidebar"
        >
          <Menu size={24} />
        </button>
        {}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-[#48ADB9] transition"
          >
            <div className="w-8 h-8 rounded-full bg-[#48ADB9] flex items-center justify-center text-white font-semibold">
              A
            </div>
            <span className="hidden sm:block font-medium">Admin</span>
            <ChevronDown size={16} className="hidden sm:block" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <Link
                href="/admin/profile"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                <User size={16} className="mr-2" />
                My Profile
              </Link>
              <Link
                href="/admin/profile/change-password"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                <Lock size={16} className="mr-2" />
                Change Password
              </Link>
              <hr className="my-1 border-gray-200" />
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      {}
      {dropdownOpen && (
        <div
          className="fixed inset-0 bg-transparent z-30"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </header>
  );
}
