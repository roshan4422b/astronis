"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/app/_components/icon";
import styles from "./page.module.css";

const interests = ["Referral Partnership", "Strategic Alliance", "Co-Counsel Arrangement", "Knowledge Collaboration", "Other Partnership Opportunity"];

export default function PartnershipForm() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      formType: "service",
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      service: String(formData.get("service") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      consent: formData.get("consent") ? "yes" : "",
      website: "",
      pageUrl: window.location.href,
      pageTitle: document.title || "Astronis Global",
      pathname: window.location.pathname,
      referrer: document.referrer || "",
      utmSource: new URLSearchParams(window.location.search).get("utm_source") || "",
      utmMedium: new URLSearchParams(window.location.search).get("utm_medium") || "",
      utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || "",
    };

    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data?.success !== true) {
        throw new Error(data?.message || "We could not send your enquiry. Please try again.");
      }
      setStatus(data.message || "Your enquiry has been submitted successfully.");
      setSuccess(true);
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "We could not send your enquiry. Please try again or email advisory@astronisglobal.com.");
      setSuccess(false);
    } finally {
      setBusy(false);
    }
  }

  return <form className={styles.form} onSubmit={submit}><h3>Send Us an Enquiry</h3><p className={styles.formIntro}>Share a few details and we&apos;ll connect you with the right team.</p><div className={styles.fields}>
    <label><span>Your Name <b>*</b></span><input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Enter your full name" /></label>
    <label><span>Your Organisation <b>*</b></span><input name="company" autoComplete="organization" required maxLength={160} placeholder="Firm or organisation name" /></label>
    <label><span>Email Address <b>*</b></span><input name="email" type="email" autoComplete="email" required maxLength={180} placeholder="you@organisation.com" /></label>
    <label><span>Contact Number</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="Include country code" /></label>
    <label className={styles.full}><span>Area of Interest <b>*</b></span><select name="service" required defaultValue=""><option value="" disabled>Select a partnership model</option>{interests.map((interest) => <option key={interest}>Global Partnership: {interest}</option>)}</select></label>
    <label className={styles.message}><span>Your Message <b>*</b></span><textarea name="message" required minLength={10} maxLength={5000} placeholder="Tell us about your expertise and partnership goals" rows={4} /></label>
    <label className={styles.honey} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
  </div><label className={styles.consent}><input name="consent" type="checkbox" value="yes" required /><span>I agree to the processing of my information under the <Link href="/legal/privacy-policy">Privacy Policy</Link>.</span></label><button type="submit" disabled={busy}>{busy ? "Sending…" : "Submit Enquiry"}<Icon name="arrow" /></button><p className={styles.formNote}>Your information is treated as confidential.</p>{status && <p role="status" className={success ? styles.success : styles.error}>{status}{!success && <> <a href="mailto:advisory@astronisglobal.com">Email our team</a></>}</p>}</form>;
}
