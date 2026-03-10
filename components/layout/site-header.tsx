import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Magnetic } from "@/components/ui/magnetic";
import { ROUTES } from "@/lib/site";

const navLinkClassName =
  "relative inline-block text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:text-foreground after:absolute after:-bottom-1 after:left-1/2 after:h-px after:w-full after:-translate-x-1/2 after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100";

export function SiteHeader() {
  return (
    <header className="absolute top-0 z-40 w-full bg-transparent">
      <Container className="flex h-24 items-center justify-between gap-4 font-sans text-sm font-medium text-foreground">
        <div className="flex flex-1 justify-end pr-8 md:pr-12">
          <Magnetic className="inline-block" maxOffset={8} strength={0.12}>
            <Link href={ROUTES.home} className={navLinkClassName}>
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

        <div className="flex flex-1 justify-start pl-8 md:pl-12">
          <Magnetic className="inline-block" maxOffset={8} strength={0.12}>
            <Link href={ROUTES.blog} className={navLinkClassName}>
              Blog
            </Link>
          </Magnetic>
        </div>
      </Container>
    </header>
  );
}
