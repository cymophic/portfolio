## Overview

This is my personal portfolio — the site you're currently browsing. It serves as a central hub to showcase my projects, career journey, technical skills, and a bit about who I am. Built from the ground up with a focus on performance, clean design, and maintainability.

## Tech Stack

- **Framework:** Next.js 16 (App Router, static export)
- **Styling:** Tailwind CSS v4 with dark mode
- **Animations:** GSAP for scroll and hover interactions
- **Icons:** Tabler Icons
- **Deployment:** AWS S3 + CloudFront via Terraform
- **CI/CD:** GitHub Actions

## Why Static Export?

I wanted the site to be as fast and reliable as possible without managing a server. Static export means every page is pre-rendered to HTML at build time — no server-side rendering, no database queries, no runtime overhead. The result is a blazing-fast site that can be served from any CDN.

![S3 and CloudFront architecture](/projects/digital-portfolio/cover.webp)

The site is deployed to an S3 bucket behind CloudFront, with Terraform managing the infrastructure as code. This makes deployments reproducible and infrastructure changes auditable.

## Design Decisions

### Clean and Minimal

The design focuses on readability and content hierarchy. I chose the Zinc color palette for its neutrality and paired it with Inter for body text and Spline Sans Mono for code and metadata elements.

### Dark Mode

Dark mode was a must-have. The implementation uses a CSS custom property approach via `@wrksz/themes`, with a toggle that persists the preference. View transitions are animated for a polished feel.

### Performance

Every image is converted to WebP at build time. The site scores 95+ on Lighthouse across all categories. Fonts are self-hosted to avoid external requests.

## Project Structure

Key directories and their purpose:

- `src/app/` — Next.js App Router pages and layouts
- `src/components/` — Reusable React components (header, footer, cards, pills)
- `src/hooks/` — Custom React hooks (animations, environment detection)
- `src/lib/` — Site configuration, types, and data
- `src/assets/` — Source images (converted to WebP at build)
- `scripts/` — Build-time tooling (image conversion, etc.)

## What I Learned

Building this portfolio reinforced a few principles I try to follow in every project:

1. **Start with the content model.** Defining the `Project`, `Career`, and `Education` types upfront made the rest of the site straightforward to build.
2. **Static doesn't mean boring.** GSAP animations and thoughtful transitions make the site feel interactive without compromising performance.
3. **Infrastructure as code is worth it.** Being able to `terraform apply` and have the entire AWS stack provisioned consistently is a huge time saver.
