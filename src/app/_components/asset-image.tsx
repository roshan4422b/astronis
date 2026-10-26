import NextImage, { type ImageProps } from "next/image";

/** Encode each local filename before Next.js builds its image-optimizer URL. */
export default function AssetImage({
  src,
  ...props
}: Omit<ImageProps, "src"> & { src: string }) {
  if (/^https?:\/\//i.test(src)) {
    return <NextImage {...props} src={src} unoptimized />;
  }
  const encodedSrc = src
    .split("/")
    .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
    .join("/");
  return <NextImage {...props} src={encodedSrc} />;
}
