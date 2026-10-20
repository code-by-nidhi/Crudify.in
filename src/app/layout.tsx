import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";

import AuroraBackground from "@/components/AuroraBackground";
import EnquiryModal from "@/components/contact/EnquiryModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "CRUDIFY — Best Marketing Company in Punjab",
    template: "%s | CRUDIFY",
  },
  description:
    "CRUDIFY is a Ludhiana-based marketing company serving all of Punjab — Meta & Google Ads, AI automation, web development, e-commerce and cybersecurity.",
  keywords: [
    "CRUDIFY",
    "Best Marketing Company in Punjab",
    "Digital Marketing Agency Ludhiana",
    "Meta Ads Agency Punjab",
    "Google Ads Company Ludhiana",
  ],
};

export const viewport: Viewport = {
  themeColor: "#EDEBD0",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="grain relative flex min-h-full flex-col overflow-x-clip">
        <AuroraBackground />
        <SmoothScroll />

        <Navbar />
        <main className="relative z-[2] flex-1">{children}</main>
        <Footer />
        <EnquiryModal />
      </body>
    </html>
  );
}
