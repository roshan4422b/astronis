import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

type PublicEnquiry = {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  formType: string;
  data: Record<string, JsonValue>;
};

export async function persistPublicEnquiry(enquiry: PublicEnquiry): Promise<string | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    console.error("[cms] Public enquiry persistence unavailable: Supabase is not configured");
    return null;
  }

  const id = crypto.randomUUID();
  const { error } = await supabase.from("cms_enquiries").insert({
    id,
    name: enquiry.name,
    email: enquiry.email,
    company: enquiry.company || "",
    subject: enquiry.subject,
    message: enquiry.message,
    form_type: enquiry.formType,
    status: "New",
    internal_notes: "",
    data: enquiry.data,
  });
  if (error) {
    console.error("[cms] Public enquiry persistence failed", { code: error.code || "unknown" });
    return null;
  }
  return id;
}
