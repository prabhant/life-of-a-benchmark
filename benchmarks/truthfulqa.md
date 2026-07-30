---
title: TruthfulQA
description: Benchmark record for truthfulness under common misconceptions
---

Slug: truthfulqa
Health: Yellow
Taxonomy: Truthfulness and factuality
Task Format: Multiple choice and generative answers
Languages: English
Primary Metric: Truthfulness score
Saturation Risk: Unknown
Contamination Risk: High
Reproducibility: Medium
Last Reviewed: 2026-07-30
Reviewer: BenchmarkCards editorial review
Canonical Source: https://arxiv.org/abs/2109.07958
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Description
TruthfulQA measures whether a model produces truthful answers to questions that some people answer incorrectly because of misconceptions or false beliefs. It provides a valuable truthfulness signal but is not a complete factuality evaluation.

## Recommended Use
- Adding a misconception-focused truthfulness signal to an evaluation stack
- Inspecting truthful-answer behavior alongside task-specific factuality tests

## Avoid When
- Treating one truthfulness score as complete factuality coverage
- Comparing scores without matching the evaluation setup and scoring method

## Capabilities
- Resistance to common misconceptions
- Truthful question answering
- Imitative falsehood detection
- Multiple-choice and generative evaluation

## Timeline
- 2021: TruthfulQA was introduced.
- 2023: GPT-4 and the Open LLM Leaderboard reported TruthfulQA results.
- 2023: Contamination research identified metadata leakage risks.

## Known Issues
- [In a masked-word slot-guessing probe, ChatGPT exactly matched 16.24% of TruthfulQA items without hints and 25% when a URL metadata hint was provided.](https://arxiv.org/abs/2311.09783)

## Evidence
- [Original TruthfulQA paper | original | 2021 | benchmark definition](https://arxiv.org/abs/2109.07958)
- [GPT-4 technical report | adoption | 2023 | reported model result](https://arxiv.org/abs/2303.08774)
- [Benchmark data contamination study | critique | 2023 | metadata-hint sensitivity in slot guessing](https://arxiv.org/abs/2311.09783)

## Successors
- None listed