import Hero from "./hero";
import IndustryDirectory from "./industry-directory";
import Consultation from "../home/consultation";
export const metadata = { title: "Industries" };
export default function IndustriesPage() {
  return (
    <>
      <Hero />
      <IndustryDirectory />
      <Consultation />
    </>
  );
}
