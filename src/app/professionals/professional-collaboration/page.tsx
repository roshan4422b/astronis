import type { Metadata } from "next";
import ProfessionalCollaboration from "../professional-collaboration";

export const metadata: Metadata = {
  title: "Professional Collaboration",
  description: "Explore professional collaboration, strategic partnerships, law firms, advisors, subject-matter experts and international professional networks with Astronis Global.",
};

export default function ProfessionalCollaborationPage() {
  return <ProfessionalCollaboration />;
}
