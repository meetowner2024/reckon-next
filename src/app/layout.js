import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import ClientLayout from "./ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Reckon EXT. | uPVC Profiles, Windows & Doors Manufacturer",
  description:
    "Reckon EXT. is a leading manufacturer of high-quality uPVC profiles, windows, and doors in Hyderabad, India. Durable, energy-efficient, and low-maintenance solutions.",
  keywords: [
    "uPVC profiles",
    "uPVC windows",
    "uPVC doors",
    "uPVC manufacturer India",
    "Reckon EXT Hyderabad",
    "uPVC profiles manufacturer"
  ],
  authors: [{ name: "Reckon EXT." }],
  openGraph: {
    title: "Reckon EXT. – uPVC Profiles, Windows & Doors Manufacturer",
    description:
      "Reliable & innovative manufacturer of uPVC profiles, windows, and doors in Hyderabad, offering energy-efficient, termite-resistant, and low-maintenance solutions.",
    url: "https://reckonext.com",
    siteName: "Reckon EXT.",
    images: [
      {
        url: "/assets/images/Reckonext-logo.png", 
        width: 800, 
        height: 800,
        alt: "Reckon EXT Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reckon EXT. | uPVC Profiles, Windows & Doors",
    description:
      "Leading manufacturer of uPVC profiles, windows, and doors in Hyderabad – Reckon EXT.",
    images: ["/assets/images/Reckonext-logo.png"], 
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
