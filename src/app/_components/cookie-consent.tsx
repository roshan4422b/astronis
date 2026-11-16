"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import styles from "./cookie-consent.module.css";

type CookieCategory = "functional" | "analytics" | "marketing";
type CookiePreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

type ConsentRecord = CookiePreferences & {
  version: string;
  timestamp: number;
};

const STORAGE_KEY = "astronis-cookie-consent";
const CONSENT_VERSION = "2026.11.16";
const CONSENT_TTL_MS = 365 * 24 * 60 * 60 * 1000;

const defaultPreferences: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

let fallbackConsent: string | null = null;

function normalizePreferences(value: Partial<CookiePreferences> | null | undefined): CookiePreferences {
  if (!value) {
    return { ...defaultPreferences };
  }

  return {
    necessary: true,
    functional: Boolean(value.functional),
    analytics: Boolean(value.analytics),
    marketing: Boolean(value.marketing),
  };
}

function getConsentSnapshot() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return fallbackConsent;
  }
}

function getServerConsentSnapshot() {
  return null;
}

function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("astronis-cookie-consent-change", onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener("astronis-cookie-consent-change", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function parseConsent(raw: string | null): ConsentRecord | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>;
    if (
      typeof parsed?.timestamp !== "number" ||
      typeof parsed?.version !== "string" ||
      parsed.version !== CONSENT_VERSION
    ) {
      return null;
    }

    return {
      ...normalizePreferences(parsed),
      version: CONSENT_VERSION,
      timestamp: parsed.timestamp,
    };
  } catch {
    return null;
  }
}

function getSavedConsent() {
  return parseConsent(getConsentSnapshot());
}

function persistConsent(nextPreferences: CookiePreferences) {
  const record: ConsentRecord = {
    ...nextPreferences,
    version: CONSENT_VERSION,
    timestamp: Date.now(),
  };

  fallbackConsent = JSON.stringify(record);

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, fallbackConsent);
    } catch {
      // Ignore storage failures and continue with in-memory consent state.
    }

    const safeConsent = {
      ...record,
      necessary: true,
    };
    (window as Window & {
      __astronisCookieConsent?: ConsentRecord;
    }).__astronisCookieConsent = safeConsent;
    window.dispatchEvent(
      new CustomEvent("astronis-cookie-consent-change", {
        detail: safeConsent,
      }),
    );
  }
}

function isConsentCurrent(record: ConsentRecord | null) {
  if (!record) {
    return false;
  }

  return Date.now() - record.timestamp < CONSENT_TTL_MS;
}

export default function CookieConsentManager() {
  const consentSnapshot = useSyncExternalStore(
    subscribeToConsent,
    getConsentSnapshot,
    getServerConsentSnapshot,
  );
  const bannerVisible = !isConsentCurrent(parseConsent(consentSnapshot));
  const [panelOpen, setPanelOpen] = useState(false);
  const [draftPreferences, setDraftPreferences] = useState<CookiePreferences>(() => {
    const saved = getSavedConsent();
    return isConsentCurrent(saved) ? normalizePreferences(saved) : { ...defaultPreferences };
  });

  useEffect(() => {
    const openSettings = () => {
      const savedConsent = getSavedConsent();
      setDraftPreferences(savedConsent ? normalizePreferences(savedConsent) : { ...defaultPreferences });
      setPanelOpen(true);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && panelOpen) {
        setPanelOpen(false);
      }
    };

    window.addEventListener("astronis-open-cookie-settings", openSettings);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("astronis-open-cookie-settings", openSettings);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [panelOpen]);

  const savePreferences = (nextPreferences: CookiePreferences) => {
    persistConsent(nextPreferences);
    setDraftPreferences(nextPreferences);
    setPanelOpen(false);
  };

  const acceptAll = () => {
    const nextPreferences: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(nextPreferences);
  };

  const rejectAll = () => {
    const nextPreferences: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    savePreferences(nextPreferences);
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  const toggleCategory = (category: CookieCategory) => {
    setDraftPreferences((previous) => ({
      ...previous,
      [category]: !previous[category],
    }));
  };

  return (
    <>
      {(bannerVisible || panelOpen) && <div className={styles.overlay} aria-hidden="true" />}

      {bannerVisible && !panelOpen && (
        <aside
          className={styles.banner}
          aria-live="polite"
          role="dialog"
          aria-label="Cookie consent banner"
        >
          <div className={styles.bannerInner}>
            <div className={styles.copy}>
              <h2>Your Privacy Matters</h2>
              <p>
                At Astronis Global, we use cookies and similar technologies to ensure our website
                functions properly, enhance your browsing experience, understand website usage, and
                improve our services.
              </p>
              <p>
                Essential cookies are necessary for the website to operate securely. With your
                permission, we may also use analytics, functional, and other non-essential cookies.
              </p>
              <p>
                You can accept all cookies, reject non-essential cookies, or customise your
                preferences at any time.
              </p>
              <p className={styles.links}>
                <Link href="/legal/cookie-policy">Cookie Policy</Link>
                <span aria-hidden="true">|</span>
                <Link href="/legal/privacy-policy">Privacy Policy</Link>
              </p>
            </div>

            <div className={styles.actions}>
              <button type="button" className={`${styles.button} ${styles.secondary}`} onClick={() => setPanelOpen(true)}>
                Manage Cookies
              </button>
              <button type="button" className={`${styles.button} ${styles.ghost}`} onClick={rejectAll}>
                Reject All
              </button>
              <button type="button" className={`${styles.button} ${styles.primary}`} onClick={acceptAll}>
                Accept All
              </button>
            </div>
          </div>
        </aside>
      )}

      {panelOpen && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-labelledby="cookie-preferences-title">
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div>
                <p className={styles.modalEyebrow}>Cookie Preferences</p>
                <h2 id="cookie-preferences-title">Manage cookies</h2>
              </div>
              <button type="button" className={styles.closeButton} aria-label="Close cookie settings" onClick={closePanel}>
                ×
              </button>
            </div>

            <div className={styles.preferenceList}>
              <div className={styles.preferenceRow}>
                <div>
                  <h3>Strictly Necessary Cookies</h3>
                  <p>These cookies are essential for website security, core functionality, and proper operation.</p>
                </div>
                <span className={styles.status}>Always Active</span>
              </div>

              {(["functional", "analytics", "marketing"] as CookieCategory[]).map((category) => (
                <div className={styles.preferenceRow} key={category}>
                  <div>
                    <h3>
                      {category === "functional" && "Functional Cookies"}
                      {category === "analytics" && "Analytics and Performance Cookies"}
                      {category === "marketing" && "Marketing Cookies"}
                    </h3>
                    <p>
                      {category === "functional" && "These cookies help remember visitor preferences and improve the browsing experience."}
                      {category === "analytics" && "These cookies help us understand website traffic, visitor interactions, and website performance."}
                      {category === "marketing" && "These cookies may be used to measure advertising performance and deliver relevant content."}
                    </p>
                  </div>
                  <label className={styles.switch} aria-label={`Toggle ${category} cookies`}>
                    <input
                      type="checkbox"
                      checked={draftPreferences[category]}
                      onChange={() => toggleCategory(category)}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
              ))}
            </div>

            <div className={styles.modalActions}>
              <button type="button" className={`${styles.button} ${styles.secondary}`} onClick={acceptAll}>
                Accept All
              </button>
              <button type="button" className={`${styles.button} ${styles.ghost}`} onClick={rejectAll}>
                Reject All
              </button>
              <button type="button" className={`${styles.button} ${styles.primary}`} onClick={() => savePreferences(draftPreferences)}>
                Save My Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
