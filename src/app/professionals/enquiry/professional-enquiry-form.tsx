"use client";

import { useState } from "react";
import Link from "next/link";
import { practices } from "@/content/site";
import { professionals } from "../leadership";
import Icon from "@/app/_components/icon";
import styles from "./professional-enquiry.module.css";

const requestTypes = [
  ["specific", "A specific professional"],
  ["practice", "A practice area"],
  ["jurisdiction", "A jurisdiction"],
  ["general", "General enquiry"],
] as const;
const modes = [["email", "Email"], ["phone", "Phone"], ["online", "Online meeting"], ["in-person", "In-person meeting"]] as const;
const acceptedExtensions = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];

export default function EnquiryForm({ initialProfessional, initialService, industry, networkApplication = false }: { initialProfessional?: string; initialService?: string; industry?: string; networkApplication?: boolean }) {
  const [requestType, setRequestType] = useState<(typeof requestTypes)[number][0]>(initialProfessional ? "specific" : initialService ? "practice" : "general");
  const [mode, setMode] = useState<(typeof modes)[number][0]>("email");
  const [files, setFiles] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  function addFiles(incoming: FileList | File[]) {
    const next = [...files, ...Array.from(incoming)];
    if (next.length > 3 || next.some(file => file.size > 10 * 1024 * 1024 || !acceptedExtensions.includes(file.name.split(".").pop()?.toLowerCase() || "")) || next.reduce((total, file) => total + file.size, 0) > 20 * 1024 * 1024) {
      setStatus("Add up to three PDF, DOC, DOCX, JPG or PNG files. Each must be under 10 MB, with a 20 MB total limit.");
      setSuccess(false);
      return;
    }
    setFiles(next);
    setStatus("");
  }

  async function submit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (networkApplication) data.set("message", `Professional network application: ${message}`);
    files.forEach(file => data.append("documents", file));
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/professional-enquiry", { method: "POST", body: data });
      const result = await response.json();
      setStatus(response.ok && networkApplication ? "Thank you. Your professional profile has been received. Our team will review it and follow up." : result.message);
      setSuccess(response.ok);
      if (response.ok) {
        form.reset();
        setFiles([]);
        setMessage("");
        setRequestType("general");
        setMode("email");
      }
    } catch {
      setStatus("Your enquiry could not be sent. Please try again or email advisory@astronisglobal.com.");
      setSuccess(false);
    } finally {
      setBusy(false);
    }
  }

  return <form className={styles.form} onSubmit={submit}>
    <input type="hidden" name="industry" value={industry || ""} />
    <label className={styles.honey} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    {networkApplication ? <input type="hidden" name="connectWith" value="general" /> : <fieldset className={styles.requestTypes}><legend>I would like to connect with</legend><div className={styles.choices}>{requestTypes.map(([value,label]) => <label key={value} className={requestType === value ? styles.selected : ""}><input type="radio" name="connectWith" value={value} checked={requestType === value} onChange={() => setRequestType(value)} />{label}</label>)}</div></fieldset>}
    {!networkApplication && <div className={styles.gridTwo}>
      <label>Professional {requestType === "specific" && <em>*</em>}<select name="professional" defaultValue={initialProfessional || ""} required={requestType === "specific"}><option value="">Select a professional</option>{professionals.map(person => <option value={person.slug} key={person.slug}>{person.name} — {person.role}</option>)}</select></label>
      <label>Practice Area / Service {requestType === "practice" && <em>*</em>}<select name="service" defaultValue={initialService || ""} required={requestType === "practice"}><option value="">Select a practice area or service</option>{practices.map(practice => <option value={practice.slug} key={practice.slug}>{practice.title}</option>)}</select></label>
    </div>}
    <div className={styles.gridThree}>
      <label>Your Name <em>*</em><input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Enter your full name" /></label>
      <label>Organisation (if applicable)<input name="company" maxLength={160} autoComplete="organization" placeholder="Company / organisation name" /></label>
      <label>Email Address <em>*</em><input name="email" type="email" required maxLength={180} autoComplete="email" placeholder="name@yourdomain.com" /></label>
    </div>
    <div className={styles.gridTwo}>
      <label>Phone Number <em>*</em><span className={styles.phoneField}><select name="countryCode" aria-label="Country calling code" defaultValue="+91"><option value="+91">+91</option><option value="+1">+1</option><option value="+44">+44</option><option value="+65">+65</option><option value="+971">+971</option></select><input name="phone" type="tel" required minLength={7} maxLength={25} autoComplete="tel-national" placeholder="Enter your phone number" /></span></label>
      <label>Location {requestType === "jurisdiction" && <em>*</em>}<input name="location" required={requestType === "jurisdiction"} maxLength={160} autoComplete="address-level2" placeholder="City, state or jurisdiction" /></label>
    </div>
    <label className={styles.messageLabel}>{networkApplication ? "Professional Background & Areas of Expertise" : "Your Enquiry / Requirement"} <em>*</em><textarea name="message" required minLength={10} maxLength={networkApplication ? 960 : 1000} rows={5} value={message} onChange={event => setMessage(event.target.value)} placeholder={networkApplication ? "Tell us about your qualifications, practice, location and the collaboration you are interested in." : "Briefly describe your requirement, timeline and any specific questions."} /><small>{message.length}/{networkApplication ? 960 : 1000} characters</small></label>
    <div className={styles.preferences}><fieldset><legend>Preferred mode of communication</legend><div>{modes.map(([value,label]) => <label key={value} className={mode === value ? styles.activeMode : ""}><input type="radio" name="preferredMode" value={value} checked={mode === value} onChange={() => setMode(value)} />{label}</label>)}</div></fieldset><div className={styles.timeFields}><label>Preferred date<input type="date" name="preferredDate" /></label><label>Preferred time<input type="time" name="preferredTime" /></label></div></div>
    <div className={styles.uploadBlock}><span>Upload relevant documents (optional)</span><label className={styles.dropZone} onDragOver={event => event.preventDefault()} onDrop={event => { event.preventDefault(); addFiles(event.dataTransfer.files); }}><Icon name="file" /><span><strong>Click to upload</strong> or drag and drop<small>PDF, DOC, DOCX, JPG, PNG · Max 10 MB each · 3 files</small></span><input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={event => { if (event.target.files) addFiles(event.target.files); event.target.value = ""; }} /></label>{files.length > 0 && <ul className={styles.fileList}>{files.map((file,index) => <li key={`${file.name}-${index}`}><span>{file.name}</span><button type="button" onClick={() => setFiles(current => current.filter((_,itemIndex) => itemIndex !== index))} aria-label={`Remove ${file.name}`}>Remove</button></li>)}</ul>}</div>
    <label className={styles.consent}><input name="consent" type="checkbox" value="yes" required /><span>I agree to the processing of my personal data in accordance with the <Link href="/legal/privacy-policy">Privacy Policy</Link>.</span></label>
    <div className={styles.submitRow}><button type="submit" disabled={busy}>{busy ? "Sending…" : networkApplication ? "Submit Profile" : "Submit Enquiry"}<Icon name="arrow" /></button><p>{networkApplication ? "Our team will review your profile and contact you about suitable collaboration opportunities." : "Our team will review your enquiry and connect you with an appropriate professional."}</p></div>
    {status && <p role="status" className={success ? styles.success : styles.error}>{status}{!success && <a href="mailto:advisory@astronisglobal.com"> Email our team.</a>}</p>}
  </form>;
}
