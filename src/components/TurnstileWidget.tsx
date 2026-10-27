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
      execute: (id?: string) => void;
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

  const resetWidget = useCallback(() => {
    if (!idRef.current || !window.turnstile) return;
    try {
      window.turnstile.reset(idRef.current);
    } catch (error) {
      console.error("Could not reset the Cloudflare Turnstile widget.", error);
    }
  }, []);

  const executePendingRequest = useCallback(() => {
    if (!pendingRef.current || !idRef.current || !window.turnstile) return;
    try {
      window.turnstile.reset(idRef.current);
      window.turnstile.execute(idRef.current);
    } catch (error) {
      console.error("Could not execute the Cloudflare Turnstile challenge.", error);
      finishPending("");
    }
  }, [finishPending]);

  const mount = useCallback(() => {
    if (!ref.current || !window.turnstile || idRef.current) return;
    const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
    if (!sitekey) {
      console.error("Cloudflare Turnstile is unavailable: NEXT_PUBLIC_TURNSTILE_SITE_KEY is missing.");
      callbackRef.current("");
      finishPending("");
      return;
    }
    try {
      idRef.current = window.turnstile.render(ref.current, {
        sitekey,
        size: "invisible",
        execution: "execute",
        callback: (token: string) => {
          callbackRef.current(token);
          finishPending(token);
        },
        "expired-callback": () => {
          callbackRef.current("");
          finishPending("");
          resetWidget();
        },
        "error-callback": (errorCode: unknown) => {
          if (typeof errorCode === "string") {
            console.warn("Cloudflare Turnstile widget error.", { errorCode });
          }
          callbackRef.current("");
          finishPending("");
          resetWidget();
        },
      });
      for (const ready of readyWaitersRef.current.splice(0)) ready();
    } catch (error) {
      console.error("Could not render the Cloudflare Turnstile widget.", error);
      callbackRef.current("");
      finishPending("");
    }
  }, [finishPending, resetWidget]);

  const getFreshToken = useCallback((): Promise<string> => {
    if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
      console.error("Cloudflare Turnstile is unavailable: NEXT_PUBLIC_TURNSTILE_SITE_KEY is missing.");
      return Promise.resolve("");
    }
    if (pendingRef.current) return pendingRef.current.promise;
    let resolveToken!: (token: string) => void;
    const promise = new Promise<string>((resolve) => {
      resolveToken = resolve;
    });
    const timeout = window.setTimeout(() => {
      callbackRef.current("");
      finishPending("");
      resetWidget();
    }, TOKEN_TIMEOUT_MS);
    pendingRef.current = { resolve: resolveToken, promise, timeout };
    if (window.turnstile && idRef.current) {
      executePendingRequest();
    } else {
      readyWaitersRef.current.push(executePendingRequest);
    }
    return promise;
  }, [executePendingRequest, finishPending, resetWidget]);

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
      resetWidget();
      callbackRef.current("");
    }
  }, [resetKey, resetWidget]);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={mount}
        onError={() => {
          console.error("Could not load the Cloudflare Turnstile script.");
          callbackRef.current("");
          finishPending("");
        }}
      />
      <div ref={ref} />
    </>
  );
});

export default TurnstileWidget;
