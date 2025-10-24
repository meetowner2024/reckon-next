"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(false); // submenu toggle

  const navItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/header", label: "Header" },
    {
      href: "/admin/banner",
      label: "Banner",
      submenu: [
        { href: "/admin/hero/all", label: "All Banners" },
        { href: "/admin/hero", label: "Add Banner" },
      ],
    },
    { href: "/admin/advantages", label: "Reckonext Advantages" },
    {
      href: "/admin/products",
      label: "Products",
      submenu: [
        { href: '/admin/hero/all', label: 'All Banners' },
        { href: '/admin/hero', label: 'Add Banner' },
      ]
    },
    { href: '/admin/advantages', label: 'Reckonext Advantages' },
     {
      href: "/admin/products",
      label: "Products",
      submenu: [
        { href: "/admin/products/all", label: "All Products" },
        { href: "/admin/products/add", label: "Add Products" },
      ],
    },
    { href: '/admin/faqs', label: 'Frequently Asked Questions' },
    { href: '/admin/contact-us', label: 'Contact Us' },
    { href: '/admin/footer', label: 'Footer' },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#48ADB9] text-white rounded"
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

      {/* Sidebar */}
      <div
        className={`w-64 bg-[#48ADB9] text-white h-screen fixed transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-center mb-6">Admin Panel</h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => setBannerOpen(!bannerOpen)}
                      className={`w-full text-left p-2 rounded flex justify-between items-center ${
                        pathname.startsWith(item.href)
                          ? "bg-gray-700 text-white"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      {item.label}
                      <span>{bannerOpen ? "▾" : "▸"}</span>
                    </button>
                    {bannerOpen && (
                      <ul className="pl-4 mt-1 space-y-1">
                        {item.submenu.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className={`block p-2 rounded ${
                                pathname === sub.href
                                  ? "bg-gray-600"
                                  : "hover:bg-gray-600"
                              }`}
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
                    className={`block p-2 rounded ${
                      pathname === item.href
                        ? "bg-gray-700 text-white"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
