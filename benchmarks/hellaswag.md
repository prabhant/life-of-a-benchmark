---
title: HellaSwag
description: Benchmark record for commonsense completion reasoning
---

Slug: hellaswag
Health: Yellow
Taxonomy: Commonsense reasoning
Task Format: Multiple-choice completion
Languages: English
Primary Metric: Accuracy
Saturation Risk: Medium
Contamination Risk: Unknown
Reproducibility: Medium
Last Reviewed: 2026-07-30
Reviewer: BenchmarkCards editorial review
Canonical Source: https://arxiv.org/abs/1905.07830
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Description
HellaSwag evaluates commonsense natural-language inference by asking models to select the most plausible continuation of a situation. It is useful for regression testing but should not be treated as conclusive evidence of human-like commonsense reasoning.

## Recommended Use
- Detecting regressions in a familiar commonsense baseline
- Pairing with task-specific or direct-answer reasoning evaluations

## Avoid When
- Claiming human-like commonsense reasoning from a single score
- Selecting methods without checking question-context sensitivity

## Capabilities
- Commonsense reasoning
- Plausible event completion
- Context-sensitive inference
- Multiple-choice language understanding

## Timeline
- 2019: HellaSwag was introduced.
- 2023: GPT-4 reported HellaSwag results.
- 2025: GoldenSwag released as a filtered HellaSwag subset.

## Known Issues
- [In a random 300-item validation-set audit, Surge annotators flagged 107 items (36%) because another continuation was at least as good as the labeled answer or a distractor could be rejected without reading the scenario.](https://surgehq.ai/blog/hellaswag-or-hellabad-36-of-this-popular-llm-benchmark-contains-errors)
- [Using Claude 3.5 Sonnet to annotate all 10,042 validation items, a 2025 study marked 39.7% of prompts as ungrammatical and 21.1% as having multiple equally correct options; across tested models, 68% of predictions were unchanged after removing the question prompt.](https://arxiv.org/html/2504.07825v1)

## Evidence
- [Original HellaSwag paper | original | 2019 | benchmark definition](https://arxiv.org/abs/1905.07830)
- [GPT-4 technical report | adoption | 2023 | reported model result](https://arxiv.org/abs/2303.08774)
- [HellaSwag or HellaBad? | critique | 2022 | 300-item validation-set quality audit](https://surgehq.ai/blog/hellaswag-or-hellabad-36-of-this-popular-llm-benchmark-contains-errors)
- [What the HellaSwag? | critique | 2025 | construct validity, zero-prompt behavior, and GoldenSwag](https://arxiv.org/html/2504.07825v1)

## Successors
- GoldenSwag