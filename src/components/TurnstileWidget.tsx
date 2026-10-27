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

export type TurnstileWidgetHandle = {
  getFreshToken: () => Promise<string>;
};

type Props = { onToken: (token: string) => void; resetKey?: number };

type PendingToken = {
  resolve: (token: string) => void;
  promise: Promise<string>;
  timeout: number;
};

const TOKEN_TIMEOUT_MS = 20_000;

const TurnstileWidget = forwardRef<TurnstileWidgetHandle, Props>(function TurnstileWidget(
  { onToken, resetKey = 0 },
  forwardedRef,
) {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef<string | null>(null);
  const callbackRef = useRef(onToken);
  const pendingRef = useRef<PendingToken | null>(null);
  const readyWaitersRef = useRef<Array<() => void>>([]);

  callbackRef.current = onToken;

  const finishPending = useCallback((token: string) => {
    const pending = pendingRef.current;
    if (!pending) return;
    window.clearTimeout(pending.timeout);
    pendingRef.current = null;
    pending.resolve(token);
  }, []);

  const resetForPendingRequest = useCallback(() => {
    if (!pendingRef.current || !idRef.current || !window.turnstile) return;
    try {
      window.turnstile.reset(idRef.current);
    } catch {
      finishPending("");
    }
  }, [finishPending]);

  const mount = useCallback(() => {
    if (!ref.current || !window.turnstile || idRef.current) return;
    const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!sitekey) {
      callbackRef.current("");
      finishPending("");
      return;
    }
    try {
      idRef.current = window.turnstile.render(ref.current, {
        sitekey,
        appearance: "always",
        callback: (token: string) => {
          callbackRef.current(token);
          finishPending(token);
        },
        "expired-callback": () => {
          callbackRef.current("");
          finishPending("");
        },
        "error-callback": (errorCode: unknown) => {
          if (typeof errorCode === "string") {
            console.warn("Cloudflare Turnstile widget error.", { errorCode });
          }
          callbackRef.current("");
          finishPending("");
        },
      });
      for (const ready of readyWaitersRef.current.splice(0)) ready();
      resetForPendingRequest();
    } catch {
      callbackRef.current("");
      finishPending("");
    }
  }, [finishPending, resetForPendingRequest]);

  const getFreshToken = useCallback((): Promise<string> => {
    if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) return Promise.resolve("");
    if (pendingRef.current) return pendingRef.current.promise;
    let resolveToken!: (token: string) => void;
    const promise = new Promise<string>((resolve) => {
      resolveToken = resolve;
    });
    const timeout = window.setTimeout(() => finishPending(""), TOKEN_TIMEOUT_MS);
    pendingRef.current = { resolve: resolveToken, promise, timeout };
    if (window.turnstile && idRef.current) {
      resetForPendingRequest();
    } else {
      readyWaitersRef.current.push(resetForPendingRequest);
    }
    return promise;
  }, [finishPending, resetForPendingRequest]);

  useImperativeHandle(forwardedRef, () => ({ getFreshToken }), [getFreshToken]);

  useEffect(() => {
    mount();
    return () => {
      finishPending("");
      readyWaitersRef.current = [];
      if (idRef.current) window.turnstile?.remove(idRef.current);
      idRef.current = null;
    };
  }, [finishPending, mount]);

  useEffect(() => {
    if (resetKey && idRef.current) {
      window.turnstile?.reset(idRef.current);
      callbackRef.current("");
    }
  }, [resetKey]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={mount}
        onError={() => finishPending("")}
      />
      <div ref={ref} />
    </>
  );
});

export default TurnstileWidget;
