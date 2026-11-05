import type { Metadata } from "next";
import Link from "next/link";

import CTA from "@/components/CTA";
import { CourseIcon } from "@/components/Icons";
import EnquireButton from "@/components/blog/EnquireButton";
import JsonLd from "@/components/blog/JsonLd";
import {
  COLLEGE_PROJECTS_PATH,
  COLLEGE_PROJECT_CATEGORIES,
  COLLEGE_PROJECT_INCLUDES,
} from "@/components/college/collegeProjects";
import { SCHEMA_ID, breadcrumbNode, pageMetadata, webPageNode } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const TITLE = "College Projects — Final Year & Mini Projects in Cyber Security and Web";
const DESCRIPTION =
  "Working final year and mini projects for students: network vulnerability scanner, SOC dashboard, job portal, T&P system, e-commerce with AI chatbot and more.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: COLLEGE_PROJECTS_PATH,
  keywords: [
    "final year projects",
    "mini projects for students",
    "cyber security projects",
    "web development projects",
    "college projects with source code",
    "project report and documentation",
  ],
});

const ALL_PROJECTS = COLLEGE_PROJECT_CATEGORIES.flatMap((category) =>
  category.projects.map((project) => ({ ...project, category })),
);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageNode({
      type: "CollectionPage",
      path: COLLEGE_PROJECTS_PATH,
      name: TITLE,
      description: DESCRIPTION,
      about: { "@id": SCHEMA_ID.business },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: ALL_PROJECTS.map((project, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: project.name,
          description: project.summary,
          url: absoluteUrl(`${COLLEGE_PROJECTS_PATH}#${project.category.id}`),
        })),
      },
    }),
    breadcrumbNode(COLLEGE_PROJECTS_PATH, [{ name: "College Projects", path: COLLEGE_PROJECTS_PATH }]),
  ],
};

const H2 =
  "font-display text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-tertiary";

export default function CollegeProjectsPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <div className="relative px-[4vw] pb-24 pt-28 sm:pb-32 lg:pt-32">
        <div className="mx-auto max-w-[1180px]">
          <nav aria-label="Breadcrumb" className="text-[13px] text-tertiary/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-secondary">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-tertiary/85">College Projects</li>
            </ol>
          </nav>

          <header className="mt-8 max-w-[860px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/[0.06] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
              <CourseIcon name="terminal" className="h-3.5 w-3.5" />
              Final Year & Mini Projects
            </span>
            <h1 className="mt-6 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-tertiary">
              College projects we have built
            </h1>
            <p className="mt-5 max-w-[62ch] text-[1.1rem] leading-relaxed text-tertiary/70">
              Working cyber security and web development projects for students — built by our team,
              delivered with the report, and explained so you can present them with confidence.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <EnquireButton>Get your project →</EnquireButton>
              {COLLEGE_PROJECT_CATEGORIES.map((category) => (
                <a key={category.id} href={`#${category.id}`} className="btn btn-ghost">
                  {category.title}
                </a>
              ))}
            </div>
          </header>

          {COLLEGE_PROJECT_CATEGORIES.map((category) => (
            <section key={category.id} aria-labelledby={category.id} className="mt-20">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary/12 text-secondary">
                  <CourseIcon name={category.icon} className="h-5 w-5" />
                </span>
                <h2 id={category.id} className={`scroll-mt-28 ${H2}`}>
                  {category.title}
                </h2>
                <span className="ml-auto rounded-full border border-secondary/25 px-3 py-1 font-mono text-[12px] font-bold text-secondary">
                  {category.projects.length} projects
                </span>
              </div>
              <p className="mt-4 max-w-[70ch] text-[1.02rem] leading-relaxed text-tertiary/70">{category.intro}</p>

              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {category.projects.map((project, i) => (
                  <li
                    key={project.name}
                    className="flex flex-col rounded-[22px] border border-secondary/20 bg-surface p-6 shadow-[0_18px_40px_-28px_var(--shadow-warm)]"
                  >
                    <span className="font-mono text-[13px] font-extrabold text-secondary/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-[1.2rem] font-semibold leading-snug text-tertiary">
                      {project.name}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-tertiary/75">{project.summary}</p>
                    <ul className="mt-5 flex flex-col gap-2 border-t border-tertiary/10 pt-4">
                      {project.features.map((feature) => (
                        <li key={feature} className="flex gap-2.5 text-[13.5px] leading-snug text-tertiary/75">
                          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                            <CourseIcon name="check" className="h-2.5 w-2.5" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <section aria-labelledby="included" className="panel panel-accent mt-20 p-8 sm:p-10">
            <p className="eyebrow">Every project comes with</p>
            <h2
              id="included"
              className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-tight tracking-[-0.03em] text-primary"
            >
              Everything you need to submit and present
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {COLLEGE_PROJECT_INCLUDES.map((item) => (
                <li key={item.title}>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-secondary">
                    <CourseIcon name={item.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-[1.05rem] font-semibold text-primary">{item.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-primary/80">{item.body}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <EnquireButton>Ask about a project</EnquireButton>
            </div>
          </section>
        </div>
      </div>

      <CTA />
    </>
  );
}
