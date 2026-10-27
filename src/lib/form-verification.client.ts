export type CaptchaTokenProvider = {
  getToken: (options?: { fresh?: boolean }) => Promise<string>;
};

export async function fetchWithFreshCaptcha(
  captcha: CaptchaTokenProvider | null,
  send: (captchaToken: string) => Promise<Response>,
) {
  const getToken = async (fresh = false) => {
    let token = await captcha?.getToken(fresh ? { fresh: true } : undefined) ?? "";
    if (!token && !fresh) token = await captcha?.getToken({ fresh: true }) ?? "";
    if (!token) {
      throw new Error("Verification is taking longer than usual. Please try again.");
    }
    return token;
  };

  const isCaptchaFailure = async (response: Response) => {
    if (response.ok) return false;
    const body = await response.clone().json().catch(() => null) as { message?: unknown } | null;
    return body?.message === "Please complete the CAPTCHA verification and try again.";
  };

  let response = await send(await getToken());
  if (await isCaptchaFailure(response)) {
    response = await send(await getToken(true));
    if (await isCaptchaFailure(response)) {
      throw new Error("Verification is taking longer than usual. Please try again.");
    }
  }
  if (response.ok && captcha) {
    void captcha.getToken({ fresh: true }).catch(() => "");
  }
  return response;
}

export function getFormVerification(form: HTMLElement, captchaToken: string) {
  const emailVerificationToken = form.querySelector<HTMLInputElement>('input[name="emailVerificationToken"]')?.value ?? "";
  if (!emailVerificationToken) {
    throw new Error("Verify your email address before submitting this form.");
  }
  return { captchaToken, emailVerificationToken };
}
