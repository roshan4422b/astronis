const baseUrl = process.env.FORM_TEST_BASE_URL || "http://127.0.0.1:3123";
const verificationHeading = "Verify your email to continue";

const formPages = [
  "/",
  "/home",
  "/contact",
  "/industries",
  "/industries/manufacturing",
  "/services",
  "/services/corporate-commercial-advisory",
  "/technology-and-digital-solutions",
  "/technology-and-digital-solutions/technology-insights",
  "/technology-and-digital-solutions/client-enterprise-portals",
  "/technology-and-digital-solutions/cloud-and-collaboration",
  "/technology-and-digital-solutions/cybersecurity-data-protection/cybersecurity-readiness",
  "/technology-and-digital-solutions/compliance-calendar",
  "/expertise-across-practice-areas",
  "/professionals/experts-by-service",
  "/global-presence/uae",
  "/global-presence/discuss-your-global-requirement",
  "/global-presence/partner-with-us",
  "/global-presence/ideas-across-borders",
  "/professionals/enquiry",
  "/professionals/experts-by-jurisdiction",
  "/professionals/collaborate-with-us",
  "/professionals/professional-collaboration",
  "/testimonials",
  "/success-stories",
  "/insights/business-updates",
  "/insights/compliance-calendar",
  "/insights/government-notifications",
  "/insights/gst-updates",
  "/insights/legal-updates",
  "/insights/mca-updates",
  "/insights/rbi-circulars",
  "/insights/sebi-updates",
  "/insights/start-up-and-msme-updates",
  "/insights/startup-news",
  "/insights/download-useful-documents",
  "/insights/white-papers-research",
];

function formData(values) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, String(value));
  return data;
}

function nextWeekday() {
  const date = new Date();
  date.setUTCHours(12, 0, 0, 0);
  do {
    date.setUTCDate(date.getUTCDate() + 1);
  } while ([0, 6].includes(date.getUTCDay()));
  return date.toISOString().slice(0, 10);
}

for (const path of formPages) {
  const response = await fetch(new URL(path, baseUrl));
  const html = await response.text();
  if (!response.ok || !html.includes(verificationHeading)) {
    throw new Error(`Form page check failed for ${path} (HTTP ${response.status}).`);
  }
}

const directSubmissions = [
  [
    "enquiry",
    "/api/enquiry",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: "home",
        name: "Verification Test",
        email: "test@example.com",
        phone: "+919876543210",
        message: "Valid enough enquiry details",
        consent: "yes",
        enquiryAgreementAccepted: "yes",
        enquiryAgreementId: "enquiry-communication-consultation-consent",
      }),
    },
  ],
  [
    "global enquiry",
    "/api/global-enquiry",
    {
      method: "POST",
      body: formData({
        name: "Verification Test",
        company: "Example Ltd",
        email: "test@example.com",
        phone: "+919876543210",
        interest: "General",
        message: "Valid enough global enquiry details",
        consent: "yes",
        enquiryAgreementAccepted: "yes",
        enquiryAgreementId: "enquiry-communication-consultation-consent",
      }),
    },
  ],
  [
    "professional enquiry",
    "/api/professional-enquiry",
    {
      method: "POST",
      body: formData({
        connectWith: "general",
        name: "Verification Test",
        company: "Example Ltd",
        email: "test@example.com",
        phone: "+919876543210",
        message: "Valid enough professional enquiry details",
        consent: "yes",
        enquiryAgreementAccepted: "yes",
        enquiryAgreementId: "enquiry-communication-consultation-consent",
      }),
    },
  ],
  [
    "schedule meeting",
    "/api/schedule-meeting",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Verification Test",
        email: "test@example.com",
        phone: "+919876543210",
        organisation: "Example Ltd",
        service: "Corporate & Commercial",
        team: "Just me",
        turnover: "Pre-revenue",
        date: nextWeekday(),
        time: "10:00 AM",
        timezone: "Asia/Kolkata",
        mode: "Video Meeting",
        consent: true,
        enquiryAgreementAccepted: "yes",
        enquiryAgreementId: "enquiry-communication-consultation-consent",
      }),
    },
  ],
  [
    "insights subscription",
    "/api/insights-subscribe",
    { method: "POST", body: formData({ email: "test@example.com", consent: "yes" }) },
  ],
  [
    "technology insights subscription",
    "/api/technology-insights-subscribe",
    {
      method: "POST",
      body: formData({ name: "Verification Test", email: "test@example.com", consent: "yes" }),
    },
  ],
  [
    "testimonial",
    "/api/testimonials",
    {
      method: "POST",
      body: formData({
        name: "Verification Test",
        email: "test@example.com",
        company: "Example Ltd",
        service: "Corporate Advisory",
        consent: "yes",
        format: "written",
        message: "This is a valid enough testimonial.",
      }),
    },
  ],
];

for (const [label, path, options] of directSubmissions) {
  const response = await fetch(new URL(path, baseUrl), options);
  const result = await response.json();
  const expectedRejection = ["enquiry", "global enquiry", "professional enquiry"].includes(label)
    ? "verify your email"
    : "captcha";
  if (response.ok || !result.message?.toLowerCase().includes(expectedRejection)) {
    throw new Error(`Direct ${label} submission did not reach the ${expectedRejection} rejection (HTTP ${response.status}).`);
  }
}

console.log(`Passed: ${formPages.length} public form pages render verification controls.`);
console.log(`Passed: ${directSubmissions.length} direct submission API requests are rejected.`);
