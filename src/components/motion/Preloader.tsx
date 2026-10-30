"use client";

import { useRef } from "react";
import { gsap, useGSAP, PRELOAD_SECONDS, SCRAMBLE_CHARS } from "@/lib/gsap";
import { BRAND } from "../home/homeContent";

const STORAGE_KEY = "crudify-preloaded";

/**
 * The Orvix-style intro: a cherry sheet over the homepage while a counter runs
 * to 100 and the wordmark scrambles in, then the sheet wipes up off the hero.
 *
 * Whether it shows is decided before paint by the head script in
 * app/layout.tsx (first homepage view of a visit, motion allowed), which sets
 * html[data-preload="on"]. Without that flag the sheet is display:none, so
 * return visits never see a flash of it.
 */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      if (html.dataset.preload !== "on") return;

      const count = root.current?.querySelector<HTMLElement>("[data-pre-count]");
      const counter = { value: 0 };

      const finish = () => {
        delete html.dataset.preload;
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {}
        window.__lenis?.start();
      };

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(counter, {
        value: 100,
        duration: PRELOAD_SECONDS - 1,
        ease: "expo.inOut",
        onUpdate: () => {
          if (count) count.textContent = String(Math.round(counter.value));
        },
      })
        .from("[data-pre-word]", { yPercent: 110, duration: 1, ease: "power3.out" }, 0.25)
        .to(
          "[data-pre-word]",
          {
            duration: 1.6,
            scrambleText: { text: "{original}", chars: SCRAMBLE_CHARS, speed: 0.7 },
          },
          0.45,
        )
        .from("[data-pre-line]", { scaleX: 0, duration: PRELOAD_SECONDS - 1, ease: "expo.inOut" }, 0)
        .to(root.current, { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, PRELOAD_SECONDS - 0.9)
        .add(finish, PRELOAD_SECONDS - 0.4)
        .set(root.current, { display: "none" });

      return () => {
        tl.kill();
        finish();
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="preloader fixed inset-0 z-[200] flex-col justify-between overflow-hidden bg-secondary px-[4vw] pb-[4vw] pt-8 text-primary"
    >
      <div className="flex items-start justify-between">
        <span className="plus-mark !text-primary">+</span>
        <span className="plus-mark !text-primary">+</span>
      </div>

      <div>
        <div className="overflow-hidden">
          <p
            data-pre-word
            className="font-display text-[22vw] font-extrabold leading-[0.82] tracking-[-0.06em]"
          >
            {BRAND}
          </p>
        </div>
        <div className="mt-6 flex items-end justify-between gap-6">
          <span data-pre-line className="mb-3 h-px flex-1 origin-left bg-primary/50" />
          <span
            data-pre-count
            className="font-display text-[clamp(3rem,9vw,8rem)] font-bold leading-none tracking-[-0.05em] tabular-nums"
          >
            0
          </span>
        </div>
      </div>
    </div>
  );
}
