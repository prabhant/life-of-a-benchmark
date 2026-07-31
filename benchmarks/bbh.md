---
title: BIG-Bench Hard (BBH)
description: Benchmark record for difficult multi-task reasoning
---

Slug: bbh
Measurement Status: Not Fit
Taxonomy: General reasoning
Task Format: Mixed task suite
Languages: English
Scoring Rule: Exact-match accuracy
Saturation Risk: High
Contamination Risk: Medium
Reproducibility: Medium
Last Reviewed: 2026-07-31
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2210.09261
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
BIG-Bench Hard is a suite of challenging BIG-Bench tasks on which prior language models did not outperform average human raters. It measures difficult reasoning across varied task formats.

## Supported Uses
- Stress-testing reasoning methods across diverse task types
- Comparing prompting strategies while reporting the prompt policy

## Unsupported Inferences
- Distinguishing frontier models with BBH alone
- Comparing results that use different chain-of-thought policies

## Measurement Targets
- Difficult multi-task reasoning
- Algorithmic and logical reasoning
- Language understanding
- Chain-of-thought evaluation

## Evidence History
- 2022: BIG-Bench Hard was introduced.
- 2024: Multi-prompt evaluation measured BBH ranking sensitivity to instruction paraphrases.
- 2025: BIG-Bench Extra Hard replaced all 23 tasks after reporting BBH saturation.
- 2025: DyePack demonstrated prospective contamination detection on controlled BBH exposure.

## Validity Threats
- [The original study reports that few-shot prompting without chain-of-thought substantially underestimates model capability; chain-of-thought changed how many tasks PaLM and Codex exceeded average human-rater performance on.](https://arxiv.org/abs/2210.09261)
- [Across 15 BBH classification or multiple-choice tasks, valid instruction paraphrases produced unstable rankings; one example moved T0pp from first to ninth.](https://arxiv.org/abs/2401.00595)
- [BIG-Bench Extra Hard reports frontier BBH accuracy above 90% and identifies limited answer spaces, shortcuts, short inputs, and few-hop tasks as constraints on frontier-model discrimination.](https://arxiv.org/abs/2502.19187)
- [DyePack detected all five deliberately contaminated model runs on BBH with eight planted backdoors, but this prospective method cannot diagnose exposure in historical results that lacked those backdoors.](https://arxiv.org/abs/2505.23001)

## Evidence Register
- [Original BBH paper | original | 2022 | benchmark definition](https://arxiv.org/abs/2210.09261)
- [Multi-Prompt LLM Evaluation | critique | 2024 | instruction sensitivity and ranking instability](https://arxiv.org/abs/2401.00595)
- [BIG-Bench Extra Hard | critique | 2025 | saturation, task limitations, and replacement suite](https://arxiv.org/abs/2502.19187)
- [DyePack | critique | 2025 | controlled BBH exposure and prospective detection](https://arxiv.org/abs/2505.23001)

## Alternative Instruments
- BIG-Bench Extra Hard