import AdminInsightForm from "../../../_components/admin-insight-form";

export const metadata = { title: "Edit Insight" };

export default async function EditInsightPage({ params }: PageProps<"/admin/insights/[id]/edit">) {
  const { id } = await params;
  return <AdminInsightForm insightId={id} />;
}
