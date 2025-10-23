import { MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
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
            {}
            <div className="w-auto h-auto flex items-center justify-left p-2">
              <Image
                src={"/assets/images/Reckonext-logo.png"}
                alt="Reckonext Logo"
                className="w-auto h-auto object-contain"
                width={1000}
                height={40}
              />
            </div>
            {}
            <p className="text-sm leading-relaxed text-[#213147]">
              Customer satisfaction is at the heart of our business. Our
              dedicated team is committed to providing excellent service from
              initial consultation to installation, ensuring seamless experience
              for our clients.
            </p>
            {}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/reckon.ext.2025"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#213147] hover:text-gray-300 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://x.com/reckonext"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#213147] hover:text-gray-300 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.instagram.com/reckon_ext/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#213147] hover:text-gray-300 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/reckon-ext-4a25342a7/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#213147] hover:text-[#044182] p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          {}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-lg text-[#213147] inline-block border-b border-[#213147] font-semibold mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2 text-[#213147] text-sm">
                <li>
                  <Link
                    href="/about"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="hover:text-[#044182] block py-1"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="hover:text-[#044182] block py-1"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="hover:text-[#044182] block py-1"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="hover:text-[#044182] block py-1"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    className="hover:text-[#044182] block py-1"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="text-lg text-[#213147] inline-block border-b border-[#213147] font-semibold mb-4">
                Products
              </h4>
              <ul className="space-y-2 text-[#213147] text-sm">
                <li>
                  <Link
                    href="/products/casement-doors"
                    className="block py-1"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Casement Doors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/sliding-doors"
                    className="block py-1"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Sliding Doors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/slide-fold-doors"
                    className="block py-1"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Slide & Fold Doors
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/casement-windows"
                    className="block py-1"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Casement Windows
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/sliding-windows"
                    className="block py-1"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Sliding Windows
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products/french-windows"
                    className="block py-1"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    French Windows
                  </Link>
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
        {}
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
