import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { professionals, type ProfessionalRecord } from "../leadership";
import ProfessionalCollaboration from "../professional-collaboration";
import ProfessionalProfileTemplate from "./profile-template";
import { getPublishedContent, getPublishedContentMetadata, getUnpublishedSourceContentSlugs } from "@/lib/supabase/server";
export const dynamic = "force-dynamic";

function textField(data: Record<string, unknown>, key: string, fallback = "") {
  const value = data[key];
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function phoneNumbers(data: Record<string, unknown>, fallback: string[]) {
  const value = data.phones;
  if (Array.isArray(value)) {
    const phones = value.filter((phone): phone is string => typeof phone === "string" && Boolean(phone.trim()));
    if (phones.length) return phones;
  }
  if (typeof data.phone === "string" && data.phone.trim()) {
    return data.phone.split(/[;,]/).map((phone) => phone.trim()).filter(Boolean);
  }
  return fallback;
}

function toProfessionalRecord(
  slug: string,
  data: Record<string, unknown>,
  source?: ProfessionalRecord,
): ProfessionalRecord {
  return {
    name: textField(data, "title", source?.name || slug),
    slug,
    image: textField(data, "featuredImage", textField(data, "image", source?.image)),
    code: textField(data, "code", source?.code),
    hierarchy: textField(data, "hierarchy", source?.hierarchy),
    role: textField(data, "designation", source?.role || "Professional"),
    location: textField(data, "location", textField(data, "jurisdiction", source?.location)),
    phones: phoneNumbers(data, source?.phones ?? []),
    email: textField(data, "email", source?.email),
    linkedinProfile: textField(data, "linkedinProfile", source?.linkedinProfile),
    expertise: textField(data, "expertise", source?.expertise),
    description: textField(data, "content", textField(data, "description", source?.description)),
    education: textField(data, "education", source?.education),
    enrolment: textField(data, "enrolment", source?.enrolment),
  };
}

export function generateStaticParams() {
  return [...professionals.map((person) => ({ slug: person.slug })), { slug: "partner-with-us" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cmsPerson = (await getPublishedContent("professionals")).find((item) => item.slug === slug);
  if (cmsPerson) return getPublishedContentMetadata(cmsPerson, `/professionals/${cmsPerson.slug}`);
  const person = professionals.find((p) => p.slug === slug);
  return { title: slug === "partner-with-us" ? "Professional Collaboration" : person?.name, description: person ? `Learn about ${person.name} at Astronis Global.` : "Explore professional collaboration, strategic partnerships and international professional networks with Astronis Global." };
}
export default async function Profile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [publishedPeople, suppressedSlugs] = await Promise.all([
    getPublishedContent("professionals"),
    getUnpublishedSourceContentSlugs("professionals"),
  ]);
  const cmsPerson = publishedPeople.find((item) => item.slug === slug);
  if (cmsPerson) {
    const sourcePerson = professionals.find((person) => person.slug === slug);
    return <ProfessionalProfileTemplate person={toProfessionalRecord(slug, cmsPerson.data, sourcePerson)} />;
  }
  if (slug === "partner-with-us") return <ProfessionalCollaboration />;
  if (suppressedSlugs.has(slug)) notFound();
  const person = professionals.find((record) => record.slug === slug);
  if (!person) notFound();
  return <ProfessionalProfileTemplate person={person} />;
}
