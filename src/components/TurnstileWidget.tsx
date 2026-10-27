"use client";

import Script from "next/script";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

export type TurnstileHandle = { getToken: () => Promise<string> };

type Props = { onToken?: (token: string) => void };

const TurnstileWidget = forwardRef<TurnstileHandle, Props>(function TurnstileWidget({ onToken }, forwardedRef) {
  const elementRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const callbackRef = useRef(onToken);
  const pendingRef = useRef<{ resolve: (token: string) => void; timer: number } | null>(null);
  const returnedTokensRef = useRef(new Set<string>());

  callbackRef.current = onToken;

  const mount = useCallback(() => {
    if (!elementRef.current || !window.turnstile || widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(elementRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      callback: (token: string) => {
        callbackRef.current?.(token);
        const pending = pendingRef.current;
        if (pending && token && !returnedTokensRef.current.has(token)) {
          returnedTokensRef.current.add(token);
          pending.resolve(token);
        }
      },
      "expired-callback": () => callbackRef.current?.(""),
      "error-callback": () => {
        callbackRef.current?.("");
        pendingRef.current?.resolve("");
      },
    });
  }, []);

  const getToken = useCallback(async () => {
    const deadline = Date.now() + 20_000;
    while ((!window.turnstile || !widgetIdRef.current) && Date.now() < deadline) {
      mount();
      await new Promise((resolve) => window.setTimeout(resolve, 50));
    }

    const widgetId = widgetIdRef.current;
    const turnstile = window.turnstile;
    if (!widgetId || !turnstile) return "";
    if (pendingRef.current) return "";

    return new Promise<string>((resolve) => {
      const finish = (token: string) => {
        const pending = pendingRef.current;
        if (!pending) return;
        window.clearTimeout(pending.timer);
        pendingRef.current = null;
        resolve(token);
      };
      const timer = window.setTimeout(() => finish(""), Math.max(0, deadline - Date.now()));
      pendingRef.current = { resolve: finish, timer };
      callbackRef.current?.("");
      try {
        turnstile.reset(widgetId);
      } catch {
        finish("");
      }
    });
  }, [mount]);

  useImperativeHandle(forwardedRef, () => ({ getToken }), [getToken]);

  useEffect(() => {
    mount();
    return () => {
      const pending = pendingRef.current;
      if (pending) {
        window.clearTimeout(pending.timer);
        pending.resolve("");
      }
      if (widgetIdRef.current) window.turnstile?.remove(widgetIdRef.current);
      widgetIdRef.current = null;
    };
  }, [mount]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={mount}
      />
      <div ref={elementRef} />
    </>
  );
});

export default TurnstileWidget;
