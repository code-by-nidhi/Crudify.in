import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import CTA from "@/components/CTA";
import { CourseIcon } from "@/components/Icons";
import JsonLd from "@/components/blog/JsonLd";
import { PROJECTS, getProject, projectHref } from "@/components/projects/projectsData";
import { SCHEMA_ID, breadcrumbNode, pageMetadata, webPageNode } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.metaTitle,
    description: project.metaDescription,
    path: projectHref(project.id),
    keywords: project.tags,
    image: { url: project.image.src, width: 1440, height: 900, alt: project.image.alt },
  });
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const path = projectHref(project.id);
  const url = absoluteUrl(path);
  const others = PROJECTS.filter((p) => p.id !== project.id);
  const Frame = project.url ? "a" : "div";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      webPageNode({
        path,
        name: project.metaTitle,
        description: project.metaDescription,
        image: project.image.src,
        mainEntity: { "@id": `${url}#project` },
      }),
      {
        "@type": "CreativeWork",
        "@id": `${url}#project`,
        name: project.title,
        description: project.description,
        image: absoluteUrl(project.image.src),
        keywords: project.tags.join(", "),
        creator: { "@id": SCHEMA_ID.organization },
        // A private project's client stays unnamed here too.
        ...(project.url && {
          url: project.url,
          sourceOrganization: { "@type": "Organization", name: project.client, url: project.url },
        }),
      },
      breadcrumbNode(path, [
        { name: "Projects", path: "/projects" },
        { name: project.client, path },
      ]),
    ],
  };

  return (
    <>
      <article className="relative px-[4vw] pb-24 pt-28 sm:pb-32 lg:pt-32">
        <JsonLd data={jsonLd} />

        <div className="mx-auto max-w-[1180px]">
          <nav aria-label="Breadcrumb" className="text-[13px] text-tertiary/60">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-secondary">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/projects" className="hover:text-secondary">Projects</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="line-clamp-1 text-tertiary/85">
                {project.client}
              </li>
            </ol>
          </nav>

          <header className="mt-8 max-w-[860px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/[0.06] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
              <CourseIcon name={project.icon} className="h-3.5 w-3.5" />
              {project.category}
            </span>
            <h1 className="mt-6 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-tertiary">
              {project.title}
            </h1>
            <p className="mt-5 max-w-[66ch] text-[1.1rem] leading-relaxed text-tertiary/70">
              {project.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Visit Live Website ↗
                </a>
              )}
              <Link href="/projects" className="btn btn-ghost">
                ← All Projects
              </Link>
            </div>
          </header>

          {/* the delivered site, in a browser frame — a link only when it is public */}
          <Frame
            {...(project.url && { href: project.url, target: "_blank", rel: "noopener noreferrer" })}
            className="mt-12 block overflow-hidden rounded-[28px] border border-secondary/25 bg-surface shadow-[0_28px_60px_-24px_var(--shadow-warm-strong)]"
          >
            <div className="flex items-center gap-2 border-b border-tertiary/10 px-5 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-secondary/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-secondary/25" />
              <span className="h-2.5 w-2.5 rounded-full bg-secondary/15" />
              <span className="ml-3 truncate font-mono text-[12px] text-tertiary/55">
                {project.url?.replace(/^https?:\/\//, "") ?? "Private client system"}
              </span>
            </div>
            <div className="relative aspect-[16/10]">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                priority
                sizes="(min-width: 1240px) 1180px, 92vw"
                className="object-cover object-top"
              />
            </div>
          </Frame>

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col-reverse rounded-[22px] border border-secondary/20 bg-surface p-6 text-center"
              >
                <dt className="mt-1 text-[13px] font-semibold uppercase tracking-[0.12em] text-tertiary/60">
                  {m.label}
                </dt>
                <dd className="font-mono text-[1.7rem] font-extrabold text-secondary">{m.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
            <section aria-labelledby="overview" className="min-w-0 max-w-[760px]">
              <h2
                id="overview"
                className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-tertiary"
              >
                About the project
              </h2>
              <div className="mt-5 flex flex-col gap-5">
                {project.overview.map((paragraph) => (
                  <p key={paragraph} className="text-[1.05rem] leading-[1.8] text-tertiary/80">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <aside className="rounded-[22px] border border-secondary/15 bg-surface/70 p-6 self-start">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">What we delivered</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {project.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-[14.5px] leading-snug text-tertiary/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                      <CourseIcon name="check" className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-tertiary/10 pt-5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-xl border border-tertiary/12 bg-surface/70 px-3 py-1 text-xs font-semibold text-tertiary/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </aside>
          </div>

          <section aria-labelledby="features" className="mt-16">
            <h2
              id="features"
              className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-tertiary"
            >
              Key features
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {project.features.map((feature) => (
                <li
                  key={feature.title}
                  className="rounded-[22px] border border-secondary/20 bg-surface p-6 shadow-[0_18px_40px_-28px_var(--shadow-warm)]"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary/12 text-secondary">
                    <CourseIcon name={feature.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-[1.1rem] font-semibold text-tertiary">{feature.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-tertiary/75">{feature.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="case-study" className="mt-16">
            <h2
              id="case-study"
              className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-tertiary"
            >
              Case study
            </h2>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {[
                { label: "Why we built it", text: project.caseStudy.why },
                { label: "What was needed", text: project.caseStudy.needs },
              ].map((item) => (
                <div key={item.label} className="rounded-[22px] border border-secondary/20 bg-surface p-7">
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">{item.label}</h3>
                  <p className="mt-3 text-[1rem] leading-[1.75] text-tertiary/80">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-[22px] border border-secondary/20 bg-surface p-7">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
                  Client requirements
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {project.caseStudy.requirements.map((item) => (
                    <li key={item} className="flex gap-3 text-[14.5px] leading-snug text-tertiary/80">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary/10 font-mono text-[11px] font-bold text-secondary"
                      >
                        •
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[22px] border border-secondary/20 bg-surface p-7">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
                  How we achieved it
                </h3>
                <ol className="mt-4 flex flex-col gap-3.5">
                  {project.caseStudy.approach.map((step, i) => (
                    <li key={step} className="flex gap-3.5 text-[14.5px] leading-relaxed text-tertiary/80">
                      <span
                        aria-hidden="true"
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary font-mono text-[11px] font-bold text-primary"
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="panel panel-accent mt-5 p-7 sm:p-8">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/80">
                What we added new
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.caseStudy.additions.map((item) => (
                  <li key={item} className="flex gap-3 text-[14.5px] leading-snug text-primary/90">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-secondary">
                      <CourseIcon name="check" className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {project.proofs && (
            <section aria-labelledby="results" className="mt-16">
              <h2
                id="results"
                className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-tertiary"
              >
                The results
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {project.proofs.map((proof) => (
                  <figure
                    key={proof.src}
                    className="overflow-hidden rounded-[22px] border border-secondary/20 bg-white"
                  >
                    <a href={proof.src} target="_blank" rel="noopener noreferrer" className="relative block aspect-[3/2]">
                      <Image
                        src={proof.src}
                        alt={proof.alt}
                        fill
                        sizes="(min-width: 768px) 580px, 92vw"
                        className="object-contain object-left-top"
                      />
                    </a>
                    <figcaption className="border-t border-tertiary/10 bg-surface px-5 py-3 text-[13px] font-semibold text-tertiary/70">
                      {proof.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          {others.length > 0 && (
            <section aria-labelledby="more-projects" className="mt-20">
              <h2
                id="more-projects"
                className="font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.03em] text-tertiary"
              >
                More projects
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {others.map((other) => (
                  <Link
                    key={other.id}
                    href={projectHref(other.id)}
                    className="group overflow-hidden rounded-[22px] border border-secondary/20 bg-surface transition-shadow hover:shadow-[0_18px_40px_-24px_var(--shadow-warm-strong)]"
                  >
                    <span className="relative block aspect-[16/9]">
                      <Image
                        src={other.image.src}
                        alt={other.image.alt}
                        fill
                        sizes="(min-width: 768px) 580px, 92vw"
                        className="object-cover object-top"
                      />
                    </span>
                    <span className="block p-5">
                      <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary">
                        {other.category}
                      </span>
                      <span className="mt-2 block font-display text-[1.2rem] font-semibold text-tertiary group-hover:text-secondary">
                        {other.title} →
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
      <CTA />
    </>
  );
}
