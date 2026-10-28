import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getApplicationBaseUrl, passwordRecoveryCookie } from "@/lib/supabase/recovery";

export const runtime = "nodejs";

function resetUrl(baseUrl: string, status: "expired" | "invalid") {
  const url = new URL("/auth/reset-password", baseUrl);
  url.searchParams.set("status", status);
  return url;
}

export async function GET(request: Request) {
  let baseUrl: string;
  try {
    baseUrl = getApplicationBaseUrl();
  } catch {
    return NextResponse.json({ error: "Password recovery is not configured." }, { status: 503 });
  }

  const cookieStore = await cookies();
  const secure = baseUrl.startsWith("https://");
  const clearRecoveryMarker = () =>
    cookieStore.set(passwordRecoveryCookie, "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
      sameSite: "lax",
      secure,
    });
  const params = new URL(request.url).searchParams;
  const supabaseError = params.get("error_code") || params.get("error") || "";
  if (supabaseError) {
    await clearRecoveryMarker();
    const expired = supabaseError === "otp_expired" || /expired/i.test(params.get("error_description") || "");
    return NextResponse.redirect(resetUrl(baseUrl, expired ? "expired" : "invalid"));
  }

  const code = params.get("code");
  const supabase = await createSupabaseServerClient();
  if (!code || code.length > 4096 || !supabase) {
    await clearRecoveryMarker();
    return NextResponse.redirect(resetUrl(baseUrl, "invalid"));
  }

  let receivedRecoveryEvent = false;
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
    if (event === "PASSWORD_RECOVERY") receivedRecoveryEvent = true;
  });
  let exchangeError: Error | null = null;
  try {
    ({ error: exchangeError } = await supabase.auth.exchangeCodeForSession(code));
  } catch {
    subscription.unsubscribe();
    await clearRecoveryMarker();
    return NextResponse.redirect(resetUrl(baseUrl, "invalid"));
  }
  subscription.unsubscribe();
  if (exchangeError || !receivedRecoveryEvent) {
    await clearRecoveryMarker();
    const expired = Boolean(exchangeError && /expired/i.test(exchangeError.message));
    return NextResponse.redirect(resetUrl(baseUrl, expired ? "expired" : "invalid"));
  }

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    await clearRecoveryMarker();
    return NextResponse.redirect(resetUrl(baseUrl, "invalid"));
  }

  cookieStore.set(passwordRecoveryCookie, "1", {
    httpOnly: true,
    maxAge: 15 * 60,
    path: "/",
    sameSite: "lax",
    secure,
  });

  return NextResponse.redirect(new URL("/auth/reset-password", baseUrl));
}
