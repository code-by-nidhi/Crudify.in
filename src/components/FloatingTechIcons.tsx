"use client";

import { CourseIcon, TechIcon, type IconName, type TechName } from "./Icons";

interface FloatingIconProps {
  type: "course" | "tech";
  name: IconName | TechName;
  className?: string;
  delay?: string;
  label?: string;
}

export default function FloatingTechIcons({
  items,
}: {
  items: FloatingIconProps[];
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`absolute flex items-center gap-2 rounded-2xl border border-secondary/25 bg-tertiary/10 px-3 py-1.5 shadow-lg text-secondary ${item.className || ""}`}
          style={{ animationDelay: item.delay || "0s" }}
        >
          <div className="grid h-7 w-7 place-items-center rounded-xl bg-secondary/15 text-secondary animate-pulse">
            {item.type === "course" ? (
              <CourseIcon name={item.name as IconName} className="h-4 w-4" />
            ) : (
              <TechIcon name={item.name as TechName} className="h-4 w-4" />
            )}
          </div>
          {item.label && (
            <span className="text-[11px] font-mono font-bold tracking-wide text-tertiary/90">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
