"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

// Lenis ships its own `window.__lenis` declaration, so park the instance under
// a distinct key rather than clashing with it.
declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Drives Lenis off GSAP's ticker so smooth scrolling and every ScrollTrigger
 * stay on the exact same frame — mixing two RAF loops is what causes pinned
 * sections to jitter.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}

/** Jump back to the top of whichever route is on screen. */
export function scrollToTop() {
  if (window.__lenis) {
    window.__lenis.scrollTo(0, { duration: 1.4 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/** Anchor navigation that respects the smooth-scroll instance when present. */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset: -90, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
