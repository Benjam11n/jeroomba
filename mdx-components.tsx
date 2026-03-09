import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  a: ({ href = "", ...props }) => {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return <a href={href} rel="noreferrer" target="_blank" {...props} />;
    }

    return <Link href={href} {...props} />;
  },
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
