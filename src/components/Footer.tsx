import Link from "next/link";
import Logo from "./Logo";
import { TIERS } from "./home/homeContent";
import { BUSINESS, SITE_NAME } from "@/lib/site";

const PRODUCT_COLUMNS = TIERS.map((tier) => ({
  title: tier.id === "ai" ? "AI-Powered Services" : "Human-Driven Services",
  links: tier.services.map((service) => ({ label: service.name, href: service.href })),
}));

export default function Footer() {
  return (
    <footer className="relative z-[2] mt-10 overflow-hidden border-t border-tertiary/15 bg-surface px-[4vw] pb-8 pt-20">
      {/* the template's oversized wordmark, set behind the footer as a
          watermark rather than taking up a band of its own */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none text-center font-display text-[24.5vw] font-extrabold leading-[0.78] tracking-[-0.06em] text-tertiary/[0.06] min-[1600px]:text-[24rem]"
      >
        CRUDIFY
      </p>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(2,1fr)]">
          <div>
            <div className="flex flex-col gap-2">
              <Logo className="h-7 self-start" />
              <span className="text-[10px] font-semibold text-tertiary/60 uppercase tracking-wider">
                Marketing • AI • Web • Cyber
              </span>
            </div>
            <p className="mt-5 max-w-[38ch] text-[15px] leading-relaxed text-tertiary/75 font-normal">
              Ludhiana&apos;s marketing and growth partner for businesses across
              Punjab — Meta &amp; Google Ads, AI automation, websites, e-commerce
              and cybersecurity.
            </p>

            {/* System Status Indicator */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-tertiary/10 bg-primary px-3 py-1 text-xs font-medium text-tertiary/80">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span>Ludhiana, Punjab · Free growth audits</span>
            </div>

            {/* Official profiles only — empty "#" links were crawlable dead ends. */}
            {BUSINESS.sameAs.length > 0 && (
              <div className="mt-6 flex gap-2">
                {BUSINESS.sameAs.map((social) => (
                  <a
                    key={social.url}
                    href={social.url}
                    target="_blank"
                    rel="noopener me"
                    aria-label={`${SITE_NAME} on ${social.label}`}
                    className="grid h-9 w-9 place-items-center rounded-md border border-tertiary/15 bg-primary text-[11px] font-semibold uppercase text-tertiary/70 transition-colors hover:border-secondary hover:bg-secondary hover:text-primary"
                  >
                    {social.label.slice(0, 2)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {PRODUCT_COLUMNS.map((column) => (
            <div key={column.title}>
              <p className="eyebrow">{column.title}</p>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] font-medium text-tertiary/75 transition-colors hover:text-secondary hover:underline underline-offset-4"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-tertiary/15 pt-6 text-[13px] text-tertiary/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} CRUDIFY. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-5 font-medium">
            <Link href="/about" className="transition-colors hover:text-secondary">
              About
            </Link>
            <span>•</span>
            <Link href="/services" className="transition-colors hover:text-secondary">
              Services
            </Link>
            <span>•</span>
            <Link href="/projects" className="transition-colors hover:text-secondary">
              Projects
            </Link>
            <span>•</span>
            <Link href="/blog" className="transition-colors hover:text-secondary">
              Blog
            </Link>
            <span>•</span>
            <Link href="/privacy-policy" className="transition-colors hover:text-secondary">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="transition-colors hover:text-secondary">
              Terms &amp; Conditions
            </Link>
            <span>•</span>
            <Link href="/#top" className="transition-colors hover:text-secondary font-bold">
              Back to Top ↑
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
