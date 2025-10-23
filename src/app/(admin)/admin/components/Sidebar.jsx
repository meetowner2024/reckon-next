'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);


  const navItems = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/header', label: 'Header' },
    { href: '/admin/banner', label: 'Banner' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/choose-us', label: 'Why Choose Us' },
    { href: '/admin/testimonial', label: 'Testimonial' },
    { href: '/admin/frequently-asked-questions', label: 'Frequently Asked Questions' },
    { href: '/admin/contact-us', label: 'Contact Us' },
    { href: '/admin/footer', label: 'Footer' },
  ];

  return (
    <>
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#48ADB9] text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
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
        className={`w-64 bg-[#48ADB9] text-white h-screen fixed transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 z-40`}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold text-center mb-6">Admin Panel</h2>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block p-2 rounded ${
                    pathname === item.href ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}