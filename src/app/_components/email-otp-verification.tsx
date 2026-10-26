"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./email-otp-verification.module.css";

type TurnstileApi = {
  render: (container: HTMLElement, options: {
    sitekey: string;
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": (errorCode?: string | number) => boolean | void;
    theme: "light";
  }) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

function getVerificationScope(element: HTMLDivElement | null) {
  return element?.closest("form") ?? element?.closest<HTMLElement>('[role="dialog"]') ?? null;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export default function EmailOtpVerification({
  emailAddress,
  requireCaptcha = false,
}: {
  emailAddress?: string;
  requireCaptcha?: boolean;
} = {}) {
  const container = useRef<HTMLDivElement>(null);
  const widget = useRef<string | null>(null);
  const codeInputId = useId();
  const [captchaToken, setCaptchaToken] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(0);
  const siteKey = requireCaptcha ? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY : undefined;
  const cooldownLeft = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));

  useEffect(() => {
    if (!requireCaptcha || !siteKey || !container.current) return;
    let cancelled = false;
    const renderWidget = () => {
      if (cancelled || !window.turnstile || !container.current || widget.current) return;
      widget.current = window.turnstile.render(container.current, {
        sitekey: siteKey,
        theme: "light",
        callback: (token) => setCaptchaToken(token),
        "expired-callback": () => setCaptchaToken(""),
        "error-callback": (errorCode) => {
          setCaptchaToken("");
          const code = String(errorCode ?? "");
          setStatus(code === "110200"
            ? "This website hostname is not authorized for the configured CAPTCHA key (Cloudflare error 110200). Add this hostname in Cloudflare Turnstile Hostname Management."
            : code
              ? `CAPTCHA could not load (Cloudflare error ${code}). Please refresh the challenge and try again.`
              : "CAPTCHA could not load. Please refresh the challenge and try again.");
          return true;
        },
      });
    };

    const existingScript = document.querySelector<HTMLScriptElement>("#cloudflare-turnstile-script");
    if (window.turnstile) {
      renderWidget();
    } else if (existingScript) {
      existingScript.addEventListener("load", renderWidget);
    } else {
      const script = document.createElement("script");
      script.id = "cloudflare-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", renderWidget, { once: true });
      script.addEventListener("error", () => setStatus("CAPTCHA could not load. Please try again later."), { once: true });
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (existingScript) existingScript.removeEventListener("load", renderWidget);
      if (widget.current && window.turnstile) {
        window.turnstile.remove(widget.current);
        widget.current = null;
      }
    };
  }, [requireCaptcha, siteKey]);

  useEffect(() => {
    if (!cooldownUntil) return;
    const interval = window.setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= cooldownUntil) setCooldownUntil(0);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [cooldownUntil]);

  useEffect(() => {
    const form = getVerificationScope(container.current);
    const emailInput = form?.querySelector<HTMLInputElement>('input[type="email"]');
    if (!form) return;
    const resetVerification = () => {
      setCaptchaToken("");
      setEmail("");
      setCode("");
      setVerificationToken("");
      setCodeSent(false);
      setStatus("");
      setCooldownUntil(0);
      setNow(0);
      if (requireCaptcha && widget.current && window.turnstile) window.turnstile.reset(widget.current);
    };
    form.addEventListener("reset", resetVerification);
    if (!emailInput) return () => form.removeEventListener("reset", resetVerification);
    const clearProofWhenEmailChanges = () => {
      if (emailInput.value.trim().toLowerCase() !== email) {
        setVerificationToken("");
        setCodeSent(false);
        setCode("");
        setEmail("");
      }
    };
    emailInput.addEventListener("input", clearProofWhenEmailChanges);
    return () => {
      form.removeEventListener("reset", resetVerification);
      emailInput.removeEventListener("input", clearProofWhenEmailChanges);
    };
  }, [email, requireCaptcha]);

  const resetCaptcha = () => {
    setCaptchaToken("");
    if (widget.current && window.turnstile) window.turnstile.reset(widget.current);
  };

  async function sendCode() {
    const form = getVerificationScope(container.current);
    const emailInput = form?.querySelector<HTMLInputElement>('input[type="email"]');
    const nextEmail = emailAddress?.trim().toLowerCase() ?? emailInput?.value.trim().toLowerCase() ?? "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
      setStatus("Enter a valid email address before requesting a verification code.");
      emailInput?.focus();
      return;
    }
    if (requireCaptcha && !captchaToken) {
      setStatus("Complete the CAPTCHA before requesting a verification code.");
      return;
    }

    setBusy(true);
    setStatus("");
    setEmail(nextEmail);
    try {
      const response = await fetch(requireCaptcha ? "/api/verification/send-otp" : "/api/verification/send-enquiry-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nextEmail, ...(requireCaptcha ? { captchaToken } : {}) }),
      });
      const result = (await response.json()) as { message?: string; retryAfter?: number };
      if (!response.ok) throw new Error(result.message || "We could not send your verification code.");
      setCodeSent(true);
      setVerificationToken("");
      setStatus(result.message || "A verification code has been sent.");
      setNow(Date.now());
      setCooldownUntil(Date.now() + (result.retryAfter ?? 60) * 1000);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "We could not send your verification code.");
    } finally {
      resetCaptcha();
      setBusy(false);
    }
  }

  async function verifyCode() {
    if (!email || !/^\d{6}$/.test(code)) {
      setStatus("Enter the 6-digit code sent to your email address.");
      return;
    }
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/verification/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const result = (await response.json()) as { message?: string; verificationToken?: string };
      if (!response.ok || !result.verificationToken) {
        throw new Error(result.message || "We could not verify that code.");
      }
      setVerificationToken(result.verificationToken);
      setStatus(result.message || "Your email address is verified.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "We could not verify that code.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className={styles.panel} aria-label="Email verification">
      <p className={styles.heading}>Verify your email to continue</p>
      <div className={requireCaptcha ? styles.captcha : undefined} ref={container} />
      {requireCaptcha && !siteKey && <p className={styles.error}>CAPTCHA verification is not configured.</p>}
      <div className={styles.actions}>
        <button type="button" className={styles.secondary} onClick={sendCode} disabled={busy || cooldownLeft > 0 || (requireCaptcha && !siteKey)}>
          {busy ? "Please wait..." : codeSent ? cooldownLeft ? `Resend in ${cooldownLeft}s` : "Resend code" : "Send email code"}
        </button>
        {codeSent && !verificationToken && (
          <div className={styles.codeRow}>
            <label className={styles.srOnly} htmlFor={codeInputId}>6-digit email verification code</label>
            <input
              id={codeInputId}
              className={styles.code}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              maxLength={6}
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="6-digit code"
            />
            <button type="button" className={styles.secondary} onClick={verifyCode} disabled={busy || code.length !== 6}>
              Verify OTP
            </button>
          </div>
        )}
      </div>
      {verificationToken && <p className={styles.success}>Email verified. You can now submit the form.</p>}
      {status && <p className={verificationToken ? styles.success : styles.status} role="status" aria-live="polite">{status}</p>}
      {requireCaptcha && <input type="hidden" name="captchaToken" value={captchaToken} readOnly />}
      <input type="hidden" name="emailVerificationToken" value={verificationToken} readOnly />
    </section>
  );
}
