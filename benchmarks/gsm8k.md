---
title: GSM8K
description: Benchmark record for grade-school mathematical reasoning
---

Slug: gsm8k
Measurement Status: Qualified
Taxonomy: Mathematical reasoning
Task Format: Free-response word problems
Languages: English
Scoring Rule: Exact-match accuracy
Saturation Risk: High
Contamination Risk: High
Reproducibility: Medium
Last Reviewed: 2026-07-30
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2110.14168
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
GSM8K is a dataset of 8,500 grade-school mathematics word problems designed to evaluate multi-step mathematical reasoning in natural language. It is a useful baseline, although it is now a weak discriminator among frontier models.

## Supported Uses
- Tracking regressions in grade-school mathematical reasoning
- Comparing prompting and verification approaches with perturbation tests

## Unsupported Inferences
- Claiming robust mathematical reasoning from the original task alone
- Selecting between frontier systems without harder or private math tasks

## Measurement Targets
- Multi-step arithmetic reasoning
- Natural-language mathematics problem solving
- Chain-of-thought evaluation
- Grade-school word-problem accuracy

## Evidence History
- 2021: GSM8K was introduced.
- 2023: GPT-4 reported GSM8K results.
- 2024: GSM-Symbolic tested whether high scores reflect robust reasoning.
- 2025: GSM8K-Platinum revised the full test set for label quality.

## Validity Threats
- [Across 50 sets of 100 template-derived questions, worst-to-best accuracy varied by over 12 points for Gemma2-9B and about 15 points for Phi-3.5-mini despite unchanged solution structure.](https://arxiv.org/abs/2410.05229)
- [On GSM-NoOp, adding irrelevant but plausible information reduced Phi-3-mini accuracy from 80.7% to 18.0%.](https://arxiv.org/abs/2410.05229)
- [For GPT-4 specifically, OpenAI mixed GSM8K training data into training and estimated about 1% test-set contamination from 1,000 sampled examples.](https://arxiv.org/abs/2303.08774)
- [On the 1,205-problem, human-authored GSM1K comparison set, the worst tested models scored up to 8 percentage points below GSM8K; the authors report a Spearman correlation of 0.36 between GSM8K likelihood and that performance gap, which they interpret as evidence consistent with partial memorization rather than proof of contamination.](https://openreview.net/forum?id=RJZRhMzZzH&noteId=lhsKVGcqg5)
- [GSM8K-Platinum manually reviewed 219 flagged test items, removing 110 ambiguous or inconsistent questions and correcting 10 mislabeled answers; the authors report that this revised set changes the ordering of evaluated frontier models.](https://gradientscience.org/gsm8k-platinum/)

## Evidence Register
- [Original GSM8K paper | original | 2021 | benchmark definition](https://arxiv.org/abs/2110.14168)
- [GPT-4 technical report | adoption | 2023 | reported result and contamination disclosure](https://arxiv.org/abs/2303.08774)
- [GSM-Symbolic | critique | 2024 | robustness to perturbation](https://arxiv.org/abs/2410.05229)
- [A Careful Examination of Large Language Model Performance on Grade School Arithmetic | critique | 2024 | GSM1K comparison and possible GSM8K overfitting](https://openreview.net/forum?id=RJZRhMzZzH&noteId=lhsKVGcqg5)
- [GSM8K-Platinum | critique | 2025 | test-set label quality and model ranking effects](https://gradientscience.org/gsm8k-platinum/)

## Alternative Instruments
- MATH
- GSM8K-Platinum
