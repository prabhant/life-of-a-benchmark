---
title: BIG-Bench Hard (BBH)
description: Benchmark record for difficult multi-task reasoning
---

Slug: bbh
Health: Yellow
Taxonomy: General reasoning
Task Format: Mixed task suite
Languages: English
Primary Metric: Exact-match accuracy
Saturation Risk: High
Contamination Risk: Unknown
Reproducibility: Medium
Last Reviewed: 2026-07-30
Reviewer: Benchmark Ward editorial review
Canonical Source: https://arxiv.org/abs/2210.09261
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Description
BIG-Bench Hard is a suite of challenging BIG-Bench tasks on which prior language models did not outperform average human raters. It measures difficult reasoning across varied task formats.

## Recommended Use
- Stress-testing reasoning methods across diverse task types
- Comparing prompting strategies while reporting the prompt policy

## Avoid When
- Distinguishing frontier models with BBH alone
- Comparing results that use different chain-of-thought policies

## Capabilities
- Difficult multi-task reasoning
- Algorithmic and logical reasoning
- Language understanding
- Chain-of-thought evaluation

## Timeline
- 2022: BIG-Bench Hard was introduced.
- 2024: BBH appeared in Llama 3 and public leaderboard evaluations.

## Known Issues
- [In the original 23-task study, chain-of-thought prompting let PaLM exceed average human performance on 10 tasks and Codex on 17 tasks.](https://arxiv.org/abs/2210.09261)

## Evidence
- [Original BBH paper | original | 2022 | benchmark definition](https://arxiv.org/abs/2210.09261)
- [Llama 3 model report | adoption | 2024 | reported model result](https://arxiv.org/abs/2407.21783)

## Successors
- None listed