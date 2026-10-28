"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import styles from "./reset-password.module.css";

type Mode = "checking" | "request" | "reset" | "success";
type BusyAction = "request" | "reset" | null;

export default function ResetPasswordPage() {
  const [mode, setMode] = useState<Mode>("checking");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState<BusyAction>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get("status");
    const linkError = status === "expired"
      ? "This recovery link has expired or has already been used. Request a new email below."
      : status === "invalid"
        ? "This recovery link is invalid. Request a new email below."
        : "";

    let active = true;
    fetch("/api/admin/auth/recovery", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : { valid: false })
      .then((result: { valid?: boolean }) => {
        if (active) {
          if (linkError) setError(linkError);
          setMode(result.valid ? "reset" : "request");
        }
      })
      .catch(() => {
        if (active) {
          setMode("request");
          setError(linkError || "We could not verify this recovery session. Request a new recovery email to continue.");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  async function requestRecovery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    setRequestSent(false);
    setBusy("request");
    try {
      const response = await fetch("/api/admin/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not send a recovery email.");
      setRequestSent(true);
      setMessage(result.message);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "We could not send a recovery email.");
    } finally {
      setBusy(null);
    }
  }

  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (password.length < 8 || password.length > 128) {
      setError("Use a password between 8 and 128 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setBusy("reset");
    try {
      const response = await fetch("/api/admin/auth/recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, confirmPassword }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "We could not update your password.");
      setPassword("");
      setConfirmPassword("");
      setMode("success");
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "We could not update your password.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="reset-heading">
        <Link className={styles.brand} href="/admin/login">
          <span className={styles.mark}>A</span>
          <span><strong>ASTRONIS</strong><small>GLOBAL · ADMIN</small></span>
        </Link>

        <div className={styles.heading}>
          <span>ADMINISTRATOR WORKSPACE</span>
          <h1 id="reset-heading">
            {mode === "request" ? "Reset your password" : mode === "success" ? "Password updated" : "Choose a new password"}
          </h1>
          <p>
            {mode === "request"
              ? "Enter your admin email and we will send a secure recovery link."
              : mode === "success"
                ? "Your password has been changed. You can now sign in."
                : "Enter and confirm your new password to finish recovery."}
          </p>
        </div>

        {mode === "checking" ? <p className={styles.notice} role="status">Checking your recovery link…</p> : null}

        {mode === "request" ? (
          <form onSubmit={requestRecovery}>
            <label className={styles.field}>
              <span>Email address</span>
              <input
                autoComplete="email"
                type="email"
                required
                maxLength={254}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
              />
            </label>
            <button className={styles.submit} type="submit" disabled={busy !== null}>
              {busy === "request" ? "Sending email…" : requestSent ? "Send another recovery email" : "Send recovery email"}
            </button>
            {requestSent ? <p className={styles.notice} role="status">{message}</p> : null}
          </form>
        ) : null}

        {mode === "reset" ? (
          <form onSubmit={updatePassword}>
            <label className={styles.field}>
              <span>New password</span>
              <input
                autoComplete="new-password"
                type="password"
                required
                minLength={8}
                maxLength={128}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span>Confirm password</span>
              <input
                autoComplete="new-password"
                type="password"
                required
                minLength={8}
                maxLength={128}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </label>
            <button className={styles.submit} type="submit" disabled={busy !== null}>
              {busy === "reset" ? "Updating password…" : "Update password"}
            </button>
          </form>
        ) : null}

        {mode === "success" ? (
          <p className={styles.notice} role="status">Your password was updated successfully.</p>
        ) : null}

        {error ? <p className={styles.error} role="alert">{error}</p> : null}
        {mode === "success" ? (
          <Link className={styles.link} href="/admin/login">Return to admin sign in</Link>
        ) : mode !== "checking" ? (
          <Link className={styles.link} href="/admin/login">Return to admin sign in</Link>
        ) : null}
        <div className={styles.footer}>Astronis Global · Content workspace</div>
      </section>
    </main>
  );
}
