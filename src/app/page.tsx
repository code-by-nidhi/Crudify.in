import type { Metadata } from "next";

import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import WhatWeDo from "@/components/home/WhatWeDo";
import DigitalProducts from "@/components/DigitalProducts";
import CyberProducts from "@/components/CyberProducts";
import GrowthImpact from "@/components/GrowthImpact";
import HomeFaq from "@/components/home/HomeFaq";
import CTA from "@/components/CTA";
import { BRAND, CITIES, FAQS, TIERS } from "@/components/home/homeContent";

export const metadata: Metadata = {
  title: { absolute: `Best Marketing Company in Punjab | ${BRAND}, Ludhiana` },
  description: `${BRAND} is Ludhiana's leading marketing company serving all of Punjab — Meta & Google Ads, AI automation, web dev & cybersecurity. Get a free audit.`,
  keywords: [
    "Best Marketing Company in Punjab",
    "Digital Marketing Agency Ludhiana",
    "Meta Ads Agency Punjab",
    "Google Ads Company Ludhiana",
    "AI Marketing Services Punjab",
    "Website Development Company Ludhiana",
    "Cybersecurity Services Punjab",
  ],
  alternates: { canonical: "/" },
};

/** LocalBusiness + the 13 services + FAQPage, for rich results and for AI
 *  answer engines. Add `url`, `telephone`, `address` and — once there are
 *  reviews — `aggregateRating` to the business node. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "#organization",
      name: BRAND,
      description: `${BRAND} is a Ludhiana-based marketing company serving businesses across Punjab with AI-powered and human-driven services — Meta Ads, Google Ads, SEO, websites, e-commerce and cybersecurity.`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ludhiana",
        addressRegion: "Punjab",
        addressCountry: "IN",
      },
      areaServed: [
        ...CITIES.map((name) => ({ "@type": "City", name })),
        { "@type": "State", name: "Punjab" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital & Growth Services",
        itemListElement: TIERS.map((tier) => ({
          "@type": "OfferCatalog",
          name: tier.title,
          itemListElement: tier.services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.desc,
              provider: { "@id": "#organization" },
              areaServed: { "@type": "State", name: "Punjab" },
            },
          })),
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
      <WhatWeDo />
      <DigitalProducts />
      <CyberProducts />
      <GrowthImpact />
      <HomeFaq />
      <CTA />
    </>
  );
}
