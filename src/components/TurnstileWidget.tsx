"use client";
import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

type Props = { onToken: (token: string) => void; resetKey?: number };

export default function TurnstileWidget({ onToken, resetKey = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef<string | null>(null);
  const cb = useRef(onToken);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  const isConfigured = Boolean(siteKey && siteKey !== "your-turnstile-site-key");

  useEffect(() => {
    cb.current = onToken;
  }, [onToken]);

  const errorCb = useCallback(() => cb.current(""), []);

  const mount = useCallback(() => {
    if (!isConfigured || !siteKey || !ref.current || !window.turnstile || idRef.current) return;
    idRef.current = window.turnstile.render(ref.current, {
      sitekey: siteKey,
      callback: (t: string) => cb.current(t),
      "expired-callback": errorCb,
      "error-callback": errorCb,
    });
  }, [errorCb, isConfigured, siteKey]);

  useEffect(() => {
    mount();
    return () => {
      if (idRef.current) window.turnstile?.remove(idRef.current);
      idRef.current = null;
    };
  }, [mount]);

  useEffect(() => {
    if (resetKey && idRef.current) {
      window.turnstile?.reset(idRef.current);
      cb.current("");
    }
  }, [resetKey]);

  return (
    <>
      {isConfigured ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={mount}
        />
      ) : (
        <p role="alert">Security verification is temporarily unavailable.</p>
      )}
      <div ref={ref} />
    </>
  );
}
