"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import TurnstileWidget from "@/components/TurnstileWidget";
import styles from "./email-otp-verification.module.css";

function getVerificationScope(element: HTMLDivElement | null) {
  return element?.closest("form") ?? element?.closest<HTMLElement>('[role="dialog"]') ?? null;
}

export default function EmailOtpVerification({
  emailAddress,
  onCaptchaToken,
  resetKey = 0,
}: {
  emailAddress?: string;
  onCaptchaToken?: (token: string) => void;
  resetKey?: number;
} = {}) {
  const container = useRef<HTMLDivElement>(null);
  const codeInputId = useId();
  const [captchaToken, setCaptchaToken] = useState("");
  const [internalCaptchaReset, setInternalCaptchaReset] = useState(0);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(0);
  const cooldownLeft = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));
  const updateCaptchaToken = useCallback((token: string) => {
    setCaptchaToken(token);
    onCaptchaToken?.(token);
  }, [onCaptchaToken]);

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
    let captchaResetTimer: number | undefined;
    const resetVerification = () => {
      updateCaptchaToken("");
      setEmail("");
      setCode("");
      setVerificationToken("");
      setCodeSent(false);
      setStatus("");
      setCooldownUntil(0);
      setNow(0);
      setInternalCaptchaReset((current) => current + 1);
    };
    const resetCaptchaAfterSubmit = () => {
      captchaResetTimer = window.setTimeout(() => {
        updateCaptchaToken("");
        setInternalCaptchaReset((current) => current + 1);
        captchaResetTimer = undefined;
      }, 0);
    };
    form.addEventListener("reset", resetVerification);
    if (form instanceof HTMLFormElement) form.addEventListener("submit", resetCaptchaAfterSubmit);
    if (!emailInput) return () => {
      if (captchaResetTimer !== undefined) window.clearTimeout(captchaResetTimer);
      form.removeEventListener("reset", resetVerification);
      if (form instanceof HTMLFormElement) form.removeEventListener("submit", resetCaptchaAfterSubmit);
    };
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
      if (captchaResetTimer !== undefined) window.clearTimeout(captchaResetTimer);
      form.removeEventListener("reset", resetVerification);
      if (form instanceof HTMLFormElement) form.removeEventListener("submit", resetCaptchaAfterSubmit);
      emailInput.removeEventListener("input", clearProofWhenEmailChanges);
    };
  }, [email, updateCaptchaToken]);

  async function sendCode() {
    try {
      const form = getVerificationScope(container.current);
      const emailInput = form?.querySelector<HTMLInputElement>('input[type="email"]');
      const nextEmail = emailAddress?.trim().toLowerCase() ?? emailInput?.value.trim().toLowerCase() ?? "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextEmail)) {
        setStatus("Enter a valid email address before requesting a verification code.");
        emailInput?.focus();
        return;
      }
      if (!captchaToken) {
        setStatus("Complete the CAPTCHA before requesting a verification code.");
        return;
      }

      setBusy(true);
      setStatus("");
      setEmail(nextEmail);
      const response = await fetch("/api/verification/send-enquiry-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nextEmail, captchaToken }),
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
      setBusy(false);
      updateCaptchaToken("");
      setInternalCaptchaReset((current) => current + 1);
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
      <div ref={container} />
      <div className={styles.actions}>
        <div className={styles.captcha}>
          <TurnstileWidget
            onToken={updateCaptchaToken}
            resetKey={resetKey + internalCaptchaReset}
          />
        </div>
        <button type="button" className={styles.secondary} onClick={sendCode} disabled={busy || cooldownLeft > 0 || !captchaToken}>
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
      <input type="hidden" name="captchaToken" value={captchaToken} readOnly />
      <input type="hidden" name="emailVerificationToken" value={verificationToken} readOnly />
    </section>
  );
}
