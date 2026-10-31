import type { Metadata } from "next";

import CTA from "@/components/CTA";
import Marquee from "@/components/Marquee";
import ServicesCatalog from "@/components/services/ServicesCatalog";
import ServicesFaq from "@/components/services/ServicesFaq";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesProcess from "@/components/services/ServicesProcess";
import ServicesSectors from "@/components/services/ServicesSectors";
import ServicesTiers from "@/components/services/ServicesTiers";
import ServicesWhy from "@/components/services/ServicesWhy";
import { SERVICES, serviceHref } from "@/components/services/servicesData";
import JsonLd from "@/components/blog/JsonLd";
import { SCHEMA_ID, breadcrumbNode, pageMetadata, webPageNode } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const TITLE = "Web, Marketing, AI & Cyber Security Services in Ludhiana";
const DESCRIPTION =
  "Websites, e-commerce, dashboards and SaaS apps, Meta and Google Ads, social media, AI agents and chatbots, and cyber security — from one Ludhiana team.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/services",
  keywords: [
    "ecommerce website development",
    "business website design",
    "saas app development",
    "meta ads and google ads",
    "google business profile",
    "social media management",
    "ai agents and chatbots",
    "cyber security audit",
  ],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageNode({
      type: "CollectionPage",
      path: "/services",
      name: TITLE,
      description: DESCRIPTION,
      about: { "@id": SCHEMA_ID.business },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: SERVICES.map((service, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: service.title,
          url: absoluteUrl(serviceHref(service.id)),
        })),
      },
    }),
    breadcrumbNode("/services", [{ name: "Services", path: "/services" }]),
  ],
};

const VALUE_STRIP = [
  "✶ Transparent Pricing",
  "✶ Fixed Quote Before Work Starts",
  "✶ Code & Accounts In Your Name",
  "✶ One Team, Four Pillars",
  "✶ No Hidden Charges",
  "✶ 10-Minute Discovery Call",
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ServicesHero />
      <Marquee />
      <ServicesCatalog />
      <Marquee items={VALUE_STRIP} id="services-values" />
      <ServicesWhy />
      <ServicesTiers />
      <ServicesSectors />
      <ServicesProcess />
      <ServicesFaq />
      <CTA />
    </>
  );
}
