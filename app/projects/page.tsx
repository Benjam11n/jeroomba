import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { projects, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work, experiments, and case-study placeholders.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects | ${siteConfig.name}`,
    description: "Selected work, experiments, and case-study placeholders.",
    url: `${siteConfig.url}/projects`,
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <Container className="pb-24 pt-12">
      <section className="rounded-[2rem] border border-border/60 bg-card/80 p-8 sm:p-10">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Projects
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-tight text-balance">
          A clean case-study surface for product, engineering, and experiments.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
          The cards below are starter content. Replace them with real work and
          keep each entry focused on context, constraints, and outcomes.
        </p>
      </section>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="grain overflow-hidden rounded-[2rem] border border-border/60 bg-card/80 p-7"
          >
            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    {project.status}
                  </p>
                  <h2 className="mt-4 font-serif text-4xl text-balance">
                    {project.title}
                  </h2>
                </div>
                <span className="rounded-full border border-border/70 px-3 py-1 text-xs text-muted-foreground">
                  {project.year}
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {project.href ? (
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "mt-8",
                  )}
                >
                  Open link
                  <ArrowUpRight className="size-4" />
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Container>
  );
}
