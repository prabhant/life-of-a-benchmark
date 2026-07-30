---
title: MMLU
description: Benchmark record for Massive Multitask Language Understanding
---

Slug: mmlu
Health: Yellow
Taxonomy: Knowledge and reasoning
Task Format: Multiple choice
Languages: English
Primary Metric: Accuracy
Saturation Risk: High
Contamination Risk: High
Reproducibility: Medium
Last Reviewed: 2026-07-30
Reviewer: Benchmark Ward editorial review
Canonical Source: https://arxiv.org/abs/2009.03300
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Description
MMLU evaluates knowledge and multitask reasoning across 57 academic and professional subjects. It remains a strong historical baseline and is widely reported in major model releases and public leaderboards.

## Recommended Use
- Establishing a broad historical baseline across academic subjects
- Comparing general knowledge results alongside MMLU-Pro

## Avoid When
- Selecting a frontier model from a single capability score
- Making contamination-resistant claims without a separate audit

## Capabilities
- Broad academic and professional knowledge
- Multitask reasoning across 57 subjects
- Zero-shot and few-shot evaluation
- Subject-level performance comparison

## Timeline
- 2020: The benchmark paper was released.
- 2021: MMLU became a common general-purpose model evaluation.
- 2023: GPT-4 reported MMLU results.
- 2024: MMLU-Redux and MMLU-Pro documented quality and saturation concerns.

## Known Issues
- [A 5,700-question expert review across all 57 subjects estimated that 6.49% of MMLU items had presentation or answer-key errors.](https://arxiv.org/abs/2406.04127)
- [The MMLU-Pro study found early- to mid-2024 frontier scores clustered at 86-87%, while 24 prompt styles moved MMLU scores by 4-5 points and up to 10.98 points.](https://arxiv.org/abs/2406.01574)
- [In a filtered slot-guessing probe, ChatGPT and GPT-4 exactly reconstructed masked incorrect MMLU options 52% and 57% of the time; the authors frame this as potential, not proven, contamination.](https://arxiv.org/abs/2311.09783)

## Evidence
- [Original MMLU paper | original | 2020 | benchmark definition](https://arxiv.org/abs/2009.03300)
- [GPT-4 technical report | adoption | 2023 | reported model result](https://arxiv.org/abs/2303.08774)
- [Llama 3 model report | adoption | 2024 | reported model result](https://arxiv.org/abs/2407.21783)
- [MMLU-Redux | critique | 2024 | question quality and ranking effects](https://arxiv.org/abs/2406.04127)
- [MMLU-Pro | critique | 2024 | saturation and prompt sensitivity](https://arxiv.org/abs/2406.01574)
- [Benchmark data contamination study | critique | 2023 | slot-guessing contamination probe](https://arxiv.org/abs/2311.09783)

## Successors
- MMLU-Pro
