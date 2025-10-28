"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
const HeaderSection = ({ logo, phone, projectsDropdown = [] }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const closeTimeoutRef = useRef(null);
  const formatPhone = (num) => {
    if (!num) return "";
    const clean = num.replace(/\D/g, ""); // remove non-digits
    if (clean.startsWith("91")) {
      const national = clean.slice(2);
      return `+91 ${national.slice(0, 5)} ${national.slice(5)}`;
    } else if (clean.length === 10) {
      return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
    }
    return `+${clean}`; // fallback
  };

  const formatted = formatPhone(phone);
  const handleNavigation = (path) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpenSubmenu(null);
    setMobileMenuOpen(false);
  };
  const handleMouseEnter = (itemName) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setOpenSubmenu(itemName);
  };
  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setOpenSubmenu(null), 300);
  };
  const handleMainItemClick = (item) => {
    if (item.submenu) {
      if (openSubmenu === item.name) handleNavigation(item.path);
      else setOpenSubmenu(item.name);
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
        path: `/products/${project.title.toLowerCase().replace(/\s+/g, "-")}/${
          project.id
        }`,
      })),
    },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-linear-to-r from-[#f8fafc] to-[#ffffff] shadow-md sticky top-0 z-50"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigation("/")}
          >
            <Image
              src={logo || "/assets/images/Reckonext-logo.png"}
              alt="Reckonext Logo"
              className="h-10 w-auto"
              width={1000}
              height={40}
              unoptimized
            />
          </div>
          {}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center space-x-8">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleMainItemClick(item)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    pathname === item.path
                      ? "text-[#0e55a1]"
                      : "text-[#111827] hover:text-[#0e55a1]"
                  }`}
                >
                  {item.name}
                  {item.submenu?.length > 0 && (
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        openSubmenu === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </motion.button>
                <AnimatePresence>
                  {item.submenu?.length > 0 && openSubmenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute left-0 mt-2 bg-white rounded-lg shadow-md py-2 min-w-[200px] border border-gray-100"
                      onMouseEnter={() =>
                        closeTimeoutRef.current &&
                        clearTimeout(closeTimeoutRef.current)
                      }
                      onMouseLeave={handleMouseLeave}
                    >
                      {item.submenu.map((subItem) => (
                        <motion.button
                          key={subItem.path}
                          whileHover={{ scale: 1.02, x: 2 }}
                          transition={{ duration: 0.15 }}
                          onClick={() => handleNavigation(subItem.path)}
                          className="w-full text-left px-4 py-2 text-sm text-[#111827] hover:bg-[#0e55a1]/10 hover:text-[#0e55a1]"
                        >
                          {subItem.name}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          {}
          <div className="hidden lg:flex items-center gap-2 text-[#0e55a1] font-medium">
            <a
              href={`tel:${phone}`}
              className="border border-[#0e55a1] rounded-full px-4 py-1.5 bg-[#f0f9ff] flex items-center gap-2 hover:underline cursor-pointer"
            >
              <motion.div animate={wobbleAnimation}>
                <Phone className="w-4 h-4 text-[#0e55a1]" />
              </motion.div>
              {formatted}
            </a>
          </div>
          {}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-[#7c7978] hover:text-[#0e55a1] hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: "-50%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-50%", opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed top-16 right-0 w-full sm:w-1/2 h-[calc(100vh-4rem)] bg-white shadow-lg border-r border-gray-100 z-40"
            >
              <div className="flex flex-col items-start p-4 space-y-3 overflow-y-auto h-full">
                {navItems.map((item) => (
                  <div key={item.name} className="w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleMainItemClick(item)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 text-left ${
                        pathname === item.path
                          ? "text-[#0e55a1] bg-[#0e55a1]/5"
                          : "text-[#111827] hover:text-[#0e55a1] hover:bg-[#0e55a1]/5"
                      }`}
                    >
                      {item.name}
                      {item.submenu?.length > 0 && (
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openSubmenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </motion.button>
                    {item.submenu?.length > 0 && openSubmenu === item.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="ml-4 mt-1 space-y-1"
                      >
                        {item.submenu.map((subItem) => (
                          <motion.button
                            key={subItem.path}
                            whileHover={{ x: 2, scale: 1.02 }}
                            transition={{ duration: 0.15 }}
                            onClick={() => handleNavigation(subItem.path)}
                            className="w-full text-left px-3 py-2 text-sm text-[#111827] hover:text-[#0e55a1] hover:bg-[#0e55a1]/5 rounded-md"
                          >
                            {subItem.name}
                          </motion.button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
                <div className="mt-4 w-full border-t pt-3">
                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-2 px-3 py-2 text-[#0e55a1] font-semibold hover:bg-[#0e55a1]/5 rounded-md"
                  >
                    <motion.div animate={wobbleAnimation}>
                      <Phone className="w-5 h-5 text-[#0e55a1]" />
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
