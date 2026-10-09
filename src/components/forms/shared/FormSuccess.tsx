import styles from "@/components/forms/formStyles.module.css";

type FormSuccessProps = {
  title?: string;
  message?: string;
};

export default function FormSuccess({
  title = "Thank you for contacting Astronis Global.",
  message = "Your enquiry has been received. Our team will review your requirement and connect you with the appropriate professional.",
}: FormSuccessProps) {
  return (
    <div className={`${styles.status} ${styles.statusSuccess}`} role="status" aria-live="polite">
      <strong>{title}</strong>
      <div style={{ display: "block", marginTop: "0.35rem" }}>{message}</div>
    </div>
  );
}
