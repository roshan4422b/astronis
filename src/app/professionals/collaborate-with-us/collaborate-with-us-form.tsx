"use client";

import { useState, type FormEvent } from "react";
import Icon from "@/app/_components/icon";
import styles from "./collaborate-with-us.module.css";

const professionalTypes = [
  "Law Firm",
  "Advocate / Legal Professional",
  "Chartered Accountant (CA)",
  "Company Secretary (CS)",
  "Regulatory & Policy Consultant",
  "Industry & Subject-Matter Expert",
  "Academic / Research Professional",
  "Consultant / Advisory Firm",
  "International Professional / Firm",
  "Strategic / Referral Partner",
];
const practices = [
  "Corporate & Commercial",
  "Regulatory & Compliance",
  "Dispute Resolution",
  "Tax & Cross-Border Transactions",
  "Banking, Finance & Capital Markets",
  "ESG, Sustainability & Risk",
  "Sector-Focused Advisory",
];
const jurisdictions = ["India", "United States", "United Kingdom", "UAE", "Singapore", "European Union", "Other"];
const interests = ["Client Referrals", "Joint Assignments", "International Matters", "Knowledge Sharing", "Strategic Partnership", "Other"];
const extensions = new Set(["pdf", "doc", "docx"]);

export default function CollaborateWithUsForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  function handleFile(input: HTMLInputElement) {
    const selected = input.files?.[0];
    if (!selected) {
      setFile(null);
      return;
    }
    const extension = selected.name.split(".").pop()?.toLowerCase() || "";
    if (!extensions.has(extension) || selected.size > 5 * 1024 * 1024) {
      input.value = "";
      setFile(null);
      setSuccess(false);
      setStatus("Upload one PDF, DOC or DOCX file up to 5 MB.");
      return;
    }
    setFile(selected);
    setStatus("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("connectWith", "general");
    data.set("collaborateWithUs", "yes");
    if (file) data.append("documents", file);
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/professional-enquiry", { method: "POST", body: data });
      const result = await response.json() as { message?: string };
      setSuccess(response.ok);
      setStatus(result.message || (response.ok ? "Thank you. Your enquiry has been received." : "Please check the required fields and try again."));
      if (response.ok) {
        form.reset();
        setFile(null);
      }
    } catch {
      setSuccess(false);
      setStatus("Your enquiry could not be sent. Please try again or email advisory@astronisglobal.com.");
    } finally {
      setBusy(false);
    }
  }

  return <form className={styles.form} onSubmit={submit}>
    <input type="hidden" name="industry" value="" />
    <input type="hidden" name="connectWith" value="general" />
    <div className={styles.formGrid}>
      <label><span>Name *</span><input name="name" autoComplete="name" placeholder="Your Name" required minLength={2} maxLength={100} /></label>
      <label><span>Organisation / Firm *</span><input name="company" autoComplete="organization" placeholder="Company / Firm Name" required maxLength={160} /></label>
      <label><span>Email *</span><input name="email" type="email" autoComplete="email" placeholder="Your Email" required maxLength={180} /></label>
      <label><span>Phone *</span><input name="phone" type="tel" autoComplete="tel" placeholder="Your Phone Number" required minLength={7} maxLength={25} /></label>
      <label><span>Professional Type *</span><select name="professionalType" defaultValue="" required><option value="" disabled>Select Type</option>{professionalTypes.map(item => <option key={item}>{item}</option>)}</select></label>
      <label><span>Practice Area / Expertise *</span><select name="service" defaultValue="" required><option value="" disabled>Select Practice Area</option>{practices.map(item => <option key={item}>{item}</option>)}</select></label>
      <label><span>Jurisdiction / Location</span><select name="location" defaultValue=""><option value="">Select Jurisdiction</option>{jurisdictions.map(item => <option key={item}>{item}</option>)}</select></label>
      <label><span>Collaboration Interest *</span><select name="collaborationInterest" defaultValue="" required><option value="" disabled>Select Option</option>{interests.map(item => <option key={item}>{item}</option>)}</select></label>
      <label className={styles.messageField}><span>Brief About Collaboration Opportunity *</span><textarea name="message" rows={3} placeholder="Please describe how we can collaborate..." required minLength={10} maxLength={1000} /></label>
      <label className={styles.uploadField}><span>Upload Profile / Brochure (Optional)</span><input type="file" accept=".pdf,.doc,.docx" onChange={event => handleFile(event.currentTarget)} /><small>PDF, DOC, DOCX (Max 5 MB){file ? ` · ${file.name}` : ""}</small></label>
    </div>
    <label className={styles.consent}><input type="checkbox" name="consent" value="yes" required /><span>I consent to Astronis Global processing the information submitted for responding to this enquiry.</span></label>
    <button type="submit" className={styles.submitButton} disabled={busy}>{busy ? "Submitting..." : "Submit Enquiry"} <Icon name="arrow" /></button>
    {status && <p className={styles.formStatus} data-success={success} role="status">{status}</p>}
  </form>;
}
