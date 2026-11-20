"use client";

import { useEffect, useRef, useState } from "react";
import { practices } from "@/content/site";
import styles from "./schedule-meeting-modal.module.css";
import EnquiryAgreementCheckbox, { enquiryAgreementMessage } from "./enquiry-agreement-checkbox";
import EmailOtpVerification from "./email-otp-verification";
import { getFormVerification } from "@/lib/form-verification.client";

type Details = { name: string; phone: string; code: string; email: string; organisation: string; service: string; team: string; turnover: string };
type PaymentConfig = { amount: number; currency: string; keyId: string | null; configured: boolean };
type PaymentOrder = { keyId: string; amount: number; currency: string; orderId: string; bookingReference: string; customerName: string };
type PaymentVerification = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string; bookingReference: string };
type ConfirmedBooking = { reference: string; customerName: string; date: string; time: string; timezone: string; amount: number; currency: string; paymentId: string };
type RazorpaySuccess = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  notes: { booking_reference: string };
  theme: { color: string };
  modal: { ondismiss: () => void };
  handler: (response: RazorpaySuccess) => void;
};
type RazorpayCheckout = { open: () => void; on: (event: "payment.failed", callback: (response: { error?: { description?: string } }) => void) => void };

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayCheckout;
  }
}

const blank: Details = { name: "", phone: "", code: "+91", email: "", organisation: "", service: "", team: "", turnover: "" };
const teams = ["Just me", "2–10", "11–50", "51–200", "201–500", "500+"];
const turnovers = ["Pre-revenue", "Below ₹10 lakh", "₹10 lakh–₹50 lakh", "₹50 lakh–₹1 crore", "₹1 crore–₹10 crore", "₹10 crore–₹50 crore", "Above ₹50 crore", "Prefer not to disclose"];
const modes = ["Video Meeting", "Phone Call", "In-Person Meeting"];
const zones = ["Asia/Kolkata", "Asia/Dubai", "Europe/London", "America/New_York"];
const meetingTimes = Array.from({ length: 21 }, (_, index) => {
  const minutes = 9 * 60 + 30 + index * 30;
  const hour24 = Math.floor(minutes / 60);
  const hour12 = hour24 % 12 || 12;
  return `${hour12}:${minutes % 60 === 0 ? "00" : "30"} ${hour24 < 12 ? "AM" : "PM"}`;
});

function dayKey(date: Date) { return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`; }
function formatCurrencyAmount(amount: number, currency: string) {
  const formatter = new Intl.NumberFormat("en-IN", { style: "currency", currency });
  const fractionDigits = formatter.resolvedOptions().maximumFractionDigits ?? 2;
  return formatter.format(amount / (10 ** fractionDigits));
}

let razorpayScriptPromise: Promise<void> | null = null;
function loadRazorpayCheckout() {
  if (window.Razorpay) return Promise.resolve();
  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => window.Razorpay ? resolve() : reject(new Error("Payment checkout could not be loaded."));
      script.onerror = () => reject(new Error("Payment checkout could not be loaded."));
      document.body.appendChild(script);
    }).catch((error: unknown) => {
      razorpayScriptPromise = null;
      throw error;
    });
  }
  return razorpayScriptPromise;
}

export default function ScheduleMeetingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState(blank);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("");
  const [zone, setZone] = useState("Asia/Kolkata");
  const [consent, setConsent] = useState(false);
  const [enquiryAgreementAccepted, setEnquiryAgreementAccepted] = useState(false);
  const [enquiryAgreementError, setEnquiryAgreementError] = useState("");
  const [busy, setBusy] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [message, setMessage] = useState("");
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig | null>(null);
  const [paymentOrder, setPaymentOrder] = useState<PaymentOrder | null>(null);
  const [paymentFailure, setPaymentFailure] = useState("");
  const [verificationPending, setVerificationPending] = useState(false);
  const [verificationPayload, setVerificationPayload] = useState<PaymentVerification | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [bookingKey, setBookingKey] = useState("");
  const checkoutFinished = useRef(false);
  const paymentInFlight = useRef(false);
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

  useEffect(() => {
    if (!open || step !== 3 || paymentConfig) return;
    let active = true;
    fetch("/api/schedule-meeting/payment-config", { cache: "no-store" })
      .then(async (response) => {
        const result: unknown = await response.json();
        if (!response.ok || !result || typeof result !== "object") throw new Error("The consultation fee is temporarily unavailable.");
        const config = result as PaymentConfig;
        if (!Number.isSafeInteger(config.amount) || config.amount <= 0 || !/^[A-Z]{3}$/.test(config.currency)) {
          throw new Error("The consultation fee is temporarily unavailable.");
        }
        if (active) {
          setPaymentConfig(config);
          if (!config.configured) setMessage("Online payment is not available yet. Please try again later.");
        }
      })
      .catch((error: unknown) => {
        if (active) setMessage(error instanceof Error ? error.message : "The consultation fee is temporarily unavailable.");
      });
    return () => { active = false; };
  }, [open, step, paymentConfig]);

  if (!open) return null;
  const update = (key: keyof Details, value: string) => setDetails((current) => ({ ...current, [key]: value }));
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const offset = (firstDay.getDay() + 6) % 7;
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const earliest = new Date(); earliest.setHours(0, 0, 0, 0);
  const validDetails = details.name.trim().length > 1 && /^\+?[\d\s()-]{7,18}$/.test(details.phone) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email) && details.organisation.trim() && details.service && details.team && details.turnover;

  function getBookingKey() {
    const key = bookingKey || crypto.randomUUID();
    if (!bookingKey) setBookingKey(key);
    return key;
  }

  function clearPaymentState() {
    paymentInFlight.current = false;
    setBookingKey("");
    setPaymentOrder(null);
    setPaymentFailure("");
    setVerificationPending(false);
    setVerificationPayload(null);
  }

  async function verifyPayment(payload: PaymentVerification) {
    paymentInFlight.current = true;
    setBusy(true);
    setMessage("");
    setPaymentFailure("");
    try {
      const response = await fetch("/api/schedule-meeting/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "We couldn't verify the payment yet. Please retry.");
      if (result.status === "paid" && result.booking) {
        setConfirmedBooking(result.booking as ConfirmedBooking);
        setVerificationPayload(null);
        setVerificationPending(false);
        return;
      }
      if (result.status === "failed") {
        setVerificationPayload(null);
        setVerificationPending(false);
        setPaymentFailure(result.message || "Payment was not completed. You can safely retry.");
        return;
      }
      setVerificationPayload(payload);
      setVerificationPending(true);
      setPaymentFailure(result.message || "Payment is processing. Check its status again in a moment.");
    } catch (error) {
      setVerificationPayload(payload);
      setVerificationPending(true);
      setPaymentFailure(error instanceof Error ? error.message : "We couldn't verify the payment yet. Please retry.");
    } finally {
      setBusy(false);
      paymentInFlight.current = false;
    }
  }

  async function startPayment() {
    if (paymentInFlight.current) return;
    if (!enquiryAgreementAccepted) { setEnquiryAgreementError(enquiryAgreementMessage); return; }
    if (!consent) { setMessage("Please confirm that the information provided is accurate and agree to be contacted regarding this consultation."); return; }
    if (!paymentConfig?.configured || !paymentConfig.keyId) { setMessage("Online payment is not available yet. Please try again later."); return; }
    if (verificationPending && verificationPayload) {
      await verifyPayment(verificationPayload);
      return;
    }
    paymentInFlight.current = true;
    setEnquiryAgreementError("");
    setBusy(true); setMessage(""); setPaymentFailure("");
    try {
      const verification = paymentOrder ? {} : getFormVerification(dialog.current!);
      const response = await fetch("/api/schedule-meeting/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...details,
          name: details.name.trim(),
          email: details.email.trim(),
          phone: `${details.code}${details.phone.replace(/\D/g, "")}`,
          organisation: details.organisation.trim(),
          date,
          time,
          timezone: zone,
          mode,
          consent,
          enquiryAgreementAccepted: "yes",
          enquiryAgreementId: "enquiry-communication-consultation-consent",
          idempotencyKey: getBookingKey(),
          ...verification,
        }),
      });
      const result = await response.json();
      if (result.bookingReference) setPaymentOrder((current) => current ? current : {
        keyId: paymentConfig.keyId!,
        amount: Number(result.amount) || paymentConfig.amount,
        currency: result.currency || paymentConfig.currency,
        orderId: result.orderId || "",
        bookingReference: result.bookingReference,
        customerName: details.name,
      });
      if (!response.ok) throw new Error(result.message || "We couldn't start payment. Please try again.");
      if (result.status === "paid") {
        setConfirmedBooking({
          reference: result.bookingReference,
          customerName: result.customerName,
          date,
          time,
          timezone: zone,
          amount: result.amount,
          currency: result.currency,
          paymentId: result.paymentId,
        });
        setBusy(false);
        paymentInFlight.current = false;
        return;
      }
      if (!result.orderId || !result.keyId) throw new Error("We couldn't start payment. Please try again.");
      const order: PaymentOrder = {
        keyId: result.keyId,
        amount: result.amount,
        currency: result.currency,
        orderId: result.orderId,
        bookingReference: result.bookingReference,
        customerName: result.customerName,
      };
      setPaymentOrder(order);
      await loadRazorpayCheckout();
      if (!window.Razorpay) throw new Error("Payment checkout could not be loaded.");
      checkoutFinished.current = false;
      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Astronis Global",
        description: "Consultation meeting fee",
        order_id: order.orderId,
        prefill: {
          name: details.name.trim(),
          email: details.email.trim(),
          contact: `${details.code}${details.phone.replace(/\D/g, "")}`,
        },
        notes: { booking_reference: order.bookingReference },
        theme: { color: "#0751db" },
        modal: {
          ondismiss: () => {
            if (checkoutFinished.current) return;
            setBusy(false);
            paymentInFlight.current = false;
            setPaymentFailure("Payment was cancelled. Your details are saved; you can safely retry.");
          },
        },
        handler: (checkoutResponse) => {
          checkoutFinished.current = true;
          void verifyPayment({
            ...checkoutResponse,
            bookingReference: order.bookingReference,
          });
        },
      });
      checkout.on("payment.failed", (result) => {
        checkoutFinished.current = true;
        setBusy(false);
        paymentInFlight.current = false;
        setPaymentFailure(result.error?.description || "Payment was not completed. Your details are saved; you can safely retry.");
      });
      checkout.open();
    } catch (error) {
      setPaymentFailure(error instanceof Error ? error.message : "We couldn't start payment. Please try again.");
      setBusy(false);
      paymentInFlight.current = false;
      setCaptchaReset((current) => current + 1);
    }
  }

  const editStep = (target: number) => {
    clearPaymentState();
    setConfirmedBooking(null);
    setCaptchaReset((current) => current + 1);
    setStep(target);
    setMessage("");
  };
  const close = () => { onClose(); window.setTimeout(() => { setConfirmedBooking(null); setStep(1); setMessage(""); setPaymentFailure(""); }, 250); };
  const formattedFee = paymentConfig
    ? formatCurrencyAmount(paymentConfig.amount, paymentConfig.currency)
    : "";
  return <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
    <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="meeting-title" tabIndex={-1} ref={dialog}>
      <button className={styles.close} type="button" onClick={close} aria-label="Close scheduling form">×</button>
      {confirmedBooking ? <div className={styles.success}>
        <span className={styles.check} aria-hidden="true">✓</span><p className={styles.eyebrow}>PAYMENT SUCCESSFUL</p>
        <h2 id="meeting-title">Thank you, {confirmedBooking.customerName.split(" ")[0]}.</h2>
        <p>Your payment has been verified and your consultation booking is confirmed. Our team will contact you if the preferred time needs adjustment.</p>
        <div className={styles.summary}>
          <strong>Booking reference</strong><span>{confirmedBooking.reference}</span>
          <strong>Customer</strong><span>{confirmedBooking.customerName}</span>
          <strong>Meeting date &amp; time</strong><span>{new Date(`${confirmedBooking.date}T12:00:00`).toLocaleDateString("en-IN", { dateStyle: "full" })} · {confirmedBooking.time} ({confirmedBooking.timezone})</span>
          <strong>Amount paid</strong><span>{formatCurrencyAmount(confirmedBooking.amount, confirmedBooking.currency)}</span>
          <strong>Payment ID</strong><span>{confirmedBooking.paymentId}</span>
        </div>
        <button className={styles.primary} onClick={close}>Back to website</button>
      </div> : <>
        <div className={styles.heading}><p className={styles.eyebrow}>ASTRONIS GLOBAL · CONSULTATION</p><h2 id="meeting-title">Schedule a Consultation</h2><p>Connect with our experts to discuss your business, legal, regulatory, and advisory requirements.</p></div>
        <ol className={styles.progress} aria-label="Booking steps">{["Your Details", "Date & Time", "Review & Confirm"].map((label, index) => <li key={label} className={step === index + 1 ? styles.active : step > index + 1 ? styles.complete : ""}><span>{step > index + 1 ? "✓" : index + 1}</span>{label}</li>)}</ol>
        {step === 1 && <div className={styles.formGrid}>
          <label>Full name <b>*</b><input autoComplete="name" value={details.name} onChange={(e) => update("name", e.target.value)} placeholder="Your full name" required /></label>
          <label>Mobile number <b>*</b><div className={styles.phone}><select aria-label="Country calling code" value={details.code} onChange={(e) => update("code", e.target.value)}><option>+91</option><option>+1</option><option>+44</option><option>+971</option><option>+61</option></select><input type="tel" autoComplete="tel-national" value={details.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Mobile number" required /></div></label>
          <label>Email address <b>*</b><input type="email" autoComplete="email" value={details.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" required /></label>
          <label>Organisation name <b>*</b><input autoComplete="organization" value={details.organisation} onChange={(e) => update("organisation", e.target.value)} placeholder="Company, firm, or business" required /></label>
          <label>
            Service required <b>*</b>
            <select value={details.service} onChange={(e) => update("service", e.target.value)} required>
              <option value="">Choose a service</option>
              {practices.map((practice) => (
                <option key={practice.canonicalSlug} value={practice.title}>{practice.title}</option>
              ))}
            </select>
          </label>
          <label>Number of team members <b>*</b><select value={details.team} onChange={(e) => update("team", e.target.value)} required><option value="">Select team size</option>{teams.map((option) => <option key={option}>{option}</option>)}</select></label>
          <label>Annual turnover <b>*</b><select value={details.turnover} onChange={(e) => update("turnover", e.target.value)} required><option value="">Select annual turnover</option>{turnovers.map((option) => <option key={option}>{option}</option>)}</select></label>
        </div>}
        {step === 2 && <div className={styles.schedule}>
          <div className={styles.datePanel}><div className={styles.month}><button aria-label="Previous month" disabled={month.getFullYear() === earliest.getFullYear() && month.getMonth() === earliest.getMonth()} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>‹</button><strong>{month.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</strong><button aria-label="Next month" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>›</button></div><div className={styles.calendar}>{["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={`${d}${i}`} className={styles.weekday}>{d}</span>)}{Array.from({ length: offset }, (_, i) => <span key={`empty${i}`} />)}{Array.from({ length: days }, (_, i) => { const current = new Date(month.getFullYear(), month.getMonth(), i + 1); const key = dayKey(current); const disabled = current < earliest || current.getDay() === 0 || current.getDay() === 6; return <button key={key} disabled={disabled} aria-pressed={date === key} className={date === key ? styles.daySelected : ""} onClick={() => setDate(key)}>{i + 1}</button>; })}</div><p className={styles.note}>Choose a preferred weekday. Our team will confirm availability by email.</p></div>
          <div className={styles.timePanel}><label>Preferred time ({zone}) <b>*</b><select value={time} onChange={(e) => setTime(e.target.value)}><option value="">Choose a time</option>{meetingTimes.map((t) => <option key={t}>{t}</option>)}</select></label><label>Timezone <b>*</b><select value={zone} onChange={(e) => setZone(e.target.value)}>{zones.map((z) => <option key={z}>{z}</option>)}</select></label><p className={styles.note}>Times are shown in the selected timezone. Available preferences run from 9:30 AM to 7:30 PM.</p><fieldset><legend>Preferred meeting mode <b>*</b></legend><div className={styles.modes}>{modes.map((item, i) => <button type="button" key={item} aria-pressed={mode === item} className={mode === item ? styles.modeSelected : ""} onClick={() => setMode(item)}><span>{["◉", "☎", "⌂"][i]}</span>{item}</button>)}</div>{mode === "In-Person Meeting" && <p className={styles.note}>Location details will be shared by our team when your meeting is confirmed.</p>}{mode === "Video Meeting" && <p className={styles.note}>A video link will be shared after your meeting is confirmed.</p>}</fieldset></div>
        </div>}
        {step === 3 && <div className={styles.review}><div><h3>Contact details <button type="button" onClick={() => editStep(1)}>Edit</button></h3><dl>{[["Name", details.name], ["Mobile", `${details.code} ${details.phone}`], ["Email", details.email], ["Organisation", details.organisation], ["Service required", details.service], ["Team size", details.team], ["Annual turnover", details.turnover]].map(([a,b]) => <div key={a}><dt>{a}</dt><dd>{b}</dd></div>)}</dl></div><div><h3>Meeting preference <button type="button" onClick={() => editStep(2)}>Edit</button></h3><dl><div><dt>Date</dt><dd>{new Date(`${date}T12:00:00`).toLocaleDateString("en-IN", { dateStyle: "full" })}</dd></div><div><dt>Time</dt><dd>{time} · {zone}</dd></div><div><dt>Mode</dt><dd>{mode}</dd></div></dl></div><p className={styles.note}>Your preferred time will be confirmed by our team after payment.</p>
          <div className={styles.fee}><span>Consultation fee <small>Inclusive of applicable taxes</small></span><strong>{paymentConfig ? formattedFee : "Loading fee…"}</strong></div>
          {paymentOrder && <p className={styles.note}>Booking reference: <strong>{paymentOrder.bookingReference}</strong></p>}
          {paymentFailure && <p className={styles.error} role="alert">{paymentFailure}</p>}
          <EmailOtpVerification emailAddress={details.email} onCaptchaToken={setCaptchaToken} resetKey={captchaReset} />
        </div>}
        {step === 3 && <EnquiryAgreementCheckbox accepted={enquiryAgreementAccepted} error={enquiryAgreementError} errorId="consultation-enquiry-agreement-error" onChange={(accepted) => { setEnquiryAgreementAccepted(accepted); setConsent(accepted); setEnquiryAgreementError(""); }} onInvalid={() => setEnquiryAgreementError(enquiryAgreementMessage)} additionalText="I confirm the information provided is accurate." />}
        {message && <p className={styles.error} role="alert">{message}</p>}
        <div className={styles.actions}>{step === 1 ? <><button className={styles.textButton} onClick={close}>Cancel</button><button className={styles.primary} disabled={!validDetails} onClick={() => { setStep(2); setMessage(""); }}>Continue to Date & Time <span>→</span></button></> : step === 2 ? <><button className={styles.textButton} onClick={() => editStep(1)}>← Back to Your Details</button><button className={styles.primary} disabled={!date || !time || !mode} onClick={() => { setStep(3); setMessage(""); }}>Continue to Review <span>→</span></button></> : <><button className={styles.textButton} onClick={() => editStep(2)}>← Back to Meeting</button><button className={styles.primary} disabled={busy || !paymentConfig?.configured || (!captchaToken && !paymentOrder)} onClick={startPayment}>{busy ? "Processing…" : verificationPending ? "Check Payment Status" : paymentOrder ? "Retry Payment" : "Proceed to Payment"}</button></>}</div>
      </>}
    </section>
  </div>;
}
