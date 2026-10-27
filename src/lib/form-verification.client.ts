export type CaptchaTokenProvider = { getToken: () => Promise<string> };

export async function fetchWithFreshCaptcha(
  captcha: CaptchaTokenProvider | null,
  send: (captchaToken: string) => Promise<Response>,
) {
  const getFreshToken = async () => {
    let token = await captcha?.getToken() ?? "";
    if (!token) token = await captcha?.getToken() ?? "";
    if (!token) {
      throw new Error("Verification is taking longer than usual. Please try again.");
    }
    return token;
  };

  const isCaptchaFailure = async (response: Response) => {
    if (response.ok) return false;
    const body = await response.clone().json().catch(() => null) as { message?: unknown } | null;
    return typeof body?.message === "string" && body.message.toLowerCase().includes("captcha");
  };

  let response = await send(await getFreshToken());
  if (await isCaptchaFailure(response)) {
    response = await send(await getFreshToken());
    if (await isCaptchaFailure(response)) {
      throw new Error("Verification is taking longer than usual. Please try again.");
    }
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
