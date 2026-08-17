---
title: ToxiGen
description: Benchmark record for adversarial and implicit hate speech detection
---

Slug: toxigen
Measurement Status: Not Fit
Taxonomy: Safety and harmful behavior
Task Format: Binary classification
Languages: English
Scoring Rule: F1 score
Saturation Risk: High
Contamination Risk: High
Reproducibility: Medium
Last Reviewed: 2026-08-17
Reviewer: Benchmark Metrology Lab editorial review
Canonical Source: https://arxiv.org/abs/2203.09509
License Status: Verify upstream terms before use
Link Status: URL syntax validated; availability checked weekly

## Instrument Overview
ToxiGen is a machine-generated corpus of implicitly toxic and benign statements referencing 13 minority groups, produced with GPT-3 demonstration prompting and an adversarial classifier-in-the-loop decoding procedure. The standard harness task asks a model to classify input text as hateful or not hateful and reports F1. A separate use of the same name feeds ToxiGen prompts to a model and scores its outputs with released RoBERTa and HateBERT classifiers; only that second use concerns a model's propensity to produce toxic text.

## Supported Uses
- Evaluating implicit hate-speech classifiers on adversarially generated statements
- Diagnosing whether a classifier depends on explicit slurs rather than implied meaning
- Sourcing annotator-level judgments for research on annotation disagreement

## Unsupported Inferences
- Reading an F1 score as evidence that a model is unlikely to generate toxic content
- Treating high F1 as a frontier-model discriminator when very small models already score near the ceiling
- Comparing classification results across demographic groups without accounting for dialect false positives

## Measurement Targets
- Detection of implicit hate speech without explicit slurs
- Robustness to adversarially generated benign statements
- Coverage across 13 referenced minority groups
- Classification performance on machine-generated text

## Evidence History
- 2022: ToxiGen was published at ACL with roughly 274,000 generated statements.
- 2024: The maintainers released 27,450 raw annotator responses, enabling annotator-level analysis.
- 2024: A 2.1 million parameter detector reported 90.97% accuracy on ToxiGen.
- 2024: Decoding-time alignment work reported reducing ToxiGen-measured toxicity to nearly zero, a floor effect.
- 2026: The repository was archived read-only.

## Validity Threats
- [The standard harness task is defined as classifying input text as either hateful or not hateful, so the reported score measures a model's ability to detect toxicity, not its propensity to produce it.](https://github.com/EleutherAI/lm-evaluation-harness/tree/main/lm_eval/tasks/toxigen)
- [The human-validated portion of the corpus is about 8,960 rows against roughly 274,000 generated statements, backed by 27,450 annotations, and the maintainers state that the dataset captures implicit toxicity for only 13 identified minority groups, can naturally be noisy at this scale, and that its annotations might not capture the full complexity of these issues.](https://github.com/microsoft/TOXIGEN)
- [Models trained on widely used hate-speech corpora acquire dialect correlations such that African-American English tweets and tweets by self-identified African Americans are up to two times more likely to be labelled offensive.](https://aclanthology.org/P19-1163/)
- [Across five annotated corpora, classifiers predict that tweets written in African-American English are abusive at substantially higher rates, showing systematic racial bias in all of the datasets examined.](https://aclanthology.org/W19-3504/)
- [More conservative annotators and those scoring highly on a racist-beliefs scale were less likely to rate anti-Black language as toxic but more likely to rate African-American English as toxic, so the label a statement receives depends on who annotates it.](https://arxiv.org/abs/2111.07997)
- [A functional test suite for hate-speech detection states that evaluating with accuracy or F1 on held-out test data makes it difficult to identify specific model weak points and risks overestimating generalisable model performance because of systematic gaps and biases in hate-speech datasets.](https://aclanthology.org/2021.acl-long.4/)
- [A 2.1 million parameter detector reaches 90.97% accuracy on ToxiGen, rivalling models over fifty times its size, so the score does not discriminate among large language models.](https://arxiv.org/abs/2409.02114)

## Evidence Register
- [Original ToxiGen paper | original | 2022 | corpus generation and human validation](https://arxiv.org/abs/2203.09509)
- [ToxiGen repository | implementation | 2024 | annotation counts and responsible-use caveats](https://github.com/microsoft/TOXIGEN)
- [ToxiGen harness task definition | implementation | 2024 | classification task formulation](https://github.com/EleutherAI/lm-evaluation-harness/tree/main/lm_eval/tasks/toxigen)
- [The Risk of Racial Bias in Hate Speech Detection | critique | 2019 | dialect false positives](https://aclanthology.org/P19-1163/)
- [Racial Bias in Hate Speech and Abusive Language Detection Datasets | critique | 2019 | systematic bias across five corpora](https://aclanthology.org/W19-3504/)
- [Annotators with Attitudes | critique | 2021 | annotator identity and belief effects on labels](https://arxiv.org/abs/2111.07997)
- [HateCheck | critique | 2021 | limits of held-out F1 for hate-speech models](https://aclanthology.org/2021.acl-long.4/)
- [Tiny-Toxic-Detector | critique | 2024 | small-model ceiling on ToxiGen](https://arxiv.org/abs/2409.02114)
- [The Refusal-Compliance Tradeoff | critique | 2026 | unequal demographic protection in refusal-style safety metrics](https://arxiv.org/abs/2605.05427)

## Alternative Instruments
- HarmBench
