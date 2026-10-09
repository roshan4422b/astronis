"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "@/components/forms/formStyles.module.css";
import FormInput from "@/components/forms/shared/FormInput";
import FormSelect from "@/components/forms/shared/FormSelect";
import FormTextarea from "@/components/forms/shared/FormTextarea";
import PhoneInput from "@/components/forms/shared/PhoneInput";
import { serviceAnchor } from "@/data/service-detail-types";
import { serviceFormConfig } from "@/data/serviceFormConfig";

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

const inferServiceFromPath = (pathname: string) => {
  const slug = decodeURIComponent(pathname.split("/").filter(Boolean).at(-1) || "");
  if (!slug) return "";
  return serviceFormConfig.find((service) => service.id === slug || service.label.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slug)?.label || "";
};

export default function ServiceEnquiryForm({ defaultService = "", defaultRequirement = "" }: { defaultService?: string; defaultRequirement?: string }) {
  const pathname = usePathname();
  const resolvedService = serviceFormConfig.find(service => service.label === defaultService)?.label || inferServiceFromPath(pathname || "");
  const resolvedRequirement = serviceFormConfig.find(service => service.label === resolvedService)?.requirements.find(requirement => requirement.label === defaultRequirement)?.label || "";
  const [form, setForm] = useState({
    fullName: "",
    businessEmail: "",
    phone: "",
    company: "",
    designation: "",
    service: resolvedService,
    country: "India",
    city: "",
    requirement: resolvedRequirement,
    detailQuestion: "",
    detailAnswer: "",
    requirementDescription: "",
    preferredContact: "Email",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);

  const serviceConfig = useMemo(
    () => serviceFormConfig.find((service) => service.label === form.service) ?? null,
    [form.service],
  );

  const currentRequirement = useMemo(
    () => serviceConfig?.requirements.find((requirement) => requirement.label === form.requirement) ?? null,
    [form.requirement, serviceConfig],
  );

  useEffect(() => {
    const options = serviceFormConfig.find(service => service.label === resolvedService)?.requirements.find(item => item.label === resolvedRequirement)?.options || [];
    const select = (title: string) => {
      if (options.includes(title)) setForm(current => current.service === resolvedService && current.requirement === resolvedRequirement ? {...current, detailQuestion: "Child service", detailAnswer: title} : current);
    };
    const fromHash = () => { const child = options.find(title => serviceAnchor(title) === window.location.hash.slice(1)); if (child) select(child); };
    const fromClick = (event: Event) => { const title = (event as CustomEvent<unknown>).detail; if (typeof title === "string") select(title); };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    window.addEventListener("service-requirement", fromClick);
    return () => { window.removeEventListener("hashchange", fromHash); window.removeEventListener("service-requirement", fromClick); };
  }, [resolvedService, resolvedRequirement]);

  const updateField = (field: keyof typeof form, value: string | boolean) => {
    if (field === "service") {
      setForm((current) => ({
        ...current,
        service: String(value),
        requirement: "",
        detailQuestion: "",
        detailAnswer: "",
      }));
      setErrors((current) => ({ ...current, service: "", requirement: "" }));
      return;
    }

    if (field === "requirement") {
      const nextRequirement = String(value);
      const nextDetailQuestion = serviceConfig?.requirements.find((requirement) => requirement.label === nextRequirement)?.question || "";
      setForm((current) => ({
        ...current,
        requirement: nextRequirement,
        detailQuestion: nextDetailQuestion,
        detailAnswer: "",
      }));
      setErrors((current) => ({ ...current, requirement: "" }));
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
    if (!form.service) nextErrors.service = "Please select a service.";
    if (!form.country) nextErrors.country = "Please select your country.";
    if (!form.requirement) nextErrors.requirement = "Please select your requirement.";
    if (!form.requirementDescription.trim()) nextErrors.requirementDescription = "Please describe your requirement.";
    if (!form.consent) nextErrors.consent = "Please confirm consent before submitting.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setBusy(true);
      setStatus("");

      const params = new URLSearchParams(window.location.search);
      const payload = {
        formType: "service", name: form.fullName.trim(), email: form.businessEmail.trim(),
        phone: form.phone.trim(), company: form.company.trim(), designation: form.designation.trim(),
        service: form.service, country: form.country, city: form.city.trim(), requirement: form.requirement,
        detailAnswer: form.detailAnswer, message: form.requirementDescription.trim(),
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
        designation: "",
        service: resolvedService,
        country: "India",
        city: "",
        requirement: resolvedRequirement,
        detailQuestion: "",
        detailAnswer: "",
        requirementDescription: "",
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
    <div id="service-enquiry" className={styles.formShell}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Service enquiry</span>
        <h3 className={styles.title}>Discuss Your Requirement</h3>
        <p className={styles.description}>Share the nature of your matter and we will connect you with the relevant team.</p>
      </div>

      {form.service ? (
        <div className={styles.selectionRow}>
          <span className={styles.selectedBadge}>Enquiring about: {form.service}</span>
          <button type="button" className={styles.textAction} onClick={() => updateField("service", "")}>Change</button>
        </div>
      ) : null}

      <form className={styles.form} onSubmit={submit} noValidate>
        <div className={styles.grid}>
          <FormInput id="service-full-name" label="Full Name *" value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} error={errors.fullName} autoComplete="name" placeholder="Your full name" />
          <FormInput id="service-business-email" label="Business Email *" type="email" value={form.businessEmail} onChange={(event) => updateField("businessEmail", event.target.value)} error={errors.businessEmail} autoComplete="email" placeholder="you@company.com" />
          <PhoneInput id="service-phone" label="Phone / WhatsApp *" value={form.phone} onChange={(event) => updateField("phone", event.target.value)} error={errors.phone} placeholder="+91 98765 43210" />
          <FormInput id="service-company" label="Company / Organisation" value={form.company} onChange={(event) => updateField("company", event.target.value)} autoComplete="organization" placeholder="Your organisation" />
          <FormInput id="service-designation" label="Designation" value={form.designation} onChange={(event) => updateField("designation", event.target.value)} autoComplete="organization-title" placeholder="Role / Title" />
          <div className={styles.fullWidth}>
            <FormSelect id="service-select" label="Service *" value={form.service} onChange={(event) => updateField("service", event.target.value)} error={errors.service} options={serviceFormConfig.map((service) => ({ value: service.label, label: service.label }))} placeholder="Select a service" />
          </div>

          <FormSelect id="service-country" label="Country *" value={form.country} onChange={(event) => updateField("country", event.target.value)} error={errors.country} options={countryOptions} />
          <FormInput id="service-city" label="City" value={form.city} onChange={(event) => updateField("city", event.target.value)} autoComplete="address-level2" placeholder="Your city" />

          {serviceConfig ? (
            <div className={styles.fullWidth}>
              <FormSelect id="service-requirement" label="Select Your Requirement *" value={form.requirement} onChange={(event) => updateField("requirement", event.target.value)} error={errors.requirement} options={serviceConfig.requirements.map((requirement) => ({ value: requirement.label, label: requirement.label }))} placeholder="Select a requirement" />
            </div>
          ) : null}

          {currentRequirement?.question ? (
            <div className={styles.fullWidth}>
              <FormSelect id="service-detail" label={currentRequirement.question} value={form.detailAnswer} onChange={(event) => updateField("detailAnswer", event.target.value)} options={(currentRequirement.options || []).map((option) => ({ value: option, label: option }))} placeholder="Select an option" />
            </div>
          ) : null}

          <div className={styles.fullWidth}>
            <FormTextarea id="service-requirement-description" label="Requirement Description *" value={form.requirementDescription} onChange={(event) => updateField("requirementDescription", event.target.value)} error={errors.requirementDescription} placeholder="Tell us about your requirement, current stage, and preferred support." />
          </div>

          <FormSelect id="service-preferred-contact" label="Preferred Contact Method" value={form.preferredContact} onChange={(event) => updateField("preferredContact", event.target.value)} options={contactOptions} />
        </div>

        <label className={styles.inline} htmlFor="service-consent">
          <input id="service-consent" type="checkbox" checked={form.consent} onChange={(event) => updateField("consent", event.target.checked)} aria-invalid={Boolean(errors.consent)} />
          <span className={styles.inlineText}>I consent to Astronis Global contacting me regarding my enquiry. <Link href="/legal/privacy-policy" className={styles.link}>Privacy Policy</Link></span>
        </label>
        {errors.consent ? <div className={styles.errorText}>{errors.consent}</div> : null}

        <button type="submit" className={styles.button} disabled={busy}>
          {busy ? "Sending..." : "Discuss My Requirement"}
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
