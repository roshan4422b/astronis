import Link from "next/link";
import styles from "./service-template.module.css";

export type Crumb = { title: string; href?: string };
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return <nav aria-label="Breadcrumb" className={styles.breadcrumb}><ol>{items.map((item, index) => <li key={`${item.title}-${index}`}>{index > 0 && <span aria-hidden="true">/</span>}{item.href ? <Link href={item.href}>{item.title}</Link> : <span aria-current="page">{item.title}</span>}</li>)}</ol></nav>;
}
