import type { Metadata } from "next";
import CollaborateWithUsPage from "./page-content";

export const metadata: Metadata = {
  title: "Collaborate With Us",
  description: "Partner with Astronis Global through professional collaboration, client referrals, joint assignments and international network opportunities.",
};

export default function Page() {
  return <CollaborateWithUsPage />;
}
