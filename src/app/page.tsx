import type { Metadata } from "next";

import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import ServicesCompare from "@/components/home/ServicesCompare";
import GrowthBooster from "@/components/home/GrowthBooster";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import HomeFaq from "@/components/home/HomeFaq";
import HomeBlogs from "@/components/home/HomeBlogs";
import CTA from "@/components/CTA";
import { BRAND, FAQS, SERVICES } from "@/components/home/homeContent";

export const metadata: Metadata = {
  title: {
    absolute: `${BRAND} | Digital Marketing, Web Development & AI Agents in Ludhiana`,
  },
  description: `${BRAND} is your growth partner for social media, Meta and Google ads, websites, Shopify stores, Google Maps ranking, video and AI agents. Choose With AI+ or Without AI. Based in Ludhiana, serving India.`,
  keywords: [
    "digital marketing agency in Ludhiana",
    "website development Ludhiana",
    "Google Maps ranking",
    "Shopify store development",
    "AI agents for business",
    "digital marketing packages",
  ],
  alternates: { canonical: "/" },
};

const DESCRIPTION = `${BRAND} is a Ludhiana-based growth agency combining digital marketing, web and app development, and cybersecurity. Every service comes in two versions: With AI+ (faster, affordable) and Without AI (handcrafted, premium).`;

/** Organization + LocalBusiness + FAQPage, for rich results and for AI answer
 *  engines. TODO: add `url`, `telephone`, `streetAddress`, `postalCode` and
 *  `sameAs` (Google Business Profile, socials), and keep the name, address
 *  and phone identical to the Google Business Profile and directories. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "#organization",
      name: BRAND,
      slogan: "Your Growth Partner",
      description: DESCRIPTION,
    },
    {
      "@type": "ProfessionalService",
      "@id": "#localbusiness",
      name: BRAND,
      description: DESCRIPTION,
      parentOrganization: { "@id": "#organization" },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ludhiana",
        addressRegion: "Punjab",
        addressCountry: "IN",
      },
      areaServed: { "@type": "Country", name: "India" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Marketing, Web Development & AI Services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: `With AI+: ${service.ai}. Without AI: ${service.custom}.`,
            provider: { "@id": "#localbusiness" },
            areaServed: { "@type": "Country", name: "India" },
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Marquee />
      <AboutSection />
      <FeaturesSection />
      <ServicesCompare />
      <GrowthBooster />
      <TestimonialSlider />
      <HomeFaq />
      <HomeBlogs />
      <CTA />
    </>
  );
}
