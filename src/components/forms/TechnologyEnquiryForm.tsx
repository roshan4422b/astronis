"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "@/components/forms/formStyles.module.css";
import FormInput from "@/components/forms/shared/FormInput";
import FormSelect from "@/components/forms/shared/FormSelect";
import FormTextarea from "@/components/forms/shared/FormTextarea";
import PhoneInput from "@/components/forms/shared/PhoneInput";
import { technologyFormConfig } from "@/data/technologyFormConfig";

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

const timelineOptions = [
  { value: "Immediately", label: "Immediately" },
  { value: "Within 1 month", label: "Within 1 month" },
  { value: "Within 3 months", label: "Within 3 months" },
  { value: "Within 6 months", label: "Within 6 months" },
  { value: "Just exploring", label: "Just exploring" },
];

const inferTechnologyAreaFromPath = (pathname: string) => {
  const slug = decodeURIComponent(pathname.split("/").filter(Boolean).at(-1) || "");
  if (!slug) return "";
  return technologyFormConfig.find((area) => area.id === slug || area.label.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug)?.label || "";
};

export default function TechnologyEnquiryForm({
  defaultSolutionArea = "",
  defaultSolution = "",
  variant = "default",
}: {
  defaultSolutionArea?: string;
  defaultSolution?: string;
  variant?: "default" | "compact";
}) {
  const compact = variant === "compact";
  const pathname = usePathname();
  const resolvedArea = defaultSolutionArea || inferTechnologyAreaFromPath(pathname || "");
  const [form, setForm] = useState({
    fullName: "",
    businessEmail: "",
    phone: "",
    company: "",
    role: "",
    solutionArea: resolvedArea,
    solution: defaultSolution,
    country: "India",
    requirementDetails: "",
    projectTimeline: "",
    preferredContact: "Email",
    aiUseCase: "",
    currentEnvironment: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  const solutionAreaConfig = useMemo(
    () => technologyFormConfig.find((area) => area.label === form.solutionArea) ?? null,
    [form.solutionArea],
  );

  const selectedSolution = useMemo(
    () => solutionAreaConfig?.solutions.find((solution) => solution.label === form.solution) ?? null,
    [form.solution, solutionAreaConfig],
  );

  const updateField = (field: keyof typeof form, value: string | boolean) => {
    if (field === "solutionArea") {
      setForm((current) => ({
        ...current,
        solutionArea: String(value),
        solution: "",
        aiUseCase: "",
      }));
      setErrors((current) => ({ ...current, solutionArea: "", solution: "" }));
      return;
    }

    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;

    const nextErrors: Record<string, string> = {};
    const isOptionalCompactEnquiry = compact && (!form.solution || ["Client & Enterprise Portals", "Cybersecurity Readiness", "Cloud & Collaboration Solutions"].includes(form.solution));
    if (!form.fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.businessEmail.trim())) nextErrors.businessEmail = "Please enter your business email.";
    if (!isOptionalCompactEnquiry && !form.phone.trim()) nextErrors.phone = "Please enter your phone or WhatsApp number.";
    if (!form.company.trim()) nextErrors.company = "Please enter your company or organisation.";
    if (!form.solutionArea) nextErrors.solutionArea = "Please select a solution area.";
    if (!form.country) nextErrors.country = "Please select your country.";
    if (!isOptionalCompactEnquiry && !form.requirementDetails.trim()) nextErrors.requirementDetails = "Please describe your requirement.";
    if (!form.consent) nextErrors.consent = "Please confirm consent before submitting.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setBusy(true);
      setStatus("");

      const params = new URLSearchParams(window.location.search);
      const payload = {
        formType: "technology", name: form.fullName.trim(), email: form.businessEmail.trim(),
        phone: form.phone.trim(), company: form.company.trim(), designation: form.role.trim(),
        technology: form.solutionArea, solution: form.solution, country: form.country,
        message: form.requirementDetails.trim(), timeline: form.projectTimeline,
        preferredContact: form.preferredContact, pageUrl: window.location.href,
        pathname: window.location.pathname, pageTitle: document.title || "Astronis Global",
        referrer: document.referrer || "", consent: "yes", website: "",
        utmSource: params.get("utm_source") || "", utmMedium: params.get("utm_medium") || "",
        utmCampaign: params.get("utm_campaign") || "",
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
        role: "",
        solutionArea: resolvedArea,
        solution: defaultSolution,
        country: "India",
        requirementDetails: "",
        projectTimeline: "",
        preferredContact: "Email",
        aiUseCase: "",
        currentEnvironment: "",
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
    <div id="technology-enquiry" className={`${styles.formShell} ${compact ? styles.compact : ""}`.trim()}>
      {!compact ? <div className={styles.header}>
        <span className={styles.eyebrow}>Technology enquiry</span>
        <h3 className={styles.title}>Discuss My Technology Requirement</h3>
        <p className={styles.description}>Tell us about your business challenge and we will connect you with the right specialist team.</p>
      </div> : null}

      {!compact && form.solutionArea ? (
        <div className={styles.selectionRow}>
          <span className={styles.selectedBadge}>Solution area: {form.solutionArea}</span>
          <button type="button" className={styles.textAction} onClick={() => updateField("solutionArea", "")}>Change</button>
        </div>
      ) : null}

      <form className={styles.form} onSubmit={submit} noValidate>
        <div className={styles.grid}>
          {compact ? <>
            <FormInput id="technology-full-name" label="Your Name *" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} error={errors.fullName} autoComplete="name" placeholder="Your name" />
            <FormInput id="technology-company" label="Your Organisation *" value={form.company} onChange={(event) => updateField("company", event.target.value)} error={errors.company} autoComplete="organization" placeholder="Your organisation" />
            <FormInput id="technology-business-email" label="Your Email *" type="email" value={form.businessEmail} onChange={(event) => updateField("businessEmail", event.target.value)} error={errors.businessEmail} autoComplete="email" placeholder="you@company.com" />
            <PhoneInput id="technology-phone" label="Contact Number" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} error={errors.phone} placeholder="Your contact number" />
            <div className={styles.fullWidth}>
              <FormTextarea id="technology-requirement" label="Your Message (Optional)" value={form.requirementDetails} onChange={(event) => updateField("requirementDetails", event.target.value)} error={errors.requirementDetails} placeholder={form.solution === "Client & Enterprise Portals" ? "Tell us what you need from your portal." : "Tell us about your technology requirements."} />
            </div>
          </> : <>
          <FormInput id="technology-full-name" label="Full Name *" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} error={errors.fullName} autoComplete="name" placeholder="Your full name" />
          <FormInput id="technology-business-email" label="Business Email *" type="email" value={form.businessEmail} onChange={(event) => updateField("businessEmail", event.target.value)} error={errors.businessEmail} autoComplete="email" placeholder="you@company.com" />
          <PhoneInput id="technology-phone" label="Phone / WhatsApp *" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} error={errors.phone} placeholder="+91 98765 43210" />
          <FormInput id="technology-company" label="Company / Organisation *" value={form.company} onChange={(event) => updateField("company", event.target.value)} error={errors.company} autoComplete="organization" placeholder="Your organisation" />
          <FormInput id="technology-role" label="Role / Designation" value={form.role} onChange={(event) => updateField("role", event.target.value)} autoComplete="organization-title" placeholder="Role or title" />
          <div className={styles.fullWidth}>
            <FormSelect id="technology-solution-area" label="Solution Area *" value={form.solutionArea} onChange={(event) => updateField("solutionArea", event.target.value)} error={errors.solutionArea} options={technologyFormConfig.map((area) => ({ value: area.label, label: area.label }))} placeholder="Select a solution area" />
          </div>

          {solutionAreaConfig ? (
            <div className={styles.fullWidth}>
              <FormSelect id="technology-solution" label="Solution" value={form.solution} onChange={(event) => updateField("solution", event.target.value)} options={solutionAreaConfig.solutions.map((solution) => ({ value: solution.label, label: solution.label }))} placeholder="Select a solution" />
            </div>
          ) : null}

          {selectedSolution?.question ? (
            <div className={styles.fullWidth}>
              <FormSelect id="technology-ai-use-case" label={selectedSolution.question} value={form.aiUseCase} onChange={(event) => updateField("aiUseCase", event.target.value)} options={(selectedSolution.options || []).map((option) => ({ value: option, label: option }))} placeholder="Select an option" />
            </div>
          ) : null}

          <FormSelect id="technology-country" label="Country *" value={form.country} onChange={(event) => updateField("country", event.target.value)} error={errors.country} options={countryOptions} />
          <FormSelect id="technology-timeline" label="Project Timeline" value={form.projectTimeline} onChange={(event) => updateField("projectTimeline", event.target.value)} options={timelineOptions} placeholder="Select a timeline" />

          <div className={styles.fullWidth}>
            <FormTextarea id="technology-requirement" label="Requirement Details *" value={form.requirementDetails} onChange={(event) => updateField("requirementDetails", event.target.value)} error={errors.requirementDetails} placeholder="Tell us about your requirements, business challenge and current environment." />
          </div>

          <FormSelect id="technology-preferred-contact" label="Preferred Contact Method" value={form.preferredContact} onChange={(event) => updateField("preferredContact", event.target.value)} options={contactOptions} />
          </>}
        </div>

        <label className={styles.inline} htmlFor="technology-consent">
          <input id="technology-consent" type="checkbox" checked={form.consent} onChange={(event) => updateField("consent", event.target.checked)} aria-invalid={Boolean(errors.consent)} />
          <span className={styles.inlineText}>I consent to Astronis Global contacting me regarding my enquiry. <Link href="/legal/privacy-policy" className={styles.link}>Privacy Policy</Link></span>
        </label>
        {errors.consent ? <div className={styles.errorText}>{errors.consent}</div> : null}

        <button type="submit" className={styles.button} disabled={busy}>
          {busy ? "Sending..." : compact ? "Submit Enquiry" : "Discuss My Technology Requirement"}
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
