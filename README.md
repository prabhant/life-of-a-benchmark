---
title: Benchmark Metrology Lab
description: Evidence-linked measurement profiles for LLM evaluation benchmarks
---

## Benchmark Metrology Lab

Benchmark Metrology Lab is a fully static, evidence-linked instrument register
for researchers selecting LLM evaluation benchmarks. It documents what each
benchmark measures, the conditions under which its scores support an inference,
and the validity threats that qualify interpretation. Markdown records generate
searchable measurement profiles, comparison views, interpretation guidance, and
assessment governance metadata.

The catalog combines measurement science with incident-reporting practices.
Status labels summarize fitness for an intended use, while evidence-linked
validity threats preserve the observations, scope, and provenance needed for
independent review.

## Stack

* Plain HTML, CSS, and JavaScript
* Static generator script in Node.js
* Markdown records in `benchmarks/`
* GitHub Actions deployment to GitHub Pages

## Project structure

* `benchmarks/`: benchmark measurement records
* `assets/`: shared CSS and browser-side search and filtering JavaScript
* `papers/`: downloaded PDFs, page-delimited extracted text, and evidence indexes
* `tools/build.mjs`: static page generator
* `dist/`: generated deployment artifact

## Benchmark Record Schema

Every file in `benchmarks/` requires YAML frontmatter with `title` and
`description`, followed by these metadata lines:

* `Slug`
* `Measurement Status`
* `Taxonomy`
* `Task Format`
* `Languages`
* `Scoring Rule`
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

* `## Instrument Overview`
* `## Supported Uses`
* `## Unsupported Inferences`
* `## Measurement Targets`
* `## Evidence History`
* `## Validity Threats`
* `## Evidence Register`
* `## Alternative Instruments`

Measurement status is an editorial assessment. Use `Fit` when the documented
evidence supports the stated use, `Qualified` when interpretation requires
companion evaluations or explicit constraints, and `Not Fit` when the benchmark
should not support primary inference.

Interpretation guidance is editorial and appears separately from reported
validity threats. Every threat must be a direct Markdown link, and its URL must
also appear in the evidence register. Use this source format:

```markdown
- [Title | source type | year | claim scope](https://example.org/source)
```

Allowed source types are `original`, `critique`, `adoption`, `leaderboard`, and
`implementation`. The generator rejects missing source metadata, unsupported
validity threats, or incomplete measurement and governance fields.

The catalog records a high-level reproducibility assessment. It does not record
run-level dataset revisions, prompt templates, decoding settings, or harness
versions.

## Measurement Decision Support

The register supports taxonomy, measurement-status, saturation-risk, and
contamination-risk filters. Select two to five instruments to compare their
measurement profiles, interpretation guidance, governance metadata, and source
coverage.

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
