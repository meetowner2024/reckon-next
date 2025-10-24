"use client";
import { useEffect, useState } from "react";
import { MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const [footer, setFooter] = useState(null);
  console.log("footer: ", footer);
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
      console.log("error", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/users/productsDropdown");
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.log("error fetching projects", error);
    }
  };

  if (!footer) return null;

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

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
          <div className="space-y-4">
            <div className="w-auto h-auto flex items-center justify-left p-2">
              <Image
                src={
                  footer.logo
                    ? `${baseUrl}${footer.logo}`
                    : "/assets/images/Reckonext-logo.png"
                }
                alt="Reckonext Logo"
                className="w-auto h-auto object-contain"
                width={1000}
                height={40}
              />
            </div>
            <p className="text-sm leading-relaxed text-[#213147]">
              {footer.description}
            </p>
            <div className="flex space-x-4">
              {footer.socialLinks?.facebook && (
                <a
                  href={footer.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#213147] hover:text-gray-300 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Facebook size={20} />
                </a>
              )}
              {footer.socialLinks?.twitter && (
                <a
                  href={footer.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#213147] hover:text-gray-300 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Twitter size={20} />
                </a>
              )}
              {footer.socialLinks?.instagram && (
                <a
                  href={footer.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#213147] hover:text-gray-300 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Instagram size={20} />
                </a>
              )}
              {footer.socialLinks?.linkedin && (
                <a
                  href={footer.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#213147] hover:text-[#044182] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-lg text-[#213147] inline-block border-b border-[#213147] font-semibold mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-[#213147] text-sm">
                <li>
                  <Link href="/about">About</Link>
                </li>
                <li>
                  <Link href="/products">Products</Link>
                </li>
                <li>
                  <Link href="/careers">Careers</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>

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
                        .replace(/\s+/g, "-")}`}
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-lg space-y-6">
            <h4 className="text-lg text-[#213147] inline-block border-b border-[#213147] font-semibold">
              Get In Touch
            </h4>
            {footer.locations?.map((loc, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <MapPin
                  size={20}
                  className="mt-1 flex-shrink-0 text-[#044182]"
                />
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
        <div className="border-t border-[#213147] pt-6 text-center text-sm">
          <p className="text-[#213147]">
            © 2024 Reckon. All rights reserved. | Designed by Creative Ethics
            Pvt Ltd
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
