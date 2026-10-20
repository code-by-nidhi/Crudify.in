"use client";

import { openEnquiry } from "../contact/EnquiryModal";

/** Opens the site-wide enquiry popup — usable from server-rendered pages. */
export default function EnquireButton({
  children,
  className = "btn btn-primary",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={openEnquiry} className={className}>
      {children}
    </button>
  );
}
