"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import AnimatedText from "./AnimatedText";

type Quote = {
  name: string;
  role: string;
  initials: string;
  text: string;
  product: string;
};

const ROW_A: Quote[] = [
  {
    name: "Alex Rivera",
    role: "CTO · FinTech Cloud",
    initials: "AR",
    text: "Migrating to the Next.js 16 Web Engine cut our global page load times by 68%. Our Core Web Vitals skyrocketed overnight.",
    product: "Web Suite",
  },
  {
    name: "Samantha Vance",
    role: "VP Engineering · CyberVault",
    initials: "SV",
    text: "The Zero-Trust Cyber Shield blocked over 1.2M automated bot exploits during our high-traffic product drop with zero downtime.",
    product: "Cyber Shield",
  },
  {
    name: "Marcus Thorne",
    role: "Head of Growth · SaaS Metrics",
    initials: "MT",
    text: "The AI Digital Content Studio automated our multi-channel ad copy generation, driving a 340% increase in qualified sales leads.",
    product: "Digital Engine",
  },
  {
    name: "Priya Sharma",
    role: "Lead Architect · Enterprise Web",
    initials: "PS",
    text: "The Gen-Z UI Vault design system tokens reduced our frontend sprint cycles from 3 weeks to just 4 days.",
    product: "Web UI Vault",
  },
];

const ROW_B: Quote[] = [
  {
    name: "David Chen",
    role: "Chief Information Security Officer",
    initials: "DC",
    text: "Automating our SOC 2 Type II audit logs using the Cyber Compliance module saved us 200+ engineering hours during annual review.",
    product: "Cyber Compliance",
  },
  {
    name: "Elena Rostova",
    role: "Director of Product · Global Retail",
    initials: "ER",
    text: "Omnichannel Analytics gave us real-time telemetry across 14 international storefronts with sub-second data synchronization.",
    product: "Digital Analytics",
  },
  {
    name: "Karan Patel",
    role: "Founder · HyperScale Studio",
    initials: "KP",
    text: "Combining Web Next.js SSR with the Cyber WAF Firewall gave us enterprise-grade resilience from day one.",
    product: "Full Stack Suite",
  },
  {
    name: "Jessica Taylor",
    role: "Growth Operations Lead",
    initials: "JT",
    text: "The SEO Growth Bot auto-structured our rich snippets, boosting organic domain search rankings within 14 days.",
    product: "Digital Growth Bot",
  },
];

function QuoteCard({ quote }: { quote: Quote }) {
  return (
    <figure className="panel-light flex w-[min(84vw,400px)] shrink-0 flex-col p-6 sm:p-7 bg-surface border border-tertiary/12 shadow-md rounded-3xl">
      <div className="flex items-center justify-between">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="text-secondary/40"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.6 5.4C6.5 6.8 4.5 9.6 4.5 13.2c0 3.2 1.9 5.4 4.6 5.4 2.3 0 4-1.7 4-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.8.1-1 .2.4-1.7 1.9-3.3 3.7-4.2zm9.9 0c-3.1 1.4-5.1 4.2-5.1 7.8 0 3.2 1.9 5.4 4.6 5.4 2.3 0 4-1.7 4-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.8.1-1 .2.4-1.7 1.9-3.3 3.7-4.2z" />
        </svg>

        <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-secondary bg-secondary/15 rounded-full border border-secondary/20">
          {quote.product}
        </span>
      </div>

      <blockquote className="mt-4 text-[14px] leading-relaxed text-tertiary/80 font-medium">
        &ldquo;{quote.text}&rdquo;
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-tertiary/12 pt-4">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-[12px] font-extrabold text-primary shadow-sm">
          {quote.initials}
        </span>
        <div>
          <p className="text-[14px] font-extrabold text-tertiary">{quote.name}</p>
          <p className="text-[12px] text-tertiary/65 font-medium">{quote.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function Row({ quotes, reverse }: { quotes: Quote[]; reverse?: boolean }) {
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;

    const tl = gsap.fromTo(
      track.current,
      { xPercent: reverse ? -50 : 0 },
      {
        xPercent: reverse ? 0 : -50,
        duration: 44,
        ease: "none",
        repeat: -1,
      },
    );

    const el = track.current;
    const pause = () => gsap.to(tl, { timeScale: 0, duration: 0.4 });
    const play = () => gsap.to(tl, { timeScale: 1, duration: 0.6 });
    el?.addEventListener("pointerenter", pause);
    el?.addEventListener("pointerleave", play);

    return () => {
      el?.removeEventListener("pointerenter", pause);
      el?.removeEventListener("pointerleave", play);
    };
  });

  return (
    <div className="overflow-hidden">
      <div ref={track} className="flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-4 pr-4" aria-hidden={copy === 1}>
            {quotes.map((quote) => (
              <QuoteCard key={quote.name} quote={quote} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const skew = gsap.quickTo("[data-skew]", "skewY", {
        duration: 0.7,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) =>
          skew(gsap.utils.clamp(-3, 3, self.getVelocity() / -400)),
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="proof" className="relative py-24 sm:py-32 bg-secondary/8 text-tertiary border-t border-tertiary/12">
      <div className="mx-auto mb-14 max-w-[1180px] px-[4vw]">
        <p className="eyebrow !text-secondary font-extrabold">Enterprise Proof</p>
        <h2 className="mt-4 max-w-[22ch] font-display text-[clamp(2rem,4.6vw,3.3rem)] font-extrabold leading-[1.06] tracking-[-0.035em] text-tertiary">
          <AnimatedText text="Trusted by engineering &" onScroll />{" "}
          <AnimatedText
            text="growth teams worldwide."
            className="text-secondary"
            onScroll
          />
        </h2>
      </div>

      <div data-skew className="flex flex-col gap-4">
        <Row quotes={ROW_A} />
        <Row quotes={ROW_B} reverse />
      </div>
    </section>
  );
}
