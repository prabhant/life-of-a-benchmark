---
title: ChemBench
description: Benchmark record for chemical knowledge and reasoning against expert chemists
---

Slug: chembench
Measurement Status: Qualified
Taxonomy: Scientific reasoning
Task Format: Multiple choice and numeric answer
Languages: English
Scoring Rule: Fraction correct
Saturation Risk: Medium
Contamination Risk: Unknown
Reproducibility: Medium
Last Reviewed: 2026-08-17
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2404.01475
License Status: MIT for the harness; verify question provenance before redistribution
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
ChemBench, from the Jablonka lab, contains more than 2,700 chemistry question-answer pairs spanning analytical, organic, inorganic, physical, materials, technical, and safety chemistry. Unlike most science benchmarks it accepts numeric and scientific-notation answers as well as multiple choice, scoring an item correct when Hamming loss is zero or mean absolute error falls within 1% of the target. Its headline finding is that the best models outperform the best human chemists in the study on average while failing basic tasks and producing overconfident predictions.

## Supported Uses
- Comparing chemistry knowledge coverage across topics when per-topic results are reported
- Detecting overconfidence in chemical safety answers, which the authors document explicitly
- Complementing multiple-choice science benchmarks with numeric-answer scoring

## Unsupported Inferences
- Reading an aggregate fraction-correct score as chemical competence for laboratory or safety decisions
- Treating the superhuman-on-average result as holding for any individual task family
- Comparing runs across harness versions without confirming the corpus revision

## Measurement Targets
- Chemical knowledge across nine topic areas
- Numeric answer accuracy within a 1% tolerance
- Structure and spectra interpretation from text-encoded SMILES and LaTeX
- Model confidence calibration on chemistry questions

## Evidence History
- 2024: ChemBench was released as a preprint with an accompanying open-source harness.
- 2024: MaCBench, from the same lab, reported that multimodal chemistry performance tracks internet prevalence of the tested structures.
- 2025: The framework was published in Nature Chemistry.
- 2025: Third-party issue reports documented corpus answer errors and a large score discrepancy on one open model.
- 2025: The maintainers published an evaluation card recording untested contamination and absent variance reporting.

## Validity Threats
- [The maintainers' own evaluation card states that the benchmark expects the evaluated model not to be trained on the corpus and that this is not tested, that some multiple-choice items can be answered by elimination without reasoning, that performance variation is currently not measured, and that questions are mainly curated from the developers' own background.](https://raw.githubusercontent.com/lamalab-org/chembench/dev/eval-card.md)
- [The project reports that top models fall below 25% accuracy on NMR signal prediction while reaching about 71% on certification-exam-style questions, that accuracy shows no correlation with molecular complexity, and that a model expressed maximum confidence in incorrect chemical safety answers.](https://chembench.lamalab.org/)
- [The same lab's multimodal companion benchmark found that in every tested case the structures models solved were more prominent on the internet, and that presenting identical spectral peak positions as text rather than an image raised performance by nearly 35%.](https://arxiv.org/abs/2411.16955)
- [The public issue tracker records seven closed defect reports of incorrect ground-truth answers in the chemistry corpus, plus a third-party report of a 0.13 measured score against an expected 0.48 for one open model that required three maintainers to resolve.](https://github.com/lamalab-org/chembench/issues)
- [A general study of multiple-choice evaluation found that items in popular benchmarks can often be answered without seeing the question, and that model rankings change significantly when the same questions are graded free-form.](https://arxiv.org/abs/2507.02856)

## Evidence Register
- [Are large language models superhuman chemists | original | 2024 | benchmark definition and expert comparison](https://arxiv.org/abs/2404.01475)
- [ChemBench evaluation card | implementation | 2025 | scoring rule and self-reported limitations](https://raw.githubusercontent.com/lamalab-org/chembench/dev/eval-card.md)
- [ChemBench project page | original | 2025 | topic-level results and calibration findings](https://chembench.lamalab.org/)
- [MaCBench | critique | 2024 | internet prevalence correlation and modality gap](https://arxiv.org/abs/2411.16955)
- [ChemBench issue tracker | implementation | 2025 | corpus answer errors and reproducibility reports](https://github.com/lamalab-org/chembench/issues)
- [Answer Matching Outperforms Multiple Choice | critique | 2025 | multiple-choice shortcuts and ranking instability](https://arxiv.org/abs/2507.02856)

## Alternative Instruments
- MaCBench
- FrontierScience
