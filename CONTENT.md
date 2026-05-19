# Content workflow

`CONTENT.md` documents the CMS workflow. The actual source of truth is the `/content` directory plus `content/site.json`.

Portfolio copy lives in Markdown and JSON under `/content`. Next.js reads these files at **build time**—no API routes, no database, no external CMS.

## Folder structure

```
/content
  /projects          # All work — homepage + /projects auto-update
  /experience        # Resume-backed roles on the homepage
  /education         # Degrees, awards, coursework
  /learning          # Optional research / learning notes
  /building          # Optional build log
  /writing           # Optional public notes / essays
  site.json          # Name, tagline, summary, resume link, socials
```

Add a file → it appears after rebuild. Delete a file → it disappears. You never edit page code for listings.

## Projects (`/content/projects`)

```yaml
---
title: Real-time Recommendation Engine
date: 2026-03
category: agents            # agents | applied-ml | product | research
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

Optional log section for notes you want to publish later.

```yaml
---
title: Speculative decoding strategies for low-latency response generation
date: 2026-04
status: studying          # shipped | studying | reading
featured: true            # wide card in learning grid (optional)
---
```

## Building (`/content/building`)

Optional log section for shipped experiments or infrastructure notes.

```yaml
---
title: GPU Inference Autoscaler
date: 2026-05
status: shipped
---
```

## Writing (`/content/writing`)

Optional public essays.

```yaml
---
title: Designing Inference APIs for Teams, Not Just Models
date: 2026-05
slug: inference-apis-for-teams
---
```

## Site config

Edit `content/site.json` for **Shun Yao Tee**, hero copy, about summary, resume link, email, and social links.

## Experience (`/content/experience`)

```yaml
---
title: Data Science Intern
organization: SmartJen
location: Singapore, Singapore
date: Nov 2022 - Feb 2023
tags: [Python, Pandas, NumPy, PyTorch, AWS Lambda, NLP]
highlights:
  - Developed a personalized worksheet-generation algorithm that reached 95% top-3 similarity.
---
```

## Education (`/content/education`)

```yaml
---
school: Monash University
credential: Bachelor of Computer Science (Honours)
location: Selangor, Malaysia
date: Jul 2023 - Jun 2024
notes:
  - GPA 3.625
  - Monash Graduate Research Scholarship (2023-2024)
---
```

## Day-to-day

| Task | What to do |
|------|------------|
| New project | `content/projects/04-my-project.md` → push → live on homepage (if `featured`) and `/projects` |
| New role | `content/experience/04-my-role.md` → homepage experience updates automatically |
| New degree / certificate block | `content/education/03-my-education.md` |
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

`lib/content.ts` reads each folder with `fs` + `gray-matter`, then passes props into pages and components. Keep new content in `/content`; do not hardcode resume copy in React components unless the content model itself changes.
