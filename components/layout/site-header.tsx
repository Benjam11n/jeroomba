import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Magnetic } from "@/components/ui/magnetic";
import { siteNavLinkClassName } from "@/lib/constants";
import { ROUTES } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="absolute top-0 z-40 w-full bg-transparent">
      <Container className="flex h-24 items-center justify-between gap-4 font-sans text-sm font-medium text-foreground">
        <div className="flex flex-1 justify-end pr-8 md:pr-12">
          <Magnetic className="inline-block" maxOffset={8} strength={0.12}>
            <Link href={ROUTES.home} className={siteNavLinkClassName}>
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
            <Link href={ROUTES.blog} className={siteNavLinkClassName}>
              Blog
            </Link>
          </Magnetic>
        </div>
      </Container>
    </header>
  );
}
