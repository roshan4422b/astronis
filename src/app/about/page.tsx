import Hero from "./hero";
import Story from "./story";
import Values from "./values";
import Approach from "../home/approach";
import Leadership from "../professionals/leadership";
import Consultation from "../home/consultation";
export const metadata = { title: "About Us" };
export default function AboutPage() {
  return (
    <>
      <Hero />
      <Story />
      <Values />
      <Approach />
      <section className="container">
        <Leadership />
      </section>
      <Consultation />
    </>
  );
}
