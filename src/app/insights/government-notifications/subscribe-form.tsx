"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import Icon from "@/app/_components/icon";
import styles from "../gst-updates.module.css";

export default function SubscribeForm() {
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/insights-subscribe", {
        method: "POST",
        body: new FormData(form),
      });
      const result: { message?: string } = await response.json();
      setStatus(result.message || "We could not process your request.");
      if (response.ok) form.reset();
    } catch {
      setStatus("We could not send your request. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={subscribe}>
      <div>
        <label className={styles.srOnly} htmlFor="gov-email">
          Email address
        </label>
        <input
          id="gov-email"
          name="email"
          type="email"
          placeholder="Enter your email address"
          required
          maxLength={180}
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Subscribe"} <Icon name="arrow" />
        </button>
      </div>
      <label className={styles.consent}>
        <input type="checkbox" name="consent" value="yes" required />
        I agree to receive updates. <Link href="/legal/privacy-policy">Privacy Policy</Link>
      </label>
      {status && <p role="status">{status}</p>}
    </form>
  );
}
