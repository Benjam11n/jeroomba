# Blog Guide

This guide explains how to add and edit blog posts for this site.

## Where blog posts live

All blog posts are stored in:

```text
content/blog
```

Each blog post is one `.mdx` file.

Example:

```text
content/blog/my-trip-to-japan.mdx
```

The file name becomes the blog URL.

Example:

```text
content/blog/my-trip-to-japan.mdx
```

becomes:

```text
/blog/my-trip-to-japan
```

## Easiest way to make a new post

1. Go to `content/blog`
2. Copy an existing blog post file
3. Rename it
4. Replace the text with your new content

Good files to copy:

- `content/blog/launching-with-restraint.mdx`
- `content/blog/the-case-study-surface.mdx`

## Blog post format

Every post should start with a top section like this:

```mdx
---
title: "My Trip to Japan"
description: "A short summary of the post."
date: "2026-03-09"
tags:
  - travel
  - food
  - japan
coverImage: "/blog/japan-cover.jpg"
coverImageAlt: "Street view in Tokyo at night"
featured: true
published: true
---
```

Then write the blog content underneath it.

Example:

```mdx
---
title: "My Trip to Japan"
description: "A short summary of the post."
date: "2026-03-09"
tags:
  - travel
  - food
coverImage: "/blog/japan-cover.jpg"
coverImageAlt: "Street view in Tokyo at night"
featured: true
published: true
---

This was one of my favorite trips.

## First day

We started in Tokyo and spent the morning walking through local markets.
```

## What each top field means

- `title`: The blog post title.
- `description`: A short summary. This shows up on blog cards and previews.
- `date`: The publish date. Use this format: `"YYYY-MM-DD"`.
- `tags`: A short list of topics for the post.
- `coverImage`: The main image shown on the blog card and the blog post page.
- `coverImageAlt`: A short description of the cover image.
- `featured`: Use `true` if you want the post to appear in featured sections.
- `published`: Use `true` to show the post on the site. Use `false` to hide it until it is ready.

If you leave out `coverImage`, the blog card will show a simple placeholder image.

## How to write the blog content

You can write normal text under the top section.

Useful examples:

```mdx
## Big section title

### Smaller section title

This is a paragraph.

- This is a bullet point
- This is another bullet point

1. This is a numbered list
2. This is the next item

**This text is bold**

*This text is italic*
```

## How to add images

### Step 1: Put the image in the `public` folder

Example:

```text
public/blog/japan-cover.jpg
public/blog/ramen.jpg
```

You can organize images into folders if you want.

### Step 2: Use the image path in the post

Important:

- Do not write `public/blog/ramen.jpg`
- Write `/blog/ramen.jpg`

### Main cover image

Set it at the top of the post:

```mdx
coverImage: "/blog/japan-cover.jpg"
coverImageAlt: "Street view in Tokyo at night"
```

### Image inside the blog post

Use normal markdown:

```mdx
![Ramen in Tokyo](/blog/ramen.jpg)
```

### Smaller image with custom size

If you want to control the image size, use HTML like this:

```mdx
<img
  src="/blog/ramen.jpg"
  alt="Ramen in Tokyo"
  width="400"
  height="300"
/>
```

This will keep the image responsive, but it will not grow wider than `400px`.

## Image tips

- Always add `alt` text so the image is easy to understand.
- Keep file names simple.
- Use lowercase file names with dashes.

Good example:

```text
tokyo-night-market.jpg
```

Less good example:

```text
IMG_4922 FINAL VERSION.jpg
```

## Draft posts

If a post is not ready yet, set:

```mdx
published: false
```

That keeps it hidden from the site.

## Featured posts

If you want a post to show up in featured areas, set:

```mdx
featured: true
```

If not, use:

```mdx
featured: false
```

## Before you finish

Check these things:

- The file is inside `content/blog`
- The file ends in `.mdx`
- The top section is filled in
- The date format is correct
- The image path starts with `/`
- The post uses `published: true`

## Quick copy template

```mdx
---
title: "Post title"
description: "Short summary"
date: "2026-03-09"
tags:
  - tag-one
  - tag-two
coverImage: "/blog/your-cover-image.jpg"
coverImageAlt: "Describe the image"
featured: false
published: true
---

Write your post here.

## Section title

Add more text here.

![Optional inline image](/blog/another-image.jpg)
```
