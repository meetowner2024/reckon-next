import React from "react";



// Image imports
import careerImg from "../../public/assets/images/CareerpageBG.jpg";
import contactImg from "../../public/assets/images/CareerpageBG.jpg";
import aboutImg from "../../public/assets/images/About-Page.jpg";
import defaultImg from "../../public/assets/images/PageBannerDefault.jpg";
import FadeUp from "./pages/FadeUp";
import Breadcrumb from "./Breadcrumb";

const PageBanner = ({
  title,
  subtitle,
  children,
  breadcrumbItems = [],
  metaDescription = "Discover verified properties directly from owners. Browse houses, apartments, and projects with transparent details.",
  metaKeywords = "real estate, buy house, rent, apartments, property, housing",
  metaImage = "/assets/seo-preview.png",
  metaUrl = "https://www.meetowner.in",
  isProductSubpage = false, // Prop to indicate product subpage
}) => {
  // Map titles to banner images
  const bannerImages = {
    Careers: careerImg,
    "Contact Us": contactImg,
    "About Us": aboutImg,
  };

  const bannerImage = bannerImages[title] || defaultImg;

  // Default breadcrumb items
  const defaultBreadcrumbItems = [
    { label: "Home", path: "/", icon: "home" },
    ...(isProductSubpage ? [{ label: "Products", path: "/products", icon: "products" }] : []),
    ...(title ? [{ label: title, icon: "default" }] : []),
  ];

  // Use provided breadcrumbItems or default
  const items = breadcrumbItems.length > 0 ? breadcrumbItems : defaultBreadcrumbItems;

  return (
    <>
      {/* <PageMeta
        title={title || "Meet Owner | Find Your Dream Home"}
        description={metaDescription}
        keywords={metaKeywords}
        image={metaImage}
        url={metaUrl}
      /> */}
      <div className="relative p-5 w-full sm:h-[350px] h-[260px] sm:rounded-b-3xl rounded-b-2xl flex items-center justify-center overflow-hidden">
        <img
          src={bannerImage?.src}
          alt={`${title} Banner`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60"></div>
        <div className="relative z-10 text-center">
          <FadeUp>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {title}
            </h1>
          </FadeUp>
          {subtitle && (
            <FadeUp delay={200}>
              <p className="text-xl text-white/90">{subtitle}</p>
            </FadeUp>
          )}
        </div>
        {children && (
          <div className="absolute bottom-6 left-6 z-10">
            {children}
          </div>
        )}
        <div className="absolute bottom-6 left-6 z-10">
          <Breadcrumb items={items} />
        </div>
      </div>
    </>
  );
};

export default PageBanner;