import type { MetadataRoute } from "next";

import { SERVICES } from "@/components/services/servicesData";
import { COLLEGE_PROJECTS_PATH } from "@/components/college/collegeProjects";
import { PROJECTS, projectHref } from "@/components/projects/projectsData";
import { POSTS } from "@/content/blog";
import { PRIVACY, TERMS } from "@/content/legal";
import { SITE_UPDATED, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = POSTS.map((p) => p.updatedAt).sort().at(-1);

  return [
    { url: absoluteUrl("/"), lastModified: SITE_UPDATED, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/services"), lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.9 },
    ...SERVICES.map((service) => ({
      url: absoluteUrl(`/services/${service.id}`),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl(COLLEGE_PROJECTS_PATH), lastModified: SITE_UPDATED, changeFrequency: "monthly", priority: 0.7 },
    {
      url: absoluteUrl("/projects"),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
      images: PROJECTS.map((project) => absoluteUrl(project.image.src)),
    },
    ...PROJECTS.map((project) => ({
      url: absoluteUrl(projectHref(project.id)),
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [project.image, ...(project.proofs ?? [])].map((img) => absoluteUrl(img.src)),
    })),
    {
      url: absoluteUrl("/blog"),
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: absoluteUrl("/privacy-policy"), lastModified: PRIVACY.updatedIso, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: TERMS.updatedIso, changeFrequency: "yearly", priority: 0.3 },
    ...POSTS.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [absoluteUrl(post.image)],
    })),
  ];
}
