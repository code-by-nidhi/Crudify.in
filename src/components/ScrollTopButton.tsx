"use client";

import { useEffect, useState } from "react";
import { scrollToTop } from "./SmoothScroll";

/** How far down the page, in viewport heights, before the button shows. */
const SHOW_AFTER = 0.8;

/**
 * Back-to-top button styled as a comic panel: inked border, hard offset
 * shadow, halftone dots and an "UP!" speech bubble on hover. Colours come
 * straight from the theme tokens, so it reads as part of the same site.
 */
export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * SHOW_AFTER);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      data-visible={visible}
      // off-screen until scrolled: keep it out of the tab order till then
      inert={!visible}
      className="comic-top"
    >
      <span aria-hidden="true" className="comic-top__bubble">
        UP!
      </span>
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="comic-top__arrow"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5" />
        <path d="m5.5 11.5 6.5-6.5 6.5 6.5" />
      </svg>
    </button>
  );
}
