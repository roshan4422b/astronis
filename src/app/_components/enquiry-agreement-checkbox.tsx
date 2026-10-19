import Link from "next/link";

const agreementTitle = "Enquiry, Communication & Consultation Consent Agreement";

export const enquiryAgreementMessage = `Please read and accept the ${agreementTitle} before submitting your enquiry.`;

export default function EnquiryAgreementCheckbox({
  accepted,
  error,
  errorId,
  onChange,
  onInvalid,
}: {
  accepted: boolean;
  error: string;
  errorId: string;
  onChange: (accepted: boolean) => void;
  onInvalid: () => void;
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
          </Link>{" "}
          and agree to its applicable terms and conditions.
        </span>
      </label>
      {error && <p className="enquiry-agreement-error" id={errorId} role="alert">{error}</p>}
    </>
  );
}
