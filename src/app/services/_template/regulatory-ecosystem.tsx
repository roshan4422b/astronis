import Icon from "../../_components/icon";
import styles from "./service-template.module.css";

export default function RegulatoryEcosystem({ stages }: { stages: string[] }) {
  return <div className={`${styles.lifecycle} ${styles.regulatoryEcosystem}`} aria-label="Regulatory compliance ecosystem">
    <ol>{stages.map((stage, index) => <li key={stage}><span><Icon name={index === 1 || index === 5 ? "shield" : "file"} /></span><strong>{stage}</strong></li>)}</ol>
    <p>Understand obligations. Coordinate action. Maintain oversight.</p>
  </div>;
}
