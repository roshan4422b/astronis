import type { Metadata } from "next";
import ArticlesAndResources from "../../articles-and-resources";

export const metadata: Metadata = {
  title: "All Articles & Resources",
  description:
    "Browse articles, analysis and practical business resources from Astronis Global.",
  alternates: {
    canonical: "/insights/articles-and-resources/all",
  },
};

export default function AllArticlesAndResourcesPage() {
  return <ArticlesAndResources />;
}
