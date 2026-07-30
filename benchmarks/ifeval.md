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
- 2025: M-IFEval extended evaluation to French, Japanese, and Spanish.
- 2025: Inverse IFEval tested counterintuitive instruction following.
- 2026: IFEval++ evaluated reliability across nuanced cousin prompts.

## Known Issues
- [IFEval contains English instructions only; M-IFEval extends the evaluation to French, Japanese, and Spanish and reports that performance varies widely across languages and instruction types.](https://aclanthology.org/2025.findings-naacl.344/)
- [Across 46 models, IFEval++ found that reliable@10 over nuanced cousin prompts fell by up to 61.8% relative to IFEval accuracy; even GPT-5 declined 18.3% in the study's setup.](https://arxiv.org/html/2512.14754v3)
- [Inverse IFEval introduces 1,012 Chinese and English counterintuitive instructions across eight categories and reports substantial rank variation from IFEval, indicating that conventional instruction evaluation does not cover this out-of-distribution setting.](https://huggingface.co/papers/2509.04292)

## Evidence
- [Original IFEval paper | original | 2023 | benchmark definition](https://arxiv.org/abs/2311.07911)
- [Open LLM Leaderboard | leaderboard | 2024 | public model comparison](https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard)
- [M-IFEval | critique | 2025 | multilingual coverage and performance variation](https://aclanthology.org/2025.findings-naacl.344/)
- [Inverse IFEval | critique | 2025 | counterintuitive and out-of-distribution instruction following](https://huggingface.co/papers/2509.04292)
- [Revisiting the Reliability of Language Models in Instruction-Following | critique | 2026 | cousin-prompt reliability and IFEval++](https://arxiv.org/html/2512.14754v3)

## Successors
- M-IFEval
- Inverse IFEval
- IFEval++