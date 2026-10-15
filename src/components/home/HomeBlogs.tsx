import Link from "next/link";
import { CourseIcon } from "../Icons";
import KeywordText from "./KeywordText";
import { BLOG_HREF, BLOG_TOPICS } from "./homeContent";

/** "Growth Tips & Guides" — the starter topics. There is no blog route yet,
 *  so the cards are not links and "Read all articles" waits for BLOG_HREF. */
export default function HomeBlogs() {
  return (
    <section
      id="blog"
      className="bg-pattern-web relative px-[4vw] py-24 sm:py-32 border-t border-secondary/20"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Blog</p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
              Growth Tips <span className="text-accent">&amp; Guides</span>
            </h2>
          </div>
          {BLOG_HREF && (
            <Link href={BLOG_HREF} className="btn btn-ghost self-start md:self-auto">
              Read all articles →
            </Link>
          )}
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_TOPICS.map((topic, i) => (
            <li key={topic.title}>
              <article className="panel group flex h-full flex-col p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="icon-glow-badge h-11 w-11 shrink-0">
                    <CourseIcon name={topic.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 flex-1 font-display text-[1.1rem] font-semibold leading-snug tracking-[-0.02em] text-tertiary">
                  <KeywordText text={topic.title} />
                </h3>
                {!BLOG_HREF && (
                  <span className="mt-5 text-[11px] font-bold uppercase tracking-[0.16em] text-tertiary/50">
                    Coming soon
                  </span>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
