import Image from "@/app/_components/asset-image";
import Icon from "@/app/_components/icon";
import Link from "next/link";
import { industries, practices } from "@/content/site";
import { professionals } from "../leadership";
import EnquiryForm from "./professional-enquiry-form";
import styles from "./professional-enquiry.module.css";

export const metadata = {
  title: "Professional Enquiry",
  description: "Tell Astronis Global about your requirements and connect with the right professional.",
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

const benefits = [
  ["people", "Right expertise", "Connect with a relevant professional"],
  ["shield", "Confidential enquiry", "Your information is handled with care"],
  ["calendar", "Prompt response", "Our team will review your request"],
  ["globe", "Practical solutions", "Advice shaped around your goals"],
];

export default async function ProfessionalEnquiryPage({ searchParams }: {
  searchParams: Promise<{ professional?: string | string[]; service?: string | string[]; industry?: string | string[]; network?: string | string[] }>;
}) {
  const query = await searchParams;
  const networkApplication = first(query.network) === "join";
  const professional = professionals.find(person => person.slug === first(query.professional));
  const service = practices.find(practice => practice.slug === first(query.service));
  const industry = industries.find(item => item.slug === first(query.industry));

  return <div className={styles.page}>
    <div className={styles.layout}>
      <aside className={styles.intro} aria-label="Why connect with our professionals">
        <div className={styles.introBackdrop}><Image src="/Professional & Business Services .png" alt="" fill sizes="(max-width: 900px) 100vw, 36vw" /></div>
        <div className={styles.introContent}>
          <Link className={styles.brand} href="/" aria-label="Astronis Global home"><Image src="/astronis_logo.jpeg" alt="Astronis Global" width={250} height={94} /></Link>
          <span className={styles.introRule} />
          <h1>{networkApplication ? <>Join Our<br />Professional Network</> : <>Connect with<br />Our Professionals</>}</h1>
          <p>{networkApplication ? "Share your experience and areas of expertise to start a conversation about professional collaboration." : "Share your requirements and we will connect you with a member of our team who can help you take the next step."}</p>
          <div className={styles.benefits}>{benefits.map(([icon,title,description]) => <div key={title}><span><Icon name={icon} /></span><div><strong>{title}</strong><small>{description}</small></div></div>)}</div>
          <span className={styles.introRule} />
          <blockquote>“Your trusted partner in progress.”</blockquote>
        </div>
      </aside>
      <section className={styles.formSide} aria-labelledby="enquiry-heading"><div className={styles.card}>
        <header className={styles.formHeader}><div><span className={styles.kicker}>PERSONAL CONNECTION · PRACTICAL ADVICE</span><h2 id="enquiry-heading">{networkApplication ? "Share Your Professional Profile" : "Professional Enquiry"}</h2><p>{networkApplication ? "Tell us about your practice and upload a profile or CV if you have one." : "Tell us what you need. We will connect you with the right professional."}</p></div><div className={styles.confidential}><Icon name="shield" /><span>Your information<br />is confidential.</span></div></header>
        {industry && <p className={styles.context}>Enquiry for <strong>{industry.title}</strong></p>}
        <EnquiryForm initialProfessional={professional?.slug} initialService={service?.slug} industry={industry?.title} networkApplication={networkApplication} />
      </div></section>
    </div>
  </div>;
}
