"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { useRouter } from "next/navigation";
import LoadingAuth from "@/utils/LoadingAuth";
export default function AdminLayout({ children }) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = contentRef.current?.scrollTop || 0;
      setShowScrollTop(scrollTop > 300);
    };
    const el = contentRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) throw new Error();
        setLoading(false);
      } catch {
        router.push("/login");
      }
    };
    checkAuth();
  }, [router]);

  if (loading) return <LoadingAuth />;
  const scrollToTop = () => {
    contentRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <main
          ref={contentRef}
          className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 lg:p-8 mt-10"
        >
          <div className="max-w-7xl mx-auto">{children}</div>
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 bg-[#48ADB9] text-white p-3 rounded-full shadow-xl hover:bg-[#3d8f99] transition-all z-40"
              aria-label="Scroll to top"
            >
              <ArrowUp size={22} />
            </button>
          )}
        </main>
      </div>
    </div>
  );
}
