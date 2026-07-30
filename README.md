---
title: BenchmarkCards
description: Evidence-linked decision support for LLM evaluation benchmarks
---

## BenchmarkCards

BenchmarkCards is a fully static, evidence-linked catalog for researchers and
developers selecting LLM evaluation benchmarks. It generates searchable records,
comparison views, decision guidance, and governance context from Markdown.

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

## Benchmark Record Schema

Every file in `benchmarks/` requires YAML frontmatter with `title` and
`description`, followed by these metadata lines:

* `Slug`
* `Health`
* `Taxonomy`
* `Task Format`
* `Languages`
* `Primary Metric`
* `Saturation Risk`
* `Contamination Risk`
* `Reproducibility`
* `Last Reviewed`
* `Reviewer`
* `Canonical Source`
* `License Status`
* `Link Status`

Use `Low`, `Medium`, `High`, or `Unknown` for risk and reproducibility fields.
`Unknown` means the catalog lacks enough documented evidence to assign a level.

Each record also requires these sections:

* `## Description`
* `## Recommended Use`
* `## Avoid When`
* `## Capabilities`
* `## Timeline`
* `## Known Issues`
* `## Evidence`
* `## Successors`

Health is a catalog assessment. Green is suitable as a primary signal, Yellow
needs companion evaluations, and Red should not be used as primary evidence.

Catalog guidance is editorial and appears separately from reported critiques.
Every critique must be a direct Markdown link, and its URL must also appear in
the evidence list. Use this source format:

```markdown
- [Title | source type | year | claim scope](https://example.org/source)
```

Allowed source types are `original`, `critique`, `adoption`, `leaderboard`, and
`implementation`. The generator rejects missing source metadata, unsupported
critiques, or incomplete decision and governance fields.

The catalog records a high-level reproducibility assessment. It does not record
run-level dataset revisions, prompt templates, decoding settings, or harness
versions.

## Decision Support

The catalog supports taxonomy, health, saturation-risk, and contamination-risk
filters. Select two to five records to compare their decision profiles,
guidance, governance metadata, and source coverage.

The coverage map identifies currently represented taxonomies and priority gaps
such as code and agents, long context, multilingual behavior, RAG and
groundedness, safety, tool use, vision, and production workloads.

`None listed` is treated as an empty successor field and does not render as a
benchmark relationship.

This repository is intentionally GitHub-PR-centric: contributions are benchmark file edits reviewed via pull requests.

## Local build

```bash
npm run build
```

Then open `dist/index.html`.

## GitHub Pages deployment

The workflow at `.github/workflows/deploy-pages.yml` builds the static site and deploys `dist/` to GitHub Pages on push to `main`.

## Link Validation

The scheduled workflow at `.github/workflows/link-check.yml` checks external
links in benchmark records every Monday and on relevant pushes. The build also
validates that all evidence and canonical-source URLs use HTTP or HTTPS.
