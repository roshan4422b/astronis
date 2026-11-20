import { NextResponse } from "next/server";
import { getAuthorizedAdmin } from "@/lib/supabase/server";
import { enquiryUpdateSchemaMessage, isEnquiryStatus, isValidFollowUpDate } from "@/lib/admin/enquiry-status";

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
  let body: { status?: unknown; follow_up_date?: unknown; internal_notes?: unknown };
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid JSON." }, { status: 400 }); }
  const updates: Record<string, string | null> = {};
  if (body.status !== undefined) {
    if (!isEnquiryStatus(body.status)) return NextResponse.json({ error: "Invalid enquiry status." }, { status: 400 });
    updates.status = body.status;
    if (body.status !== "Follow-up") updates.follow_up_date = null;
  }
  if (body.follow_up_date !== undefined) {
    if (body.follow_up_date === null || body.follow_up_date === "") {
      updates.follow_up_date = null;
    } else if (typeof body.follow_up_date !== "string" || !isValidFollowUpDate(body.follow_up_date)) {
      return NextResponse.json({ error: "Follow-up date must be a valid calendar date." }, { status: 400 });
    } else if (body.status !== undefined && body.status !== "Follow-up") {
      return NextResponse.json({ error: "A follow-up date can only be saved for Follow-up status." }, { status: 400 });
    } else {
      updates.follow_up_date = body.follow_up_date;
    }
  }
  if (typeof body.internal_notes === "string") updates.internal_notes = body.internal_notes.trim().slice(0, 5000);
  if (!Object.keys(updates).length) return NextResponse.json({ error: "No valid updates provided." }, { status: 400 });
  let result = await auth.supabase.from("cms_enquiries").update(updates).eq("id", id).select("*").maybeSingle();
  if (
    result.error
    && (result.error.code === "42703" || result.error.code === "PGRST204")
    && result.error.message.toLowerCase().includes("follow_up_date")
    && updates.follow_up_date === null
    && body.status !== "Follow-up"
  ) {
    const compatibleUpdates = { ...updates };
    delete compatibleUpdates.follow_up_date;
    result = await auth.supabase.from("cms_enquiries").update(compatibleUpdates).eq("id", id).select("*").maybeSingle();
  }
  if (result.error) {
    console.error("Could not update admin enquiry", { code: result.error.code });
    const migrationMessage = enquiryUpdateSchemaMessage(result.error.code, result.error.message, isEnquiryStatus(body.status) ? body.status : undefined);
    return NextResponse.json({ error: migrationMessage || "Could not update enquiry." }, { status: 500 });
  }
  const { data } = result;
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
