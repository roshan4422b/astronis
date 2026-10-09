"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "@/components/forms/formStyles.module.css";
import FormInput from "@/components/forms/shared/FormInput";
import FormSelect from "@/components/forms/shared/FormSelect";
import FormTextarea from "@/components/forms/shared/FormTextarea";
import PhoneInput from "@/components/forms/shared/PhoneInput";

const interestOptions = [
  { value: "Business Advisory", label: "Business Advisory" },
  { value: "Legal & Regulatory Support", label: "Legal & Regulatory Support" },
  { value: "Industry Advisory", label: "Industry Advisory" },
  { value: "Technology & Digital Solutions", label: "Technology & Digital Solutions" },
  { value: "Compliance & Licensing", label: "Compliance & Licensing" },
  { value: "Cross-Border Support", label: "Cross-Border Support" },
  { value: "Other", label: "Other" },
];

export default function HomeEnquiryForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    interest: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const updateField = (field: keyof typeof form, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;

    const nextErrors: Record<string, string> = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) nextErrors.email = "Please enter a valid email.";
    if (!form.phone.trim()) nextErrors.phone = "Please enter your phone or WhatsApp number.";
    if (!form.interest) nextErrors.interest = "Please choose what you are looking for.";
    if (!form.consent) nextErrors.consent = "Please confirm consent before submitting.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setBusy(true);
      setStatus("");

      const params = new URLSearchParams(window.location.search);
      const payload = {
        formType: "home",
        name: form.fullName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        company: form.company.trim(),
        country: "India",
        requirement: form.interest,
        category: "home",
        message: (form.message || `Home enquiry: ${form.interest}`).trim(),
        pageUrl: window.location.href,
        pathname: window.location.pathname,
        pageTitle: document.title || "Astronis Global",
        referrer: document.referrer || "",
        consent: "yes",
        website: "",
        utmSource: params.get("utm_source") || "",
        utmMedium: params.get("utm_medium") || "",
        utmCampaign: params.get("utm_campaign") || "",
      };

      const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || data?.success !== true) {
        throw new Error(data?.message || "We couldn't submit your enquiry.");
      }

      setSuccess(true);
      setForm({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        interest: "",
        message: "",
        consent: false,
      });
      setStatus("Thank you for contacting Astronis Global. Your enquiry has been received. Our team will review your requirement and connect you with the appropriate professional.");
    } catch (error) {
      setSuccess(false);
      setStatus(error instanceof Error ? error.message : "We couldn't submit your enquiry right now. Please try again or contact us at advisory@astronisglobal.com.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div id="home-enquiry" className={styles.formShell}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Start a conversation</span>
        <h3 className={styles.title}>How Can We Help You?</h3>
        <p className={styles.description}>Tell us a little about your requirement and our team will connect you with the right professional.</p>
      </div>

      <form className={styles.form} onSubmit={submit} noValidate>
        <div className={styles.grid}>
          <FormInput id="home-full-name" label="Full Name *" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} error={errors.fullName} autoComplete="name" placeholder="Enter your full name" />
          <FormInput id="home-email" label="Email *" type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} error={errors.email} autoComplete="email" placeholder="you@company.com" />
          <PhoneInput label="Phone / WhatsApp *" id="home-phone" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} error={errors.phone} placeholder="+91 98765 43210" />
          <FormInput id="home-company" label="Company / Organisation" value={form.company} onChange={(event) => updateField("company", event.target.value)} autoComplete="organization" placeholder="Your organisation name" />
          <div className={styles.fullWidth}>
            <FormSelect id="home-interest" label="What are you looking for? *" value={form.interest} onChange={(event) => updateField("interest", event.target.value)} error={errors.interest} options={interestOptions} placeholder="Select an option" />
          </div>
          <div className={styles.fullWidth}>
            <FormTextarea id="home-message" label="Message / Requirement" value={form.message} onChange={(event) => updateField("message", event.target.value)} placeholder="Tell us a little more about your requirement" />
          </div>
        </div>

        <label className={styles.inline} htmlFor="home-consent">
          <input id="home-consent" type="checkbox" checked={form.consent} onChange={(event) => updateField("consent", event.target.checked)} aria-invalid={Boolean(errors.consent)} />
          <span className={styles.inlineText}>I consent to Astronis Global contacting me regarding my enquiry. <Link href="/legal/privacy-policy" className={styles.link}>Privacy Policy</Link></span>
        </label>
        {errors.consent ? <div className={styles.errorText}>{errors.consent}</div> : null}

        <div style={{ width: "100%" }}>
          <button type="submit" className={styles.button} disabled={busy}>
            {busy ? "Sending..." : "Send Enquiry"}
          </button>
        </div>

        {status ? (
          <div className={`${styles.status} ${success ? styles.statusSuccess : styles.statusError}`} role="status" aria-live="polite">
            {status}
          </div>
        ) : null}

        <input type="text" name="website" className={styles.honeypot} tabIndex={-1} autoComplete="off" />
      </form>
    </div>
  );
}
