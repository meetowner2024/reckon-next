"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Geist, Geist_Mono } from "next/font/google";
import { FaWhatsapp } from "react-icons/fa";
import "./globals.css";
import { persistor, store } from "@/components/store/store";
import { usePathname } from "next/navigation";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
    const pathname = usePathname(); 
  const isAdminPage = pathname.startsWith("/admin"); 
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased   `}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}

           {!isAdminPage && (
            <a
              href="https://wa.me/8886077754" 
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
      </body>
    </html>
  );
}
