import { Linkedin, X } from "lucide-react";

export const siteNavLinkClassName =
  "relative inline-block text-muted-foreground/80 transition-colors hover:text-foreground focus-visible:text-foreground after:absolute after:-bottom-1 after:left-1/2 after:h-px after:w-full after:-translate-x-1/2 after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100";

export const siteSocialIcons = {
  linkedin: Linkedin,
  x: X,
} as const;

export const homeHeroImages = [
  {
    alt: "Illustration of Santorini architecture",
    src: "/hero/santorini.jpeg",
    rotate: -18,
    enterX: 220,
    enterY: 28,
    className:
      "absolute top-0 left-[-1%] md:left-[2%] lg:left-[3%] xl:left-0 w-36 md:w-56 aspect-[3/4] rotate-[-18deg]",
  },
  {
    alt: "Basque cheesecake illustration",
    src: "/hero/basque_cheesecake.jpeg",
    rotate: 15,
    enterX: -210,
    enterY: 24,
    className:
      "absolute top-[5%] right-[-1%] md:right-[2%] lg:right-[3%] xl:right-0 w-32 md:w-48 aspect-[3/4] rotate-[15deg]",
  },
  {
    alt: "Gyros illustration",
    src: "/hero/gyros.jpeg",
    rotate: -10,
    enterX: 170,
    enterY: -22,
    className:
      "absolute bottom-[0%] left-[-1%] md:left-[5%] lg:left-[12%] w-36 md:w-52 aspect-[4/3] rotate-[-10deg]",
  },
  {
    alt: "Meatballs illustration",
    src: "/hero/meatballs.jpeg",
    rotate: 8,
    enterX: -180,
    enterY: -26,
    className:
      "absolute bottom-[5%] right-[-1%] md:right-[5%] lg:right-[12%] w-40 md:w-60 aspect-[4/3] rotate-[8deg]",
  },
] as const;
