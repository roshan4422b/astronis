import type { Metadata } from "next";
import EmployeeHandbookPage from "./employee-handbook-page";

export const metadata: Metadata = {
  title: "Employee Handbook | Astronis Global",
  description:
    "Develop and review a practical employee handbook covering workplace standards, HR policies, employee rights and applicable compliance requirements.",
  alternates: {
    canonical:
      "/services/industrial-employment-forensics-advisory/employment-and-labour/employee-handbook",
  },
};

export default function Page() {
  return <EmployeeHandbookPage />;
}