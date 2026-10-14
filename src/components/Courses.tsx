"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";
import Reveal from "./Reveal";
import { CourseIcon, type IconName } from "./Icons";

type Course = {
  /** Shown as the file name in the card's window bar. */
  slug: string;
  title: string;
  blurb: string;
  duration: string;
  icon: IconName;
  tags: string[];
  featured?: boolean;
  /** Printed in the terminal well on the featured card. */
  modules?: string[];
};

const COURSES: Course[] = [
  {
    slug: "full-stack",
    title: "Full Stack Web Development",
    blurb:
      "React, Next.js, Node and MongoDB, built the way product teams actually build — git, code review, deployment and all.",
    duration: "6 months",
    icon: "code",
    tags: ["React", "Node", "MongoDB", "Live projects"],
    featured: true,
    modules: [
      "React & Next.js",
      "Node",
      "MongoDB",
      "Git & code review",
      "Deployment",
    ],
  },
  {
    slug: "data-ai",
    title: "Data Science & AI",
    blurb:
      "Python, statistics, machine learning and dashboards, ending in a portfolio of real datasets.",
    duration: "8 months",
    icon: "chart",
    tags: ["Python", "ML", "Power BI"],
  },
  {
    slug: "cad-cam-cae",
    title: "CAD / CAM / CAE",
    blurb:
      "AutoCAD, SolidWorks, CATIA and Revit for mechanical, civil and architectural drafting.",
    duration: "4 months",
    icon: "cube",
    tags: ["AutoCAD", "SolidWorks", "Revit"],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    blurb:
      "SEO, performance ads, analytics and content — run on live campaigns with a real budget.",
    duration: "5 months",
    icon: "megaphone",
    tags: ["SEO", "Meta Ads", "Analytics"],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    blurb:
      "Networking fundamentals, ethical hacking and defensive tooling, mapped to industry certifications.",
    duration: "6 months",
    icon: "shield",
    tags: ["Networking", "Ethical hacking"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    blurb:
      "Linux, AWS, Docker, Kubernetes and CI/CD pipelines you build and break yourself.",
    duration: "5 months",
    icon: "cloud",
    tags: ["AWS", "Docker", "CI/CD"],
  },
];

const SUMMARY = [
  `${COURSES.length} tracks`,
  "4–8 months",
  "Live projects",
  "Rebuilt every year",
];

export default function Courses() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-course]");

      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1 });
        return;
      }

      // Cards rise in a soft wave as the grid scrolls past.
      gsap.from(cards, {
        autoAlpha: 0,
        y: 90,
        scale: 0.94,
        duration: 1.15,
        ease: "expo.out",
        stagger: { each: 0.09, from: "start" },
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });

    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="courses"
      className="bg-pattern-configurator relative px-[4vw] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal
              className="flex items-center gap-2 font-mono text-[12px] font-bold uppercase tracking-[0.22em] text-secondary"
              y={16}
            >
              <span className="text-secondary/50">{"//"}</span>
              Learning tracks
            </Reveal>
            <h2 className="mt-4 max-w-[16ch] font-display text-[clamp(2rem,4.6vw,3.3rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-tertiary">
              <AnimatedText text="Tracks built around" onScroll />
              <br />
              <AnimatedText
                text="who is hiring."
                className="text-accent"
                onScroll
              />
            </h2>
          </div>
          <Reveal className="max-w-[38ch] text-[15px] leading-relaxed text-tertiary/60" y={24}>
            Every track is rebuilt each year against live job descriptions from
            our hiring partners — so what you learn on Monday is what a recruiter
            asks about on Friday.
          </Reveal>
        </div>

        {/* status strip */}
        <Reveal y={20}>
          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-tertiary/12 py-3.5 font-mono text-[11.5px] uppercase tracking-[0.14em] text-tertiary/65">
            {SUMMARY.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((course, i) => (
            <article
              key={course.slug}
              data-course
              style={{ visibility: "hidden" }}
              className={`group relative flex flex-col ${
                course.featured
                  ? "panel panel-feature md:col-span-2"
                  : "panel"
              }`}
            >
              {/* window bar */}
              <div className="flex items-center gap-1.5 border-b border-tertiary/10 bg-tertiary/[0.04] px-5 py-3">
                <span className="h-2 w-2 rounded-full bg-secondary/70" />
                <span className="h-2 w-2 rounded-full bg-secondary/40" />
                <span className="h-2 w-2 rounded-full bg-secondary/20" />
                <span className="ml-2 truncate font-mono text-[11px] text-tertiary/55">
                  tracks/{course.slug}
                </span>
                <span className="ml-auto font-mono text-[11px] font-bold text-secondary">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div
                className={`flex flex-1 flex-col p-6 sm:p-7 ${
                  course.featured ? "lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:gap-8" : ""
                }`}
              >
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <span className="icon-glow-badge h-12 w-12">
                      <CourseIcon name={course.icon} />
                    </span>
                    <span className="rounded-md border border-secondary/30 bg-secondary/10 px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-secondary">
                      {course.duration}
                    </span>
                  </div>

                  <h3
                    className={`mt-6 font-display font-semibold tracking-[-0.02em] transition-colors group-hover:text-secondary ${
                      course.featured ? "text-2xl sm:text-[1.7rem]" : "text-xl"
                    }`}
                  >
                    {course.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-tertiary/60">
                    {course.blurb}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-tertiary/12 bg-tertiary/[0.04] px-2 py-1 font-mono text-[11px] text-tertiary/75"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto pt-7">
                    <div className="flex items-center gap-2 border-t border-tertiary/10 pt-5 font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-tertiary/65">
                      <span className="text-secondary">&gt;</span>
                      <span className="transition-colors group-hover:text-secondary">
                        View syllabus
                      </span>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="ml-auto transition-transform duration-300 group-hover:translate-x-1 group-hover:text-secondary"
                      >
                        <path
                          d="M3 8h10m0 0L9 4m4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* terminal well — featured card only */}
                {course.modules && (
                  <div className="mt-7 rounded-2xl border border-tertiary/20 bg-tertiary p-5 font-mono text-[12.5px] leading-relaxed text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] lg:mt-0 lg:self-stretch">
                    <p className="text-primary/60">
                      <span className="text-primary">$</span> track --modules
                    </p>
                    <ol className="mt-3 flex flex-col gap-1.5">
                      {course.modules.map((module, m) => (
                        <li key={module} className="flex gap-3">
                          <span className="text-primary/45">
                            {String(m + 1).padStart(2, "0")}
                          </span>
                          {module}
                        </li>
                      ))}
                    </ol>
                    <p className="mt-3 flex items-center gap-2 text-primary/60">
                      <span className="text-primary">$</span>
                      <span className="inline-block h-3.5 w-[7px] animate-pulse bg-primary/80" />
                    </p>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
