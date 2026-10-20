import { SERVICES } from "@/components/services/servicesData";
import { POSTS } from "@/content/blog";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** /llms.txt — a plain-language map of the site for AI assistants and answer
 *  engines (see llmstxt.org). Built from the same data as the pages. */
export function GET() {
  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_NAME} is a Ludhiana-based growth agency in Punjab, India. One team covers digital marketing (Meta and Google Ads, Google Maps ranking, social media), web and app development (websites, Shopify and custom e-commerce, dashboards, SaaS), AI agents and automation, and cybersecurity. Every service comes in two versions: With AI+ (faster, more affordable) and Without AI (fully handcrafted).`,
    "",
    "## Pages",
    `- [Home](${absoluteUrl("/")}): Overview, services, Business Growth Booster package and FAQs`,
    `- [About](${absoluteUrl("/about")}): The team, story and roadmap`,
    `- [Services](${absoluteUrl("/services")}): All services with With AI+ and Without AI versions`,
    ...SERVICES.map((s) => `- [${s.metaTitle}](${absoluteUrl(`/services/${s.id}`)}): ${s.tag}`),
    "",
    "## Guides",
    ...POSTS.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.quickAnswer}`),
    "",
    "## Contact",
    `- Free growth plan enquiries: ${absoluteUrl("/#apply")}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
