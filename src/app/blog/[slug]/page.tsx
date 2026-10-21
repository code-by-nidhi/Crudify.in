import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import EnquireButton from "@/components/blog/EnquireButton";
import JsonLd from "@/components/blog/JsonLd";
import RichText from "@/components/blog/RichText";
import { CourseIcon } from "@/components/Icons";
import {
  BLOG_AUTHOR,
  POSTS,
  formatDate,
  getPost,
  readingTime,
  type Block,
} from "@/content/blog";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `/blog/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: BLOG_AUTHOR }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      section: post.category,
      tags: post.keywords,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[1.05rem] leading-[1.8] text-tertiary/80">
          <RichText text={block.text} />
        </p>
      );
    case "ul":
    case "ol": {
      const List = block.type;
      return (
        <List className="flex flex-col gap-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5 text-[1.02rem] leading-[1.7] text-tertiary/80">
              <span
                aria-hidden="true"
                className="mt-[0.2em] grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary/10 font-mono text-[11px] font-bold text-secondary"
              >
                {block.type === "ol" ? i + 1 : "•"}
              </span>
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </List>
      );
    }
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-secondary/20 bg-surface">
          <table className="w-full min-w-[560px] border-collapse text-left text-[14.5px]">
            <caption className="border-b border-secondary/15 px-5 py-3 text-left text-[11px] font-bold uppercase tracking-[0.16em] text-secondary">
              {block.caption}
            </caption>
            <thead>
              <tr className="bg-secondary/[0.06]">
                {block.head.map((h, i) => (
                  <th key={i} scope="col" className="px-5 py-3 font-display font-semibold text-tertiary">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-tertiary/10">
                  {row.map((cell, c) =>
                    c === 0 ? (
                      <th key={c} scope="row" className="px-5 py-3 align-top font-semibold text-tertiary">
                        {cell}
                      </th>
                    ) : (
                      <td key={c} className="px-5 py-3 align-top leading-relaxed text-tertiary/75">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <aside className="rounded-2xl border-l-4 border-secondary bg-secondary/[0.07] px-6 py-5">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-secondary">
            {block.title}
          </p>
          <p className="mt-2 text-[1rem] leading-[1.7] text-tertiary/80">
            <RichText text={block.text} />
          </p>
        </aside>
      );
  }
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { words, minutes } = readingTime(post);
  const url = absoluteUrl(`/blog/${post.slug}`);
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        image: absoluteUrl(post.image),
        datePublished: post.publishedAt,
        dateModified: post.updatedAt,
        inLanguage: "en-IN",
        articleSection: post.category,
        keywords: post.keywords.join(", "),
        wordCount: words,
        timeRequired: `PT${minutes}M`,
        mainEntityOfPage: url,
        author: { "@type": "Organization", name: BLOG_AUTHOR, url: absoluteUrl("/about") },
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: absoluteUrl("/"),
          logo: { "@type": "ImageObject", url: absoluteUrl("/logo/crudy-logo-only.png") },
        },
        abstract: post.quickAnswer,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <article className="relative px-[4vw] pb-24 pt-28 sm:pb-32 lg:pt-32">
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-[1180px]">
        {/* breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[13px] text-tertiary/60">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-secondary">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-secondary">Blog</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="line-clamp-1 text-tertiary/85">
              {post.category}
            </li>
          </ol>
        </nav>

        {/* header */}
        <header className="mt-8 max-w-[860px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/[0.06] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
            <CourseIcon name={post.icon} className="h-3.5 w-3.5" />
            {post.category}
          </span>
          <h1 className="mt-6 font-display text-[clamp(2.1rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-tertiary">
            {post.title}
          </h1>
          <p className="mt-5 max-w-[62ch] text-[1.1rem] leading-relaxed text-tertiary/70">
            {post.description}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] text-tertiary/60">
            <span className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-secondary font-display text-[12px] font-bold text-primary">
                C
              </span>
              <span className="font-semibold text-tertiary">{BLOG_AUTHOR}</span>
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.updatedAt}>Updated {formatDate(post.updatedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{minutes} min read</span>
          </div>
        </header>

        {/* cover */}
        <div className="relative mt-10 aspect-[21/9] overflow-hidden rounded-[28px] shadow-[0_28px_60px_-24px_var(--shadow-warm-strong)]">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            priority
            sizes="(min-width: 1240px) 1180px, 92vw"
            className="object-cover"
          />
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
          <div className="min-w-0 max-w-[760px]">
            {/* the direct answer first — what snippets and AI engines quote */}
            <section
              aria-labelledby="quick-answer"
              className="rounded-[24px] border border-secondary/25 bg-surface p-7 shadow-[0_18px_40px_-24px_var(--shadow-warm)] sm:p-8"
            >
              <h2
                id="quick-answer"
                className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-secondary"
              >
                <CourseIcon name="zap" className="h-4 w-4" />
                Quick answer
              </h2>
              <p className="mt-3 text-[1.08rem] font-medium leading-[1.75] text-tertiary/85">
                {post.quickAnswer}
              </p>
            </section>

            <section aria-labelledby="key-takeaways" className="mt-8">
              <h2 id="key-takeaways" className="font-display text-[1.35rem] font-semibold tracking-[-0.02em] text-tertiary">
                Key takeaways
              </h2>
              <ul className="mt-4 flex flex-col gap-3">
                {post.takeaways.map((item) => (
                  <li key={item} className="flex gap-3 text-[1rem] leading-relaxed text-tertiary/80">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                      <CourseIcon name="check" className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {post.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id} className="mt-14">
                <h2
                  id={section.id}
                  className="scroll-mt-28 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-tertiary"
                >
                  {section.heading}
                </h2>
                <div className="mt-5 flex flex-col gap-5">
                  {section.blocks.map((block, i) => (
                    <BlockView key={i} block={block} />
                  ))}
                </div>
              </section>
            ))}

            {/* FAQ */}
            <section aria-labelledby="faq" className="mt-16">
              <h2
                id="faq"
                className="scroll-mt-28 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.03em] text-tertiary"
              >
                Frequently asked questions
              </h2>
              <div className="mt-6 flex flex-col gap-3">
                {post.faqs.map((faq) => (
                  <details key={faq.q} className="group panel-light px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-[1.05rem] font-semibold text-tertiary">
                      <h3>{faq.q}</h3>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-secondary/30 text-secondary transition-transform duration-300 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-[1rem] leading-[1.75] text-tertiary/75">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="panel panel-accent mt-16 p-8 sm:p-10">
              <p className="eyebrow">Need a hand?</p>
              <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.1rem)] font-bold leading-tight tracking-[-0.03em] text-primary">
                Let {SITE_NAME} do this for your business.
              </h2>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-primary/85">
                Get a free growth plan with a clear recommendation and transparent pricing.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <EnquireButton>Get a free growth plan</EnquireButton>
                <Link href={post.service.href} className="btn btn-ghost">
                  Explore {post.service.label}
                </Link>
              </div>
            </section>
          </div>

          {/* sidebar: table of contents */}
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28 rounded-[22px] border border-secondary/15 bg-surface/70 p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">On this page</p>
              <ol className="mt-4 flex flex-col gap-2.5 text-[13.5px] leading-snug">
                {post.sections.map((section, i) => (
                  <li key={section.id} className="flex gap-2.5">
                    <span className="font-mono text-[11px] text-tertiary/40">{String(i + 1).padStart(2, "0")}</span>
                    <a href={`#${section.id}`} className="text-tertiary/70 transition-colors hover:text-secondary">
                      {section.heading}
                    </a>
                  </li>
                ))}
                <li className="flex gap-2.5">
                  <span className="font-mono text-[11px] text-tertiary/40">FAQ</span>
                  <a href="#faq" className="text-tertiary/70 transition-colors hover:text-secondary">
                    Questions
                  </a>
                </li>
              </ol>
            </nav>
          </aside>
        </div>

        {/* related */}
        <section aria-labelledby="related" className="mt-24 border-t border-secondary/20 pt-14">
          <h2 id="related" className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-tertiary">
            Keep reading
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="panel group flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 92vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary">{p.category}</p>
                  <h3 className="mt-2 font-display text-[1.1rem] font-semibold leading-snug tracking-[-0.02em] text-tertiary transition-colors group-hover:text-secondary">
                    {p.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
