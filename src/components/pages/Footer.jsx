"use client";
import { useEffect, useState } from "react";
import { MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  const [footer, setFooter] = useState(null);
  useEffect(() => {
    fetch("/api/users/footer")
      .then((res) => res.json())
      .then(setFooter)
      .catch(console.error);
  }, []);
  if (!footer) return null;
  return (
    <footer
      className="bg-gray-200 text-[#f0f0f0] rounded-t-3xl pt-12 pb-5 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url(${"/assets/images/Footer-BG.png"})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {}
          <div className="space-y-4">
            <div className="w-auto h-auto flex items-center justify-left p-2">
              <Image
                src={"/assets/images/Reckonext-logo.png"}
                alt="Reckonext Logo"
                className="w-auto h-auto object-contain"
                width={1000}
                height={40}
              />
            </div>
            <p className="text-sm leading-relaxed text-[#213147]">
              {footer.description}
            </p>
            {}
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
          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {}
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
            {}
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-lg text-[#213147] inline-block border-b border-[#213147] font-semibold mb-4">
                Products
              </h4>
              <ul className="space-y-2 text-[#213147] text-sm">
                <li>
                  <Link href="/products/casement-doors">Casement Doors</Link>
                </li>
                <li>
                  <Link href="/products/sliding-doors">Sliding Doors</Link>
                </li>
                <li>
                  <Link href="/products/slide-fold-doors">
                    Slide & Fold Doors
                  </Link>
                </li>
                <li>
                  <Link href="/products/casement-windows">
                    Casement Windows
                  </Link>
                </li>
                <li>
                  <Link href="/products/sliding-windows">Sliding Windows</Link>
                </li>
                <li>
                  <Link href="/products/french-windows">French Windows</Link>
                </li>
              </ul>
            </div>
          </div>
          {}
          <div className="bg-white/5 p-4 rounded-lg space-y-6">
            <h4 className="text-lg text-[#213147] inline-block border-b border-[#213147] font-semibold">
              Get In Touch
            </h4>
            {}
            <div className="flex items-start space-x-3">
              <MapPin size={20} className="mt-1 flex-shrink-0 text-[#044182]" />
              <div className="text-sm text-[#213147]">
                <strong className="text-[#213147]">PLANT LOCATION</strong>
                <br />
                Sy No.188 & 191, Plot No.8, Village
                <br />
                Manchal Plastics Park, Manchal Village,
                <br />
                Manchal Reddy District, Telangana - 501359.
              </div>
            </div>
            {}
            <div className="flex items-start space-x-3">
              <MapPin size={20} className="mt-1 flex-shrink-0 text-[#044182]" />
              <div className="text-sm text-[#213147]">
                <strong className="text-[#213147]">OFFICE LOCATION</strong>
                <br />
                H No: 10-158/1, New Venkateshwara Colony.
                <br />
                Jillellaguda, Gayatrinagar,
                <br />
                Hyderabad, Telangana-500097.
              </div>
            </div>
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
