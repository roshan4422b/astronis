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

type Props = {
  onToken: (token: string) => void;
  onError?: (message: string) => void;
  resetKey?: number;
};

export default function TurnstileWidget({ onToken, onError, resetKey = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef<string | null>(null);
  const cb = useRef(onToken);
  const onErrorRef = useRef(onError);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim();
  useEffect(() => {
    cb.current = onToken;
  }, [onToken]);
  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  const reportError = useCallback((message: string) => {
    cb.current("");
    onErrorRef.current?.(message);
  }, []);

  const mount = useCallback(() => {
    if (!siteKey) {
      reportError("CAPTCHA is not configured. Set NEXT_PUBLIC_TURNSTILE_SITE_KEY and restart the app.");
      return;
    }
    if (!ref.current || !window.turnstile || idRef.current) return;
    try {
      idRef.current = window.turnstile.render(ref.current, {
        sitekey: siteKey,
        callback: (token: string) => cb.current(token),
        "expired-callback": () => {
          reportError("The CAPTCHA expired. Please complete it again before continuing.");
          if (idRef.current) window.turnstile?.reset(idRef.current);
        },
        "error-callback": () => {
          reportError("CAPTCHA could not be verified. Check the site key and allowed domain, then try again.");
        },
      });
    } catch (error) {
      console.error("Cloudflare Turnstile widget failed to render.", {
        error: error instanceof Error ? error.name : "UnknownError",
      });
      reportError("CAPTCHA failed to initialize. Check the site key and allowed domain, then try again.");
    }
  }, [reportError, siteKey]);

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
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={mount}
        onError={() => reportError("Cloudflare CAPTCHA could not load. Check your connection and try again.")}
      />
      <div ref={ref} />
    </>
  );
}
