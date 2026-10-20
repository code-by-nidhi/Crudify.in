"use client";

import Image from "next/image";
import Link from "next/link";
import { CourseIcon } from "../Icons";
import KeywordText from "./KeywordText";
import { POSTS } from "@/content/blog";
import { BLOG_HREF } from "./homeContent";
import { SliderArrows, SliderDots, useAutoSlider } from "./useAutoSlider";

/** "Growth Tips & Guides" — the blog articles as an auto-advancing card
 *  slider, each card linking to its article. */
export default function HomeBlogs() {
  const { track, active, pages, goTo, pauseProps } = useAutoSlider(POSTS.length);

  return (
    <section
      id="blog"
      className="bg-pattern-web relative px-[4vw] py-24 sm:py-32 border-t border-secondary/20"
      {...pauseProps}
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Blog</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
              Growth Tips <span className="text-accent">&amp; Guides</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <Link href={BLOG_HREF} className="btn btn-ghost hidden sm:inline-flex">
              Read all articles →
            </Link>
            <SliderArrows active={active} pages={pages} goTo={goTo} label="article" />
          </div>
        </div>

        <div
          ref={track}
          role="region"
          aria-roledescription="carousel"
          aria-label="Growth tips and guides"
          // Lenis would otherwise swallow horizontal trackpad gestures here.
          data-lenis-prevent
          className="-mx-2 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 pb-6 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {POSTS.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              aria-roledescription="slide"
              className="panel group flex w-[85%] shrink-0 snap-start flex-col transition-transform duration-500 hover:-translate-y-1 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              {/* cover */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 85vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-secondary backdrop-blur">
                  <CourseIcon name={post.icon} className="h-3.5 w-3.5" />
                  {post.category}
                </span>
                <span className="absolute bottom-3 right-4 font-display text-[2rem] font-bold leading-none tracking-[-0.05em] text-primary/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* body */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="flex-1 font-display text-[1.15rem] font-semibold leading-snug tracking-[-0.02em] text-tertiary transition-colors group-hover:text-secondary">
                  <KeywordText text={post.title} />
                </h3>
                <div className="mt-6 flex items-center justify-between border-t border-tertiary/10 pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-tertiary/50">
                    Read article
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

        <SliderDots active={active} pages={pages} goTo={goTo} label="article" />
      </div>
    </section>
  );
}
