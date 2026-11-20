import { getPublicRazorpayConfig, RazorpayConfigurationError } from "@/lib/razorpay.server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(getPublicRazorpayConfig(), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof RazorpayConfigurationError) {
      return Response.json({ configured: false, message: "Payment pricing is not configured." }, { status: 503 });
    }
    throw error;
  }
}
