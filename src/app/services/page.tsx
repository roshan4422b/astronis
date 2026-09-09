import Hero from "./hero";
import ServiceDirectory from "./service-directory";
import Consultation from "../home/consultation";
export const metadata = { title: "Services" };
export default function ServicesPage() {
  return (
    <>
      <Hero />
      <ServiceDirectory />
      <Consultation />
    </>
  );
}
