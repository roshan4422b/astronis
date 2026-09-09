import ResourceDirectory from "../_components/resource-directory";
import { siteMenu } from "@/content/site";
export default function Resources() {
  return (
    <ResourceDirectory
      title="Resource Library"
      items={siteMenu.resources}
      base="/resources"
    />
  );
}
