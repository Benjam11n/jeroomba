import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Magnetic } from "@/components/ui/magnetic";
import { ROUTES } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="absolute top-0 w-full z-40 bg-transparent">
      <Container className="flex h-24 items-center justify-between gap-4 font-sans text-sm font-medium text-foreground">
        <div className="flex-1 flex justify-end pr-8 md:pr-12">
          <Magnetic className="inline-block" maxOffset={8} strength={0.12}>
            <Link
              href={ROUTES.home}
              className="transition-colors text-muted-foreground/80 hover:text-foreground"
            >
              Home
            </Link>
          </Magnetic>
        </div>

        <Magnetic className="inline-block" maxOffset={10} strength={0.12}>
          <Link
            href={ROUTES.home}
            className="shrink-0 text-center font-serif text-3xl font-bold tracking-tight text-primary italic sm:text-4xl"
          >
            Jeroomba
          </Link>
        </Magnetic>

        <div className="flex-1 flex justify-start pl-8 md:pl-12">
          <Magnetic className="inline-block" maxOffset={8} strength={0.12}>
            <Link
              href={ROUTES.blog}
              className="transition-colors text-muted-foreground/80 hover:text-foreground"
            >
              Blog
            </Link>
          </Magnetic>
        </div>
      </Container>
    </header>
  );
}
