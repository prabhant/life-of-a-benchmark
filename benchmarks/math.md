---
title: MATH
description: Benchmark record for competition-level mathematics
---

Slug: math
Measurement Status: Qualified
Taxonomy: Mathematical reasoning
Task Format: Free-response competition problems
Languages: English
Scoring Rule: Answer accuracy after extraction and equivalence matching
Saturation Risk: Unknown
Contamination Risk: High
Reproducibility: Low
Last Reviewed: 2026-07-31
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2103.03874
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview

MATH evaluates mathematical problem solving using competition-level questions that require multi-step reasoning and exact answer generation. It remains a strong mathematics benchmark when evaluation protocols are controlled.

## Supported Uses

- Evaluating advanced mathematical reasoning with a documented scoring policy
- Comparing mathematical methods alongside contamination and extraction checks
- Pairing static accuracy with functional or hard-perturbation evaluations

## Unsupported Inferences

- Comparing results with different answer-extraction rules
- Making contamination-resistant claims without an independent audit
- Treating static MATH accuracy as evidence of robustness to changed problem parameters

## Measurement Targets

- Competition-level mathematics
- Multi-step mathematical reasoning
- Exact-answer generation
- Algebra, geometry, counting, and number theory

## Evidence History

- 2021: The MATH dataset was introduced.
- 2024: MATH() functionalized 2,060 of the 5,000 test problems.
- 2024: MATH appeared in Llama 3 and Open LLM Leaderboard v2 evaluations.
- 2025: xFinder compared answer-extraction methods on MATH responses.
- 2025: MATH-Perturb introduced simple and hard variants of 279 level-5 problems.
- 2026: A controlled study quantified test-set replication effects on MATH.

## Validity Threats

- [Functional MATH reports reasoning gaps from 58.35% to 80.31% between static items and parameterized variants on a model-selected 41.2% subset evaluated without prompting optimization (Functional MATH, pp. 7 and 9).](https://arxiv.org/abs/2402.19450)
- [xFinder's Table 42 gives materially different MATH accuracies for identical responses under different extractors, including 4.56% to 23.02% for ChatGLM3-6B and 4.26% to 36.71% for Qwen1.5-14B-Chat (xFinder, p. 29).](https://arxiv.org/abs/2405.11874)
- [All 18 evaluated models lost 10 to 25 percentage points on MATH-P-Hard, which contains hard perturbations of 279 level-5 MATH problems (MATH-Perturb, p. 2).](https://arxiv.org/abs/2502.06453)
- [In controlled pretraining experiments, gains from replicated MATH test data regressed to the uncontaminated baseline on rephrased and numerically perturbed versions (test-set contamination study, p. 4).](https://arxiv.org/abs/2601.04301)
- [An LM Evaluation Harness bug before v0.4.8 gave MATH gold solutions only about 70% under Math Verify and may have systematically underestimated reported model performance (test-set contamination study, p. 31).](https://arxiv.org/abs/2601.04301)

## Evidence Register

- [Original MATH paper | original | 2021 | benchmark definition](https://arxiv.org/abs/2103.03874)
- [Functional MATH | critique | 2024 | static-to-functional reasoning gaps and subset scope](https://arxiv.org/abs/2402.19450)
- [Llama 3 model report | adoption | 2024 | reported model result](https://arxiv.org/abs/2407.21783)
- [xFinder | critique | 2024 | MATH answer-extraction sensitivity](https://arxiv.org/abs/2405.11874)
- [MATH-Perturb | critique | 2025 | hard-perturbation robustness on level-5 problems](https://arxiv.org/abs/2502.06453)
- [Controlled test-set contamination study | critique | 2026 | MATH contamination and scoring implementation effects](https://arxiv.org/abs/2601.04301)

## Alternative Instruments

- MATH()
- MATH-P-Simple
- MATH-P-Hard