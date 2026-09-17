import Hero from "./hero";
import Leadership from "./leadership";
import Consultation from "../home/consultation";
import { Button } from "../_components/ui";
export const metadata = { title: "Our Professionals" };
export default function ProfessionalsPage() {
  return (
    <>
      <Hero />
      <section className="section" id="leadership">
        <div className="container">
          <div className="section-heading-inline">
            <h2>Meet Our Professionals</h2>
            <Button href="/professionals/enquiry">Connect with a Professional</Button>
          </div>
          <Leadership />
        </div>
      </section>
      <Consultation />
    </>
  );
}
