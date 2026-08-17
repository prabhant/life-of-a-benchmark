---
title: LiveBench
description: Benchmark record for the periodically refreshed multi-category evaluation suite
---

Slug: livebench
Measurement Status: Qualified
Taxonomy: Mixed capability suite
Task Format: Mixed task suite with objective ground truth
Languages: English
Scoring Rule: Per-task ground-truth accuracy
Saturation Risk: Medium
Contamination Risk: Medium
Reproducibility: Low
Last Reviewed: 2026-08-17
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2406.19314
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
LiveBench holds a fixed budget of 1,000 questions across six categories and 18 tasks, replacing items periodically to limit contamination and scoring everything against objective ground truth rather than an LLM judge. Its coding category carries 128 published rows and, until April 2025, was sourced from LiveCodeBench. The maintainers renamed the paper from contamination-free to contamination-limited between versions and have publicly replaced coding questions they judged contaminated.

## Supported Uses
- Comparing models within a single named release when the release tag is reported
- Avoiding LLM-judge error on tasks that have objective answers
- Tracking whether a model's advantage survives a question refresh

## Unsupported Inferences
- Comparing scores across LiveBench releases or across agentic harness changes
- Ranking models from coding-category differences smaller than the 128-item sampling error
- Treating the benchmark as contamination-free, a claim its authors withdrew

## Measurement Targets
- Math, coding, reasoning, language, instruction following, and data analysis
- Objective ground-truth scoring without an LLM judge
- Resistance to contamination through periodic question replacement
- Agentic coding under a fixed scaffold and step budget

## Evidence History
- 2024: LiveBench was released and reported GPT-4-Turbo at around 50% overall accuracy.
- 2024: A task was removed after answer-parsing ambiguity let some models reach 100%.
- 2025: The paper title changed from contamination-free to contamination-limited and the difficulty claim moved from below 65% to below 70%.
- 2025: The maintainers replaced the coding questions, stating the previous ones were likely heavily contaminated for newer models.
- 2025: The agentic coding scaffold changed and all prior model results were rerun and overwritten on the published leaderboard.

## Validity Threats
- [Between v1 and v2 the authors retitled the paper from a contamination-free to a contamination-limited benchmark and softened the design claim from immune to resistant, while the repository's citation block and description still carry the withdrawn wording.](https://arxiv.org/abs/2406.19314)
- [The maintainers' changelog states that the coding questions were refreshed in April 2025 because the previous ones were likely heavily contaminated for newer models, that the coding source was then changed away from LiveCodeBench entirely, and that a later update was made to resolve saturation and contamination of the benchmark.](https://github.com/LiveBench/LiveBench/blob/main/changelog.md)
- [The changelog records that the agentic coding scaffold was switched and the step limit raised from 50 to 250, that all models were rerun, and that the existing published leaderboard was updated with the new results, so historical entries reflect harness changes rather than model changes.](https://github.com/LiveBench/LiveBench/blob/main/changelog.md)
- [The published coding category contains 128 rows, while an independent noise analysis calculated that a 164-item code benchmark requires at least a 6.7 point difference to reach a p-value of 0.05 across pairwise comparisons.](https://huggingface.co/datasets/livebench/coding)
- [The repository states that not all questions for the current release are public and instructs users to fall back to an older release for evaluation, so the public artifact does not reproduce the scored leaderboard.](https://github.com/LiveBench/LiveBench)
- [For the period in which its coding category was drawn from LiveCodeBench, LiveBench inherited that source's documented contamination behavior, including a 33B model falling from about 60 pass@1 on May problems to about 0 on September LeetCode problems.](https://arxiv.org/abs/2403.07974)

## Evidence Register
- [Original LiveBench paper | original | 2024 | benchmark definition and title revision](https://arxiv.org/abs/2406.19314)
- [LiveBench changelog | implementation | 2025 | contamination admissions, task removals, and scaffold changes](https://github.com/LiveBench/LiveBench/blob/main/changelog.md)
- [LiveBench repository | implementation | 2025 | release gating and public dataset lag](https://github.com/LiveBench/LiveBench)
- [LiveBench coding dataset | implementation | 2025 | published coding category size](https://huggingface.co/datasets/livebench/coding)
- [LiveCodeBench | critique | 2024 | inherited contamination behavior of the original coding source](https://arxiv.org/abs/2403.07974)
- [Measuring all the noises of LLM evals | critique | 2025 | minimum detectable difference on small code benchmarks](https://arxiv.org/abs/2512.21326)

## Alternative Instruments
- LiveCodeBench
- BIG-Bench Extra Hard
