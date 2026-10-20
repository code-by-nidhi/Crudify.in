import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";

/** Open to search engines and to AI answer engines alike — being quotable by
 *  ChatGPT, Claude, Perplexity and Google's AI features is the point of the
 *  blog's structure. Only the API is off limits. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
