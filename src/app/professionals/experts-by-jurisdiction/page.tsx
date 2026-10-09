import type { Metadata } from "next";
import ExpertsByJurisdiction from "./page-content";

export const metadata: Metadata = {
  title: { absolute: "Experts by Jurisdiction | ASTRONIS Global" },
  description:
    "Connect with legal, regulatory, corporate, financial and business advisory professionals across key global jurisdictions.",
};

export default function ExpertsByJurisdictionPage() {
  return <ExpertsByJurisdiction />;
}
