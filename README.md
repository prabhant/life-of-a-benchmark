# BenchmarkCards

BenchmarkCards is a fully static benchmark catalog designed for GitHub Pages deployment.
It stores benchmark records as Markdown files and generates clean, academic-style benchmark pages.

## Stack

- Plain HTML/CSS/JavaScript
- Static generator script in Node.js
- Markdown records in `benchmarks/`
- GitHub Actions deployment to GitHub Pages

## Project structure

- `benchmarks/` — benchmark records (Markdown)
- `assets/` — shared CSS and browser-side search/filter JS
- `tools/build.mjs` — static page generator
- `dist/` — generated site output (deployment artifact)

## Add or update benchmark records

1. Create or edit a Markdown file in `benchmarks/`.
2. Keep the section structure:
   - `# Title`
   - `Slug: ...`
   - `Health: Green|Yellow|Red`
   - `## Description`
   - `## Capabilities`
   - `## Timeline`
   - `## Known Issues`
   - `## Evidence`
   - `## Successors`
3. Format every known issue as `[Critique](supporting evidence URL)`.
   The build rejects critiques without a direct evidence link.
4. Open a pull request with your changes.

This repository is intentionally GitHub-PR-centric: contributions are benchmark file edits reviewed via pull requests.

## Local build

```bash
npm run build
```

Then open `dist/index.html`.

## GitHub Pages deployment

The workflow at `.github/workflows/deploy-pages.yml` builds the static site and deploys `dist/` to GitHub Pages on push to `main`.
