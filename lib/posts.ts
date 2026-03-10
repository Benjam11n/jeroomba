import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/mdx-components";
import { isValidDate } from "@/lib/utils/date";
import { createExcerpt } from "@/lib/utils/text";

const postsDirectory = path.join(process.cwd(), "content/blog");

type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  coverImageAlt?: string;
  featured: boolean;
  published: boolean;
};

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  coverImageAlt?: string;
  featured: boolean;
  published: boolean;
  readingTime: string;
  excerpt: string;
};

export type PostPageData = PostSummary & {
  content: React.ReactNode;
};

function parseStringField(
  value: unknown,
  fieldName: keyof PostFrontmatter,
  slug: string,
) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(
      `Invalid frontmatter in content/blog/${slug}.mdx: \`${fieldName}\` must be a non-empty string`,
    );
  }

  return value.trim();
}

function parseBooleanField(
  value: unknown,
  fieldName: keyof PostFrontmatter,
  slug: string,
) {
  if (typeof value !== "boolean") {
    throw new Error(
      `Invalid frontmatter in content/blog/${slug}.mdx: \`${fieldName}\` must be a boolean`,
    );
  }

  return value;
}

function parseStringArrayField(
  value: unknown,
  fieldName: "tags",
  slug: string,
) {
  if (!Array.isArray(value)) {
    throw new Error(
      `Invalid frontmatter in content/blog/${slug}.mdx: \`${fieldName}\` must be an array of strings`,
    );
  }

  const tags = value.map((tag, index) => {
    if (typeof tag !== "string" || tag.trim().length === 0) {
      throw new Error(
        `Invalid frontmatter in content/blog/${slug}.mdx: \`${fieldName}[${index}]\` must be a non-empty string`,
      );
    }

    return tag.trim();
  });

  return tags;
}

function parseOptionalStringField(
  value: unknown,
  fieldName: "coverImage" | "coverImageAlt",
  slug: string,
) {
  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(
      `Invalid frontmatter in content/blog/${slug}.mdx: \`${fieldName}\` must be a non-empty string when provided`,
    );
  }

  return value.trim();
}

function parseFrontmatter(
  slug: string,
  data: Record<string, unknown>,
): PostFrontmatter {
  const title = parseStringField(data.title, "title", slug);
  const description = parseStringField(data.description, "description", slug);
  const date = parseStringField(data.date, "date", slug);

  if (!isValidDate(date)) {
    throw new Error(
      `Invalid frontmatter in content/blog/${slug}.mdx: \`date\` must be a valid date string`,
    );
  }

  return {
    title,
    description,
    date,
    tags: parseStringArrayField(data.tags, "tags", slug),
    coverImage: parseOptionalStringField(data.coverImage, "coverImage", slug),
    coverImageAlt: parseOptionalStringField(
      data.coverImageAlt,
      "coverImageAlt",
      slug,
    ),
    featured: parseBooleanField(data.featured, "featured", slug),
    published: parseBooleanField(data.published, "published", slug),
  };
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
  const parsedMatter = matter(source);
  const frontmatter = parseFrontmatter(
    slug,
    parsedMatter.data as Record<string, unknown>,
  );

  return {
    slug,
    ...frontmatter,
    readingTime: readingTime(parsedMatter.content).text,
    excerpt: createExcerpt(parsedMatter.content),
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
