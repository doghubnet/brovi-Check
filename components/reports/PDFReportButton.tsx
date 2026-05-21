"use client";

/**
 * A button that triggers the browser print dialog. Reports are printable
 * by default because pages include simple print styles via Tailwind. This
 * component is separated into its own client component to avoid passing
 * client‑only event handlers from server components, as mandated by
 * Next.js rules.
 */
export function PDFReportButton() {
  return (
    <button
      className="btn-secondary w-full sm:w-auto"
      type="button"
      onClick={() => {
        if (typeof window !== 'undefined') window.print();
      }}
    >
      Downloadable PDF report
    </button>
  );
}