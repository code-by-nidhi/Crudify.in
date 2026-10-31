/** The live site's origin, used for canonical URLs, sitemaps and JSON-LD.
 *  It must be the host that answers 200 — the apex domain currently 308s to
 *  www, so canonicals pointing at the apex sent crawlers to a redirect.
 *  Override with NEXT_PUBLIC_SITE_URL if the primary domain changes. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.crudify.in").replace(/\/$/, "");

export const SITE_NAME = "CRUDIFY";

/** Absolute URL for a site path. */
export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** One-paragraph description of the business, reused by the Organization
 *  schema, llms.txt and default metadata so every surface says the same thing. */
export const SITE_DESCRIPTION = `${SITE_NAME} is a Ludhiana-based digital growth agency in Punjab, India. One team covers digital marketing (Meta and Google Ads, Google Maps ranking, social media), website and app development (business websites, Shopify and custom e-commerce, dashboards, SaaS), AI agents and automation, and cybersecurity — each offered With AI+ (faster, more affordable) or Without AI (fully handcrafted).`;

/** ISO dates for schema and meta tags. LAUNCHED is when the site first went
 *  up; bump UPDATED whenever the static pages' content changes. */
export const SITE_LAUNCHED = "2026-10-14";
export const SITE_UPDATED = "2026-10-31";

/** Default social share image (1200×800). */
export const DEFAULT_OG_IMAGE = {
  url: "/about/team.webp",
  width: 1200,
  height: 800,
  alt: `The ${SITE_NAME} team working on laptops around a shared table`,
};

/**
 * Contact and profile details for the Organization schema and footer.
 * Every field is optional and is only output once filled in — keep them
 * identical to the Google Business Profile and directory listings.
 * TODO: fill in once confirmed.
 */
export const BUSINESS: {
  email?: string;
  telephone?: string;
  streetAddress?: string;
  postalCode?: string;
  /** Official profiles (Google Business Profile, LinkedIn, Instagram …). */
  sameAs: { label: string; url: string }[];
} = {
  sameAs: [],
};
