"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type {
  EnquiryStatus,
} from "../admin-data";
import { useAdminState } from "./admin-state";
import {
  PageHeading,
} from "./admin-ui";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function todayInputDate() {
  return new Date().toISOString().slice(0, 10);
}

function dateAsIso(value: string) {
  return new Date(`${value}T00:00:00.000Z`).toISOString();
}

function FormField({
  id,
  label,
  required = false,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="admin-field admin-engagement-field" htmlFor={id}>
      <span>{label}{required ? <i aria-hidden="true"> *</i> : null}</span>
      {children}
      {error ? <small id={`${id}-error`} className="admin-field-error" role="alert">{error}</small> : null}
    </label>
  );
}

function useUnsavedFormWarning(dirty: boolean, submitting: { current: boolean }) {
  useEffect(() => {
    if (!dirty) return;
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      if (submitting.current) return;
      event.preventDefault();
      event.returnValue = "";
    };
    const warnBeforeNavigation = (event: MouseEvent) => {
      if (submitting.current || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.href === window.location.href) return;
      if (!window.confirm("Discard the information you entered and leave this form?")) {
        event.preventDefault();
        event.stopPropagation();
      }
    };
    window.addEventListener("beforeunload", warnBeforeUnload);
    document.addEventListener("click", warnBeforeNavigation, true);
    return () => {
      window.removeEventListener("beforeunload", warnBeforeUnload);
      document.removeEventListener("click", warnBeforeNavigation, true);
    };
  }, [dirty, submitting]);
}

export function AdminEnquiryForm() {
  const router = useRouter();
  const { setEnquiries, setFeedback } = useAdminState();
  const submitting = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    date: todayInputDate(),
    status: "New" as EnquiryStatus,
    internalNotes: "",
  });

  useUnsavedFormWarning(dirty, submitting);
  useEffect(() => setFeedback(""), [setFeedback]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setDirty(true);
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  function validate() {
    const normalized = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
      date: form.date.trim(),
    };
    const nextErrors: Record<string, string> = {
      name: normalized.name ? "" : "Enter the full name.",
      email: !normalized.email
        ? "Enter an email address."
        : emailPattern.test(normalized.email)
          ? ""
          : "Enter a valid email address.",
      subject: normalized.subject ? "" : "Enter an enquiry subject.",
      message: normalized.message ? "" : "Enter the enquiry message.",
      date: normalized.date && !Number.isNaN(Date.parse(normalized.date))
        ? ""
        : "Select the received date.",
    };
    setErrors(nextErrors);
    return { valid: Object.values(nextErrors).every((error) => !error), normalized };
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const { valid, normalized } = validate();
    if (!valid) return;

    submitting.current = true;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        collection: "enquiries", status: form.status, data: {
          name: normalized.name, email: normalized.email, phone: form.phone.trim(), subject: normalized.subject,
          message: normalized.message, date: dateAsIso(normalized.date), internalNotes: form.internalNotes.trim(),
          formType: "Admin entered",
        },
      }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Enquiry could not be saved.");
      const row = result.record;
      setEnquiries((current) => [{
        id: row.id, name: row.name, email: row.email, phone: row.data?.phone || "", subject: row.subject,
        message: row.message, date: row.created_at, status: row.status, company: row.company || "",
        formType: row.form_type, internalNotes: row.internal_notes,
      }, ...current]);
      setFeedback("Enquiry saved.");
      router.push("/admin/enquiries");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Enquiry could not be saved.");
      submitting.current = false;
      setIsSubmitting(false);
    }
  }

  function cancel() {
    if (isSubmitting) return;
    if (dirty && !window.confirm("Discard the enquiry details you entered? This cannot be undone.")) return;
    router.push("/admin/enquiries");
  }

  return (
    <>
      <PageHeading title="Add New Enquiry" description="Record an enquiry received through an approved business channel." />
      <form className="admin-form-layout admin-engagement-form" noValidate onSubmit={submit}>
        <section className="admin-panel admin-form-panel">
          <div className="admin-panel-heading">
            <div><h2>Enquiry Information</h2><p>Record an enquiry received through an approved business channel.</p></div>
          </div>
          <div className="admin-engagement-fields">
            <FormField id="enquiry-name" label="Full Name" required error={errors.name}>
              <input id="enquiry-name" autoComplete="name" value={form.name} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "enquiry-name-error" : undefined} onChange={(event) => update("name", event.target.value)} />
            </FormField>
            <FormField id="enquiry-email" label="Email Address" required error={errors.email}>
              <input id="enquiry-email" type="email" autoComplete="email" value={form.email} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "enquiry-email-error" : undefined} onChange={(event) => update("email", event.target.value)} />
            </FormField>
            <FormField id="enquiry-phone" label="Phone Number">
              <input id="enquiry-phone" type="tel" autoComplete="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} />
            </FormField>
            <FormField id="enquiry-subject" label="Subject" required error={errors.subject}>
              <input id="enquiry-subject" value={form.subject} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "enquiry-subject-error" : undefined} onChange={(event) => update("subject", event.target.value)} />
            </FormField>
            <FormField id="enquiry-message" label="Enquiry Message" required error={errors.message}>
              <textarea id="enquiry-message" rows={5} value={form.message} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "enquiry-message-error" : undefined} onChange={(event) => update("message", event.target.value)} />
            </FormField>
            <FormField id="enquiry-date" label="Received Date" required error={errors.date}>
              <input id="enquiry-date" type="date" value={form.date} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "enquiry-date-error" : undefined} onChange={(event) => update("date", event.target.value)} />
            </FormField>
            <FormField id="enquiry-status" label="Enquiry Status">
              <select id="enquiry-status" value={form.status} onChange={(event) => {
                const value = event.target.value;
                if (value === "New" || value === "In Progress" || value === "Responded" || value === "Closed") update("status", value);
              }}>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Responded">Responded</option>
                <option value="Closed">Closed</option>
              </select>
            </FormField>
            <FormField id="enquiry-notes" label="Internal Admin Notes">
              <textarea id="enquiry-notes" rows={3} value={form.internalNotes} onChange={(event) => update("internalNotes", event.target.value)} />
            </FormField>
          </div>
          <div className="admin-form-actions admin-engagement-form-actions">
            <span>Saved enquiries are available in the operational inbox.</span>
            <div>
              <button type="button" className="admin-button admin-button-secondary" disabled={isSubmitting} onClick={cancel}>Cancel</button>
              <button type="submit" className="admin-button" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Enquiry"}</button>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}

export function AdminTestimonialForm() {
  const router = useRouter();
  const { setTestimonials, setFeedback } = useAdminState();
  const submitting = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    title: "",
    company: "",
    designation: "",
    service: "",
    text: "",
    date: todayInputDate(),
    consentVerified: false,
    identityConsentVerified: false,
    internalNotes: "",
  });

  useUnsavedFormWarning(dirty, submitting);
  useEffect(() => setFeedback(""), [setFeedback]);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setDirty(true);
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  function validate() {
    const normalized = {
      name: form.name.trim(),
      email: form.email.trim(),
      title: form.title.trim(),
      company: form.company.trim(),
      designation: form.designation.trim(),
      service: form.service.trim(),
      text: form.text.trim(),
      date: form.date.trim(),
    };
    const nextErrors: Record<string, string> = {
      name: normalized.name ? "" : "Enter the contributor's name.",
      email: !normalized.email || emailPattern.test(normalized.email)
        ? ""
        : "Enter a valid email address or leave this field blank.",
      text: normalized.text.length >= 10 ? "" : "Enter at least 10 characters of testimonial text.",
      consentVerified: form.consentVerified ? "" : "Verify that publication consent is recorded.",
      identityConsentVerified: form.identityConsentVerified ? "" : "Verify that identity publication consent is recorded.",
      date: normalized.date && !Number.isNaN(Date.parse(normalized.date))
        ? ""
        : "Select the submission date.",
    };
    setErrors(nextErrors);
    return { valid: Object.values(nextErrors).every((error) => !error), normalized };
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const { valid, normalized } = validate();
    if (!valid) return;

    submitting.current = true;
    setIsSubmitting(true);
    const excerpt = normalized.text.length > 150 ? `${normalized.text.slice(0, 147).trimEnd()}...` : normalized.text;
    try {
      const response = await fetch("/api/admin/data", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
        collection: "testimonials",
        data: {
          name: normalized.name, email: normalized.email, title: normalized.title, company: normalized.company,
          designation: normalized.designation, service: normalized.service, text: normalized.text,
          excerpt, date: dateAsIso(normalized.date), consent: form.consentVerified,
          identityPublicationConsent: form.identityConsentVerified, internalNotes: form.internalNotes.trim(),
        },
      }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Testimonial could not be saved.");
      const row = result.record;
      setTestimonials((current) => [{
        ...row.data, id: row.id, date: row.created_at, consentStatus: "Granted",
        approvalStatus: "Pending", identityPublicationConsent: true,
      }, ...current]);
      setFeedback("Testimonial saved for review.");
      router.push("/admin/testimonials");
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Testimonial could not be saved.");
      submitting.current = false;
      setIsSubmitting(false);
    }
  }

  function cancel() {
    if (isSubmitting) return;
    if (dirty && !window.confirm("Discard the testimonial details you entered? This cannot be undone.")) return;
    router.push("/admin/testimonials");
  }

  return (
    <>
      <PageHeading title="Add New Testimonial" description="Record a client testimonial only after confirming written publication consent." />
      <form className="admin-form-layout admin-engagement-form" noValidate onSubmit={submit}>
        <section className="admin-panel admin-form-panel">
          <div className="admin-panel-heading">
            <div><h2>Testimonial Information</h2><p>New records are saved as pending and require consent verification before publication.</p></div>
          </div>
          <div className="admin-engagement-fields">
            <FormField id="testimonial-name" label="Contributor Name" required error={errors.name}>
              <input id="testimonial-name" autoComplete="name" value={form.name} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "testimonial-name-error" : undefined} onChange={(event) => update("name", event.target.value)} />
            </FormField>
            <FormField id="testimonial-email" label="Email Address" error={errors.email}>
              <input id="testimonial-email" type="email" autoComplete="email" value={form.email} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "testimonial-email-error" : undefined} onChange={(event) => update("email", event.target.value)} />
            </FormField>
            <FormField id="testimonial-title" label="Testimonial Title">
              <input id="testimonial-title" value={form.title} onChange={(event) => update("title", event.target.value)} />
            </FormField>
            <FormField id="testimonial-company" label="Company">
              <input id="testimonial-company" value={form.company} onChange={(event) => update("company", event.target.value)} />
            </FormField>
            <FormField id="testimonial-designation" label="Designation">
              <input id="testimonial-designation" value={form.designation} onChange={(event) => update("designation", event.target.value)} />
            </FormField>
            <FormField id="testimonial-service" label="Service">
              <input id="testimonial-service" value={form.service} onChange={(event) => update("service", event.target.value)} />
            </FormField>
            <FormField id="testimonial-date" label="Submission Date" required error={errors.date}>
              <input id="testimonial-date" type="date" value={form.date} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? "testimonial-date-error" : undefined} onChange={(event) => update("date", event.target.value)} />
            </FormField>
            <FormField id="testimonial-text" label="Testimonial Text" required error={errors.text}>
              <textarea id="testimonial-text" rows={7} value={form.text} aria-invalid={Boolean(errors.text)} aria-describedby={errors.text ? "testimonial-text-error" : undefined} onChange={(event) => update("text", event.target.value)} />
            </FormField>
            <label className="admin-field"><span>Publication consent verification <i>*</i></span><span><input type="checkbox" checked={form.consentVerified} onChange={(event) => update("consentVerified", event.target.checked)} /> Written consent for the testimonial is on file.</span>{errors.consentVerified ? <small className="admin-field-error" role="alert">{errors.consentVerified}</small> : null}</label>
            <label className="admin-field"><span>Identity publication consent <i>*</i></span><span><input type="checkbox" checked={form.identityConsentVerified} onChange={(event) => update("identityConsentVerified", event.target.checked)} /> Consent covers publication of the contributor’s name and identity.</span>{errors.identityConsentVerified ? <small className="admin-field-error" role="alert">{errors.identityConsentVerified}</small> : null}</label>
            <FormField id="testimonial-notes" label="Internal Admin Notes">
              <textarea id="testimonial-notes" rows={3} value={form.internalNotes} onChange={(event) => update("internalNotes", event.target.value)} />
            </FormField>
          </div>
          <div className="admin-form-actions admin-engagement-form-actions">
            <span>Saved as pending review; the website displays only approved records with consent.</span>
            <div>
              <button type="button" className="admin-button admin-button-secondary" disabled={isSubmitting} onClick={cancel}>Cancel</button>
              <button type="submit" className="admin-button" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Testimonial"}</button>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
