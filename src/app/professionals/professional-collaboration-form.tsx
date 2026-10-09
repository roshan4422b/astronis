"use client";

import { useState, type FormEvent } from "react";
import Icon from "../_components/icon";
import styles from "./professional-collaboration.module.css";

const professionalTypes = [
  "Law Firm",
  "Advocate / Legal Professional",
  "Chartered Accountant",
  "Company Secretary",
  "Consultant",
  "Industry Expert",
  "Academic / Research Professional",
  "International Professional Firm",
  "Other Professional",
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

const allowedExtensions = new Set(["pdf", "doc", "docx"]);

export default function CollaborationForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  function selectFile(selected: File | undefined, input: HTMLInputElement) {
    if (!selected) {
      setFile(null);
      return;
    }
    const extension = selected.name.split(".").pop()?.toLowerCase() || "";
    if (!allowedExtensions.has(extension) || selected.size > 5 * 1024 * 1024) {
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
    data.set("collaborationEnquiry", "yes");
    if (file) data.append("documents", file);

    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/professional-enquiry", { method: "POST", body: data });
      const result = await response.json() as { message?: string };
      setSuccess(response.ok);
      setStatus(result.message || (response.ok
        ? "Thank you. Your enquiry has been received."
        : "Please check the required fields and try again."));
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

  return <form onSubmit={submit}>
    <input type="hidden" name="industry" value="" />
    <input type="hidden" name="connectWith" value="general" />
    <div className={styles.formFields}>
      <label><span>Name *</span><input name="name" autoComplete="name" required minLength={2} maxLength={100} /></label>
      <label><span>Organisation / Firm *</span><input name="company" autoComplete="organization" required maxLength={160} /></label>
      <label><span>Email *</span><input name="email" type="email" autoComplete="email" required maxLength={180} /></label>
      <label><span>Phone *</span><input name="phone" type="tel" autoComplete="tel" required minLength={7} maxLength={25} /></label>
      <label><span>Professional Type *</span><select name="professionalType" required defaultValue=""><option value="" disabled>Select</option>{professionalTypes.map(type => <option key={type}>{type}</option>)}</select></label>
      <label className={styles.wideField}><span>Practice Area / Expertise *</span><select name="service" required defaultValue=""><option value="" disabled>Select</option>{practices.map(practice => <option key={practice}>{practice}</option>)}</select></label>
      <label className={styles.wideField}><span>Jurisdiction / Location *</span><input name="location" required maxLength={160} placeholder="City, state or country" /></label>
      <label className={styles.messageField}><span>Brief About Collaboration Opportunity *</span><textarea name="message" required minLength={10} maxLength={1000} rows={3} /></label>
      <label className={styles.uploadField}><span>Upload Supporting Document</span><input type="file" accept=".pdf,.doc,.docx" onChange={event => selectFile(event.currentTarget.files?.[0], event.currentTarget)} /><small>PDF, DOC, DOCX, up to 5 MB{file ? ` · ${file.name}` : ""}</small></label>
    </div>
    <label className={styles.consent}><input name="consent" type="checkbox" value="yes" required /><span>I consent to Astronis Global processing the information submitted for responding to this enquiry.</span></label>
    <button className={styles.submitButton} type="submit" disabled={busy}>{busy ? "Submitting..." : "Submit Enquiry"} <Icon name="arrow" /></button>
    {status && <p className={styles.formStatus} data-success={success} role="status">{status}</p>}
  </form>;
}
