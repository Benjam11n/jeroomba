import fs from "node:fs/promises";
import path from "node:path";
import type { CSSProperties } from "react";
import Image from "next/image";
import { imageSize } from "image-size";
import { cn } from "@/lib/utils/cn";

type MdxImageProps = {
  alt?: string;
  className?: string;
  height?: number | string;
  loading?: "eager" | "lazy";
  src?: string;
  style?: CSSProperties;
  title?: string;
  width?: number | string;
};

const publicDirectory = path.join(process.cwd(), "public");
const blogImageSizes =
  "(min-width: 1024px) 768px, (min-width: 640px) calc(100vw - 5rem), calc(100vw - 4rem)";

function parseDimension(value?: number | string) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsedValue = Number.parseInt(value, 10);

    if (Number.isFinite(parsedValue)) {
      return parsedValue;
    }
  }

  return undefined;
}

function resolvePublicFile(src: string) {
  if (!src.startsWith("/") || src.startsWith("//")) {
    return null;
  }

  const pathname = src.split(/[?#]/, 1)[0];

  if (!pathname) {
    return null;
  }

  const resolvedPath = path.resolve(
    publicDirectory,
    `.${decodeURIComponent(pathname)}`,
  );

  if (
    resolvedPath !== publicDirectory &&
    !resolvedPath.startsWith(`${publicDirectory}${path.sep}`)
  ) {
    return null;
  }

  return resolvedPath;
}

async function inferImageDimensions(src: string) {
  const filePath = resolvePublicFile(src);

  if (!filePath) {
    return null;
  }

  try {
    const imageBuffer = await fs.readFile(filePath);
    const { width, height } = imageSize(imageBuffer);

    if (!width || !height) {
      return null;
    }

    return { width, height };
  } catch {
    return null;
  }
}

function createRenderedImageStyle(
  explicitWidth?: number,
  style?: CSSProperties,
): CSSProperties | undefined {
  if (!explicitWidth && !style) {
    return undefined;
  }

  return {
    ...(explicitWidth ? { maxWidth: `${explicitWidth}px`, width: "100%" } : {}),
    ...style,
  };
}

export async function MdxImage({
  alt = "",
  className,
  height,
  loading,
  src,
  style,
  title,
  width,
}: MdxImageProps) {
  if (!src) {
    return null;
  }

  const explicitWidth = parseDimension(width);
  const explicitHeight = parseDimension(height);
  const resolvedDimensions =
    explicitWidth && explicitHeight
      ? { width: explicitWidth, height: explicitHeight }
      : await inferImageDimensions(src);
  const renderedStyle = createRenderedImageStyle(explicitWidth, style);

  const imageClassName = cn(
    "h-auto rounded-[1.5rem] border border-border/60 bg-muted/30 object-cover shadow-sm",
    explicitWidth ? "max-w-full" : "w-full",
    className,
  );
  const caption = title?.trim();

  return (
    <figure className="not-prose my-10">
      {resolvedDimensions ? (
        <Image
          alt={alt}
          className={imageClassName}
          height={resolvedDimensions.height}
          loading={loading}
          sizes={blogImageSizes}
          src={src}
          style={renderedStyle}
          title={title}
          width={resolvedDimensions.width}
        />
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          alt={alt}
          className={imageClassName}
          height={explicitHeight}
          // External URLs and unknown dimensions fall back to a plain image.
          // Local public assets still use next/image with inferred dimensions.
          loading={loading}
          src={src}
          style={renderedStyle}
          title={title}
          width={explicitWidth}
        />
      )}
      {caption ? (
        <figcaption className="mt-3 text-center text-sm leading-6 text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
