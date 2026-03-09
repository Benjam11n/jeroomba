import Link from "next/link";
import { Magnetic } from "@/components/ui/magnetic";
import type { PostSummary } from "@/lib/posts";
import { ROUTES } from "@/lib/site";

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Magnetic
      className="block h-full"
      innerClassName="h-full"
      maxOffset={14}
      strength={0.12}
    >
      <article className="group relative flex h-full flex-col rounded-[2rem] bg-muted/40 p-4 transition-all hover:bg-muted/60">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] bg-muted">
          {/* Dummy image representation */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted-foreground/20 to-muted-foreground/10 font-medium tracking-wide text-muted-foreground/50">
            Article Image
          </div>
        </div>

        <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
          <h3 className="text-3xl font-medium tracking-tight text-foreground">
            {post.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90">
            {post.description}
          </p>
        </div>
        <Link href={ROUTES.blogPost(post.slug)} className="absolute inset-0">
          <span className="sr-only">Read {post.title}</span>
        </Link>
      </article>
    </Magnetic>
  );
}
