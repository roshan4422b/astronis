import { NextResponse } from "next/server";
import { PassThrough, Readable } from "node:stream";
import { getAuthorizedAdmin } from "@/lib/supabase/server";
import {
  enquiryExportFilename,
  enquiryExportPageSize,
  matchesEnquirySearch,
  paginateEnquiries,
  writeEnquiryWorkbook,
} from "@/lib/admin/enquiry-export";

export const runtime = "nodejs";

const workbookContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const statuses = new Set(["New", "In Progress", "Responded", "Closed"]);

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function downloadHeaders(filename: string) {
  return {
    "Content-Type": workbookContentType,
    "Content-Disposition": `attachment; filename="${filename}"`,
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
  };
}

export async function GET(request: Request) {
  const auth = await getAuthorizedAdmin();
  if (!auth.configured) return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  if (!auth.user || !auth.supabase) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const params = new URL(request.url).searchParams;
  const id = params.get("id")?.trim() || "";
  const scope = params.get("scope") || "all";
  if (id.length > 200) return NextResponse.json({ error: "Invalid enquiry ID." }, { status: 400 });
  if (!id && scope !== "all" && scope !== "filtered") {
    return NextResponse.json({ error: "Choose all enquiries or the active filters." }, { status: 400 });
  }

  const status = scope === "filtered" ? params.get("status") || "" : "";
  const date = scope === "filtered" ? params.get("date") || "" : "";
  const search = scope === "filtered" ? (params.get("search") || "").trim().slice(0, 200) : "";
  if (status && !statuses.has(status)) return NextResponse.json({ error: "Invalid enquiry status filter." }, { status: 400 });
  if (date && !isValidDate(date)) return NextResponse.json({ error: "Invalid enquiry date filter." }, { status: 400 });

  const fetchPage = async (offset: number, pageSize: number) => {
    let query = auth.supabase
      .from("cms_enquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .order("id", { ascending: false });
    if (id) query = query.eq("id", id);
    if (status) query = query.eq("status", status);
    if (date) {
      const start = new Date(`${date}T00:00:00.000Z`);
      const end = new Date(start);
      end.setUTCDate(end.getUTCDate() + 1);
      query = query.gte("created_at", start.toISOString()).lt("created_at", end.toISOString());
    }
    const { data, error } = await query.range(offset, offset + pageSize - 1);
    if (error) throw error;
    return data ?? [];
  };

  let firstPage;
  try {
    firstPage = await fetchPage(0, enquiryExportPageSize);
  } catch (error) {
    console.error("[admin-enquiries] Could not start enquiry export.", {
      code: typeof error === "object" && error !== null && "code" in error && typeof error.code === "string" ? error.code : "unknown",
    });
    return NextResponse.json({ error: "Could not export enquiries." }, { status: 500 });
  }
  if (id && !firstPage.length) return NextResponse.json({ error: "Enquiry not found." }, { status: 404 });

  const enquiries = paginateEnquiries(fetchPage, firstPage);
  async function* filteredEnquiries() {
    for await (const enquiry of enquiries) {
      if (matchesEnquirySearch(enquiry, search)) yield enquiry;
    }
  }

  const stream = new PassThrough();
  const body = Readable.toWeb(stream) as ReadableStream<Uint8Array>;
  void writeEnquiryWorkbook(stream, filteredEnquiries()).catch((error: unknown) => {
    console.error("[admin-enquiries] Enquiry export stream failed.", {
      error: error instanceof Error ? error.name : "UnknownError",
      code: typeof error === "object" && error !== null && "code" in error && typeof error.code === "string" ? error.code : "unknown",
    });
    stream.destroy(error instanceof Error ? error : new Error("Enquiry export failed."));
  });

  return new Response(body, {
    headers: downloadHeaders(enquiryExportFilename(id || undefined)),
  });
}
