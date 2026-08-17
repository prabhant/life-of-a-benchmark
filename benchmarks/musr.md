---
title: MuSR
description: Benchmark record for multistep soft reasoning over long synthetic narratives
---

Slug: musr
Measurement Status: Qualified
Taxonomy: General reasoning
Task Format: Multiple choice
Languages: English
Scoring Rule: Normalized accuracy
Saturation Risk: Low
Contamination Risk: Unknown
Reproducibility: Low
Last Reviewed: 2026-08-17
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2310.16049
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
MuSR tests reasoning that mixes formal deduction with commonsense interpretation over free-text narratives of roughly 1,000 words. It contains 756 items across three domains: murder mysteries with two options, object placements with five, and team allocation with three. The entire corpus is produced by a neurosymbolic synthetic-to-natural generation pipeline that the authors report was tuned with GPT-4.

## Supported Uses
- Diagnosing long-narrative deduction on a task family that was not sourced from the public web
- Comparing prompting strategies within a single domain when the domain and shot policy are reported
- Complementing short-form reasoning benchmarks with a long-context narrative format

## Unsupported Inferences
- Ranking models from the aggregate MuSR score, which averages three subtasks with 50%, 33%, and 20% guessing floors
- Reading small aggregate differences as capability differences on roughly 250 items per domain
- Assuming the corpus is representative of natural reasoning tasks because it is synthetic and model-generated

## Measurement Targets
- Multistep deduction combined with commonsense inference
- Long-range context parsing across roughly 1,000-word narratives
- Chain-of-thought benefit on non-mathematical reasoning
- Domain-specific reasoning in three synthetic scenario families

## Evidence History
- 2023: MuSR was released with a neurosymbolic generator and published as an ICLR 2024 spotlight.
- 2024: MuSR was adopted into the Open LLM Leaderboard v2 as a 0-shot normalized-accuracy task.
- 2024: The leaderboard maintainers documented that few models exceed random performance on the dataset.
- 2024: A 14-model chain-of-thought study found MuSR gains clear significance testing on only 6 of 14 models.
- 2025: Construct-validity work flagged LLM-generated benchmark items as a representativeness and contamination risk.

## Validity Threats
- [The Open LLM Leaderboard documentation, written by the maintainers who score the task, states that few models achieve better than random performance on MuSR, and scores it as normalized accuracy averaged across subtasks with two, five, and three options.](https://huggingface.co/docs/leaderboards/open_llm_leaderboard/about)
- [Across 14 models, MuSR murder mysteries produced exactly chance accuracy for Llama-2-7B, team allocation ranged from 34 to 90 against a 33% floor, and answer-parsing failures reached 14.0%; after Bonferroni-corrected bootstrapping the chain-of-thought benefit was significant on only 6 of 14 models.](https://arxiv.org/abs/2409.12183)
- [The published dataset contains 756 rows in total with 250 in the murder mysteries split, so per-domain accuracy on a two-option task carries roughly three points of binomial standard error before any harness variance is counted.](https://huggingface.co/datasets/TAUR-Lab/MuSR)
- [A review of 445 benchmarks found that 31.2% generate task items with language models and warns that synthetic generation risks non-representative sampling of benchmark tasks, and that only 16.0% of benchmarks reported any statistical test.](https://arxiv.org/abs/2511.04703)
- [A general probe of multiple-choice datasets showed that models finetuned on answer options alone, without ever seeing the question, reach far above chance on several benchmarks, and the authors specifically flag language-model-generated choices as exacerbating choice-only shortcuts; no such probe has been published for MuSR.](https://arxiv.org/abs/2507.02856)

## Evidence Register
- [Original MuSR paper | original | 2023 | benchmark definition and generation method](https://arxiv.org/abs/2310.16049)
- [Open LLM Leaderboard documentation | leaderboard | 2024 | scoring configuration and near-random discrimination](https://huggingface.co/docs/leaderboards/open_llm_leaderboard/about)
- [MuSR dataset card | implementation | 2023 | split sizes and dataset scale](https://huggingface.co/datasets/TAUR-Lab/MuSR)
- [To CoT or not to CoT | critique | 2024 | near-chance behavior, parser failures, and significance testing](https://arxiv.org/abs/2409.12183)
- [Measuring what Matters: Construct Validity in LLM Benchmarks | critique | 2025 | synthetic item generation and statistical reporting](https://arxiv.org/abs/2511.04703)
- [Answer Matching Outperforms Multiple Choice | critique | 2025 | choice-only shortcuts in model-generated options](https://arxiv.org/abs/2507.02856)

## Alternative Instruments
- BIG-Bench Extra Hard
---
title: MuSR
description: Benchmark record for multistep soft reasoning over generated narratives
---

Slug: musr
Measurement Status: Qualified
Taxonomy: General reasoning
Task Format: Multiple choice over long narratives
Languages: English
Scoring Rule: Normalized accuracy averaged across subtasks
Saturation Risk: Unknown
Contamination Risk: Unknown
Reproducibility: Low
Last Reviewed: 2026-08-17
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2310.16049
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
MuSR tests multistep reasoning that mixes formal deduction with commonsense interpretation over narratives of roughly a thousand words. It has three subtasks with different answer cardinalities: murder mysteries with two options, object placements with five, and team allocations with three. Items are produced end-to-end by a neurosymbolic synthetic-to-natural generation pipeline driven by a language model, and the leaderboard score is a mean of the three subtask means.

## Supported Uses
- Diagnosing whether a model can integrate deduction with long-range narrative context
- Comparing prompting strategies within a single subtask while reporting the subtask separately
- Stress-testing chain-of-thought methods on non-mathematical reasoning

## Unsupported Inferences
- Reading the aggregate MuSR score as a calibrated reasoning measure, since its three subtasks have 50%, 33%, and 20% guessing floors
- Ranking models from small aggregate differences on roughly 250 items per subtask
- Treating MuSR as contamination-free because it is synthetic and recent

## Measurement Targets
- Multistep deductive reasoning
- Commonsense interpretation of narrative detail
- Long-range context parsing across roughly 1,000-word inputs
- Constraint satisfaction in team allocation

## Evidence History
- 2023: MuSR was introduced as an ICLR 2024 spotlight with a neurosymbolic generation pipeline.
- 2024: MuSR was adopted as a component of the Open LLM Leaderboard v2 aggregate.
- 2024: The leaderboard maintainers documented that few models beat random performance on the dataset.
- 2024: Significance testing across 14 models found consistent chain-of-thought benefit on only a minority of them.
- 2025: Open LLM Leaderboard v2 was archived, leaving no maintained public MuSR frontier record.

## Validity Threats
- [The Open LLM Leaderboard maintainers state that few models achieve better than random performance on MuSR, and score it as normalized accuracy averaged over three 0-shot subtasks with two, three, and five answer choices.](https://huggingface.co/docs/leaderboards/open_llm_leaderboard/about)
- [The published dataset contains 756 rows in total with 250 in the murder-mysteries split, so per-subtask sampling error is large relative to typical reported differences.](https://huggingface.co/datasets/TAUR-Lab/MuSR)
- [Across 14 models, MuSR murder mysteries produced exactly chance results for at least one model and team allocations ranged from 34 to 90 against a 33% floor; after Bonferroni correction the chain-of-thought benefit on MuSR was significant for only 6 of the 14 models, and answer-parsing failures reached 14.0%.](https://arxiv.org/abs/2409.12183)
- [A review of 445 benchmarks found that 31.2% generate task items with language models and warns of non-representative sampling and of contamination risk that should be vetted at creation time, especially for language-model-generated items.](https://arxiv.org/abs/2511.04703)
- [A finetuned 4B model answering only from the option list, never seeing the question, reached 83% on TruthfulQA, 87% on HellaSwag, and 41% on MMLU-Pro, and the authors flag language-model-generated choices as the condition that exacerbates such shortcuts; no equivalent probe has been published for MuSR.](https://arxiv.org/abs/2507.02856)

## Evidence Register
- [Original MuSR paper | original | 2023 | benchmark definition and generation pipeline](https://arxiv.org/abs/2310.16049)
- [Open LLM Leaderboard documentation | leaderboard | 2024 | scoring configuration and discrimination](https://huggingface.co/docs/leaderboards/open_llm_leaderboard/about)
- [MuSR dataset card | implementation | 2023 | split sizes and dataset scale](https://huggingface.co/datasets/TAUR-Lab/MuSR)
- [To CoT or not to CoT | critique | 2024 | subtask variance, significance testing, and parse failures](https://arxiv.org/abs/2409.12183)
- [Measuring what Matters: Construct Validity in LLM Benchmarks | critique | 2025 | generated-item and statistical-reporting risks](https://arxiv.org/abs/2511.04703)
- [Answer Matching Outperforms Multiple Choice | critique | 2025 | choices-only shortcuts in generated multiple choice](https://arxiv.org/abs/2507.02856)

## Alternative Instruments
- BIG-Bench Hard (BBH)
