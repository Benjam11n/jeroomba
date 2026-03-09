import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxImage } from "@/components/blog/mdx-image";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { ROUTES, siteConfig } from "@/lib/site";
import { cn, formatDate } from "@/lib/utils";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const socialImage = post.coverImage
    ? {
        url: `${siteConfig.url}${post.coverImage}`,
        alt: post.coverImageAlt ?? post.title,
      }
    : undefined;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: ROUTES.blogPost(post.slug),
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}${ROUTES.blogPost(post.slug)}`,
      type: "article",
      publishedTime: post.date,
      images: socialImage ? [socialImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: socialImage ? [socialImage.url] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container className="pb-24 pt-12">
      <article className="mx-auto max-w-3xl">
        <Link
          href={ROUTES.blog}
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ArrowLeft className="size-4" />
          Back to blog
        </Link>

        <header className="mt-8 rounded-[2rem] border border-border/60 bg-card/85 p-8 sm:p-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{formatDate(post.date)}</span>
            <span className="text-border">/</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-4 font-serif text-5xl leading-tight text-balance">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {post.coverImage ? (
          <MdxImage
            alt={post.coverImageAlt ?? post.title}
            className="aspect-[16/10] object-cover"
            loading="eager"
            src={post.coverImage}
          />
        ) : null}

        <div
          className={cn(
            "rounded-[2rem] border border-border/60 bg-card/70 p-8 sm:p-10",
            post.coverImage ? "mt-0" : "mt-10",
          )}
        >
          <div className="prose prose-neutral max-w-none text-base prose-headings:font-serif prose-headings:text-foreground prose-p:leading-8 prose-p:text-foreground/85 prose-a:text-accent prose-a:no-underline hover:prose-a:text-foreground prose-strong:text-foreground prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.9em] prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border/80 prose-pre:bg-[#03245c] prose-pre:text-[#f8f7f4] prose-li:marker:text-accent [&_pre_code]:bg-transparent [&_pre_code]:px-0 [&_pre_code]:py-0 [&_pre_code]:text-inherit">
            {post.content}
          </div>
        </div>
      </article>
    </Container>
  );
}
