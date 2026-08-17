---
title: MMLU-Pro
description: Benchmark record for the ten-option multi-discipline knowledge and reasoning suite
---

Slug: mmlu-pro
Measurement Status: Not Fit
Taxonomy: Knowledge and reasoning
Task Format: Multiple choice
Languages: English
Scoring Rule: Accuracy
Saturation Risk: Medium
Contamination Risk: High
Reproducibility: Low
Last Reviewed: 2026-08-17
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2406.01574
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
MMLU-Pro is a 12,032-question multi-discipline benchmark built as a harder, lower-noise replacement for MMLU. It expands each item to as many as ten options, removes items that a panel of small 2023-era models answered correctly, and uses a 5-shot chain-of-thought protocol with regular-expression answer extraction. The Microsoft Foundry quality index uses a 1,000-example English subsample.

## Supported Uses
- Comparing broad academic knowledge alongside MMLU and a free-form generative evaluation
- Tracking coarse capability movement across model generations when the harness is held fixed
- Diagnosing discipline-level strengths when subject composition is reported

## Unsupported Inferences
- Reading an MMLU-Pro score as reasoning ability rather than arithmetic and knowledge retrieval
- Comparing scores produced under different prompts, shot counts, or answer-extraction code
- Treating the score as contamination-resistant because the items were filtered for difficulty

## Measurement Targets
- Multi-discipline academic and professional knowledge
- Reasoning under an expanded ten-option answer space
- Chain-of-thought benefit relative to direct answering
- Discipline-level performance across 14 categories

## Evidence History
- 2024: MMLU-Pro was published as a NeurIPS Datasets and Benchmarks spotlight and adopted by major leaderboards.
- 2024: MMLU-Pro+ introduced multi-correct items to probe the shortcut learning its option expansion was meant to remove.
- 2024: MMLU-CF reported a large gap between public MMLU-style scores and a closed decontaminated test set.
- 2025: Chain-of-thought decomposition attributed almost all of the reported MMLU-Pro reasoning gain to arithmetic items.
- 2025: Answer-matching re-annotation retained fewer than half of the items as free-form answerable.

## Validity Threats
- [Expanding each item to ten GPT-4-Turbo-generated options raised choices-only shortcut accuracy to 41% against a 10% chance baseline, higher relative to chance than MMLU's 39% against 25%, and human annotation retained only 493 of a stratified 800-item sample as specific with a unique answer, reducing the dataset by more than half.](https://arxiv.org/abs/2507.02856)
- [Decomposing the chain-of-thought gain by whether an item or response contains an equals sign attributes 89% to 98% of the MMLU-Pro improvement to arithmetic items across six models, and the same study reports answer-extraction failures up to 14.1% on MMLU-Pro.](https://arxiv.org/abs/2409.12183)
- [The official protocol extracts answers with hard-coded regular expressions and assigns a random option when extraction fails; a dedicated study found regular-expression extraction accurate on only 74.38% of responses in the best framework it evaluated.](https://arxiv.org/abs/2405.11874)
- [MMLU-Pro recycles 6,810 of its 12,032 items from MMLU, with Law, Health, Philosophy, History, and Other drawn entirely from MMLU, and an independent 5,700-item re-annotation estimated a 6.49% error rate in the MMLU base it inherits.](https://arxiv.org/abs/2406.04127)
- [A closed decontaminated MMLU-style test set scored GPT-4o at 73.4% with 5 shots, far below the 87% to 88% commonly reported on public MMLU, which the authors attribute to contamination of open benchmarks.](https://arxiv.org/abs/2412.15194)
- [MMLU-Pro's own error analysis of 120 sampled GPT-4o failures attributed 2% to annotation errors and 1% to answer-extraction errors, and reports that 17% of its items have fewer than ten options with an average of 9.47.](https://arxiv.org/abs/2406.01574)

## Evidence Register
- [Original MMLU-Pro paper | original | 2024 | benchmark definition, option counts, and prompt sensitivity](https://arxiv.org/abs/2406.01574)
- [Answer Matching Outperforms Multiple Choice | critique | 2025 | choices-only shortcuts and free-form answerability](https://arxiv.org/abs/2507.02856)
- [To CoT or not to CoT | critique | 2024 | arithmetic attribution of chain-of-thought gains](https://arxiv.org/abs/2409.12183)
- [xFinder | critique | 2025 | regular-expression answer-extraction accuracy](https://arxiv.org/abs/2405.11874)
- [Are We Done with MMLU | critique | 2024 | inherited MMLU annotation error rate](https://arxiv.org/abs/2406.04127)
- [MMLU-CF | critique | 2024 | contamination-controlled comparison on a closed test set](https://arxiv.org/abs/2412.15194)
- [MMLU-Pro+ | critique | 2024 | shortcut learning and anchoring bias probe](https://arxiv.org/abs/2409.02257)
- [Do Large Language Model Benchmarks Test Reliability | critique | 2025 | label errors across fifteen popular benchmarks](https://arxiv.org/abs/2502.03461)

## Alternative Instruments
- MMLU-CF
- MMLU-Pro+
