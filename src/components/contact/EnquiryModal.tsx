"use client";

import { useEffect, useRef } from "react";
import ContactForm from "./ContactForm";

const OPEN_EVENT = "crudify:enquire";
/** Long enough for the hero to land before the popup covers it. */
const AUTO_OPEN_DELAY_MS = 1800;

/** Opens the enquiry popup from anywhere — the navbar, a button, etc. */
export function openEnquiry() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/**
 * The "Contact us" popup. Opens by itself shortly after the site loads, and
 * again whenever `openEnquiry()` is called. The form inside is the same one the CTA section
 * uses, so submissions go to the same Google Sheet.
 *
 * Built on <dialog>: showModal() gives focus trapping, Esc to close and the
 * top layer for free.
 */
export default function EnquiryModal() {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;

    const open = () => {
      if (el.open) return;
      el.showModal();
      // Lenis keeps scrolling the page behind a modal unless told to stop.
      window.__lenis?.stop();
    };

    window.addEventListener(OPEN_EVENT, open);

    // Opens once every time the site is loaded. This component lives in the
    // root layout, which persists across client-side page changes, so moving
    // between pages does not re-trigger it — only a fresh load or refresh.
    const timer = setTimeout(open, AUTO_OPEN_DELAY_MS);

    return () => {
      window.removeEventListener(OPEN_EVENT, open);
      clearTimeout(timer);
    };
  }, []);

  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      aria-labelledby="enquiry-title"
      onClose={() => window.__lenis?.start()}
      // A click that lands on the dialog itself (not its content) is the backdrop.
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      className="enquiry-dialog m-auto w-[min(920px,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl bg-transparent p-0"
    >
      <div className="panel panel-accent relative grid gap-8 rounded-3xl p-6 sm:p-10 md:grid-cols-[0.9fr_1fr] md:gap-10">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-primary/30 bg-primary/10 text-primary transition-colors hover:bg-primary/20"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </button>

        <div className="pr-8 md:pr-0">
          <p className="eyebrow !text-primary">Free Growth Plan</p>
          <h2
            id="enquiry-title"
            className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-bold leading-[1.08] tracking-[-0.03em] text-primary"
          >
            Let&apos;s talk about your growth.
          </h2>
          <p className="mt-4 max-w-[38ch] text-[14.5px] font-medium leading-relaxed text-primary/90">
            Leave your number and the CRUDIFY team will call you back with a
            clear plan for your business.
          </p>

          <ul className="mt-7 hidden space-y-3 md:block">
            {[
              "A free review of your ads, website and Google Maps profile",
              "A clear recommendation: With AI+, Without AI, or both",
              "Transparent pricing — no hidden costs",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-[13.5px] font-semibold text-primary">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-secondary shadow-md">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="m2.5 6.2 2.2 2.2L9.5 3.6"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </dialog>
  );
}
