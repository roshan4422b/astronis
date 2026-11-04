import { industries, practices } from "@/content/site";
import { professionals } from "@/app/professionals/leadership";

export const insightsCategories = [
  "Articles & Resources",
  "White Papers",
  "Government Notifications",
  "Legal Updates",
  "Business Updates",
  "RBI Updates",
  "SEBI Updates",
  "GST Updates",
  "MCA Updates",
  "Startup & MSME",
  "Compliance Calendar",
  "Downloads",
  "FAQs",
  "Case Studies & Success Stories",
];

export const demoInsights = [
  { title: "Demo: Regulatory update overview", category: "Legal Updates", author: "Editorial team", updated: "21 Oct 2026", status: "Draft" },
  { title: "Demo: Compliance planning checklist", category: "Compliance Calendar", author: "Editorial team", updated: "18 Oct 2026", status: "Published" },
  { title: "Demo: RBI circular briefing", category: "RBI Updates", author: "Editorial team", updated: "14 Oct 2026", status: "Published" },
  { title: "Demo: Business expansion guide", category: "Articles & Resources", author: "Editorial team", updated: "09 Oct 2026", status: "Archived" },
  { title: "Demo: Startup obligations overview", category: "Startup & MSME", author: "Editorial team", updated: "02 Oct 2026", status: "Draft" },
  { title: "Demo: MCA notification summary", category: "Government Notifications", author: "Editorial team", updated: "26 Sep 2026", status: "Published" },
  { title: "Demo: Cross-border advisory note", category: "White Papers", author: "Editorial team", updated: "20 Sep 2026", status: "Draft" },
  { title: "Demo: SEBI regulatory watch", category: "SEBI Updates", author: "Editorial team", updated: "12 Sep 2026", status: "Published" },
];

export type EnquiryStatus = "New" | "In Progress" | "Responded" | "Closed";
export type TestimonialApprovalStatus = "Pending" | "Approved" | "Rejected" | "Archived";
export type TestimonialConsentStatus = "Granted" | "Not granted" | "Not Recorded" | "Withdrawn";

export const demoEnquiries: {
  name: string;
  email: string;
  subject: string;
  date: string;
  status: EnquiryStatus;
  company: string;
  formType: string;
  message: string;
}[] = [
  { name: "Aarav Mehta", email: "aarav.mehta@example.com", subject: "Corporate advisory", date: "2026-10-22T09:30:00.000Z", status: "New", company: "Northstar Demo Ltd.", formType: "Website enquiry", message: "We would like to understand the typical steps involved in a corporate advisory engagement. This is fictional sample enquiry text." },
  { name: "Mira Shah", email: "mira.shah@example.com", subject: "Regulatory compliance", date: "2026-10-21T13:15:00.000Z", status: "In Progress", company: "Willow Creek Sample Co.", formType: "Service enquiry", message: "Our sample team is reviewing compliance support options and would appreciate an overview of the available services." },
  { name: "Dev Khanna", email: "dev.khanna@example.com", subject: "Business setup", date: "2026-10-20T10:00:00.000Z", status: "New", company: "Demo Ventures", formType: "Website enquiry", message: "Could you share general information about planning a new business setup? This example contains no real submission." },
  { name: "Sana Kapoor", email: "sana.kapoor@example.com", subject: "Cross-border advisory", date: "2026-10-18T08:45:00.000Z", status: "Responded", company: "Example Horizon Group", formType: "Service enquiry", message: "We are exploring a fictional cross-border project and would like to learn what information is helpful for an initial discussion." },
  { name: "Rohan Iyer", email: "rohan.iyer@example.com", subject: "Technology solutions", date: "2026-10-17T11:20:00.000Z", status: "New", company: "Sample Arc Systems", formType: "Technology enquiry", message: "Our example organisation is reviewing process automation opportunities and is looking for a general introduction." },
  { name: "Tara Nair", email: "tara.nair@example.com", subject: "Industry advisory", date: "2026-10-15T14:05:00.000Z", status: "In Progress", company: "Fictional Cedar Works", formType: "Industry enquiry", message: "Please share a high-level overview of advisory support for a fictional organisation in our sector." },
  { name: "Kabir Rao", email: "kabir.rao@example.com", subject: "Service information", date: "2026-10-12T07:50:00.000Z", status: "Responded", company: "Demo Meridian Partners", formType: "Service enquiry", message: "This sample enquiry asks for an introductory explanation of the services represented in the admin preview." },
  { name: "Leena Das", email: "leena.das@example.com", subject: "General consultation", date: "2026-10-09T16:40:00.000Z", status: "New", company: "Example Lantern Studio", formType: "Website enquiry", message: "A fictional contact requests a general consultation overview. No message has been submitted to the live website." },
];

export const demoTestimonials: {
  name: string;
  excerpt: string;
  text: string;
  date: string;
  consentStatus: TestimonialConsentStatus;
  approvalStatus: TestimonialApprovalStatus;
}[] = [
  { name: "Demo Contributor One", excerpt: "A fictional sample about clear communication and helpful guidance.", text: "Our fictional team appreciated the clear communication throughout this sample engagement. The guidance was organised and easy to understand.", date: "2026-10-20T10:00:00.000Z", consentStatus: "Granted", approvalStatus: "Pending" },
  { name: "Demo Contributor Two", excerpt: "Sample feedback describing a well-organised project process.", text: "This entirely fictional feedback describes a well-organised project process and a helpful overview of the available options.", date: "2026-10-16T12:30:00.000Z", consentStatus: "Not Recorded", approvalStatus: "Pending" },
  { name: "Demo Contributor Three", excerpt: "An example of positive feedback awaiting independent consent review.", text: "This fictional contributor valued the team's responsiveness and the structured way the sample questions were addressed.", date: "2026-10-11T09:20:00.000Z", consentStatus: "Granted", approvalStatus: "Approved" },
  { name: "Demo Contributor Four", excerpt: "A fictional testimonial marked for further internal review.", text: "A fictional sample testimonial that demonstrates the rejection workflow. It does not represent a real client statement.", date: "2026-10-08T15:10:00.000Z", consentStatus: "Not Recorded", approvalStatus: "Rejected" },
  { name: "Demo Contributor Five", excerpt: "Sample note about a responsive and collaborative experience.", text: "This example text describes a responsive, collaborative experience in a purely fictional scenario created for interface testing.", date: "2026-10-05T08:00:00.000Z", consentStatus: "Withdrawn", approvalStatus: "Pending" },
  { name: "Demo Contributor Six", excerpt: "A fictional sample focused on practical, clearly explained next steps.", text: "The example team found the suggested next steps practical and clearly explained. This is fictional demo text only.", date: "2026-10-02T11:45:00.000Z", consentStatus: "Granted", approvalStatus: "Pending" },
  { name: "Demo Contributor Seven", excerpt: "Fictional feedback retained to demonstrate moderation controls.", text: "This is a fictional sample testimonial record used only to demonstrate approval and consent as separate controls.", date: "2026-09-28T13:25:00.000Z", consentStatus: "Not Recorded", approvalStatus: "Approved" },
];

export const websitePages = [
  { title: "Home", slug: "/", section: "Main website", status: "Published", updated: "18 Oct 2026" },
  { title: "About Astronis", slug: "/about", section: "Company", status: "Published", updated: "16 Oct 2026" },
  { title: "Services", slug: "/services", section: "Services", status: "Published", updated: "14 Oct 2026" },
  { title: "Industries", slug: "/industries", section: "Company", status: "Published", updated: "11 Oct 2026" },
  { title: "Professionals", slug: "/professionals", section: "Company", status: "Published", updated: "09 Oct 2026" },
  { title: "Insights & Events", slug: "/insights-events", section: "Insights", status: "Published", updated: "03 Oct 2026" },
  { title: "Global Presence", slug: "/global-presence", section: "Global", status: "Published", updated: "29 Sep 2026" },
  { title: "Contact", slug: "/contact", section: "Contact", status: "Published", updated: "24 Sep 2026" },
];

export const jurisdictionPages = [
  { title: "India", slug: "/global-presence/india", section: "South Asia", status: "Published", updated: "17 Oct 2026" },
  { title: "UAE", slug: "/global-presence/uae", section: "Middle East", status: "Published", updated: "13 Oct 2026" },
  { title: "Singapore", slug: "/global-presence/singapore", section: "Asia-Pacific", status: "Published", updated: "09 Oct 2026" },
  { title: "UK", slug: "/global-presence/uk", section: "Europe", status: "Published", updated: "06 Oct 2026" },
  { title: "USA", slug: "/global-presence/usa", section: "North America", status: "Published", updated: "02 Oct 2026" },
  { title: "European Union", slug: "/global-presence/european-union", section: "Europe", status: "Published", updated: "28 Sep 2026" },
  { title: "Middle East", slug: "/global-presence/middle-east", section: "Middle East", status: "Published", updated: "24 Sep 2026" },
];

export const technologyPages = [
  { title: "Technology & Digital Solutions", category: "Overview", slug: "/technology-and-digital-solutions" },
  { title: "Digital Business Solutions", category: "Digital solutions", slug: "/technology-and-digital-solutions/digital-business-solutions" },
  { title: "Data, AI & Automation", category: "Emerging technology", slug: "/technology-and-digital-solutions/data-ai-and-automation" },
  { title: "Cybersecurity Readiness", category: "Cybersecurity", slug: "/technology-and-digital-solutions/cybersecurity-data-protection/cybersecurity-readiness" },
  { title: "Client & Enterprise Portals", category: "Digital solutions", slug: "/technology-and-digital-solutions/client-enterprise-portals" },
  { title: "Cloud & Collaboration", category: "Digital solutions", slug: "/technology-and-digital-solutions/cloud-and-collaboration" },
  { title: "Technology Insights", category: "Insights", slug: "/technology-and-digital-solutions/technology-insights" },
  { title: "Legal Technology", category: "Legal technology", slug: "/technology-and-digital-solutions/legal-technology" },
  { title: "RegTech & Compliance Technology", category: "RegTech", slug: "/technology-and-digital-solutions/regtech-and-compliance-technology" },
  { title: "Compliance Calendar", category: "Compliance", slug: "/technology-and-digital-solutions/compliance-calendar" },
];

export const serviceRows = practices.map((service) => ({
  title: service.title,
  category: service.category,
  status: "Published",
  slug: `/services/${service.canonicalSlug}`,
}));

export const industryRows = industries.map((industry) => ({
  title: industry.title,
  description: "Industry advisory page",
  status: "Published",
  slug: `/industries/${industry.slug}`,
}));

export const professionalRows = professionals.map((professional) => ({
  title: professional.name,
  designation: professional.role,
  expertise: professional.expertise,
  status: "Published",
  slug: `/professionals/${professional.slug}`,
}));

export const dashboardStats = [
  { label: "Website route inventory", value: "Sample", change: "Partial route sample — not a complete inventory", icon: "pages" },
  { label: "Published insights", value: "24", change: "Demo dashboard metric", icon: "insights" },
  { label: "Draft insights", value: "08", change: "Demo dashboard metric", icon: "drafts" },
  { label: "Total services", value: String(practices.length).padStart(2, "0"), change: "Service categories", icon: "services" },
  { label: "Total professionals", value: String(professionals.length).padStart(2, "0"), change: "Profiles on the site", icon: "people" },
  { label: "New enquiries", value: "08", change: "Sample UI data only", icon: "inbox" },
];
