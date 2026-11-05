import type { Metadata } from "next";

import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import ServicesCompare from "@/components/home/ServicesCompare";
import GrowthBooster from "@/components/home/GrowthBooster";
import HomeGuide from "@/components/home/HomeGuide";
import HomeOutcomes from "@/components/home/HomeOutcomes";
import HomeIndustries from "@/components/home/HomeIndustries";
import HomeCompare from "@/components/home/HomeCompare";
import HomeCities from "@/components/home/HomeCities";
import HomePlatforms from "@/components/home/HomePlatforms";
import HomeGlossary, { termId } from "@/components/home/HomeGlossary";
import ProjectsSection from "@/components/ProjectsSection";
import TestimonialSlider from "@/components/home/TestimonialSlider";
import HomeFaq from "@/components/home/HomeFaq";
import HomeBlogs from "@/components/home/HomeBlogs";
import CTA from "@/components/CTA";
import { BRAND, CITIES, FAQS, GLOSSARY, SERVICES } from "@/components/home/homeContent";
import JsonLd from "@/components/blog/JsonLd";
import { ADDRESS, LOGO, SCHEMA_ID, pageMetadata } from "@/lib/seo";
import {
  BUSINESS,
  DEFAULT_OG_IMAGE,
  SITE_LAUNCHED,
  SITE_UPDATED,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

const TITLE = `${BRAND} | Digital Marketing, Web Development & AI Agents in Ludhiana`;

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  absoluteTitle: true,
  path: "/",
  // Kept under 160 characters so search results show it whole.
  description: `${BRAND}: digital marketing, websites and AI agents in Ludhiana. Meta & Google ads, Shopify stores and Google Maps ranking, With AI+ or Without AI.`,
  keywords: [
    "digital marketing agency in Ludhiana",
    "website development Ludhiana",
    "Google Maps ranking",
    "Shopify store development",
    "AI agents for business",
    "digital marketing packages",
  ],
});

const DESCRIPTION = `${BRAND} is a Ludhiana-based growth agency combining digital marketing, web and app development, AI agents and cybersecurity. Every service comes in two versions: With AI+ (faster, affordable) and Without AI (handcrafted, premium).`;

const ID = {
  ...SCHEMA_ID,
  webpage: `${SITE_URL}/#webpage`,
};

const IMAGE = absoluteUrl(DEFAULT_OG_IMAGE.url);

/** WebPage, LocalBusiness, FAQPage and the glossary. Organization and WebSite
 *  come from the root layout; @ids are absolute so every page's graph points
 *  at the same entities.
 *  TODO: fill in BUSINESS in lib/site.ts (phone, email, street address,
 *  profiles) and keep the name, address and phone identical to the Google
 *  Business Profile and directories. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": ID.webpage,
      url: absoluteUrl("/"),
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en-IN",
      isPartOf: { "@id": ID.website },
      about: { "@id": ID.business },
      publisher: { "@id": ID.organization },
      primaryImageOfPage: { "@type": "ImageObject", url: IMAGE },
      datePublished: SITE_LAUNCHED,
      dateModified: SITE_UPDATED,
    },
    {
      "@type": "ProfessionalService",
      "@id": ID.business,
      name: BRAND,
      url: absoluteUrl("/"),
      logo: LOGO,
      image: IMAGE,
      description: DESCRIPTION,
      parentOrganization: { "@id": ID.organization },
      address: ADDRESS,
      ...(BUSINESS.telephone && { telephone: BUSINESS.telephone }),
      ...(BUSINESS.email && { email: BUSINESS.email }),
      ...(BUSINESS.sameAs.length > 0 && { sameAs: BUSINESS.sameAs.map((s) => s.url) }),
      areaServed: [
        ...CITIES.map((name) => ({ "@type": "City", name })),
        { "@type": "Country", name: "India" },
      ],
      knowsAbout: SERVICES.map((service) => service.name),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Digital Marketing, Web Development & AI Services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: `With AI+: ${service.ai}. Without AI: ${service.custom}.`,
            provider: { "@id": ID.business },
            areaServed: { "@type": "Country", name: "India" },
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      isPartOf: { "@id": ID.webpage },
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
    {
      "@type": "DefinedTermSet",
      "@id": `${SITE_URL}/#glossary`,
      name: GLOSSARY.title,
      isPartOf: { "@id": ID.webpage },
      hasDefinedTerm: GLOSSARY.terms.map((item) => ({
        "@type": "DefinedTerm",
        name: item.term,
        description: item.definition,
        url: absoluteUrl(`/#${termId(item.term)}`),
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero />
      <Marquee />
      <AboutSection />
      <HomeOutcomes />
      <FeaturesSection />
      <ServicesCompare />
      <GrowthBooster />
      <HomeGuide />
      <HomeIndustries />
      <HomeCompare />
      <ProjectsSection />
      <TestimonialSlider />
      <HomeCities />
      <HomePlatforms />
      <HomeFaq />
      <HomeGlossary />
      <HomeBlogs />
      <CTA />
    </>
  );
}
