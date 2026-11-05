import { SERVICES } from "@/components/services/servicesData";
import { COLLEGE_PROJECTS_PATH, COLLEGE_PROJECT_CATEGORIES } from "@/components/college/collegeProjects";
import { PROJECTS, projectHref } from "@/components/projects/projectsData";
import { POSTS } from "@/content/blog";
import { SITE_DESCRIPTION, SITE_NAME, SITE_UPDATED, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** /llms.txt — a plain-language map of the site for AI assistants and answer
 *  engines (see llmstxt.org). Built from the same data as the pages. */
export function GET() {
  const body = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    `Last updated: ${SITE_UPDATED}`,
    "",
    "## Pages",
    `- [Home](${absoluteUrl("/")}): Overview, services, Business Growth Booster package and FAQs`,
    `- [About](${absoluteUrl("/about")}): The team, story and roadmap`,
    `- [Services](${absoluteUrl("/services")}): All services with With AI+ and Without AI versions`,
    ...SERVICES.map((s) => `- [${s.metaTitle}](${absoluteUrl(`/services/${s.id}`)}): ${s.tag}`),
    `- [Projects](${absoluteUrl("/projects")}): Client work and the results it earned`,
    `- [College Projects](${absoluteUrl(COLLEGE_PROJECTS_PATH)}): Final year and mini projects for students — ${COLLEGE_PROJECT_CATEGORIES.map((c) => `${c.title}: ${c.projects.map((p) => p.name).join(", ")}`).join("; ")}`,
    "",
    "## Client Projects",
    ...PROJECTS.map((p) => `- [${p.title}](${absoluteUrl(projectHref(p.id))}): ${p.description}${p.url ? ` Live: ${p.url}` : ""}`),
    "",
    "## Guides",
    ...POSTS.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.quickAnswer}`),
    "",
    "## Contact",
    `- Free growth plan enquiries: ${absoluteUrl("/#apply")}`,
    "- Location: Ludhiana, Punjab, India (serving clients across India)",
    "",
    "## Legal",
    `- [Privacy Policy](${absoluteUrl("/privacy-policy")})`,
    `- [Terms & Conditions](${absoluteUrl("/terms")})`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
