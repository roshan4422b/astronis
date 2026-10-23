import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { professionals } from "../leadership";
import ProfessionalCollaboration from "../professional-collaboration";
import ProfessionalProfileTemplate from "./profile-template";

export function generateStaticParams() {
  return [...professionals.map((person) => ({ slug: person.slug })), { slug: "partner-with-us" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "partner-with-us") return { title: "Professional Collaboration", description: "Explore professional collaboration, strategic partnerships and international professional networks with Astronis Global." };
  const person = professionals.find((record) => record.slug === slug);
  return person ? { title: person.name, description: person.description } : { title: "Professional Profile" };
}

export default async function Profile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "partner-with-us") return <ProfessionalCollaboration />;
  const person = professionals.find((record) => record.slug === slug);
  if (!person) notFound();
  return <ProfessionalProfileTemplate person={person} />;
}
