"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminIcon } from "./admin-ui";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/admin/auth", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload) => setConfigured(Boolean(payload.configured)))
      .catch(() => setConfigured(false));
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = {
      email: !email.trim()
        ? "Enter your email address."
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
          ? ""
          : "Enter a valid email address.",
      password: password ? "" : "Enter your password.",
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) {
      setMessage("");
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe: remember }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Sign in failed.");
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Sign in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return <section className="admin-login-card">
    <Link href="/admin" className="admin-login-brand" aria-label="Astronis Global admin access">
      <img src="/astronis_logo.jpeg" alt="Astronis Global" className="admin-login-logo" />
    </Link>
    <div className="admin-login-heading"><span>ADMINISTRATOR WORKSPACE</span><h1>Welcome back</h1><p>Sign in to continue to your workspace.</p></div>
    <form onSubmit={submit} noValidate>
      <label className="admin-login-field"><span>Email address</span><div className="admin-login-input"><AdminIcon name="mail" size={17} /><input aria-label="Email address" aria-describedby={errors.email ? "admin-email-error" : undefined} autoComplete="username" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setErrors((current) => ({ ...current, email: "" })); }} placeholder="you@company.com" aria-invalid={Boolean(errors.email)} /></div>{errors.email ? <small id="admin-email-error" className="admin-login-error">{errors.email}</small> : null}</label>
      <label className="admin-login-field"><span>Password</span><div className="admin-login-input"><AdminIcon name="lock" size={17} /><input aria-label="Password" aria-describedby={errors.password ? "admin-password-error" : undefined} autoComplete="current-password" type={visible ? "text" : "password"} value={password} onChange={(event) => { setPassword(event.target.value); setErrors((current) => ({ ...current, password: "" })); }} placeholder="Enter your password" aria-invalid={Boolean(errors.password)} /><button type="button" aria-label={visible ? "Hide password" : "Show password"} onClick={() => setVisible(!visible)}><AdminIcon name="eye" size={17} /></button></div>{errors.password ? <small id="admin-password-error" className="admin-login-error">{errors.password}</small> : null}</label>
      <div className="admin-login-row">
        <Link className="admin-login-return" href="/auth/reset-password">Forgot password?</Link>
        <label className="admin-remember"><input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} /><span>Remember me</span></label>
      </div>
      <button className="admin-button admin-login-submit" type="submit" disabled={submitting || configured === false}>{submitting ? "Signing in…" : "Sign in"} <AdminIcon name="arrow" size={16} /></button>
      {message ? <p className="admin-login-message" role="status">{message}</p> : null}
    </form>
    <div className="admin-login-dev"><span><AdminIcon name="lock" size={15} /></span><p><strong>{configured === false ? "CMS is not configured" : "Invite-only access"}</strong><br />{configured === false ? "Set the Supabase URL and anon key to enable admin authentication." : "Only accounts explicitly added to the CMS administrator allowlist can sign in."}</p></div>
    <Link className="admin-login-return" href="/">Return to website</Link>
    <div className="admin-login-footer">Astronis Global · Content workspace</div>
  </section>;
}
