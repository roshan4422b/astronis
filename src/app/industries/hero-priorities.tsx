import Icon from "../_components/icon";
import styles from "./manufacturing.module.css";

export default function HeroPriorities({ title, items }: {
  title: string;
  items: [string, string][];
}) {
  return (
    <aside className={`${styles.heroAside} ${items.length >= 6 ? styles.heroAsideColumns : ""}`} aria-label={title}>
      <span>{title}</span>
      <ul>
        {items.map(([icon, label]) => (
          <li key={label}>
            <span className={styles.priorityIcon}><Icon name={icon} /></span>
            <strong>{label}</strong>
          </li>
        ))}
      </ul>
    </aside>
  );
}
