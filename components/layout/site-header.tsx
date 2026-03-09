import Link from "next/link";
import { Container } from "@/components/layout/container";

export function SiteHeader() {
  return (
    <header className="absolute top-0 w-full z-40 bg-transparent">
      <Container className="flex h-24 items-center justify-between gap-4 font-sans text-sm font-medium text-foreground">
        <div className="flex-1 flex justify-end pr-8 md:pr-12">
          <Link
            href="/"
            className="transition-colors text-muted-foreground/80 hover:text-foreground"
          >
            Home
          </Link>
        </div>

        <Link
          href="/"
          className="font-serif text-3xl sm:text-4xl font-bold italic text-primary shrink-0 tracking-tight text-center"
        >
          Jeroomba
        </Link>

        <div className="flex-1 flex justify-start pl-8 md:pl-12">
          <Link
            href="/blog"
            className="transition-colors text-muted-foreground/80 hover:text-foreground"
          >
            Blog
          </Link>
        </div>
      </Container>
    </header>
  );
}
