import Link from "next/link";
import { services } from "@/data/services";
import {
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
    ["Technology & Digital Solutions", "/technology-and-digital-solutions"],
    ["Digital Business Solutions", "/technology-and-digital-solutions/digital-business-solutions"],
    ["RegTech & Compliance Technology", "/technology-and-digital-solutions/regtech-and-compliance-technology"],
    ["Legal Technology", "/technology-and-digital-solutions/legal-technology"],
    ["Data, AI & Automation", "/technology-and-digital-solutions/data-ai-and-automation"],
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
    ...services.flatMap(service => [
      [service.title, `/services/${service.canonicalSlug}`],
      ...service.subServices.flatMap(group => {
        const groupPath = `/services/${service.canonicalSlug}/${group.slug}`;
        return group.children.map(child => [child, group.childRoutes?.[child] || `${groupPath}/${slugify(child)}`]);
      }),
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
