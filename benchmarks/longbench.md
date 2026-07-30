---
title: LongBench
description: Benchmark record for bilingual long-context understanding
---

Slug: longbench
Health: Yellow
Taxonomy: Long context understanding
Task Format: Bilingual mixed long-context task suite
Languages: English and Chinese
Primary Metric: Task-specific automatic metrics
Saturation Risk: Unknown
Contamination Risk: Unknown
Reproducibility: Medium
Last Reviewed: 2026-07-30
Reviewer: Benchmark Ward editorial review
Canonical Source: https://arxiv.org/abs/2308.14508
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Description

LongBench is a bilingual, multi-task benchmark for long-context understanding.
It standardizes 21 datasets across six task categories in English and Chinese,
including single-document and multi-document question answering, summarization,
few-shot learning, synthetic tasks, and code completion.

## Recommended Use

- Comparing long-context behavior across diverse language and task settings
- Testing retrieval, compression, and context-window approaches together

## Avoid When

- Inferring performance on a specific production document workflow from one aggregate score
- Treating context-window length as evidence of long-context understanding

## Capabilities

- Long-document question answering
- Multi-document question answering
- Long-context summarization
- Bilingual long-context evaluation
- Long-context code completion

## Timeline

- 2023: LongBench was introduced as a bilingual long-context benchmark.
- 2024: The work appeared at ACL.

## Known Issues

- [In the original evaluation, GPT-3.5-Turbo-16k outperformed the tested open models but still struggled on longer contexts.](https://arxiv.org/abs/2308.14508)

## Evidence

- [LongBench | original | 2023 | bilingual dataset coverage and long-context evaluation](https://arxiv.org/abs/2308.14508)

## Successors

- None listed