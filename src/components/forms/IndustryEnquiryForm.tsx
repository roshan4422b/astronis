"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "@/components/forms/formStyles.module.css";
import FormInput from "@/components/forms/shared/FormInput";
import FormSelect from "@/components/forms/shared/FormSelect";
import FormTextarea from "@/components/forms/shared/FormTextarea";
import PhoneInput from "@/components/forms/shared/PhoneInput";
import { industryFormConfig } from "@/data/industryFormConfig";

const countryOptions = [
  { value: "India", label: "India" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "Singapore", label: "Singapore" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States", label: "United States" },
  { value: "Australia", label: "Australia" },
  { value: "Canada", label: "Canada" },
  { value: "Germany", label: "Germany" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "Other", label: "Other" },
];

const contactOptions = [
  { value: "Phone", label: "Phone" },
  { value: "WhatsApp", label: "WhatsApp" },
  { value: "Email", label: "Email" },
  { value: "Video Meeting", label: "Video Meeting" },
];

const inferIndustryFromPath = (pathname: string) => {
  const slug = decodeURIComponent(pathname.split("/").filter(Boolean).at(-1) || "");
  if (!slug) return "";
  return industryFormConfig.find((industry) => industry.id === slug || industry.label.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug)?.label || "";
};

export default function IndustryEnquiryForm({ defaultIndustry = "" }: { defaultIndustry?: string }) {
  const pathname = usePathname();
  const resolvedIndustry = defaultIndustry || inferIndustryFromPath(pathname || "");
  const [form, setForm] = useState({
    fullName: "",
    businessEmail: "",
    phone: "",
    company: "",
    designation: "",
    industry: resolvedIndustry,
    country: "India",
    city: "",
    requirement: "",
    requirementDetails: "",
    preferredContact: "Email",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  const industryConfig = useMemo(
    () => industryFormConfig.find((industry) => industry.label === form.industry) ?? null,
    [form.industry],
  );

  const updateField = (field: keyof typeof form, value: string | boolean) => {
    if (field === "industry") {
      setForm((current) => ({ ...current, industry: String(value), requirement: "" }));
      setErrors((current) => ({ ...current, industry: "", requirement: "" }));
      return;
    }

    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;

    const nextErrors: Record<string, string> = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.businessEmail.trim())) nextErrors.businessEmail = "Please enter your business email.";
    if (!form.phone.trim()) nextErrors.phone = "Please enter your phone or WhatsApp number.";
    if (!form.company.trim()) nextErrors.company = "Please enter your company or organisation.";
    if (!form.industry) nextErrors.industry = "Please select your industry.";
    if (!form.country) nextErrors.country = "Please select your country.";
    if (!form.requirement) nextErrors.requirement = "Please select the support you require.";
    if (!form.requirementDetails.trim()) nextErrors.requirementDetails = "Please describe your requirement.";
    if (!form.consent) nextErrors.consent = "Please confirm consent before submitting.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setBusy(true);
      setStatus("");

      const params = new URLSearchParams(window.location.search);
      const payload = {
        formType: "industry", name: form.fullName.trim(), email: form.businessEmail.trim(),
        phone: form.phone.trim(), company: form.company.trim(), designation: form.designation.trim(),
        industry: form.industry, country: form.country, city: form.city.trim(), requirement: form.requirement,
        message: form.requirementDetails.trim(), preferredContact: form.preferredContact,
        pageUrl: window.location.href, pathname: window.location.pathname,
        pageTitle: document.title || "Astronis Global", referrer: document.referrer || "",
        consent: "yes", website: "", utmSource: params.get("utm_source") || "",
        utmMedium: params.get("utm_medium") || "", utmCampaign: params.get("utm_campaign") || "",
      };

      const response = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || data?.success !== true) {
        throw new Error(data?.message || "We couldn't submit your enquiry.");
      }

      setSuccess(true);
      setStatus("Thank you for contacting Astronis Global. Your enquiry has been received. Our team will review your requirement and connect you with the appropriate professional.");
      setForm({
        fullName: "",
        businessEmail: "",
        phone: "",
        company: "",
        designation: "",
        industry: resolvedIndustry,
        country: "India",
        city: "",
        requirement: "",
        requirementDetails: "",
        preferredContact: "Email",
        consent: false,
      });
    } catch (error) {
      setSuccess(false);
      setStatus(error instanceof Error ? error.message : "We couldn't submit your enquiry right now. Please try again or contact us at advisory@astronisglobal.com.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div id="industry-enquiry" className={styles.formShell}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Industry enquiry</span>
        <h3 className={styles.title}>Discuss Your Industry Requirement</h3>
        <p className={styles.description}>We understand the unique regulatory and commercial considerations across sectors.</p>
      </div>

      {form.industry ? (
        <div className={styles.selectionRow}>
          <span className={styles.selectedBadge}>Enquiring about: {form.industry}</span>
          <button type="button" className={styles.textAction} onClick={() => updateField("industry", "")}>Change</button>
        </div>
      ) : null}

      <form className={styles.form} onSubmit={submit} noValidate>
        <div className={styles.grid}>
          <FormInput id="industry-full-name" label="Full Name *" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} error={errors.fullName} autoComplete="name" placeholder="Your full name" />
          <FormInput id="industry-business-email" label="Business Email *" type="email" value={form.businessEmail} onChange={(event) => updateField("businessEmail", event.target.value)} error={errors.businessEmail} autoComplete="email" placeholder="you@company.com" />
          <PhoneInput id="industry-phone" label="Phone / WhatsApp *" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} error={errors.phone} placeholder="+91 98765 43210" />
          <FormInput id="industry-company" label="Company / Organisation *" value={form.company} onChange={(event) => updateField("company", event.target.value)} error={errors.company} autoComplete="organization" placeholder="Your organisation" />
          <FormInput id="industry-designation" label="Designation" value={form.designation} onChange={(event) => updateField("designation", event.target.value)} autoComplete="organization-title" placeholder="Role / Title" />
          <div className={styles.fullWidth}>
            <FormSelect id="industry-select" label="Industry *" value={form.industry} onChange={(event) => updateField("industry", event.target.value)} error={errors.industry} options={industryFormConfig.map((industry) => ({ value: industry.label, label: industry.label }))} placeholder="Select an industry" />
          </div>

          <FormSelect id="industry-country" label="Country *" value={form.country} onChange={(event) => updateField("country", event.target.value)} error={errors.country} options={countryOptions} />
          <FormInput id="industry-city" label="City" value={form.city} onChange={(event) => updateField("city", event.target.value)} autoComplete="address-level2" placeholder="Your city" />

          {industryConfig ? (
            <div className={styles.fullWidth}>
              <FormSelect id="industry-requirement" label="What support do you require? *" value={form.requirement} onChange={(event) => updateField("requirement", event.target.value)} error={errors.requirement} options={industryConfig.requirements.map((requirement) => ({ value: requirement, label: requirement }))} placeholder="Select a requirement" />
            </div>
          ) : null}

          <div className={styles.fullWidth}>
            <FormTextarea id="industry-details" label="Requirement Details *" value={form.requirementDetails} onChange={(event) => updateField("requirementDetails", event.target.value)} error={errors.requirementDetails} placeholder="Tell us about the matter, your current stage and any relevant considerations." />
          </div>

          <FormSelect id="industry-contact" label="Preferred Contact Method" value={form.preferredContact} onChange={(event) => updateField("preferredContact", event.target.value)} options={contactOptions} />
        </div>

        <label className={styles.inline} htmlFor="industry-consent">
          <input id="industry-consent" type="checkbox" checked={form.consent} onChange={(event) => updateField("consent", event.target.checked)} aria-invalid={Boolean(errors.consent)} />
          <span className={styles.inlineText}>I consent to Astronis Global contacting me regarding my enquiry. <Link href="/legal/privacy-policy" className={styles.link}>Privacy Policy</Link></span>
        </label>
        {errors.consent ? <div className={styles.errorText}>{errors.consent}</div> : null}

        <button type="submit" className={styles.button} disabled={busy}>
          {busy ? "Sending..." : "Discuss My Industry Requirement"}
        </button>

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
