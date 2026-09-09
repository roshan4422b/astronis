import Hero from "./hero";
import Countries from "./countries";
import Consultation from "../home/consultation";
export const metadata = { title: "Global Presence" };
export default function GlobalPage() {
  return (
    <>
      <Hero />
      <Countries />
      <Consultation />
    </>
  );
}
