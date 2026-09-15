import Link from "next/link";
import Image from "../_components/asset-image";
import Icon from "../_components/icon";
import styles from "./about-resources.module.css";

const resources = [
  { title: "Explore Our Services", image: "/explore_services.png", items: ["Corporate & Commercial", "Regulatory Services", "Litigation & Dispute Resolution", "Business Advisory"], href: "/services", action: "View All Services" },
  { title: "Industries We Serve", image: "/Real Estate & Construction .png", items: ["Manufacturing", "Financial Services", "Healthcare & Life Sciences", "Real Estate & Infrastructure"], href: "/industries", action: "Explore All Industries" },
  { title: "Knowledge Centre", image: "/Part-14 .png", items: ["Articles & Publications", "Regulatory Updates", "Events & Webinars", "Research & Insights"], href: "/knowledge-centre", action: "Visit Knowledge Centre" },
];

export default function AboutResources() {
 return <section className={styles.resources} aria-label="Explore Astronis Global"><div className={`container ${styles.resourceGrid}`}>{resources.map(item => <article key={item.title}><h2><Link href={item.href}>{item.title}<Icon name="arrow" /></Link></h2><div className={styles.resourceContent}><div className={styles.resourceImage}><Image src={item.image} alt="" fill sizes="(max-width: 700px) 30vw, 12vw" /></div><div><ul>{item.items.map(text => <li key={text}>{text}</li>)}</ul><Link className={styles.textLink} href={item.href}>{item.action}<Icon name="arrow" /></Link></div></div></article>)}</div></section>;
}
