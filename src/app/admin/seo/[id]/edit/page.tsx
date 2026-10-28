import SeoEditor from "../../../_components/seo-editor";

export const metadata = { title: "Edit SEO" };

export default async function EditSeoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SeoEditor recordId={id} />;
}
