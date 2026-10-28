import { NextResponse } from "next/server";
import { getAuthorizedAdmin } from "@/lib/supabase/server";

export async function GET() {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  if (!auth.user || !auth.supabase) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { data, error } = await auth.supabase.from("cms_settings").select("key, value, updated_at");
  return error ? NextResponse.json({ error: "Could not load settings." }, { status: 500 }) : NextResponse.json({
    settings: Object.fromEntries((data || []).map((row) => [row.key, row.value])),
    account: { email: auth.user.email || "", name: String((data || []).find((row) => row.key === "profile")?.value?.name || auth.user.user_metadata?.name || "") },
  });
}

export async function PUT(request: Request) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  if (!auth.user || !auth.supabase) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  let body: { key?: unknown; value?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  if (typeof body.key !== "string" || !/^(profile|preferences)$/.test(body.key) || !body.value || typeof body.value !== "object" || Array.isArray(body.value)) {
    return NextResponse.json({ error: "Invalid setting." }, { status: 400 });
  }
  const value = body.value as Record<string, unknown>;
  const safeValue = body.key === "profile"
    ? { name: typeof value.name === "string" ? value.name.trim().slice(0, 80) : "" }
    : Object.fromEntries(["newEnquiry", "testimonialReview", "contentStatus", "systemAnnouncements"].map((key) => [key, value[key] === true]));
  if (body.key === "profile" && !safeValue.name) return NextResponse.json({ error: "A display name is required." }, { status: 400 });
  const { data, error } = await auth.supabase.from("cms_settings").upsert({ key: body.key, value: safeValue }, { onConflict: "key" }).select("key, value, updated_at").single();
  return error ? NextResponse.json({ error: "Could not save setting." }, { status: 500 }) : NextResponse.json({ setting: data });
}
