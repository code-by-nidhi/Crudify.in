"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const TELEMETRY_ITEMS = [
  "📣 Meta Ads Management",
  "🔎 Google Ads Management",
  "🤖 AI Chatbots & CRM Dashboards",
  "✍️ AI Content Creation",
  "📈 AI-Assisted SEO",
  "🎬 Video & YouTube Editing",
  "💻 Website & E-commerce Development",
  "🛡️ Cybersecurity & Resilience Shield",
  "📍 Ludhiana · Mohali · Amritsar · Jalandhar",
  "📍 Patiala · Bathinda · Phagwara",
];

export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const tl = gsap.to(track.current, {
        xPercent: -50,
        duration: 30,
        ease: "none",
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const boost = gsap.utils.clamp(
            1,
            6,
            1 + Math.abs(self.getVelocity()) / 500,
          );
          tl.timeScale(boost * self.direction);
          gsap.to(tl, {
            timeScale: self.direction,
            duration: 1.2,
            ease: "power2.out",
            overwrite: true,
          });
        },
      });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      id="brand-bar"
      /* Inverts against the cotton ground — the one full-bleed cherry band */
      className="relative overflow-hidden bg-secondary py-5 text-primary border-y border-tertiary/25 shadow-sm"
    >
      <div ref={track} className="flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-12 pr-12" aria-hidden={copy === 1}>
            {TELEMETRY_ITEMS.map((item) => (
              <span
                key={item}
                className="flex shrink-0 items-center gap-3 font-display text-[14px] font-extrabold uppercase tracking-wider text-primary"
              >
                <span className="h-2 w-2 rounded-full bg-primary shadow-sm" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
