// src/components/PageMeta.jsx
import React from "react";
import { Helmet } from "react-helmet";

/**
 * Reusable PageMeta component
 * 
 * @param {string} title - Page title for SEO
 * @param {string} description - Page description
 * @param {string} keywords - SEO keywords
 * @param {string} image - Social preview image
 * @param {string} url - Canonical URL
 */
const PageMeta = ({
  title = "Meet Owner | Find Your Dream Home",
  description = "Discover verified properties directly from owners. Browse houses, apartments, and projects with transparent details.",
  keywords = "real estate, buy house, rent, apartments, property, housing",
  image = "/assets/seo-preview.png",
  url = "https://www.meetowner.in",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default PageMeta;