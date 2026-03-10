import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { HomePageAnimations } from "@/components/home/home-page-animations";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { getAllPosts, getFeaturedPosts } from "@/lib/posts";
import { ROUTES, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils/cn";

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
      rotate: -18,
      enterX: 220,
      enterY: 28,
      className:
        "absolute top-0 left-[-1%] md:left-[2%] lg:left-[3%] xl:left-0 w-36 md:w-56 aspect-[3/4] rotate-[-18deg]",
    },
    {
      alt: "Basque cheesecake illustration",
      src: "/hero/basque_cheesecake.jpeg",
      rotate: 15,
      enterX: -210,
      enterY: 24,
      className:
        "absolute top-[5%] right-[-1%] md:right-[2%] lg:right-[3%] xl:right-0 w-32 md:w-48 aspect-[3/4] rotate-[15deg]",
    },
    {
      alt: "Gyros illustration",
      src: "/hero/gyros.jpeg",
      rotate: -10,
      enterX: 170,
      enterY: -22,
      className:
        "absolute bottom-[0%] left-[-1%] md:left-[5%] lg:left-[12%] w-36 md:w-52 aspect-[4/3] rotate-[-10deg]",
    },
    {
      alt: "Meatballs illustration",
      src: "/hero/meatballs.jpeg",
      rotate: 8,
      enterX: -180,
      enterY: -26,
      className:
        "absolute bottom-[5%] right-[-1%] md:right-[5%] lg:right-[12%] w-40 md:w-60 aspect-[4/3] rotate-[8deg]",
    },
  ] as const;

  return (
    <HomePageAnimations>
      <div className="pb-24 pt-8 md:pt-16">
        <Container className="space-y-20 md:space-y-32">
          <section className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-visible py-20">
            {heroImages.map((image, index) => (
              <Magnetic
                key={image.src}
                aria-hidden="true"
                className={image.className}
                data-drift={index % 2 === 0 ? "-1" : "1"}
                data-enter-x={image.enterX}
                data-enter-y={image.enterY}
                data-hero-frame
                data-rotate={image.rotate}
                innerClassName="h-full"
                maxOffset={10}
                strength={0.1}
              >
                <div className="h-full rounded-xl border border-border/30 bg-muted/40 p-2 shadow-lg">
                  <div className="relative h-full w-full overflow-hidden rounded-lg bg-muted/80">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 240px, (min-width: 768px) 224px, 160px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Magnetic>
            ))}

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center space-y-4 text-center">
              <Magnetic
                data-hero-after-title
                className="mb-2 inline-block"
                maxOffset={8}
                strength={0.12}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/90 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
                  <span className="size-2 rounded-full bg-primary" />
                  Places That Stay
                </div>
              </Magnetic>

              <h1 className="pb-2 font-serif text-6xl leading-[1.1] font-light tracking-tight text-foreground italic sm:text-7xl lg:text-8xl">
                <span data-hero-title-line="first" className="block">
                  Bites &
                </span>
                <span data-hero-title-line="second" className="block">
                  Borders
                </span>
              </h1>

              <p
                data-hero-after-title
                className="pt-2 text-lg text-muted-foreground sm:text-xl"
              >
                A running archive of journeys, observations, and return trips.
              </p>

              <div
                data-hero-after-title
                className="flex flex-col justify-center gap-4 pt-8 sm:flex-row"
              >
                <Magnetic
                  className="inline-block"
                  maxOffset={12}
                  strength={0.16}
                >
                  <Link
                    href={ROUTES.blog}
                    className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-lg font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Read Stories <ArrowUpRight className="ml-2 size-5" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </section>

          <section data-section="recent" className="space-y-12">
            <div
              data-reveal="section-intro"
              className="flex flex-col items-center space-y-4 text-center"
            >
              <h2 className="text-5xl sm:text-7xl font-serif text-foreground italic font-light tracking-tight">
                Recent Journeys
              </h2>
              <p className="text-lg text-muted-foreground pt-2">
                Tales from around the globe.
              </p>
            </div>

            <div
              data-reveal-group="posts"
              className="grid gap-6 lg:grid-cols-2"
            >
              {featuredPosts.map((post) => (
                <div key={post.slug} data-reveal="post-card">
                  <PostCard post={post} />
                </div>
              ))}
            </div>

            <div data-reveal="section-cta" className="flex justify-center pt-8">
              <Magnetic className="inline-block" maxOffset={10} strength={0.14}>
                <Link
                  href={ROUTES.blog}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "rounded-full border-muted-foreground/30 bg-transparent px-8 transition-colors hover:border-foreground",
                  )}
                >
                  Browse all {allPosts.length} posts
                </Link>
              </Magnetic>
            </div>
          </section>
        </Container>
      </div>
    </HomePageAnimations>
  );
}
