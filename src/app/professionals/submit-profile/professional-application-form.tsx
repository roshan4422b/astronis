"use client";

import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import Icon from "@/app/_components/icon";
import EmailOtpVerification from "@/app/_components/email-otp-verification";
import { getFormVerification } from "@/lib/form-verification.client";
import {
  applicantDeclaration, applicationSteps, backgrounds, categories, countries, engagementOptions, experienceBands,
  hierarchiesFor, indianStates, isSeniorReview, positionsFor, positionDisplayLabel, qualificationGuidance,
  specialisationsFor, subdivisionCountryCodes, regions, type CategoryCode,
} from "@/data/professional-application-taxonomy";
import styles from "./professional-application.module.css";

type Answers = {
  applicantName: string; email: string; phone: string;
  category: string; hierarchy: string; position: string; marketCountry: string; specialisations: string[];
  backgroundCodes: string[]; otherBackground: string; registrationType: string; registrationNumber: string;
  issuingBody: string; registrationJurisdiction: string; registrationDetails: string;
  experienceBand: string; exactYears: string; preferredCountry: string; preferredRegion: string;
  preferredState: string; preferredCity: string; currentCountry: string; currentCity: string;
  engagementType: string; currentOrganisation: string; currentDesignation: string; profileUrl: string;
  declarationAccepted: boolean; privacyConsentAccepted: boolean;
};
type FormErrors = Record<string, string>;
const initialAnswers: Answers = {
  applicantName: "", email: "", phone: "", category: "", hierarchy: "", position: "", marketCountry: "", specialisations: [],
  backgroundCodes: [], otherBackground: "", registrationType: "", registrationNumber: "", issuingBody: "", registrationJurisdiction: "", registrationDetails: "",
  experienceBand: "", exactYears: "", preferredCountry: "", preferredRegion: "", preferredState: "", preferredCity: "", currentCountry: "", currentCity: "",
  engagementType: "", currentOrganisation: "", currentDesignation: "", profileUrl: "", declarationAccepted: false, privacyConsentAccepted: false,
};
const regulatedBackgrounds = new Set(["PQ-01", "PQ-02", "PQ-03", "PQ-04", "PQ-08", "PQ-09", "PQ-14"]);
const countriesListId = "professional-application-country-options";

function getCountry(code: string) { return countries.find((country) => country.code === code); }
function getOption(options: { code: string; label: string }[], code: string) { return options.find((option) => option.code === code); }
function listLabel(options: { code: string; label: string }[], codes: string[]) { return codes.map((code) => getOption(options, code)?.label).filter(Boolean).join(", ") || "—"; }
function text(value: string) { return value.trim(); }
function emailIsValid(value: string) { return /^\S+@\S+\.\S+$/.test(value); }

export default function ProfessionalApplicationForm({ maxFileBytes, internRecruitmentOpen }: { maxFileBytes: number; internRecruitmentOpen: boolean }) {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [, setCaptchaToken] = useState("");
  const [status, setStatus] = useState("");
  const [successReference, setSuccessReference] = useState("");
  const [preferredCountryInput, setPreferredCountryInput] = useState("");
  const [marketCountryInput, setMarketCountryInput] = useState("");
  const [currentCountryInput, setCurrentCountryInput] = useState("");
  const [specialisationSearch, setSpecialisationSearch] = useState("");

  const category = answers.category as CategoryCode | "";
  const hierarchyOptions = useMemo(() => category ? hierarchiesFor(category) : [], [category]);
  const roleOptions = useMemo(() => category && answers.hierarchy ? positionsFor(category, answers.hierarchy) : [], [category, answers.hierarchy]);
  const selectedPosition = roleOptions.find((position) => position.code === answers.position);
  const marketCountry = getCountry(answers.marketCountry);
  const preferredCountry = getCountry(answers.preferredCountry);
  const registrationVisible = answers.backgroundCodes.some((code) => regulatedBackgrounds.has(code));
  const registrationRequired = category === "LA" && answers.backgroundCodes.includes("PQ-01");
  const specializationOptions = useMemo(() => category ? specialisationsFor(category) : [], [category]);
  const filteredSpecializations = specializationOptions.filter((option) => option.label.toLowerCase().includes(specialisationSearch.trim().toLowerCase()));
  const engagementChoices = category ? engagementOptions(category, selectedPosition, internRecruitmentOpen) : [];
  const needsSubdivision = Boolean(answers.preferredCountry && subdivisionCountryCodes.has(answers.preferredCountry));
  const subdivisionsFromIndia = answers.preferredCountry === "IN";
  const currentCountry = getCountry(answers.currentCountry);

  function update<K extends keyof Answers>(key: K, value: Answers[K]) {
    setAnswers((current) => ({ ...current, [key]: value }));
    setErrors((current) => { const next = { ...current }; delete next[key]; return next; });
    setStatus("");
  }

  function setCountrySearch(kind: "preferred" | "market" | "current", value: string) {
    if (kind === "preferred") {
      setPreferredCountryInput(value);
      const found = countries.find((country) => country.label.toLowerCase() === value.trim().toLowerCase());
      setAnswers((current) => ({ ...current, preferredCountry: found?.code || "", preferredRegion: found?.region || "", preferredState: "" }));
      setErrors((current) => { const next = { ...current }; delete next.preferredCountry; delete next.preferredRegion; delete next.preferredState; return next; });
    } else if (kind === "market") {
      setMarketCountryInput(value);
      const found = countries.find((country) => country.label.toLowerCase() === value.trim().toLowerCase());
      setAnswers((current) => ({ ...current, marketCountry: found?.code || "" }));
      setErrors((current) => { const next = { ...current }; delete next.marketCountry; return next; });
    } else {
      setCurrentCountryInput(value);
      const found = countries.find((country) => country.label.toLowerCase() === value.trim().toLowerCase());
      setAnswers((current) => ({ ...current, currentCountry: found?.code || "" }));
    }
  }

  function toggleCode(key: "specialisations" | "backgroundCodes", code: string) {
    const current = answers[key];
    const next = current.includes(code) ? current.filter((item) => item !== code) : [...current, code];
    update(key, next);
  }

  function changeCategory(value: string) {
    setAnswers((current) => ({ ...current, category: value, hierarchy: "", position: "", marketCountry: "", specialisations: [], engagementType: "" }));
    setMarketCountryInput(""); setSpecialisationSearch(""); setErrors({}); setStatus("");
  }

  function changeHierarchy(value: string) {
    setAnswers((current) => ({ ...current, hierarchy: value, position: "", specialisations: [], engagementType: "" }));
    setSpecialisationSearch(""); setErrors({}); setStatus("");
  }

  function changePosition(value: string) {
    setAnswers((current) => ({ ...current, position: value, specialisations: [], engagementType: "" }));
    setSpecialisationSearch(""); setErrors({}); setStatus("");
  }

  function updateUpload(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0];
    if (!nextFile) return;
    const extension = nextFile.name.split(".").pop()?.toLowerCase();
    if (!extension || !["pdf", "doc", "docx"].includes(extension)) {
      setFileError("Upload a PDF, DOC or DOCX file."); setFile(null); event.target.value = ""; return;
    }
    if (nextFile.size <= 0 || nextFile.size > maxFileBytes) {
      setFileError(`Choose a file no larger than ${Math.floor(maxFileBytes / (1024 * 1024))} MB.`); setFile(null); event.target.value = ""; return;
    }
    setFile(nextFile); setFileError(""); setErrors((current) => { const next = { ...current }; delete next.cv; return next; });
  }

  function validateStep(target: number): FormErrors {
    const next: FormErrors = {};
    const requireValue = (key: keyof Answers, label: string) => { if (!text(String(answers[key] ?? ""))) next[key] = `${label} is required.`; };
    if (target === 0) {
      requireValue("category", "Category");
      requireValue("hierarchy", "Hierarchy");
      requireValue("position", "Applied position");
      if (category === "GN") requireValue("marketCountry", "Country or market for this application");
      if (answers.position && !selectedPosition) next.position = "Choose a position available in the selected category and hierarchy.";
    }
    if (target === 1) {
      requireValue("applicantName", "Full name");
      if (!emailIsValid(answers.email)) next.email = "Enter a valid email address.";
      if (answers.backgroundCodes.length === 0) next.backgroundCodes = "Select at least one professional background.";
      if (answers.backgroundCodes.includes("PQ-17") && text(answers.otherBackground).length < 3) next.otherBackground = "Please specify your professional background.";
      if (registrationRequired && !text(answers.registrationType)) next.registrationType = "Enter your professional registration or enrolment type.";
      if (registrationRequired && !text(answers.issuingBody)) next.issuingBody = "Enter the professional body or authority.";
      if (registrationRequired && !text(answers.registrationJurisdiction)) next.registrationJurisdiction = "Enter the jurisdiction for this registration.";
    }
    if (target === 2) {
      requireValue("experienceBand", "Relevant experience");
      if (answers.exactYears !== "" && (!Number.isFinite(Number(answers.exactYears)) || Number(answers.exactYears) < 0 || Number(answers.exactYears) > 60)) next.exactYears = "Enter a number from 0 to 60, or leave this field empty.";
      requireValue("preferredCountry", "Country"); requireValue("preferredRegion", "Region"); requireValue("preferredCity", "City");
      if (needsSubdivision) requireValue("preferredState", "State or province");
      if (preferredCountry && answers.preferredRegion !== preferredCountry.region) next.preferredRegion = "Select the region associated with the preferred country.";
      if (subdivisionsFromIndia && answers.preferredState && !indianStates.includes(answers.preferredState)) next.preferredState = "Choose a state or union territory from the list.";
      requireValue("engagementType", "Engagement type");
      if (answers.engagementType && !engagementChoices.some((option) => option.code === answers.engagementType)) next.engagementType = "Choose an engagement type available for this application.";
    }
    if (target === 3) {
      if (!file) next.cv = "Upload your professional CV or profile.";
      if (answers.profileUrl) {
        try { const url = new URL(answers.profileUrl); if (!['http:', 'https:'].includes(url.protocol)) next.profileUrl = "Enter an http or https profile URL."; }
        catch { next.profileUrl = "Enter a valid professional profile URL."; }
      }
    }
    if (target === 4) {
      if (!answers.declarationAccepted) next.declarationAccepted = "Confirm the applicant declaration to continue.";
      if (!answers.privacyConsentAccepted) next.privacyConsentAccepted = "Accept the privacy policy to submit this application.";
    }
    return next;
  }

  function continueToNext() {
    const nextErrors = validateStep(step);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStep((current) => Math.min(current + 1, applicationSteps.length - 1));
    setStatus("");
  }

  function validateAll() {
    const all: FormErrors = {};
    for (let current = 0; current < applicationSteps.length; current++) Object.assign(all, validateStep(current));
    return all;
  }

  function editStep(target: number) {
    setStep(target); setErrors({}); setStatus("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateAll();
    setErrors(nextErrors);
    const firstInvalidStep = applicationSteps.findIndex((_, index) => Object.keys(validateStep(index)).length > 0);
    if (firstInvalidStep >= 0) { setStep(firstInvalidStep); return; }
    if (!file) return;

    const chosenCategory = categories.find((item) => item.code === answers.category);
    const chosenHierarchy = hierarchyOptions.find((item) => item.code === answers.hierarchy);
    const role = positionsFor(category as CategoryCode, answers.hierarchy).find((item) => item.code === answers.position);
    const chosenMarket = getCountry(answers.marketCountry);
    const selectedBackgrounds = backgrounds.filter((item) => answers.backgroundCodes.includes(item.code));
    const selectedSpecialisations = specializationOptions.filter((item) => answers.specialisations.includes(item.code));
    const experience = experienceBands.find((item) => item.code === answers.experienceBand);
    const engagement = engagementChoices.find((item) => item.code === answers.engagementType);
    if (!chosenCategory || !chosenHierarchy || !role || !experience || !engagement) { setStatus("Some selections changed. Review the earlier steps and try again."); return; }

    const application = {
      applicant: { fullName: text(answers.applicantName), email: text(answers.email), phone: text(answers.phone) || undefined },
      category: { code: chosenCategory.code, label: chosenCategory.label },
      hierarchy: { code: chosenHierarchy.code, label: chosenHierarchy.label },
      position: { code: role.code, label: positionDisplayLabel(role, chosenMarket?.label), seniorReviewRequired: isSeniorReview(role) },
      applicationMarket: chosenMarket ? { countryCode: chosenMarket.code, country: chosenMarket.label } : undefined,
      specialisations: selectedSpecialisations.map(({ code, label }) => ({ code, label })),
      professionalBackgrounds: selectedBackgrounds.map(({ code, label }) => ({ code, label })),
      otherProfessionalBackground: answers.backgroundCodes.includes("PQ-17") ? text(answers.otherBackground) : undefined,
      registration: registrationVisible ? {
        type: text(answers.registrationType) || undefined,
        number: text(answers.registrationNumber) || undefined,
        issuingBody: text(answers.issuingBody) || undefined,
        jurisdiction: text(answers.registrationJurisdiction) || undefined,
        additionalDetails: text(answers.registrationDetails) || undefined,
      } : undefined,
      experience: { code: experience.code, label: experience.label, indicativeFit: experience.fit, exactYears: answers.exactYears === "" ? undefined : Number(answers.exactYears) },
      preferredLocation: { countryCode: preferredCountry?.code, country: preferredCountry?.label, region: answers.preferredRegion, stateOrProvince: text(answers.preferredState) || undefined, city: text(answers.preferredCity) },
      currentLocation: answers.currentCountry ? { countryCode: currentCountry?.code, country: currentCountry?.label, city: text(answers.currentCity) || undefined } : undefined,
      engagement: { code: engagement.code, label: engagement.label },
      currentOrganisation: text(answers.currentOrganisation) || undefined,
      currentDesignation: text(answers.currentDesignation) || undefined,
      professionalProfileUrl: text(answers.profileUrl) || undefined,
      declarationAccepted: answers.declarationAccepted,
      privacyConsentAccepted: answers.privacyConsentAccepted,
      privacyPolicyPath: "/legal/privacy-policy",
    };

    const data = new FormData();
    data.set("application", JSON.stringify(application));
    data.set("website", website);
    data.set("cv", file);
    try {
      const verification = getFormVerification(event.currentTarget);
      data.set("captchaToken", verification.captchaToken ?? "");
      data.set("emailVerificationToken", verification.emailVerificationToken);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Verify your email address before submitting.");
      return;
    }
    setSubmitting(true); setStatus("");
    try {
      const response = await fetch("/api/professional-application", { method: "POST", body: data });
      const result = await response.json() as { message?: string; applicationReference?: string };
      if (!response.ok) { setStatus(result.message || "We couldn't submit your application. Please review it and try again."); return; }
      setSuccessReference(result.applicationReference || "");
    } catch {
      setStatus("We couldn't connect to the application service. Your information is still here; please try again.");
    } finally { setSubmitting(false); }
  }

  const selectedHierarchy = hierarchyOptions.find((option) => option.code === answers.hierarchy);
  const selectedExperience = experienceBands.find((option) => option.code === answers.experienceBand);
  const selectedEngagement = engagementChoices.find((option) => option.code === answers.engagementType);
  const error = (key: keyof Answers | "cv") => errors[key] ? <span id={`${key}-error`} className={styles.errorText} role="alert">{errors[key]}</span> : null;
  const label = (key: keyof Answers, message: string) => errors[key] ? { "aria-invalid": true as const, "aria-describedby": `${key}-error`, title: message } : {};
  const countryOptions = <datalist id={countriesListId}>{countries.map((country) => <option key={country.code} value={country.label}>{country.region}</option>)}</datalist>;

  if (successReference) return <section className={styles.successPanel} role="status" aria-labelledby="application-received"><span className={styles.successIcon}><Icon name="check" /></span><span className={styles.eyebrow}>Application received</span><h2 id="application-received">Thank you for sharing your profile.</h2><p>Your application has been received for review. This submission does not constitute an offer, appointment or professional designation.</p><div className={styles.reference}>Application reference <strong>{successReference}</strong></div><Link href="/professionals">Return to Professionals <Icon name="arrow" /></Link></section>;

  return <section className={styles.formShell} aria-labelledby="form-step-title">
    <div className={styles.formIntro}><span className={styles.eyebrow}>Professional application</span><h2>Share your profile for consideration</h2><p>Choose the pathway that best reflects your experience. The team will review your information and determine any suitable next steps.</p><div className={styles.guidanceCard}><Icon name="shield" /><p>Applicant-selected classifications are for review only. Any role or relationship is subject to assessment, verification and formal written confirmation.</p></div></div>
    <div className={styles.formColumn}>
      <ol className={styles.progress} aria-label="Application progress">{applicationSteps.map((title, index) => <li key={title} aria-current={index === step ? "step" : undefined} className={index === step ? styles.currentStep : index < step ? styles.completedStep : ""}><span>{String(index + 1).padStart(2, "0")}</span><strong>{title}</strong></li>)}</ol>
      <form id="application-form" className={styles.applicationForm} onSubmit={submit}>
        <input className={styles.honeypot} type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={website} onChange={(event) => setWebsite(event.target.value)} />
        
        {countryOptions}<div className={styles.stepHeading}><span>Step {step + 1} of {applicationSteps.length}</span><h2 id="form-step-title">{applicationSteps[step]}</h2></div>

        {step === 0 && <div className={styles.fieldStack}>
          <label className={styles.field}>Category / Pillar <b>*</b><select value={answers.category} onChange={(event) => changeCategory(event.target.value)} {...label("category", "Category is required.")}><option value="">Choose a professional pathway</option>{categories.map((item) => <option key={item.code} value={item.code}>{item.label} ({item.code})</option>)}</select>{error("category")}{category === "GN" && <small>Global Network &amp; International is a horizontal category supporting the advisory pillars.</small>}</label>
          {category && <div className={styles.fieldGrid}>
            <label className={styles.field}>Hierarchy <b>*</b><select value={answers.hierarchy} onChange={(event) => changeHierarchy(event.target.value)} {...label("hierarchy", "Hierarchy is required.")}><option value="">Choose a hierarchy</option>{hierarchyOptions.map((item) => <option key={item.code} value={item.code}>{item.label} ({item.code})</option>)}</select>{error("hierarchy")}</label>
            {answers.hierarchy && <label className={styles.field}>Applied Position <b>*</b><select value={answers.position} onChange={(event) => changePosition(event.target.value)} {...label("position", "Position is required.")}><option value="">Choose a position</option>{roleOptions.map((item) => <option key={item.code} value={item.code}>{positionDisplayLabel(item, marketCountry?.label)} · {item.code}</option>)}</select>{error("position")}</label>}
          </div>}
          {selectedPosition?.dynamicCountry && <div className={styles.field}><label htmlFor="market-country">Country for this position <b>*</b></label><input id="market-country" list={countriesListId} value={marketCountryInput || marketCountry?.label || ""} onChange={(event) => setCountrySearch("market", event.target.value)} placeholder="Search or select a country" aria-invalid={Boolean(errors.marketCountry)} aria-describedby={errors.marketCountry ? "marketCountry-error" : undefined} />{error("marketCountry")}<small>Position title: {positionDisplayLabel(selectedPosition, marketCountry?.label)}</small></div>}
          {category === "GN" && selectedPosition && !selectedPosition.dynamicCountry && <div className={styles.field}><label htmlFor="market-country">Country or market this application relates to <b>*</b></label><input id="market-country" list={countriesListId} value={marketCountryInput || marketCountry?.label || ""} onChange={(event) => setCountrySearch("market", event.target.value)} placeholder="Search or select a country" aria-invalid={Boolean(errors.marketCountry)} aria-describedby={errors.marketCountry ? "marketCountry-error" : undefined} />{error("marketCountry")}</div>}
          {selectedPosition && <div className={styles.multiSelectBlock}><div className={styles.blockHeading}><span>Specialisation / Practice Area <em>Optional</em></span><small>Select all relevant areas. You can search the approved list.</small></div><label className={styles.searchField}><span className={styles.visuallyHidden}>Search specialisations</span><input type="search" value={specialisationSearch} onChange={(event) => setSpecialisationSearch(event.target.value)} placeholder="Search specialisations" /><Icon name="search" /></label><div className={styles.chipList} role="group" aria-label="Specialisations">{filteredSpecializations.length ? filteredSpecializations.map((item) => <button type="button" key={item.code} aria-pressed={answers.specialisations.includes(item.code)} className={answers.specialisations.includes(item.code) ? styles.selectedChip : styles.chip} onClick={() => toggleCode("specialisations", item.code)}>{item.label}</button>) : <p className={styles.emptyState}>No matching specialisations. Try another search.</p>}</div>{answers.specialisations.length > 0 && <button type="button" className={styles.clearSelection} onClick={() => update("specialisations", [])}>Clear selected specialisations</button>}</div>}
          {selectedPosition && <p className={styles.note}><Icon name="info" />Selecting a position does not create or guarantee an appointment, partnership, employment or designation.</p>}
        </div>}

        {step === 1 && <div className={styles.fieldStack}>
          <div className={styles.fieldGrid}><label className={styles.field}>Full name <b>*</b><input autoComplete="name" maxLength={120} value={answers.applicantName} onChange={(event) => update("applicantName", event.target.value)} {...label("applicantName", "Full name is required.")} />{error("applicantName")}</label><label className={styles.field}>Email address <b>*</b><input type="email" autoComplete="email" maxLength={180} value={answers.email} onChange={(event) => update("email", event.target.value)} {...label("email", "A valid email is required.")} />{error("email")}</label></div>
          <label className={styles.field}>Phone number <em>Optional</em><input type="tel" autoComplete="tel" maxLength={35} value={answers.phone} onChange={(event) => update("phone", event.target.value)} /></label>
          <fieldset className={styles.choiceFieldset} aria-describedby={errors.backgroundCodes ? "backgroundCodes-error" : undefined}><legend>Professional Background / Qualification <b>*</b><small>Select all that apply. This is separate from the position you are applying for.</small></legend><div className={styles.chipList}>{backgrounds.map((item) => <button type="button" key={item.code} aria-pressed={answers.backgroundCodes.includes(item.code)} className={answers.backgroundCodes.includes(item.code) ? styles.selectedChip : styles.chip} onClick={() => toggleCode("backgroundCodes", item.code)}>{item.label}</button>)}</div>{error("backgroundCodes")}</fieldset>
          {answers.backgroundCodes.includes("PQ-17") && <label className={styles.field}>Please specify your professional background <b>*</b><input value={answers.otherBackground} maxLength={180} onChange={(event) => update("otherBackground", event.target.value)} {...label("otherBackground", "Please provide a meaningful description.")} />{error("otherBackground")}</label>}
          <aside className={styles.guidanceCard}><Icon name="info" /><div><strong>Background guidance for {getOption(categories, category)?.label}</strong><p>{qualificationGuidance[category as CategoryCode]} These are guidance only; final consideration depends on the position, experience, credential verification and applicable requirements.</p></div></aside>
          {registrationVisible && <fieldset className={styles.registrationFieldset}><legend>Professional Registration / Enrolment / Membership <small>Complete the details relevant to your background. A registration number is not required from every applicant.</small></legend><div className={styles.fieldGrid}><label className={styles.field}>Registration / membership type {registrationRequired && <b>*</b>}<input value={answers.registrationType} maxLength={140} onChange={(event) => update("registrationType", event.target.value)} {...label("registrationType", "Registration type is required for this legal role.")} />{error("registrationType")}</label><label className={styles.field}>Registration or membership number <em>Optional</em><input value={answers.registrationNumber} maxLength={100} onChange={(event) => update("registrationNumber", event.target.value)} /></label><label className={styles.field}>Professional body or authority {registrationRequired && <b>*</b>}<input value={answers.issuingBody} maxLength={180} onChange={(event) => update("issuingBody", event.target.value)} {...label("issuingBody", "Professional body is required for this legal role.")} />{error("issuingBody")}</label><label className={styles.field}>Jurisdiction / issuing location {registrationRequired && <b>*</b>}<input value={answers.registrationJurisdiction} maxLength={120} onChange={(event) => update("registrationJurisdiction", event.target.value)} {...label("registrationJurisdiction", "Registration jurisdiction is required for this legal role.")} />{error("registrationJurisdiction")}</label></div><label className={styles.field}>Additional registration details <em>Optional</em><textarea rows={3} maxLength={500} value={answers.registrationDetails} onChange={(event) => update("registrationDetails", event.target.value)} /></label><p className={styles.note}><Icon name="shield" />Credentials and authorisations will be verified before any applicable appointment or designation.</p></fieldset>}
        </div>}

        {step === 2 && <div className={styles.fieldStack}>
          <div className={styles.fieldGrid}><label className={styles.field}>Relevant experience <b>*</b><select value={answers.experienceBand} onChange={(event) => update("experienceBand", event.target.value)} {...label("experienceBand", "Choose an experience band.")}><option value="">Choose an experience band</option>{experienceBands.map((item) => <option key={item.code} value={item.code}>{item.code} · {item.label}</option>)}</select>{error("experienceBand")}{selectedExperience && <small>Indicative role fit only: {selectedExperience.fit}. This does not determine eligibility or designation.</small>}</label><label className={styles.field}>Exact years of experience <em>Optional</em><input type="number" min="0" max="60" step="0.5" value={answers.exactYears} onChange={(event) => update("exactYears", event.target.value)} {...label("exactYears", "Enter 0 to 60 years.")} />{error("exactYears")}</label></div>
          <div className={styles.subsection}><h3>Preferred professional location</h3><p>Choose the location where you would prefer to work or collaborate.</p></div>
          <div className={styles.fieldGrid}><label className={styles.field}>Country <b>*</b><input list={countriesListId} value={preferredCountryInput || preferredCountry?.label || ""} onChange={(event) => setCountrySearch("preferred", event.target.value)} placeholder="Search or select a country" {...label("preferredCountry", "Select a country from the list.")} />{error("preferredCountry")}</label><label className={styles.field}>Region / international region <b>*</b><select value={answers.preferredRegion} onChange={(event) => update("preferredRegion", event.target.value)} {...label("preferredRegion", "Choose a region.")}><option value="">Select a region</option>{regions.map((region) => <option key={region} value={region}>{region}</option>)}</select>{error("preferredRegion")}</label>
            {subdivisionsFromIndia ? <label className={styles.field}>State or union territory <b>*</b><select value={answers.preferredState} onChange={(event) => update("preferredState", event.target.value)} {...label("preferredState", "Choose a state or union territory.")}><option value="">Select state / union territory</option>{indianStates.map((state) => <option key={state}>{state}</option>)}</select>{error("preferredState")}</label> : <label className={styles.field}>State or province {needsSubdivision && <b>*</b>}<input value={answers.preferredState} maxLength={120} onChange={(event) => update("preferredState", event.target.value)} placeholder={needsSubdivision ? "Enter state or province" : "If applicable"} {...label("preferredState", "State or province is required for this country.")} />{error("preferredState")}</label>}
            <label className={styles.field}>City <b>*</b><input autoComplete="address-level2" value={answers.preferredCity} maxLength={120} onChange={(event) => update("preferredCity", event.target.value)} {...label("preferredCity", "City is required.")} />{error("preferredCity")}</label></div>
          <details className={styles.optionalLocation}><summary>My current location is different (optional)</summary><div className={styles.fieldGrid}><label className={styles.field}>Current country<input list={countriesListId} value={currentCountryInput || currentCountry?.label || ""} onChange={(event) => setCountrySearch("current", event.target.value)} placeholder="Search or select a country" /></label><label className={styles.field}>Current city<input value={answers.currentCity} maxLength={120} onChange={(event) => update("currentCity", event.target.value)} /></label></div></details>
          <label className={styles.field}>Engagement / Association Type <b>*</b><select value={answers.engagementType} onChange={(event) => update("engagementType", event.target.value)} {...label("engagementType", "Choose an engagement type.")}><option value="">Choose an engagement type</option>{engagementChoices.map((item) => <option key={item.code} value={item.code}>{item.code} · {item.label}</option>)}</select>{error("engagementType")}<small>Selection is a preference only and does not assign an employment or network relationship.</small></label>
          <div className={styles.subsection}><h3>Current organisation</h3><p>Optional. Leave these fields empty if they do not apply to you.</p></div>
          <div className={styles.fieldGrid}><label className={styles.field}>Current organisation <em>Optional</em><input autoComplete="organization" maxLength={180} value={answers.currentOrganisation} onChange={(event) => update("currentOrganisation", event.target.value)} /></label><label className={styles.field}>Current designation <em>Optional</em><input maxLength={180} value={answers.currentDesignation} onChange={(event) => update("currentDesignation", event.target.value)} /></label></div>
        </div>}

        {step === 3 && <div className={styles.fieldStack}>
          <label className={styles.field}>CV / Resume <b>*</b><span className={styles.uploadHint}>PDF, DOC or DOCX · Maximum {Math.max(1, Math.floor(maxFileBytes / (1024 * 1024)))} MB</span><input className={styles.fileInput} type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={updateUpload} aria-invalid={Boolean(fileError || errors.cv)} aria-describedby={fileError || errors.cv ? "cv-error" : undefined} />{file ? <span className={styles.fileStatus}><Icon name="file" />{file.name}<button type="button" onClick={() => { setFile(null); setFileError(""); }}>Remove</button></span> : <span className={styles.dropZone}><Icon name="upload" /><span>Choose a professional CV or profile document</span></span>}{(fileError || errors.cv) && <span className={styles.errorText} id="cv-error" role="alert">{fileError || errors.cv}</span>}</label>
          <label className={styles.field}>Professional Profile URL <em>Optional</em><input type="url" inputMode="url" maxLength={500} placeholder="https://" value={answers.profileUrl} onChange={(event) => update("profileUrl", event.target.value)} {...label("profileUrl", "Enter a valid http or https URL.")} />{error("profileUrl")}<small>May link to a professional profile, portfolio or LinkedIn page.</small></label>
          <aside className={styles.guidanceCard}><Icon name="lock" /><p>Your document will be sent to the configured private application intake service. It is not published as a public profile.</p></aside>
        </div>}

        {step === 4 && <div className={styles.fieldStack}>
          <div className={styles.reviewHeading}><p>Review your application and edit any step before submitting.</p><span>{Boolean(selectedPosition && isSeniorReview(selectedPosition)) ? "Senior manual review flag: Yes" : "Senior manual review flag: No"}</span></div>
          <section className={styles.reviewGroup}><div><h3>Professional pathway</h3><button type="button" onClick={() => editStep(0)}>Edit</button></div><dl><dt>Applicant</dt><dd>{answers.applicantName} · {answers.email}</dd><dt>Category</dt><dd>{getOption(categories, answers.category)?.code} · {getOption(categories, answers.category)?.label}</dd><dt>Hierarchy</dt><dd>{selectedHierarchy?.code} · {selectedHierarchy?.label}</dd><dt>Applied position</dt><dd>{selectedPosition?.code} · {selectedPosition ? positionDisplayLabel(selectedPosition, marketCountry?.label) : ""}</dd>{category === "GN" && <><dt>Market</dt><dd>{marketCountry?.label}</dd></>}<dt>Specialisations</dt><dd>{listLabel(specializationOptions, answers.specialisations)}</dd></dl></section>
          <section className={styles.reviewGroup}><div><h3>Background &amp; credentials</h3><button type="button" onClick={() => editStep(1)}>Edit</button></div><dl><dt>Professional backgrounds</dt><dd>{listLabel(backgrounds, answers.backgroundCodes)}{answers.otherBackground ? ` — ${answers.otherBackground}` : ""}</dd>{registrationVisible && <><dt>Registration type</dt><dd>{answers.registrationType || "Not provided"}</dd><dt>Registration number</dt><dd>{answers.registrationNumber || "Not provided"}</dd><dt>Professional body</dt><dd>{answers.issuingBody || "Not provided"}</dd><dt>Jurisdiction</dt><dd>{answers.registrationJurisdiction || "Not provided"}</dd></>}</dl></section>
          <section className={styles.reviewGroup}><div><h3>Experience, location &amp; engagement</h3><button type="button" onClick={() => editStep(2)}>Edit</button></div><dl><dt>Experience</dt><dd>{selectedExperience?.code} · {selectedExperience?.label}{answers.exactYears ? ` · ${answers.exactYears} exact years` : ""}</dd><dt>Preferred location</dt><dd>{[preferredCountry?.label, answers.preferredRegion, answers.preferredState, answers.preferredCity].filter(Boolean).join(", ")}</dd>{currentCountry && <><dt>Current location</dt><dd>{[currentCountry.label, answers.currentCity].filter(Boolean).join(", ")}</dd></>}<dt>Engagement type</dt><dd>{selectedEngagement?.code} · {selectedEngagement?.label}</dd><dt>Current organisation</dt><dd>{answers.currentOrganisation || "Not provided"}</dd><dt>Current designation</dt><dd>{answers.currentDesignation || "Not provided"}</dd></dl></section>
          <section className={styles.reviewGroup}><div><h3>CV &amp; profile</h3><button type="button" onClick={() => editStep(3)}>Edit</button></div><dl><dt>CV / Resume</dt><dd>{file?.name}</dd><dt>Profile URL</dt><dd>{answers.profileUrl || "Not provided"}</dd></dl></section>
          <p className={styles.declarationText}>{applicantDeclaration}</p>
          <label className={styles.consentCheck}><input type="checkbox" checked={answers.declarationAccepted} onChange={(event) => update("declarationAccepted", event.target.checked)} aria-invalid={Boolean(errors.declarationAccepted)} /> <span>I confirm the applicant declaration above. <b>*</b>{error("declarationAccepted")}</span></label>
          <label className={styles.consentCheck}><input type="checkbox" checked={answers.privacyConsentAccepted} onChange={(event) => update("privacyConsentAccepted", event.target.checked)} aria-invalid={Boolean(errors.privacyConsentAccepted)} /> <span>I have read the <Link href="/legal/privacy-policy" target="_blank" rel="noreferrer">Astronis Global Privacy Policy</Link> and consent to the handling of my application information for review. <b>*</b>{error("privacyConsentAccepted")}</span></label>
          <EmailOtpVerification emailAddress={answers.email} onCaptchaToken={setCaptchaToken} />
        </div>}

        {status && <p className={styles.submitError} role="alert">{status}</p>}
        <div className={styles.controls}>{step > 0 && <button type="button" className={styles.backButton} onClick={() => { setStep((current) => current - 1); setErrors({}); setStatus(""); }}>Previous</button>}{step < applicationSteps.length - 1 ? <button type="button" className={styles.nextButton} onClick={continueToNext}>Continue <Icon name="arrow" /></button> : <button className={styles.nextButton} type="submit" disabled={submitting}>{submitting ? "Submitting…" : "Submit Professional Application"}<Icon name="arrow" /></button>}</div>
        <p className={styles.noDraft}>Applications are submitted securely for review. Draft saving is unavailable for this form.</p>
      </form>
    </div>
  </section>;
}
