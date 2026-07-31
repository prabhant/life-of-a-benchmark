---
title: LongBench
description: Benchmark record for bilingual long-context understanding
---

Slug: longbench
Measurement Status: Qualified
Taxonomy: Long context understanding
Task Format: Bilingual mixed long-context task suite
Languages: English and Chinese
Scoring Rule: Task-specific automatic metrics
Saturation Risk: Unknown
Contamination Risk: Medium
Reproducibility: Medium
Last Reviewed: 2026-07-31
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2308.14508
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview

LongBench is a bilingual, multi-task benchmark for long-context understanding.
It standardizes 21 datasets across six task categories in English and Chinese,
including single-document and multi-document question answering, summarization,
few-shot learning, synthetic tasks, and code completion.

## Supported Uses

- Comparing long-context behavior across diverse language and task settings
- Testing retrieval, compression, and context-window approaches together

## Unsupported Inferences

- Inferring performance on a specific production document workflow from one aggregate score
- Treating context-window length as evidence of long-context understanding
- Comparing LongBench and LongBench v2 scores as measurements from the same instrument

## Measurement Targets

- Long-document question answering
- Multi-document question answering
- Long-context summarization
- Bilingual long-context evaluation
- Long-context code completion

## Evidence History

- 2023: LongBench was introduced as a bilingual long-context benchmark.
- 2024: The work appeared at ACL.
- 2024: LV-Eval rebuilt two LongBench MultiFieldQA components with context-dependency controls.
- 2024: LongBench v2 and HELMET introduced deeper-reasoning and controlled-length alternatives.

## Validity Threats

- [LV-Eval rebuilt the English and Chinese MultiFieldQA components from LongBench and removed questions answerable from common-sense knowledge without the supplied context; this finding covers those two components, not the full suite.](https://arxiv.org/abs/2402.05136)
- [HELMET's design audit marks LongBench as lacking robust evaluation and controllable context lengths, with all but one dataset below 128K tokens.](https://arxiv.org/abs/2410.02694)

## Evidence Register

- [LongBench | original | 2023 | bilingual dataset coverage and long-context evaluation](https://arxiv.org/abs/2308.14508)
- [LongBench v2 | critique | 2024 | deeper reasoning and 8K-to-2M-word contexts](https://arxiv.org/abs/2412.15204)
- [LV-Eval | critique | 2024 | context dependency, leakage controls, and controlled lengths](https://arxiv.org/abs/2402.05136)
- [HELMET | critique | 2024 | length coverage, metric reliability, and benchmark design](https://arxiv.org/abs/2410.02694)

## Alternative Instruments

- LongBench v2
- LV-Eval
- HELMET