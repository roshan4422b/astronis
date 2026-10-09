import type { TextareaHTMLAttributes } from "react";
import styles from "@/components/forms/formStyles.module.css";

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export default function FormTextarea({ label, error, id, ...props }: FormTextareaProps) {
  return (
    <label className={`${styles.field} ${styles.fullWidth}`} htmlFor={id}>
      <span className={styles.fieldLabel}>{label}</span>
      <textarea id={id} className={styles.textarea} aria-invalid={Boolean(error)} aria-describedby={error ? `${id}-error` : undefined} {...props} />
      {error ? (
        <span id={`${id}-error`} className={styles.errorText}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
