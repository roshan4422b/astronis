"use client";

import styles from "./privacy-policy.module.css";

export default function PdfDownloadButton() {
  return (
    <button className={styles.downloadButton} type="button" onClick={() => window.print()}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Download PDF
    </button>
  );
}
