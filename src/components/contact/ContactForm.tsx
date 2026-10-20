"use client";

import { useState, type FormEvent } from "react";

const SUITE_OPTIONS = [
  "Business Growth Booster (website + Meta ads + 5 reels)",
  "Social Media Management",
  "FB & Insta Ads / Google & YouTube Ads",
  "Google Maps Ranking",
  "Website or Ecommerce / Shopify Store",
  "Graphic Design, Video Editing or Shoot",
  "AI Agents & Automation",
  "Not sure yet: help me choose",
];

/**
 * The enquiry form — name, phone and service, posted to /api/contact, which
 * appends the row to the Google Sheet. Shared by the CTA section and the
 * enquiry popup so both submit through exactly the same path.
 *
 * Styled for the cherry `.panel-accent` block; render it inside one.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || formData.get("course") || "").trim();
    const hp = String(formData.get("_hp") || "").trim();

    if (!name || !phone || !service) {
      setError("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service,
          _hp: hp,
        }),
      });

      const data = (await res.json().catch(() => null)) as { ok?: boolean; success?: boolean; error?: string } | null;
      const success = data?.success ?? data?.ok;

      if (!res.ok || !success) {
        throw new Error(data?.error || "Failed to submit request. Please try again.");
      }

      form.reset();
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    {/* Form */}
    {sent ? (
      <div className="panel panel-quiet flex flex-col items-start justify-center gap-4 p-8 rounded-2xl border border-secondary/30">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-secondary shadow-lg animate-pulse">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="m5 12.5 4.5 4.5L19 7.5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="font-display text-xl font-bold !text-primary">
          Call Requested
        </h3>
        <p className="text-[14px] leading-relaxed !text-primary/90">
          Thanks — the CRUDIFY team will call you shortly to book your
          call.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setError(null);
          }}
          className="btn btn-ghost mt-2 !py-2.5 text-[13px]"
        >
          Send another request
        </button>
      </div>
    ) : (
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {/* Honeypot field for bot protection */}
        <input
          type="text"
          name="_hp"
          tabIndex={-1}
          autoComplete="off"
          className="sr-only absolute -left-[9999px]"
          aria-hidden="true"
        />

        <Field label="Your Name / Business">
          <input
            required
            name="name"
            autoComplete="name"
            placeholder="Your name & business name"
            className="field-input font-medium"
          />
        </Field>

        <Field label="Phone / WhatsApp">
          <input
            required
            name="phone"
            type="tel"
            inputMode="tel"
            pattern="[0-9+\s-]{8,15}"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className="field-input font-medium"
          />
        </Field>

        <Field label="What do you need help with?">
          <select required name="service" className="field-input font-medium" defaultValue="">
            <option value="" disabled className="bg-primary text-tertiary">
              Select a service
            </option>
            {SUITE_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-primary text-tertiary">
                {option}
              </option>
            ))}
          </select>
        </Field>

        {error && (
          <div
            className="rounded-xl border border-red-300/40 bg-red-950/70 p-3 text-[13px] font-medium text-red-100"
            role="alert"
          >
            {error}
          </div>
        )}

        <button
          data-cta-field
          type="submit"
          disabled={submitting}
          className="btn btn-primary mt-2 w-full font-extrabold text-sm shadow-xl disabled:opacity-70 disabled:cursor-wait"
        >
          {submitting ? "Sending…" : "Book a Call"}
        </button>

        <p data-cta-field className="text-center text-[11.5px] !text-primary/80 font-medium">
          Ludhiana-based. Serving businesses across India.
        </p>
      </form>
    )}
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label data-cta-field className="block">
      <span className="mb-2 block text-[11.5px] font-bold uppercase tracking-[0.18em] !text-primary/85">
        {label}
      </span>
      {children}
    </label>
  );
}
