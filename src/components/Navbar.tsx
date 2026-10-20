"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { SERVICE_MENU } from "./services/servicesData";
import { scrollToSection, scrollToTop } from "./SmoothScroll";
import { CourseIcon } from "./Icons";
import { openEnquiry } from "./contact/EnquiryModal";
import Logo from "./Logo";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", menu: SERVICE_MENU },
  { label: "Results", href: "/#results" },
  { label: "Contact Us", href: "/#apply" },
];

/** "/services" stays lit while any of its detail pages is open. */
function isActive(href: string, pathname: string) {
  if (href === "/services") return pathname.startsWith("/services");
  return href === pathname;
}

export default function Navbar() {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  /** Mobile accordion inside the sheet — independent of the desktop menu. */
  const [sheetMenuOpen, setSheetMenuOpen] = useState(false);
  const pathname = usePathname();

  /**
   * Desktop hover/focus dropdown. The route it was opened on is stored with it,
   * so a navigation the menu did not trigger — back button, a link elsewhere on
   * the page — closes it without an effect that re-renders on every route.
   */
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const menuOpen = menu.open && menu.path === pathname;
  const setMenuOpen = (open: boolean) => setMenu({ open, path: pathname });
  /** Which service area the mega menu's right side is showing. */
  const [menuSection, setMenuSection] = useState(0);

  /**
   * The scroll handler below needs the current menu state, but it must not be a
   * GSAP dependency: useGSAP reverts and replays its whole context when one
   * changes, which would re-run the bar's intro tween — the bar visibly flying
   * up — every time the dropdown opened. A ref gives the callback fresh values
   * while the animation setup still runs exactly once.
   */
  const anyMenuOpen = open || menuOpen;
  const anyMenuOpenRef = useRef(anyMenuOpen);

  useEffect(() => {
    anyMenuOpenRef.current = anyMenuOpen;
  }, [anyMenuOpen]);

  useGSAP(
    () => {
      if (!prefersReducedMotion()) {
        gsap.from(bar.current, {
          y: -80,
          autoAlpha: 0,
          duration: 1.0,
          ease: "expo.out",
          delay: 0.1,
        });
      }

      // Reading progress bar animation
      gsap.to(progress.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.2,
        },
      });

      // Smooth scroll direction tracking without DOM layout reflows
      ScrollTrigger.create({
        start: "top -100",
        end: "max",
        onUpdate: (self) => {
          const isScrolled = self.scroll() > 100;
          setScrolled(isScrolled);
          if (prefersReducedMotion()) return;
          // Never slide the bar away while a menu is hanging off it.
          setHidden(
            self.direction === 1 && isScrolled && !anyMenuOpenRef.current,
          );
        },
      });
    },
    { scope: root },
  );

  // Escape closes the dropdown wherever focus happens to be.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu((m) => ({ ...m, open: false }));
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // A route change swaps the whole document, so every ScrollTrigger measurement
  // — the progress bar above included — is stale until it is re-measured. A
  // cross-page hash link ("/#apply" from /about) also has to wait for the new
  // route to paint before it can scroll. Same-page clicks are intercepted below
  // and never touch the hash, so this only runs after a real navigation.
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      const hash = window.location.hash.slice(1);
      if (hash) scrollToSection(hash);
    }, 260);

    return () => clearTimeout(timer);
  }, [pathname]);

  /**
   * Hash links point at the homepage, but sections like #apply exist on more
   * than one route — so scroll in place whenever the target is already here and
   * let <Link> navigate otherwise.
   */
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpen(false);
    setMenuOpen(false);
    setSheetMenuOpen(false);

    const [path, hash] = href.split("#");

    if (!hash) {
      if (path === pathname) {
        e.preventDefault();
        scrollToTop();
      }
      return;
    }

    if (document.getElementById(hash)) {
      e.preventDefault();
      scrollToSection(hash);
    }
  };

  /** Enquire Now opens the contact popup instead of scrolling to the form. */
  const enquire = () => {
    setOpen(false);
    setMenuOpen(false);
    setSheetMenuOpen(false);
    openEnquiry();
  };

  return (
    <header ref={root} className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* progress line */}
      <div className="absolute inset-x-0 top-0 h-[2.5px] bg-tertiary/10">
        <div
          ref={progress}
          className="h-full origin-left scale-x-0 bg-secondary shadow-[0_0_10px_var(--color-secondary)]"
        />
      </div>

      <div
        ref={bar}
        style={{
          transform: hidden ? "translate3d(0, -130%, 0)" : "translate3d(0, 0, 0)",
          willChange: "transform",
        }}
        className={`pointer-events-auto relative mx-auto mt-4 flex w-[min(1240px,94vw)] items-center justify-between gap-3 rounded-full px-5 py-2.5 transition-all duration-300 ease-out bg-primary/95 backdrop-blur-2xl border border-secondary/35 shadow-[0_18px_45px_-15px_var(--shadow-warm)] ${
          scrolled ? "border-secondary/60 shadow-[0_24px_55px_-16px_var(--shadow-warm-strong)] scale-[0.99]" : ""
        }`}
      >
        <Link
          href="/"
          onClick={(e) => go(e, "/")}
          className="flex items-center gap-2.5 pl-1 text-left group"
          aria-label="CRUDIFY home"
        >
          <div className="flex flex-col gap-1">
            <Logo className="h-[22px] origin-left transition-transform duration-300 group-hover:scale-105" />
            <span className="hidden text-[9px] font-extrabold tracking-wider text-tertiary/65 sm:block uppercase">
              Marketing • AI • Web • Cyber
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {LINKS.map((link) => {
            const active = isActive(link.href, pathname);

            const trigger = (
              <Link
                key={link.href}
                href={link.href}
                scroll={!link.href.includes("#")}
                aria-current={active ? "page" : undefined}
                aria-expanded={link.menu ? menuOpen : undefined}
                aria-controls={link.menu ? "services-menu" : undefined}
                onClick={(e) => go(e, link.href)}
                className={`group relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-extrabold transition-colors hover:text-secondary ${
                  active ? "text-secondary" : "text-tertiary/85"
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {link.menu && (
                  <svg
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                    className={`relative z-10 h-2.5 w-2.5 transition-transform duration-300 ${
                      menuOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M2.5 4.5 6 8l3.5-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <span
                  className={`absolute inset-0 rounded-full bg-secondary/20 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 ${
                    active ? "scale-100 opacity-100" : "scale-90 opacity-0"
                  }`}
                />
              </Link>
            );

            if (!link.menu) return trigger;

            return (
              <div
                key={link.href}
                onMouseEnter={() => setMenuOpen(true)}
                onMouseLeave={() => setMenuOpen(false)}
                // Tabbing into the trigger or any item keeps the panel open;
                // tabbing past the last item closes it.
                onFocus={() => setMenuOpen(true)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                    setMenuOpen(false);
                  }
                }}
              >
                {trigger}

                {/* Anchored to the whole bar rather than the trigger, so the
                    wide panel lines up with it. pt-3 lives inside the wrapper
                    so the gap between the bar and the card stays hoverable. */}
                <div
                  id="services-menu"
                  className={`absolute inset-x-0 top-full z-20 pt-3 transition-all duration-250 ease-out ${
                    menuOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-2 opacity-0"
                  }`}
                  aria-hidden={!menuOpen}
                >
                  {/* Opaque face, no backdrop-blur: on a light ground a menu you
                      can read the page through is just hard to read. */}
                  <div className="grid grid-cols-[17rem_1fr] overflow-hidden rounded-3xl border border-secondary/30 bg-primary shadow-[0_28px_60px_-18px_var(--shadow-warm-strong)]">
                    {/* left — the service areas; hovering one swaps the right side */}
                    <div className="flex flex-col border-r border-tertiary/10 p-2">
                      <ul className="flex flex-col gap-0.5">
                        {link.menu.map((item, i) => {
                          const itemActive = pathname === item.href;
                          const on = menuSection === i;

                          return (
                            <li key={item.id}>
                              <Link
                                href={item.href}
                                tabIndex={menuOpen ? undefined : -1}
                                aria-current={itemActive ? "page" : undefined}
                                onMouseEnter={() => setMenuSection(i)}
                                onFocus={() => setMenuSection(i)}
                                onClick={(e) => go(e, item.href)}
                                className={`group/item flex items-center gap-3 rounded-2xl p-3 transition-colors ${
                                  on
                                    ? "bg-secondary/12"
                                    : "hover:bg-secondary/8"
                                }`}
                              >
                                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-secondary/35 bg-secondary/15 text-secondary">
                                  <CourseIcon
                                    name={item.icon}
                                    className="h-4 w-4"
                                  />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span
                                    className={`block text-[12.5px] font-extrabold transition-colors ${
                                      on || itemActive
                                        ? "text-secondary"
                                        : "text-tertiary"
                                    }`}
                                  >
                                    {item.title}
                                  </span>
                                  <span className="mt-0.5 block text-[11px] font-semibold leading-snug text-tertiary/60">
                                    {item.tag}
                                  </span>
                                </span>
                                <span
                                  aria-hidden="true"
                                  className={`text-sm transition-all duration-300 ${
                                    on
                                      ? "translate-x-0.5 text-secondary"
                                      : "text-tertiary/30"
                                  }`}
                                >
                                  →
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>

                      <Link
                        href="/services"
                        tabIndex={menuOpen ? undefined : -1}
                        onClick={(e) => go(e, "/services")}
                        className="mt-auto flex items-center justify-between rounded-2xl border-t border-tertiary/12 px-3 pt-3 pb-2 text-[11.5px] font-extrabold text-tertiary/70 transition-colors hover:text-secondary"
                      >
                        All services, compared
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>

                    {/* right — what the hovered area includes */}
                    {(() => {
                      const section: (typeof SERVICE_MENU)[number] =
                        link.menu[menuSection] ?? link.menu[0];

                      return (
                        <div key={section.id} className="min-h-[22rem] p-7">
                          <Link
                            href={section.href}
                            tabIndex={menuOpen ? undefined : -1}
                            onClick={(e) => go(e, section.href)}
                            className="font-display text-[1.6rem] font-extrabold tracking-[-0.03em] text-secondary transition-opacity hover:opacity-80"
                          >
                            {section.title}
                          </Link>
                          <p className="mt-1 text-[13px] font-semibold text-tertiary/65">
                            {section.industries
                              ? "Google and Meta ad campaigns built around how each sector buys."
                              : "Explore our professional solutions and specialised industry expertise."}
                          </p>

                          {section.menu.length > 0 && (
                            <div className="mt-5 grid grid-cols-3 gap-6 border-t border-tertiary/10 pt-5">
                              {section.menu.map((group) => (
                                <div key={group.title}>
                                  <p className="border-b border-tertiary/8 pb-2.5 text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-tertiary/50">
                                    {group.title}
                                  </p>
                                  <ul className="mt-3 flex flex-col gap-1">
                                    {group.items.map((name) => (
                                      <li key={name}>
                                        <Link
                                          href={section.href}
                                          tabIndex={menuOpen ? undefined : -1}
                                          onClick={(e) => go(e, section.href)}
                                          className="block py-1 text-[13px] font-bold leading-snug text-tertiary/80 transition-colors hover:text-secondary"
                                        >
                                          {name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}

                          {section.industries && (
                            <div className="mt-5 border-t border-tertiary/10 pt-5">
                              <ul className="grid grid-cols-3 gap-2.5">
                                {section.industries.map((name) => (
                                  <li
                                    key={name}
                                    className="rounded-xl border border-tertiary/10 bg-tertiary/[0.03] px-3 py-3 text-center text-[12.5px] font-bold text-tertiary/75"
                                  >
                                    {name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Status Badge */}
          <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-secondary/35 bg-secondary/12 px-3 py-1 text-[11px] font-extrabold text-tertiary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span>99.99% Systems Active</span>
          </div>

          <button
            type="button"
            onClick={enquire}
            className="hidden sm:flex items-center gap-2.5 rounded-full bg-contrast text-primary px-4.5 py-1.5 text-xs font-extrabold shadow-[0_10px_24px_-10px_var(--color-contrast)] transition-all hover:scale-105"
          >
            <span>Enquire Now</span>
            <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-secondary font-bold text-[11px] shadow-sm">
              →
            </span>
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-tertiary/20 bg-tertiary/10 lg:hidden text-tertiary"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-tertiary transition-all duration-300 ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-tertiary transition-all duration-300 ${
                  open ? "top-1/2 -rotate-45" : "top-full"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`pointer-events-auto mx-auto mt-2 w-[min(1240px,94vw)] origin-top overflow-hidden rounded-3xl transition-all duration-500 lg:hidden ${
          open
            ? "max-h-[80vh] opacity-100 shadow-[0_28px_60px_-20px_var(--shadow-warm-strong)]"
            : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <div className="panel panel-opaque flex max-h-[80vh] flex-col gap-1 overflow-y-auto p-3 border border-tertiary/20">
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-tertiary/15 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">Menu</span>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-tertiary">
              <span className="h-2 w-2 rounded-full bg-secondary inline-block"></span>
              Systems Operational
            </div>
          </div>

          {LINKS.map((link) => {
            const active = isActive(link.href, pathname);
            // Padding is left to each variant so the two never emit conflicting
            // utilities for the same property.
            const rowClass = `rounded-2xl text-left text-[14px] font-bold transition-colors hover:bg-secondary/15 hover:text-secondary ${
              active ? "bg-secondary/15 text-secondary" : "text-tertiary"
            }`;

            if (!link.menu) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={!link.href.includes("#")}
                  aria-current={active ? "page" : undefined}
                  onClick={(e) => go(e, link.href)}
                  className={`${rowClass} px-4 py-2.5`}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <div key={link.href} className="flex flex-col">
                {/* The label navigates; the caret expands — so the sheet never
                    traps someone who just wants the services overview. */}
                <div className={`${rowClass} flex items-center pl-4 pr-1`}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    onClick={(e) => go(e, link.href)}
                    className="flex-1 py-2.5"
                  >
                    {link.label}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSheetMenuOpen((v) => !v)}
                    aria-expanded={sheetMenuOpen}
                    aria-controls="services-sheet-menu"
                    aria-label={`${sheetMenuOpen ? "Hide" : "Show"} services`}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-current"
                  >
                    <svg
                      viewBox="0 0 12 12"
                      aria-hidden="true"
                      className={`h-3 w-3 transition-transform duration-300 ${
                        sheetMenuOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M2.5 4.5 6 8l3.5-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                <div
                  id="services-sheet-menu"
                  className={`grid overflow-hidden transition-all duration-400 ease-out ${
                    sheetMenuOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <ul className="ml-4 flex min-h-0 flex-col gap-0.5 border-l border-tertiary/15 pl-2">
                    {link.menu.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.href}
                          tabIndex={sheetMenuOpen ? undefined : -1}
                          aria-current={pathname === item.href ? "page" : undefined}
                          onClick={(e) => go(e, item.href)}
                          className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-[13px] font-semibold transition-colors hover:bg-secondary/15 hover:text-secondary ${
                            pathname === item.href
                              ? "text-secondary"
                              : "text-tertiary/80"
                          }`}
                        >
                          <CourseIcon
                            name={item.icon}
                            className="h-3.5 w-3.5 shrink-0 text-secondary"
                          />
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
          <button
            type="button"
            onClick={enquire}
            className="btn btn-primary mt-2 w-full text-sm"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </header>
  );
}
