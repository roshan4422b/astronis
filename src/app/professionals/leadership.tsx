import Image from "../_components/asset-image";
import { TextLink } from "../_components/ui";
export const professionals = [
  {
    name: "Krishna Kumar Mishra",
    slug: "krishna-kumar-mishra",
    image: "/krishna_kumar_mishra.jpeg",
    role: "Founder Partner",
    expertise: "Corporate, commercial & regulatory advisory",
    description:
      "An accomplished legal professional with extensive experience in corporate, commercial and regulatory advisory. He leads the firm with a client-first approach and a commitment to excellence.",
    education: "B.Com, M.Com, LL.B",
    enrolment: "Bar Council of Delhi · Since 2014",
  },
  {
    name: "Priti Mishra",
    slug: "priti-mishra",
    image: "/pritimishra.jpeg",
    role: "Founder Partner",
    expertise: "Litigation, matrimonial matters & compliance",
    description:
      "A dedicated legal advisor with strong expertise in litigation, matrimonial matters and compliance advisory. She is passionate about delivering practical solutions with empathy and integrity.",
    education: "B.A., LL.B",
    enrolment: "Bar Council of Delhi · Since 2022",
  },
  {
    name: "Krishna Nand Mishra",
    slug: "krishna-nand-mishra",
    image: "/Krishna_nand.jpeg",
    role: "Professional Team",
    expertise: "Legal, regulatory & business advisory",
    description:
      "A member of the Astronis Global professional team supporting clients across legal, regulatory and business advisory matters.",
    education: "Professional profile details available on request",
    enrolment: "Astronis Global professional team",
  },
  {
    name: "Puneet Kumar Verma",
    slug: "puneet-kumar-verma",
    image: "/Puneet_kumar.jpeg",
    role: "Professional Team",
    expertise: "Legal, regulatory & business advisory",
    description:
      "A member of the Astronis Global professional team supporting clients across legal, regulatory and business advisory matters.",
    education: "Professional profile details available on request",
    enrolment: "Astronis Global professional team",
  },
];
export default function Leadership({ limit }: { limit?: number }) {
  return (
    <div className="leadership-grid">
      {professionals.slice(0, limit).map((p) => (
        <article className="leader-card" key={p.slug}>
          <div className="leader-avatar">
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="(max-width: 760px) 35vw, 155px"
            />
          </div>
          <div>
            <h3>{p.name}</h3>
            <span className="eyebrow">{p.role}</span>
            <p>{p.expertise}</p>
            <TextLink href={"/professionals/" + p.slug}>View Profile</TextLink>
          </div>
        </article>
      ))}
    </div>
  );
}
