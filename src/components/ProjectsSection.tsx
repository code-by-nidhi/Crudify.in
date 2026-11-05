"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CourseIcon } from "./Icons";
import AnimatedText from "./AnimatedText";
import FloatingTechIcons from "./FloatingTechIcons";
import { PROJECTS, projectHref } from "./projects/projectsData";

const PROJECTS_FLOATING_ICONS = [
  { type: "course" as const, name: "code" as const, label: "Liquid Glass", className: "top-12 left-10 animate-float-slow hidden md:flex" },
  { type: "course" as const, name: "shield" as const, label: "Sticky Stacking", className: "bottom-20 right-10 animate-float-reverse hidden md:flex" },
];

/** `headingAs="h1"` when the section is the page itself (/projects). */
export default function ProjectsSection({ headingAs: Heading = "h2" }: { headingAs?: "h1" | "h2" }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-project-card]");
      const title = root.current?.querySelector<HTMLElement>("[data-projects-title]") ?? null;
      const intro = root.current?.querySelector("[data-projects-intro]") ?? null;
      const eyebrow = root.current?.querySelector("[data-projects-eyebrow]") ?? null;

      // The stack itself is plain CSS sticky, so it works either way. Only the
      // growth is animated — under reduced motion the heading simply stays at
      // section-heading size and dims, which is a coherent end state. The intro
      // line still has to go: it sits below the headline, so once a card covers
      // the middle of the screen it would be stranded under the stack.
      if (prefersReducedMotion()) {
        gsap.set(title, { autoAlpha: 0.45 });
        gsap.set([intro, eyebrow], { autoAlpha: 0 });
        return;
      }

      if (title && cards.length > 0) {
        /* How far the heading has to grow to span the viewport. Measured rather
           than hard-coded: a fixed multiplier that fills 1440px would blow a
           phone's heading way past its screen, and a multiplier safe on a phone
           leaves a 1920 screen barely covered. Height is capped too, so a wide
           but short window doesn't push the type off the top and bottom.
           offset* are layout values, unaffected by the scale being applied. */
        const fillScale = () =>
          Math.min(
            (window.innerWidth * 0.94) / Math.max(title.offsetWidth, 1),
            (window.innerHeight * 0.72) / Math.max(title.offsetHeight, 1),
          );

        gsap.fromTo(
          title,
          { scale: 1, autoAlpha: 1 },
          {
            scale: fillScale,
            autoAlpha: 0.38,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=560",
              scrub: true,
              // Recompute fillScale when the viewport changes size.
              invalidateOnRefresh: true,
            },
          },
        );

        // Supporting copy belongs to the small state only — at 4x it would be
        // illegible furniture behind the cards.
        gsap.to([eyebrow, intro], {
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=280",
            scrub: true,
          },
        });
      }

      // Cards already under the stack settle back a step. No brightness filter:
      // dimming a warm cream card just turns it grey, and the exposed top edge
      // of the pile read as a dead slab. Scale and the shadow carry the depth.
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.94 - index * 0.02,
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: cards[index + 1],
              start: "top 70%",
              end: "top 20%",
              scrub: true,
            },
          });
        }
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="our-projects"
      /* overflow-CLIP, never overflow-hidden: hidden would make this section a
         scroll container, which silently turns every `sticky` below into
         `static`. Clip crops the floating icons just the same but leaves the
         viewport as the sticky scrollport. */
      className="relative px-[4vw] pb-28 pt-20 bg-secondary/12 text-tertiary border-t border-secondary/20 overflow-clip"
    >
      {/* Background Animated Ambient Icons */}
      <FloatingTechIcons items={PROJECTS_FLOATING_ICONS} />

      <div className="mx-auto max-w-[1240px] relative">
        {/* The heading is the section's backdrop: pinned for the whole section
            at full height, with the card stack riding up over it. */}
        <div
          data-projects-header
          className="pointer-events-none sticky top-0 z-0 flex h-screen flex-col items-center justify-center text-center"
        >
          <div
            data-projects-eyebrow
            className="flex items-center justify-center gap-2 mb-4"
          >
            <span className="grid h-6 w-6 place-items-center rounded-lg bg-secondary/20 text-secondary animate-pulse">
              <CourseIcon name="cube" className="h-3.5 w-3.5" />
            </span>
            <div className="eyebrow !text-secondary font-extrabold">Showcase Vault</div>
          </div>
          {/* Sized like every other section heading on the site. The scroll
              tween below is what inflates it into the backdrop, so this is also
              the no-JS and reduced-motion appearance. inline-block matters:
              offsetWidth then hugs the longest line, which is what the growth
              factor is measured against. */}
          <Heading
            data-projects-title
            className="inline-block font-display text-[clamp(2rem,4.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary will-change-transform"
          >
            <AnimatedText text="Our Featured" onScroll />
            <br />
            <AnimatedText
              text="Projects"
              className="text-contrast"
              onScroll
            />
          </Heading>
          <p
            data-projects-intro
            className="mt-7 max-w-[46ch] text-base text-tertiary/70 font-medium"
          >
            Real client work — the websites and apps we built, and the results they earn.
          </p>
        </div>

        {/* Liquid Glass Pinned Cards Stack Container.
            -mt-*        first card climbs while the heading is still full-bleed,
                         so the two overlap instead of reading as two screens.
            space-y-*    is the scroll runway BETWEEN pins — a sticky card is
                         only on screen alone for as long as the next one takes
                         to arrive, and 48px gave each barely a blink. */}
        <div className="relative z-10 -mt-[22vh] space-y-10 sm:-mt-[38vh] sm:space-y-[30vh]">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              data-project-card
              /* Stacking starts at `sm`. A stack only works when a card is
                 shorter than the viewport, and once this card collapses to one
                 column it is ~750px — taller than a 780px phone can show with a
                 pin offset on top, so the bottom edge and CTA got clipped. Below
                 `sm` the cards simply flow; the heading still sits behind them. */
              className="sm:sticky z-10 mx-auto max-w-[1040px] rounded-[32px] p-8 sm:p-12 border border-secondary/40 bg-surface/97 shadow-[0_25px_55px_-18px_var(--shadow-warm-strong)] transition-[border-color,box-shadow] duration-300 group overflow-hidden"
              style={{
                top: `calc(14vh + ${idx * 16}px)`,
              }}
            >
              {/* Liquid Specular Sheen Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 items-center">
                {/* Left Info Column */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-mono text-3xl font-extrabold text-secondary/60">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-secondary/15 border border-secondary/30 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-secondary">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-tertiary group-hover:text-secondary transition-colors">
                    <Link href={projectHref(project.id)}>{project.title}</Link>
                  </h3>

                  <p className="mt-4 text-sm sm:text-base text-tertiary/75 leading-relaxed font-medium">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-xl bg-surface/70 border border-tertiary/12 px-3 py-1 text-xs font-semibold text-tertiary/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Interactive Telemetry Glass Box */}
                <div className="panel p-6 bg-surface/70 border border-secondary/30 rounded-2xl shadow-xl flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between border-b border-tertiary/12 pb-3 mb-4">
                    <span className="text-xs font-mono font-extrabold uppercase text-secondary flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                      {project.url ? "Live Website" : "Confidential Client"}
                    </span>
                    <span className="p-2 rounded-xl bg-secondary/20 text-secondary">
                      <CourseIcon name={project.icon} className="h-4 w-4" />
                    </span>
                  </div>

                  <Link
                    href={projectHref(project.id)}
                    aria-label={`${project.title} case study`}
                    className="relative block aspect-[16/10] overflow-hidden rounded-xl border border-tertiary/12"
                  >
                    <Image
                      src={project.image.src}
                      alt={project.image.alt}
                      fill
                      sizes="(min-width: 1024px) 380px, 85vw"
                      className="object-cover object-top"
                    />
                  </Link>

                  {/* Compact metric row: with the screenshot above, a stacked
                      list would make the card taller than the viewport and it
                      could no longer pin. */}
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-xl bg-surface/70 border border-tertiary/12 p-2.5 text-center"
                      >
                        <div className="font-mono text-sm font-extrabold text-secondary">{m.value}</div>
                        <div className="mt-0.5 text-[10px] font-semibold leading-tight text-tertiary/70">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {project.proofs && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {project.proofs.map((proof) => (
                        <a
                          key={proof.src}
                          href={proof.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block overflow-hidden rounded-xl border border-tertiary/12 bg-white"
                        >
                          <span className="relative block h-14">
                            <Image
                              src={proof.src}
                              alt={proof.alt}
                              fill
                              sizes="180px"
                              className="object-cover object-left-top"
                            />
                          </span>
                          <span className="block bg-surface/90 px-2 py-1 text-[10px] font-semibold text-tertiary/70">
                            {proof.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}

                  <Link
                    href={projectHref(project.id)}
                    className="btn btn-primary mt-4 w-full !bg-secondary !text-primary font-extrabold text-xs shadow-lg hover:!bg-secondary/90"
                  >
                    View Case Study →
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Runway that holds the finished stack on screen. This has to be a
              real child, not padding on the parent: a sticky element is bounded
              by its containing block's CONTENT box, so padding-bottom extends
              nothing and the whole stack unpinned the moment the last card
              landed. An empty box does extend it. */}
          <div aria-hidden="true" className="hidden sm:block sm:h-[45vh]" />
        </div>
      </div>
    </section>
  );
}
