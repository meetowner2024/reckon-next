"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { FaWhatsapp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { persistor, store } from "@/components/store/store";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}

        {!isAdminPage && (
          <a
            href="https://wa.me/8886077745?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 flex items-center justify-center bg-[#1e3a8a] text-white rounded-full w-12 h-12 shadow-lg hover:bg-[#f0f9ff] hover:text-[#1e3a8a] transition-all duration-300 z-50 animate-bounce hover:scale-110 hover:[#1e3a8a]/50"
          >
            <FaWhatsapp size={25} className="drop-shadow-md" />
            <span className="absolute w-full h-full rounded-full bg-[#1e3a8a] opacity-20 animate-ping"></span>
          </a>
        )}
      </PersistGate>
    </Provider>
  );
}
