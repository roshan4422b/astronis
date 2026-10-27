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
      getResponse: (id?: string) => string;
    };
  }
}

export type TurnstileHandle = {
  getToken: (options?: { fresh?: boolean }) => Promise<string>;
};

type Props = { onToken?: (token: string) => void };

const TurnstileWidget = forwardRef<TurnstileHandle, Props>(function TurnstileWidget({ onToken }, forwardedRef) {
  const elementRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const tokenRef = useRef("");
  const callbackRef = useRef(onToken);
  const waiterRef = useRef<{
    promise: Promise<string>;
    settle: (token: string) => void;
  } | null>(null);

  callbackRef.current = onToken;

  const mount = useCallback(() => {
    if (!elementRef.current || !window.turnstile || widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(elementRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      "refresh-expired": "auto",
      callback: (token: string) => {
        tokenRef.current = token;
        callbackRef.current?.(token);
        waiterRef.current?.settle(token);
      },
      "expired-callback": () => {
        tokenRef.current = "";
        callbackRef.current?.("");
      },
      "error-callback": (code: unknown) => {
        tokenRef.current = "";
        callbackRef.current?.("");
        if (typeof code === "number" || (typeof code === "string" && /^\d+$/.test(code))) {
          console.warn(`Turnstile error code: ${code}`);
        }
        waiterRef.current?.settle("");
      },
    });
  }, []);

  const waitForWidget = useCallback(async (timeout: number) => {
    const deadline = Date.now() + timeout;
    while ((!window.turnstile || !widgetIdRef.current) && Date.now() < deadline) {
      mount();
      await new Promise((resolve) => window.setTimeout(resolve, 50));
    }
    return window.turnstile && widgetIdRef.current
      ? { turnstile: window.turnstile, widgetId: widgetIdRef.current }
      : null;
  }, [mount]);

  const waitForToken = useCallback((timeout: number) => {
    if (waiterRef.current) return waiterRef.current.promise;

    let settle!: (token: string) => void;
    const promise = new Promise<string>((resolve) => {
      const timer = window.setTimeout(() => settle(""), timeout);
      settle = (token: string) => {
        window.clearTimeout(timer);
        if (waiterRef.current?.settle === settle) waiterRef.current = null;
        resolve(token);
      };
    });
    waiterRef.current = { promise, settle };
    return promise;
  }, []);

  const getToken = useCallback(async (options?: { fresh?: boolean }) => {
    const waitDuration = options?.fresh ? 25_000 : 15_000;
    const deadline = Date.now() + waitDuration;
    const widget = await waitForWidget(waitDuration);
    if (!widget) return "";

    if (!options?.fresh) {
      let token = tokenRef.current;
      if (!token) {
        try {
          token = widget.turnstile.getResponse(widget.widgetId) || "";
        } catch {
          token = "";
        }
      }
      if (token) {
        tokenRef.current = token;
        return token;
      }
      return waitForToken(Math.max(0, deadline - Date.now()));
    }

    tokenRef.current = "";
    callbackRef.current?.("");
    const tokenPromise = waitForToken(25_000);
    try {
      widget.turnstile.reset(widget.widgetId);
    } catch {
      waiterRef.current?.settle("");
    }
    return tokenPromise;
  }, [waitForToken, waitForWidget]);

  useImperativeHandle(forwardedRef, () => ({ getToken }), [getToken]);

  useEffect(() => {
    mount();
    return () => {
      const waiter = waiterRef.current;
      waiterRef.current = null;
      waiter?.settle("");
      tokenRef.current = "";
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
