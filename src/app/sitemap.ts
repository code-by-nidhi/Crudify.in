import type { MetadataRoute } from "next";

import { SERVICES } from "@/components/services/servicesData";
import { POSTS } from "@/content/blog";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = POSTS.map((p) => p.updatedAt).sort().at(-1);

  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    ...SERVICES.map((service) => ({
      url: absoluteUrl(`/services/${service.id}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: absoluteUrl("/blog"),
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...POSTS.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      images: [absoluteUrl(post.image)],
    })),
  ];
}
