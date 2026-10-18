"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./schedule-meeting-modal.module.css";

type Details = { name: string; phone: string; code: string; email: string; organisation: string; team: string; turnover: string };
const blank: Details = { name: "", phone: "", code: "+91", email: "", organisation: "", team: "", turnover: "" };
const teams = ["Just me", "2–10", "11–50", "51–200", "201–500", "500+"];
const turnovers = ["Pre-revenue", "Below ₹10 lakh", "₹10 lakh–₹50 lakh", "₹50 lakh–₹1 crore", "₹1 crore–₹10 crore", "₹10 crore–₹50 crore", "Above ₹50 crore", "Prefer not to disclose"];
const modes = ["Video Meeting", "Phone Call", "In-Person Meeting"];
const zones = ["Asia/Kolkata", "Asia/Dubai", "Europe/London", "America/New_York"];

function dayKey(date: Date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }

export default function ScheduleMeetingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState(blank);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("");
  const [zone, setZone] = useState("Asia/Kolkata");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const dialog = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const launch = () => { setStep(1); setMessage(""); };
    window.addEventListener("astronis:open-scheduler", launch);
    return () => window.removeEventListener("astronis:open-scheduler", launch);
  }, []);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") { onClose(); return; }
      if (event.key !== "Tab" || !dialog.current) return;
      const focusable = Array.from(dialog.current.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), a[href]'));
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", keyboard);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener("keydown", keyboard); previousFocus.current?.focus(); };
  }, [open, onClose]);

  if (!open) return null;
  const update = (key: keyof Details, value: string) => setDetails((current) => ({ ...current, [key]: value }));
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (firstDay.getDay() + 6) % 7;
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const earliest = new Date(); earliest.setHours(0, 0, 0, 0);
  const validDetails = details.name.trim().length > 1 && /^\+?[\d\s()-]{7,18}$/.test(details.phone) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email) && details.organisation.trim() && details.team && details.turnover;

  async function submit() {
    setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/schedule-meeting", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...details, name: details.name.trim(), phone: `${details.code}${details.phone.replace(/\D/g, "")}`, organisation: details.organisation.trim(), date, time, timezone: zone, mode, consent }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "We couldn't send your request. Please try again.");
      setSent(true);
    } catch (error) { setMessage(error instanceof Error ? error.message : "We couldn't send your request. Please try again."); }
    finally { setBusy(false); }
  }

  const close = () => { onClose(); window.setTimeout(() => { setSent(false); setStep(1); setMessage(""); }, 250); };
  return <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
    <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="meeting-title" tabIndex={-1} ref={dialog}>
      <button className={styles.close} type="button" onClick={close} aria-label="Close scheduling form">×</button>
      {sent ? <div className={styles.success}>
        <span className={styles.check} aria-hidden="true">✓</span><p className={styles.eyebrow}>REQUEST RECEIVED</p>
        <h2 id="meeting-title">Thank you, {details.name.split(" ")[0]}.</h2>
        <p>Your consultation request has been sent to the Astronis team. Your preferred time is not reserved yet; our team will contact you to confirm availability.</p>
        <div className={styles.summary}><strong>Preferred time</strong><span>{new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", { dateStyle: "full" })} · {time} ({zone})</span><strong>Meeting mode</strong><span>{mode}</span></div>
        <button className={styles.primary} onClick={close}>Back to website</button>
      </div> : <>
        <div className={styles.heading}><p className={styles.eyebrow}>ASTRONIS GLOBAL · CONSULTATION</p><h2 id="meeting-title">Schedule a Consultation</h2><p>Connect with our experts to discuss your business, legal, regulatory, and advisory requirements.</p></div>
        <ol className={styles.progress} aria-label="Booking steps">{["Your Details", "Date & Time", "Review & Confirm"].map((label, index) => <li key={label} className={step === index + 1 ? styles.active : step > index + 1 ? styles.complete : ""}><span>{step > index + 1 ? "✓" : index + 1}</span>{label}</li>)}</ol>
        {step === 1 && <div className={styles.formGrid}>
          <label>Full name <b>*</b><input autoComplete="name" value={details.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" required /></label>
          <label>Mobile number <b>*</b><div className={styles.phone}><select aria-label="Country calling code" value={details.code} onChange={(e) => update("code", e.target.value)}><option>+91</option><option>+1</option><option>+44</option><option>+971</option><option>+61</option></select><input type="tel" autoComplete="tel-national" value={details.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Mobile number" required /></div></label>
          <label>Email address <b>*</b><input type="email" autoComplete="email" value={details.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" required /></label>
          <label>Organisation name <b>*</b><input autoComplete="organization" value={details.organisation} onChange={(e) => update("organisation", e.target.value)} placeholder="Company, firm, or business" required /></label>
          <label>Number of team members <b>*</b><select value={details.team} onChange={(e) => update("team", e.target.value)} required><option value="">Select team size</option>{teams.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label>Annual turnover <b>*</b><select value={details.turnover} onChange={(e) => update("turnover", e.target.value)} required><option value="">Select annual turnover</option>{turnovers.map((option) => <option key={option}>{option}</option>)}</select></label>
        </div>}
        {step === 2 && <div className={styles.schedule}>
          <div className={styles.datePanel}><div className={styles.month}><button aria-label="Previous month" disabled={month.getFullYear() === earliest.getFullYear() && month.getMonth() === earliest.getMonth()} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>‹</button><strong>{month.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</strong><button aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>›</button></div><div className={styles.calendar}>{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={`${d}${i}`} className={styles.weekday}>{d}</span>)}{Array.from({ length: offset }, (_, i) => <span key={`empty${i}`} />)}{Array.from({ length: days }, (_, i) => { const current = new Date(month.getFullYear(), month.getMonth(), i + 1); const key = dayKey(current); const disabled = current < earliest || current.getDay() === 0 || current.getDay() === 6; return <button key={key} disabled={disabled} aria-pressed={date === key} className={date === key ? styles.daySelected : ""} onClick={() => setDate(key)}>{i + 1}</button>; })}</div><p className={styles.note}>Choose a preferred weekday. Our team will confirm availability by email.</p></div>
          <div className={styles.timePanel}><label>Preferred time <b>*</b><select value={time} onChange={(e) => setTime(e.target.value)}><option value="">Choose a time</option>{["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map((t) => <option key={t}>{t}</option>)}</select></label><label>Timezone <b>*</b><select value={zone} onChange={(e) => setZone(e.target.value)}>{zones.map((z) => <option key={z}>{z}</option>)}</select></label><fieldset><legend>Preferred meeting mode <b>*</b></legend><div className={styles.modes}>{modes.map((item, i) => <button type="button" key={item} aria-pressed={mode === item} className={mode === item ? styles.modeSelected : ""} onClick={() => setMode(item)}><span>{["◉", "☎", "⌂"][i]}</span>{item}</button>)}</div>{mode === "In-Person Meeting" && <p className={styles.note}>Location details will be shared by our team when your meeting is confirmed.</p>}{mode === "Video Meeting" && <p className={styles.note}>A video link will be shared after your meeting is confirmed.</p>}</fieldset></div>
        </div>}
        {step === 3 && <div className={styles.review}><div><h3>Contact details <button type="button" onClick={() => setStep(1)}>Edit</button></h3><dl>{[["Name", details.name], ["Mobile", `${details.code} ${details.phone}`], ["Email", details.email], ["Organisation", details.organisation], ["Team size", details.team], ["Annual turnover", details.turnover]].map(([a,b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl></div><div><h3>Meeting preference <button type="button" onClick={() => setStep(2)}>Edit</button></h3><dl><div><dt>Date</dt><dd>{new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", { dateStyle: "full" })}</dd></div><div><dt>Time</dt><dd>{time} · {zone}</dd></div><div><dt>Mode</dt><dd>{mode}</dd></div></dl></div><label className={styles.consent}><input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />I confirm that the information provided is accurate and agree to be contacted regarding this consultation. <Link href="/legal/privacy-policy" target="_blank">Privacy Policy</Link> · <Link href="/legal/terms-of-use" target="_blank">Terms</Link></label><p className={styles.note}>Submitting requests a preferred time. The meeting is not booked until Astronis confirms availability.</p></div>}
        {message && <p className={styles.error} role="alert">{message}</p>}
        <div className={styles.actions}>{step === 1 ? <><button className={styles.textButton} onClick={close}>Cancel</button><button className={styles.primary} disabled={!validDetails} onClick={() => { setStep(2); setMessage(""); }}>Continue to Date & Time <span>→</span></button></> : step === 2 ? <><button className={styles.textButton} onClick={() => setStep(1)}>← Back to Your Details</button><button className={styles.primary} disabled={!date || !time || !mode} onClick={() => setStep(3)}>Continue to Review <span>→</span></button></> : <><button className={styles.textButton} onClick={() => setStep(2)}>← Back to Meeting</button><button className={styles.primary} disabled={!consent || busy} onClick={submit}>{busy ? "Sending request…" : "Send Consultation Request"}</button></>}</div>
      </>}
    </section>
  </div>;
}
