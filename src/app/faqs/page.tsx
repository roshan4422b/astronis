import { Banner } from "../_components/ui";
import FAQ from "../home/faq";
export const metadata = { title: "Frequently Asked Questions" };
export default function FAQsPage() {
  return (
    <>
      <Banner
        title="How Can We Help?"
        text="Answers to common questions about our services, reach and consultation process."
        eyebrow="FAQs"
      />
      <FAQ />
    </>
  );
}
