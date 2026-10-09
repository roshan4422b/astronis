import ResourceDirectory from "../_components/resource-directory";
import { siteMenu } from "@/content/site";
export default function Resources() {
  return (
    <>
      <ResourceDirectory
        title="Browse by Content Type"
        items={siteMenu.insights}
        base="/insights"
      />
      <ResourceDirectory
        title="Knowledge Tools"
        items={siteMenu.knowledgeTools}
        base="/knowledge-centre"
      />
    </>
  );
}
