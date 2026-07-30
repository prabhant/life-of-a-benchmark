---
title: IFEval
description: Benchmark record for verifiable instruction following
---

Slug: ifeval
Health: Yellow
Taxonomy: Instruction following
Task Format: Constraint-based free response
Languages: English
Primary Metric: Instruction-following accuracy
Saturation Risk: Unknown
Contamination Risk: Unknown
Reproducibility: High
Last Reviewed: 2026-07-30
Reviewer: BenchmarkCards editorial review
Canonical Source: https://arxiv.org/abs/2311.07911
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Description
IFEval measures instruction following with prompts containing objectively verifiable constraints. Its rule-based checks make evaluation reproducible and avoid reliance on subjective model judges.

## Recommended Use
- Measuring objectively verifiable instruction following
- Adding constraint-satisfaction coverage to assistant evaluations

## Avoid When
- Generalizing English-only results to multilingual assistant behavior
- Treating rule-based constraints as complete coverage of user satisfaction

## Capabilities
- Verifiable instruction following
- Constraint satisfaction
- Rule-based response checking
- Prompt-level and instruction-level accuracy

## Timeline
- 2023: IFEval was introduced.
- 2024: Open LLM Leaderboard v2 adopted IFEval.

## Evidence
- [Original IFEval paper | original | 2023 | benchmark definition](https://arxiv.org/abs/2311.07911)
- [Open LLM Leaderboard | leaderboard | 2024 | public model comparison](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)

## Successors
- None listed