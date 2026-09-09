import Hero from "./hero";
import Leadership from "./leadership";
import Consultation from "../home/consultation";
export const metadata = { title: "Our Professionals" };
export default function ProfessionalsPage() {
  return (
    <>
      <Hero />
      <section className="section">
        <div className="container">
          <Leadership />
        </div>
      </section>
      <Consultation />
    </>
  );
}
