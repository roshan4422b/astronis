import { NextResponse } from "next/server";
import { createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { getApplicationBaseUrl } from "@/lib/supabase/recovery";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  let redirectTo: string;
  try {
    const callback = new URL("/auth/callback", getApplicationBaseUrl());
    callback.searchParams.set("next", "/auth/reset-password");
    redirectTo = callback.toString();
  } catch {
    return NextResponse.json({ error: "Password recovery is not configured for this environment." }, { status: 503 });
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) {
    return NextResponse.json(
      { error: "We could not send a recovery email. Please try again shortly." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "If an account exists for that email, a recovery link has been sent.",
  });
}
