"use client";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
  FaTiktok,
  FaDiscord,
  FaSnapchat,      // Correct export (not FaSnapchatGhost)
  FaPinterestP,
  FaGlobe,
  FaLocationDot,   // FA6 replacement for old FaMapMarkerAlt
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaTelegram,
  FaChevronRight,
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const [footer, setFooter] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchFooter();
    fetchProjects();
  }, []);

  const fetchFooter = async () => {
    try {
      const res = await fetch("/api/users/footer");
      const data = await res.json();
      setFooter(data);
    } catch (error) {
      console.error("Footer fetch error:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/users/productsDropdown");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Products fetch error:", error);
    }
  };

  if (!footer) return null;

  // Icon map – every key maps to a valid FA6 icon
  const iconMap = {
    facebook: FaFacebookF,
    twitter: FaXTwitter,
    instagram: FaInstagram,
    linkedin: FaLinkedinIn,
    youtube: FaYoutube,
    github: FaGithub,
    tiktok: FaTiktok,
    discord: FaDiscord,
    snapchat: FaSnapchat,      // Fixed
    pinterest: FaPinterestP,
    mail: FaEnvelope,
    email: FaEnvelope,
    phone: FaPhone,
    whatsapp: FaWhatsapp,
    telegram: FaTelegram,
    default: FaGlobe,
  };

  const getSocialIcon = (platform) => {
    const key = platform.trim().toLowerCase();
    const Icon = iconMap[key] || iconMap.default;
    return <Icon size={20} />;
  };

  return (
    <footer
      className="bg-gray-200 text-[#f0f0f0] rounded-t-3xl pt-12 pb-5 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url("/assets/images/Footer-BG.png")`,
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* LEFT – LOGO + DESC + SOCIAL */}
          <div className="space-y-4">
            <div className="w-auto h-auto flex items-center justify-left p-2">
              <Image
                src={footer.logo || "/assets/images/Reckonext-logo.png"}
                alt="Logo"
                width={1000}
                height={40}
                className="w-auto h-auto object-contain"
              />
            </div>

            <p className="text-sm leading-relaxed text-[#213147]">
              {footer.description}
            </p>

            {/* DYNAMIC SOCIAL LINKS */}
            <div className="flex space-x-3">
              {Object.entries(footer.socialLinks || {}).map(([platform, url]) => {
                if (!url?.trim()) return null;
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#213147] hover:text-[#044182] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  >
                    {getSocialIcon(platform)}
                  </a>
                );
              })}
            </div>
          </div>

          {/* MIDDLE – QUICK LINKS + PRODUCTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* QUICK LINKS */}
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-lg text-[#213147] inline-block border-b border-[#213147] font-semibold mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-[#213147] text-sm">
                <li><Link href="/about" className="hover:underline">About</Link></li>
                <li><Link href="/products" className="hover:underline">Products</Link></li>
                <li><Link href="/careers" className="hover:underline">Careers</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact</Link></li>
                <li><Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link></li>

                {/* Dynamic from Admin */}
                {footer.quickLinks?.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1"
                    >
                     
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* PRODUCTS */}
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-lg text-[#213147] inline-block border-b border-[#213147] font-semibold mb-4">
                Products
              </h4>
              <ul className="space-y-2 text-[#213147] text-sm">
                {projects.map((project) => (
                  <li key={project.id}>
                    <Link
                      href={`/products/${project.title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}/${project.id}`}
                      className="hover:underline"
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT – LOCATIONS */}
          <div className="bg-white/5 p-4 rounded-lg space-y-6">
            <h4 className="text-lg text-[#213147] inline-block border-b border-[#213147] font-semibold">
              Get In Touch
            </h4>
            {footer.locations?.map((loc, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <FaLocationDot size={20} className="mt-1 flex-shrink-0 text-[#044182]" />
                <div className="text-sm text-[#213147]">
                  <strong className="text-[#213147]">{loc.type}</strong>
                  <br />
                  {loc.address.split(", ").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-[#213147] pt-6 text-center text-sm">
          <p className="text-[#213147]">
            © 2024 Reckon. All rights reserved. | Designed by MNTECHS Pvt Ltd
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;