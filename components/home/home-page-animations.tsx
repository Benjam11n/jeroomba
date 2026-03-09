"use client";

import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HomePageAnimationsProps = {
  children: ReactNode;
};

export function HomePageAnimations({ children }: HomePageAnimationsProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const media = gsap.matchMedia();
    const ctx = gsap.context(() => {
      media.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            "[data-hero-frame]",
            "[data-hero-title-line]",
            "[data-hero-after-title]",
            "[data-reveal='section-intro']",
            "[data-reveal='post-card']",
            "[data-reveal='section-cta']",
          ],
          {
            clearProps: "all",
          },
        );
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const frames = gsap.utils.toArray<HTMLElement>("[data-hero-frame]");
        const heroTimeline = gsap.timeline({
          defaults: {
            duration: 0.9,
            ease: "power3.out",
          },
        });

        heroTimeline
          .from("[data-hero-title-line='first']", {
            autoAlpha: 0,
            yPercent: 110,
            rotate: 1.5,
            duration: 0.85,
          })
          .from(
            "[data-hero-title-line='second']",
            {
              autoAlpha: 0,
              yPercent: 110,
              rotate: 1.5,
              duration: 0.85,
            },
            "-=0.46",
          )
          .fromTo(
            frames,
            {
              autoAlpha: 0,
              scale: 0.72,
              x: (_, element) =>
                Number((element as HTMLElement).dataset.enterX ?? 0),
              y: (_, element) =>
                Number((element as HTMLElement).dataset.enterY ?? 0),
              rotate: 0,
            },
            {
              autoAlpha: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotate: (_, element) =>
                Number((element as HTMLElement).dataset.rotate ?? 0),
              duration: 1.05,
              ease: "power3.out",
            },
            "-=0.2",
          )
          .from(
            "[data-hero-after-title]",
            {
              autoAlpha: 0,
              y: 28,
              duration: 0.72,
              stagger: 0.12,
            },
            "-=0.38",
          );

        frames.forEach((frame) => {
          const direction = Number(frame.dataset.drift ?? "1");

          gsap.to(frame, {
            yPercent: direction * 10,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        });

        gsap.from("[data-reveal='section-intro']", {
          autoAlpha: 0,
          y: 40,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-section='recent']",
            start: "top 80%",
            once: true,
          },
        });

        gsap.from("[data-reveal='post-card']", {
          autoAlpha: 0,
          y: 48,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: "[data-reveal-group='posts']",
            start: "top 82%",
            once: true,
          },
        });

        gsap.from("[data-reveal='section-cta']", {
          autoAlpha: 0,
          y: 32,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-reveal='section-cta']",
            start: "top 88%",
            once: true,
          },
        });
      });
    }, root);

    return () => {
      ctx.revert();
      media.revert();
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
