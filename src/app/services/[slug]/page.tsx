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
import ServiceGuides from "@/components/services/ServiceGuides";
import { SERVICES, getService, serviceHref } from "@/components/services/servicesData";
import JsonLd from "@/components/blog/JsonLd";
import { ADDRESS, SCHEMA_ID, breadcrumbNode, pageMetadata, webPageNode } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const pageTitle = (service: { metaTitle: string }) => `${service.metaTitle} Services in Ludhiana`;

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

  return pageMetadata({
    title: pageTitle(service),
    description: service.metaDescription,
    keywords: service.keywords,
    path: serviceHref(service.id),
  });
}

export default async function ServiceDetailPage({
  params,
}: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) notFound();

  const path = serviceHref(service.id);
  const url = absoluteUrl(path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      webPageNode({
        path,
        name: pageTitle(service),
        description: service.metaDescription,
        about: { "@id": `${url}#service` },
        mainEntity: { "@id": `${url}#service` },
      }),
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: service.title,
        serviceType: service.title,
        description: service.desc,
        url,
        provider: { "@id": SCHEMA_ID.business },
        brand: { "@id": SCHEMA_ID.organization },
        areaServed: [
          { "@type": "City", name: "Ludhiana", address: ADDRESS },
          { "@type": "State", name: "Punjab" },
          { "@type": "Country", name: "India" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: service.title,
          itemListElement: service.items.map((item) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: item.name, description: item.desc },
          })),
        },
      },
      breadcrumbNode(path, [
        { name: "Services", path: "/services" },
        { name: service.title, path },
      ]),
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ServiceDetailHero service={service} />
      <Marquee />
      {/* the web pillar gets its own breakdown of the site types we build */}
      {service.id === "web" && <WebsiteTypes />}
      <ServiceDetailBody service={service} />
      <ServiceGuides href={path} title={service.title} />
      <ServicesProcess />
      <ServicesEngagement />
      <ServicesFaq />
      <CTA />
    </>
  );
}
