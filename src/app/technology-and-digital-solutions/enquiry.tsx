"use client";

import { useState } from "react";
import Icon from "../_components/icon";
import styles from "./technology.module.css";

export default function Enquiry({ defaultService = "Technology & Digital Solutions" }: { defaultService?: string }) {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const solution = new URLSearchParams(window.location.search).get("solution");
    data.set("service", solution?.slice(0, 160) || defaultService);
    if (!String(data.get("message") || "").trim()) data.set("message", "Please contact me to discuss our technology and digital solution requirements.");
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/enquiry", { method: "POST", body: data });
      const result = await response.json();
      setStatus(result.message);
      setSuccess(response.ok);
      if (response.ok) form.reset();
    } catch {
      setSuccess(false);
      setStatus("Your enquiry could not be sent. Please try again or email advisory@astronisglobal.com.");
    } finally { setBusy(false); }
  }

  return <form className={styles.form} onSubmit={submit}>
    <div className={styles.formGrid}>
      <label><span className={styles.formLabel}>Full name *</span><input name="name" placeholder="Your Name *" autoComplete="name" required minLength={2} maxLength={100} /></label>
      <label><span className={styles.formLabel}>Organisation *</span><input name="company" placeholder="Your Organisation *" autoComplete="organization" required maxLength={160} /></label>
      <label><span className={styles.formLabel}>Email address *</span><input name="email" placeholder="Your Email *" type="email" autoComplete="email" required maxLength={180} /></label>
      <label><span className={styles.formLabel}>Contact Number</span><input name="phone" placeholder="Contact Number" type="tel" autoComplete="tel" maxLength={30} /></label>
      <label className={styles.full}><span className={styles.formLabel}>Your message (optional)</span><textarea name="message" placeholder="Your Message (Optional)" rows={5} minLength={10} maxLength={5000} /></label>
    </div>
    <label className={styles.honey} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    <label className={styles.consent}><input name="consent" type="checkbox" value="yes" required />I consent to Astronis Global contacting me about my enquiry.</label>
    <button className={styles.button} type="submit" disabled={busy}>{busy ? "Sending…" : "Submit Enquiry"}<Icon name="arrow" /></button>
    {status && <p className={styles.status} role="status">{status}{!success && <> <a href="mailto:advisory@astronisglobal.com">Email our team</a></>}</p>}
  </form>;
}
