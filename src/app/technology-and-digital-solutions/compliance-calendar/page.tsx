import ComplianceCalendar from "@/app/insights/compliance-calendar";

export const metadata = {
  title: "Compliance Calendar",
  description: "Track sample MCA, GST, Income Tax and other compliance dates in the Astronis Global Compliance Calendar.",
};

export default function TechnologyComplianceCalendarPage() {
  return <ComplianceCalendar variant="technology" />;
}
