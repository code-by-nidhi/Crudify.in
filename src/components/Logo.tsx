import Image from "next/image";

/** Crudify wordmark. The source PNG carries wide transparent margins, so the
 *  wrapper is cut to the lettering's own ratio and the image covers it —
 *  `className` then sizes the visible wordmark by height. */
export default function Logo({ className = "h-6" }: { className?: string }) {
  return (
    <span className={`relative block aspect-[6.6/1] overflow-hidden ${className}`}>
      <Image
        src="/logo/crudy-logo1.png"
        alt="Crudify"
        fill
        sizes="200px"
        className="object-cover"
      />
    </span>
  );
}
