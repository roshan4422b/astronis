import Image from "../_components/asset-image";
import { TextLink } from "../_components/ui";
import styles from "./professionals-page.module.css";

export const professionals = [
  {
    name: "Krishna Kumar Mishra",
    slug: "krishna-kumar-mishra",
    image: "/Professionals/krishna_kumar_mishra.jpeg",
    code: "AG01",
    hierarchy: "Global Leadership",
    role: "Founder / Managing Partner / Global Head",
    location: "Delhi, India",
    phones: ["011 4657 4455", "93116 64455"],
    email: "advisory@astronisglobal.com",
    linkedinProfile: "Krishna mishra36",
    expertise:
      "Legal strategy, Regulatory, Business Advisory, Litigation-Corporate, Civil, White Colour Crime, IPR Attorney, Banking & Industrial Law",
    description:
      "Leads Astronis Global and advises on legal strategy, regulatory matters, business advisory, litigation, intellectual property, banking and industrial law.",
    education: "B.Com, M.Com, LL.B",
    enrolment: "Bar Council of Delhi · Since 2014",
  },
  {
    name: "KM Priti Pandey",
    slug: "priti-mishra",
    image: "/Professionals/pritimishra.jpeg",
    code: "AG03",
    hierarchy: "Practice Leadership",
    role: "Managing Partner / Practice Head",
    location: "Delhi, India",
    phones: ["011 4657 4455", "81783 64443"],
    email: "astronisglobal@gmail.com",
    linkedinProfile: "Pritimishra36",
    expertise:
      "Litigation – Civil Law, Family law, Matrimonial Law, Commercial law, Employment & Labour law",
    description:
      "Provides practice leadership and advises on civil litigation, family and matrimonial matters, commercial law, employment and labour law.",
    education: "B.A., LL.B",
    enrolment: "Bar Council of Delhi · Since 2022",
  },
  {
    name: "K. N. Mishra",
    slug: "krishna-nand-mishra",
    image: "/Professionals/Krishna_nand.jpeg",
    code: "AG04",
    hierarchy: "Director",
    role: "Regulatory / Licensing",
    location: "Delhi, India",
    phones: ["011 4657 4455", "80108 91388"],
    email: "regulatory@astronisglobal.com",
    expertise:
      "Regulatory, Licensing, Consultant, IPR Advisory and Prosecution, and Corporate Re-structuring",
    description:
      "Advises on regulatory and licensing matters, IPR advisory and prosecution, and corporate restructuring.",
  },
  {
    name: "Puneet Verma",
    slug: "puneet-kumar-verma",
    image: "/Professionals/Puneet_kumar.jpeg",
    code: "AG09",
    hierarchy: "Associate",
    role: "Legal Advisory",
    location: "Delhi, India",
    phones: ["011 4657 4455", "80108 91388"],
    email: "legal@astronisglobal.com",
    expertise:
      "Litigation – Criminal, Cheque Bounce, Debt Recovery, Banking Law",
    description:
      "Provides legal advisory on criminal litigation, cheque bounce matters, debt recovery and banking law.",
  },
  {
    name: "Arun Kumar Mishra",
    slug: "arun-kumar-mishra",
    image: "/Professionals/arun Kumar Mishra .png.jpeg",
    code: "AG04",
    hierarchy: "Director",
    role: "Business Advisory",
    location: "UP, India",
    phones: ["011 4657 4455", "95694 95136"],
    email: "business@astronisglobal.com",
    expertise:
      "Business Advisory, Acquisition, Corporate Group structuring, Financing, Startup and MSME Advisory",
    description:
      "Advises on business matters including acquisitions, corporate group structuring, financing, startups and MSMEs.",
  },
  {
    name: "Raj Kumar",
    slug: "raj-kumar",
    image: "/Professionals/Raj Kumar Pictures .png",
    code: "AG09",
    hierarchy: "Senior Associate",
    role: "Business Advisory",
    location: "Delhi, India",
    phones: ["011 4657 4455", "81783 64443"],
    email: "contact@astronisglobal.com",
    expertise:
      "Licensing Advisory, Business acquisition and support, Corporate Due-Diligence, BIS and ISI compliances",
    description:
      "Supports clients with licensing, business acquisitions, corporate due diligence, and BIS and ISI compliance.",
  },
];
type CmsProfessional = { slug: string; name: string; role: string; expertise: string; image?: string };
export default function Leadership({ limit, cmsProfessionals = [] }: { limit?: number; cmsProfessionals?: CmsProfessional[] }) {
  const merged = [...cmsProfessionals, ...professionals.filter((person) => !cmsProfessionals.some((item) => item.slug === person.slug))];
  const visibleProfessionals = limit ? merged.slice(0, limit) : merged;

  return (
    <div className={variant === "premium" ? styles.peopleGrid : "leadership-grid"}>
      {visibleProfessionals.map((p) => (
        <article className="leader-card" key={p.slug}>
          <div className="leader-avatar">
            {p.image ? <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="(max-width: 760px) 35vw, 155px"
            /> : <span aria-hidden="true">{p.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("")}</span>}
          </div>
          <div className={variant === "premium" ? styles.personBody : undefined}>
            <h3>{p.name}</h3>
            <span className={variant === "premium" ? styles.role : "eyebrow"}>{p.role}</span>
            <p>{variant === "premium" ? p.description : p.expertise}</p>
            {variant === "premium" && <span className={styles.expertise}>{p.expertise}</span>}
            <TextLink href={"/professionals/" + p.slug}>View Profile</TextLink>
          </div>
        </article>
      ))}
    </div>
  );
}
