"use client";
import { useEffect, useState } from "react";
import Home from "@/components/Home/Home";
export default function HomePage() {
  const [data, setData] = useState(null);
  useEffect(() => {
    async function preload() {
      try {
        const cachedHeader = localStorage.getItem("headerData");
        const cachedHero = localStorage.getItem("heroData");
        const cacheTimestamp = localStorage.getItem("cacheTimestamp");
        const isCacheValid =
          cacheTimestamp &&
          Date.now() - Number(cacheTimestamp) < 1000 * 60 * 60;
        if (cachedHeader && cachedHero && isCacheValid) {
          setData({
            header: JSON.parse(cachedHeader),
            heroSlides: JSON.parse(cachedHero),
          });
          return;
        }
        const [headerRes, heroRes] = await Promise.all([
          fetch("/api/users/header/getHeader", {
            cache: "force-cache",
            next: { revalidate: 3600 },
          }).then((r) => r.json()),
          fetch("/api/users/hero", {
            cache: "force-cache",
            next: { revalidate: 3600 },
          }).then((r) => r.json()),
        ]);
        setData({
          header: headerRes,
          heroSlides: heroRes,
        });
        localStorage.setItem("headerData", JSON.stringify(headerRes));
        localStorage.setItem("heroData", JSON.stringify(heroRes));
        localStorage.setItem("cacheTimestamp", Date.now().toString());
      } catch (err) {
        console.error("Error preloading data:", err);
      }
    }
    preload();
  }, []);

  return (
    <main>
      <Home />
    </main>
  );
}
