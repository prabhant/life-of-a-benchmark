---
title: MMMU
description: Benchmark record for multimodal expert reasoning
---

Slug: mmmu
Health: Yellow
Taxonomy: Multimodal understanding and reasoning
Task Format: Image-and-text multiple choice and short answer
Languages: English
Primary Metric: Accuracy
Saturation Risk: Unknown
Contamination Risk: Unknown
Reproducibility: Medium
Last Reviewed: 2026-07-30
Reviewer: BenchmarkCards editorial review
Canonical Source: https://arxiv.org/abs/2311.16502
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Description

MMMU evaluates multimodal models on 11.5K college-level questions collected
from exams, quizzes, and textbooks. It spans six disciplines, 30 subjects, and
30 image types, requiring models to combine visual understanding with
domain-specific reasoning.

## Recommended Use

- Measuring broad image-and-text reasoning across expert subject areas
- Pairing visual reasoning results with domain-specific and safety evaluations

## Avoid When

- Treating a single aggregate accuracy as complete evidence of multimodal capability
- Generalizing English academic questions to all visual or multilingual workflows

## Capabilities

- Chart, diagram, map, table, and scientific-image interpretation
- College-level multimodal question answering
- Cross-discipline visual reasoning
- Domain-specific knowledge application

## Timeline

- 2023: MMMU was released as a multimodal expert-reasoning benchmark.
- 2024: The work was presented at CVPR.

## Known Issues

- [In the original evaluation, GPT-4V scored 56% and Gemini Ultra scored 59%, indicating the benchmark remained difficult for then-leading multimodal models.](https://arxiv.org/abs/2311.16502)

## Evidence

- [MMMU | original | 2023 | multimodal dataset design and baseline evaluation](https://arxiv.org/abs/2311.16502)

## Successors

- None listed