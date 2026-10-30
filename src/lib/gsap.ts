"use client";

import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registering here (module scope) means it happens exactly once per bundle,
// no matter how many components import it.
gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, Draggable, useGSAP);

gsap.defaults({ ease: "power3.out", duration: 1 });

/** True when the visitor has asked the OS to tone motion down. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Glyphs the scramble effect cycles through, after the Orvix template. */
export const SCRAMBLE_CHARS = "+?84564XERS";

/** How long the homepage preloader covers the page before it wipes away. */
export const PRELOAD_SECONDS = 3;

/**
 * Seconds an intro animation should wait so it plays as the preloader lifts,
 * not underneath it. The head script in app/layout.tsx sets data-preload
 * before paint, and the Preloader clears it when it is done, so this is only
 * non-zero on the first homepage view of a visit.
 */
export const introDelay = () =>
  typeof document !== "undefined" &&
  document.documentElement.dataset.preload === "on"
    ? PRELOAD_SECONDS
    : 0;

export { gsap, ScrollTrigger, Draggable, useGSAP };
