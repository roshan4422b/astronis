"use client";

import { useState } from "react";
import Icon from "@/app/_components/icon";
import styles from "./entity-formation-page.module.css";

type ServiceCardItem = [string, string, string];

export default function ServiceCards({
  services,
  threeColumns = false,
}: {
  services: ServiceCardItem[];
  threeColumns?: boolean;
}) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className={`${styles.serviceGrid} ${threeColumns ? styles.serviceCardsThreeColumns : ""}`}>
      {services.map(([icon, title, description]) => (
        <button
          aria-pressed={selectedService === title}
          className={styles.serviceCard}
          key={title}
          onClick={() => setSelectedService(title)}
          type="button"
        >
          <span className={styles.icon}><Icon name={icon} /></span>
          <h3>{title}</h3>
          <p>{description}</p>
        </button>
      ))}
    </div>
  );
}
