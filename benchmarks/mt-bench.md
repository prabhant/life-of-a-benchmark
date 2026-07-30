---
title: MT-Bench / Chatbot Arena
description: Benchmark record for conversational assistant quality
---

Slug: mt-bench
Health: Yellow
Taxonomy: Conversational quality and preference
Task Format: Multi-turn chat and pairwise preference
Languages: English
Primary Metric: Judge score and pairwise preference
Saturation Risk: Unknown
Contamination Risk: Unknown
Reproducibility: Low
Last Reviewed: 2026-07-30
Reviewer: Benchmark Ward editorial review
Canonical Source: https://arxiv.org/abs/2306.05685
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Description
MT-Bench evaluates multi-turn chat assistants with an LLM judge, while Chatbot Arena gathers pairwise human preferences. Together they provide a widely used complement to static benchmarks for conversational quality.

## Recommended Use
- Complementing static benchmarks with conversational quality signals
- Comparing assistant behavior with both preference and task-based evidence

## Avoid When
- Treating preference rankings as factual correctness measurements
- Comparing LLM-judge scores without disclosing the judge and prompt policy

## Capabilities
- Multi-turn conversational quality
- Pairwise assistant comparison
- LLM-as-judge evaluation
- Human preference evaluation

## Timeline
- 2023: MT-Bench and Chatbot Arena were introduced.
- 2023: FastChat and LMSYS popularized public conversational evaluation.
- 2024: Arena-style preference evaluation became common in industry model releases.

## Known Issues
- [MT-Bench consists of 80 manually designed multi-turn questions, with 10 questions in each of eight categories.](https://arxiv.org/abs/2306.05685)
- [In tested order swaps, GPT-4 agreed with its original judgment only 65.0% of the time, selecting the first response 30.0% and the second 5.0% of the time.](https://arxiv.org/abs/2306.05685)
- [The original study defines its metric around helpfulness, combining accuracy, relevance, and creativity rather than reporting factual correctness separately.](https://arxiv.org/abs/2306.05685)

## Evidence
- [MT-Bench and Chatbot Arena paper | original | 2023 | evaluation design and judge bias](https://arxiv.org/abs/2306.05685)
- [LM Arena | leaderboard | 2023 | public preference data](https://arena.ai/)

## Successors
- Chatbot Arena