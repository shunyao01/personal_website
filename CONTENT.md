# Content workflow

Portfolio copy lives in Markdown under `/content`. Next.js reads these files at **build time**—no API routes, no CMS, no database.

## Folder structure

```
/content
  /projects          # All work — homepage + /projects auto-update
  /learning          # Research threads (stack section)
  /building          # What I am making
  /writing           # Public notes / essays
  site.json          # Name, tagline, email, socials
```

Add a file → it appears after rebuild. Delete a file → it disappears. You never edit page code for listings.

## Projects (`/content/projects`)

```yaml
---
title: Real-time Recommendation Engine
date: 2026-03
category: ml-engineering    # ml-engineering | mlops | infrastructure | research
featured: true              # homepage work section (up to 3, newest first)
teaser: Low-latency retrieval and ranking under production load.
tags: [PyTorch, FAISS, Feast, Redis, Triton]
metrics:
  - value: "3.2M"
    label: predictions/day
  - value: "18ms"
    label: p99 latency
---
```

- **`getProjects()`** — every `.md` file, sorted by `date` descending  
- **`getFeaturedProjects(3)`** — `featured: true` first, then fills to 3 with newest  
- **`/projects`** — full list from the same array; add `04-new-project.md` and it shows up everywhere  

Plan **`category`** and **`featured`** from day one. When you have 10+ projects, filter the View All page by `category` and `tags` in component code—no content migration.

## Learning (`/content/learning`)

```yaml
---
title: Speculative decoding strategies for low-latency response generation
date: 2026-04
status: studying          # shipped | studying | reading
featured: true            # wide card in learning grid (optional)
---
```

## Building (`/content/building`)

```yaml
---
title: GPU Inference Autoscaler
date: 2026-05
status: shipped
---
```

## Writing (`/content/writing`)

```yaml
---
title: Designing Inference APIs for Teams, Not Just Models
date: 2026-05
slug: inference-apis-for-teams
---
```

## Site config

Edit `content/site.json` for **ShunYao Tee**, tagline, email, and links.

## Day-to-day

| Task | What to do |
|------|------------|
| New project | `content/projects/04-my-project.md` → push → live on homepage (if `featured`) and `/projects` |
| Update a metric | Edit frontmatter, save, push |
| New learning note | `content/learning/2026-06-slug.md` |
| New build log | `content/building/2026-06-slug.md` |
| New essay | `content/writing/slug.md` |

## Local dev

```bash
npm install
npm run dev
```

## How it loads

`lib/content.ts` reads each folder with `fs` + `gray-matter`, sorts by date, and passes props into pages. One source of truth for homepage, View All, and counts.
