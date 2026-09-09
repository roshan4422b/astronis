import Link from "next/link";
import {
  serviceGroups,
  industries,
  slugify,
  countries,
  siteMenu,
} from "@/content/site";
import { Banner } from "../_components/ui";
export const metadata = { title: "Sitemap" };
export default function SitemapPage() {
  const links = [
    ["Home", "/"],
    ["Our Clients", "/clients"],
    ["About Us", "/about"],
    ["Services", "/services"],
    ["Industries", "/industries"],
    ["Professionals", "/professionals"],
    ["Insights", "/insights"],
    ["Global Presence", "/global-presence"],
    ["Contact Us", "/contact"],
    ["Resources", "/resources"],
    ["Media", "/media"],
    ["Knowledge Centre", "/knowledge-centre"],
    ["Business Tools", "/business-tools"],
    ["Client Portal", "/client-portal"],
    ["Testimonials", "/testimonials"],
    ["Success Stories", "/success-stories"],
    ["FAQs", "/faqs"],
    ...serviceGroups.flatMap((g) => [
      [g.title, "/services/" + g.slug],
      ...g.items.map((i) => [i, "/services/" + g.slug + "/" + slugify(i)]),
    ]),
    ...industries.map((i) => [i.title, "/industries/" + i.slug]),
    ...countries.map((c) => [c, "/global-presence/" + slugify(c)]),
    ...siteMenu.about.map((t) => [t, "/about/" + slugify(t)]),
  ];
  return (
    <>
      <Banner title="Sitemap" text="Find your way around Astronis Global." />
      <section className="section">
        <div className="container sitemap-links">
          {links.map(([title, href]) => (
            <Link key={href} href={href}>
              {title}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
