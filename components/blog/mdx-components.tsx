import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { MdxImage } from "@/components/blog/mdx-image";

export const mdxComponents: MDXComponents = {
  a: ({ href = "", ...props }) => {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return <a href={href} rel="noreferrer" target="_blank" {...props} />;
    }

    return <Link href={href} {...props} />;
  },
  img: MdxImage,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
