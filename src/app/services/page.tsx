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

export const metadata: Metadata = {
  title: "Services — Web, Digital Marketing, AI & Cyber Security",
  description:
    "E-commerce and business websites, dashboards, SaaS apps, landing pages, digital invitations and menus — plus Meta and Google Ads, social media, video editing, AI agents and chatbots, and cyber security.",
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
