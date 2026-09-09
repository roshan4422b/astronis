import ResourceDirectory from "../_components/resource-directory";
import { siteMenu } from "@/content/site";
export default function Tools() {
  return (
    <ResourceDirectory
      title="Explore Business Tools"
      items={siteMenu.businessTools}
      base="/business-tools"
    />
  );
}
