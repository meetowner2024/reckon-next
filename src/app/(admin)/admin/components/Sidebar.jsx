"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (key) => {
    setOpenSubmenu((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    if (pathname.startsWith("/admin/hero")) {
      setOpenSubmenu("hero");
    } else if (pathname.startsWith("/admin/products")) {
      setOpenSubmenu("products");
    } else {
      setOpenSubmenu(null);
    }
  }, [pathname]);

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/header", label: "Header" },
    {
      href: "/admin/hero",
      label: "Banner",
      submenuKey: "hero",
      submenu: [
        { href: "/admin/hero/all", label: "All Banners" },
        { href: "/admin/hero", label: "Add Banner" },
      ],
    },
    { href: "/admin/advantages", label: "Reckonext Advantages" },
    {
      href: "/admin/products",
      label: "Products",
      submenuKey: "products",
      submenu: [
        { href: "/admin/products/all", label: "All Products" },
        { href: "/admin/products/add", label: "Add Products" },
      ],
    },
    { href: "/admin/faqs", label: "Frequently Asked Questions" },
    { href: "/admin/contact-us", label: "Contact Us" },
    { href: "/admin/footer", label: "Footer" },
  ];

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#48ADB9] text-white rounded shadow-lg hover:bg-[#3d8f99] transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <div
        className={`w-64 bg-[#48ADB9] text-white h-screen fixed transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40 overflow-y-auto`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-center mb-6">Admin Panel</h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.submenuKey)}
                      className={`w-full text-left p-2 rounded flex justify-between items-center transition-all duration-200 ${
                        pathname.startsWith(item.href)
                          ? "bg-white text-[#48ADB9] font-semibold"
                          : "hover:bg-[#3d8f99]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {openSubmenu === item.submenuKey ? (
                        <ChevronDown className="w-4 h-4 transition-transform" />
                      ) : (
                        <ChevronRight className="w-4 h-4 transition-transform" />
                      )}
                    </button>

                    {openSubmenu === item.submenuKey && (
                      <ul className="p-1 mt-1 space-y-1 bg-[#3a8a94] rounded-md overflow-hidden">
                        {item.submenu.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className={`block p-2 rounded text-sm transition-colors ${
                                pathname === sub.href
                                  ? "bg-white text-[#48ADB9] font-semibold"
                                  : "hover:bg-[#60c3cf]"
                              }`}
                              onClick={() => setIsOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={`block p-2 rounded transition-colors ${
                      pathname === item.href
                        ? "bg-white text-[#48ADB9] font-semibold"
                        : "hover:bg-[#3d8f99]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
