import { NextResponse } from "next/server";
import { getAuthorizedAdmin } from "@/lib/supabase/server";

const statuses = new Set(["New", "In Progress", "Responded", "Closed"]);

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  if (!auth.user || !auth.supabase) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { id } = await context.params;
  const { data, error } = await auth.supabase.from("cms_enquiries").select("*").eq("id", id).maybeSingle();
  if (error) return NextResponse.json({ error: "Could not load enquiry details." }, { status: 500 });
  return data
    ? NextResponse.json({ record: data }, { headers: { "Cache-Control": "private, no-store" } })
    : NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  if (!auth.user || !auth.supabase) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { id } = await context.params;
  let body: { status?: unknown; internal_notes?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  const updates: Record<string, string> = {};
  if (typeof body.status === "string" && statuses.has(body.status)) updates.status = body.status;
  if (typeof body.internal_notes === "string") updates.internal_notes = body.internal_notes.trim().slice(0, 5000);
  if (!Object.keys(updates).length) return NextResponse.json({ error: "No valid updates provided." }, { status: 400 });
  const { data, error } = await auth.supabase.from("cms_enquiries").update(updates).eq("id", id).select("*").maybeSingle();
  if (error) return NextResponse.json({ error: "Could not update enquiry." }, { status: 500 });
  return data ? NextResponse.json({ record: data }) : NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  if (!auth.user || !auth.supabase) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  const { id } = await context.params;
  const { data, error } = await auth.supabase
    .from("cms_enquiries")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();
  if (error) return NextResponse.json({ error: "Could not delete enquiry." }, { status: 500 });
  return data
    ? NextResponse.json({ success: true })
    : NextResponse.json({ error: "Enquiry not found." }, { status: 404 });
}
