"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  Heading,
  CheckSquare,
  Package,
  HelpCircle,
  User,
  Info,
  Mail,
  Briefcase,
  LucideKanbanSquare,
  GalleryHorizontal,
} from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (key) => {
    setOpenSubmenu((prev) => (prev === key ? null : key));
  };

  useEffect(() => {
    if (pathname.startsWith("/admin/hero")) setOpenSubmenu("hero");
    else if (pathname.startsWith("/admin/products")) setOpenSubmenu("products");
    else if (pathname.startsWith("/admin/contact-us"))
      setOpenSubmenu("contact");
    else if (pathname.startsWith("/admin/careers")) setOpenSubmenu("careers");
    else setOpenSubmenu(null);
  }, [pathname]);

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { href: "/admin/header", label: "Header", icon: <Heading size={20} /> },
    {
      href: "/admin/hero",
      label: "Banner",
      icon: <GalleryHorizontal size={20} />,
      submenuKey: "hero",
      submenu: [
        { href: "/admin/hero/all", label: "All Banners" },
        { href: "/admin/hero", label: "Add Banner" },
      ],
    },
    {
      href: "/admin/advantages",
      label: "Advantages",
      icon: <CheckSquare size={20} />,
    },
    {
      href: "/admin/products",
      label: "Products",
      icon: <Package size={20} />,
      submenuKey: "products",
      submenu: [
        { href: "/admin/products/all", label: "All Products" },
        { href: "/admin/products/add", label: "Add Product" },
      ],
    },
    { href: "/admin/faqs", label: "FAQs", icon: <HelpCircle size={20} /> },
    { href: "/admin/profile", label: "Profile", icon: <User size={20} /> },
    { href: "/admin/about", label: "About", icon: <Info size={20} /> },
    {
      href: "/admin/contact-us",
      label: "Contact Us",
      icon: <Mail size={20} />,
      submenuKey: "contact",
      submenu: [
        { href: "/admin/contact-us/all-contacted", label: "All Messages" },
        { href: "/admin/contact-us", label: "Edit Page" },
        { href: "/admin/contact-us/edit-contact-form", label: "Edit Form" },
      ],
    },
    {
      href: "/admin/careers",
      label: "Careers",
      icon: <Briefcase size={20} />,
      submenuKey: "careers",
      submenu: [
        { href: "/admin/careers/all-positions", label: "Open Positions" },
        { href: "/admin/careers/all-applications", label: "Applications" },
        { href: "/admin/careers/edit-careers-form", label: "Edit Form" },
      ],
    },
    {
      href: "/admin/footer",
      label: "Footer",
      icon: <LucideKanbanSquare size={20} />,
    },
  ];

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-linear-to-b from-[#48ADB9] to-[#3a8a94] text-white transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-center">Reckonext</h2>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.submenu ? (
                  <>
                    <button
                      onClick={() => toggleSubmenu(item.submenuKey)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                        pathname.startsWith(item.href)
                          ? "bg-white text-[#48ADB9] font-semibold shadow-md"
                          : "hover:bg-white/10"
                      }`}
                    >
                      <span className="flex items-center">
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                      </span>
                      {openSubmenu === item.submenuKey ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </button>

                    {openSubmenu === item.submenuKey && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className={`block py-2 px-4 rounded-md text-sm transition-colors ${
                              pathname === sub.href
                                ? "bg-white text-[#48ADB9] font-medium"
                                : "hover:bg-white/20"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
                      pathname === item.href
                        ? "bg-white text-[#48ADB9] font-semibold shadow-md"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
