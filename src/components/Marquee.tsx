"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CourseIcon, type IconName } from "./Icons";

/** A plain string, or a label with a line icon drawn in front of it. */
type MarqueeItem = string | { label: string; icon: IconName };

const TELEMETRY_ITEMS: MarqueeItem[] = [
  { label: "Social Media Management", icon: "social" },
  { label: "FB & Insta Ads", icon: "megaphone" },
  { label: "Google & YouTube Ads", icon: "search" },
  { label: "Google Maps Ranking", icon: "pin" },
  { label: "Website Building", icon: "code" },
  { label: "Shopify & Ecommerce Stores", icon: "cart" },
  { label: "Graphic Design", icon: "palette" },
  { label: "Video Editing & Shoots", icon: "video" },
  { label: "AI Agents", icon: "bot" },
  { label: "With AI+ or Without AI", icon: "zap" },
];

export default function Marquee({
  items = TELEMETRY_ITEMS,
  id = "brand-bar",
}: {
  items?: MarqueeItem[];
  id?: string;
} = {}) {
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
      id={id}
      /* The template's oversized ticker type, on the one full-bleed cherry band */
      className="relative overflow-hidden border-y border-tertiary/25 bg-secondary py-6 text-primary"
    >
      <div ref={track} className="flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-10 pr-10" aria-hidden={copy === 1}>
            {items.map((item) => {
              const label = typeof item === "string" ? item : item.label;

              return (
                <span
                  key={label}
                  className="flex shrink-0 items-center gap-10 font-display text-[clamp(1.6rem,3.4vw,3rem)] font-bold leading-none tracking-[-0.04em] text-primary"
                >
                  <span className="flex items-center gap-[0.35em]">
                    {typeof item !== "string" && (
                      <span
                        title={label}
                        className="grid h-[1.25em] w-[1.25em] shrink-0 place-items-center rounded-full border border-primary/35 bg-primary/10"
                      >
                        <CourseIcon name={item.icon} className="h-[0.7em] w-[0.7em]" />
                      </span>
                    )}
                    {label}
                  </span>
                  <span aria-hidden="true" className="font-light text-primary/70">+</span>
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
