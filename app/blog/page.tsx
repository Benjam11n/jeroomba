import type { Metadata } from "next";
import { PostCard } from "@/components/blog/post-card";
import { PageShell } from "@/components/layout/page-shell";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Travel journals and adventures.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description: "Travel journals and adventures.",
    url: `${siteConfig.url}/blog`,
    type: "website",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <PageShell className="mt-20">
      <section className="space-y-12 mb-16">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-6xl sm:text-7xl font-serif text-foreground italic font-bold tracking-tight">
            Travel Journals
          </h1>
          <p className="text-lg text-muted-foreground pt-2 font-sans">
            Tales from around the globe.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </PageShell>
  );
}
