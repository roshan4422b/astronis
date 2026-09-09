import ResourceDirectory from "../_components/resource-directory";
import { siteMenu } from "@/content/site";
export default function Media() {
  return (
    <ResourceDirectory
      title="Explore Media"
      items={siteMenu.media}
      base="/media"
    />
  );
}
