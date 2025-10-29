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
            className="fixed bottom-6 right-6 flex items-center justify-center bg-green-500 text-white rounded-full w-14 h-14 shadow-lg hover:bg-green-600 transition-all duration-300 z-50 animate-bounce hover:scale-110 hover:shadow-green-400/50"
          >
            <FaWhatsapp size={30} className="drop-shadow-md" />
            <span className="absolute w-full h-full rounded-full bg-green-400 opacity-20 animate-ping"></span>
          </a>
        )}
      </PersistGate>
    </Provider>
  );
}
