"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/layout/container";
import { Magnetic } from "@/components/ui/magnetic";
import { siteNavLinkClassName, siteSocialIcons } from "@/lib/constants";
import { ROUTES, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const footer = footerRef.current;

    if (!footer) {
      return;
    }

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            "[data-footer-eyebrow]",
            "[data-footer-brand]",
            "[data-footer-nav]",
            "[data-footer-link]",
            "[data-footer-bottom]",
            "[data-footer-social]",
          ],
          {
            clearProps: "all",
          },
        );
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const introTimeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
          scrollTrigger: {
            trigger: footer,
            start: "top 82%",
            once: true,
          },
        });

        introTimeline
          .from("[data-footer-eyebrow]", {
            autoAlpha: 0,
            y: 18,
            duration: 0.45,
          })
          .from(
            "[data-footer-brand]",
            {
              autoAlpha: 0,
              y: 48,
              duration: 0.9,
            },
            "-=0.15",
          )
          .from(
            "[data-footer-nav]",
            {
              autoAlpha: 0,
              x: 28,
              duration: 0.65,
            },
            "-=0.55",
          )
          .from(
            "[data-footer-link]",
            {
              autoAlpha: 0,
              y: 18,
              duration: 0.45,
              stagger: 0.08,
            },
            "-=0.38",
          );

        gsap.from("[data-footer-bottom]", {
          autoAlpha: 0,
          y: 24,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-footer-bottom]",
            start: "top 96%",
            once: true,
          },
        });

        gsap.from("[data-footer-social]", {
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.4,
          ease: "back.out(1.8)",
          stagger: 0.08,
          scrollTrigger: {
            trigger: "[data-footer-bottom]",
            start: "top 96%",
            once: true,
          },
        });
      });
    }, footer);

    return () => {
      ctx.revert();
      media.revert();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden border-t border-border/60 bg-card/30 pb-8 pt-16"
    >
      <Container className="space-y-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.6fr)] lg:items-end">
          <div className="max-w-3xl space-y-1">
            <p
              data-footer-eyebrow
              className="text-xs uppercase tracking-[0.24em] text-muted-foreground"
            >
              Travel Journal
            </p>
            <Link
              href={ROUTES.blog}
              data-footer-brand
              className="-ml-2 group relative block h-[5.25rem] overflow-hidden pl-2 sm:-ml-3 sm:h-[6.25rem] sm:pl-3 lg:-ml-4 lg:h-[8.1rem] lg:pl-4"
            >
              <div className="flex h-full flex-col transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                <div className="flex h-full w-full shrink-0 items-start justify-start pt-0.5 sm:pt-1 lg:pt-1.5">
                  <h2 className="select-none font-serif text-5xl font-light leading-none tracking-tight text-foreground italic sm:text-6xl lg:text-8xl">
                    Jeroomba
                  </h2>
                </div>

                <div className="flex h-full w-full shrink-0 items-start justify-start pt-0.5 sm:pt-1 lg:pt-1.5">
                  <h2 className="select-none font-serif text-4xl font-light leading-none tracking-tight text-primary italic sm:text-5xl lg:text-7xl">
                    Read the stories
                  </h2>
                </div>
              </div>
            </Link>
          </div>

          <div data-footer-nav className="space-y-4 text-sm">
            <p className="font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Explore
            </p>
            <div className="flex flex-col items-start gap-3">
              {siteConfig.navItems.map((item) => (
                <div key={item.label} data-footer-link className="inline-block">
                  <Magnetic
                    className="inline-block"
                    maxOffset={8}
                    strength={0.12}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        siteNavLinkClassName,
                        "text-base font-medium",
                      )}
                    >
                      {item.label}
                    </Link>
                  </Magnetic>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          data-footer-bottom
          className="flex flex-col gap-6 border-t border-border/60 pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            {siteConfig.name} © {new Date().getFullYear()}
          </p>

          <div className="flex flex-wrap gap-3">
            {siteConfig.socials.map((social) => {
              const SocialIcon = siteSocialIcons[social.icon];

              return (
                <div
                  key={social.label}
                  data-footer-social
                  className="inline-block"
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2 font-medium text-foreground transition-colors hover:border-foreground/40 hover:text-primary"
                  >
                    <SocialIcon className="size-4" aria-hidden="true" />
                    <span className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">
                      {social.label}
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
