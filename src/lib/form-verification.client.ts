export function getFormVerification(form: HTMLElement) {
  const captchaToken = form.querySelector<HTMLInputElement>('input[name="captchaToken"]')?.value ?? "";
  const emailVerificationToken = form.querySelector<HTMLInputElement>('input[name="emailVerificationToken"]')?.value ?? "";
  if (!emailVerificationToken) {
    throw new Error("Verify your email address before submitting this form.");
  }
  if (!captchaToken) {
    throw new Error("Complete the CAPTCHA verification before submitting this form.");
  }
  return { captchaToken, emailVerificationToken };
}
