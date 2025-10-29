"use client";

import React, { useState, useEffect } from "react";
import Breadcrumb from "./Breadcrumb";
import Image from "next/image";
import FadeUp from "./pages/FadeUp";

const PageBanner = ({
  title: pageTitle,
  subtitle: pageSubtitle,
  children,
  breadcrumbItems = [],
  isProductSubpage = false,
}) => {
  const [slide, setSlide] = useState(null);

  useEffect(() => {
    if (!pageTitle) {
      return;
    }

    fetch(`/api/users/hero/page-banner?title=${pageTitle}`)
      .then((r) => r.json(setSlide))
      .then((slides) => {
        setSlide(slides || null);
      })
      .catch(() => setSlide(null));
  }, [pageTitle]);

  const imageUrl = slide?.image.startsWith("http")
    ? slide?.image
    : `/${slide?.image.replace(/^\/+/, "")}`;

  const title = slide?.title;
  const subtitle = slide?.description || pageSubtitle;

  const breadcrumbItemsFinal =
    breadcrumbItems.length > 0
      ? breadcrumbItems
      : [
          { label: "Home", path: "/", icon: "home" },
          ...(isProductSubpage
            ? [{ label: "Products", path: "/products", icon: "products" }]
            : []),
          { label: title, icon: "default" },
        ];

  if (!slide) {
    return (
      <div className="relative w-full h-[260px] sm:h-[350px] bg-gray rounded-b-2xl sm:rounded-b-3xl flex items-center justify-center text-center p-6">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            {pageTitle || "Page"}
          </h1>
          {pageSubtitle && (
            <p className="text-xl text-white/80">{pageSubtitle}</p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="relative p-5 w-full sm:h-[350px] h-[260px] sm:rounded-b-3xl rounded-b-2xl flex items-center justify-center overflow-hidden">
      <Image
        src={imageUrl}
        alt={`${title} Banner`}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />

      <div className="relative z-10 text-center max-w-4xl px-4">
        <FadeUp>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            {title}
          </h1>
        </FadeUp>
        {subtitle && (
          <FadeUp delay={200}>
            <p className="text-lg sm:text-xl text-white/90 drop-shadow-md">
              {subtitle}
            </p>
          </FadeUp>
        )}
      </div>

      {children && (
        <div className="absolute bottom-6 left-6 z-10">{children}</div>
      )}

      <div className="absolute bottom-6 left-6 z-10">
        <Breadcrumb items={breadcrumbItemsFinal} />
      </div>
    </div>
  );
};

export default PageBanner;
