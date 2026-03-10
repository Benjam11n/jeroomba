import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache } from "react";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { mdxComponents } from "@/components/blog/mdx-components";

const postsDirectory = path.join(process.cwd(), "content/blog");
const dateOnlyPattern = /^\d{4}-\d{2}-\d{2}$/;

function parseUtcDateString(input: string) {
  if (!dateOnlyPattern.test(input)) {
    return null;
  }

  const [year, month, day] = input.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}

const postFrontmatterSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().min(1, "Description is required"),
  date: z
    .string()
    .regex(dateOnlyPattern, "Date must use YYYY-MM-DD format")
    .refine((value) => parseUtcDateString(value) !== null, {
      message: "Date must be a valid calendar date",
    }),
  tags: z.array(z.string().trim().min(1, "Tags cannot be empty")),
  coverImage: z.string().trim().min(1, "Cover image cannot be empty").optional(),
  coverImageAlt: z
    .string()
    .trim()
    .min(1, "Cover image alt text cannot be empty")
    .optional(),
  featured: z.boolean(),
  published: z.boolean(),
});

type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

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

type PostPageData = PostSummary & {
  content: React.ReactNode;
};

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

function getPostPath(slug: string) {
  return path.join(postsDirectory, `${slug}.mdx`);
}

function isErrorWithCode(error: unknown): error is NodeJS.ErrnoException {
  return error instanceof Error && "code" in error;
}

async function readPostSource(slug: string) {
  const fullPath = getPostPath(slug);

  try {
    return await fs.readFile(fullPath, "utf8");
  } catch (error) {
    if (isErrorWithCode(error) && error.code === "ENOENT") {
      return null;
    }

    throw new Error(`Failed to read post source at ${fullPath}`, {
      cause: error instanceof Error ? error : undefined,
    });
  }
}

function toSummary(slug: string, source: string): PostSummary {
  const { data, content } = matter(source);
  const filePath = getPostPath(slug);
  const parsedFrontmatter = postFrontmatterSchema.safeParse(data);

  if (!parsedFrontmatter.success) {
    const issues = parsedFrontmatter.error.issues
      .map((issue) => {
        const fieldPath =
          issue.path.length > 0 ? issue.path.join(".") : "frontmatter";
        return `${fieldPath}: ${issue.message}`;
      })
      .join("; ");

    throw new Error(
      `Invalid frontmatter for post "${slug}" at ${filePath}: ${issues}`,
    );
  }

  const frontmatter = parsedFrontmatter.data;

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
      const leftDate = parseUtcDateString(left.date);
      const rightDate = parseUtcDateString(right.date);

      if (!leftDate || !rightDate) {
        throw new Error("Post dates must be validated before sorting");
      }

      return rightDate.getTime() - leftDate.getTime();
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
