import type { InputHTMLAttributes } from "react";
import styles from "@/components/forms/formStyles.module.css";

type PhoneInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function PhoneInput({ label, error, id, ...props }: PhoneInputProps) {
  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.fieldLabel}>{label}</span>
      <input
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        className={styles.input}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <span id={`${id}-error`} className={styles.errorText}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
