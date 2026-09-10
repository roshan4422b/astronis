import { insightCategories, slugify } from "@/content/site";
import Image from "@/app/_components/asset-image";
import { Heading, TextLink } from "../_components/ui";
export default function Insights() {
  return (
    <section className="section pale">
      <div className="container">
        <Heading
          title="Insights & Resources"
          text="Latest legal, regulatory, business and tax/compliance developments presented in a practical and accessible format."
        />
        <div className="insight-grid">
          {insightCategories.map((category, i) => (
            <article className="insight-card" key={category}>
              <div className="card-image">
                <Image
                  src={
                    "/" +
                    [
                      "Part-6 .png",
                      "Part-18 .png",
                      "Part-16 .png",
                      "Part-14 .png",
                      "Part-10 .png",
                      "Professional & Business Services .png",
                      "Technology, IT & ITES .png",
                      "FinTech & Digital Finance .png",
                    ][i]
                  }
                  alt=""
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                />
              </div>
              <div className="card-body">
                <span className="eyebrow">{category}</span>
                <h3>
                  {
                    [
                      "Legal perspective for informed decisions",
                      "Navigate a changing regulatory landscape",
                      "Practical thinking for growing businesses",
                      "Stay informed. Plan with confidence.",
                      "Build stronger foundations for growth",
                      "Plan approvals with greater clarity",
                      "Protect value in a digital economy",
                      "Manage cross-border obligations confidently",
                    ][i]
                  }
                </h3>
                <TextLink href={"/insights/" + slugify(category)}>
                  Explore Resources
                </TextLink>
              </div>
            </article>
          ))}
        </div>
        <div className="center">
          <TextLink href="/insights">View All Insights</TextLink>
        </div>
      </div>
    </section>
  );
}
