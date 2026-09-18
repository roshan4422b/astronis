"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/app/_components/icon";
import styles from "./page.module.css";

const jurisdictions = ["India", "UAE", "Singapore", "United Kingdom", "United States", "European Union", "Middle East", "Other / Multiple Jurisdictions"];
const interests = ["Market Entry Support", "Regulatory & Compliance", "Cross-Border Transactions", "International Dispute Support", "International Partnerships", "Other / General Enquiry"];
const services = ["Corporate & Commercial Advisory", "FEMA, FDI & Foreign Exchange", "Regulatory & Compliance", "Legal & Dispute Resolution", "Business Advisory & Consulting", "Other / Not Sure Yet"];
const sectors = ["Banking & Financial Services", "Technology & Digital", "Healthcare & Pharmaceuticals", "Manufacturing & Industrial", "Real Estate & Infrastructure", "Retail & Consumer", "Other / Multiple Sectors"];

export default function EnquiryForm() {
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const file = data.get("attachment");
    if (file instanceof File && file.size > 10 * 1024 * 1024) {
      setStatus("Please choose a document smaller than 10 MB.");
      setSuccess(false);
      return;
    }
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/global-enquiry", { method: "POST", body: data });
      const result = await response.json();
      setStatus(result.message || "We could not send your enquiry. Please try again.");
      setSuccess(response.ok);
      if (response.ok) form.reset();
    } catch {
      setStatus("We could not send your enquiry. Please try again or email advisory@astronisglobal.com.");
      setSuccess(false);
    } finally {
      setBusy(false);
    }
  }

  return <section className={styles.formPanel} id="global-enquiry-form">
    <div className={styles.formHeading}><div><h2>Enquiry Form</h2><p>Please provide a few details so we can connect you with the right team.</p></div><small>Fields marked <b>*</b> are mandatory.</small></div>
    <form onSubmit={submit} className={styles.form}>
      <div className={styles.formGrid}>
        <label>Your Name <b>*</b><input name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Enter your name" /></label>
        <label>Your Organisation <b>*</b><input name="company" autoComplete="organization" required maxLength={160} placeholder="Enter organisation name" /></label>
        <label>Your Email <b>*</b><input name="email" type="email" autoComplete="email" required maxLength={180} placeholder="Enter your email address" /></label>
        <label>Contact Number <b>*</b><input name="phone" type="tel" autoComplete="tel" required maxLength={30} placeholder="Include country code" /></label>
        <label>Your Location<input name="location" autoComplete="country-name" maxLength={160} placeholder="Country or city" /></label>
        <label>Target Jurisdiction(s)<select name="jurisdiction" defaultValue=""><option value="">Select jurisdiction(s)</option>{jurisdictions.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Area of Interest <b>*</b><select name="interest" required defaultValue=""><option value="" disabled>Select area of interest</option>{interests.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Specific Service Requirement<select name="service" defaultValue=""><option value="">Select service (optional)</option>{services.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Industry Sector<select name="sector" defaultValue=""><option value="">Select industry (optional)</option>{sectors.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className={styles.message}>Brief Description of Your Requirement <b>*</b><textarea name="message" required minLength={10} maxLength={5000} rows={4} placeholder="Please share a brief overview of your requirement" /></label>
        <label>Timeline (if any)<select name="timeline" defaultValue=""><option value="">Select timeline</option><option>As soon as possible</option><option>Within 1 month</option><option>Within 3 months</option><option>Planning ahead</option><option>Flexible</option></select></label>
        <fieldset className={styles.preferences}><legend>Preferred Mode of Communication</legend>{["Email", "Phone", "Virtual Meeting", "In-Person Meeting"].map((mode) => <label key={mode}><input type="checkbox" name="communication" value={mode} /> {mode}</label>)}</fieldset>
        <label className={styles.upload}>Upload Supporting Documents (Optional)<input type="file" name="attachment" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" /><small>Max file size: 10 MB (PDF, DOC, DOCX, JPG, PNG)</small></label>
        <label className={styles.honey} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <label className={styles.consent}><input type="checkbox" name="consent" value="yes" required /><span>I agree to the processing of my personal data in accordance with the <Link href="/legal/privacy-policy">Privacy Policy</Link> of Astronis Global. <b>*</b></span></label>
      <div className={styles.formActions}><button type="submit" disabled={busy}>{busy ? "Sending…" : "Submit Enquiry"}<Icon name="arrow" /></button><span><Icon name="shield" /> Your information is secure with us.</span></div>
      {status && <p className={success ? styles.success : styles.error} role="status">{status}{!success && <> <a href="mailto:advisory@astronisglobal.com">Email our team</a></>}</p>}
    </form>
  </section>;
}
