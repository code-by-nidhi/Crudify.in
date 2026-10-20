/** The live site's origin, used for canonical URLs, sitemaps and JSON-LD.
 *  Override with NEXT_PUBLIC_SITE_URL if the domain changes. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://crudify.in").replace(/\/$/, "");

export const SITE_NAME = "CRUDIFY";

/** Absolute URL for a site path. */
export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
