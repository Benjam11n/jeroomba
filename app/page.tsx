import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { getAllPosts, getFeaturedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Home",
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const [allPosts, featuredPosts] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(4),
  ]);

  const heroImages = [
    {
      alt: "Illustration of Santorini architecture",
      src: "/hero/santorini.jpeg",
      className:
        "absolute top-0 left-[-1%] md:left-[2%] lg:left-[7%] w-40 md:w-56 aspect-[3/4] rotate-[-18deg]",
    },
    {
      alt: "Basque cheesecake illustration",
      src: "/hero/basque_cheesecake.jpeg",
      className:
        "absolute top-[5%] right-[-1%] md:right-[2%] lg:right-[7%] w-36 md:w-48 aspect-[3/4] rotate-[15deg]",
    },
    {
      alt: "Gyros illustration",
      src: "/hero/gyros.jpeg",
      className:
        "absolute bottom-[0%] left-[-1%] md:left-[5%] lg:left-[12%] w-40 md:w-52 aspect-[4/3] rotate-[-10deg]",
    },
    {
      alt: "Meatballs illustration",
      src: "/hero/meatballs.jpeg",
      className:
        "absolute bottom-[5%] right-[-1%] md:right-[5%] lg:right-[12%] w-44 md:w-60 aspect-[4/3] rotate-[8deg]",
    },
  ] as const;

  return (
    <div className="pb-24 pt-8 md:pt-16">
      <Container className="space-y-20 md:space-y-32">
        <section className="relative flex flex-col items-center justify-center min-h-[70vh] py-20 overflow-visible">
          {heroImages.map((image) => (
            <div
              key={image.src}
              className={cn(
                image.className,
                "pointer-events-none rounded-xl border border-border/30 bg-muted/40 p-2 shadow-lg transition-transform hover:scale-105",
              )}
            >
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-muted/80">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 240px, (min-width: 768px) 224px, 176px"
                  className="object-cover"
                />
              </div>
            </div>
          ))}

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/90 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
              <span className="size-2 rounded-full bg-primary" />
              Places That Stay
            </div>

            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif text-foreground italic leading-[1.1] tracking-tight pb-2 font-light">
              Bites &<br />
              Borders
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground pt-2">
              A running archive of journeys, observations, and return trips.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium transition-colors"
              >
                Read Stories <ArrowUpRight className="ml-2 size-5" />
              </Link>
            </div>
          </div>
        </section>

        <section className="space-y-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-6xl sm:text-7xl font-serif text-foreground italic font-light tracking-tight">
              Recent Journeys
            </h2>
            <p className="text-lg text-muted-foreground pt-2">
              Tales from around the globe.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          <div className="flex justify-center pt-8">
            <Link
              href="/blog"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full px-8 bg-transparent border-muted-foreground/30 hover:border-foreground transition-colors",
              )}
            >
              Browse all {allPosts.length} posts
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
