import Link from "next/link";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <Container className="flex flex-col gap-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-medium text-foreground">{siteConfig.name}</p>
        </div>

        <div className="flex flex-wrap gap-4">
          {siteConfig.socials.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground"
            >
              {social.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
