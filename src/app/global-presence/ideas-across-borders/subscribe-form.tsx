"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/app/_components/icon";
import styles from "./page.module.css";

export default function SubscribeForm() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  async function subscribe(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/insights-subscribe", { method: "POST", body: new FormData(form) });
      const result = await response.json();
      setStatus(result.message || "We could not process your request.");
      if (response.ok) form.reset();
    } catch {
      setStatus("We could not process your request. Please try again later.");
    } finally {
      setBusy(false);
    }
  }

  return <form className={styles.subscribeForm} onSubmit={subscribe}><div><label className={styles.srOnly} htmlFor="insights-email">Your email address</label><input id="insights-email" name="email" type="email" autoComplete="email" placeholder="Your Email Address" required maxLength={180} /><button type="submit" disabled={busy}>{busy ? "Sending…" : "Request Updates"}<Icon name="arrow" /></button></div><label className={styles.subscribeConsent}><input type="checkbox" name="consent" value="yes" required /> I agree to be contacted about insights and updates. <Link href="/legal/privacy-policy">Privacy Policy</Link></label>{status && <p role="status">{status}</p>}</form>;
}
