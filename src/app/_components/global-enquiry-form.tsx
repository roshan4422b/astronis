"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { industries as siteIndustries } from "@/content/site";
import {
  enquiryCategoryOptions,
  getPrimaryOptions,
  getSecondaryOptions,
  inferDefaultContext,
  type EnquiryCategory,
} from "@/content/enquiry-config";
import Icon from "./icon";
import styles from "./global-enquiry-form.module.css";

const companyTypes = [
  "Startup",
  "Proprietorship",
  "Partnership",
  "LLP",
  "Private Limited",
  "Public Limited",
  "MNC",
  "Financial Institution",
  "Government / PSU",
  "NGO / Not-for-Profit",
  "Professional Firm",
  "Individual",
  "Other",
];

const companySizes = [
  "1–10",
  "11–50",
  "51–200",
  "201–500",
  "501–1,000",
  "1,000+",
];

const timelineOptions = [
  "Immediately",
  "Within 1 week",
  "Within 1 month",
  "Within 1–3 months",
  "3+ months",
  "Just exploring",
];

const preferredContactOptions = ["Phone", "WhatsApp", "Email", "Video Meeting"];

const countries = [
  "India",
  "United Arab Emirates",
  "Singapore",
  "United Kingdom",
  "United States",
  "Australia",
  "Canada",
  "Germany",
  "Saudi Arabia",
  "Other",
];

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Other",
];

type Props = {
  context?: EnquiryCategory;
  defaultCategory?: EnquiryCategory;
  defaultSelection?: string;
  title?: string;
  description?: string;
  variant?: "default" | "compact" | "market";
};

export default function GlobalEnquiryForm({
  context,
  defaultCategory,
  defaultSelection,
  title = "Tell Us About Your Requirement",
  description = "Share a few details about your business and requirement. Our team will connect you with the right Astronis Global professional.",
  variant = "default",
}: Props) {
  const pathname = usePathname();
  const inferred = useMemo(() => inferDefaultContext(pathname ?? ""), [pathname]);
  const resolvedCategory = context ?? defaultCategory ?? inferred.category;
  const resolvedSelection = defaultSelection ?? inferred.primarySelection;
  const startPrimarySelection =
    resolvedSelection && getPrimaryOptions(resolvedCategory).some((option) => option.value === resolvedSelection)
      ? resolvedSelection
      : "";

  const [category, setCategory] = useState<EnquiryCategory>(resolvedCategory);
  const [primarySelection, setPrimarySelection] = useState<string>(startPrimarySelection);
  const [secondarySelection, setSecondarySelection] = useState("");
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    designation: "",
    country: variant === "market" ? "" : "India",
    state: "",
    city: "",
    companyType: "",
    companySize: "",
    timeline: "",
    preferredContact: "Email",
    interest: "",
    agreementType: "",
    matterStage: "",
    licenceNeed: "",
    regulator: "",
    currentStatus: "",
    transactionType: "",
    countriesInvolved: variant === "market" ? "UAE" : "",
    transactionStage: "",
    ipRequirement: "",
    message: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  const primaryOptions = getPrimaryOptions(category);
  const secondaryOptions = useMemo(
    () => getSecondaryOptions(category, primarySelection),
    [category, primarySelection],
  );

  const updateField = (field: keyof typeof detail, value: string | boolean) => {
    setDetail((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const handleCategoryChange = (nextCategory: EnquiryCategory) => {
    setCategory(nextCategory);
    setPrimarySelection("");
    setSecondarySelection("");
    setDetail((current) => ({
      ...current,
      interest: "",
      agreementType: "",
      matterStage: "",
      licenceNeed: "",
      regulator: "",
      currentStatus: "",
      transactionType: "",
      countriesInvolved: "",
      transactionStage: "",
      ipRequirement: "",
    }));
  };

  const relevantFields = useMemo(() => {
    const fields: string[] = [];

    if (primarySelection && category === "service") {
      if (primarySelection === "Commercial Contracts" || primarySelection === "Cross-Border Transactions") {
        fields.push("agreementType", "matterStage");
      }
      if (primarySelection === "Licensing & Registrations" || primarySelection === "Approval") {
        fields.push("licenceNeed", "regulator", "currentStatus");
      }
      if (primarySelection === "FEMA, FDI & Foreign Exchange Advisory" || primarySelection === "Foreign Direct Investment") {
        fields.push("transactionType", "countriesInvolved", "transactionStage");
      }
      if (["NCLT & NCLAT Advisory", "Arbitration & Conciliation", "DRT & DRAT Matters", "AFT & CAT Advisory Matters"].includes(primarySelection)) {
        fields.push("matterStage");
      }
      if (primarySelection === "Intellectual Property Rights" || primarySelection === "Trademark") {
        fields.push("ipRequirement");
      }
    }

    if (category === "international") {
      fields.push("transactionType", "countriesInvolved", "transactionStage", "timeline");
    }

    if (category === "technology") {
      fields.push("timeline");
    }

    if (primarySelection && category === "industry") {
      fields.push("timeline");
    }

    return fields;
  }, [primarySelection, category]);

  const isVisible = (key: string) => relevantFields.includes(key) || key === "timeline" || key === "companyType" || key === "companySize" || key === "country" || key === "state" || key === "city" || key === "preferredContact";

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!detail.name.trim() || detail.name.trim().length < 2) nextErrors.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(detail.email.trim())) nextErrors.email = "Please enter a valid business email.";
    if (variant !== "market" && !detail.company.trim()) nextErrors.company = "Please enter your company or organisation.";
    if (!category) nextErrors.category = "Please select the main requirement category.";
    if (!primarySelection) nextErrors.primarySelection = "Please choose the relevant option.";
    if (variant !== "market" && !detail.country.trim()) nextErrors.country = "Please select your country.";
    if (!detail.message.trim() || detail.message.trim().length < 10) nextErrors.message = "Please describe your requirement in a bit more detail.";
    if (!detail.consent) nextErrors.consent = "Please confirm consent before submitting.";

    if ((detail.preferredContact === "Phone" || detail.preferredContact === "WhatsApp") && !detail.phone.trim()) {
      nextErrors.phone = "Phone or WhatsApp is required when that is your preferred contact method.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    const message = detail.message.trim();
    const selectedService = category === "service" ? primarySelection : "";
    const selectedIndustry = category === "industry" ? primarySelection : variant === "market" ? detail.interest : "";
    const selectedTechnology = category === "technology" ? primarySelection : "";
    const requirement = secondarySelection || detail.interest || primarySelection;
    const payload = {
      formType: category === "service" ? "service" : category === "industry" ? "industry" : category === "technology" ? "technology" : "home",
      name: detail.name.trim(),
      email: detail.email.trim(),
      company: detail.company.trim(),
      phone: detail.phone.trim(),
      designation: detail.designation.trim(),
      category,
      requirement,
      service: selectedService,
      industry: selectedIndustry,
      technology: selectedTechnology,
      country: detail.country.trim(),
      state: detail.state.trim(),
      city: detail.city.trim(),
      companyType: detail.companyType,
      companySize: detail.companySize,
      timeline: detail.timeline,
      preferredContact: detail.preferredContact,
      agreementType: detail.agreementType,
      matterStage: detail.matterStage,
      licenceNeed: detail.licenceNeed,
      regulator: detail.regulator,
      currentStatus: detail.currentStatus,
      transactionType: detail.transactionType,
      countriesInvolved: detail.countriesInvolved,
      transactionStage: detail.transactionStage,
      ipRequirement: detail.ipRequirement,
      pageUrl: window.location.href,
      pageTitle: document.title || "Astronis Global",
      pathname: window.location.pathname,
      referrer: document.referrer || "",
      utmSource: new URLSearchParams(window.location.search).get("utm_source") || "",
      utmMedium: new URLSearchParams(window.location.search).get("utm_medium") || "",
      utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || "",
      message,
      consent: detail.consent ? "yes" : "",
      website: "",
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
        throw new Error(data?.message || "We couldn't submit your enquiry.");
      }

      setSuccess(true);
      setStatus(data.message || "Your enquiry has been submitted successfully.");
      event.currentTarget.reset();
      setDetail((current) => ({
        ...current,
        name: "",
        email: "",
        phone: "",
        company: "",
        designation: "",
        country: variant === "market" ? "" : "India",
        state: "",
        city: "",
        companyType: "",
        companySize: "",
        timeline: "",
        preferredContact: "Email",
        interest: "",
        agreementType: "",
        matterStage: "",
        licenceNeed: "",
        regulator: "",
        currentStatus: "",
        transactionType: "",
        countriesInvolved: variant === "market" ? "UAE" : "",
        transactionStage: "",
        ipRequirement: "",
        message: "",
        consent: false,
      }));
      setCategory(resolvedCategory);
      setPrimarySelection(startPrimarySelection);
      setSecondarySelection("");
    } catch (error) {
      setSuccess(false);
      setStatus(error instanceof Error ? error.message : "We could not deliver your enquiry right now. Please try again or contact advisory@astronisglobal.com.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`${styles.wrapper} ${variant === "compact" ? styles.compact : ""} ${variant === "market" ? styles.market : ""}`.trim()} id="enquiry-form">
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>Start a conversation</span>
          <h3>{title}</h3>
        </div>
        <p>{description}</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.grid}>
          {variant === "market" ? (
            <>
              <label className={styles.field}>
                <span>Full Name *</span>
                <input name="name" value={detail.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" placeholder="Full Name *" aria-invalid={Boolean(errors.name)} />
                {errors.name && <small className={styles.error}>{errors.name}</small>}
              </label>
              <label className={styles.field}>
                <span>Organisation</span>
                <input name="company" value={detail.company} onChange={(event) => updateField("company", event.target.value)} autoComplete="organization" placeholder="Organisation" aria-invalid={Boolean(errors.company)} />
                {errors.company && <small className={styles.error}>{errors.company}</small>}
              </label>
              <label className={styles.field}>
                <span>Email Address *</span>
                <input name="email" type="email" value={detail.email} onChange={(event) => updateField("email", event.target.value)} autoComplete="email" placeholder="Email Address *" aria-invalid={Boolean(errors.email)} />
                {errors.email && <small className={styles.error}>{errors.email}</small>}
              </label>
              <label className={styles.field}>
                <span>Phone / Country Code</span>
                <input name="phone" type="tel" value={detail.phone} onChange={(event) => updateField("phone", event.target.value)} autoComplete="tel" placeholder="Phone / Country Code" aria-invalid={Boolean(errors.phone)} />
                {errors.phone && <small className={styles.error}>{errors.phone}</small>}
              </label>
              <label className={styles.field}>
                <span>Your Current Country</span>
                <select name="country" value={detail.country} onChange={(event) => updateField("country", event.target.value)}>
                  <option value="">Your Current Country</option>
                  {countries.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </label>
              <label className={styles.field}>
                <span>Service Required *</span>
                <select name="primarySelection" value={primarySelection} onChange={(event) => { setPrimarySelection(event.target.value); setSecondarySelection(""); setErrors((current) => ({ ...current, primarySelection: "" })); }} aria-invalid={Boolean(errors.primarySelection)}>
                  <option value="">Service Required *</option>
                  {primaryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                {errors.primarySelection && <small className={styles.error}>{errors.primarySelection}</small>}
              </label>
              <label className={styles.field}>
                <span>Industry</span>
                <select name="industry" value={detail.interest} onChange={(event) => updateField("interest", event.target.value)}>
                  <option value="">Industry</option>
                  {siteIndustries.map((industry) => <option key={industry.slug} value={industry.title}>{industry.title}</option>)}
                </select>
              </label>
              <label className={`${styles.field} ${styles.marketMessage}`}>
                <span>Nature of Requirement *</span>
                <textarea name="message" rows={3} value={detail.message} onChange={(event) => updateField("message", event.target.value)} placeholder="Nature of Requirement *" aria-invalid={Boolean(errors.message)} />
                {errors.message && <small className={styles.error}>{errors.message}</small>}
              </label>
              <label className={styles.field}>
                <span>Target Jurisdiction</span>
                <select name="countriesInvolved" value={detail.countriesInvolved} onChange={(event) => updateField("countriesInvolved", event.target.value)}>
                  <option value="UAE">UAE</option>
                  <option value="India">India</option>
                  <option value="India & UAE">India &amp; UAE</option>
                  <option value="Other">Other</option>
                </select>
              </label>
            </>
          ) : (
            <>
          <label className={styles.field}>
            <span>Full Name *</span>
            <input
              name="name"
              value={detail.name}
              onChange={(event) => updateField("name", event.target.value)}
              autoComplete="name"
              placeholder="Enter your full name"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <small className={styles.error}>{errors.name}</small>}
          </label>

          <label className={styles.field}>
            <span>Business Email *</span>
            <input
              name="email"
              type="email"
              value={detail.email}
              onChange={(event) => updateField("email", event.target.value)}
              autoComplete="email"
              placeholder="you@company.com"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <small className={styles.error}>{errors.email}</small>}
          </label>

          <label className={styles.field}>
            <span>Phone / WhatsApp Number</span>
            <input
              name="phone"
              type="tel"
              value={detail.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              autoComplete="tel"
              placeholder="+91 98765 43210"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <small className={styles.error}>{errors.phone}</small>}
          </label>

          <label className={styles.field}>
            <span>Company / Organisation *</span>
            <input
              name="company"
              value={detail.company}
              onChange={(event) => updateField("company", event.target.value)}
              autoComplete="organization"
              placeholder="Your organisation name"
              aria-invalid={Boolean(errors.company)}
            />
            {errors.company && <small className={styles.error}>{errors.company}</small>}
          </label>

          <label className={styles.field}>
            <span>Designation / Role</span>
            <input
              name="designation"
              value={detail.designation}
              onChange={(event) => updateField("designation", event.target.value)}
              autoComplete="organization-title"
              placeholder="CEO, Head of Legal, Manager..."
            />
          </label>

          <label className={styles.field}>
            <span>What can we help you with? *</span>
            <select
              name="category"
              value={category}
              onChange={(event) => handleCategoryChange(event.target.value as EnquiryCategory)}
              aria-invalid={Boolean(errors.category)}
            >
              {enquiryCategoryOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            {errors.category && <small className={styles.error}>{errors.category}</small>}
          </label>

          {primaryOptions.length > 0 && (
            <label className={styles.field}>
              <span>
                {category === "service"
                  ? "Select Service *"
                  : category === "industry"
                    ? "Select Industry *"
                    : category === "technology"
                      ? "Select Solution Area *"
                      : category === "international"
                        ? "Select Requirement *"
                        : "Select Requirement *"}
              </span>
              <select
                name="primarySelection"
                value={primarySelection}
                onChange={(event) => {
                  setPrimarySelection(event.target.value);
                  setSecondarySelection("");
                  setErrors((current) => ({ ...current, primarySelection: "" }));
                }}
                aria-invalid={Boolean(errors.primarySelection)}
              >
                <option value="">Select an option</option>
                {primaryOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              {errors.primarySelection && <small className={styles.error}>{errors.primarySelection}</small>}
            </label>
          )}

          {secondaryOptions.length > 0 && (
            <label className={styles.field}>
              <span>
                {category === "service"
                  ? "Select Your Requirement *"
                  : category === "industry"
                    ? "What support do you require? *"
                    : category === "technology"
                      ? "Specific Solution / Need *"
                      : "Tell us more *"}
              </span>
              <select
                name="secondarySelection"
                value={secondarySelection}
                onChange={(event) => {
                  setSecondarySelection(event.target.value);
                  setErrors((current) => ({ ...current, secondarySelection: "" }));
                }}
              >
                <option value="">Select an option</option>
                {secondaryOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          )}

          {(category === "technology" || category === "industry" || category === "service") && (
            <>
              {isVisible("companyType") && (
                <label className={styles.field}>
                  <span>Company Type</span>
                  <select name="companyType" value={detail.companyType} onChange={(event) => updateField("companyType", event.target.value)}>
                    <option value="">Select company type</option>
                    {companyTypes.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
              )}

              {isVisible("companySize") && (
                <label className={styles.field}>
                  <span>Company Size</span>
                  <select name="companySize" value={detail.companySize} onChange={(event) => updateField("companySize", event.target.value)}>
                    <option value="">Select size</option>
                    {companySizes.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </label>
              )}
            </>
          )}

          {isVisible("country") && (
            <label className={styles.field}>
              <span>Country *</span>
              <select
                name="country"
                value={detail.country}
                onChange={(event) => updateField("country", event.target.value)}
                aria-invalid={Boolean(errors.country)}
              >
                <option value="">Select country</option>
                {countries.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
              {errors.country && <small className={styles.error}>{errors.country}</small>}
            </label>
          )}

          {detail.country === "India" && isVisible("state") && (
            <label className={styles.field}>
              <span>State / Region</span>
              <select name="state" value={detail.state} onChange={(event) => updateField("state", event.target.value)}>
                <option value="">Select state</option>
                {indianStates.map((state) => <option key={state} value={state}>{state}</option>)}
              </select>
            </label>
          )}

          {isVisible("state") && detail.country !== "India" && (
            <label className={styles.field}>
              <span>State / Region</span>
              <input
                name="state"
                value={detail.state}
                onChange={(event) => updateField("state", event.target.value)}
                placeholder="Enter your state or region"
              />
            </label>
          )}

          {isVisible("city") && (
            <label className={styles.field}>
              <span>City</span>
              <input
                name="city"
                value={detail.city}
                onChange={(event) => updateField("city", event.target.value)}
                placeholder="Enter your city"
              />
            </label>
          )}

          {isVisible("agreementType") && (
            <label className={styles.field}>
              <span>Agreement Type</span>
              <select name="agreementType" value={detail.agreementType} onChange={(event) => updateField("agreementType", event.target.value)}>
                <option value="">Select agreement type</option>
                <option>Vendor Agreement</option>
                <option>Customer Agreement</option>
                <option>Partnership Agreement</option>
                <option>Shareholders Agreement</option>
                <option>Service Agreement</option>
                <option>Employment Agreement</option>
                <option>NDA</option>
                <option>Distribution Agreement</option>
                <option>Licensing Agreement</option>
                <option>Other</option>
              </select>
            </label>
          )}

          {isVisible("matterStage") && (
            <label className={styles.field}>
              <span>Stage</span>
              <select name="matterStage" value={detail.matterStage} onChange={(event) => updateField("matterStage", event.target.value)}>
                <option value="">Select current stage</option>
                <option>New agreement</option>
                <option>Review existing agreement</option>
                <option>Negotiation</option>
                <option>Dispute / issue</option>
                <option>Advice required</option>
                <option>Pre-litigation</option>
                <option>Notice received</option>
                <option>Case filed</option>
                <option>Hearing underway</option>
                <option>Appeal</option>
                <option>Enforcement</option>
                <option>Other</option>
              </select>
            </label>
          )}

          {isVisible("licenceNeed") && (
            <label className={styles.field}>
              <span>What do you require?</span>
              <select name="licenceNeed" value={detail.licenceNeed} onChange={(event) => updateField("licenceNeed", event.target.value)}>
                <option value="">Select requirement</option>
                <option>New licence</option>
                <option>Registration</option>
                <option>Renewal</option>
                <option>Modification</option>
                <option>Approval</option>
                <option>Compliance support</option>
                <option>Unsure / Need consultation</option>
              </select>
            </label>
          )}

          {isVisible("regulator") && (
            <label className={styles.field}>
              <span>Applicable Authority / Regulator</span>
              <input
                name="regulator"
                value={detail.regulator}
                onChange={(event) => updateField("regulator", event.target.value)}
                placeholder="Regulator or authority"
              />
            </label>
          )}

          {isVisible("currentStatus") && (
            <label className={styles.field}>
              <span>Current Status</span>
              <select name="currentStatus" value={detail.currentStatus} onChange={(event) => updateField("currentStatus", event.target.value)}>
                <option value="">Select status</option>
                <option>Planning stage</option>
                <option>Application not started</option>
                <option>Application in progress</option>
                <option>Query received</option>
                <option>Approval pending</option>
                <option>Existing licence</option>
                <option>Unsure</option>
              </select>
            </label>
          )}

          {isVisible("transactionType") && (
            <label className={styles.field}>
              <span>Transaction Type</span>
              <select name="transactionType" value={detail.transactionType} onChange={(event) => updateField("transactionType", event.target.value)}>
                <option value="">Select type</option>
                <option>Foreign Direct Investment</option>
                <option>Overseas Direct Investment</option>
                <option>External Commercial Borrowing</option>
                <option>Foreign Remittance</option>
                <option>Share Transfer</option>
                <option>Cross-Border Acquisition</option>
                <option>Investment Restructuring</option>
                <option>RBI Approval / Filing</option>
                <option>Other</option>
              </select>
            </label>
          )}

          {isVisible("countriesInvolved") && (
            <label className={styles.field}>
              <span>Countries Involved</span>
              <input
                name="countriesInvolved"
                value={detail.countriesInvolved}
                onChange={(event) => updateField("countriesInvolved", event.target.value)}
                placeholder="India, UAE, Singapore, etc."
              />
            </label>
          )}

          {isVisible("transactionStage") && (
            <label className={styles.field}>
              <span>Transaction Stage</span>
              <select name="transactionStage" value={detail.transactionStage} onChange={(event) => updateField("transactionStage", event.target.value)}>
                <option value="">Select stage</option>
                <option>Planning</option>
                <option>Structuring</option>
                <option>Documentation</option>
                <option>Filing / approval</option>
                <option>Completed but compliance pending</option>
                <option>Issue / notice received</option>
              </select>
            </label>
          )}

          {isVisible("ipRequirement") && (
            <label className={styles.field}>
              <span>IP Requirement</span>
              <select name="ipRequirement" value={detail.ipRequirement} onChange={(event) => updateField("ipRequirement", event.target.value)}>
                <option value="">Select IP requirement</option>
                <option>Trademark</option>
                <option>Copyright</option>
                <option>Patent</option>
                <option>Industrial Design</option>
                <option>IP Strategy</option>
                <option>Licensing</option>
                <option>Assignment</option>
                <option>Infringement</option>
                <option>Opposition</option>
                <option>Portfolio Management</option>
                <option>Other</option>
              </select>
            </label>
          )}

          {isVisible("timeline") && (
            <label className={styles.field}>
              <span>When would you like to begin?</span>
              <select name="timeline" value={detail.timeline} onChange={(event) => updateField("timeline", event.target.value)}>
                <option value="">Select timeline</option>
                {timelineOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          )}

          {isVisible("preferredContact") && (
            <label className={styles.field}>
              <span>Preferred Contact Method</span>
              <select name="preferredContact" value={detail.preferredContact} onChange={(event) => updateField("preferredContact", event.target.value)}>
                {preferredContactOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
          )}

          <label className={`${styles.field} ${styles.fullWidth}`}>
            <span>Briefly describe your requirement *</span>
            <textarea
              name="message"
              rows={5}
              value={detail.message}
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="Tell us about your objective, current situation or the support you need."
              aria-invalid={Boolean(errors.message)}
            />
            {errors.message && <small className={styles.error}>{errors.message}</small>}
          </label>
            </>
          )}
        </div>

        <label className={styles.checkRow}>
          <input
            type="checkbox"
            name="consent"
            checked={detail.consent}
            onChange={(event) => updateField("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
          />
          <span>
            {variant === "market" ? "I agree to be contacted by Astronis Global." : <>I consent to Astronis Global contacting me regarding my enquiry. <span className={styles.privacyLink}><Link href="/legal/privacy-policy">Privacy Policy</Link></span></>}
          </span>
        </label>
        {errors.consent && <small className={styles.error}>{errors.consent}</small>}

        <label className={styles.honey} aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <div className={styles.actions}>
          <button type="submit" className={styles.button} disabled={busy}>
            {busy ? "Sending…" : variant === "market" ? "Request a Consultation" : "Submit Enquiry"}
            <Icon name="arrow" />
          </button>
          <span className={styles.confidentiality}>Your information is treated as confidential.</span>
        </div>

        {status && (
          <p className={`${styles.status} ${success ? styles.success : styles.error}`} role="status">
            {status}
            {!success && (
              <>
                {" "}
                <a href="mailto:advisory@astronisglobal.com">Email our team</a>
              </>
            )}
          </p>
        )}
      </form>
    </div>
  );
}
