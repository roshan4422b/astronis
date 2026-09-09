import NextImage, { type ImageProps } from "next/image";

/** Encode each local filename before Next.js builds its image-optimizer URL. */
export default function AssetImage({
  src,
  ...props
}: Omit<ImageProps, "src"> & { src: string }) {
  const encodedSrc = src
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return <NextImage {...props} src={encodedSrc} />;
}
