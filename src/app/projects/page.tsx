import type { Metadata } from "next";

import CTA from "@/components/CTA";
import ProjectsSection from "@/components/ProjectsSection";
import { PROJECTS, projectHref } from "@/components/projects/projectsData";
import JsonLd from "@/components/blog/JsonLd";
import { SCHEMA_ID, breadcrumbNode, pageMetadata, webPageNode } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const TITLE = "Our Projects — Websites & Local SEO Results";
const DESCRIPTION =
  "Websites and apps built by CRUDIFY and the results they earn — from Unique Glazing's UK website and local SEO to Ghost-ed, an encrypted messaging app.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/projects",
  keywords: [
    "website development portfolio",
    "web design case study",
    "local seo case study",
    "google business profile optimisation",
    "glazing company website",
    "messaging app development",
  ],
  image: {
    url: PROJECTS[0].image.src,
    width: 1440,
    height: 900,
    alt: PROJECTS[0].image.alt,
  },
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageNode({
      type: "CollectionPage",
      path: "/projects",
      name: TITLE,
      description: DESCRIPTION,
      image: PROJECTS[0].image.src,
      about: { "@id": SCHEMA_ID.business },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: PROJECTS.map((project, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: project.title,
          url: absoluteUrl(projectHref(project.id)),
        })),
      },
    }),
    breadcrumbNode("/projects", [{ name: "Projects", path: "/projects" }]),
  ],
};

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />
      <ProjectsSection headingAs="h1" />
      <CTA />
    </>
  );
}
