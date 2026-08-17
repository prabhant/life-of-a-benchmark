---
title: Arena-Hard-Auto
description: Benchmark record for automatic pairwise preference scoring on hard prompts
---

Slug: arena-hard
Measurement Status: Not Fit
Taxonomy: Conversational quality and preference
Task Format: Pairwise LLM-judged comparison
Languages: English
Scoring Rule: Bradley-Terry win rate against a baseline
Saturation Risk: Medium
Contamination Risk: High
Reproducibility: Low
Last Reviewed: 2026-08-17
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2406.11939
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
Arena-Hard-Auto curates 500 challenging prompts from Chatbot Arena logs and scores each model by having an LLM judge compare its single-turn answer against a fixed baseline, aggregating with a Bradley-Terry model and bootstrapped confidence intervals. It reports high agreement with Chatbot Arena rankings and costs roughly twenty dollars per run. An optional style control regresses out answer length and markdown density.

## Supported Uses
- Screening open-ended response quality cheaply when the judge, baseline, and style-control setting are all disclosed
- Comparing two models under an identical judge configuration as a directional signal
- Producing a preference-shaped complement to objectively scored benchmarks

## Unsupported Inferences
- Treating a win rate as a measure of correctness, safety, or instruction following
- Comparing scores produced under different judge models
- Ranking models without style control, which reverses a verbosity-driven gain in the authors' own ablation

## Measurement Targets
- Open-ended response quality on hard prompts
- Separability among frontier chat models
- Agreement with crowdsourced human preference rankings
- Style-controlled preference after removing length and formatting effects

## Evidence History
- 2024: Arena-Hard-Auto was published with a BenchBuilder curation pipeline and reported 98.6% confidence agreement with the Chatbot Arena hard-prompt English leaderboard.
- 2024: Null-model work showed a constant, instruction-irrelevant response scoring 83.0 on the benchmark.
- 2024: Style control was added after length-controlled AlpacaEval quantified verbosity bias in this benchmark family.
- 2024: JudgeBench found the Arena-Hard judge prompt scored 56% on objectively labeled correctness pairs.
- 2025: An audit of the parent Chatbot Arena reported large data-access asymmetries between providers.

## Validity Threats
- [A null model that returns a single constant, instruction-irrelevant string achieves a score of 83.0 on Arena-Hard-Auto, 86.5% length-controlled win rate on AlpacaEval 2.0, and 9.55 on MT-Bench, and the cheating outputs transfer even when the benchmark instructions are assumed private.](https://arxiv.org/abs/2410.07137)
- [The authors' own judge ablation reports Spearman correlation to Chatbot Arena of 96.5% for an ensemble judge but only 77.0% for Claude-3-Opus and 70.5% for Llama-3-70B, so swapping the judge moves rank correlation by roughly 25 points; they also observe that GPT models rank above human preference and Claude models below it under a GPT judge.](https://arxiv.org/abs/2406.11939)
- [In the authors' style-control ablation, prompting a model for more detail raises its unmodified score from 44.5 to 53.5, while under style control the same variant falls to 39.8 against the plain model's 41.7, so the headline metric without style control rewards verbosity rather than quality.](https://arxiv.org/abs/2406.11939)
- [On objectively labeled correctness pairs, GPT-4o with a vanilla judge prompt performs no better than random and the Arena-Hard judge prompt raises it only from 50% to 56%, while judges score markedly lower on response pairs they generated themselves, evidencing self-preference.](https://arxiv.org/abs/2410.12784)
- [Appending a single instruction to answer with as much detail as possible moves a model's raw AlpacaEval win rate from 22.9% to 64.3% in this benchmark family, and length control cuts the normalized standard deviation across verbosity prompts from 25% to 10%.](https://arxiv.org/abs/2404.04475)
- [Merely reversing the order of two candidate responses let a 13B model beat ChatGPT on 66 of 80 tested queries under a ChatGPT evaluator, showing that pairwise judgments are order dependent.](https://arxiv.org/abs/2305.17926)
- [An audit of the Chatbot Arena data that Arena-Hard is distilled from and validated against estimated that two providers received about 19.2% and 20.4% of all arena data while 83 open-weight models together received about 29.7%, and that arena data access yields relative performance gains of up to 112% on the arena distribution.](https://arxiv.org/abs/2504.20879)

## Evidence Register
- [Arena-Hard and BenchBuilder paper | original | 2024 | benchmark definition, judge ablation, and style control](https://arxiv.org/abs/2406.11939)
- [Cheating Automatic LLM Benchmarks | critique | 2024 | null-model win rates](https://arxiv.org/abs/2410.07137)
- [JudgeBench | critique | 2024 | judge accuracy on objective correctness pairs and self-preference](https://arxiv.org/abs/2410.12784)
- [Length-Controlled AlpacaEval | critique | 2024 | verbosity bias and length control](https://arxiv.org/abs/2404.04475)
- [Large Language Models are not Fair Evaluators | critique | 2023 | position bias in pairwise judging](https://arxiv.org/abs/2305.17926)
- [Style Outweighs Substance | critique | 2024 | judge preference decoupled from safety and factuality](https://arxiv.org/abs/2409.15268)
- [LLM Evaluators Recognize and Favor Their Own Generations | critique | 2024 | self-recognition and self-preference](https://arxiv.org/abs/2404.13076)
- [The Leaderboard Illusion | critique | 2025 | data-access asymmetry in the parent arena](https://arxiv.org/abs/2504.20879)

## Alternative Instruments
- MT-Bench / Chatbot Arena
- IFEval
