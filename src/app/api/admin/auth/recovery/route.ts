import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getApplicationBaseUrl, passwordRecoveryCookie } from "@/lib/supabase/recovery";

export const runtime = "nodejs";

async function clearRecoveryMarker(secure: boolean) {
  const cookieStore = await cookies();
  cookieStore.set(passwordRecoveryCookie, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure,
  });
}

export async function GET() {
  let baseUrl: string;
  try {
    baseUrl = getApplicationBaseUrl();
  } catch {
    return NextResponse.json({ valid: false }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
  const secure = baseUrl.startsWith("https://");
  const cookieStore = await cookies();
  if (cookieStore.get(passwordRecoveryCookie)?.value !== "1") {
    return NextResponse.json({ valid: false }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ valid: false }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    await clearRecoveryMarker(secure);
    return NextResponse.json({ valid: false }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  return NextResponse.json({ valid: true }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  let baseUrl: string;
  try {
    baseUrl = getApplicationBaseUrl();
  } catch {
    return NextResponse.json({ error: "Password recovery is not configured." }, { status: 503 });
  }
  const secure = baseUrl.startsWith("https://");
  const origin = request.headers.get("origin");
  if (origin && origin !== baseUrl) {
    return NextResponse.json({ error: "This request is not permitted." }, { status: 403 });
  }

  const cookieStore = await cookies();
  if (cookieStore.get(passwordRecoveryCookie)?.value !== "1") {
    return NextResponse.json({ error: "This recovery session is invalid or has expired. Request a new link." }, { status: 401 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    await clearRecoveryMarker(secure);
    return NextResponse.json({ error: "This recovery session is invalid or has expired. Request a new link." }, { status: 401 });
  }

  let body: { password?: unknown; confirmPassword?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  const confirmPassword = typeof body.confirmPassword === "string" ? body.confirmPassword : "";
  if (password.length < 8 || password.length > 128) {
    return NextResponse.json({ error: "Use a password between 8 and 128 characters." }, { status: 400 });
  }
  if (password !== confirmPassword) {
    return NextResponse.json({ error: "The passwords do not match." }, { status: 400 });
  }

  const { error: updateError } = await supabase.auth.updateUser({ password });
  if (updateError) {
    return NextResponse.json(
      { error: "We could not update the password. Please try again or request a new recovery link." },
      { status: 400 },
    );
  }

  await clearRecoveryMarker(secure);
  return NextResponse.json({ success: true });
}
