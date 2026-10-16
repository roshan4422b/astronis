import type { ReactNode } from "react";
import styles from "./professional-scope.module.css";

export default function ProfessionalsLayout({ children }: { children: ReactNode }) {
  return <div className={styles.scope}>{children}</div>;
}
