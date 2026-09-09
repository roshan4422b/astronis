import { faqs } from "@/content/site";
import { Heading, TextLink } from "../_components/ui";
export default function FAQ() {
  return (
    <section className="section">
      <div className="container narrow">
        <Heading title="Frequently Asked Questions" />
        <div className="faq-list">
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <div className="center">
          <TextLink href="/faqs">View All FAQs</TextLink>
        </div>
      </div>
    </section>
  );
}
