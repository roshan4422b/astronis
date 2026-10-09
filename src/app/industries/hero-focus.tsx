import Icon from "../_components/icon";
import styles from "./logistics.module.css";

function iconFor(label: string) {
  const value = label.toLowerCase();
  if (/compliance|regulation|security|risk|privacy|trust|safety|stability/.test(value)) return "shield";
  if (/contract|licensing|policy|procurement|content|intellectual property/.test(value)) return "document";
  if (/export|trade|global|market|distribution/.test(value)) return "globe";
  if (/people|community|stakeholder|liaison|coordination|inclusion/.test(value)) return "people";
  if (/innovation|tech|digital|platform|data|agri-tech/.test(value)) return "bulb";
  if (/finance|investment|growth|opportunity|monetisation/.test(value)) return "chart";
  if (/project|infrastructure|warehousing|sourcing|farming/.test(value)) return "building";
  if (/sustain|clean|energy|tomorrow/.test(value)) return "globe";
  return "building";
}

export default function HeroFocus({ items }: { items: string[] }) {
  return <aside className={`${styles.heroFocus} ${items.length >= 6 ? styles.heroFocusColumns : ""}`} aria-label="Areas of focus">
    <span>Where we help</span>
    <ul>{items.map(item => <li key={item}><span className={styles.focusIcon}><Icon name={iconFor(item)} /></span><strong>{item}</strong></li>)}</ul>
  </aside>;
}
