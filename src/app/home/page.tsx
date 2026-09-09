import Hero from "./hero";
import QuickServices from "./quick-services";
import WhyChooseUs from "./why-choose-us";
import Services from "./services";
import Industries from "./industries";
import GlobalPresence from "./global-presence";
import Approach from "./approach";
import Professionals from "./professionals";
import Insights from "./insights";
import FAQ from "./faq";
import Clients from "./clients";
import SuccessStories from "./success-stories";
import Testimonials from "./testimonials";
import Consultation from "./consultation";
import Contact from "./contact";
import Connect from "./connect";
export const metadata = { alternates: { canonical: "/" } };
export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickServices />
      <WhyChooseUs />
      <Services />
      <Industries />
      <GlobalPresence />
      <Approach />
      <Professionals />
      <Insights />
      <FAQ />
      <Clients />
      <SuccessStories />
      <Testimonials />
      <Consultation />
      <Contact />
      <Connect />
    </>
  );
}
