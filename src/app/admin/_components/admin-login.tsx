"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AdminIcon } from "./admin-ui";
import styles from "./admin-login.module.css";

const workspaceFeatures = [
  {
    icon: "services",
    title: "Corporate & Commercial",
    description: "Access corporate documentation and business management resources.",
  },
  {
    icon: "shieldCheck",
    title: "Regulatory & Compliance",
    description: "Manage regulatory information and compliance-related resources.",
  },
  {
    icon: "chart",
    title: "Business Advisory",
    description: "Access strategic business insights and advisory resources.",
  },
  {
    icon: "layout",
    title: "Digital Workspace",
    description: "Manage website content and administrative operations efficiently.",
  },
] as const;

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload) => {
        setConfigured(Boolean(payload.configured));
        if (payload.authenticated === true) window.location.assign("/admin");
      })
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
      window.location.assign("/admin");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Sign in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={styles.page} aria-label="Astronis Global administrator sign in">
      <section className={styles.brandPanel} aria-labelledby="brand-heading">
        <div className={styles.brandTop}>
          <Link href="/" className={styles.logoLink} aria-label="Astronis Global home">
            <Image
              src="/astronis_logo.jpeg"
              alt="Astronis Global"
              width={1600}
              height={600}
              className={styles.logo}
              priority
            />
          </Link>
          <Link href="/" className={styles.backLink}>
            <AdminIcon name="arrowLeft" size={16} />
            <span>Back to website</span>
          </Link>
        </div>

        <div className={styles.brandContent}>
          <div className={styles.brandCopy}>
            <span className={styles.eyebrow}>A trusted workspace for meaningful progress</span>
            <h1 className={styles.brandHeading} id="brand-heading">
              Empowering Businesses Through Strategic Excellence
            </h1>
            <p>
              Your gateway to a smarter, more connected business workspace. Access your
              administrative tools and manage digital content with confidence.
            </p>
          </div>

          <div className={styles.visual} role="img" aria-label="Professionals collaborating in a modern global office">
            <Image
              src="/corporate-regulatory-hero.png"
              alt=""
              fill
              sizes="(max-width: 720px) 100vw, 52vw"
              className={styles.visualImage}
              priority
            />
            <span className={styles.visualCaption}>
              <AdminIcon name="globe" size={17} />
              <span>Local insight. Global perspective.</span>
            </span>
          </div>

          <div className={styles.featureGrid}>
            {workspaceFeatures.map((feature) => (
              <article className={styles.featureCard} key={feature.title}>
                <span className={styles.featureIcon}>
                  <AdminIcon name={feature.icon} size={20} />
                </span>
                <span className={styles.featureCopy}>
                  <strong>{feature.title}</strong>
                  <small>{feature.description}</small>
                </span>
              </article>
            ))}
          </div>
        </div>

        <p className={styles.brandFooter}>© 2026 Astronis Global. All rights reserved.</p>
      </section>

      <section className={styles.loginPanel} aria-labelledby="welcome-heading">
        <div className={styles.loginContent}>
          <header className={styles.welcome}>
            <span className={styles.loginEyebrow}>Administrator workspace</span>
            <h2 className={styles.welcomeHeading} id="welcome-heading">
              Welcome Back
            </h2>
            <p>Sign in to your administrator workspace.</p>
          </header>

          <div className={styles.loginCard}>
            <form onSubmit={submit} noValidate>
              <label className={styles.field}>
                <span>Email Address</span>
                <span className={styles.inputWrap}>
                  <AdminIcon name="mail" size={18} />
                  <input
                    aria-label="Email Address"
                    aria-describedby={errors.email ? "admin-email-error" : undefined}
                    autoComplete="username"
                    autoCapitalize="none"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setErrors((current) => ({ ...current, email: "" }));
                    }}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                  />
                </span>
                {errors.email ? (
                  <small id="admin-email-error" className={styles.error}>
                    {errors.email}
                  </small>
                ) : null}
              </label>

              <label className={styles.field}>
                <span>Password</span>
                <span className={styles.inputWrap}>
                  <AdminIcon name="lock" size={18} />
                  <input
                    aria-label="Password"
                    aria-describedby={errors.password ? "admin-password-error" : undefined}
                    autoComplete="current-password"
                    type={visible ? "text" : "password"}
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setErrors((current) => ({ ...current, password: "" }));
                    }}
                    placeholder="Enter your password"
                    aria-invalid={Boolean(errors.password)}
                  />
                  <button
                    className={styles.visibilityButton}
                    type="button"
                    aria-label={visible ? "Hide password" : "Show password"}
                    aria-pressed={visible}
                    onClick={() => setVisible((current) => !current)}
                  >
                    <AdminIcon name="eye" size={18} />
                  </button>
                </span>
                {errors.password ? (
                  <small id="admin-password-error" className={styles.error}>
                    {errors.password}
                  </small>
                ) : null}
              </label>

              <div className={styles.formOptions}>
                <label className={styles.remember}>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                  />
                  <span>Remember Me</span>
                </label>
                <Link href="/auth/reset-password" className={styles.forgotLink}>
                  Forgot Password?
                </Link>
              </div>

              <button
                className={styles.submitButton}
                type="submit"
                disabled={submitting || configured === false}
              >
                <span>{submitting ? "Signing in..." : "Sign In"}</span>
                <AdminIcon name="arrow" size={17} />
              </button>
              {message ? (
                <p className={styles.message} role="status">
                  {message}
                </p>
              ) : null}
            </form>

            <aside className={styles.securityNotice} aria-label="Administrator security notice">
              <span className={styles.securityIcon}>
                <AdminIcon name="shieldCheck" size={20} />
              </span>
              <span>
                <strong>{configured === false ? "Authentication is not configured" : "Secure Administrator Access"}</strong>
                <small>
                  {configured === false
                    ? "Set the Supabase URL and anon key to enable admin authentication."
                    : "This workspace is exclusively available to authorised Astronis Global administrators. Only accounts approved for CMS access can sign in."}
                </small>
              </span>
            </aside>
          </div>

          <Link href="/" className={styles.returnLink}>
            Return to Astronis Global Website
            <AdminIcon name="arrow" size={15} />
          </Link>
        </div>

        <p className={styles.panelFooter}>Astronis Global · Administrator Workspace</p>
      </section>
    </section>
  );
}
