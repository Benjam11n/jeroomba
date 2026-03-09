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
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "X", href: "https://x.com/" },
  ],
} as const;

export const projects = [
  {
    title: "Flagship Case Study",
    description:
      "Use this slot for the product or client engagement that best represents your judgment, execution quality, and ability to handle constraints.",
    status: "Replace with real work",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Design Systems"],
    href: "",
  },
  {
    title: "Systems Migration",
    description:
      "A good second project explains how you handled complexity: refactors, migrations, platform work, or architecture decisions that improved the baseline.",
    status: "Replace with real work",
    year: "2025",
    stack: ["Architecture", "Tooling", "Performance"],
    href: "",
  },
  {
    title: "Experiment Log",
    description:
      "Keep one card for something smaller and sharper. It proves range and gives you a place to show curiosity, prototypes, or research-heavy work.",
    status: "Replace with real work",
    year: "2024",
    stack: ["Research", "Prototyping", "Motion"],
    href: "",
  },
  {
    title: "Writing-Led Project",
    description:
      "This slot works well for a project where the artifact was not only code. It could be docs, strategy, enablement, or a product narrative that changed direction.",
    status: "Replace with real work",
    year: "2024",
    stack: ["Strategy", "Docs", "Product Thinking"],
    href: "",
  },
] as const;
