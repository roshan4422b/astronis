import Link from "next/link";

const agreementTitle = "Enquiry, Communication & Consultation Consent Agreement";

export const enquiryAgreementMessage = `Please read and accept the ${agreementTitle} before submitting your enquiry.`;

export default function EnquiryAgreementCheckbox({
  accepted,
  error,
  errorId,
  onChange,
  onInvalid,
  includeCareerAgreement = false,
  additionalText,
}: {
  accepted: boolean;
  error: string;
  errorId: string;
  onChange: (accepted: boolean) => void;
  onInvalid: () => void;
  includeCareerAgreement?: boolean;
  additionalText?: string;
}) {
  return (
    <>
      <label className="enquiry-agreement-checkbox">
        <input
          name="enquiryAgreementAccepted"
          type="checkbox"
          value="yes"
          checked={accepted}
          required
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onInvalid={(event) => {
            event.preventDefault();
            onInvalid();
          }}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span>
          I have read and understood the{" "}
          <Link
            href="/legal/enquiry-communication-consultation-consent"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
          >
            {agreementTitle}
          </Link>
          {includeCareerAgreement && <>{", "}<Link href="/legal/career-professional-partnership-consent" target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>Career, Professional Association &amp; Partnership Application Consent Agreement</Link></>}
          {", "}<Link href="/legal/privacy-policy" target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>Privacy Policy</Link>
          {" and "}<Link href="/legal/terms-of-use" target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>Terms of Use</Link>{" "}
          and agree to the applicable terms. I consent to processing my submitted information and being contacted about this enquiry.
          {additionalText ? ` ${additionalText}` : ""}
        </span>
      </label>
      {includeCareerAgreement && <input type="hidden" name="careerAgreementAccepted" value={accepted ? "yes" : ""} />}
      {error && <p className="enquiry-agreement-error" id={errorId} role="alert">{error}</p>}
    </>
  );
}
