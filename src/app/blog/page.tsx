import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import EnquireButton from "@/components/blog/EnquireButton";
import JsonLd from "@/components/blog/JsonLd";
import { CourseIcon } from "@/components/Icons";
import { BLOG_AUTHOR, POSTS, formatDate, readingTime } from "@/content/blog";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const TITLE = "Growth Tips & Guides";
const DESCRIPTION =
  "Practical guides on Google Maps ranking, Meta Ads budgets, websites, Shopify and AI agents for small businesses in India and beyond — from the CRUDIFY team.";

export const metadata: Metadata = {
  title: `Blog — ${TITLE}`,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: `${TITLE} | ${SITE_NAME} Blog`,
    description: DESCRIPTION,
    images: [{ url: POSTS[0].image, alt: POSTS[0].imageAlt }],
  },
};

export default function BlogIndexPage() {
  const [featured, ...rest] = POSTS;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${absoluteUrl("/blog")}#blog`,
        name: `${SITE_NAME} Blog — ${TITLE}`,
        description: DESCRIPTION,
        url: absoluteUrl("/blog"),
        inLanguage: "en-IN",
        publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
        blogPost: POSTS.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          url: absoluteUrl(`/blog/${post.slug}`),
          image: absoluteUrl(post.image),
          datePublished: post.publishedAt,
          dateModified: post.updatedAt,
          author: { "@type": "Organization", name: BLOG_AUTHOR },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
        ],
      },
    ],
  };

  return (
    <div className="relative px-[4vw] pb-24 pt-28 sm:pb-32 lg:pt-32">
      <JsonLd data={jsonLd} />

      <div className="mx-auto max-w-[1240px]">
        {/* header */}
        <header className="flex flex-col gap-6 border-b border-tertiary/12 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{SITE_NAME} Blog</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[1] tracking-[-0.045em] text-tertiary">
              Growth Tips <span className="text-accent">&amp; Guides</span>
            </h1>
          </div>
          <p className="max-w-[44ch] text-[1.05rem] leading-relaxed text-tertiary/70">
            Straight answers on marketing, websites, AI and security — written for
            business owners, not marketers.
          </p>
        </header>

        {/* featured */}
        <Link
          href={`/blog/${featured.slug}`}
          className="panel group mt-12 grid overflow-hidden md:grid-cols-[1.15fr_1fr]"
        >
          <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[380px]">
            <Image
              src={featured.image}
              alt={featured.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 640px, 92vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute left-5 top-5 rounded-full bg-primary/90 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-secondary backdrop-blur">
              Featured
            </span>
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
              <CourseIcon name={featured.icon} className="h-3.5 w-3.5" />
              {featured.category}
            </p>
            <h2 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-tertiary transition-colors group-hover:text-secondary">
              {featured.title}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-tertiary/70">{featured.description}</p>
            <p className="mt-6 text-[13px] text-tertiary/55">
              {formatDate(featured.updatedAt)} · {readingTime(featured).minutes} min read
            </p>
          </div>
        </Link>

        {/* the rest */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="panel group flex flex-col">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(min-width: 640px) 600px, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-secondary backdrop-blur">
                  <CourseIcon name={post.icon} className="h-3.5 w-3.5" />
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h2 className="flex-1 font-display text-[1.3rem] font-semibold leading-snug tracking-[-0.02em] text-tertiary transition-colors group-hover:text-secondary">
                  {post.title}
                </h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-tertiary/65">{post.description}</p>
                <div className="mt-6 flex items-center justify-between border-t border-tertiary/10 pt-4 text-[13px] text-tertiary/55">
                  <span>
                    {formatDate(post.updatedAt)} · {readingTime(post).minutes} min read
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 place-items-center rounded-full border border-secondary/25 text-secondary transition-all duration-500 group-hover:rotate-[-45deg] group-hover:border-secondary group-hover:bg-secondary group-hover:text-primary"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <section className="panel panel-accent mt-16 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-bold tracking-[-0.03em] text-primary">
              Rather have us do it for you?
            </h2>
            <p className="mt-2 text-[15px] text-primary/85">
              Get a free growth plan for your business — no obligation.
            </p>
          </div>
          <EnquireButton>Get a free growth plan</EnquireButton>
        </section>
      </div>
    </div>
  );
}
