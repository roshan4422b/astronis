"use client";

import Icon from "../_components/icon";
import styles from "./hub.module.css";

export default function ScheduleConsultationButton({ secondary = false }: { secondary?: boolean }) {
  return (
    <button
      type="button"
      className={`${styles.action} ${secondary ? styles.secondary : ""}`}
      onClick={() => window.dispatchEvent(new Event("astronis:open-scheduler"))}
    >
      Schedule a Consultation
      <Icon name="arrow" />
    </button>
  );
}
