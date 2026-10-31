import type { Metadata } from "next";

import {
  BUSINESS,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_LAUNCHED,
  SITE_NAME,
  SITE_UPDATED,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

/** Absolute @ids shared by every page's JSON-LD, so each graph points at the
 *  same Organization and WebSite entities the layout declares once. */
export const SCHEMA_ID = {
  organization: `${SITE_URL}/#organization`,
  business: `${SITE_URL}/#localbusiness`,
  website: `${SITE_URL}/#website`,
};

export const LOGO = {
  "@type": "ImageObject",
  url: absoluteUrl("/logo/crudy-logo-only.webp"),
  width: 574,
  height: 589,
};

export const ADDRESS = {
  "@type": "PostalAddress",
  ...(BUSINESS.streetAddress && { streetAddress: BUSINESS.streetAddress }),
  addressLocality: "Ludhiana",
  addressRegion: "Punjab",
  ...(BUSINESS.postalCode && { postalCode: BUSINESS.postalCode }),
  addressCountry: "IN",
};

/** Sitewide entities, rendered once from the root layout. */
export const SITE_GRAPH = [
  {
    "@type": "Organization",
    "@id": SCHEMA_ID.organization,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: LOGO,
    image: absoluteUrl(DEFAULT_OG_IMAGE.url),
    slogan: "Your Growth Partner",
    description: SITE_DESCRIPTION,
    address: ADDRESS,
    areaServed: [
      { "@type": "City", name: "Ludhiana" },
      { "@type": "State", name: "Punjab" },
      { "@type": "Country", name: "India" },
    ],
    knowsAbout: [
      "Digital marketing",
      "Meta Ads",
      "Google Ads",
      "Local SEO and Google Maps ranking",
      "Website development",
      "E-commerce and Shopify development",
      "AI agents and chatbots",
      "Workflow automation",
      "Cybersecurity",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: absoluteUrl("/#apply"),
      areaServed: "IN",
      ...(BUSINESS.email && { email: BUSINESS.email }),
      ...(BUSINESS.telephone && { telephone: BUSINESS.telephone }),
    },
    ...(BUSINESS.email && { email: BUSINESS.email }),
    ...(BUSINESS.telephone && { telephone: BUSINESS.telephone }),
    ...(BUSINESS.sameAs.length > 0 && { sameAs: BUSINESS.sameAs.map((s) => s.url) }),
  },
  {
    "@type": "WebSite",
    "@id": SCHEMA_ID.website,
    url: absoluteUrl("/"),
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en-IN",
    publisher: { "@id": SCHEMA_ID.organization },
  },
];

type Crumb = { name: string; path: string };

export function breadcrumbNode(path: string, crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** The WebPage node for a route, with publication dates and a breadcrumb
 *  reference. Extra properties (mainEntity, about …) are merged in. */
export function webPageNode({
  path,
  name,
  description,
  type = "WebPage",
  datePublished = SITE_LAUNCHED,
  dateModified = SITE_UPDATED,
  image = DEFAULT_OG_IMAGE.url,
  breadcrumb = true,
  ...extra
}: {
  path: string;
  name: string;
  description: string;
  type?: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
  breadcrumb?: boolean;
  [key: string]: unknown;
}) {
  const url = absoluteUrl(path);
  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": SCHEMA_ID.website },
    publisher: { "@id": SCHEMA_ID.organization },
    primaryImageOfPage: { "@type": "ImageObject", url: absoluteUrl(image) },
    datePublished,
    dateModified,
    ...(breadcrumb && { breadcrumb: { "@id": `${url}#breadcrumb` } }),
    ...extra,
  };
}

/**
 * Title, description, canonical, Open Graph and Twitter tags for a route.
 * A page's openGraph replaces the layout's rather than merging with it, so
 * site name, locale and a default image are repeated here.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  keywords,
  image = DEFAULT_OG_IMAGE,
  modifiedTime = SITE_UPDATED,
}: {
  title: string;
  description: string;
  path: string;
  /** Skip the "| CRUDIFY" template (the title already names the brand). */
  absoluteTitle?: boolean;
  keywords?: string[];
  image?: { url: string; width?: number; height?: number; alt: string };
  modifiedTime?: string;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
    other: { "og:updated_time": modifiedTime },
  };
}
