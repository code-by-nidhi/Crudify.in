import Image from "next/image";
import Link from "next/link";

import { POSTS, formatDate } from "@/content/blog";

/** Blog guides that point back at this service, so each service page links
 *  out to the posts that explain it. Falls back to the general guides when a
 *  service has none of its own yet. */
export default function ServiceGuides({ href, title }: { href: string; title: string }) {
  const own = POSTS.filter((post) => post.service.href === href);
  const guides = (own.length > 0 ? own : POSTS.filter((post) => post.service.href === "/services")).slice(0, 3);

  if (guides.length === 0) return null;

  return (
    <section aria-labelledby="service-guides" className="relative px-[4vw] py-20 sm:py-24">
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow">Guides</p>
            <h2
              id="service-guides"
              className="mt-4 font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-tertiary"
            >
              Read up before you hire us for {title}.
            </h2>
          </div>
          <Link href="/blog" className="btn btn-ghost text-sm">
            All guides
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="panel group flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-secondary">{post.category}</p>
                <h3 className="mt-2 flex-1 font-display text-[1.1rem] font-semibold leading-snug tracking-[-0.02em] text-tertiary transition-colors group-hover:text-secondary">
                  {post.title}
                </h3>
                <p className="mt-4 text-[13px] text-tertiary/55">
                  <time dateTime={post.updatedAt}>Updated {formatDate(post.updatedAt)}</time>
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 max-w-[62ch] text-[14.5px] leading-relaxed text-tertiary/65">
          Want to know who does the work? Meet the team on our{" "}
          <Link href="/about" className="font-semibold text-secondary underline-offset-4 hover:underline">
            About page
          </Link>
          , compare every option on the{" "}
          <Link href="/services" className="font-semibold text-secondary underline-offset-4 hover:underline">
            services overview
          </Link>
          , or{" "}
          <Link href="/#apply" className="font-semibold text-secondary underline-offset-4 hover:underline">
            ask for a free growth plan
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
