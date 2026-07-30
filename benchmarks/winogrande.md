---
title: WinoGrande
description: Benchmark record for commonsense coreference reasoning
---

Slug: winogrande
Measurement Status: Qualified
Taxonomy: Commonsense reasoning
Task Format: Binary coreference selection
Languages: English
Scoring Rule: Accuracy
Saturation Risk: Unknown
Contamination Risk: Unknown
Reproducibility: High
Last Reviewed: 2026-07-30
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/1907.10641
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
WinoGrande is a large-scale dataset for commonsense reasoning through ambiguous pronoun and coreference resolution. It was designed to reduce exploitable biases found in earlier Winograd-style datasets.

## Supported Uses
- Diagnosing commonsense coreference performance within a broad evaluation suite
- Comparing pronoun-resolution behavior with other commonsense tasks

## Unsupported Inferences
- Using a narrow binary format as a general commonsense measure
- Inferring broad language understanding from coreference accuracy alone

## Measurement Targets
- Commonsense coreference resolution
- Pronoun disambiguation
- Bias-reduced Winograd reasoning
- Binary candidate selection

## Evidence History
- 2019: WinoGrande was introduced.
- 2023: GPT-4 reported WinoGrande results.
- 2024: Llama 3 continued reporting the benchmark.

## Validity Threats
- [The original 44k-item binary coreference study reports 59.4-79.1% for evaluated systems, depending on allowed training data, versus 94.0% human accuracy.](https://arxiv.org/abs/1907.10641)

## Evidence Register
- [Original WinoGrande paper | original | 2019 | dataset scale, task scope, and bias motivation](https://arxiv.org/abs/1907.10641)
- [GPT-4 technical report | adoption | 2023 | reported model result](https://arxiv.org/abs/2303.08774)
- [Llama 3 model report | adoption | 2024 | reported model result](https://arxiv.org/abs/2407.21783)

## Alternative Instruments
- None listed