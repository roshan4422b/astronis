import type { Metadata } from "next";
import ExpertisePage from "./expertise-page";

export const metadata: Metadata = {
  title: "Expertise Across Practice Areas",
  description:
    "Find multidisciplinary legal, regulatory, financial and business expertise for your requirements.",
};

export default function Page() {
  return <ExpertisePage />;
}