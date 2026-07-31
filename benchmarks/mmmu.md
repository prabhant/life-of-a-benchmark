---
title: MMMU
description: Benchmark record for multimodal expert reasoning
---

Slug: mmmu
Measurement Status: Qualified
Taxonomy: Multimodal understanding and reasoning
Task Format: Image-and-text multiple choice and short answer
Languages: English
Scoring Rule: Accuracy
Saturation Risk: Unknown
Contamination Risk: Unknown
Reproducibility: Medium
Last Reviewed: 2026-07-31
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2311.16502
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview

MMMU evaluates multimodal models on 11.5K college-level questions collected
from exams, quizzes, and textbooks. It spans six disciplines, 30 subjects, and
30 image types, requiring models to combine visual understanding with
domain-specific reasoning.

## Supported Uses

- Measuring broad image-and-text reasoning across expert subject areas
- Pairing visual reasoning results with domain-specific and safety evaluations

## Unsupported Inferences

- Treating a single aggregate accuracy as complete evidence of multimodal capability
- Generalizing English academic questions to all visual or multilingual workflows

## Measurement Targets

- Chart, diagram, map, table, and scientific-image interpretation
- College-level multimodal question answering
- Cross-discipline visual reasoning
- Domain-specific knowledge application

## Evidence History

- 2023: MMMU was released as a multimodal expert-reasoning benchmark.
- 2023: The original evaluation reported 56% accuracy for GPT-4V and 59% for
	Gemini Ultra.
- 2024: The work was presented at CVPR.
- 2024: MMMU-Pro introduced text-only filtering, expanded answer options, and a
	vision-only setting derived from MMMU.
- 2024: MMStar reported visual-dependency and data-leakage analyses that included
	MMMU.

## Validity Threats

- [MMStar reports that most language models directly solved 20% of MMMU questions and that GeminiPro achieved 42.9% without visual input (MMStar, p. 2).](https://arxiv.org/abs/2403.20330)
- [MMMU-Pro reports model-performance decreases of 16.8% to 26.9% after filtering text-only-solvable questions, expanding answer options, and adding a vision-only setting (MMMU-Pro, p. 2).](https://arxiv.org/abs/2409.02813)
- [MM-UPD removed about 24.2% of MMMU's 900-question validation set as image-agnostic before constructing the 459-question MMMU-AAD subset (MM-UPD, p. 18).](https://arxiv.org/abs/2403.20331)
- [PARROT-360V reports GPT-4o at 0.69 on MMMU and characterizes its tasks as simpler image-text alignment or basic reasoning relative to complex visual puzzles (PARROT-360V, p. 5).](https://arxiv.org/abs/2411.15201)

## Evidence Register

- [MMMU | original | 2023 | instrument design, scale, and baseline evaluation (p. 1)](https://arxiv.org/abs/2311.16502)
- [MMMU-Pro | critique | 2024 | text-only filtering and performance changes (p. 2)](https://arxiv.org/abs/2409.02813)
- [MMStar evaluation study | critique | 2024 | text-only performance on MMMU (p. 2)](https://arxiv.org/abs/2403.20330)
- [MM-UPD Bench | critique | 2024 | image-agnostic filtering and MMMU-AAD construction (p. 18)](https://arxiv.org/abs/2403.20331)
- [PARROT-360V | critique | 2024 | comparative complex visual-reasoning coverage (p. 5)](https://arxiv.org/abs/2411.15201)

## Alternative Instruments

- MMMU-Pro
- MMStar
- MM-UPD Bench
- PARROT-360V