"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const HeaderSection = ({ logo, phone, projectsDropdown = [] }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(0);
  const closeTimeoutRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll < lastScrollY.current) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      lastScrollY.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format phone
  const formatPhone = (num) => {
    if (!num) return "";
    const clean = num.replace(/\D/g, "");
    if (clean.startsWith("91")) return `+91 ${clean.slice(2, 7)} ${clean.slice(7)}`;
    if (clean.length === 10) return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
    return `+${clean}`;
  };
  const formatted = formatPhone(phone);

  const handleNavigation = (path) => {
    if (!path) return;
    router.push(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpenSubmenu(null);
    setMobileMenuOpen(false);
  };

  const handleMouseEnter = (name) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenSubmenu(name);
  };
  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setOpenSubmenu(null), 250);
  };

  const handleMainItemClick = (item) => {
    if (item.submenu) {
      setOpenSubmenu(openSubmenu === item.name ? null : item.name);
    } else handleNavigation(item.path);
  };

  const wobbleAnimation = {
    rotate: [0, -10, 10, -10, 10, 0],
    transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Profile", path: "/profile" },
    {
      name: "Products",
      submenu: projectsDropdown.map((project) => ({
        name: project.title,
        path: `/products/${project.title.toLowerCase().replace(/\s+/g, "-")}/${project.id}`,
      })),
    },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: showHeader ? 0 : -70, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="bg-gradient-to-r from-[#f8fafc] to-[#ffffff] shadow-md sticky top-0 z-50 w-full"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigation("/")}>
            <Image
              src={logo || "/assets/images/Reckonext-logo.png"}
              alt="Reckonext Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
              unoptimized
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <motion.button
                  whileHover={{ y: -2, scale: 1.03 }}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium ${
                    pathname === item.path ? "text-[#0e55a1]" : "text-[#111827] hover:text-[#0e55a1]"
                  }`}
                  onClick={() => handleMainItemClick(item)}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className={`w-4 h-4 ${openSubmenu === item.name ? "rotate-180" : ""}`} />}
                </motion.button>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.submenu && openSubmenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[220px] border border-gray-100 z-50 max-h-[250px] overflow-y-auto"
                    >
                      {item.submenu.map((subItem) => (
                        <button
                          key={subItem.path}
                          onClick={() => handleNavigation(subItem.path)}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-[#0e55a1]/10 hover:text-[#0e55a1]"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop Phone */}
          <div className="hidden lg:flex items-center gap-2 text-[#0e55a1] font-medium">
            <a href={`tel:${phone}`} className="border border-[#0e55a1] rounded-full px-4 py-1.5 bg-[#f0f9ff] flex items-center gap-2 hover:bg-[#e0f2fe]">
              <motion.div animate={wobbleAnimation}>
                <Phone className="w-4 h-4" />
              </motion.div>
              {formatted}
            </a>
          </div>

          {/* Mobile Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-md">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed top-16 right-0 w-[75%] h-[calc(100vh-4rem)] bg-white shadow-xl border-l overflow-y-auto z-40"
            >
              <div className="p-4 space-y-1">
                {navItems.map((item) => (
                  <div key={item.name}>
                    <button
                      onClick={() => handleMainItemClick(item)}
                      className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium"
                    >
                      {item.name}
                      {item.submenu && <ChevronDown className={`w-4 h-4 ${openSubmenu === item.name ? "rotate-180" : ""}`} />}
                    </button>

                    {item.submenu && openSubmenu === item.name && (
                      <div className="ml-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <button
                            key={subItem.path}
                            onClick={() => handleNavigation(subItem.path)}
                            className="w-full px-3 text-left py-2 text-sm hover:text-[#0e55a1]"
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="border-t pt-3 mt-4">
                  <a href={`tel:${phone}`} className="flex items-center gap-2 px-3 py-2 text-[#0e55a1] font-semibold">
                    <motion.div animate={wobbleAnimation}>
                      <Phone className="w-5 h-5" />
                    </motion.div>
                    {formatted}
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </nav>
    </motion.header>
  );
};

export default HeaderSection;
