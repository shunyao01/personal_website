# Personal Website (Next.js)

## Run locally

```bash
npm install
npm run dev
```

Open **http://localhost:3000** — do not open `legacy/index.html` directly (styles are bundled by Next.js).

## Project layout

```
app/           # Next.js routes + globals.css (imports styles/)
styles/        # CSS source (single copy)
public/        # Static files only (js, favicon, og.svg)
content/       # Markdown (projects, learning, building, writing)
components/    # React components
lib/           # content loaders
legacy/        # Old static HTML (reference only)
```

See [CONTENT.md](./CONTENT.md) for the Markdown workflow.
