import type { Metadata, Viewport } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";

import AuroraBackground from "@/components/AuroraBackground";
import EnquiryModal from "@/components/contact/EnquiryModal";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollTopButton from "@/components/ScrollTopButton";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import ScrambleLabels from "@/components/motion/ScrambleLabels";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const spartan = League_Spartan({
  variable: "--font-spartan",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  openGraph: { siteName: SITE_NAME, locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image" },
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
      className={`${spartan.variable} h-full antialiased`}
      // The head script below adds data-intro before React hydrates.
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint so intro elements start hidden instead of
            flashing in and out before GSAP takes over. See "Intro gate" in
            globals.css; SmoothScroll clears it on hydration. The preload flag
            shows the homepage Preloader once per visit — see Preloader.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.intro="pending";try{if(location.pathname==="/"&&!sessionStorage.getItem("crudify-preloaded")&&!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.dataset.preload="on"}catch(e){}`,
          }}
        />
      </head>
      <body className="relative flex min-h-full flex-col overflow-x-clip">
        <AuroraBackground />
        <SmoothScroll />
        <ScrambleLabels />
        <Cursor />

        <Navbar />
        <main className="relative z-[2] flex-1">{children}</main>
        <Footer />
        <ScrollTopButton />
        <EnquiryModal />
      </body>
    </html>
  );
}
