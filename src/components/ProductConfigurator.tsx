"use client";

import { useState, useRef } from "react";
import { CourseIcon } from "./Icons";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface ModuleItem {
  id: string;
  name: string;
  category: "web" | "digital" | "cyber";
  price: number;
  icon: string;
}

const MODULES_LIST: ModuleItem[] = [
  { id: "web-core", name: "Next.js 16 Web Engine", category: "web", price: 499, icon: "web" },
  { id: "web-cms", name: "Headless CMS Suite", category: "web", price: 299, icon: "server" },
  { id: "web-ui", name: "Gen-Z UI Vault", category: "web", price: 199, icon: "code" },
  { id: "dig-ai", name: "AI Digital Asset Studio", category: "digital", price: 399, icon: "digital" },
  { id: "dig-analytics", name: "Omnichannel Analytics", category: "digital", price: 199, icon: "chart" },
  { id: "dig-seo", name: "Automated SEO Bot", category: "digital", price: 249, icon: "globe" },
  { id: "cyb-shield", name: "Zero-Trust Cloud Shield", category: "cyber", price: 599, icon: "shield" },
  { id: "cyb-audit", name: "Vulnerability Threat Auditor", category: "cyber", price: 349, icon: "cyber" },
  { id: "cyb-soc2", name: "SOC 2 Compliance Engine", category: "cyber", price: 449, icon: "lock" },
];

export default function ProductConfigurator() {
  const root = useRef<HTMLElement>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "web-core",
    "dig-ai",
    "cyb-shield",
  ]);
  const [trafficScale, setTrafficScale] = useState<number>(100); // 100k requests base
  const [isAnnual, setIsAnnual] = useState<boolean>(true);

  const toggleModule = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Base calculation logic
  const baseMonthly = MODULES_LIST.filter((m) => selectedIds.includes(m.id)).reduce(
    (acc, item) => acc + item.price,
    0
  );

  const trafficMultiplier = 1 + (trafficScale - 100) / 400;
  const calculatedMonthly = Math.round(baseMonthly * trafficMultiplier);
  const finalPrice = isAnnual ? Math.round(calculatedMonthly * 0.8) : calculatedMonthly;

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from("[data-config-box]", {
        y: 35,
        autoAlpha: 0,
        duration: 0.9,
        clearProps: "all",
        scrollTrigger: {
          trigger: root.current,
          start: "top 90%",
          once: true,
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="configurator"
      className="relative px-[4vw] py-24 bg-primary bg-pattern-configurator"
    >
      <div className="mx-auto max-w-[1240px]">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="eyebrow">Interactive Estimator</div>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-tight text-tertiary">
            Build Your <span className="text-accent">Custom Stack</span>
          </h2>
          <p className="mt-4 text-base text-tertiary/75">
            Select your Web, Digital, and Cyber modules below to estimate your 
            custom enterprise deployment.
          </p>
        </div>

        <div data-config-box className="mt-12 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Module Selector Panel */}
          <div className="panel p-6 sm:p-8 border border-tertiary/15 shadow-xl rounded-3xl">
            {/* Billing Toggle */}
            <div className="flex items-center justify-between border-b border-tertiary/10 pb-6 mb-6">
              <div>
                <h3 className="font-display text-lg font-bold text-tertiary">Select Product Modules</h3>
                <p className="text-xs text-tertiary/70">Pick one or more modules from Web, Digital, and Cyber</p>
              </div>

              <div className="flex items-center gap-2 bg-tertiary/5 p-1 rounded-full border border-tertiary/10">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                    !isAnnual ? "bg-primary text-tertiary shadow" : "text-tertiary/70"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-3 py-1 text-xs font-bold rounded-full transition-all flex items-center gap-1 ${
                    isAnnual ? "bg-secondary text-primary shadow" : "text-tertiary/70"
                  }`}
                >
                  Annual <span className="text-[10px] bg-primary/20 px-1 rounded">20% OFF</span>
                </button>
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid gap-3 sm:grid-cols-3">
              {MODULES_LIST.map((m) => {
                const isSelected = selectedIds.includes(m.id);
                return (
                  <button
                    key={m.id}
                    onClick={() => toggleModule(m.id)}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between h-36 ${
                      isSelected
                        ? "border-secondary bg-secondary/10 shadow-md scale-[1.02]"
                        : "border-tertiary/15 bg-tertiary/[0.01] hover:border-secondary/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`p-2 rounded-xl ${isSelected ? "bg-secondary text-primary" : "bg-tertiary/10 text-tertiary"}`}>
                        <CourseIcon name={m.icon as any} className="h-4 w-4" />
                      </span>
                      <span
                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                          isSelected ? "border-secondary bg-secondary text-primary" : "border-tertiary/30"
                        }`}
                      >
                        {isSelected && <CourseIcon name="check" className="h-3 w-3" />}
                      </span>
                    </div>

                    <div>
                      <p className="font-display text-xs font-bold text-tertiary leading-tight">{m.name}</p>
                      <p className="mt-1 text-[11px] font-semibold text-secondary font-mono">
                        ${m.price}/mo
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Traffic & Request Volume Slider */}
            <div className="mt-8 pt-6 border-t border-tertiary/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-tertiary">
                  Monthly Request Volume Scale
                </label>
                <span className="font-mono text-xs font-bold text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                  {trafficScale * 1}k requests/mo
                </span>
              </div>

              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={trafficScale}
                onChange={(e) => setTrafficScale(Number(e.target.value))}
                className="mt-4 w-full accent-secondary cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-tertiary/50 font-mono mt-1">
                <span>100k req</span>
                <span>500k req</span>
                <span>1M+ req</span>
              </div>
            </div>
          </div>

          {/* Estimate Summary Panel */}
          <div className="panel panel-feature p-6 sm:p-8 rounded-3xl flex flex-col justify-between shadow-[0_28px_60px_-20px_var(--shadow-warm-strong)] border border-secondary/30">
            <div>
              <div className="flex items-center justify-between border-b border-tertiary/20 pb-4">
                <span className="eyebrow !text-secondary font-extrabold">Stack Summary</span>
                <span className="text-xs font-mono font-bold bg-secondary/20 px-3 py-1 rounded-full !text-secondary border border-secondary/40 shadow-sm animate-pulse">
                  {selectedIds.length} Modules Selected
                </span>
              </div>

              <div className="mt-6 space-y-3.5">
                {MODULES_LIST.filter((m) => selectedIds.includes(m.id)).map((m) => (
                  <div key={m.id} className="flex items-center justify-between text-xs !text-tertiary font-bold">
                    <span className="flex items-center gap-2.5 !text-tertiary">
                      <span className="grid h-4 w-4 place-items-center rounded-full bg-secondary text-primary font-extrabold text-[10px]">
                        ✓
                      </span>
                      <span className="!text-tertiary">{m.name}</span>
                    </span>
                    <span className="font-mono font-extrabold !text-secondary">${m.price}/mo</span>
                  </div>
                ))}

                {selectedIds.length === 0 && (
                  <p className="text-xs italic !text-tertiary/80 text-center py-4">
                    Please select at least one module above to calculate your stack estimate.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-tertiary/20">
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase font-extrabold !text-secondary tracking-wider">Estimated Investment</span>
                <div className="text-right">
                  <span className="font-display text-3xl font-extrabold !text-tertiary">${finalPrice}</span>
                  <span className="text-xs !text-tertiary/90 font-medium">/mo</span>
                </div>
              </div>

              {isAnnual && (
                <p className="mt-1.5 text-[11px] !text-secondary font-extrabold text-right">
                  Includes 20% Annual Savings ($
                  {Math.round(calculatedMonthly * 0.2 * 12)} saved / yr)
                </p>
              )}

              <button
                onClick={() => alert(`Proposal requested for ${selectedIds.length} modules at $${finalPrice}/mo!`)}
                className="btn btn-primary mt-6 w-full !bg-secondary !text-primary font-extrabold text-sm shadow-xl hover:!bg-secondary/90 hover:shadow-secondary/30"
              >
                Request Custom Proposal →
              </button>

              <p className="mt-3 text-[10.5px] text-center !text-tertiary/90 font-medium">
                Instant trial included. No credit card required to start sandbox.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
