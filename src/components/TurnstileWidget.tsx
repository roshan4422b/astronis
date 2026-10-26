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

  useEffect(() => {
    cb.current = onToken;
  }, [onToken]);

  const mount = useCallback(() => {
    if (!ref.current || !window.turnstile || idRef.current) return;
    idRef.current = window.turnstile.render(ref.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      appearance: "always",
      callback: (token: string) => cb.current(token),
      "expired-callback": () => cb.current(""),
      "error-callback": () => cb.current(""),
    });
  }, []);

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
      />
      <div ref={ref} />
    </>
  );
}
