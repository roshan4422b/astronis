export const runtime = "nodejs";

export async function POST() {
  return Response.json({
    success: false,
    message: "Consultation bookings now require verified online payment. Please use the Schedule a Consultation form.",
  }, { status: 410 });
}
