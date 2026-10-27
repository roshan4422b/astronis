"use client";

import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useId,
  useRef,
  useState,
  forwardRef,
} from "react";
import TurnstileWidget, { type TurnstileHandle } from "@/components/TurnstileWidget";
import styles from "./email-otp-verification.module.css";

function getVerificationScope(element: HTMLDivElement | null) {
  return element?.closest("form") ?? element?.closest<HTMLElement>('[role="dialog"]') ?? null;
}

export type EmailOtpVerificationHandle = { getToken: () => Promise<string> };

type Props = {
  emailAddress?: string;
  onCaptchaToken?: (token: string) => void;
};

const EmailOtpVerification = forwardRef<EmailOtpVerificationHandle, Props>(function EmailOtpVerification({
  emailAddress,
  onCaptchaToken,
}: Props, forwardedRef) {
  const container = useRef<HTMLDivElement>(null);
  const captchaRef = useRef<TurnstileHandle>(null);
  const codeInputId = useId();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [verificationToken, setVerificationToken] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [now, setNow] = useState(0);
  const cooldownLeft = Math.max(0, Math.ceil((cooldownUntil - now) / 1000));
  const updateCaptchaToken = useCallback((token: string) => onCaptchaToken?.(token), [onCaptchaToken]);

  useImperativeHandle(forwardedRef, () => ({
    getToken: () => captchaRef.current?.getToken() ?? Promise.resolve(""),
  }), []);

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
      setEmail("");
      setCode("");
      setVerificationToken("");
      setCodeSent(false);
      setStatus("");
      setCooldownUntil(0);
      setNow(0);
    };
    form.addEventListener("reset", resetVerification);
    if (!emailInput) return () => {
      form.removeEventListener("reset", resetVerification);
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
      form.removeEventListener("reset", resetVerification);
      emailInput.removeEventListener("input", clearProofWhenEmailChanges);
    };
  }, [email]);

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
      setBusy(true);
      setStatus("");
      setEmail(nextEmail);
      const response = await fetch("/api/verification/send-enquiry-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nextEmail }),
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
        <TurnstileWidget ref={captchaRef} onToken={updateCaptchaToken} />
        <button type="button" className={styles.secondary} onClick={sendCode} disabled={busy || cooldownLeft > 0}>
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
      <input type="hidden" name="emailVerificationToken" value={verificationToken} readOnly />
    </section>
  );
});

export default EmailOtpVerification;
