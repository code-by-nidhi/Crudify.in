"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registering here (module scope) means it happens exactly once per bundle,
// no matter how many components import it.
gsap.registerPlugin(ScrollTrigger, useGSAP);

gsap.defaults({ ease: "power3.out", duration: 1 });

/** True when the visitor has asked the OS to tone motion down. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, useGSAP };
