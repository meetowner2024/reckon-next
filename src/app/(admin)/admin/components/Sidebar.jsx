"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({
    hero: false,
    products: false,
  });
  const toggleSubmenu = (key) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  useEffect(() => {
    const updated = { ...openSubmenus };
    if (pathname.startsWith("/admin/hero") && !updated.hero) {
      updated.hero = true;
    }
    if (pathname.startsWith("/admin/products") && !updated.products) {
      updated.products = true;
    }
    setOpenSubmenus(updated);
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

    {
      href: "/admin/contact-us",
      label: "Contact Us",
      submenu: [
        { href: "/admin/contact-us/all-contacted", label: "All Contacted" },
        { href: "/admin/contact-us", label: "Edit Contact Page" },
        {
          href: "/admin/contact-us/edit-contact-form",
          label: "Edit Contact Form",
        },
      ],
    },
    {
      href: "/admin/careers",
      label: "Careers",
      submenu: [
        {
          href: "/admin/careers/all-applications",
          label: "All Careers Applications",
        },
        {
          href: "/admin/careers/edit-careers-form",
          label: "Edit Careers Form",
        },
      ],
    },
    { href: "/admin/footer", label: "Footer" },
  ];
  return (
    <>
      {}
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
      {}
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
                    {}
                    <button
                      onClick={() => toggleSubmenu(item.submenuKey)}
                      className={`w-full text-left p-2 rounded flex justify-between items-center transition-all duration-200 ${
                        pathname.startsWith(item.href)
                          ? "bg-gray-700 font-medium"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      <span>{item.label}</span>
                      {openSubmenus[item.submenuKey] ? (
                        <ChevronDown className="w-4 h-4 transition-transform" />
                      ) : (
                        <ChevronRight className="w-4 h-4 transition-transform" />
                      )}
                    </button>
                    {}
                    {openSubmenus[item.submenuKey] && (
                      <ul className="p-1 mt-1 space-y-1 bg-gray-800 rounded-md overflow-hidden">
                        {item.submenu.map((sub) => (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className={`block p-2 rounded text-sm transition-colors ${
                                pathname === sub.href
                                  ? "bg-gray-600  text-white font-medium"
                                  : "hover:bg-gray-600"
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
                        ? "bg-gray-700 font-medium"
                        : "hover:bg-gray-700"
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
      {}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
