export const ROUTES = {
  home: "/",
  blog: "/blog",
  blogPost: (slug: string) => `/blog/${slug}`,
} as const;

export const siteConfig = {
  name: "Jeroomba",
  description:
    "A personal travel blog documenting adventures around the world.",
  url: "https://jeroomba.vercel.app",
  email: "hello@jeroomba.dev",
  keywords: [
    "travel blog",
    "adventures",
    "personal journal",
    "Wanderlust",
    "photography",
  ],
  navItems: [
    { label: "Home", href: ROUTES.home },
    { label: "Blog", href: ROUTES.blog },
  ],
  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/",
      icon: "linkedin",
    },
    { label: "X", href: "https://x.com/", icon: "x" },
  ],
} as const;

