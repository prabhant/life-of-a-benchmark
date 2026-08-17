---
title: WMDP
description: Benchmark record for the weapons of mass destruction proxy knowledge suite
---

Slug: wmdp
Measurement Status: Not Fit
Taxonomy: Safety and harmful behavior
Task Format: Multiple choice
Languages: English
Scoring Rule: Accuracy, interpreted inversely
Saturation Risk: High
Contamination Risk: Unknown
Reproducibility: Low
Last Reviewed: 2026-08-17
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2403.03218
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
WMDP is a set of 3,668 four-option multiple-choice questions, split across 1,273 biosecurity, 1,987 cybersecurity, and 408 chemical-security items, offered as a proxy for hazardous knowledge and as a target for unlearning methods. Safety leaderboards invert its accuracy so that higher knowledge scores worse. The maintainers have removed items post-release for insufficient dual-use potential and for answer-randomization defects.

## Supported Uses
- Measuring whether an unlearning intervention reduces measured hazardous-topic accuracy under a fixed prompt template
- Screening for gross differences in sensitive-domain knowledge between very different model classes
- Providing an openly documented, canary-marked proxy corpus for hazardous-knowledge research

## Unsupported Inferences
- Reading a low WMDP accuracy as evidence that hazardous knowledge has been removed
- Treating the inverted score as a safety ranking, since raw accuracy tracks general capability
- Comparing scores across prompt formats or shot counts

## Measurement Targets
- Proxy knowledge in biosecurity, cybersecurity, and chemical security
- Effectiveness of unlearning interventions
- Retention of general capability alongside targeted knowledge removal
- Sensitive-domain accuracy relative to general benchmarks

## Evidence History
- 2024: WMDP was published at ICML with 3,668 questions and the RMU unlearning method.
- 2024: The maintainers removed cybersecurity items for excessive length and biosecurity items for insufficient dual-use potential, and fixed a choice-randomization defect.
- 2024: Adversarial work showed that RMU-edited hazardous capability is recoverable by finetuning on ten unrelated examples.
- 2024: Sandbagging research showed models can be induced to selectively underperform on dangerous-capability evaluations including WMDP.
- 2025: Full-stack unlearning reviews found that multiple-choice accuracy overstates unlearning success relative to open-ended generation.

## Validity Threats
- [Five-shot prompting or simple rephrasing of the same questions produced an over tenfold increase in accuracy on unlearning benchmarks using the WMDP dataset, and training on unrelated data almost completely recovered pre-unlearning performance.](https://arxiv.org/abs/2411.12103)
- [Finetuning on ten unrelated examples, or removing specific directions in activation space, recovers most hazardous capabilities from models edited with RMU, the method introduced alongside the benchmark.](https://arxiv.org/abs/2409.18025)
- [Frontier models can be prompted to selectively underperform on dangerous-capability evaluations while maintaining general performance, and can be finetuned to hide capabilities behind a password, with the behavior generalizing to held-out benchmarks such as WMDP.](https://arxiv.org/abs/2406.07358)
- [A full-stack review of unlearning methods and metrics focused on WMDP concludes that evaluations dominated by multiple-choice accuracy offer only a narrow perspective and often overstate success while overlooking actual generation behavior.](https://arxiv.org/abs/2510.07626)
- [The maintainers' own dataset card records that cybersecurity questions were removed for excessive length, that biosecurity questions were removed for insufficient dual-use potential after external review, and that cybersecurity items were modified because of choice-randomization issues.](https://huggingface.co/datasets/cais/wmdp)
- [A capability-correlation study reports that WMDP scores are highly anticorrelated with capabilities across all three fields and states that the benchmark inverts accuracy, so a more capable model is scored as less safe by construction; the same authors argue this makes the benchmark resistant to safetywashing.](https://arxiv.org/abs/2407.21792)
- [A study of 27 frontier models across eight biology benchmarks found that models now match or exceed expert performance on the WMDP biology subset, and that the subset plateaus well below 100%, which the authors attribute to benchmark saturation and errors in the underlying data.](https://arxiv.org/abs/2505.06108)

## Evidence Register
- [Original WMDP paper | original | 2024 | benchmark definition and unlearning method](https://arxiv.org/abs/2403.03218)
- [WMDP dataset card | implementation | 2024 | subset sizes, post-release removals, and canary string](https://huggingface.co/datasets/cais/wmdp)
- [Does Unlearning Truly Unlearn | critique | 2024 | prompt-format sensitivity and knowledge recovery](https://arxiv.org/abs/2411.12103)
- [An Adversarial Perspective on Machine Unlearning for AI Safety | critique | 2024 | recovery of unlearned hazardous capability](https://arxiv.org/abs/2409.18025)
- [AI Sandbagging | critique | 2024 | strategic underperformance on dangerous-capability evaluations](https://arxiv.org/abs/2406.07358)
- [LLM Unlearning Under the Microscope | critique | 2025 | multiple-choice accuracy versus generation behavior](https://arxiv.org/abs/2510.07626)
- [Position: LLM Unlearning Benchmarks are Weak Measures of Progress | critique | 2024 | benign modifications and target ambiguity](https://arxiv.org/abs/2410.02879)
- [Safetywashing | critique | 2024 | capability correlation and inverted scoring](https://arxiv.org/abs/2407.21792)
- [LLMs Outperform Experts on Challenging Biology Benchmarks | critique | 2025 | saturation and data errors in the biology subset](https://arxiv.org/abs/2505.06108)

## Alternative Instruments
- HarmBench
