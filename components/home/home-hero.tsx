"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkle, Zap } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type HomeHeroProps = {
  postCount: number;
  projectCount: number;
};

const stats = [
  {
    label: "Stack",
    value: "Next + MDX",
  },
  {
    label: "Hosting",
    value: "Vercel Hobby",
  },
  {
    label: "Motion",
    value: "Subtle by default",
  },
];

export function HomeHero({ postCount, projectCount }: HomeHeroProps) {
  return (
    <section className="grain overflow-hidden rounded-[2.5rem] border border-border/60 bg-card/85 px-6 py-8 shadow-[0_28px_120px_-60px_rgba(15,23,42,0.45)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(19rem,0.8fr)] lg:items-end">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/75 px-4 py-2 text-xs uppercase tracking-[0.25em] text-muted-foreground"
          >
            <Sparkle className="size-3.5 text-accent" />
            Personal site starter
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="mt-6 max-w-4xl font-serif text-5xl leading-[0.96] text-balance sm:text-6xl lg:text-7xl"
          >
            A modern portfolio and blog built to age well.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16, ease: "easeOut" }}
            className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg"
          >
            Server components handle the structure, MDX keeps publishing local
            to the repo, and Motion adds just enough movement to make the
            interface feel intentional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24, ease: "easeOut" }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/blog" className={buttonVariants({ size: "lg" })}>
              Read the blog
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/projects"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Explore projects
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: "easeOut" }}
          className="grid gap-4"
        >
          <div className="rounded-[2rem] border border-border/70 bg-background/80 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Inventory
                </p>
                <p className="mt-4 font-serif text-4xl">
                  {postCount + projectCount}
                </p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                <Zap className="size-5" />
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {postCount} published posts and {projectCount} project slots are
              already wired into the starter.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.45,
                  delay: 0.28 + index * 0.08,
                  ease: "easeOut",
                }}
                className="rounded-[1.5rem] border border-border/70 bg-background/70 p-4"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
