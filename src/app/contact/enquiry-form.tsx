"use client";
import { useState } from "react";
import { practices } from "@/content/site";
import Icon from "../_components/icon";
export default function EnquiryForm() {
  const [status, setStatus] = useState(""),
    [busy, setBusy] = useState(false),
    [success, setSuccess] = useState(false);
  async function submit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        body: new FormData(form),
      });
      const result = await response.json();
      setStatus(result.message);
      setSuccess(response.ok);
      if (response.ok) form.reset();
    } catch {
      setStatus(
        "Your enquiry could not be sent. Please try again or email advisory@astronisglobal.com.",
      );
      setSuccess(false);
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="enquiry-form" id="enquiry-form" onSubmit={submit}>
      <h3>Send Us a Message</h3>
      <p className="enquiry-intro">Fill out the form below and our team will get back to you shortly.</p>
      <div className="form-grid">
        <label>
          Full Name *
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            placeholder="Enter your full name"
          />
        </label>
        <label>
          Email Address *
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={180}
            placeholder="you@company.com"
          />
        </label>
        <label>
          Phone Number
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            placeholder="Enter your phone number"
          />
        </label>
        <label>
          Subject *
          <input name="subject" required maxLength={160} placeholder="Enter the subject" />
        </label>
        <label>
          Company / Organisation
          <input
            name="company"
            autoComplete="organization"
            required
            maxLength={160}
            placeholder="Your company or organisation"
          />
        </label>
        <label>
          Service Area of Interest *
          <select name="service" required defaultValue="">
            <option value="" disabled>
              Select a service area
            </option>
            {practices.map((p) => (
              <option key={p.slug}>{p.title}</option>
            ))}
            <option>Other / General Enquiry</option>
          </select>
        </label>
        <label>
          Jurisdiction / Location
          <input
            name="location"
            autoComplete="country-name"
            maxLength={160}
            placeholder="Country / city"
          />
        </label>
        <label className="full">
          Message *
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            placeholder="Type your message here..."
          />
        </label>
        <label className="honey" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="consent full">
          <input name="consent" type="checkbox" required value="yes" />I consent
          to Astronis Global contacting me regarding my enquiry.
        </label>
      </div>
      <button className="button" type="submit" disabled={busy}>
        {busy ? "Sending…" : "Submit Enquiry"}
        <Icon name="arrow" />
      </button>
      <p className="form-note">Your information is treated as confidential.</p>
      {status && (
        <div
          role="status"
          className={`form-status ${success ? "success" : "error"}`}
        >
          {status}
          {!success && (
            <a href="mailto:advisory@astronisglobal.com"> Email our team →</a>
          )}
        </div>
      )}
    </form>
  );
}
