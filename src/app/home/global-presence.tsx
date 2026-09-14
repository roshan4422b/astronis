import Image from "@/app/_components/asset-image";
import Icon from "../_components/icon";
import { Button } from "../_components/ui";
import styles from "./global-presence.module.css";

const features = [
  { icon: "globe", title: "Global Perspective", text: "Cross-border experience and understanding of global business dynamics." },
  { icon: "scale", title: "Local Expertise", text: "In-depth knowledge of local laws, regulations and market practices." },
  { icon: "people", title: "Multi-Jurisdictional Support", text: "Seamless support across jurisdictions and industries." },
  { icon: "shield", title: "Trusted Network", text: "Strong relationships with law firms, advisors and regulatory bodies worldwide." },
];
const presence = [
  { icon: "globe", title: "Our Global Presence", text: "Connected. Committed. Always by Your Side." },
  { icon: "building", title: "Multiple Countries", text: "Across key global markets" },
  { icon: "pin", title: "Pan India Presence", text: "Strong footprint across India" },
  { icon: "people", title: "Global Network", text: "Trusted network of legal and advisory partners" },
  { icon: "globe", title: "Diverse Industries", text: "Serving businesses across diverse sectors" },
];
export default function GlobalPresence() {
  return (
    <section className={styles.section} aria-labelledby="home-global-title">
      <div className={styles.visual}>
        <Image src="/Part-9 .png" alt="Connected globe and international business skyline" fill sizes="100vw" className={styles.background} />
      </div>
      <div className={`container ${styles.content}`}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>CONNECTED ACROSS BORDERS</span>
          <h2 id="home-global-title">Global Mindset<span>.</span><br />Local Insight<span>.</span></h2>
          <span className={styles.rule} aria-hidden="true" />
          <p>Combining cross-border perspective with jurisdiction-specific understanding, Astronis Global helps businesses navigate opportunities and regulatory complexity across markets.</p>
          <div className={styles.actions}>
            <Button href="/global-presence#countries"><Icon name="globe" /><span>Choose Your Country</span></Button>
            <Button href="/global-presence/local-insight" secondary><Icon name="pin" /><span>Global Mindset.<br />Local Insight.</span></Button>
          </div>
        </div>
        <div className={styles.features}>
          {features.map((item) => <article className={styles.feature} key={item.title}><span className={styles.featureIcon}><Icon name={item.icon} /></span><h3>{item.title}</h3><p>{item.text}</p></article>)}
        </div>
        <div className={styles.presence}>
          {presence.map((item) => <article className={styles.presenceItem} key={item.title}><span className={styles.presenceIcon}><Icon name={item.icon} /></span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
        </div>
        <p className={styles.tagline}>One Global Vision. Many Local Connections. Limitless Possibilities.</p>
      </div>
    </section>
  );
}
