---
title: GPQA (Diamond)
description: Benchmark record for graduate-level Google-proof science question answering
---

Slug: gpqa
Measurement Status: Not Fit
Taxonomy: Scientific reasoning
Task Format: Multiple choice
Languages: English
Scoring Rule: Accuracy
Saturation Risk: High
Contamination Risk: Unknown
Reproducibility: Low
Last Reviewed: 2026-08-17
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2311.12022
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
GPQA is a set of 448 four-option science questions written by domain PhDs in biology, physics, and chemistry, designed to resist web lookup. The Diamond subset of 198 questions, used by the Microsoft Foundry quality index and most public leaderboards, retains only items that both expert annotators answered correctly and most non-experts answered incorrectly. The paper positions GPQA as a scalable-oversight testbed rather than a general capability score.

## Supported Uses
- Studying scalable oversight and expert-nonexpert asymmetry, its stated design purpose
- Reporting a science-knowledge datapoint alongside a free-form generative evaluation
- Screening for gross capability differences far larger than the subset's sampling error

## Unsupported Inferences
- Ranking frontier models from Diamond score gaps smaller than roughly six points
- Reading a Diamond score as graduate-level scientific reasoning independent of the option list
- Treating the multiple-choice score as comparable to a vendor-reported score under a different harness

## Measurement Targets
- Graduate-level knowledge in biology, physics, and chemistry
- Resistance to unaided web search by skilled non-experts
- Expert-nonexpert performance asymmetry
- Multiple-choice discrimination among frontier models

## Evidence History
- 2023: GPQA was released with 448 questions and a 198-question Diamond subset.
- 2024: GPQA became a standard frontier-model release metric; access was gated on the Open LLM Leaderboard to limit contamination.
- 2025: Epoch AI audited the residual hard items and estimated an invalid-question rate near 8%.
- 2025: Answer-matching work re-annotated all 198 Diamond items and reported that a third are not answerable as posed.
- 2025: Frontier Diamond scores passed the recruited PhD-expert baseline reported by model developers.

## Validity Threats
- [Two annotators reviewed all 198 GPQA Diamond items and retained only 126 as both specific enough to answer without the option list and having a unique answer; scoring the surviving items free-form dropped model accuracy by over 20 points, with the best evaluated models reaching about 60%.](https://arxiv.org/abs/2507.02856)
- [An Epoch AI audit found frontier scores clustered near 83% with errors concentrated on 40 of 198 items, deep-dived six of the worst and judged 2.25 of them invalid, and extrapolated an overall invalid-question rate of about 15 of 198 items.](https://epoch.ai/gradient-updates/gpqa-diamond-whats-left)
- [Epoch AI records a highest observed Diamond score of 95% across 263 evaluated models, against the 69.7% PhD-expert baseline that OpenAI reported for its own recruited experts.](https://epoch.ai/benchmarks/gpqa-diamond)
- [Under a 3-shot multiple-choice harness across 14 models, GPQA accuracies spanned roughly 18% to 28% against a 25% random baseline, with answer-extraction failures reaching 15% of responses, so harness and parser choices move GPQA results by more than the model differences leaderboards report.](https://arxiv.org/abs/2409.12183)
- [A review of 445 benchmarks by 29 expert reviewers found only 16.0% used any uncertainty estimate or statistical test, and states that multiple-choice formats can be gamed and rarely reflect real-world use.](https://arxiv.org/abs/2511.04703)

## Evidence Register
- [Original GPQA paper | original | 2023 | benchmark definition and expert baselines](https://arxiv.org/abs/2311.12022)
- [Answer Matching Outperforms Multiple Choice | critique | 2025 | Diamond item specificity and free-form score drop](https://arxiv.org/abs/2507.02856)
- [Epoch AI GPQA Diamond validity audit | critique | 2025 | residual item quality and invalid-question rate](https://epoch.ai/gradient-updates/gpqa-diamond-whats-left)
- [Epoch AI GPQA Diamond benchmark page | leaderboard | 2025 | observed frontier ceiling and expert baseline](https://epoch.ai/benchmarks/gpqa-diamond)
- [To CoT or not to CoT | critique | 2024 | harness sensitivity and answer-extraction failure](https://arxiv.org/abs/2409.12183)
- [Measuring what Matters: Construct Validity in LLM Benchmarks | critique | 2025 | statistical reporting and multiple-choice validity](https://arxiv.org/abs/2511.04703)
- [Adding Error Bars to Evals | critique | 2024 | statistical treatment of small evaluation samples](https://arxiv.org/abs/2411.00640)
- [Humanity's Last Exam | adoption | 2025 | successor benchmark motivated by saturation](https://arxiv.org/abs/2501.14249)
- [SuperGPQA | adoption | 2025 | expanded successor with documented choice-only shortcuts](https://arxiv.org/abs/2502.14739)

## Alternative Instruments
- Humanity's Last Exam
- FrontierScience
