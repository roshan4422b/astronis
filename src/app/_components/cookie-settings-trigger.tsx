"use client";

import type { ReactNode } from "react";

export default function CookieSettingsTrigger({ children = "Cookie Settings" }: { children?: ReactNode }) {
  const openPreferences = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("astronis-open-cookie-settings"));
    }
  };

  return (
    <button
      type="button"
      className="footer-cookie-settings"
      onClick={openPreferences}
      aria-label="Open cookie settings"
    >
      {children}
    </button>
  );
}
