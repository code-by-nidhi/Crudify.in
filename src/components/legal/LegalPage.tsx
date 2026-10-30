import Link from "next/link";
import type { LegalDoc } from "@/content/legal";

/** Shared layout for the Terms and Privacy pages: the blog's page header, a
 *  sticky "On this page" index on desktop, and the numbered sections. A block
 *  that is a string renders as a paragraph; an array renders as a list. */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="relative px-[4vw] pb-24 pt-28 sm:pb-32 lg:pt-32">
      <div className="mx-auto max-w-[1240px]">
        <header className="flex flex-col gap-6 border-b border-tertiary/12 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Legal</p>
            <h1 className="mt-4 font-display text-[clamp(2.4rem,6vw,4.4rem)] font-semibold leading-[1] tracking-[-0.045em] text-tertiary">
              {doc.title}
            </h1>
            <p className="mt-4 text-[13px] font-medium text-tertiary/55">
              Last updated {doc.updated}
            </p>
          </div>
          <p className="max-w-[48ch] text-[1.05rem] leading-relaxed text-tertiary/70">
            {doc.intro}
          </p>
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
                On this page
              </p>
              <ol className="mt-4 space-y-2.5 border-l border-tertiary/12 pl-4">
                {doc.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block text-[13.5px] font-medium leading-snug text-tertiary/65 transition-colors hover:text-secondary"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="max-w-[72ch]">
            {doc.sections.map((section, i) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-28 border-b border-tertiary/12 py-9 first:pt-0 last:border-b-0"
              >
                <h2 className="flex items-baseline gap-4 font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold tracking-[-0.025em] text-tertiary">
                  <span className="font-mono text-[13px] font-medium text-secondary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-[1rem] leading-[1.75] text-tertiary/75">
                  {section.blocks.map((block, j) =>
                    typeof block === "string" ? (
                      <p key={j}>{block}</p>
                    ) : (
                      <ul key={j} className="space-y-2.5">
                        {block.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-secondary"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ),
                  )}
                </div>
              </section>
            ))}

            <p className="mt-10 text-[14px] text-tertiary/60">
              See also our{" "}
              <Link
                href={doc.related.href}
                className="font-semibold text-secondary underline-offset-4 hover:underline"
              >
                {doc.related.label}
              </Link>
              .
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
