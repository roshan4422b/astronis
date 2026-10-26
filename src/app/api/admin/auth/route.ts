import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminRememberCookie, createSupabaseServerClient, isSupabaseConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ configured: isSupabaseConfigured() });
}

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  let body: { email?: unknown; password?: unknown; rememberMe?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 254) : "";
  const password = typeof body.password === "string" ? body.password : "";
  const rememberMe = body.rememberMe === true;
  if (!email || !password || password.length > 1024) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  const supabase = await createSupabaseServerClient({ rememberMe });
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  const { data: admin, error: adminError } = await supabase
    .from("cms_admin_users")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();
  if (adminError || !admin) {
    await supabase.auth.signOut();
    return NextResponse.json({ error: "This account is not authorized for the admin workspace." }, { status: 403 });
  }
  const cookieStore = await cookies();
  cookieStore.set(adminRememberCookie, rememberMe ? "1" : "", {
    httpOnly: true,
    maxAge: rememberMe ? 60 * 60 * 24 * 30 : 0,
    path: "/",
    sameSite: "lax",
    secure: new URL(request.url).protocol === "https:",
  });
  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  const { error } = await supabase.auth.signOut();
  if (error) return NextResponse.json({ error: "Could not sign out." }, { status: 500 });
  const cookieStore = await cookies();
  cookieStore.set(adminRememberCookie, "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secure: new URL(request.url).protocol === "https:",
  });
  return NextResponse.json({ success: true });
}
