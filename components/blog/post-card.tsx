import Link from "next/link";
import type { PostSummary } from "@/lib/posts";

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group relative flex flex-col rounded-[2rem] bg-muted/40 p-4 transition-all hover:bg-muted/60">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-muted">
        {/* Dummy image representation */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/10 flex items-center justify-center text-muted-foreground/50 font-medium tracking-wide">
          Article Image
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-6 px-2 pb-2">
        <h3 className="text-3xl font-medium text-foreground tracking-tight">
          {post.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90">
          {post.description}
        </p>


      </div>
      <Link href={`/blog/${post.slug}`} className="absolute inset-0">
        <span className="sr-only">Read {post.title}</span>
      </Link>
    </article>
  );
}
