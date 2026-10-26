import Link from "next/link";
import { Banner, Button } from "./ui";

export type CmsPageRecord = {
  slug: string;
  data: Record<string, unknown>;
};

export default function CmsContentPage({ record, eyebrow }: { record: CmsPageRecord; eyebrow: string }) {
  const title = String(record.data.title || "Page");
  const description = String(record.data.description || "");
  const content = String(record.data.content || "");
  const image = typeof record.data.featuredImage === "string" && record.data.featuredImage ? record.data.featuredImage : undefined;
  return <>
    <Banner title={title} text={description} image={image} eyebrow={eyebrow} />
    <article className="section"><div className="container narrow">
      {content ? <div style={{ whiteSpace: "pre-wrap" }}>{content}</div> : null}
      <p><Link href="/">Return to Home</Link></p>
      <Button href="/contact">Discuss Your Requirements</Button>
    </div></article>
  </>;
}
