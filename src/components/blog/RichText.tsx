import Link from "next/link";
import { Fragment } from "react";

/* **bold** and [label](href) — the only markup the blog content uses. */
const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

export default function RichText({ text }: { text: string }) {
  return text.split(TOKEN).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-tertiary">
          {part.slice(2, -2)}
        </strong>
      );
    }

    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const className =
        "font-semibold text-secondary underline decoration-secondary/35 underline-offset-[3px] transition-colors hover:decoration-secondary";
      return href.startsWith("/") ? (
        <Link key={i} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {label}
        </a>
      );
    }

    return <Fragment key={i}>{part}</Fragment>;
  });
}
