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

## Evidence
- [Original HellaSwag paper | original | 2019 | benchmark definition](https://arxiv.org/abs/1905.07830)
- [GPT-4 technical report | adoption | 2023 | reported model result](https://arxiv.org/abs/2303.08774)

## Successors
- None listed