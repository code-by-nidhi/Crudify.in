import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CTA from "@/components/CTA";
import Marquee from "@/components/Marquee";
import ServiceDetailBody from "@/components/services/ServiceDetailBody";
import ServiceDetailHero from "@/components/services/ServiceDetailHero";
import ServicesEngagement from "@/components/services/ServicesEngagement";
import ServicesFaq from "@/components/services/ServicesFaq";
import ServicesProcess from "@/components/services/ServicesProcess";
import WebsiteTypes from "@/components/services/WebsiteTypes";
import { SERVICES, getService } from "@/components/services/servicesData";

/** The four pillars are the only valid slugs, so prerender them all. */
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) return {};

  return {
    title: `${service.metaTitle} — ${service.tag}`,
    description: service.metaDescription,
    keywords: service.keywords,
    alternates: { canonical: `/services/${service.id}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  return (
    <>
      <ServiceDetailHero service={service} />
      <Marquee />
      {/* the web pillar gets its own breakdown of the site types we build */}
      {service.id === "web" && <WebsiteTypes />}
      <ServiceDetailBody service={service} />
      <ServicesProcess />
      <ServicesEngagement />
      <ServicesFaq />
      <CTA />
    </>
  );
}
