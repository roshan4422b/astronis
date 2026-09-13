import Hero from "./hero";
import IndustryDirectory from "./industry-directory";
import Services from "../home/services";
import Insights from "../home/insights";
import FAQ from "../home/faq";
import Professionals from "../home/professionals";
import Consultation from "../home/consultation";
export const metadata = {
  title: "Industries",
  description:
    "Explore sector-focused legal, regulatory and business advisory across 24 industries.",
};
export default function IndustriesPage() {
  return (
    <>
      <Hero />
      <IndustryDirectory />
      <Services />
      <Insights />
      <FAQ />
      <Professionals />
      <Consultation />
    </>
  );
}
