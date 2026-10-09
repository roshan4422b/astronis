import Link from "next/link";
import Image from "@/app/_components/asset-image";
import Icon from "./icon";
export function Button({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link href={href} className={`button${secondary ? " secondary" : ""}`}>
      {children}
      <Icon name="arrow" />
    </Link>
  );
}
export function Heading({
  title,
  text,
  light = false,
}: {
  title: string;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-heading${light ? " light" : ""}`}>
      <h2>{title}</h2>
      <span className="heading-line" />
      {text && <p>{text}</p>}
    </div>
  );
}
export function Banner({
  title,
  text,
  image = "/Part-6 .png",
  eyebrow,
}: {
  title: string;
  text?: string;
  image?: string;
  eyebrow?: string;
}) {
  return (
    <section className="page-banner">
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        preload
        className="backdrop"
      />
      <div className="container banner-content">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          {eyebrow || title}
        </div>
        <h1>{title}</h1>
        <span className="heading-line" />
        {text && <p>{text}</p>}
      </div>
    </section>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <Icon name="arrow" />
    </Link>
  );
}
