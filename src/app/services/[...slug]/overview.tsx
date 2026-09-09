import Link from "next/link";
import { Button, TextLink } from "../../_components/ui";
import { slugify } from "@/content/site";
export default function Overview({
  title,
  description,
  group,
  items,
}: {
  title: string;
  description: string;
  group: string;
  items: string[];
}) {
  return (
    <section className="section">
      <div className="container article-layout">
        <article className="article-copy">
          <h2>{title}</h2>
          <p>{description}</p>
          <h2>A practical approach to your requirements</h2>
          <p>
            Every engagement begins with understanding your business, objectives
            and the scope of support you need. Our team assesses the matter,
            develops an appropriate course of action and coordinates the
            engagement with clear communication.
          </p>
          <h2>Discuss your matter with our team</h2>
          <p>
            Share your business location, current stage, relevant documents and
            expected timelines. We will discuss the proposed scope, professional
            support and next steps with you.
          </p>
          {items.length > 0 && (
            <>
              <h2>Services within this practice</h2>
              <div className="directory-card">
                <ul>
                  {items.map((item) => (
                    <li key={item}>
                      <Link href={"/services/" + group + "/" + slugify(item)}>
                        {item}
                        <span>→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
          <div className="button-row">
            <TextLink href="/services">Explore All Services</TextLink>
          </div>
        </article>
        <aside className="article-aside">
          <h3>Let’s discuss your requirements.</h3>
          <p>
            Connect with our team for support tailored to your business and
            jurisdiction.
          </p>
          <Button href="/contact">Talk to Our Experts</Button>
          <p style={{ marginTop: 20 }}>
            +91 9311664455
            <br />
            advisory@astronisglobal.com
          </p>
        </aside>
      </div>
    </section>
  );
}
