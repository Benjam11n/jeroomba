import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/mdx-components";

const postsDirectory = path.join(process.cwd(), "content/blog");

type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured: boolean;
  published: boolean;
};

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  featured: boolean;
  published: boolean;
  readingTime: string;
  excerpt: string;
};

export type PostPageData = PostSummary & {
  content: React.ReactNode;
};

function normalizeFrontmatter(
  frontmatter: Partial<PostFrontmatter>,
): PostFrontmatter {
  return {
    title: frontmatter.title ?? "Untitled post",
    description: frontmatter.description ?? "",
    date: frontmatter.date ?? new Date().toISOString(),
    tags: frontmatter.tags ?? [],
    featured: frontmatter.featured ?? false,
    published: frontmatter.published ?? true,
  };
}

function createExcerpt(content: string) {
  return content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_`-]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 170);
}

async function getPostFiles() {
  const entries = await fs.readdir(postsDirectory);
  return entries.filter((entry) => entry.endsWith(".mdx"));
}

async function readPostSource(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    return await fs.readFile(fullPath, "utf8");
  } catch {
    return null;
  }
}

function toSummary(slug: string, source: string): PostSummary {
  const { data, content } = matter(source);
  const frontmatter = normalizeFrontmatter(data as Partial<PostFrontmatter>);

  return {
    slug,
    ...frontmatter,
    readingTime: readingTime(content).text,
    excerpt: createExcerpt(content),
  };
}

export const getAllPosts = cache(async (): Promise<PostSummary[]> => {
  const files = await getPostFiles();
  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const source = await readPostSource(slug);

      if (!source) {
        return null;
      }

      return toSummary(slug, source);
    }),
  );

  return posts
    .filter((post): post is PostSummary => Boolean(post?.published))
    .sort((left, right) => {
      return new Date(right.date).getTime() - new Date(left.date).getTime();
    });
});

export const getFeaturedPosts = cache(
  async (limit = 2): Promise<PostSummary[]> => {
    const posts = await getAllPosts();
    return posts.filter((post) => post.featured).slice(0, limit);
  },
);

export const getPostBySlug = cache(
  async (slug: string): Promise<PostPageData | null> => {
    const source = await readPostSource(slug);

    if (!source) {
      return null;
    }

    const summary = toSummary(slug, source);

    if (!summary.published) {
      return null;
    }

    const { content } = await compileMDX<PostFrontmatter>({
      source,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
      components: mdxComponents,
    });

    return {
      ...summary,
      content,
    };
  },
);
