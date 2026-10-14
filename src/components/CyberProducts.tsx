"use client";

import Link from "next/link";
import { useRef } from "react";
import { CourseIcon, type IconName } from "./Icons";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const INCLUDED: { icon: IconName; title: string }[] = [
  { icon: "cyber", title: "Website and server security audits" },
  { icon: "shield", title: "Malware detection and removal" },
  { icon: "refresh", title: "Data backup and disaster recovery planning" },
  { icon: "lock", title: "Customer data protection compliance guidance" },
  { icon: "activity", title: "24/7 monitoring for suspicious activity" },
];

export default function CyberProducts() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-cyber-card]", {
        y: 35,
        autoAlpha: 0,
        duration: 0.9,
        stagger: 0.08,
        clearProps: "all",
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="cyber-shield"
      className="relative px-[4vw] py-24 bg-secondary/8 text-tertiary border-t border-tertiary/12"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-tertiary/18">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-lg bg-secondary/20 text-secondary animate-pulse">
                <CourseIcon name="shield" className="h-3.5 w-3.5" />
              </span>
              <div className="eyebrow !text-secondary font-extrabold">Human-Managed Security</div>
            </div>
            <h2 className="mt-2 max-w-[24ch] font-display text-[clamp(2rem,4.2vw,3.3rem)] font-extrabold leading-[1.08] tracking-tight text-tertiary">
              Cybersecurity &amp; Resilience Shield —{" "}
              <span className="text-secondary">
                Because Growth Means Nothing If You&apos;re Not Protected
              </span>
            </h2>
            <p className="mt-4 max-w-2xl text-base text-tertiary/70 font-medium">
              As Punjab businesses move online — running ads, storing customer
              data, managing e-commerce stores — they become targets. Our{" "}
              <strong className="text-tertiary">Cybersecurity &amp; Resilience Shield</strong>{" "}
              is a human-managed service built to protect what your marketing
              helps you build.
            </p>
          </div>
          <Link
            href="/services/cyber-security"
            className="btn btn-primary !bg-tertiary !text-primary hover:!bg-tertiary/90 text-xs font-bold shrink-0 self-start md:self-auto shadow-xl"
          >
            Secure My Business →
          </Link>
        </div>

        <p className="mt-10 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
          What&apos;s included
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {INCLUDED.map((item) => (
            <div
              key={item.title}
              data-cyber-card
              className="panel-light p-6 bg-surface border border-tertiary/12 hover:border-secondary/60 hover:shadow-xl transition-all rounded-3xl flex flex-col"
            >
              <span className="self-start p-2.5 rounded-xl bg-secondary/10 text-secondary">
                <CourseIcon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-[15px] font-extrabold leading-snug text-tertiary">
                {item.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Trust line */}
        <div className="mt-10 p-6 rounded-2xl bg-surface border border-tertiary/12 shadow-md flex flex-wrap items-center gap-4">
          <span className="p-2.5 rounded-xl bg-secondary text-primary shadow-md">
            <CourseIcon name="check" className="h-5 w-5" />
          </span>
          <p className="font-display text-sm sm:text-base font-extrabold text-tertiary">
            Every website and e-commerce store we build comes with an optional
            Resilience Shield add-on.
          </p>
        </div>
      </div>
    </section>
  );
}
