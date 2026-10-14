import type { Metadata } from "next";
import WhitePapersResearch from "./white-papers-research";

export const metadata: Metadata = {
  title: "White Papers & Research",
  description:
    "Explore sector research, regulatory analysis and practical white papers from Astronis Global.",
  alternates: {
    canonical: "/insights/white-papers-research",
  },
};

export default function WhitePapersResearchPage() {
  return <WhitePapersResearch />;
}
