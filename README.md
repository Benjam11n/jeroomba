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

_This text is italic_
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
<img src="/blog/ramen.jpg" alt="Ramen in Tokyo" width="400" height="300" />
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

## How to deploy this site on Vercel

You only need to set this up once.

### First-time setup

1. Make sure this project is already in GitHub
2. Go to Vercel: `https://vercel.com`
3. Sign in to Vercel
4. If Vercel asks to connect to GitHub, follow the steps to connect your GitHub account
5. In Vercel, click `Add New...`
6. Click `Project`
7. Find this GitHub repository in the list
8. Click `Import`
9. Continue through the setup screens
10. Click `Deploy`

Vercel will then build the site and publish it for you.

When the deployment finishes, Vercel will show the live site URL.

That is the web address you can open and share.

If you do not see the repository in Vercel, the GitHub account connected to Vercel may not have access to that repository yet.

After that first setup, you do not need to deploy the site manually again.

### Where to find the site URL later

If you need the site URL again later:

1. Open Vercel
2. Open the project
3. Look near the top of the project page
4. Open the latest deployment
5. Copy the production URL

## How updates are deployed after that

After your blog post is committed and pushed to the repository, Vercel will automatically start a new deployment.

In simple terms:

1. You add or update the blog post file
2. You commit the change
3. You push it to the repository
4. Vercel notices the new change and publishes the updated site automatically

You do not need to manually upload the post to Vercel.

If the repository is already connected to Vercel, this automatic deployment is the normal workflow.

## If the deployment fails

If the site does not update after you push your changes, the most likely reason is that the blog post format is invalid.

This usually means something is wrong in the top section of the post or the file structure.

Common things to check:

- The file is inside `content/blog`
- The file ends in `.mdx`
- The top section starts and ends with `---`
- `title` is filled in
- `description` is filled in
- `date` uses this format: `"YYYY-MM-DD"`
- `tags` is written as a list
- `featured` is either `true` or `false`
- `published` is either `true` or `false`

Example of a valid top section:

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
```

## How to debug a failed deployment

If Vercel shows a deployment error, use this process:

1. Open the failed deployment in Vercel
2. Look for the error message in the build log
3. Go back to your blog post file
4. Compare your top section to the valid example in this guide
5. Fix any missing field, date format issue, or broken spacing
6. Commit and push again

If you are not sure what is wrong, the fastest fix is usually:

1. Copy a blog post that already works
2. Paste your content into that file format
3. Replace the text carefully without changing the structure
4. Commit and push again

If the deployment still fails, check for:

- A missing `"` quote
- A missing `---` line at the top or bottom of the top section
- A date that is not a real date
- A tag list that is not indented properly
- An image path that does not start with `/blog/`

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
