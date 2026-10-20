import type { ReactNode } from "react";
import styles from "./entity-formation-page.module.css";

type PageSectionLayoutProps = {
  variant: "full-width";
  children: ReactNode;
};

export default function PageSectionLayout({ children }: PageSectionLayoutProps) {
  return (
    <div className={`${styles.sectionLayout} ${styles.sectionLayoutFullWidth}`}>
      <div className={styles.sectionLayoutContent}>{children}</div>
    </div>
  );
}
