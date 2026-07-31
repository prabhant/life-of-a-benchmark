---
title: MT-Bench / Chatbot Arena
description: Benchmark record for conversational assistant quality
---

Slug: mt-bench
Measurement Status: Qualified
Taxonomy: Conversational quality and preference
Task Format: Multi-turn chat and pairwise preference
Languages: English
Scoring Rule: Judge score and pairwise preference
Saturation Risk: High
Contamination Risk: Unknown
Reproducibility: Low
Last Reviewed: 2026-07-31
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2306.05685
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
MT-Bench evaluates multi-turn chat assistants with an LLM judge, while Chatbot Arena gathers pairwise human preferences. Together they provide a widely used complement to static benchmarks for conversational quality.

## Supported Uses
- Complementing static benchmarks with conversational quality signals
- Comparing assistant behavior with both preference and task-based evidence

## Unsupported Inferences
- Treating preference rankings as factual correctness measurements
- Comparing LLM-judge scores without disclosing the judge and prompt policy

## Measurement Targets
- Multi-turn conversational quality
- Pairwise assistant comparison
- LLM-as-judge evaluation
- Human preference evaluation

## Evidence History
- 2023: MT-Bench and Chatbot Arena were introduced.
- 2023: FastChat and LMSYS popularized public conversational evaluation.
- 2024: Chatbot Arena documented its sampling, ranking, and anomalous-user controls.
- 2024: Arena-Hard-Auto reported stronger frontier-model separability than MT-Bench.
- 2025: JudgeBench tested judge accuracy against objective correctness labels.

## Validity Threats
- [In tested order swaps, GPT-4 agreed with its original judgment only 65.0% of the time, selecting the first response 30.0% and the second 5.0% of the time.](https://arxiv.org/abs/2306.05685)
- [The original study defines its metric around helpfulness, combining accuracy, relevance, and creativity rather than reporting factual correctness separately.](https://arxiv.org/abs/2306.05685)
- [Chatbot Arena's authors expect a user base concentrated among LLM hobbyists and researchers and caution that online-chat prompts may not represent production or specialized-domain use.](https://arxiv.org/abs/2403.04132)
- [For a tested top-20 model set, Arena-Hard-Auto reports MT-Bench at 89.9% Spearman correlation but only 22.6% confidence agreement with Arena rankings, indicating limited ranking granularity for that comparison.](https://arxiv.org/abs/2406.11939)
- [Pairwise judges performed better on normal MT-Bench samples but worse on adversarial LLMBar samples than pointwise judges, so MT-Bench agreement does not establish adversarial judge robustness.](https://arxiv.org/abs/2406.12319)
- [On JudgeBench's objectively labeled correctness pairs, vanilla GPT-4o scored 50% and the Arena-Hard prompt scored 56%; preference agreement should therefore not be treated as factual-correctness validation.](https://arxiv.org/abs/2410.12784)

## Evidence Register
- [MT-Bench and Chatbot Arena paper | original | 2023 | evaluation design and judge bias](https://arxiv.org/abs/2306.05685)
- [Chatbot Arena | implementation | 2024 | population, prompt distribution, and ranking controls](https://arxiv.org/abs/2403.04132)
- [Length-Controlled AlpacaEval | critique | 2024 | verbosity control and Arena correlation](https://arxiv.org/abs/2404.04475)
- [Arena-Hard-Auto | critique | 2024 | model separability and ranking confidence](https://arxiv.org/abs/2406.11939)
- [The Comparative Trap | critique | 2024 | pairwise judge behavior under adversarial transfer](https://arxiv.org/abs/2406.12319)
- [JudgeBench | critique | 2024 | preference and objective-correctness boundary](https://arxiv.org/abs/2410.12784)

## Alternative Instruments
- Arena-Hard-Auto
- JudgeBench
- Length-Controlled AlpacaEval