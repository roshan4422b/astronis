"use client";

import styles from "./privacy-policy.module.css";
import { useState } from "react";

export default function PdfDownloadButton({
  endpoint,
  fileName = "Astronis-Global-Privacy-Policy.pdf",
}: {
  endpoint?: string;
  fileName?: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");

  async function downloadPdf() {
    if (isDownloading) return;
    if (!endpoint) {
      window.print();
      return;
    }
    setIsDownloading(true);
    setError("");

    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("PDF generation failed");
      const pdf = await response.blob();
      if (pdf.type !== "application/pdf" || pdf.size === 0) {
        throw new Error("The generated file is not a valid PDF");
      }

      const objectUrl = URL.createObjectURL(pdf);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    } catch {
      setError("The PDF could not be generated. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div>
      <button className={styles.downloadButton} type="button" onClick={downloadPdf} disabled={isDownloading} aria-busy={isDownloading}>
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
          <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {isDownloading ? "Preparing PDF…" : "Download PDF"}
      </button>
      {error && <p className={styles.downloadError} role="alert">{error}</p>}
    </div>
  );
}
