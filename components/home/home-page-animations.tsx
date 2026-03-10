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
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        const getEnterOffset = (
          element: HTMLElement,
          axis: "x" | "y",
        ) => {
          const mobileValue =
            axis === "x"
              ? element.dataset.enterXMobile
              : element.dataset.enterYMobile;
          const defaultValue =
            axis === "x" ? element.dataset.enterX : element.dataset.enterY;

          return Number(isMobile ? mobileValue ?? defaultValue ?? 0 : defaultValue ?? 0);
        };
        const heroTimeline = gsap.timeline({
          defaults: {
            duration: 0.82,
            ease: "power3.out",
          },
        });

        heroTimeline
          .from("[data-hero-title-line='first']", {
            autoAlpha: 0,
            yPercent: 110,
            rotate: 1.5,
            duration: 0.72,
          })
          .from(
            "[data-hero-title-line='second']",
            {
              autoAlpha: 0,
              yPercent: 110,
              rotate: 1.5,
              duration: 0.72,
            },
            "-=0.54",
          )
          .fromTo(
            frames,
            {
              autoAlpha: 0,
              scale: 0.72,
              x: (_, element) =>
                getEnterOffset(element as HTMLElement, "x"),
              y: (_, element) =>
                getEnterOffset(element as HTMLElement, "y"),
              rotate: 0,
            },
            {
              autoAlpha: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotate: (_, element) =>
                Number((element as HTMLElement).dataset.rotate ?? 0),
              duration: 0.92,
              ease: "power3.out",
            },
            "-=0.28",
          )
          .from(
            "[data-hero-after-title]",
            {
              autoAlpha: 0,
              y: 28,
              duration: 0.62,
              stagger: 0.1,
            },
            "-=0.44",
          );

        frames.forEach((frame) => {
          const speedFactor = frame.dataset.speed;
          const yOffset = speedFactor ? Number(speedFactor) * 10 : Number(frame.dataset.drift ?? "1") * 10;

          gsap.to(frame, {
            yPercent: yOffset,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        });

        const heroText = document.querySelector("[data-hero-text]");
        if (heroText) {
          gsap.to(heroText, {
            yPercent: 40,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

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
