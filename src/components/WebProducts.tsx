"use client";

import { useRef } from "react";
import { CourseIcon } from "./Icons";
import FloatingTechIcons from "./FloatingTechIcons";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/** Written from the visitor's side of the transaction rather than ours: what a
 *  website does for the business paying for it, not what it is built out of.
 *  The stack details live in the services pages for anyone who wants them. */
const WEB_BENEFITS = [
  {
    id: "always-open",
    title: "It sells while you are asleep",
    tag: "Always open",
    desc: "An order form and a checkout do not keep office hours. Enquiries arrive overnight, over the weekend and from places your phone line never reaches — and they are waiting for you in the morning.",
    points: ["Open 24/7", "Any device", "Any time zone"],
    icon: "web",
    featured: true,
  },
  {
    id: "found",
    title: "People find you before they call",
    tag: "Get discovered",
    desc: "Most decisions start with a search. Pages built to be read properly by Google put you in that result instead of the competitor two streets over — and a Business Profile puts you on the map alongside it, at the moment somebody is actually looking for what you sell.",
    points: ["Search-ready", "Maps & local"],
    icon: "globe",
  },
  {
    id: "answers",
    title: "It answers the repeat questions",
    tag: "Less admin",
    desc: "Prices, opening hours, delivery, sizing, returns — the things your team types out again every day, written once where everyone can reach them.",
    points: ["Fewer calls", "Self-serve"],
    icon: "check",
  },
  {
    id: "trust",
    title: "It shows you are worth trusting",
    tag: "Credibility",
    desc: "People look you up before they spend. A site that loads quickly and looks current is often the difference between a shortlist and a closed tab.",
    points: ["First impression", "Proof & reviews"],
    icon: "shield",
  },
  {
    id: "numbers",
    title: "It tells you what is working",
    tag: "Know your numbers",
    desc: "Which page brings the enquiries, which advert spent money for nothing, where people give up halfway. Decisions from evidence rather than instinct.",
    points: ["Traffic insight", "Conversion data"],
    icon: "chart",
  },
];

const WEB_FLOATING_ICONS = [
  { type: "course" as const, name: "globe" as const, label: "Found Online", className: "top-8 right-12 animate-float-slow hidden md:flex" },
  { type: "course" as const, name: "web" as const, label: "Open 24/7", className: "bottom-16 left-6 animate-float-reverse hidden md:flex" },
];

export default function WebProducts() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-web-item]", {
        y: 35,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.1,
        clearProps: "all",
        scrollTrigger: {
          trigger: root.current,
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="web-suite"
      className="relative px-[4vw] py-24 bg-secondary/8 text-tertiary border-t border-tertiary/12 overflow-hidden"
    >
      {/* Background Animated Ambient Icons */}
      <FloatingTechIcons items={WEB_FLOATING_ICONS} />

      <div className="mx-auto max-w-[1240px] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-tertiary/18">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-secondary/20 text-secondary animate-pulse">
                <CourseIcon name="web" className="h-3.5 w-3.5" />
              </span>
              <div className="eyebrow !text-secondary font-extrabold">Product Suite 01</div>
            </div>
            <h2 className="mt-2 font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-extrabold tracking-tight text-tertiary">
              What a website <span className="text-secondary">does for you</span>
            </h2>
            <p className="mt-3 max-w-xl text-base text-tertiary/65 font-medium">
              A site is not a brochure you tick off a list. Built properly it takes
              orders, answers the questions your team keeps answering by hand, and
              tells you where the next pound is best spent.
            </p>
          </div>
          <a
            href="#configurator"
            className="btn btn-primary !bg-tertiary !text-primary hover:!bg-tertiary/90 text-xs font-bold shrink-0 self-start md:self-auto shadow-lg"
          >
            Plan your website →
          </a>
        </div>

        {/* Bento Grid Layout */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Featured Large Bento Box */}
          <div
            data-web-item
            className="group md:col-span-2 panel-light p-8 bg-surface border border-tertiary/12 hover:border-secondary/60 shadow-lg rounded-3xl flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="p-3 rounded-2xl bg-secondary/10 text-secondary border border-secondary/30 shadow-sm transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <CourseIcon name="web" className="h-6 w-6" />
                </span>
                <span className="px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-secondary bg-secondary/15 rounded-full border border-secondary/30">
                  {WEB_BENEFITS[0].tag}
                </span>
              </div>

              <h3 className="mt-6 font-display text-2xl font-extrabold text-tertiary">
                {WEB_BENEFITS[0].title}
              </h3>
              <p className="mt-3 text-base text-tertiary/65 leading-relaxed max-w-xl font-medium">
                {WEB_BENEFITS[0].desc}
              </p>
            </div>

            {/* Plain-language proof chips, not telemetry readouts */}
            <div className="mt-8 pt-6 border-t border-tertiary/12">
              <p className="text-xs font-extrabold uppercase tracking-wider text-secondary mb-3">
                What that means in practice
              </p>
              <div className="grid grid-cols-3 gap-3">
                {WEB_BENEFITS[0].points.map((m) => (
                  <div key={m} className="rounded-xl bg-primary p-3 text-center border border-tertiary/12">
                    <span className="block font-display text-sm font-extrabold text-secondary">{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regular Bento Cards */}
          {WEB_BENEFITS.slice(1).map((item) => (
            <div
              key={item.id}
              data-web-item
              className="panel-light p-6 bg-surface border border-tertiary/12 hover:border-secondary/60 hover:shadow-xl transition-all rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-xl bg-secondary/10 text-secondary">
                    <CourseIcon name={item.icon as any} className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary">
                    {item.tag}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-extrabold text-tertiary">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-tertiary/65 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-tertiary/12 flex flex-wrap gap-2">
                {item.points.map((m) => (
                  <span
                    key={m}
                    className="rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold text-secondary border border-tertiary/12"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
